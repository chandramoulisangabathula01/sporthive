
import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import LiveMatches from './LiveMatches';
import { Match } from '../../context/Matches/types';
import { Dialog } from '@headlessui/react';

const MatchList: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const location = useLocation();
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/matches`);
                const data = await response.json();
                setMatches(data.matches);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    const handleSportClick = (sport: string) => {
        setSelectedSport(sport === selectedSport ? null : sport);
    };

    const filteredMatches = selectedSport
        ? matches.filter((match) => match.sportName === selectedSport)
        : matches;

    const handleReadMore = async (matchId: number) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`);
            const data = await response.json();
            setSelectedMatch(data);
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error fetching match details:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedMatch(null);
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const getFirstNWords = (text: string, wordCount: number): string => {
        return text.split(' ').slice(0, wordCount).join(' ') + '...';
    };

    return (
        <div className="bg-black min-h-screen text-white">
            {location.pathname === '/matches' && <Navbar />}
            <h1 className='text-white text-3xl font-bold flex justify-center py-4 bg-gray-900 rounded-lg shadow-md'>Match List</h1>
            <div className="bg-gray-800 rounded-lg p-6 m-4 shadow-lg">
                {location.pathname === '/matches' && <LiveMatches />}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    {Array.from(new Set(matches.map((match) => match.sportName))).map((sport) => (
                        <button
                            key={sport}
                            onClick={() => handleSportClick(sport)}
                            className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${selectedSport === sport ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                        >
                            {sport}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMatches.map((match) => (
                        <div key={match.id} className="bg-gray-900 rounded-lg p-6 shadow-md relative border border-gray-700">
                            {match.isRunning && (
                                <div className="flex absolute top-0 right-0 p-1 text-red-500 font-bold rounded-full">
                                    &#x25cf;Live
                                </div>
                            )}
                            <h2 className="text-xl font-bold mb-2">{match.sportName}</h2>
                            <h3 className="text-lg font-semibold mb-2">{match.name}</h3>
                            <p className="text-gray-400">{match.location}</p>
                            <button
                                onClick={() => handleReadMore(match.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md mt-4 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Read More
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedMatch && (
                <Dialog open={isModalOpen} onClose={handleCloseModal} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
                    <Dialog.Panel className="relative bg-white dark:bg-gray-900 dark:text-white rounded-lg p-6 mx-4 md:mx-0 shadow-xl max-w-lg">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.714 4.714a.75.75 0 11-1.06 1.06L12 11.647l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.714-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <Dialog.Title className="text-2xl font-bold">{selectedMatch.sportName}</Dialog.Title>
                        <Dialog.Description className="mt-2 text-lg font-semibold">{selectedMatch.name}</Dialog.Description>
                        <img src={selectedMatch.thumbnail} alt={selectedMatch.name} className="mt-4 w-full h-auto rounded-md" />
                        <p className="mt-4 text-gray-700 dark:text-gray-300">{getFirstNWords(selectedMatch.story, 80)}</p>
                        
                    </Dialog.Panel>
                </Dialog>
            )}
        </div>
    );
};

export default MatchList;
