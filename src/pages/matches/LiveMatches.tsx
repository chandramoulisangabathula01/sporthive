import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Match } from '../../context/Matches/types'
import userAuthCheck from '../../hooks/userAuthCheck'; // Import custom hook for user authentication check
import PreferredMatches from "./MatchesPreferred";
// import PreferredMatches from "./PreferredMatches"; // Ensure this import path is correct
import { useTranslation } from "react-i18next";


const CurrentMatches: React.FC = () => {
    const [currentMatches, setCurrentMatches] = useState<Match[]>([]);
    const ifLog = userAuthCheck(); // Use the custom hook to get authentication status
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { t } = useTranslation();

    useEffect(() => {
        const getMatches = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/matches`);
                const result = await response.json();
                const ongoingMatches = result.matches.filter((match: Match) => match.isRunning);
                const matchesWithScores = await Promise.all(ongoingMatches.map(async (match: Match) => {
                    const matchResponse = await fetch(`${API_ENDPOINT}/matches/${match.id}`);
                    const matchDetails = await matchResponse.json();
                    return { ...match, score: matchDetails.score };
                }));
                setCurrentMatches(matchesWithScores);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch matches:', error);
                setIsLoading(false);
            }
        };

        getMatches();
    }, []);

    const refreshScores = async (matchId: number) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`);
            const matchData = await response.json();
            setCurrentMatches(prevMatches =>
                prevMatches.map(match =>
                    match.id === matchId ? { ...match, score: matchData.score } : match
                )
            );
        } catch (error) {
            console.error('Error updating scores:', error);
        }
    };

    // Retrieve user preferences from local storage if the user is authenticated
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : {};
    const preferredSports = ifLog ? userData.preferences?.preferredSports || [] : [];

    return (
        <div className="bg-gray-900 pt-5 pb-5">
            <div className="bg-gray-900 text-white rounded-lg p-4 mx-4 shadow-lg">
                <h1 className='text-white text-3xl font-bold text-center mb-4 bg-gray-900 rounded-lg shadow-md'>{t('Current Matches:')}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading && <p className="text-center text-gray-400">{t('Loading...')}</p>}
                    {currentMatches.map((match: Match) => (
                        <div key={match.id} className="relative bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-500">
                            <div className="absolute top-0 flex mt-3 mr-3 border border-gray-500 justify-between items-center right-0 p-2 gap-3 text-red-500 font-bold rounded-2xl bg-gray-900">
                                <span className="relative flex items-center justify-center h-3 w-3 ">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                {t('Live')} 
                                <span className="cursor-pointer" onClick={() => refreshScores(match.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{t(`${match.sportName}`)}</h2>
                            <h3 className="text-xl font-semibold mb-2">{match.name}</h3>
                            <p className="text-gray-300">{t('Location: ')} {match.location}</p>
                            {match.score && (
                                <div className="mt-4">
                                    <p className="font-semibold text-lg"> Scores:</p>
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
           
            {ifLog && <PreferredMatches preferredSports={preferredSports} />}

        </div>
    );
};

export default CurrentMatches;
