const App = () => {
  return (
    <main className="p-10">
      <div className="outline outline-1 outline-[#EDEDED] w-full max-w-[328px] p-6 space-y-2 rounded-lg hover:outline-[#7B00FF] hover:outline-2 hover:shadow-[0px_2px_12px_0px_rgba(0,0,0,0.52)] transition-all cursor-pointer">
        <div className="flex justify-between items-center">
          <span className="font-suse font-bold text-xl leading-[25.2px]">
            Estimation
          </span>
          <div className="flex justify-center items-center px-[6px] text-white bg-[#FF7F11] text-xs font-semibold rounded leading-[14.52px] h-[21px]">
            Sizing
          </div>
        </div>
        <div className="w-[280px] h-[118px] bg-[#E8E8E8] rounded-sm" />
        <div className="font-inter font-normal text-sm leading-[16px] text-[#7A7A7A]">
          A short description of what this deck is and how you can use it.
        </div>
      </div>
    </main>
  )
}

export default App
