const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
