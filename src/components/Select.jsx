"use client"

const Select = ({ children, value, onChange, className = "", ...props }) => {
  const baseClasses =
    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

  return (
    <select
      className={`${baseClasses} ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      {children}
    </select>
  )
}

export default Select
