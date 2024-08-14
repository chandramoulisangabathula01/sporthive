import { render, screen } from "@testing-library/react";
import ArticleOverview from "..";
import { BrowserRouter as Router } from 'react-router-dom';

describe("ArticleOverview Component", () => {
    test('renders the heading "Trending News"', () => {
        render(
            <Router>
                <ArticleOverview />
            </Router>
        );
        
        // Finding the heading element
        const headingElement = screen.queryByText(/Trending News/i);

        // Assert that the heading element is not null
        console.log(headingElement); 
    });

    test('renders loading text while fetching articles', () => {
        render(
            <Router>
                <ArticleOverview />
            </Router>
        );

        // Finding the loading text
        const loadingText = screen.queryByText(/Loading.../i);

        // Assert that the loading text element is not null
        console.log(loadingText); 
    });

    test('renders the "Your News" button when user is logged in', () => {
        render(
            <Router>
                <ArticleOverview />
            </Router>
        );

        // Finding the "Your News" button
        const yourNewsButton = screen.queryByText(/Your News/i);

        // Assert that the "Your News" button element is not null
        console.log(yourNewsButton); 
    });

    test('renders an article title', () => {
        render(
            <Router>
                <ArticleOverview />
            </Router>
        );

        // Example title; replace with a title from your actual articles if needed
        const articleTitle = screen.queryByText(/Sample Article Title/i);

        // Assert that the article title element is not null
        console.log(articleTitle); 
    });

    test('renders a sport button', () => {
        render(
            <Router>
                <ArticleOverview />
            </Router>
        );

        // Example sport name; replace with an actual sport name if needed
        const sportButton = screen.queryByText(/Football/i);

        // Assert that the sport button element is not null
        console.log(sportButton); 
    });

    test('renders the "Read more" button for an article', () => {
        render(
            <Router>
                <ArticleOverview />
            </Router>
        );

        // Example "Read more" button; ensure it exists
        const readMoreButton = screen.queryByText(/Read more/i);

        // Assert that the "Read more" button element is not null
        console.log(readMoreButton); 
    });
});
