import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-4/form-content.json";

export default function AtmosphericInfo() {
  const { openModal } = useFormModal();
  const { fields } = formContent.atmosphericSection;

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="border border-black">
        {/* Header */}
        <div className="bg-gray-900 p-2 font-semibold text-white text-center">
          Atmospheric Info
        </div>

        {/* Form Layout */}
        <div className="divide-y divide-black">
          {/* Cloud Cover and Ambient Temp */}
          <div className="grid grid-cols-2 divide-x divide-black">
            <div
              onClick={() => openModal(fields.cloudCover)}
              className="cursor-pointer bg-gray-100 hover:bg-gray-50"
            >
              <div className="text-sm font-medium text-black p-2 bg-[#E4EAED]">% Cloud Cover</div>
              <div className="mt-1 grid grid-cols-2 gap-4 px-2">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
            <div
              onClick={() => openModal(fields.ambientTemp)}
              className="cursor-pointer bg-gray-100 hover:bg-gray-50"
            >
              <div className="text-sm font-medium text-black p-2 bg-[#E4EAED]">Ambient Temp</div>
              <div className="mt-1 grid grid-cols-2 gap-4 px-2">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
          </div>

          {/* Wind Speed and Direction */}
          <div className="grid grid-cols-2 divide-x divide-black">
            <div
              onClick={() => openModal(fields.windSpeed)}
              className="cursor-pointer  hover:bg-gray-50"
            >
              <div className="text-sm font-medium text-black p-2 bg-[#E4EAED]">Wind Speed</div>
              <div className="mt-1 grid grid-cols-2 gap-4 px-2">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
            <div
              onClick={() => openModal(fields.windDirection)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <div className="text-sm font-medium text-black p-2 bg-[#E4EAED]">Wind Direction</div>
              <div className="mt-1 grid grid-cols-2 gap-4 px-2 ">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
          </div>

          {/* Relative Humidity and Wet Bulb Temp */}
          <div className="grid grid-cols-2 divide-x divide-black">
            <div
              onClick={() => openModal(fields.relativeHumidity)}
              className="cursor-pointer bg-gray-100 hover:bg-gray-50"
            >
              <div className="text-sm font-medium text-black p-2  mb-2">% Relative Humidity</div>
            </div>
            <div
              onClick={() => openModal(fields.wetBulbTemp)}
              className="cursor-pointer bg-gray-100  hover:bg-gray-50"
            >
              <div className="text-sm font-medium text-black p-2  mb-2">Wet Bulb Temp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
  