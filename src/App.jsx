import { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import '../src/assets/styles/main.scss';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Help from './pages/Help/Help';
import NotFound from './pages/NotFound/NotFound';
import HelpDetails from "./pages/Help/HelpDetailes.jsx";
import Profile from './pages/Profile/Profile.jsx';

import RedirectNoAuth from './components/redirect/RedirectNoAuth.jsx';
import { bootstrapAuth } from './auth/bootstrapAuth';

const App = () => {

  useEffect(() => {
    bootstrapAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />

      <Route path='/:lang' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='help' element={<Help />} />

        <Route
          path='profile'
          element={
            <RedirectNoAuth>
              <Profile />
            </RedirectNoAuth>
          }
        />
      </Route>

      <Route path="/help/:tabSlug/:section/:itemSlug" element={<HelpDetails />} />

      <Route path='/404' element={<NotFound />} />
      <Route path="/*" element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default App;