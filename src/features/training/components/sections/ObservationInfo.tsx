import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-4/form-content.json";

export default function ObservationInfo() {
  const { openModal } = useFormModal();
  const { fields } = formContent.observationSection;

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="border border-gray-300">
        {/* Header */}
        <div className="bg-gray-900 p-2 font-semibold text-white">
          Observation Info
        </div>

        {/* Form Layout */}
        <div className="divide-y divide-gray-300">
          {/* Emission Point Description */}
          <div
            onClick={() => openModal(fields.emissionPoint)}
            className="cursor-pointer border-t border-gray-300 p-2 hover:bg-gray-50"
          >
            <div className="text-sm">Emission Point Description</div>
          </div>

          {/* Observation Point - Height and Distance */}
          <div className="grid grid-cols-2 divide-x divide-gray-300">
            <div
              onClick={() => openModal(fields.observationPointHeight)}
              className="cursor-pointer p-2 hover:bg-gray-50"
            >
              <div className="text-sm font-medium">
                Observation Point - Height
              </div>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
            <div
              onClick={() => openModal(fields.observationPointDistance)}
              className="cursor-pointer p-2 hover:bg-gray-50"
            >
              <div className="text-sm font-medium">
                Observation Point - Distance
              </div>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
          </div>

          {/* Observation Point - Direction and Angle */}
          <div className="grid grid-cols-2 divide-x divide-gray-300">
            <div
              onClick={() => openModal(fields.observationPointDirection)}
              className="cursor-pointer p-2 hover:bg-gray-50"
            >
              <div className="text-sm font-medium">
                Observation Point - Direction
              </div>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
            <div
              onClick={() => openModal(fields.observationPointAngle)}
              className="cursor-pointer p-2 hover:bg-gray-50"
            >
              <div className="text-sm font-medium">
                Observation Point - Angle
              </div>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="text-sm">Start</div>
                <div className="text-sm">End</div>
              </div>
            </div>
          </div>

          {/* Distance from Emission Point */}
          <div
            onClick={() =>
              openModal(fields.distanceBetweenEmissionPointAndObservationPoint)
            }
            className="cursor-pointer bg-gray-100 p-2 hover:bg-gray-50"
          >
            <div className="text-sm">
              Distance from Emission Point to Observation Point
            </div>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div className="text-sm">Start</div>
              <div className="text-sm">End</div>
            </div>
          </div>

          {/* Plume Shape */}
          <div
            onClick={() => openModal(fields.plumeShape)}
            className="cursor-pointer bg-gray-100 p-2 hover:bg-gray-50"
          >
            <div className="text-sm">Plume Shape</div>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div className="text-sm">Start</div>
              <div className="text-sm">End</div>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-gray-300">
            {/* Emission Type */}
            <div
              onClick={() => openModal(fields.emissionType)}
              className="grid cursor-pointer grid-cols-2 divide-x divide-gray-300 bg-gray-100 hover:bg-gray-50"
            >
              <div className="p-2">
                <div className="text-sm">Emission Type</div>
                <div className="mt-1 flex justify-between gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 border border-gray-400"></div>
                    <span className="text-sm">Fugitive</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 border border-gray-400"></div>
                    <span className="text-sm">Point Source</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Emission Color */}
            <div
              onClick={() => openModal(fields.emissionColor)}
              className="grid cursor-pointer grid-cols-2 divide-x divide-gray-300 bg-gray-100 hover:bg-gray-50"
            >
              <div className="p-2">
                <div className="text-sm">Emission Color</div>
                <div className="mt-1 flex justify-between gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Start</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">End</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Water Vapor Plume */}
          <div
            onClick={() => openModal(fields.waterVaporPlume)}
            className="cursor-pointer bg-gray-100 p-2 hover:bg-gray-50"
          >
            <div className="text-sm">Water Vapor Plume</div>
            <div className="mt-1 flex gap-4">
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 border border-gray-400"></div>
                <span className="text-sm">Attached</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 border border-gray-400"></div>
                <span className="text-sm">Detached</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 border border-gray-400"></div>
                <span className="text-sm">None</span>
              </div>
            </div>
          </div>

          {/* Background & Color */}
          <div
            onClick={() => openModal(fields.backgroundAndColor)}
            className="cursor-pointer bg-gray-100 p-2 hover:bg-gray-50"
          >
            <div className="text-sm">Background & Color</div>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div className="text-sm">Start</div>
              <div className="text-sm">End</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
