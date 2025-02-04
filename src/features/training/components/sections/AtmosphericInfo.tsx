import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-4/form-content.json";

export default function AtmosphericInfo() {
  const { openModal } = useFormModal();
  const { fields } = formContent.atmosphericSection;

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="border border-gray-300">
        {/* Header */}
        <div className="bg-gray-900 p-2 font-semibold text-white">
          Atmospheric Info
        </div>

        {/* Form Layout */}
        <div className="divide-y divide-gray-300">
          {/* Cloud Cover and Ambient Temp */}
          <div className="grid grid-cols-2 divide-x divide-gray-300">
            <div
              onClick={() => openModal(fields.cloudCover)}
              className="cursor-pointer bg-gray-100 p-2 hover:bg-gray-50"
            >
              <div className="text-sm">% Cloud Cover</div>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
            <div
              onClick={() => openModal(fields.ambientTemp)}
              className="cursor-pointer bg-gray-100 p-2 hover:bg-gray-50"
            >
              <div className="text-sm">Ambient Temp</div>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
          </div>

          {/* Wind Speed and Direction */}
          <div className="grid grid-cols-2 divide-x divide-gray-300">
            <div
              onClick={() => openModal(fields.windSpeed)}
              className="cursor-pointer p-2 hover:bg-gray-50"
            >
              <div className="text-sm">Wind Speed</div>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
            <div
              onClick={() => openModal(fields.windDirection)}
              className="cursor-pointer p-2 hover:bg-gray-50"
            >
              <div className="text-sm">Wind Direction</div>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
          </div>

          {/* Relative Humidity and Wet Bulb Temp */}
          <div className="grid grid-cols-2 divide-x divide-gray-300">
            <div
              onClick={() => openModal(fields.relativeHumidity)}
              className="cursor-pointer bg-gray-100 p-2 hover:bg-gray-50"
            >
              <div className="text-sm">% Relative Humidity</div>
            </div>
            <div
              onClick={() => openModal(fields.wetBulbTemp)}
              className="cursor-pointer bg-gray-100 p-2 hover:bg-gray-50"
            >
              <div className="text-sm">Wet Bulb Temp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
  