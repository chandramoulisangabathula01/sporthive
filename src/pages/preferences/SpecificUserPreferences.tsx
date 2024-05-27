import { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';

// Define the structure of user preferences
interface UserPreferences {
  selectedSports: string[];
  selectedTeams: string[];
}

// Custom hook to fetch user preferences
const useUserPreferences = (authToken: string | null): UserPreferences | null => {
  // State variable to store user preferences
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        // If there's no authentication token, return early
        if (!authToken) return;

        // Fetch user preferences from the server
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // If fetching fails, throw an error
        if (!response.ok) {
          throw new Error('Failed to fetch user preferences');
        }

        // Parse response data and update user preferences state
        const data = await response.json();
        setUserPreferences(data.preferences);

      } catch (error) {
        // Log error if fetching user preferences fails
        console.error('Error fetching user preferences:', error);
      }
    };

    // Call the fetchUserPreferences function
    fetchUserPreferences();
  }, [authToken]); // Trigger useEffect when authToken changes

  // Return user preferences
  return userPreferences;
};

export default useUserPreferences;
