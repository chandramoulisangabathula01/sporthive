import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Match } from '../../context/Matches/types';
import { t } from 'i18next';

interface Props {
  preferredSports: string[];
}

const PreferredMatches: React.FC<Props> = ({ preferredSports }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches`);
        const data = await response.json();
        setMatches(data.matches);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = matches.filter(match => preferredSports.includes(match.sportName));

  return (
    <div className="preferred-matches-container">
      {loading ? (
        <p>Loading matches...</p>
      ) : (
        <>
          {filteredMatches.length > 0 ? (
            <div className="matches-list">
              <h1 className="title">Preferred Matches:</h1>
              <div className="matches-grid">
                {filteredMatches.map((match) => (
                  <div key={match.id} className="match-card">
                    {match.isRunning && <span className="live-indicator">Live</span>}
                    <h2 className="match-sport">{match.sportName}</h2>
                    <h3 className="match-name">{match.name}</h3>
                    <p className="match-location">Location: {match.location}</p>
                    <p className="match-end-time">{t('Ends at: ')} {new Date(match.endsAt).toLocaleString()}</p>
                    <div className="match-teams">
                      <p>Teams:</p>
                      {match.teams.map((team) => (
                        <span key={team.id} className="team-name">{team.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}
    </div>
  );
};

export default PreferredMatches;
