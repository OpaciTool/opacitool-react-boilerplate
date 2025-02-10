import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-7/form-content.json";

export default function ObservationPositionSketch() {
    const { openModal } = useFormModal();
    const { fields } = formContent.method22Section;
    return (
      <div className=" px-4 lg:px-14 cursor-pointer" onClick={() => openModal(fields.observation_position_sketch)}>
        {/* Header */}
        <div className="bg-gray-900 p-4">
          <h2 className="text-center text-xl font-bold text-white">OBSERVATION POSITION SKETCH</h2>
          <p className="text-center text-sm text-gray-300 italic">
            Indicate observer position relative to source. If emissions are observed, indicate their location with an X.
          </p>
        </div>
  
        {/* Sketch Areas */}
        <div className="grid lg:grid-cols-3 border border-black">
          {[1, 2, 3].map((location) => (
            <div key={location} className={`min-h-[300px] ${location !== 3 ? "border-r border-black" : ""}`}>
              {/* Location Header */}
              <div className="flex items-center justify-between p-4">
                <h3 className="text-lg font-medium">LOCATION {location}</h3>
                {/* North Indicator */}
                <div className="text-center">
                  <span className="block text-base text-zinc-900">Draw <br /> North</span>
                  <div className="mt-1">
                    <svg viewBox="0 0 40 40" className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
  
              {/* Sketch Area */}
              <div className="h-[250px] p-4">{/* Empty space for sketching */}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  