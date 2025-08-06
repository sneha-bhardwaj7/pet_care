"use client"

import { useState } from "react"
import { MessageSquare, Heart, Share2, Users, MapPin, Calendar, Plus, TrendingUp, Award, Camera } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Input from "../components/Input"
import Textarea from "../components/Textarea"
import Avatar from "../components/Avatar"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forum")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const forumPosts = [
    {
      id: 1,
      title: "Best training techniques for stubborn puppies?",
      content:
        "My 6-month-old Golden Retriever is having trouble with basic commands. Any experienced dog owners have tips?",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Dog Expert",
      },
      category: "Training",
      likes: 24,
      replies: 18,
      timeAgo: "2 hours ago",
      tags: ["puppies", "training", "golden-retriever"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "DIY cat enrichment ideas that actually work",
      content:
        "Sharing some creative and budget-friendly ways to keep your indoor cats entertained and mentally stimulated.",
      author: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Cat Enthusiast",
      },
      category: "Enrichment",
      likes: 45,
      replies: 12,
      timeAgo: "4 hours ago",
      tags: ["cats", "diy", "enrichment", "indoor"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Emergency vet visit - what to expect and how to prepare",
      content: "After a recent scare with my rabbit, I wanted to share what I learned about emergency vet visits.",
      author: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Rabbit Specialist",
      },
      category: "Health",
      likes: 67,
      replies: 23,
      timeAgo: "1 day ago",
      tags: ["emergency", "vet", "health", "rabbits"],
    },
  ]

  const events = [
    {
      id: 1,
      title: "Monthly Dog Park Meetup",
      date: "2024-02-15",
      time: "10:00 AM",
      location: "Central Park Dog Run",
      attendees: 24,
      category: "Social",
      image: "/placeholder.svg?height=150&width=200",
      description: "Bring your furry friends for socialization and fun!",
    },
    {
      id: 2,
      title: "Pet First Aid Workshop",
      date: "2024-02-20",
      time: "2:00 PM",
      location: "Community Center",
      attendees: 15,
      category: "Education",
      image: "/placeholder.svg?height=150&width=200",
      description: "Learn essential first aid skills for your pets.",
    },
    {
      id: 3,
      title: "Adoption Drive - Find Your Forever Friend",
      date: "2024-02-25",
      time: "11:00 AM",
      location: "Local Animal Shelter",
      attendees: 8,
      category: "Adoption",
      image: "/placeholder.svg?height=150&width=200",
      description: "Help pets find their forever homes.",
    },
  ]

  const lostPets = [
    {
      id: 1,
      name: "Buddy",
      species: "Dog",
      breed: "Labrador Mix",
      lastSeen: "2024-01-20",
      location: "Downtown area near 5th Street",
      contact: "555-0123",
      image: "/placeholder.svg?height=150&width=150",
      description: "Brown and white, wearing a red collar. Very friendly.",
      status: "lost",
    },
    {
      id: 2,
      name: "Whiskers",
      species: "Cat",
      breed: "Tabby",
      lastSeen: "2024-01-22",
      location: "Maple Street neighborhood",
      contact: "555-0456",
      image: "/placeholder.svg?height=150&width=150",
      description: "Orange tabby, no collar. Found near the library.",
      status: "found",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pet Community Hub
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with fellow pet lovers, share experiences, get advice, and help pets in need. Join our vibrant
              community of passionate pet owners.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12.5K</div>
              <div className="text-sm text-gray-600">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3.2K</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">89</div>
              <div className="text-sm text-gray-600">Pets Helped</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "forum" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("forum")}
          >
            Forum
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "events" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "lost-found" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("lost-found")}
          >
            Lost & Found
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "experts" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("experts")}
          >
            Ask Experts
          </button>
        </div>

        {/* Forum Tab */}
        {activeTab === "forum" && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Create Post */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Share with the Community
                  </h3>
                  <div className="space-y-4">
                    <Input placeholder="What's on your mind about your pets?" />
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
                      <Button>Post</Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Forum Posts */}
              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar src={post.author.avatar} alt={post.author.name} />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{post.author.name}</h4>
                              {post.author.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  {post.author.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{post.timeAgo}</p>
                          </div>
                        </div>
                        <Badge>{post.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-4">{post.content}</p>

                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post image"
                          className="rounded-lg w-full max-w-md mb-4"
                        />
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-2" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {post.replies}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-80 space-y-6">
              {/* Trending Topics */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Trending Topics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">#puppy-training</span>
                      <Badge variant="secondary">124 posts</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">#cat-behavior</span>
                      <Badge variant="secondary">89 posts</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">#pet-health</span>
                      <Badge variant="secondary">67 posts</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">#adoption-stories</span>
                      <Badge variant="secondary">45 posts</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Community Guidelines */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Community Guidelines</h3>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Be respectful and kind to all members</li>
                    <li>• Share accurate information only</li>
                    <li>• No spam or self-promotion</li>
                    <li>• Keep posts relevant to pet care</li>
                    <li>• Report inappropriate content</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-40 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge>{event.category}</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {event.attendees}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{event.description}</p>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <Button className="w-full">Join Event</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lost & Found Tab */}
        {activeTab === "lost-found" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Lost & Found Pets</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Report Pet
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lostPets.map((pet) => (
                <Card
                  key={pet.id}
                  className={`overflow-hidden border-l-4 ${
                    pet.status === "lost" ? "border-l-red-500" : "border-l-green-500"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={pet.status === "lost" ? "bg-red-500" : "bg-green-500"}>
                        {pet.status === "lost" ? "LOST" : "FOUND"}
                      </Badge>
                      <span className="text-sm text-gray-600">{new Date(pet.lastSeen).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{pet.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {pet.breed} • {pet.species}
                    </p>

                    <img
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                    />

                    <p className="text-gray-700 text-sm mb-4">{pet.description}</p>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{pet.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Contact: {pet.contact}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Contact Owner</Button>
                      <Button variant="outline">Share</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Ask Experts Tab */}
        {activeTab === "experts" && (
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Ask Our Pet Experts</h3>
                <p className="text-gray-600 mb-4">
                  Get professional advice from certified veterinarians and animal behaviorists
                </p>
                <div className="space-y-4">
                  <Input placeholder="What's your question about pet care?" />
                  <Textarea placeholder="Provide more details about your pet and the situation..." />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photo
                      </Button>
                      <select className="text-sm border rounded px-2 py-1">
                        <option>Select Category</option>
                        <option>Health & Medical</option>
                        <option>Behavior & Training</option>
                        <option>Nutrition & Diet</option>
                        <option>Grooming & Care</option>
                      </select>
                    </div>
                    <Button>Submit Question</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Expert Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <div className="p-6 text-center">
                  <Avatar
                    src="/placeholder.svg?height=80&width=80"
                    alt="Dr. Smith"
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-1">Dr. Sarah Smith</h3>
                  <p className="text-gray-600 mb-4">Veterinarian • 15 years experience</p>
                  <div className="flex justify-center space-x-4 mb-4 text-sm">
                    <div>
                      <div className="font-bold">1.2K</div>
                      <div className="text-gray-600">Answers</div>
                    </div>
                    <div>
                      <div className="font-bold">4.9</div>
                      <div className="text-gray-600">Rating</div>
                    </div>
                  </div>
                  <Button className="w-full">Ask Question</Button>
                </div>
              </Card>

              <Card>
                <div className="p-6 text-center">
                  <Avatar
                    src="/placeholder.svg?height=80&width=80"
                    alt="Dr. Johnson"
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-1">Dr. Mike Johnson</h3>
                  <p className="text-gray-600 mb-4">Animal Behaviorist • 12 years experience</p>
                  <div className="flex justify-center space-x-4 mb-4 text-sm">
                    <div>
                      <div className="font-bold">856</div>
                      <div className="text-gray-600">Answers</div>
                    </div>
                    <div>
                      <div className="font-bold">4.8</div>
                      <div className="text-gray-600">Rating</div>
                    </div>
                  </div>
                  <Button className="w-full">Ask Question</Button>
                </div>
              </Card>

              <Card>
                <div className="p-6 text-center">
                  <Avatar
                    src="/placeholder.svg?height=80&width=80"
                    alt="Dr. Brown"
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-1">Dr. Lisa Brown</h3>
                  <p className="text-gray-600 mb-4">Pet Nutritionist • 10 years experience</p>
                  <div className="flex justify-center space-x-4 mb-4 text-sm">
                    <div>
                      <div className="font-bold">634</div>
                      <div className="text-gray-600">Answers</div>
                    </div>
                    <div>
                      <div className="font-bold">4.7</div>
                      <div className="text-gray-600">Rating</div>
                    </div>
                  </div>
                  <Button className="w-full">Ask Question</Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
