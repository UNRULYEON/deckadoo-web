import { Link, useLocation } from 'wouter'
import { HouseIcon } from '@/icons'

const Header = () => {
  const [location] = useLocation()

  return (
    <div className="px-10 pt-10">
      <header>
        {location === '/' ? (
          <img src="/logo.svg" />
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/">
              <HouseIcon />
            </Link>
            <div className="w-[1px] h-[22px] bg-[#B8B8B8]" />
            <span className="font-suse font-bold text-3xl leading-[37.8px] capitalize">
              {location.substring(1).split('-').join(' ')}
            </span>
          </div>
        )}
      </header>
    </div>
  )
}

export default Header
