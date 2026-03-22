import { Routes, Route, Navigate } from 'react-router-dom';

import '../src/assets/styles/main.scss';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />

      <Route path='/:lang' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='/404' element={<NotFound/>}/>
      <Route path="/*" element={<Navigate to='/404' replace={true}/>}/>
    </Routes>
  );
};

export default App;
