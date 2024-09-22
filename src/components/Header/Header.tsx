import { Link, useLocation } from '@tanstack/react-router'
import { HouseIcon } from '@/icons'
import { useDeckadooStore } from '@/hooks'

const Header = () => {
  const { pathname } = useLocation()
  const name = useDeckadooStore((s) => s.name)
  const setName = useDeckadooStore((s) => s.setName)

  return (
    <div className="px-10 pt-10">
      <header className="flex justify-between">
        <div>
          {pathname === '/' ? (
            <img src="/logo.svg" />
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/">
                <HouseIcon />
              </Link>
              <div className="w-[1px] h-[22px] bg-[#B8B8B8]" />
              <span className="font-suse font-bold text-3xl leading-[37.8px] capitalize">
                {pathname.split('/')[1].split('-').join(' ')}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-3 justify-between">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name here"
            className="text-right font-inter font-bold text-sm leading-[16px] ring-0 focus:ring-0 focus:outline-none placeholder:text-[#7A7A7A]"
          />
          <div className="w-10 h-10 rounded-full bg-[#D9D9D9]" />
        </div>
      </header>
    </div>
  )
}

export default Header
