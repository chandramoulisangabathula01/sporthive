import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { useLocation } from 'react-router-dom';
import { Team, Sport, Article } from '../../context/Sports/types';
import { Dialog } from '@headlessui/react';
import Navbar from '../Navbar';
import { t } from 'i18next';

const SportsOverview: React.FC = () => {
  const location = useLocation();
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [selectedArticleDetails, setSelectedArticleDetails] = useState<Article | null>(null);
  const [sportsOptions, setSportsOptions] = useState<Sport[]>([]);
  const [selectedSportName, setSelectedSportName] = useState<string | null>(null);
  const [teamsOptions, setTeamsOptions] = useState<Team[]>([]);
  const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const getSports = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        const data = await response.json();
        setSportsOptions(data.sports);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sports data:', error);
        setIsLoading(false);
      }
    };

    const getTeams = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        const data = await response.json();
        setTeamsOptions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching teams data:', error);
        setIsLoading(false);
      }
    };

    getSports();
    getTeams();
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/articles`);
        const data = await response.json();
        setArticlesList(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching articles data:', error);
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  useEffect(() => {
    if (sportsOptions.length > 0) {
      setSelectedSportName(sportsOptions[0].name);
    }
  }, [sportsOptions]);

  useEffect(() => {
    if (selectedSportName && teamsOptions.length > 0) {
      const teamsForSelectedSport = teamsOptions.filter(team => team.plays === selectedSportName);
      if (teamsForSelectedSport.length > 0) {
        setSelectedTeamName(teamsForSelectedSport[0].name);
      }
    }
  }, [selectedSportName, teamsOptions]);

  const handleSportChange = (sportName: string) => {
    setSelectedSportName(sportName);
    setSelectedTeamName(null);
  };

  const handleTeamChange = (teamName: string) => {
    setSelectedTeamName(teamName);
  };

  const filteredArticles = articlesList.filter((article) => {
    return (
      article.sport.name === selectedSportName &&
      article.teams.some((team) => team.name === selectedTeamName)
    );
  });

  const openDialog = async (article: Article) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${article.id}`);
      const data = await response.json();
      setSelectedArticleDetails(data);
      setIsDialogOpen(true);
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  const closeModal = () => {
    setSelectedArticleDetails(null);
    setIsDialogOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      {location.pathname === '/teams' && <Navbar />}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t('Favorite Teams')}</h1>
      </div>
      <div className="flex justify-center mb-4">
        <select
          value={selectedSportName || ''}
          onChange={(e) => handleSportChange(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-gray-800 text-white"
        >
          <option value='' disabled>{t('Select Sport')}</option>
          {sportsOptions.map((sport) => (
            <option key={sport.id} value={sport.name}>{t(`${sport.name}`)}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-center mb-8">
        <select
          value={selectedTeamName || ''}
          onChange={(e) => handleTeamChange(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-gray-800 text-white"
        >
          <option value="" disabled> {t('Select Team')}</option>
          {teamsOptions
            .filter((team) => team.plays === selectedSportName)
            .map((filteredTeam) => (
              <option key={filteredTeam.id} value={filteredTeam.name}>{t(`${filteredTeam.name}`)}</option>
            ))}
        </select>
      </div>
      <div className=" ">
        {isLoading && <p> {t('Loading...')}</p>}
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-gray-800 p-4 mt-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.summary}</p>
            <button
              onClick={() => openDialog(article)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
               {t('More Details')}
            </button>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onClose={closeModal}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-gray-800 rounded-lg p-6 max-w-3xl w-full">
            {selectedArticleDetails && (
              <>
                <div className="flex flex-col  md:flex-row">
                  <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                    <Dialog.Title className="text-2xl font-bold">{selectedArticleDetails.sport.name}</Dialog.Title>
                    <Dialog.Description className="mt-2 ">{selectedArticleDetails.summary}</Dialog.Description>
                    <img src={selectedArticleDetails.thumbnail} alt={selectedArticleDetails.title} className="mt-4 w-full h-64 object-cover rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.714 4.714a.75.75 0 11-1.06 1.06L12 11.647l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.714-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <Dialog.Title className="text-2xl font-bold mt-4">{selectedArticleDetails.title}</Dialog.Title>
                    <Dialog.Description className="mt-2 ">{selectedArticleDetails.content}</Dialog.Description>
                    <Dialog.Description className="mt-4 font-semibold">{t('Ends at: ')}{new Date(selectedArticleDetails.date).toLocaleString()}</Dialog.Description>
                    {selectedArticleDetails.teams.length > 0 && (
                      <div className="mt-4">
                        <p className="font-semibold">{t('Teams:')}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedArticleDetails.teams.map((team) => (
                            <span key={team.id} className="bg-gray-700 px-2 py-1 rounded">{t(`${team.name}`)}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SportsOverview;
