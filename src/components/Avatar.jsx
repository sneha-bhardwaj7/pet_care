const Avatar = ({ src, alt, className = "", ...props }) => {
  const baseClasses = "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
          <span className="text-sm font-medium text-gray-600">{alt ? alt.charAt(0).toUpperCase() : "?"}</span>
        </div>
      )}
    </div>
  )
}

export default Avatar
