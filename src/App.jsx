import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Heart, Search, ShoppingCart, Users, BookOpen, Bell, Menu, X, Sparkles } from 'lucide-react'
import Button from './components/Button'
import ApiStatus from './components/ApiStatus'

// Import pages
import HomePage from './pages/HomePage'
import AnimalsPage from './pages/AnimalsPage'
import MarketplacePage from './pages/MarketplacePage'
import DashboardPage from './pages/DashboardPage'
import CommunityPage from './pages/CommunityPage'
import ApiAnimalsPage from './pages/ApiAnimalsPage'
import AdoptionPage from './pages/AdoptionPage'
import PetSocialPage from './pages/PetSocialPage'
import SmartRemindersPage from './pages/SmartRemindersPage'
import AdvancedMarketplacePage from './pages/AdvancedMarketplacePage'
import PhotoContestsPage from './pages/PhotoContestsPage'
import SubscriptionPage from './pages/SubscriptionPage'

import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Heart },
    { name: 'Animals', href: '/animals', icon: BookOpen },
    { name: 'Live Database', href: '/api-animals', icon: Sparkles },
    { name: 'Adoption', href: '/adoption', icon: Heart },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Dashboard', href: '/dashboard', icon: Bell },
  ]

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Enhanced Navigation */}
        <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-2 h-2 text-yellow-800" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent whitespace-nowrap">
  PetCare Hub
</span>

                  {/* <div className="text-xs text-gray-500 font-medium">AI-Powered Platform</div> */}
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{item.name}</span>
                      {item.name === 'Live Database' && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-blue-50">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-blue-50 relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-blue-50">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                <Button className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                  Sign In
                </Button>

                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                        {item.name === 'Live Database' && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </Link>
                    )
                  })}
                  <div className="px-4 py-2">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* API Status Indicator */}
        <div className="fixed bottom-4 right-4 z-40">
          <ApiStatus className="w-64" />
        </div>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/animals" element={<AnimalsPage />} />
            <Route path="/api-animals" element={<ApiAnimalsPage />} />
            <Route path="/adoption" element={<AdoptionPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/advanced-marketplace" element={<AdvancedMarketplacePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pet-social" element={<PetSocialPage />} />
            <Route path="/smart-reminders" element={<SmartRemindersPage />} />
            <Route path="/photo-contests" element={<PhotoContestsPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
          </Routes>
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">PetCare Hub</span>
                    <div className="text-sm text-gray-300">AI-Powered Pet Care Platform</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Your comprehensive platform for pet care, powered by real-time APIs and AI technology. 
                  Connect with fellow pet lovers, access expert information, and give pets the care they deserve.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-lg">📘</span>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-lg">🐦</span>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-lg">📷</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
                <ul className="space-y-3 text-gray-300">
                  <li><Link to="/api-animals" className="hover:text-white transition-colors flex items-center"><Sparkles className="w-4 h-4 mr-2" />Live Database</Link></li>
                  <li><Link to="/adoption" className="hover:text-white transition-colors">Pet Adoption</Link></li>
                  <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                  <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
                  <li><Link to="/dashboard" className="hover:text-white transition-colors">Pet Dashboard</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">Support</h3>
                <ul className="space-y-3 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-gray-400 text-sm">
                  &copy; 2024 PetCare Hub. All rights reserved. Powered by API Ninjas, RescueGroups, and more.
                </p>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">APIs Online</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Last updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
