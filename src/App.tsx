import React, { Suspense } from 'react';
import "./i18n";
import { AuthProvider } from './context/AuthorizeCxt';
import { RouterProvider } from "react-router-dom";
import router from './routes';

const App: React.FC = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </Suspense>
  );
};
// hello??

export default App;