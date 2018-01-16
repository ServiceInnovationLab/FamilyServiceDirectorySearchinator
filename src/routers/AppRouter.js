import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchinatorPage from '../components/SearchinatorPage';

const AppRouter = () => (
  <BrowserRouter>
    <SearchinatorPage />
  </BrowserRouter>
);

export default AppRouter;
