import { Link } from '@tanstack/react-router'

type DeckCardProps = {
  title: string
  type: string
  description: string
  href: string
}

const DeckCard = ({ title, type, description, href }: DeckCardProps) => {
  return (
    <Link to={href} className="inline-flex">
      <div className="outline outline-1 outline-[#EDEDED] w-full max-w-[328px] p-6 space-y-2 rounded-lg hover:outline-[#7B00FF] hover:outline-2 hover:shadow-[0px_2px_12px_0px_rgba(0,0,0,0.52)] transition-all cursor-pointer group">
        <div className="flex justify-between items-center">
          <span className="font-suse font-bold text-xl leading-[25.2px]">
            {title}
          </span>
          <div className="flex justify-center items-center px-[6px] text-white bg-[#FF7F11] text-xs font-semibold rounded leading-[14.52px] h-[21px]">
            {type}
          </div>
        </div>
        <div className="w-[280px] h-[118px] bg-[#E8E8E8] rounded-sm" />
        <div className="font-inter font-normal text-sm leading-[16px] text-[#7A7A7A] group-hover:text-black transition-colors">
          {description}
        </div>
      </div>
    </Link>
  )
}

export default DeckCard
