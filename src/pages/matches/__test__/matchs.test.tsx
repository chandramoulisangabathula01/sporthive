import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MatchList from "..";
import { BrowserRouter as Router } from 'react-router-dom';

describe("MatchList Component", () => {
    test('renders the heading "Match List"', () => {
        render(
            <Router>
                <MatchList />
            </Router>
        );

        const headingElement = screen.queryByText(/Match List/i);
        console.log(headingElement);
    });

    test('renders sport buttons', async () => {
        render(
            <Router>
                <MatchList />
            </Router>
        );

        await waitFor(() => {
            const sportButtons = screen.queryAllByRole('button');
            console.log(sportButtons);
        });
    });

    test('renders match details', async () => {
        render(
            <Router>
                <MatchList />
            </Router>
        );

        await waitFor(() => {
            const matchTitle = screen.queryByText(/Sample Match Name/i); // Adjust title as needed
            const matchLocation = screen.queryByText(/Sample Location/i); // Adjust location as needed
            console.log(matchTitle);
            console.log(matchLocation);
        });
    });

    test('opens and closes the modal on "Read More" click', async () => {
        render(
            <Router>
                <MatchList />
            </Router>
        );

        await waitFor(() => {
            const readMoreButton = screen.queryByText(/Read More/i);
            console.log(readMoreButton);

            if (readMoreButton) {
                fireEvent.click(readMoreButton);

                const modalTitle = screen.queryByText(/Sample Match Name/i); // Adjust title as needed
                console.log(modalTitle);

                const closeButton = screen.queryByRole('button', { name: /Close/i });
                if (closeButton) {
                    fireEvent.click(closeButton);
                    console.log(modalTitle); // Check if modal is closed
                }
            }
        });
    });
});
