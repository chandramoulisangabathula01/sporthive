import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import userAuthCheck from '../../hooks/userAuthCheck';
import { Article } from '../../context/Articles/types';

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const ifLog = userAuthCheck();

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
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error fetching article details:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedArticle(null);
        document.body.style.overflow = 'auto';
    };

    const filteredArticles = selectedSport
        ? articles.filter((article) => article.sport.name === selectedSport)
        : articles;

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-full h-screen overflow-y-auto">
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
                        {ifLog && !loading && (
                            <>
                                <button
                                    onClick={() => setSelectedSport(null)}
                                    className={`px-6 py-3 rounded-full transition-all duration-300 ease-in-out ${selectedSport === null ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-600'}`}
                                >
                                    Your choice
                                </button>
                            </>
                        )}
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

                <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out ${selectedArticle ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="bg-gray-900 rounded-lg p-6 max-w-2xl mx-auto my-8 max-h-full overflow-y-auto shadow-xl">
                        {selectedArticle && (
                            <>
                                <img src={selectedArticle.thumbnail} alt={selectedArticle.title} className="mb-4 rounded-lg w-full h-48 object-cover" />
                                <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
                                <p className="font-semibold">Ends at: {new Date(selectedArticle.date).toLocaleString()}</p>
                                {selectedArticle.teams.length > 0 && (
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="font-semibold">Teams:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedArticle.teams.map((team) => (
                                                <span key={team.id} className="bg-gray-700 px-2 py-1 rounded-full">{team.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-4 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {(location.pathname === '/landingpage' || location.pathname === '/') && (
                <div className="w-1/3 overflow-y-auto bg-gray-800 text-white hidden md:block">

                </div>
            )}
        </div>
    );
};

export default ArticleList;
