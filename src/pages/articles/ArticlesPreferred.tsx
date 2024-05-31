import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Article } from '../../context/Articles/types';
import { Dialog } from '@headlessui/react';

const UserPreferredArticles: React.FC = () => {
    // State variables
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    // Fetch articles from API on component mount
    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/articles`);
                const articlesData = await response.json();
                setAllArticles(articlesData);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch articles:', error);
                setIsLoading(false);
            }
        };

        loadArticles();
    }, []);

    // Get preferred articles based on user preferences
    const fetchUserPreferences = () => {
        const userDataString = localStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;

        if (!userData || !userData.preferences) {
            setFilteredArticles(allArticles);
            return;
        }

        const preferredSports = userData.preferences.selectedSports || [];
        const preferredTeams = userData.preferences.selectedTeams || [];

        const preferredArticles = allArticles.filter(article => {
            return (
                preferredSports.includes(article.sport.name) ||
                article.teams.some(team => preferredTeams.includes(team.name))
            );
        });

        setFilteredArticles(preferredArticles);
    };

    // Update filtered articles when all articles change
    useEffect(() => {
        fetchUserPreferences();
    }, [allArticles]);

    // Refresh preferred articles
    const refreshPreferredArticles = () => {
        fetchUserPreferences();
    };

    // Fetch article details and show modal
    const showArticleDetails = async (article: Article) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/articles/${article.id}`);
            const articleDetails = await response.json();
            setCurrentArticle(articleDetails);
            setModalVisible(true);
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Failed to fetch article details:', error);
        }
    };

    // Close modal
    const closeModal = () => {
        setCurrentArticle(null);
        setModalVisible(false);
        document.body.style.overflow = 'auto';
    };

    // JSX rendering
    return (
        <>
            {/* Refresh button */}
            <div className='flex flex-wrap items-center mt-3'>
                <button
                    className="bg-gray-700 hover:bg-gray-500 text-white   rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"                    onClick={refreshPreferredArticles}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6' viewBox="0 0 24 24"><path fill="currentColor" d="M19 8l-4 4h3c0 3.31-2.69 6-6 6c-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6c1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4l4-4H6z"><animateTransform attributeName="transform" attributeType="XML" dur="2.5s" from="360 12 12" repeatCount="indefinite" to="0 12 12" type="rotate" /></path></svg>
                </button>
            </div>

            {/* Loading indicator */}
            {isLoading && <p>Loading articles...</p>}

            {/* Render filtered articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <div key={article.id} className='bg-gray-800 rounded-lg p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'>
                        <img src={article.thumbnail} alt={article.title} className='mb-4 rounded-lg w-full h-48 object-cover' />
                        <h2 className='text-lg font-semibold mb-2'>{article.title}</h2>
                        {/* Read More button */}
                        <button
                            onClick={() => showArticleDetails(article)}
                            className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Read More
                        </button>
                    </div>
                ))}
            </div>

            {/* Article details modal */}
            <Dialog open={modalVisible} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-gray-700 rounded-lg p-6 mx-4 md:mx-0 shadow-xl max-w-4xl">
                    {currentArticle && (
                        <>
                            <div className="border-b border-gray-500 mb-4 pb-4">
                                <Dialog.Title className="text-xl font-bold">{currentArticle.title}</Dialog.Title>
                                <Dialog.Description className="mt-2 text-gray-300">{currentArticle.summary}</Dialog.Description>
                            </div>
                            <img src={currentArticle.thumbnail} alt={currentArticle.title} className="mb-4 rounded-lg w-full h-48 object-cover" />
                            <div>
                                <p className="text-gray-300">{currentArticle.content}</p>
                                <p className="mt-4">Ends at: {new Date(currentArticle.date).toLocaleString()}</p>
                                {currentArticle.teams.length > 0 && (
                                    <div className="mt-4">
                                        <p className="font-semibold text-gray-300">Teams:</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {currentArticle.teams.map((team) => (
                                                <span key={team.id} className="bg-gray-600 px-2 py-1 rounded-full text-gray-200">{team.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.714 4.714a.75.75 0 11-1.06 1.06L12 11.647l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.714-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </Dialog>
        </>
    );
};

export default UserPreferredArticles;
