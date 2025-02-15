export default function FormulaSection() {
  return (
    <div className="mx-auto w-full p-4 px-4 py-8 lg:px-14">
      <div className="">
        {/* Header Grid */}
        <div className="grid grid-cols-2">
          <div className="p-2 text-center font-bold">FORMULA</div>
          <div className="p-2 text-center font-bold">KEY</div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 justify-items-center">
          {/* Formula Column */}
          <div className="space-y-2 p-4 font-mono text-lg">
            <div className="flex items-baseline space-x-1">
              <span>1-O</span>
              <span className="align-bottom text-[10px]">1</span>
              <span>/100 = T</span>
              <span className="align-bottom text-[10px]">1</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>1-O</span>
              <span className="align-bottom text-[10px]">2</span>
              <span>/100 = T</span>
              <span className="align-bottom text-[10px]">2</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>1-O</span>
              <span className="align-bottom text-[10px]">N</span>
              <span>/100 = T</span>
              <span className="align-bottom text-[10px]">N</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>T</span>
              <span className="align-bottom text-[10px]">1</span>
              <span>× T</span>
              <span className="align-bottom text-[10px]">2</span>
              <span>× T</span>
              <span className="align-bottom text-[10px]">N</span>
              <span>= T</span>
              <span className="align-bottom text-[10px]">T</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>100 × (1-</span>
              <span>T</span>
              <span className="align-bottom text-[10px]">T</span>)
              <span>= O</span>
            </div>

            {/* <div className="flex items-baseline space-x-1">
              <span>100 × (1-T) = O</span>
              <span className="align-bottom text-[10px]">T</span>
            </div> */}
          </div>

          {/* Key Column */}
          <div className="space-y-2 p-4 text-sm">
            <div className="flex items-baseline space-x-1">
              <span>O</span>
              <span className="align-bottom text-[10px]">1</span>
              <span>= % opacity of 1</span>
              <span className="align-bottom text-[10px]">st</span>
              <span>plume</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>O</span>
              <span className="align-bottom text-[10px]">2</span>
              <span>= % opacity of 2</span>
              <span className="align-bottom text-[10px]">nd</span>
              <span>plume</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>O</span>
              <span className="align-bottom text-[10px]">N</span>
              <span>= % opacity of N</span>
              <span className="align-bottom text-[10px]">th</span>
              <span>plume</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>T</span>
              <span className="align-bottom text-[10px]">1</span>
              <span>= Transmittance of 1</span>
              <span className="align-bottom text-[10px]">st</span>
              <span>plume</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>T</span>
              <span className="align-bottom text-[10px]">2</span>
              <span>= Transmittance of 2</span>
              <span className="align-bottom text-[10px]">nd</span>
              <span>plume</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>T</span>
              <span className="align-bottom text-[10px]">N</span>
              <span>= Transmittance of N</span>
              <span className="align-bottom text-[10px]">th</span>
              <span>plume</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>T </span>
              <span className="align-bottom text-[10px]">T</span>
              <span>= Total Transmittance</span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span>O</span>
              <span className="align-bottom text-[10px]">T</span>
              <span>= % Total Opacity</span>
            </div>
          </div>
        </div>

        {/* Application Section */}
        <div className="p-4">
          <div className="mb-4 font-bold">Application & Calculation</div>
          <div className="mb-4 text-lg">
            Don&apos;t be intimidated by the formula - it&apos;s time-consuming
            but easy to use. Below is an example of a single source with two
            emission points.
          </div>

          {/* Example Calculations */}
          <div className="space-y-2 font-mono text-lg">
            <div className="flex items-baseline">
              <div className="flex items-baseline space-x-1">
                <span>1-O</span>
                <span className="align-bottom text-[10px]">1</span>
                <span>/100 = T</span>
                <span className="align-bottom text-[10px]">1</span>
              </div>
              <span className="mx-2 text-gray-400">---------</span>
              <div className="flex items-baseline space-x-1">
                <span>1-(25%/100) = 0.75</span>
              </div>
            </div>

            <div className="flex items-baseline">
              <div className="flex items-baseline space-x-1">
                <span>1-O</span>
                <span className="align-bottom text-[10px]">2</span>
                <span>/100 = T</span>
                <span className="align-bottom text-[10px]">2</span>
              </div>
              <span className="mx-2 text-gray-400">---------</span>
              <div className="flex items-baseline space-x-1">
                <span>1-(35%/100) = 0.65</span>
              </div>
            </div>

            <div className="flex items-baseline">
              <div className="flex items-baseline space-x-1">
                <span>T</span>
                <span className="align-bottom text-[10px]">1</span>
                <span>× T</span>
                <span className="align-bottom text-[10px]">2</span>
                <span>= T</span>
                <span className="align-bottom text-[10px]">T</span>
              </div>
              <span className="mx-2 text-gray-400">---------</span>
              <div className="flex items-baseline space-x-1">
                <span>0.75 × 0.65 = 0.4875</span>
              </div>
            </div>

            <div className="flex items-baseline">
              <div className="flex items-baseline space-x-1">
                <span>100 × (1-</span>
                <span>T</span>
                <span className="align-bottom text-[10px]">T</span>)
              </div>
              <span className="mx-2 text-gray-400">---------</span>
              <div className="flex items-baseline space-x-1">
                <span>100 × (1-0.4875) = 51.25%</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-4 text-lg italic">
            This calculation must be completed for each opacity reading.
          </div>
        </div>
      </div>
    </div>
  );
}
