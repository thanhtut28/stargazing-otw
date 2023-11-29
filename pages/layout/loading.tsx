import { useNProgress } from '@tanem/react-nprogress'
import cn from 'classnames'
import Image from 'next/image'
import logoImg from '../../public/logo.png'

interface Props {
  loading: boolean
}

const PageLoading: React.FC<Props> = ({ loading }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: loading,
  })

  return (
    <div
      className={`z-50 bg-black fixed gap-5 flex-col justify-center items-center bg-slate-black top-0 left-0 right-0 bottom-0 w-full h-full ${
        isFinished ? 'hidden' : 'flex'
      }`}
    >
      <div className="relative aspect-square w-14">
        <Image
          className="absolute"
          src={logoImg}
          fill
          quality={100}
          priority={true}
          alt="logo"
        />
      </div>
      <div className="h-1.5 relative overflow-hidden w-1/2 max-w-xs rounded-full bg-neutral-800">
        <div
          className={`absolute top-0 left-0 bottom-0 w-full bg-white rounded-full`}
          style={{
            marginLeft: `${(-1 + progress) * 100}%`,
            transition: `margin-left ${animationDuration}ms linear`,
          }}
        ></div>
      </div>
    </div>
  )
}

export default PageLoading
