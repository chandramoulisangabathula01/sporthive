import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Article } from '../../context/Articles/types';
import { Dialog } from '@headlessui/react';

const ArticlesPreferred: React.FC = () => {
    // State variables
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticleReadMore, setSelectedArticleReadMore] = useState<Article | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [preferredArticles, setPreferredArticles] = useState<Article[]>([]);
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

    // Filter preferred articles based on user preferences
    const retrievePreferences = () => {
        const userDataString = localStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;

        if (!userData || !userData.preferences) {
            setPreferredArticles(articles);
            return;
        }

        const latestSelectedSports = userData.preferences.selectedSports || [];
        const latestSelectedTeams = userData.preferences.selectedTeams || [];

        const filteredArticles = articles.filter(article => {
            return (
                latestSelectedSports.includes(article.sport.name) ||
                article.teams.some(team => latestSelectedTeams.includes(team.name))
            );
        });

        setPreferredArticles(filteredArticles);
    };

    // Update preferred articles when articles change
    useEffect(() => {
        retrievePreferences();
    }, [articles]);

    // Refresh preferred articles
    const handleRefresh = () => {
        retrievePreferences();
    };

    // Fetch additional details of the article and open modal
    const handleReadMore = async (article: Article) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/articles/${article.id}`);
            const data = await response.json();
            setSelectedArticleReadMore(data);
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error fetching article details:', error);
        }
    };

    // Close modal
    const handleCloseModal = () => {
        setSelectedArticleReadMore(null);
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    // JSX rendering
    return (
        <>
            {/* Refresh button */}
            <button
                className='text-xl flex items-center font-semibold rounded-lg'
                onClick={handleRefresh}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd" />
                </svg>
            </button>
            {/* Loading indicator */}
            {loading && <p>Loading...</p>}
            {/* Render preferred articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {preferredArticles.map((article) => (
                    <div key={article.id} className='bg-gray-800  rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'>
                        <img src={article.thumbnail} alt={article.title} className='mb-4 rounded-lg w-full h-48 object-cover' />
                        <h2 className='text-xl font-bold mb-2'> {article.title}</h2>
                        {/* Read more button */}
                        <button
                            onClick={() => handleReadMore(article)}
                            className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Read more
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Article details modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal} className=" ">
                <div className="fixed inset-0 w-screen overflow-y-auto p-4 inset-0 z-50 items-center justify-center  bg-black bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center">
                        <Dialog.Panel className="relative bg-gray-500 dark:bg-gray-900 dark:text-white rounded-lg p-6 mx-5 md:mx-0 shadow-xl max-w-4xl grid grid-cols-2 md:grid-cols-2 gap-6">
                            {selectedArticleReadMore && (
                                <>
                                    {/* Article details */}
                                    <div className="md:border-r md:border-gray-700 pr-6">
                                        <Dialog.Title className="text-2xl font-bold  p-2 rounded-lg w-full object-cover">{selectedArticleReadMore.sport.name}</Dialog.Title>
                                        <Dialog.Description className="font-semibold   p-2 rounded-lg w-full  object-cover">Summary : {selectedArticleReadMore.summary}</Dialog.Description>
                                        <img src={selectedArticleReadMore.thumbnail} alt={selectedArticleReadMore.title} className="mb-2 p-2 rounded-lg w-full h-38 object-cover" />
                                    </div>
                                    <div>
                                        {/* Close button */}
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                                        >
                                            Close
                                        </button>
                                        {/* Additional article details */}
                                        <Dialog.Title className="text-2xl font-bold mt-10 underline mb-4">{selectedArticleReadMore.title}</Dialog.Title>
                                        <Dialog.Title className="font-semibold mt-10 mb-4">{selectedArticleReadMore.content}</Dialog.Title>
                                        <Dialog.Description className="font-semibold mb-4">Ends at : {new Date(selectedArticleReadMore.date).toLocaleString()}</Dialog.Description>
                                        {selectedArticleReadMore.teams.length > 0 && (
                                            <div className="mt-4">
                                                <p className="font-semibold">Teams:</p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {selectedArticleReadMore.teams.map((team) => (
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
        </>
    );
};

export default ArticlesPreferred;
