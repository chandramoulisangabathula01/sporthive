import { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';

interface Preferences {
  selectedSports: never[];
  selectedTeams: never[];
  sports: string[];
  teams: string[];
}

const useFetchPreferences = (authToken: string | null): Preferences | null => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);

  useEffect(() => {
    const retrievePreferences = async () => {
      try {
      if (!authToken) return;

        const result = await fetch(`${API_ENDPOINT}/user/preferences`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!result.ok) {
          throw new Error('Unable to load user preferences');
        }

        const resultData = await result.json();
        setPreferences(resultData.preferences);
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      }
    };

    retrievePreferences();
  }, [authToken]);

  return preferences;
};

export default useFetchPreferences;
