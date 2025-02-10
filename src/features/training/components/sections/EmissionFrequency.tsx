import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-7/form-content.json";

export default function EmissionFrequency() {
    const { openModal } = useFormModal();
    const { fields } = formContent.method22Section;
    return (
      <div className="px-4 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* Left Column - Logo Section */}
          <div className="flex flex-col order-2 lg:order-1 items-center justify-center p-6">
            {/* Logo Container */}
            <div className="relative ">
              <img src="/images/Logo.png" alt="OPAC TOOL" />
            </div>
            {/* Website URL */}
            <a
              href="http://www.opacitool.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              WWW.OPACITOOL.COM
            </a>
          </div>
  
          {/* Right Column - Form Fields */}
          <div className="border-x border-b border-black order-1 lg:order-2">
            {/* Emission Frequency */}
            <div className="grid grid-cols-2 border-b border-black cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.emission_frequency)}>
              <div className="bg-gray-900 p-3">
                <h3 className="text-sm font-medium text-white">Emission Frequency</h3>
                <p className="mt-1 text-xs text-gray-300">(Total Emission Duration/Total Observation Duration) x 100%</p>
              </div>
              <div className="border-l border-black"></div>
            </div>
  
            {/* Observer Name */}
            <div className="border-b border-black p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observer_name_company)}>
              <div className="text-lg  text-zinc-900">Observer Name</div>
            </div>
  
            {/* Observer Signature */}
            <div className="border-b border-black p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observer_name_company)}>
              <div className="text-lg  text-zinc-900">Observer Signature</div>
            </div>
  
            {/* Company/Organization */}
            <div className="p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observer_name_company)}>
              <div className="text-lg  text-zinc-900">Company/Organization</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  