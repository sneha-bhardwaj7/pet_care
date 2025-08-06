import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getInformation } from './api/index.js';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import AnimalsPage from './pages/AnimalsPage';
import MarketplacePage from './pages/MarketplacePage';
import AdvancedMarketplacePage from './pages/AdvancedMarketplacePage';
import DashboardPage from './pages/DashboardPage';
import CommunityPage from './pages/CommunityPage';
import PetSocialPage from './pages/PetSocialPage';
import SmartRemindersPage from './pages/SmartRemindersPage';
import PhotoContestsPage from './pages/PhotoContestsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import Footer from './components/Footer.jsx';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInformation();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace-advanced" element={<AdvancedMarketplacePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/pet-social" element={<PetSocialPage />} />
          <Route path="/reminders" element={<SmartRemindersPage />} />
          <Route path="/contests" element={<PhotoContestsPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
