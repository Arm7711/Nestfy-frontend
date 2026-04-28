import { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import '../src/assets/styles/main.scss';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Help from './pages/Help/Help';
import NotFound from './pages/NotFound/NotFound';
import HelpDetails from "./pages/Help/HelpDetailes.jsx";
import Profile from './pages/Profile/Profile.jsx';
import MainPage from "./pages/MainPage/MainPage.jsx";
import Services from './pages/Services/Services.jsx';
import AccountSettings from "./pages/AccountSettings/AccountSettings.jsx";
import FooterPage from "./components/layout/Footer/FooterDetailes.jsx";
import Messages from "./pages/Messages/Messages.jsx";
import ScrollToTop from "./components/_common/ScrollToTop.jsx";

import RedirectNoAuth from './components/redirect/RedirectNoAuth.jsx';
import { bootstrapAuth } from './auth/bootstrapAuth';

const App = () => {

  useEffect(() => {
    bootstrapAuth();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />

        <Route path='/:lang' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='home' element={<Home />} />
          <Route path='services' element={<Services />} />

          <Route path='help-center' element={<Help />} />
          <Route path="help-center/:tabSlug/:section/:itemSlug" element={<HelpDetails />} />

          <Route
            path='profile'
            element={
              <RedirectNoAuth>
                <Profile />
              </RedirectNoAuth>
            }
          />

          <Route
            path='account-settings'
            element={
              <RedirectNoAuth>
                <AccountSettings />
              </RedirectNoAuth>
            }
          />

          <Route
            path='account-settings/:activeTab'
            element={
              <RedirectNoAuth>
                <AccountSettings />
              </RedirectNoAuth>
            }
          />

          <Route
            path='messages'
            element={
              <RedirectNoAuth>
                <Messages />
              </RedirectNoAuth>
            }
          />
        </Route>
        <Route path="/footer/:group/:slug" element={<FooterPage />} />


        <Route path='/404' element={<NotFound />} />
        <Route path="/*" element={<Navigate to='/404' replace />} />
      </Routes>
    </>
  );
};

export default App;