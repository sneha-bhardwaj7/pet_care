import { Heart, Search, ShoppingCart, Users, BookOpen, Bell, Star, ArrowRight } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Input from "../components/Input"

export default function HomePage() {
  const featuredAnimals = [
    {
      id: 1,
      name: "Golden Retriever",
      category: "Dogs",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Beginner",
      lifespan: "10-12 years",
      description: "Friendly, intelligent, and devoted companions perfect for families.",
    },
    {
      id: 2,
      name: "Persian Cat",
      category: "Cats",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Intermediate",
      lifespan: "12-17 years",
      description: "Gentle, quiet, and sweet-natured cats with luxurious coats.",
    },
    {
      id: 3,
      name: "Budgerigar",
      category: "Birds",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Beginner",
      lifespan: "5-8 years",
      description: "Colorful, social, and intelligent birds that make great companions.",
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Dog Food - Salmon & Rice",
      price: 49.99,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
      category: "Food",
    },
    {
      id: 2,
      name: "Interactive Cat Toy Set",
      price: 24.99,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=200",
      category: "Toys",
    },
    {
      id: 3,
      name: "Deluxe Pet Grooming Kit",
      price: 89.99,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200",
      category: "Grooming",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Your Complete Pet Care Companion
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover comprehensive care guides, connect with fellow pet lovers, and shop for everything your furry,
              feathered, or scaled friends need to thrive at home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Animals
              </Button>
              <Button size="lg" variant="outline">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Input
                placeholder="Search for animals, care tips, or products..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
              <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PetCare Hub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to provide the best care for your beloved pets, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Care Guides</h3>
                <p className="text-gray-600">
                  Comprehensive, vet-approved information on habitat, diet, behavior, and health for hundreds of
                  animals.
                </p>
              </div>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Curated Marketplace</h3>
                <p className="text-gray-600">
                  Quality products from trusted brands - food, toys, grooming supplies, and health supplements.
                </p>
              </div>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <div className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vibrant Community</h3>
                <p className="text-gray-600">
                  Connect with fellow pet owners, share experiences, and get advice from our supportive community.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Animals</h2>
              <p className="text-gray-600">Discover care guides for these beloved companions</p>
            </div>
            <Button variant="outline">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredAnimals.map((animal) => (
              <Card
                key={animal.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              >
                <div className="relative">
                  <img
                    src={animal.image || "/placeholder.svg"}
                    alt={animal.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-800">{animal.category}</Badge>
                  <Badge
                    className={`absolute top-4 right-4 ${
                      animal.difficulty === "Beginner" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {animal.difficulty}
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{animal.name}</h3>
                    <span className="text-sm text-gray-500">{animal.lifespan}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{animal.description}</p>
                  <Button className="w-full">Learn More</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Products</h2>
              <p className="text-gray-600">Top-rated items from our marketplace</p>
            </div>
            <Button variant="outline">
              Shop All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-500">{product.category}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Pet-Loving Community</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get personalized care tips, exclusive deals, and connect with thousands of pet owners worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      
    </div>
  )
}
