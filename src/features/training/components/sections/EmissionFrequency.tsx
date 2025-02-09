import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-7/form-content.json";

export default function EmissionFrequency() {
    const { openModal } = useFormModal();
    const { fields } = formContent.method22Section;
    return (
      <div className="px-4 lg:px-14">
        <div className="grid grid-cols-2 border border-gray-300">
          {/* Left Column - Logo Section */}
          <div className="flex flex-col items-center justify-center p-6">
            {/* Logo Container */}
            <div className="relative w-48">
              <div className="overflow-hidden rounded-lg bg-[#40E0D0] p-4">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-white">OPAC TOOL</h2>
                  <p className="text-sm text-white">OPACITY ASSESSMENT SYSTEM</p>
                </div>
              </div>
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
          <div className="border-l border-gray-300">
            {/* Emission Frequency */}
            <div className="grid grid-cols-2 border-b border-gray-300">
              <div className="bg-gray-900 p-3">
                <h3 className="text-sm font-medium text-white">Emission Frequency</h3>
                <p className="mt-1 text-xs text-gray-300">(Total Emission Duration/Total Observation Duration) x 100%</p>
              </div>
              <div className="border-l border-gray-300"></div>
            </div>
  
            {/* Observer Name */}
            <div className="border-b border-gray-300 p-3">
              <div className="text-sm italic text-gray-600">Observer Name</div>
            </div>
  
            {/* Observer Signature */}
            <div className="border-b border-gray-300 p-3">
              <div className="text-sm italic text-gray-600">Observer Signature</div>
            </div>
  
            {/* Company/Organization */}
            <div className="p-3">
              <div className="text-sm italic text-gray-600">Company/Organization</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  