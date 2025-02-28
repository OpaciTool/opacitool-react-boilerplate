export default function AngleFormulaSection() {
    return (
      <div className="w-full px-4 lg:px-14 mx-auto p-4 dark:bg-zinc-900">
        <div className="">
          {/* Header Grid */}
          <div className="grid grid-cols-2 ">
            <div className="p-2 text-center font-bold text-zinc-900 dark:text-zinc-300">FORMULA</div>
            <div className="p-2 text-center font-bold text-zinc-900 dark:text-zinc-300  ">KEY</div>
          </div>
  
          {/* Content Grid */}
          <div className="grid grid-cols-2 justify-items-center dark:text-zinc-400">
            {/* Formula Column */}
            <div className="p-4 space-y-2 font-mono text-2xl font-bold">
              <div>1-(Oo/100) = T</div>
              <div>
                (1-T<sup>F</sup>) x 100 = Oc
              </div>
            </div>
  
            {/* Key Column */}
            <div className="p-4 space-y-2 text-sm">
              <div className="font-bold text-2xl text-center">Oo = Observed Opacity</div>
              <div className="font-bold text-2xl text-center">T = Observed Transmittance</div>
              <div className="font-bold text-2xl text-center">F = Cosine of Viewing Angle*</div>
              <div className="font-bold text-2xl text-center">Oc = Corrected Opacity</div>
              <div className="text-base text-center italic mt-4">
                *Viewing angle is the angle between the observer&apos;s position and the observation point. Viewing angles
                can be measured using a smartphone app, rangefinder or clinometer.
              </div>
            </div>
          </div>
  
          {/* Application Section */}
          <div className="p-4">
            <div className="font-bold mb-4 text-lg text-zinc-900 dark:text-zinc-300">Application & Calculation</div>
  
            {/* Initial Values */}
            <div className="text-lg mb-4 text-zinc-900 dark:text-zinc-400">
              <div>Viewing Angle: 25°</div>
              <div>Observed Opacity Reading: 30%</div>
            </div>
  
            {/* Steps */}
            <div className="space-y-3 text-lg text-zinc-900 dark:text-zinc-400">
              <div>
                <div className="font-semibold">Step 1: Calculate cosine of 25° = 0.906</div>
              </div>
  
              <div>
                <div className="font-semibold">Step 2: Determine Observed Transmittance (T) Using Formula</div>
                <div className="pl-4">1-(30%/100) = 0.7</div>
              </div>
  
              <div>
                <div className="font-semibold">Step 3: Determine Corrected Opacity (Oc) Using Formula</div>
                <div className="pl-4">
                  (1-0.7<sup>0.906</sup>) x 100 = 27.61%
                </div>
              </div>
            </div>
  
            {/* Note */}
            <div className="mt-4 text-lg italic text-zinc-900 dark:text-zinc-400">
              The formula must be applied to each reading where the viewing angle exceeded 18°. An angle correction sheet,
              found in the Resources module, can also be used.
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  