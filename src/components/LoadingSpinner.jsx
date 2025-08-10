import React from 'react'

const LoadingSpinner = ({ size = 'default', message = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`${sizeClasses[size]} border-4 border-blue-200 rounded-full animate-spin`}>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {message && (
        <p className="mt-4 text-gray-600 text-center animate-pulse">{message}</p>
      )}
      
      {/* Cute paw prints animation */}
      <div className="flex space-x-1 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default LoadingSpinner

