import React, { useState, useEffect } from 'react'
import { useAdoptablePets } from '../hooks/useApi'
// import LoadingSpinner, { CardSkeleton } from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ApiStatus from '../components/ApiStatus'
// import { Card } from '../components/Card'
// import { Button } from '../components/Button'
// import { Input } from '../components/Input'
// import { Select } from '../components/Select'
// import { Badge } from '../components/Badge'

const AdoptionPage = () => {
  const [filters, setFilters] = useState({
    species: '',
    breed: '',
    age: '',
    size: '',
    location: '',
    limit: 20
  })
  const [favorites, setFavorites] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const { data: adoptionData, loading, error, refetch } = useAdoptablePets(filters)

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      species: '',
      breed: '',
      age: '',
      size: '',
      location: '',
      limit: 20
    })
  }

  // Handle favorites
  const toggleFavorite = (pet) => {
    setFavorites(prev => 
      prev.some(fav => fav.id === pet.id)
        ? prev.filter(fav => fav.id !== pet.id)
        : [...prev, pet]
    )
  }

  const isFavorite = (pet) => favorites.some(fav => fav.id === pet.id)

  // Contact handler
  const handleContact = (pet) => {
    const message = `Hi! I'm interested in adopting ${pet.name}. Could you please provide more information?`
    const phoneNumber = pet.contact.replace(/[^\d]/g, '')
    
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, '_self')
    } else {
      alert(`Please contact ${pet.location} for more information about ${pet.name}`)
    }
  }

  const pets = adoptionData?.data || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🏠 Pet Adoption Center
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find your perfect companion! Browse adoptable pets from local shelters and rescue organizations
          </p>
        </div>

        {/* API Status */}
        <div className="mb-8">
          <ApiStatus showDetails={false} className="justify-center" />
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">🔍 Find Your Perfect Pet</h2>
            <div className="flex space-x-2">
              {/* <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                size="sm"
              >
                {showFilters ? '🔼 Hide Filters' : '🔽 Show Filters'}
              </Button>
              <Button
                onClick={clearFilters}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                🗑️ Clear All
              </Button> */}
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                value={filters.species}
                onChange={(e) => handleFilterChange('species', e.target.value)}
              >
                <option value="">All Species</option>
                <option value="Dog">🐕 Dogs</option>
                <option value="Cat">🐱 Cats</option>
                <option value="Rabbit">🐰 Rabbits</option>
                <option value="Bird">🐦 Birds</option>
              </Select>

              <Input
                type="text"
                placeholder="Breed (e.g., Golden Retriever)"
                value={filters.breed}
                onChange={(e) => handleFilterChange('breed', e.target.value)}
              />

              <Select
                value={filters.age}
                onChange={(e) => handleFilterChange('age', e.target.value)}
              >
                <option value="">Any Age</option>
                <option value="Young">🐣 Young (0-2 years)</option>
                <option value="Adult">🐾 Adult (2-7 years)</option>
                <option value="Senior">👴 Senior (7+ years)</option>
              </Select>

              <Select
                value={filters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
              >
                <option value="">Any Size</option>
                <option value="Small">🐭 Small</option>
                <option value="Medium">🐕 Medium</option>
                <option value="Large">🐕‍🦺 Large</option>
                <option value="Extra Large">🐺 Extra Large</option>
              </Select>

              <Input
                type="text"
                placeholder="Location (City, State)"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />

              <Select
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              >
                <option value={10}>Show 10 pets</option>
                <option value={20}>Show 20 pets</option>
                <option value={50}>Show 50 pets</option>
              </Select>
            </div>
          )}

          {/* Active Filters */}
          {Object.entries(filters).some(([key, value]) => value && key !== 'limit') && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || key === 'limit') return null
                  return (
                    <Badge
                      key={key}
                      className="bg-purple-100 text-purple-800 cursor-pointer hover:bg-purple-200"
                      onClick={() => handleFilterChange(key, '')}
                    >
                      {key}: {value} ✕
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Pet Listings */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* {Array.from({ length: 6 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))} */}
              </div>
            )}

            {error && (
              <ErrorMessage
                error={error}
                onRetry={() => refetch(filters)}
                title="Failed to load adoptable pets"
              />
            )}

            {pets.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    🐾 Available Pets ({pets.length})
                  </h2>
                  <Button
                    onClick={() => refetch(filters)}
                    variant="outline"
                    size="sm"
                  >
                    🔄 Refresh
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pets.map((pet) => (
                    <Card key={pet.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                      {/* Pet Image */}
                      <div className="relative">
                        <img
                          src={pet.images?.[0] || `/placeholder.svg?height=250&width=400&text=${pet.species}+${pet.name}`}
                          alt={pet.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.src = `/placeholder.svg?height=250&width=400&text=${pet.species}+${pet.name}`
                          }}
                        />
                        
                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(pet)}
                          className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-lg transition-all hover:scale-110 ${
                            isFavorite(pet) ? 'text-red-500' : 'text-gray-400'
                          }`}
                        >
                          ❤️
                        </button>

                        {/* Species Badge */}
                        <Badge className="absolute top-3 left-3 bg-white text-gray-800">
                          {pet.species === 'Dog' ? '🐕' : pet.species === 'Cat' ? '🐱' : '🐾'} {pet.species}
                        </Badge>
                      </div>

                      {/* Pet Details */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h3>
                          <p className="text-gray-600 text-sm">{pet.breed} • {pet.age} • {pet.size}</p>
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                          {pet.description}
                        </p>

                        {/* Pet Attributes */}
                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                          {pet.vaccinated && (
                            <div className="flex items-center space-x-1">
                              <span>💉</span>
                              <span>Vaccinated</span>
                            </div>
                          )}
                          {pet.spayedNeutered && (
                            <div className="flex items-center space-x-1">
                              <span>✂️</span>
                              <span>Spayed/Neutered</span>
                            </div>
                          )}
                          {pet.houseTrained && (
                            <div className="flex items-center space-x-1">
                              <span>🏠</span>
                              <span>House Trained</span>
                            </div>
                          )}
                          {pet.goodWithKids && (
                            <div className="flex items-center space-x-1">
                              <span>👶</span>
                              <span>Good with Kids</span>
                            </div>
                          )}
                        </div>

                        {/* Location and Contact */}
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-sm font-medium text-gray-800">{pet.location}</p>
                              <p className="text-xs text-gray-600">{pet.contact}</p>
                            </div>
                            {pet.adoptionFee && (
                              <Badge className="bg-green-100 text-green-800">
                                {pet.adoptionFee}
                              </Badge>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleContact(pet)}
                              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-sm"
                            >
                              📞 Contact
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="px-3"
                              onClick={() => {
                                // Open more details modal or page
                                alert(`More details about ${pet.name} coming soon!`)
                              }}
                            >
                              ℹ️
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {!loading && !error && pets.length === 0 && (
              <div className="text-center py-16 bg-white rounded-lg">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No pets found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search filters to find more adoptable pets.
                </p>
                {/* <Button onClick={clearFilters} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  🗑️ Clear Filters
                </Button> */}
              </div>
            )}
          </div>

          {/* Sidebar */}
        <div className="space-y-6">
            {/* Favorites */}
            {/* {favorites.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  ❤️ Favorite Pets ({favorites.length})
                </h3>
                <div className="space-y-3">
                  {favorites.slice(0, 3).map((pet) => (
                    <div key={pet.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <img
                        src={pet.images?.[0] || `/placeholder.svg?height=40&width=40&text=${pet.name}`}
                        alt={pet.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{pet.name}</p>
                        <p className="text-xs text-gray-600">{pet.breed}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(pet)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❤️
                      </button>
                    </div>
                  ))}
                  {favorites.length > 3 && (
                    <p className="text-xs text-gray-500 text-center">
                      +{favorites.length - 3} more favorites
                    </p>
                  )}
                </div>
              </Card>
            )} */}

            {/* Adoption Tips */}
            {/* <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50">
              <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Adoption Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span>🏠</span>
                  <p>Prepare your home before bringing your new pet</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span>💰</span>
                  <p>Budget for ongoing care costs beyond adoption fees</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span>⏰</span>
                  <p>Be patient during the adjustment period</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span>🏥</span>
                  <p>Schedule a vet visit within the first week</p>
                </div>
              </div>
            </Card> */}

            {/* Quick Stats */}
            {/* <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Adoption Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available Pets:</span>
                  <span className="font-medium">{pets.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dogs:</span>
                  <span className="font-medium">{pets.filter(p => p.species === 'Dog').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cats:</span>
                  <span className="font-medium">{pets.filter(p => p.species === 'Cat').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Your Favorites:</span>
                  <span className="font-medium text-red-500">{favorites.length}</span>
                </div>
              </div>
            </Card> */}

            {/* Emergency Contacts */}
            {/* <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🚨 Emergency Contacts</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">24/7 Pet Emergency:</p>
                  <p className="text-blue-600">📞 (555) 911-PETS</p>
                </div>
                <div>
                  <p className="font-medium">Animal Control:</p>
                  <p className="text-blue-600">📞 (555) 123-4567</p>
                </div>
                <div>
                  <p className="font-medium">Lost Pet Hotline:</p>
                  <p className="text-blue-600">📞 (555) FIND-PET</p>
                </div>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdoptionPage
