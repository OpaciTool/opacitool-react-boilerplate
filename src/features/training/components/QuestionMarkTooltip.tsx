export default function QuestionMarkTooltip() {
    return (
      <div className="group relative flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-10 h-10 cursor-pointer fill-black hover:fill-gray-700"
        >
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fill="white"
            fontSize="14px"
            fontWeight="bold"
          >
            ?
          </text>
        </svg>
        <p className="text-white text-lg">Support</p>
  
        <div className="absolute z-30 lg:w-80 top-10 right-0 hidden group-hover:block bg-teal-400 text-black p-2 rounded-lg shadow-lg text-xs lg:text-sm">
          <p>Here goes text with more info about support</p>
        </div>
      </div>
    );
  }