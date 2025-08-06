"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Heart, Clock, MapPin, Utensils, Activity } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Input from "../components/Input"
import Select from "../components/Select"

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [loading, setLoading] = useState(true)

  // Mock API data
  useEffect(() => {
    const mockAnimals = [
      {
        id: 1,
        name: "Golden Retriever",
        scientificName: "Canis lupus familiaris",
        category: "Dogs",
        difficulty: "Beginner",
        lifespan: "10-12 years",
        size: "Large",
        habitat: "Indoor/Outdoor",
        diet: "Omnivore",
        temperament: ["Friendly", "Intelligent", "Devoted"],
        image: "/placeholder.svg?height=300&width=400",
        description: "Golden Retrievers are friendly, intelligent, and devoted dogs that make excellent family pets.",
        careLevel: 3,
        popularity: 95,
      },
      {
        id: 2,
        name: "Persian Cat",
        scientificName: "Felis catus",
        category: "Cats",
        difficulty: "Intermediate",
        lifespan: "12-17 years",
        size: "Medium",
        habitat: "Indoor",
        diet: "Carnivore",
        temperament: ["Gentle", "Quiet", "Sweet"],
        image: "/placeholder.svg?height=300&width=400",
        description: "Persian cats are known for their long, luxurious coats and gentle, sweet personalities.",
        careLevel: 4,
        popularity: 85,
      },
      {
        id: 3,
        name: "Budgerigar",
        scientificName: "Melopsittacus undulatus",
        category: "Birds",
        difficulty: "Beginner",
        lifespan: "5-8 years",
        size: "Small",
        habitat: "Indoor Cage",
        diet: "Granivore",
        temperament: ["Social", "Playful", "Intelligent"],
        image: "/placeholder.svg?height=300&width=400",
        description: "Budgerigars are colorful, social birds that are perfect for first-time bird owners.",
        careLevel: 2,
        popularity: 78,
      },
      {
        id: 4,
        name: "Betta Fish",
        scientificName: "Betta splendens",
        category: "Fish",
        difficulty: "Beginner",
        lifespan: "2-4 years",
        size: "Small",
        habitat: "Aquarium",
        diet: "Carnivore",
        temperament: ["Territorial", "Active", "Colorful"],
        image: "/placeholder.svg?height=300&width=400",
        description: "Betta fish are beautiful, low-maintenance pets perfect for small spaces.",
        careLevel: 2,
        popularity: 82,
      },
      {
        id: 5,
        name: "Holland Lop Rabbit",
        scientificName: "Oryctolagus cuniculus",
        category: "Small Mammals",
        difficulty: "Intermediate",
        lifespan: "7-12 years",
        size: "Small",
        habitat: "Indoor/Outdoor",
        diet: "Herbivore",
        temperament: ["Gentle", "Playful", "Social"],
        image: "/placeholder.svg?height=300&width=400",
        description: "Holland Lop rabbits are adorable, gentle pets with distinctive drooping ears.",
        careLevel: 3,
        popularity: 70,
      },
      {
        id: 6,
        name: "Bearded Dragon",
        scientificName: "Pogona vitticeps",
        category: "Reptiles",
        difficulty: "Intermediate",
        lifespan: "10-15 years",
        size: "Medium",
        habitat: "Terrarium",
        diet: "Omnivore",
        temperament: ["Docile", "Curious", "Hardy"],
        image: "/placeholder.svg?height=300&width=400",
        description: "Bearded dragons are fascinating, docile reptiles that make great exotic pets.",
        careLevel: 4,
        popularity: 65,
      },
    ]

    setTimeout(() => {
      setAnimals(mockAnimals)
      setFilteredAnimals(mockAnimals)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter animals based on search and filters
  useEffect(() => {
    let filtered = animals

    if (searchTerm) {
      filtered = filtered.filter(
        (animal) =>
          animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.temperament.some((trait) => trait.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((animal) => animal.category === selectedCategory)
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((animal) => animal.difficulty === selectedDifficulty)
    }

    setFilteredAnimals(filtered)
  }, [searchTerm, selectedCategory, selectedDifficulty, animals])

  const categories = ["Dogs", "Cats", "Birds", "Fish", "Small Mammals", "Reptiles"]
  const difficulties = ["Beginner", "Intermediate", "Advanced"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading animals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Animal Care Encyclopedia
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover comprehensive care guides for hundreds of animals. From basic needs to advanced care tips, find
              everything you need to keep your pets healthy and happy.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search animals, breeds, or care tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onChange={setSelectedCategory}>
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>

            <Select value={selectedDifficulty} onChange={setSelectedDifficulty}>
              <option value="all">All Levels</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredAnimals.length} of {animals.length} animals
          </p>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <Card
              key={animal.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img src={animal.image || "/placeholder.svg"} alt={animal.name} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-white text-gray-800">{animal.category}</Badge>
                  <Badge
                    className={`${
                      animal.difficulty === "Beginner"
                        ? "bg-green-500"
                        : animal.difficulty === "Intermediate"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {animal.difficulty}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{animal.name}</h3>
                    <p className="text-sm text-gray-500 italic">{animal.scientificName}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {animal.lifespan}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{animal.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-gray-600">{animal.habitat}</span>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-gray-600">{animal.diet}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {animal.temperament.slice(0, 3).map((trait, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-sm text-gray-600">Care Level: {animal.careLevel}/5</span>
                    </div>
                    <div className="text-sm text-green-600 font-medium">{animal.popularity}% Popular</div>
                  </div>

                  <Button className="w-full mt-4">View Care Guide</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAnimals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No animals found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedDifficulty("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
