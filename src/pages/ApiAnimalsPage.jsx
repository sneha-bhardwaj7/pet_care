import React, { useState, useEffect } from 'react'
import { useAnimalInfo, useDogBreeds, useCatBreeds } from '../hooks/useApi'
// import LoadingSpinner, { CardSkeleton } from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ApiStatus from '../components/ApiStatus'
// import { Card } from '../components/Card'
// import { Button } from '../components/Button'
// import { Input } from '../components/Input'
// import { Select } from '../components/Select'
// import { Badge } from '../components/Badge'

const ApiAnimalsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('animal')
  const [selectedAnimal, setSelectedAnimal] = useState('')
  const [favorites, setFavorites] = useState([])

  // API Hooks
  const { data: animalData, loading: animalLoading, error: animalError, refetch: refetchAnimal } = useAnimalInfo(selectedAnimal)
  const { data: dogData, loading: dogLoading, error: dogError, refetch: refetchDogs } = useDogBreeds(searchType === 'dog' ? searchTerm : '')
  const { data: catData, loading: catLoading, error: catError, refetch: refetchCats } = useCatBreeds(searchType === 'cat' ? searchTerm : '')

  // Handle search
  const handleSearch = () => {
    if (!searchTerm.trim()) return

    if (searchType === 'animal') {
      setSelectedAnimal(searchTerm)
    } else if (searchType === 'dog') {
      refetchDogs(searchTerm)
    } else if (searchType === 'cat') {
      refetchCats(searchTerm)
    }
  }

  // Handle favorites
  const toggleFavorite = (item) => {
    const itemId = item.name || item.breed || item.id
    setFavorites(prev => 
      prev.some(fav => fav.id === itemId)
        ? prev.filter(fav => fav.id !== itemId)
        : [...prev, { ...item, id: itemId }]
    )
  }

  const isFavorite = (item) => {
    const itemId = item.name || item.breed || item.id
    return favorites.some(fav => fav.id === itemId)
  }

  // Popular searches
  const popularSearches = [
    { type: 'animal', term: 'Lion', emoji: '🦁' },
    { type: 'animal', term: 'Elephant', emoji: '🐘' },
    { type: 'dog', term: 'Golden Retriever', emoji: '🐕' },
    { type: 'cat', term: 'Persian', emoji: '🐱' },
    { type: 'animal', term: 'Panda', emoji: '🐼' },
    { type: 'dog', term: 'Husky', emoji: '🐺' }
  ]

  const handlePopularSearch = (search) => {
    setSearchType(search.type)
    setSearchTerm(search.term)
    if (search.type === 'animal') {
      setSelectedAnimal(search.term)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🐾 Live Animal Database
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover fascinating information about animals, dog breeds, and cat breeds using real-time data from our APIs
          </p>
        </div>

        {/* API Status */}
        <div className="mb-8">
          <ApiStatus showDetails={false} className="justify-center" />
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="md:w-48"
            >
              <option value="animal">🐾 Any Animal</option>
              <option value="dog">🐕 Dog Breeds</option>
              <option value="cat">🐱 Cat Breeds</option>
            </Select> */}

            {/* <Input
              type="text"
              placeholder={`Search for ${searchType === 'animal' ? 'any animal' : searchType + ' breeds'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            /> */}

            {/* <Button
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8"
            >
              🔍 Search
            </Button> */}
          </div>

          {/* Popular Searches */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(search)}
                  className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-purple-100 rounded-full text-sm transition-all duration-200 hover:scale-105"
                >
                  {search.emoji} {search.term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2">
            {/* Animal Information */}
            {searchType === 'animal' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  🦁 Animal Information
                  {selectedAnimal && (
                    <Badge className="ml-3 bg-blue-100 text-blue-800">
                      {selectedAnimal}
                    </Badge>
                  )}
                </h2>

                {animalLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                )}

                {animalError && (
                  <ErrorMessage
                    error={animalError}
                    onRetry={() => refetchAnimal(selectedAnimal)}
                    title="Failed to load animal information"
                  />
                )}

                {animalData && Array.isArray(animalData) && animalData.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {animalData.map((animal, index) => (
                      <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800 capitalize">
                              {animal.name}
                            </h3>
                            <button
                              onClick={() => toggleFavorite(animal)}
                              className={`text-2xl transition-transform hover:scale-125 ${
                                isFavorite(animal) ? 'text-red-500' : 'text-gray-300'
                              }`}
                            >
                              ❤️
                            </button>
                          </div>

                          <div className="space-y-3">
                            {animal.taxonomy && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">🧬 Taxonomy</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div><span className="font-medium">Kingdom:</span> {animal.taxonomy.kingdom}</div>
                                  <div><span className="font-medium">Class:</span> {animal.taxonomy.class}</div>
                                  <div><span className="font-medium">Order:</span> {animal.taxonomy.order}</div>
                                  <div><span className="font-medium">Family:</span> {animal.taxonomy.family}</div>
                                </div>
                              </div>
                            )}

                            {animal.locations && animal.locations.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">🌍 Locations</h4>
                                <div className="flex flex-wrap gap-1">
                                  {animal.locations.map((location, idx) => (
                                    <Badge key={idx} className="bg-green-100 text-green-800 text-xs">
                                      {location}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {animal.characteristics && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">📊 Characteristics</h4>
                                <div className="space-y-1 text-sm">
                                  {Object.entries(animal.characteristics).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="capitalize font-medium">{key.replace('_', ' ')}:</span>
                                      <span className="text-gray-600">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {animalData && Array.isArray(animalData) && animalData.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No animals found</h3>
                    <p className="text-gray-600">Try searching for a different animal name.</p>
                  </div>
                )}
              </div>
            )}

            {/* Dog Breeds */}
            {searchType === 'dog' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  🐕 Dog Breeds
                  {searchTerm && (
                    <Badge className="ml-3 bg-orange-100 text-orange-800">
                      {searchTerm}
                    </Badge>
                  )}
                </h2>

                {dogLoading && <LoadingSpinner size="large" message="Fetching dog breed information..." />}

                {dogError && (
                  <ErrorMessage
                    error={dogError}
                    onRetry={() => refetchDogs(searchTerm)}
                    title="Failed to load dog breed information"
                  />
                )}

                {dogData && Array.isArray(dogData) && dogData.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dogData.map((dog, index) => (
                      <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                              {dog.name}
                            </h3>
                            <button
                              onClick={() => toggleFavorite(dog)}
                              className={`text-2xl transition-transform hover:scale-125 ${
                                isFavorite(dog) ? 'text-red-500' : 'text-gray-300'
                              }`}
                            >
                              ❤️
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              {dog.image && (
                                <div className="col-span-2 mb-3">
                                  <img 
                                    src={dog.image || "/placeholder.svg"} 
                                    alt={dog.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                    onError={(e) => {
                                      e.target.src = `/placeholder.svg?height=200&width=300&text=🐕+${dog.name}`
                                    }}
                                  />
                                </div>
                              )}
                              
                              {dog.min_life_expectancy && dog.max_life_expectancy && (
                                <div>
                                  <span className="font-medium">⏰ Life Span:</span>
                                  <div className="text-gray-600">{dog.min_life_expectancy}-{dog.max_life_expectancy} years</div>
                                </div>
                              )}

                              {dog.min_height_male && dog.max_height_male && (
                                <div>
                                  <span className="font-medium">📏 Height (Male):</span>
                                  <div className="text-gray-600">{dog.min_height_male}-{dog.max_height_male} inches</div>
                                </div>
                              )}

                              {dog.min_weight_male && dog.max_weight_male && (
                                <div>
                                  <span className="font-medium">⚖️ Weight (Male):</span>
                                  <div className="text-gray-600">{dog.min_weight_male}-{dog.max_weight_male} lbs</div>
                                </div>
                              )}

                              {dog.energy && (
                                <div>
                                  <span className="font-medium">⚡ Energy:</span>
                                  <div className="text-gray-600">{dog.energy}/5</div>
                                </div>
                              )}

                              {dog.trainability && (
                                <div>
                                  <span className="font-medium">🎓 Trainability:</span>
                                  <div className="text-gray-600">{dog.trainability}/5</div>
                                </div>
                              )}

                              {dog.good_with_children && (
                                <div>
                                  <span className="font-medium">👶 Good with Kids:</span>
                                  <div className="text-gray-600">{dog.good_with_children}/5</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {dogData && Array.isArray(dogData) && dogData.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <div className="text-6xl mb-4">🐕</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No dog breeds found</h3>
                    <p className="text-gray-600">Try searching for a different breed name.</p>
                  </div>
                )}
              </div>
            )}

            {/* Cat Breeds */}
            {searchType === 'cat' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  🐱 Cat Breeds
                  {searchTerm && (
                    <Badge className="ml-3 bg-purple-100 text-purple-800">
                      {searchTerm}
                    </Badge>
                  )}
                </h2>

                {catLoading && <LoadingSpinner size="large" message="Fetching cat breed information..." />}

                {catError && (
                  <ErrorMessage
                    error={catError}
                    onRetry={() => refetchCats(searchTerm)}
                    title="Failed to load cat breed information"
                  />
                )}

                {catData && Array.isArray(catData) && catData.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {catData.map((cat, index) => (
                      <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                              {cat.name}
                            </h3>
                            <button
                              onClick={() => toggleFavorite(cat)}
                              className={`text-2xl transition-transform hover:scale-125 ${
                                isFavorite(cat) ? 'text-red-500' : 'text-gray-300'
                              }`}
                            >
                              ❤️
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              {cat.image_link && (
                                <div className="col-span-2 mb-3">
                                  <img 
                                    src={cat.image_link || "/placeholder.svg"} 
                                    alt={cat.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                    onError={(e) => {
                                      e.target.src = `/placeholder.svg?height=200&width=300&text=🐱+${cat.name}`
                                    }}
                                  />
                                </div>
                              )}
                              
                              {cat.min_life_expectancy && cat.max_life_expectancy && (
                                <div>
                                  <span className="font-medium">⏰ Life Span:</span>
                                  <div className="text-gray-600">{cat.min_life_expectancy}-{cat.max_life_expectancy} years</div>
                                </div>
                              )}

                              {cat.origin && (
                                <div>
                                  <span className="font-medium">🌍 Origin:</span>
                                  <div className="text-gray-600">{cat.origin}</div>
                                </div>
                              )}

                              {cat.length && (
                                <div>
                                  <span className="font-medium">📏 Length:</span>
                                  <div className="text-gray-600">{cat.length}</div>
                                </div>
                              )}

                              {cat.min_weight && cat.max_weight && (
                                <div>
                                  <span className="font-medium">⚖️ Weight:</span>
                                  <div className="text-gray-600">{cat.min_weight}-{cat.max_weight} lbs</div>
                                </div>
                              )}

                              {cat.playfulness && (
                                <div>
                                  <span className="font-medium">🎾 Playfulness:</span>
                                  <div className="text-gray-600">{cat.playfulness}/5</div>
                                </div>
                              )}

                              {cat.children_friendly && (
                                <div>
                                  <span className="font-medium">👶 Kid Friendly:</span>
                                  <div className="text-gray-600">{cat.children_friendly}/5</div>
                                </div>
                              )}

                              {cat.grooming && (
                                <div>
                                  <span className="font-medium">✂️ Grooming:</span>
                                  <div className="text-gray-600">{cat.grooming}/5</div>
                                </div>
                              )}

                              {cat.shedding && (
                                <div>
                                  <span className="font-medium">🧹 Shedding:</span>
                                  <div className="text-gray-600">{cat.shedding}/5</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {catData && Array.isArray(catData) && catData.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <div className="text-6xl mb-4">🐱</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No cat breeds found</h3>
                    <p className="text-gray-600">Try searching for a different breed name.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorites */}
            {favorites.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  ❤️ Favorites ({favorites.length})
                </h3>
                <div className="space-y-3">
                  {favorites.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{item.name || item.breed}</span>
                      <button
                        onClick={() => toggleFavorite(item)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❤️
                      </button>
                    </div>
                  ))}
                  {favorites.length > 5 && (
                    <p className="text-xs text-gray-500 text-center">
                      +{favorites.length - 5} more favorites
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* API Status Details */}
            <ApiStatus showDetails={true} />

            {/* Quick Stats */}
            {/* <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Searches Today:</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Popular Animal:</span>
                  <span className="font-medium">🦁 Lion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Popular Dog:</span>
                  <span className="font-medium">🐕 Golden Retriever</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Popular Cat:</span>
                  <span className="font-medium">🐱 Persian</span>
                </div>
              </div>
            </Card> */}

            {/* Tips */}
            {/* <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Search Tips</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Try specific breed names for detailed information</p>
                <p>• Use common animal names for general info</p>
                <p>• Check your favorites for quick access</p>
                <p>• All data is fetched in real-time from APIs</p>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiAnimalsPage
