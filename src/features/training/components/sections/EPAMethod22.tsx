import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-7/form-content.json";

export default function EPAMethod22() {
    const { openModal } = useFormModal();
    const { fields } = formContent.method22Section;

    return (
        <div className=" px-4 lg:px-14 overflow-x-auto ">
          {/* Header */}
          <div className="bg-gray-900 p-4">
            <h1 className="text-center text-xl font-bold text-white">US EPA METHOD 22 TEST FORM</h1>
          </div>
    
          {/* Facility Information */}
          <div className=" border border-black">
            {/* Facility Name and Permit */}
            <div className="grid grid-cols-4 border-b border-black">
              <div className="col-span-3 border-r border-black p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.facilityName)}>
                <div className="text-lg italic text-zinc-900">Facility Name</div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.permit)}>
                <div className="text-lg italic text-zinc-900">Permit #</div>
              </div>
            </div>
    
            {/* Source Unit & ID */}
            <div className="border-b border-black p-3 cursor-pointer hover:bg-gray-50 "  onClick={() => openModal(fields.sourceUnit)}>
              <div className="text-lg italic text-zinc-900">Source Unit & ID</div>
            </div>
    
            {/* Address */}
            <div className="border-b border-black p-3 cursor-pointer hover:bg-gray-50 " onClick={() => openModal(fields.address)}>
              <div className="text-lg italic text-zinc-900">Address</div>
            </div>
    
            {/* City, State, Zip */}
            <div className="grid grid-cols-8 border-b border-black cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.address)}>
              <div className="col-span-4 border-r border-black p-3">
                <div className="text-lg italic text-zinc-900">City</div>
              </div>
              <div className="col-span-2 border-r border-black p-3">
                <div className="text-lg italic text-zinc-900">State</div>
              </div>
              <div className="col-span-2 p-3">
                <div className="text-lg italic text-zinc-900">Zip</div>
              </div>
            </div>
    
            {/* Facility Contact and Phone */}
            <div className="grid grid-cols-4 border-b border-black cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.facility_contact)}>
              <div className="col-span-3 border-r border-black p-3 " >
                <div className="text-lg italic text-zinc-900">Facility Contact</div>
              </div>
              <div className="p-3">
                <div className="text-lg italic text-zinc-900">Facility Contact Phone</div>
              </div>
            </div>
    
            {/* Outdoor Test Section */}
            <div className="grid lg:grid-cols-6 border-b border-black">
              <div className="bg-[#ff6b6b] p-3 text-white">OUTDOOR TEST</div>
              <div className="border-l border-r border-black p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.outdoor_temperature)}>
                <div className="text-lg italic text-zinc-900">Temperature</div>
              </div>
              <div className="border-r border-black p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.cloud_cover)}>
                <div className="text-lg italic text-zinc-900">% Cloud Cover</div>
              </div>
              <div className="border-r border-black p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.wind_speed_direction)}>
                <div className="text-lg italic text-zinc-900">Wind Speed</div>
              </div>
              <div className="border-r border-black p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.wind_speed_direction)}>
                <div className="text-lg italic text-zinc-900">Wind Direction</div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.precipitation)}>
                <div className="text-lg italic text-zinc-900">48 Hr Precipitation</div>
              </div>
            </div>
    
            {/* Indoor Test Section */}
            <div className="grid lg:grid-cols-6 border-b border-black">
              <div className="bg-gray-600 p-3 text-white">INDOOR TEST</div>
              <div className="col-span-4 border-l border-r border-black p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.light_type)}>
                <div className="text-lg italic text-zinc-900">Light Type</div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-gray-50" onClick={() => openModal(fields.illumination)}>
                <div className="text-lg italic text-zinc-900">Illumination (Lux)</div>
              </div>
            </div>
          </div>
        </div>
      )
  }
  
  