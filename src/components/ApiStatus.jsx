import React, { useState, useEffect } from 'react'
import { Wifi, WifiOff, Activity, AlertTriangle } from 'lucide-react'
import Badge from './Badge'

const ApiStatus = ({ className = '' }) => {
  const [apiStatus, setApiStatus] = useState({
    apiNinjas: 'checking',
    rescueGroups: 'checking',
    shopify: 'checking',
    googleMaps: 'checking'
  })

  const [overallStatus, setOverallStatus] = useState('checking')

  useEffect(() => {
    checkApiStatus()
    const interval = setInterval(checkApiStatus, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  const checkApiStatus = async () => {
    const statusChecks = {
      apiNinjas: checkApiNinjas(),
      rescueGroups: checkRescueGroups(),
      shopify: checkShopify(),
      googleMaps: checkGoogleMaps()
    }

    const results = {}
    for (const [api, check] of Object.entries(statusChecks)) {
      try {
        await check
        results[api] = 'online'
      } catch (error) {
        results[api] = 'offline'
      }
    }

    setApiStatus(results)

    // Determine overall status
    const onlineCount = Object.values(results).filter(status => status === 'online').length
    const totalApis = Object.keys(results).length
    
    if (onlineCount === totalApis) {
      setOverallStatus('online')
    } else if (onlineCount > 0) {
      setOverallStatus('partial')
    } else {
      setOverallStatus('offline')
    }
  }

  const checkApiNinjas = async () => {
    const response = await fetch('https://api.api-ninjas.com/v1/animals?name=dog', {
      headers: { 'X-Api-Key': process.env.REACT_APP_API_NINJAS_KEY }
    })
    if (!response.ok) throw new Error('API Ninjas offline')
  }

  const checkRescueGroups = async () => {
    // Mock check - replace with actual endpoint
    return Promise.resolve()
  }

  const checkShopify = async () => {
    // Mock check - replace with actual endpoint
    return Promise.resolve()
  }

  const checkGoogleMaps = async () => {
    // Mock check - replace with actual endpoint
    return Promise.resolve()
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-green-500" />
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />
      case 'partial':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-400 animate-pulse" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'offline':
        return 'bg-red-500'
      case 'partial':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'All Systems Online'
      case 'offline':
        return 'Services Offline'
      case 'partial':
        return 'Limited Service'
      default:
        return 'Checking Status...'
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">API Status</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon(overallStatus)}
          <Badge 
            className={`text-white ${getStatusColor(overallStatus)}`}
          >
            {getStatusText(overallStatus)}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(apiStatus).map(([api, status]) => (
          <div key={api} className="flex items-center justify-between text-sm">
            <span className="text-gray-600 capitalize">
              {api.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></div>
              <span className={`text-xs ${
                status === 'online' ? 'text-green-600' : 
                status === 'offline' ? 'text-red-600' : 
                status === 'partial' ? 'text-yellow-600' : 'text-gray-400'
              }`}>
                {status === 'checking' ? 'Checking...' : status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Last checked: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default ApiStatus
