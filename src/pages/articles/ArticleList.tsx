

import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import userAuthCheck from '../../hooks/userAuthCheck';
import { Article } from '../../context/Articles/types';
import { Dialog } from '@headlessui/react';

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const ifLog = userAuthCheck();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/articles`);
                const data = await response.json();
                setArticles(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleSport = (sport: string) => {
        setSelectedSport(sport === selectedSport ? null : sport);
    };

    const handleReadMore = async (article: Article) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/articles/${article.id}`);
            const data = await response.json();
            setSelectedArticle(data);
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error fetching article details:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedArticle(null);
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const filteredArticles = selectedSport
        ? articles.filter((article) => article.sport.name === selectedSport)
        : articles;

    return (
        <div className="flex bg-gray-900 text-white">
            <div className={location.pathname === '/landingpage' ? 'w-2/3 h-full overflow-y-auto' : 'flex-1'}>
                {location.pathname === '/articles' && <Navbar />}
                <div className="p-6">
                    <h1 className="text-4xl font-extrabold mb-8">Trending News</h1>
                    <div className="flex flex-wrap gap-4 mb-8 justify-center">
                        {Array.from(new Set(articles.map((article) => article.sport.name))).map((sport) => (
                            <button
                                key={sport}
                                onClick={() => handleSport(sport)}
                                className={`px-6 py-3 rounded-full transition-all duration-300 ease-in-out ${selectedSport === sport ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-600'}`}
                            >
                                {sport}
                            </button>
                        ))}
                        {loading && <p>Loading...</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(selectedSport || !ifLog) && filteredArticles.map((article) => (
                            <div key={article.id} className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <img src={article.thumbnail} alt={article.title} className="mb-4 rounded-lg w-full h-48 object-cover" />
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                                    <button
                                        onClick={() => handleReadMore(article)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Read more
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Dialog open={isModalOpen} onClose={handleCloseModal} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
                    <Dialog.Panel className="relative bg-white dark:bg-gray-900 dark:text-white rounded-lg p-6 mx-4 md:mx-0 shadow-xl max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedArticle && (
                            <>
                                <div className="md:border-r md:border-gray-700 pr-6">
                                    <Dialog.Title className="text-xl font-bold  p-2 rounded-lg w-full object-cover">{selectedArticle.sport.name}</Dialog.Title>
                                    <Dialog.Description className="font-semibold   p-2 rounded-lg w-full  object-cover">Summary: {selectedArticle.summary}</Dialog.Description>

                                    <img src={selectedArticle.thumbnail} alt={selectedArticle.title} className="mb-2 p-2 rounded-lg w-full h-38 object-cover" />
                                </div>
                                <div >
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.714 4.714a.75.75 0 11-1.06 1.06L12 11.647l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.714-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <Dialog.Title className="font-semibold mt-10 mb-4">{selectedArticle.content}</Dialog.Title>

                                    <Dialog.Title className="text-2xl font-bold mt-10 mb-4">{selectedArticle.title}</Dialog.Title>

                                    <Dialog.Description className="font-semibold mb-4">Ends at: {new Date(selectedArticle.date).toLocaleString()}</Dialog.Description>
                                    {selectedArticle.teams.length > 0 && (
                                        <div className="mt-4">
                                            <p className="font-semibold">Teams:</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedArticle.teams.map((team) => (
                                                    <span key={team.id} className="bg-gray-700 px-2 py-1 rounded-full">{team.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-6 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </Dialog.Panel>
                </Dialog>
            </div>

            {(location.pathname === '/landingpage' || location.pathname === '/') && (
                <div className="w-1/3 overflow-y-auto bg-gray-800 text-white hidden md:block">
                    <h1>hello</h1>
                </div>
            )}
        </div>
    );
};

export default ArticleList;
