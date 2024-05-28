import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Match } from '../../context/Matches/types'

interface Props {
  selectedSports: string[];
}

const PreferredMatches: React.FC<Props> = ({ selectedSports }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches`);
        const data = await response.json();
        setMatches(data.matches);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const preferredMatches = matches.filter(match => selectedSports.includes(match.sportName))
  
  return (
    <>
      {loading && <p>Loading...</p>}
      {preferredMatches && userData.preferences && preferredMatches.length > 0 &&
        <>
        <div className="bg-gray-900 pt-5 pb-5 ">
            <div className="bg-gray-900 text-white rounded-lg p-4 mx-4 shadow-lg">
                <div>
          <h1 className='text-white text-3xl font-bold flex justify-center py-4 bg-gray-900 rounded-lg shadow-md'>Your Choice:</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {loading && <p>Loading...</p>} */}
            {preferredMatches.map((match) => (
              <div key={match.id} className="relative bg-gray-800 rounded-2xl  p-6 shadow-md border border-gray-500">
                {match.isRunning && <div className="flex absolute top-0 right-0 p-1 text-red-500 font-bold rounded-full">
                  Live
                </div>}
                {/* Display match details */}
                <h2 className="text-2xl font-bold mb-2">{match.sportName}</h2>
                <h2 className="text-xl font-semibold mb-2">{match.name}</h2>
                <p className="text-gray-300">Location: {match.location}</p>
                <p className="text-gray-400">Ends at: {new Date(match.endsAt).toLocaleString()}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-400">Teams:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.teams.map((team) => (
                      <span key={team.id} className="bg-gray-700 text-gray-300 px-1 rounded-lg m-2 ">{team.name}</span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          </div>
          </div>
        </>
      }
    </>
  );
};

export default PreferredMatches;