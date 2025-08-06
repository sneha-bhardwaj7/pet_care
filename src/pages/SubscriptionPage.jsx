"use client"

import { useState } from "react"
import { Check, Star, Zap, Crown, Gift } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import { subscriptionPlans, affiliatePartners } from "../data/subscriptions"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState(2) // Premium plan selected by default
  const [billingCycle, setBillingCycle] = useState("monthly")

  const handleSubscribe = (planId) => {
    console.log("Subscribing to plan:", planId)
    // Handle subscription logic
  }

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 1:
        return <Star className="w-6 h-6" />
      case 2:
        return <Zap className="w-6 h-6" />
      case 3:
        return <Crown className="w-6 h-6" />
      default:
        return <Star className="w-6 h-6" />
    }
  }

  const getPlanColor = (planId) => {
    switch (planId) {
      case 1:
        return "from-gray-500 to-gray-600"
      case 2:
        return "from-blue-500 to-purple-600"
      case 3:
        return "from-purple-600 to-pink-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Unlock premium features, get exclusive content, and enjoy an ad-free experience. Join thousands of pet
            parents who trust PetCare Hub Premium.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`${billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 20%</Badge>
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.popular ? "ring-2 ring-purple-500 scale-105" : ""
              } ${selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getPlanColor(plan.id)} text-white mb-4`}
                  >
                    {getPlanIcon(plan.id)}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      ${billingCycle === "yearly" ? (plan.price * 12 * 0.8).toFixed(2) : plan.price}
                    </span>
                    <span className="text-gray-600">/{billingCycle === "yearly" ? "year" : "month"}</span>
                  </div>
                  {plan.savings && billingCycle === "yearly" && (
                    <Badge className="bg-green-100 text-green-800">{plan.savings}</Badge>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-8 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Limitations:</p>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">•</span>
                        <span className="text-sm text-gray-600">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      : plan.price === 0
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {plan.price === 0 ? "Get Started Free" : "Subscribe Now"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="mb-16">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Features</th>
                    <th className="text-center p-4">Basic</th>
                    <th className="text-center p-4">Premium</th>
                    <th className="text-center p-4">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Ad-free Experience</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Expert Q&A Access</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Marketplace Discount</td>
                    <td className="p-4 text-center">0%</td>
                    <td className="p-4 text-center">10%</td>
                    <td className="p-4 text-center">20%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Vet Consultation Credits</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center">2/month</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Custom Training Programs</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Affiliate Partners */}
        <Card>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-4">Trusted Partners</h2>
            <p className="text-center text-gray-600 mb-8">
              We partner with leading pet care companies to bring you exclusive deals and services
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {affiliatePartners.map((partner) => (
                <div key={partner.id} className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-16 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{partner.name}</h3>
                  <Badge className="mb-3 bg-blue-100 text-blue-800">{partner.category}</Badge>
                  <p className="text-sm text-gray-600 mb-4">{partner.description}</p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Gift Subscription */}
        <Card className="mt-16 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="p-8 text-center">
            <Gift className="w-16 h-16 text-pink-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Gift a Subscription</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Know someone who loves their pet? Give them the gift of premium pet care knowledge and exclusive benefits.
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
              <Gift className="w-4 h-4 mr-2" />
              Give the Gift of Premium
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
