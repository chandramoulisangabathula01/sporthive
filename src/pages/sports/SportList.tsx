// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import { Team, Sport, Article } from '../../context/Sports/types'
import { Dialog } from '@headlessui/react';

const SportList: React.FC = () => {

  const location = useLocation();  // Get current route location
  const [articles, setArticles] = useState<Article[]>([]);  // State to store articles
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);  // State for the selected article
  const [sports, setSports] = useState<Sport[]>([]);  // State to store sports
  const [selectedSport, setSelectedSport] = useState<string | null>(null);  // State for the selected sport
  const [teams, setTeams] = useState<Team[]>([]);  // State to store teams
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);  // State for the selected team
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  // State for modal open/close

  

  // Fetch sports data on component mount
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        const data = await response.json();
        setSports(data.sports);
        setLoading(false);
      } catch (error) {
        console.error('Error while fetching sports:', error);
        setLoading(false);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (error) {
        console.error('Error while fetching teams:', error);
        setLoading(false);
      }
    };

    fetchSports();
    fetchTeams();
  }, []);

  // Fetch articles data on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/articles`);
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error while fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Set the initial selected sport when sports data is fetched
  useEffect(() => {
    if (sports.length > 0) {
      setSelectedSport(sports[0].name);
    }
  }, [sports]);

  // Set the initial selected team when a sport is selected
  useEffect(() => {
    if (selectedSport && teams.length > 0) {
      const teamsOfSelectedSport = teams.filter(team => team.plays === selectedSport);
      if (teamsOfSelectedSport.length > 0) {
        setSelectedTeam(teamsOfSelectedSport[0].name);
      }
    }
  }, [selectedSport, teams]);

  // Handler to change selected sport
  const ChangeSport = (sportName: string) => {
    setSelectedSport(sportName);
    setSelectedTeam(null);
  };

  // Handler to change selected team
  const ChangeTeam = (teamId: string) => {
    setSelectedTeam(teamId);
  };

  // Filter articles based on selected sport and team
  const specificArticles = articles.filter((article) => {
    return (
      article.sport.name === selectedSport &&
      article.teams.some((team) => team.name === selectedTeam)
    );
  });

  // Handler to open modal and display article details
  const handleReadMore = async (article: Article) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${article.id}`);
      const data = await response.json();
      setSelectedArticle(data);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';  // Disable body scroll when modal is open
    } catch (error) {
      console.error('Error while fetching article details:', error);
    }
  };

  // Handler to close modal
  const handleCloseModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';  // Enable body scroll when modal is closed
  };

  return (
    <div className="bg-gray-900">
      {location.pathname === '/teams' && <Navbar />}  
      <div className="mb-4 ">
        <h1 className="text-4xl font-extrabold mb-2 justify-center flex">
          Favorites
        </h1>
      </div>
      <div className="mb-4 flex justify-center" >
        <select
          value={selectedSport || ''}
          onChange={(e) => ChangeSport(e.target.value)}
          className="border w-4/5 font-bold dark:hover:bg-gray-600 dark:hover:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-md py-3 px-3 my-2 mx-2 bg-gray-700 text-base text-left"
        >
          <option value='' disabled className='text-gray-900'>
            Select Sport
          </option>
          {sports.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4 flex justify-center">
        <select
          value={selectedTeam || ''}
          onChange={(e) => ChangeTeam(e.target.value)}
          className="border w-4/5 font-bold dark:hover:bg-gray-600 dark:hover:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-md py-3 px-3 my-2 mx-2 bg-gray-700 text-base text-left"
        >
          <option value="" disabled className='text-gray-900'>
            Select Team
          </option>
          {teams
            .filter((team) => team.plays === selectedSport)
            .map((filteredTeam) => (
              <option key={filteredTeam.id} value={filteredTeam.name}>
                {filteredTeam.name}
              </option>
            ))}
        </select>
      </div>

      <div className='mt-5'>
        <div className='grid gap-8'>
        {loading && <p>Loading...</p>}
          {specificArticles.map((article) => (
            <div key={article.id} className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p>{article.summary}</p>
              <button
                onClick={() => handleReadMore(article)}
                className='bg-gray-700 hover:bg-gray-500 mt-2 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500'
              >
                More Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={handleCloseModal} className=" ">
        <div className="fixed inset-0 w-screen overflow-y-auto p-4 inset-0 z-50 items-center justify-center bg-opacity-50">
          <div className="flex min-h-full items-center justify-center">
            <Dialog.Panel className="relative border border-gray-600 bg-gray-500 dark:bg-gray-900 dark:text-white rounded-lg p-6 mx-5 md:mx-0 shadow-xl max-w-4xl grid grid-cols-2 md:grid-cols-2 gap-6">
              {selectedArticle && (
                <>
                  <div className="md:border-r md:border-gray-700 pr-6">
                    <Dialog.Title className="text-2xl font-bold p-2 rounded-lg w-full object-cover">{selectedArticle.sport.name}</Dialog.Title>
                    <Dialog.Description className="font-semibold p-2 rounded-lg w-full object-cover">Summary : {selectedArticle.summary}</Dialog.Description>
                    <img src={selectedArticle.thumbnail} alt={selectedArticle.title} className="mb-2 p-2 rounded-lg w-full h-38 object-cover" />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.714 4.714a.75.75 0 11-1.06 1.06L12 11.647l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.714-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <Dialog.Title className="text-2xl font-bold mt-10 underline mb-4">{selectedArticle.title}</Dialog.Title>
                    <Dialog.Title className="font-semibold mt-10 mb-4">{selectedArticle.content}</Dialog.Title>
                    <Dialog.Description className="font-semibold mb-4">Ends at : {new Date(selectedArticle.date).toLocaleString()}</Dialog.Description>
                    {selectedArticle.teams.length > 0 && (
                      <div className="mt-4">
                        <p className="font-semibold">Teams:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedArticle.teams.map((team) => (
                            <span key={team.id} className="bg-gray-700 px-2 py-1 rounded-full">{team.name}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SportList;
