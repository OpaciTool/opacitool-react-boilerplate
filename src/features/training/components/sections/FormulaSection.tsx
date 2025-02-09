export default function FormulaSection() {
    return (
      <div className="w-full py-8 px-4 lg:px-14  mx-auto p-4">
        <div className="">
          {/* Header Grid */}
          <div className="grid grid-cols-2 ">
            <div className="p-2 text-center font-bold">FORMULA</div>
            <div className="p-2 text-center font-bold">KEY</div>
          </div>
  
          {/* Content Grid */}
          <div className="grid grid-cols-2 justify-items-center">
            {/* Formula Column */}
            <div className="p-4 space-y-2 font-mono text-lg">
              <div>1-O₁/100 = T₁</div>
              <div>1-O₂/100 = T₂</div>
              <div>1-O₃/100 = T₃</div>
              <div>T₁ x T₂ x T₃ = T</div>
              <div>100 x (1-T) = O</div>
            </div>
  
            {/* Key Column */}
            <div className="p-4 space-y-2 text-sm">
              <div>O₁ = % opacity of 1st plume</div>
              <div>O₂ = % opacity of 2nd plume</div>
              <div>O₃ = % opacity of N₃ plume</div>
              <div>T₁ = Transmittance of 1st plume</div>
              <div>T₂ = Transmittance of 2nd plume</div>
              <div>T₃ = Transmittance of N₃ plume</div>
              <div>T = Total Transmittance</div>
              <div>O = % Total Opacity</div>
            </div>
          </div>
  
          {/* Application Section */}
          <div className=" p-4">
            <div className="font-bold mb-4">Application & Calculation</div>
            <div className="text-lg mb-4">
              Don&apos;t be intimidated by the formula - it&apos;s time-consuming but easy to use. Below is an example of
              a single source with two emission points.
            </div>
  
            {/* Example Calculations */}
            <div className="space-y-2 font-mono text-lg">
              <div>Emission Point 1, Opacity Reading 1 = 25%</div>
              <div>Emission Point 2, Opacity Reading 1 = 35%</div>
              <div className="my-4"></div>
              <div>1-O₁/100 = T₁ ------------ 1-(25/100) = 0.75</div>
              <div>1-O₂/100 = T₂ ------------ 1-(35/100) = 0.65</div>
              <div>T₁ x T₂ = T -------------- 0.75 x 0.65 = 0.4875</div>
              <div>100 x (1-T) = O ---------- 100 x (1-0.4875) = 51.25%</div>
            </div>
  
            {/* Note */}
            <div className="mt-4 text-lg italic">This calculation must be completed for each opacity reading.</div>
          </div>
        </div>
      </div>
    )
  }
  
  