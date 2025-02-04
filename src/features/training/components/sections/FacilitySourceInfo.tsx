import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-4/form-content.json";

export default function FacilitySourceInfo() {
  const { openModal } = useFormModal();
  const { fields } = formContent.facilitySection;

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="border border-gray-300">
        {/* Header */}
        <div className="bg-gray-900 p-2 font-semibold text-white">
          Facility & Source Info
        </div>

        {/* Form Layout */}
        <div className="divide-y divide-gray-300">
          {/* Facility Name & Permit */}
          <div
            className="cursor-pointer border-t border-gray-300 p-2 hover:bg-gray-50"
            onClick={() => openModal(fields.facilityName)}
          >
            <div className="text-sm">Facility Name & Permit #</div>
          </div>

          {/* Address */}
          <div onClick={() => openModal(fields.address)} className="cursor-pointer  hover:bg-gray-50">
            <div className="border-b border-gray-300 ">
              <div className="text-sm p-2">Address</div>
            </div>

            {/* City State Zip */}
            <div className="grid grid-cols-6 divide-x divide-gray-300 p-2">
              <div className="col-span-2 pr-2">
                <div className="text-sm">City</div>
              </div>
              <div className="col-span-2 px-2">
                <div className="text-sm">State</div>
              </div>
              <div className="col-span-2 pl-2">
                <div className="text-sm">Zip</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div onClick={() => openModal(fields.facilityContact)}  className="cursor-pointer hover:bg-gray-50 grid grid-cols-2 divide-x divide-gray-300 p-2">
            <div className="pr-2">
              <div className="text-sm">Contact Name</div>
            </div>
            <div className="pl-2">
              <div className="text-sm">Contact Phone</div>
            </div>
          </div>

          {/* Coordinates */}
          <div onClick={() => openModal(fields.sourceCoordinates)}  className="cursor-pointer hover:bg-gray-50 p-2">
            <div className="text-sm">Coordinates of Source</div>
          </div>

          {/* Source Equipment Description */}
          <div onClick={() => openModal(fields.sourceEquipmentDescription)} className="cursor-pointer hover:bg-gray-50 p-2">
            <div className="text-sm">Source Equipment Description</div>
          </div>

          {/* Equipment ID and Mode */}
          <div className="grid grid-cols-2 divide-x divide-gray-300 ">
            <div  onClick={() => openModal(fields.sourceEquipmentId)} >
              <div className="text-sm cursor-pointer hover:bg-gray-50 p-2">Source Equipment ID</div>
            </div>
            <div onClick={() => openModal(fields.sourceEquipmentMode)}>
              <div className="text-sm cursor-pointer hover:bg-gray-50 p-2">Operating Mode</div>
            </div>
          </div>

          {/* Control Equipment */}
          <div className="grid grid-cols-2 divide-x divide-gray-300 ">
            <div onClick={() => openModal(fields.controlEquipmentDescription)} >
              <div className="text-sm p-2 cursor-pointer hover:bg-gray-50">Control Equipment</div>
            </div>
            <div onClick={() => openModal(fields.controlEquipmentOperatingMode)}>
              <div className="text-sm p-2 cursor-pointer hover:bg-gray-50">Operating Mode</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
