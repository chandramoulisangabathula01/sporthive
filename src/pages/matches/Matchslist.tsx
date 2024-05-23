
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

    

    return (
        <div className="bg-black min-h-screen text-white">
            {location.pathname === '/matches' && <Navbar />}
            <h1 className='text-white text-3xl font-bold flex justify-center py-4 bg-gray-900 rounded-lg shadow-md'>Match List</h1>
            <div className="bg-gray-800 rounded-lg p-6 m-4 shadow-lg">
                {location.pathname === '/matches' && <LiveMatches />}
                <div className="flex mt-6 flex-wrap gap-4 mb-8 justify-center">
                    {Array.from(new Set(matches.map((match) => match.sportName))).map((sport) => (
                        <button
                            key={sport}
                            onClick={() => handleSportClick(sport)}
                            className={`px-6 py-3 rounded-full transition-all duration-300 bg-gray-700 text-white ease-in-out ${selectedSport === sport ? ' text-white' : ' bg-gray-700 text-gray-300 hover:bg-gray-500'}`}

                        >
                            {sport}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMatches.map((match) => (

                        <div key={match.id} className="bg-gray-900  rounded-lg p-6 shadow-md relative border border-gray-700">
                            {match.isRunning && (
                                <div className="flex absolute top-0 right-0 p-1 text-red-500 font-bold rounded-full">
                                    Live
                                </div>
                            )}
                            <h2 className="text-xl font-bold mb-2">{match.sportName}</h2>
                            <h3 className="text-lg font-semibold mb-2">{match.name}</h3>
                            <p className="text-gray-400 mb-4">{match.location}</p>
                            <button
                                onClick={() => handleReadMore(match.id)}
                                className="bg-gray-700  hover:bg-gray-500 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Read More
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedMatch && (
                <Dialog open={isModalOpen} onClose={handleCloseModal} className="relative z-50 ">
                    <div className="fixed inset-0 w-screen overflow-y-auto p-4  z-50 items-center justify-center  bg-black bg-opacity-50">
                        <div className="flex min-h-full items-center justify-center">
                           
                            <Dialog.Panel className="relative bg-gray-500 dark:bg-gray-900 dark:text-white rounded-lg p-6 mx-5 md:mx-0 shadow-xl max-w-4xl grid  gap-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.714 4.714a.75.75 0 11-1.06 1.06L12 11.647l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.714-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <Dialog.Title className="text-2xl font-bold">{selectedMatch.sportName}</Dialog.Title>
                                <Dialog.Description className="mt-2 text-lg font-semibold">{selectedMatch.name}</Dialog.Description>
                                <p className="mt-2 text-lg font-semibold">{selectedMatch.location}</p>
                                
                               
                                <p className="mt-4 text-gray-700 dark:text-gray-300">{(selectedMatch.story)}</p>


                            </Dialog.Panel>
                            
                        </div>
                    </div>

                </Dialog>
            )}
        </div>
    );
};

export default MatchList;
