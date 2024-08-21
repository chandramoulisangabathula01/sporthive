import React, { useState, useEffect, useCallback } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Team, Sport } from '../../context/Preferences/types';
import useUserPreferences from './SpecificUserPreferences';
import { t } from 'i18next';

const PreferencesPanel: React.FC = () => {
  const authToken = localStorage.getItem("authToken");
  const [preferences, setPreferences] = useState<{ sports: string[], teams: string[] }>({ sports: [], teams: [] });
  const [availableOptions, setAvailableOptions] = useState<{ sports: Sport[], teams: Team[] }>({ sports: [], teams: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);

  const userPreferences = useUserPreferences(authToken);

  const fetchOptions = useCallback(async () => {
    try {
      const [sportsResponse, teamsResponse] = await Promise.all([
        fetch(`${API_ENDPOINT}/sports`),
        fetch(`${API_ENDPOINT}/teams`),
      ]);

      if (!sportsResponse.ok || !teamsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const sportsData = await sportsResponse.json();
      const teamsData = await teamsResponse.json();

      setAvailableOptions({ sports: sportsData.sports, teams: teamsData });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  useEffect(() => {
    if (userPreferences) {
      setPreferences({
        sports: userPreferences.selectedSports || [],
        teams: userPreferences.selectedTeams || [],
      });
    }
  }, [userPreferences]);

  const handleCheckboxChange = (type: 'sports' | 'teams', value: string, checked: boolean) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [type]: checked
        ? [...prevPreferences[type], value]
        : prevPreferences[type].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!authToken) {
        throw new Error('Authentication token is missing or invalid.');
      }
  
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          preferences: {
            selectedSports: preferences.sports,
            selectedTeams: preferences.teams,
          },
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update preferences');
      }
  
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...JSON.parse(localStorage.getItem('userData') || '{}'),
          preferences: {
            selectedSports: preferences.sports,
            selectedTeams: preferences.teams,
          },
        })
      );
  
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating preferences:', error);
      // Handle error state, display error message to user, etc.
    }
  };
    
  

  return (
    <>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-600 text-lg rounded-lg overflow-hidden shadow-xl w-112 max-h-full overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{t('Select Favorites')} </h2>
              <hr className='border border-black m-1'/>
              <div className="mb-3 grid grid-cols-3 gap-4">
                <h3 className="font-bold mb-2 col-span-3 underline">{t('Sports')}</h3>
                {isLoading ? (
                  <p>{t('Loading...')}</p>
                ) : (
                  availableOptions.sports.slice(0, 12).map((sport) => (
                    <label key={sport.id} className="block">
                      <input
                        type="checkbox"
                        name="sport"
                        value={sport.name}
                        checked={preferences.sports.includes(sport.name)}
                        onChange={(e) => handleCheckboxChange('sports', sport.name, e.target.checked)}
                        className="mr-2"
                      />
                      {t(`${sport.name}`)}
                    </label>
                  ))
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <h3 className="font-bold mb-2 col-span-3 underline">{t('Teams')}</h3>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  availableOptions.teams.slice(0, 12).map((team) => (
                    <label key={team.id} className="block">
                      <input
                        type="checkbox"
                        name="team"
                        value={team.name}
                        checked={preferences.teams.includes(team.name)}
                        onChange={(e) => handleCheckboxChange('teams', team.name, e.target.checked)}
                        className="mr-2"
                      />
                      {t(`${team.name}`)}
                    </label>
                  ))
                )}
              </div>
            </div>
            <div className="flex justify-end px-6 pb-6 gap-2">
              <button
                onClick={handleSubmit}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                 {t('Save Preferences')}
              </button>
              <button
                onClick={() => setIsModalVisible(false)}
                className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                 {t('Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreferencesPanel;
