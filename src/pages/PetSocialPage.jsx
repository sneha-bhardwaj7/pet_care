"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, UserPlus, Camera, Award, MapPin } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Input from "../components/Input"
import Avatar from "../components/Avatar"
import { petProfiles } from "../data/pets"

export default function PetSocialPage() {
  const [selectedPet, setSelectedPet] = useState(petProfiles[0])
  const [isFollowing, setIsFollowing] = useState(false)
  const [newPost, setNewPost] = useState("")

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleLike = (postId) => {
    // Handle like functionality
    console.log("Liked post:", postId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Pet Social Network
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Share Photo
              </Button>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Find Friends
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Pet Profiles */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Trending Pets</h3>
                <div className="space-y-4">
                  {petProfiles.map((pet) => (
                    <div
                      key={pet.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPet.id === pet.id ? "bg-purple-100" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedPet(pet)}
                    >
                      <Avatar src={pet.image} alt={pet.name} className="w-12 h-12" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{pet.name}</p>
                        <p className="text-sm text-gray-600">{pet.followers} followers</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-500">
                          <Award className="w-4 h-4" />
                          <span className="text-xs ml-1">{pet.socialScore}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Pet Profile Header */}
            <Card className="mb-8 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-purple-400 to-pink-400">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-6 flex items-end space-x-4">
                  <Avatar src={selectedPet.image} alt={selectedPet.name} className="w-24 h-24 border-4 border-white" />
                  <div className="text-white mb-2">
                    <h1 className="text-3xl font-bold">{selectedPet.name}</h1>
                    <p className="text-lg opacity-90">
                      {selectedPet.breed} • {selectedPet.age}
                    </p>
                    <p className="text-sm opacity-75">Owned by {selectedPet.owner}</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-6">
                  <Button
                    onClick={handleFollow}
                    className={`${
                      isFollowing
                        ? "bg-white/20 text-white border border-white/30"
                        : "bg-white text-purple-600 hover:bg-gray-100"
                    }`}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {/* Stats */}
                <div className="flex items-center justify-around mb-6 py-4 border-y">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedPet.posts}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">{selectedPet.followers}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedPet.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{selectedPet.socialScore}</div>
                    <div className="text-sm text-gray-600">Social Score</div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">About {selectedPet.name}</h3>
                  <p className="text-gray-700 mb-4">{selectedPet.bio}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Favorite Toys</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedPet.favoriteToys.map((toy, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {toy}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-pink-600">Quirks</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedPet.quirks.map((quirk, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {quirk}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-blue-600">Achievements</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedPet.achievements.map((achievement, index) => (
                        <Badge key={index} className="text-xs bg-yellow-100 text-yellow-800">
                          <Award className="w-3 h-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Create Post */}
            <Card className="mb-8">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar src={selectedPet.image} alt={selectedPet.name} />
                  <div className="flex-1">
                    <Input
                      placeholder={`What's ${selectedPet.name} up to today?`}
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          Location
                        </Button>
                      </div>
                      <Button disabled={!newPost.trim()}>Share</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {selectedPet.recentPosts?.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar src={selectedPet.image} alt={selectedPet.name} />
                        <div>
                          <h4 className="font-semibold">{selectedPet.name}</h4>
                          <p className="text-sm text-gray-600">{post.timestamp}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-gray-800 mb-4">{post.caption}</p>

                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Pet post"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
