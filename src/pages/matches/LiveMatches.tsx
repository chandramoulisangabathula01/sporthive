
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";

import { Match } from '../../context/Matches/types'

const LiveMatches: React.FC = () => {
    const [liveMatcheScore, setliveMatcheScore] = useState<Match[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/matches`);
                const data = await response.json();
                const liveMatches = data.matches.filter((match: Match) => match.isRunning);
                const liveMatchesWithScoresPromises = liveMatches.map(async (match: Match) => {
                    const matchResponse = await fetch(`${API_ENDPOINT}/matches/${match.id}`);
                    const matchData = await matchResponse.json();
                    return { ...match, score: matchData.score };
                });
                const liveMatchesWithScores = await Promise.all(liveMatchesWithScoresPromises);
                setliveMatcheScore(liveMatchesWithScores);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching matches:', error);
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const handleSyncScores = async (matchId: number) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`);
            const data = await response.json();
            setliveMatcheScore(prevMatches =>
                prevMatches.map(match =>
                    match.id === matchId ? { ...match, score: data.score } : match
                )
            );
        } catch (error) {
            console.error('Error syncing scores:', error);
        }
    };

    return (
        <div className="bg-gray-900">
            <div className="bg-gray-900 text-white rounded-lg p-4 mx-4 shadow-lg">
                <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading && <p className="text-center text-gray-400">Loading...</p>}
                    {liveMatcheScore.map((match: Match) => (
                        <div key={match.id} className="relative bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
                            <div className="absolute top-0 right-0 p-2 text-red-500 font-bold rounded-full bg-gray-900">
                                &#x25cf; Live <span className="ml-2 cursor-pointer" onClick={() => handleSyncScores(match.id)}>&#x27f3;</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{match.sportName}</h2>
                            <h3 className="text-xl font-semibold mb-2">{match.name}</h3>
                            <p className="text-gray-300">Location: {match.location}</p>
                            {match.score && (
                                <div className="mt-4">
                                    <p className="font-semibold text-lg">Scores:</p>
                                    <div className="flex space-x-6 text-gray-400">
                                        {Object.entries(match.score).map(([teamName, score]) => (
                                            <p key={teamName}>{`${teamName}: ${score}`}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMatches;
