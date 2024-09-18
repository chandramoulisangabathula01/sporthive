import React, { Suspense } from 'react';
import "./i18n";
import { AuthProvider } from './context/AuthorizeCxt';
import { RouterProvider } from "react-router-dom";
import router from './routes';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
    <AuthProvider>
      <RouterProvider router={router} />
      <Chatbot />
    </AuthProvider>
    </Suspense>
  );
};
// hello??

export default App;