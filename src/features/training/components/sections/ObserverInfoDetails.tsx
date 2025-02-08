import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-4/form-content.json";

export default function ObserverInfoDetails() {
  const { openModal } = useFormModal();
  const { fields } = formContent.observerInfoSection;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="border border-black">
        {/* Statistics Row */}
        <div className="grid grid-cols-2 divide-x divide-black">
          <div 
            className="p-2 cursor-pointer hover:bg-gray-50"
            onClick={() => openModal(fields.averageOpacity)}
          >
            <div className="text-sm font-medium mb-2 ">Average Opacity for Highest Period</div>
          </div>
          <div 
            className="p-2 cursor-pointer hover:bg-gray-50"
            onClick={() => openModal(fields.readingsAbove)}
          >
            <div className="text-sm gap-1">
              <p>Number of Readings Above</p>
              <p className="mt-1">_________%Were_______</p>
            </div>
          </div>
        </div>

        {/* Observer Name */}
        <div 
          className="border-t border-black p-2 cursor-pointer hover:bg-gray-50"
          onClick={() => openModal(fields.observerNameAndSignature)}
        >
          <div className="text-sm font-medium mb-2">Name of Observer</div>
        </div>

        {/* Observer Signature */}
        <div 
          className="border-t border-black p-2 cursor-pointer hover:bg-gray-50"
          onClick={() => openModal(fields.observerNameAndSignature)}
        >
          <div className="text-sm font-medium mb-2">Signature of Observer</div>
        </div>

        {/* Company/Organization */}
        <div 
          className="border-t border-black p-2 cursor-pointer hover:bg-gray-50"
          onClick={() => openModal(fields.organization)}
        >
          <div className="text-sm font-medium mb-2">Company/Organization</div>
        </div>

        {/* Certification and Date */}
        <div 
          className="border-t border-black grid grid-cols-2 divide-x divide-black cursor-pointer hover:bg-gray-50"
          onClick={() => openModal(fields.certification)}
        >
          <div className="p-2">
            <div className="text-sm font-medium mb-2">Certification Issued By:</div>
          </div>
          <div className="p-2">
            <div className="text-sm font-medium mb-2">Date</div>
          </div>
        </div>

        {/* Comments */}
        <div 
          className="border-t border-black p-2 cursor-pointer hover:bg-gray-50"
          onClick={() => openModal(fields.comments)}
        >
          <div className="text-sm font-medium">Comments</div>
          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
}
  
  