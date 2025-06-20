interface Props {
  price: number
}

/**
 * @remove lg:min-h-screen
 * @because price container no longer need fullscreen height beacause of footer section
 * @fixed container height not occupy fullscreen problem in large screens(ipad pro)
 */

export default function ProductPrice({ price }: Props) {
  return (
    <div className="w-12 md:w-20 lg:w-24 bg-banner lg:h-full flex justify-center items-center">
      <h4 className="text-3xl md:text-5xl lg:text-7xl font-light text-black -rotate-90 ml-1 sm:ml-2 md:ml-3 lg:ml-4">
        {price.toLocaleString()}
        <span className="px-2 text-lg md:text-xl lg:text-3xl">Ks</span>
      </h4>
    </div>
  )
}
