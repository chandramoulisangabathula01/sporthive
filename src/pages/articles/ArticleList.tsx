import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import userAuthCheck from '../../hooks/userAuthCheck';
import { Article } from '../../context/Articles/types';

import { Dialog } from '@headlessui/react';
import SportList from '../sports/SportList';
// import ArticlesPreferred from './ArticlesPreferred';

// Define ArticleList functional component
const ArticleList: React.FC = () => {
    // State variables
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const ifLog = userAuthCheck();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Fetch articles from API on component mount
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

    // Event handlers
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

    // Filter articles based on selected sport
    const filteredArticles = selectedSport
        ? articles.filter((article) => article.sport.name === selectedSport)
        : articles;

    return (
        <div className="flex bg-gray-900 text-white">
            {/* w-2/3 */}
            {/* Main content */}
            <div className={location.pathname === '/landingpage' ? 'w-3/4 h-full overflow-y-auto' : 'flex-1'}>
                {location.pathname === '/articles' && <Navbar />}
                <div className="p-6 ">
                    <h1 className="text-3xl font-extrabold mb-2">Trending News</h1>
                    <div className="flex flex-wrap gap-4 mb-8 justify-center">
                        {/* Conditional rendering based on user authentication */}
                        {ifLog && (
                            <>
                                <button
                                    onClick={() => setSelectedSport(null)}
                                    className={`px-6 mt-5 py-3 rounded-full transition-all duration-300 bg-gray-700 text-white ease-in-out ${selectedSport === null ? ' text-white' : ' bg-gray-700 text-gray-300 hover:bg-gray-500'}`}


                                >
                                    Your News
                                </button>
                                {/* {!selectedSport && <ArticlesPreferred />}                                 */}
                            </>
                        )}
                        {/* Render buttons for filtering articles by sport */}
                        {Array.from(new Set(articles.map((article) => article.sport.name))).map((sport) => (
                            <button
                                key={sport}
                                onClick={() => handleSport(sport)}
                                className={`px-6 mt-5 py-3 rounded-full transition-all duration-300 bg-gray-700 text-white ease-in-out ${selectedSport === sport ? ' text-white' : ' bg-gray-700 text-gray-300 hover:bg-gray-500'}`}
                            >
                                {sport}
                            </button>
                            
                        ))}
                        {/* Loading indicator */}
                        {loading && <p>Loading...</p>}
                    </div>
                    {/* Render article cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Conditional rendering based on selected sport and user authentication */}
                        {(selectedSport || !ifLog) && filteredArticles.map((article) => (
                            <div key={article.id} className="bg-gray-800  rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <img src={article.thumbnail} alt={article.title} className="mb-4 rounded-lg w-full h-48 object-cover" />
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                                    <button
                                        onClick={() => handleReadMore(article)}
                                        className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Read more
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(selectedSport) || filteredArticles.map((article) => (
                            <div key={article.id} className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <img src={article.thumbnail} alt={article.title} className="mb-4 rounded-lg w-full h-48 object-cover" />
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                                    <button
                                        onClick={() => handleReadMore(article)}
                                        className="bg-gray-700 hover:bg-gray-500 mt-2 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Read more
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Modal for displaying article details */}
                <Dialog open={isModalOpen} onClose={handleCloseModal} className=" ">
                    <div className="fixed inset-0 w-screen overflow-y-auto p-4 inset-0 z-50 items-center justify-center  bg-black bg-opacity-50">
                        <div className="flex min-h-full items-center justify-center">
                            <Dialog.Panel className="relative bg-gray-500 dark:bg-gray-900 dark:text-white rounded-lg p-6 mx-5 md:mx-0 shadow-xl max-w-4xl grid grid-cols-2 md:grid-cols-2 gap-6">
                                {selectedArticle && (
                                    <>
                                        {/* Article details */}
                                        <div className="md:border-r md:border-gray-700 pr-6">
                                            <Dialog.Title className="text-2xl font-bold  p-2 rounded-lg w-full object-cover">{selectedArticle.sport.name}</Dialog.Title>
                                            <Dialog.Description className="font-semibold   p-2 rounded-lg w-full  object-cover">Summary : {selectedArticle.summary}</Dialog.Description>

                                            <img src={selectedArticle.thumbnail} alt={selectedArticle.title} className="mb-2 p-2 rounded-lg w-full h-38 object-cover" />
                                        </div>
                                        <div >
                                            {/* Close button */}
                                            <button
                                                type="button"
                                                onClick={handleCloseModal}
                                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.714 4.714a.75.75 0 11-1.06 1.06L12 11.647l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.714-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                </svg>
                                                {/* Additional article details */}
                                            </button>
                                            <Dialog.Title className="text-2xl font-bold mt-10 underline mb-4">{selectedArticle.title}</Dialog.Title>
                                            <Dialog.Title className="font-semibold mt-10 mb-4">{selectedArticle.content}</Dialog.Title>


                                            <Dialog.Description className="font-semibold mb-4">Ends at : {new Date(selectedArticle.date).toLocaleString()}</Dialog.Description>
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

                                        </div>
                                    </>
                                )}
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </div>
            {/* Sidebar */}
            {location.pathname === '/landingpage' && (
                <div className="w-2/6 p-6 overflow-y-auto bg-gray-900 text-white hidden md:block overflow-y-auto' : 'flex-1 ">
                    <SportList />
                </div>
            )}
        </div>
    );
};

export default ArticleList;
