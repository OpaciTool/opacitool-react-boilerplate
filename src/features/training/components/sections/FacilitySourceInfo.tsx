import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-4/form-content.json";

export default function FacilitySourceInfo() {
  const { openModal } = useFormModal();
  const { fields } = formContent.facilitySection;

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="border border-gray-300">
        {/* Header */}
        <div className="bg-gray-900 p-2 font-semibold text-white text-center">
          Facility & Source Info
        </div>

        {/* Form Layout */}
        <div className="divide-y divide-black border-x border-black border-b">
          {/* Facility Name & Permit */}
          <div
            className="cursor-pointer  p-2 hover:bg-gray-50"
            onClick={() => openModal(fields.facilityName)}
          >
            <div className="text-sm font-medium text-black mb-3">Facility Name & Permit #</div>
          </div>

          {/* Address */}
          <div onClick={() => openModal(fields.address)} className="cursor-pointer  hover:bg-gray-50">
            <div className="border-b border-black ">
              <div className="text-sm p-2 font-medium text-black mb-3">Address</div>
            </div>

            {/* City State Zip */}
            <div className="grid grid-cols-6 divide-x divide-black p-2 ">
              <div className="col-span-2 pr-2">
                <div className="text-sm font-medium text-black mb-3">City</div>
              </div>
              <div className="col-span-2 px-2">
                <div className="text-sm font-medium text-black mb-3">State</div>
              </div>
              <div className="col-span-2 pl-2">
                <div className="text-sm font-medium text-black mb-3">Zip</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div onClick={() => openModal(fields.facilityContact)}  className="cursor-pointer hover:bg-gray-50 grid grid-cols-2 divide-x divide-black  p-2">
            <div className="pr-2 ">
              <div className="text-sm font-medium text-black mb-3">Contact Name</div>
            </div>
            <div className="pl-2 ">
              <div className="text-sm font-medium text-black mb-3">Contact Phone</div>
            </div>
          </div>

          {/* Coordinates */}
          <div onClick={() => openModal(fields.sourceCoordinates)}  className="cursor-pointer hover:bg-gray-50 p-2">
            <div className="text-sm font-medium text-black mb-3 ">Coordinates of Source</div>
          </div>

          {/* Source Equipment Description */}
          <div onClick={() => openModal(fields.sourceEquipmentDescription)} className="cursor-pointer hover:bg-gray-50 p-2">
            <div className="text-sm font-medium text-black mb-3">Source Equipment Description</div>
          </div>

          {/* Equipment ID and Mode */}
          <div className="grid grid-cols-2 divide-x divide-black ">
            <div  onClick={() => openModal(fields.sourceEquipmentId)} >
              <div className="text-sm cursor-pointer hover:bg-gray-50 p-2 font-medium text-black mb-3">Source Equipment ID</div>
            </div>
            <div onClick={() => openModal(fields.sourceEquipmentMode)}>
              <div className="text-sm cursor-pointer hover:bg-gray-50 p-2 font-medium text-black mb-3">Operating Mode</div>
            </div>
          </div>

          {/* Control Equipment */}
          <div className="grid grid-cols-2 divide-x divide-black">
            <div onClick={() => openModal(fields.controlEquipmentDescription)} >
              <div className="text-sm p-2 cursor-pointer hover:bg-gray-50 font-medium text-black mb-3">Control Equipment</div>
            </div>
            <div onClick={() => openModal(fields.controlEquipmentOperatingMode)}>
              <div className="text-sm p-2 cursor-pointer hover:bg-gray-50 font-medium text-black mb-3">Operating Mode</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
