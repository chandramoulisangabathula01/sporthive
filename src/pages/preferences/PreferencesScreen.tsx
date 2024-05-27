import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Team, Sport } from '../../context/Preferences/types';
import useUserPreferences from './SpecificUserPreferences';

const PreferencesPanel: React.FC = () => {
  // State variables
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [sportsList, setSportsList] = useState<Sport[]>([]);
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const authToken = localStorage.getItem("authToken");

  // Custom hook to fetch user preferences
  const userPreferences = useUserPreferences(authToken);

  // Handle checkbox change event
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const value = event.target.value;

    if (name === 'sport') {
      if (checked) {
        setSelectedSports([...selectedSports, value]);
      } else {
        setSelectedSports(selectedSports.filter((sport) => sport !== value));
      }
    } else if (name === 'team') {
      if (checked) {
        setSelectedTeams([...selectedTeams, value]);
      } else {
        setSelectedTeams(selectedTeams.filter((team) => team !== value));
      }
    }
  };

  // Submit preferences to the server
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          preferences: {
            selectedSports,
            selectedTeams,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      // Update preferences in local storage
      let userData = JSON.parse(localStorage.getItem('userData') || '{}');
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...userData,
          preferences: {
            selectedSports,
            selectedTeams,
          },
        })
      );
      setModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.error('Error updating preferences:', error);
      setLoading(false);
    }
  };

  // Fetch sports and teams preferences from the server
  useEffect(() => {
    if (userPreferences) {
      setSelectedSports(userPreferences.selectedSports || []);
      setSelectedTeams(userPreferences.selectedTeams || []);
    }
  }, [userPreferences]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const sportsResponse = await fetch(`${API_ENDPOINT}/sports`);
        const sportsData = await sportsResponse.json();
        setSportsList(sportsData.sports);

        const teamsResponse = await fetch(`${API_ENDPOINT}/teams`);
        const teamsData = await teamsResponse.json();
        setTeamsList(teamsData);

        if (!sportsResponse.ok || !teamsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [userPreferences]);

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // JSX rendering
  return (
    <>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-600 text-lg rounded-lg overflow-hidden shadow-xl w-112 max-h-full overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Select Favorites</h2>
              <hr className='border border-black m-1'/>
              {/* Sports checkboxes */}
              <div className="mb-3 grid grid-cols-3 gap-4">
                <h3 className="font-bold mb-2 col-span-3 underline">Sports</h3>
                {loading && <p>Loading...</p>}
                {sportsList.slice(0, 12).map((sport) => (
                  <label key={sport.id} className="block">
                    <input
                      type="checkbox"
                      name="sport"
                      value={sport.name}
                      checked={selectedSports.includes(sport.name)}
                      onChange={handleCheckboxChange}
                      className="mr-2 "
                    />
                    {sport.name}
                  </label>
                ))}
              </div>
              {/* Teams checkboxes */}
              <div className="grid grid-cols-3 gap-3">
                <h3 className="font-bold mb-2 col-span-3 underline">Teams</h3>
                {loading && <p>Loading...</p>}
                {teamsList.slice(0, 12).map((team) => (
                  <label key={team.id} className="block">
                    <input
                      type="checkbox"
                      name="team"
                      value={team.name}
                      checked={selectedTeams.includes(team.name)}
                      onChange={handleCheckboxChange}
                      className="mr-2 "
                    />
                    {team.name}
                  </label>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end px-6 pb-6 gap-2">
              <button
                onClick={handleSubmit}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Save Preferences
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreferencesPanel;
