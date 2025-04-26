export default function DetailsWrapper({ children }) {
  return (
    <div className="lg:flex-[65%]">
      <div className="flex items-stretch h-full">{children}</div>
    </div>
  )
}
