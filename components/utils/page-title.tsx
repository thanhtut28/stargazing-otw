interface TitleProps {
  title: string
}

export default function Title({ title }: TitleProps) {
  return (
    <h2 className="font-sans text-[16vw] w-fit tracking-tighter font-bold uppercase">
      {title}
    </h2>
  )
}
