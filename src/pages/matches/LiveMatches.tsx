
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
        <div className="bg-gray-900 pt-5">
            <div className="bg-gray-900 text-white rounded-lg p-4 mx-4 shadow-lg">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading && <p className="text-center text-gray-400">Loading...</p>}
                        {liveMatcheScore.map((match: Match) => (
                            <div key={match.id} className="relative bg-gray-800 rounded-2xl  p-6 shadow-md border border-gray-500">
                                <div className="absolute top-0 flex mt-3 mr-3 border border-gray-500 justify-between items-center right-0 p-2 gap-3 text-red-500 font-bold rounded-2xl bg-gray-900">
                                    <span className="relative flex items-center justify-center h-3 w-3 ">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>

                                    </span> Live <span className="= cursor-pointer" onClick={() => handleSyncScores(match.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    </span>
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
