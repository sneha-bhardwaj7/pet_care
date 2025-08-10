import { useState, useEffect, useCallback } from 'react'
import apiService from '../services/apiService'

// Generic API hook
export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if (!apiCall) return

    setLoading(true)
    setError(null)

    try {
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err.message || 'An error occurred')
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}

// Animal information hook
export function useAnimalInfo(animalName) {
  return useApi(
    animalName ? () => apiService.apiNinjas.getAnimalInfo(animalName) : null,
    [animalName]
  )
}

// Dog breeds hook
export function useDogBreeds(breedName = '') {
  return useApi(
    () => apiService.apiNinjas.getDogBreeds(breedName),
    [breedName]
  )
}

// Cat breeds hook
export function useCatBreeds(breedName = '') {
  return useApi(
    () => apiService.apiNinjas.getCatBreeds(breedName),
    [breedName]
  )
}

// Adoptable pets hook
export function useAdoptablePets(filters = {}) {
  return useApi(
    () => apiService.rescueGroups.getAdoptablePets(filters),
    [JSON.stringify(filters)]
  )
}

// Products hook
export function useProducts(filters = {}) {
  return useApi(
    () => apiService.shopify.getProducts(filters),
    [JSON.stringify(filters)]
  )
}

// Nearby vets hook
export function useNearbyVets(location, radius = 5000) {
  return useApi(
    location ? () => apiService.googleMaps.getNearbyVets(location, radius) : null,
    [location, radius]
  )
}

// Search hook for multiple APIs
export function useSearch(query, searchType = 'animals') {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      let searchResults = []

      switch (searchType) {
        case 'animals':
          const animalData = await apiService.apiNinjas.getAnimalInfo(searchQuery)
          searchResults = animalData || []
          break
        case 'dogs':
          const dogData = await apiService.apiNinjas.getDogBreeds(searchQuery)
          searchResults = dogData || []
          break
        case 'cats':
          const catData = await apiService.apiNinjas.getCatBreeds(searchQuery)
          searchResults = catData || []
          break
        case 'adoption':
          const adoptionData = await apiService.rescueGroups.getAdoptablePets({ 
            species: searchQuery 
          })
          searchResults = adoptionData.data || []
          break
        case 'products':
          const productData = await apiService.shopify.getProducts({ 
            product_type: searchQuery 
          })
          searchResults = productData.products || []
          break
        default:
          searchResults = []
      }

      setResults(searchResults)
    } catch (err) {
      setError(err.message || 'Search failed')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [searchType])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query)
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [query, search])

  return { results, loading, error, search }
}

