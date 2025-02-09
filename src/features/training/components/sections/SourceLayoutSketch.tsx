import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-4/form-content.json";

export default function SourceLayoutSketch() {
  const { openModal } = useFormModal();
  const { fields } = formContent.sourceLayoutSection;

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="border border-gray-300">
        {/* Header */}
        <div className="bg-gray-900 p-2 font-semibold text-white">
          Source Layout Sketch
        </div>

        {/* Image Container */}
        <div 
          className="relative cursor-pointer"
          onClick={() => openModal(fields.sketch)}
        >
          <img 
            src="/images/training/module-4/lecture-1/27.png" 
            alt="Source Layout Sketch" 
            className="h-auto w-full hover:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
} 