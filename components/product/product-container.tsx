export default function Container({ children }) {
  return (
    <div className="mx-auto md:px-5">
      <div className="flex flex-col lg:flex-row items-stretch lg:gap-4">
        {children}
      </div>
    </div>
  )
}
