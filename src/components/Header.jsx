import React from 'react'
// import { Button } from '../components/Button';

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                {/* <Heart className="w-6 h-6 text-white" /> */}
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                PetCare Hub
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="/animals" className="text-gray-700 hover:text-blue-600 transition-colors">
                Animals
              </a>
              <a href="/marketplace" className="text-gray-700 hover:text-blue-600 transition-colors">
                Marketplace
              </a>
              <a href="/community" className="text-gray-700 hover:text-blue-600 transition-colors">
                Community
              </a>
              <a href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                My Pets
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              {/* <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button>Sign In</Button> */}
            </div>
          </div>
        </div>
      </header>
  )
}
export default Header