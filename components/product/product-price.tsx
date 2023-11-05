interface Props {
  price: number
}

export default function ProductPrice({ price }: Props) {
  return (
    <div className="w-14 md:w-20 lg:w-24 bg-banner lg:h-full flex justify-center items-center">
      <h4 className="text-3xl md:text-5xl lg:text-7xl font-light text-black -rotate-90 ml-3">
        {price.toLocaleString()}
        <span className="px-3 text-3xl">Ks</span>
      </h4>
    </div>
  )
}
