import cn from 'classnames'

interface Props {
  className: string
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={cn(
        'border-t border-t-disabled border-opacity-30 pt-20 px-10',
        className,
      )}
    >
      <h6 className="text-white text-center font-heading text-xl md:text-2xl lg:text-3xl">
        They stargazed about rich life.
      </h6>
      <div className="flex justify-center py-12 items-center">
        <div className="flex flex-col justify-center items-center">
          <h6 className="text-secondary text-sm">Follow us on</h6>
          <div className="flex gap-2 text-white text-xs">
            <p>
              <a
                href="https://www.facebook.com/profile.php?id=100089591902452"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Facebook
              </a>
            </p>
            <p>
              <a
                href="https://www.instagram.com/stargazing.otw/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pb-6 gap-0.5">
        <span className="text-disabled mt-0.5 text-2xs flex justify-center items-center">
          &copy;
        </span>
        <p className="uppercase text-disabled text-2xs text-center">
          copyright stargazing 2023
        </p>
      </div>
    </footer>
  )
}

export default Footer
