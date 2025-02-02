export default function AngleFormulaSection() {
    return (
      <div className="w-full mx-auto p-4">
        <div className="border border-gray-300">
          {/* Header Grid */}
          <div className="grid grid-cols-2 divide-x divide-gray-300 border-b border-gray-900">
            <div className="p-2 text-center font-bold">FORMULA</div>
            <div className="p-2 text-center font-bold">KEY</div>
          </div>
  
          {/* Content Grid */}
          <div className="grid grid-cols-2 divide-x divide-gray-300">
            {/* Formula Column */}
            <div className="p-4 space-y-2 font-mono text-sm">
              <div>1-(Oo/100) = T</div>
              <div>
                (1-T<sup>f</sup>) x 100 = Oc
              </div>
            </div>
  
            {/* Key Column */}
            <div className="p-4 space-y-2 text-sm">
              <div>Oo = Observed Opacity</div>
              <div>T = Observed Transmittance</div>
              <div>F = Cosine of Viewing Angle*</div>
              <div>Oc = Corrected Opacity</div>
              <div className="text-xs italic mt-4">
                *Viewing angle is the angle between the observer&apos;s position and the observation point. Viewing angles
                can be measured using a smartphone app, rangefinder or clinometer.
              </div>
            </div>
          </div>
  
          {/* Application Section */}
          <div className="border-t border-gray-300 p-4">
            <div className="font-bold mb-4">Application & Calculation</div>
  
            {/* Initial Values */}
            <div className="text-sm mb-4">
              <div>Viewing Angle: 25°</div>
              <div>Observed Opacity Reading: 30%</div>
            </div>
  
            {/* Steps */}
            <div className="space-y-3 text-sm">
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
            <div className="mt-4 text-sm italic">
              The formula must be applied to each reading where the viewing angle exceeded 15°. An angle correction sheet,
              found in the Resources module, can also be used.
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  