import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createContext, useContext, useState } from "react";
import { getLectureMediaUrl } from "../lib/getLectureMedia";

interface ModalImage {
  url: string;
  alt: string;
  caption?: string;
  width?: string;
}

interface FieldInfo {
  title: string;
  content: string;
  images?: ModalImage[];
}

interface FormModalContextType {
  isOpen: boolean;
  fieldInfo: FieldInfo | null;
  openModal: (info: FieldInfo) => void;
  closeModal: () => void;
}

const FormModalContext = createContext<FormModalContextType | undefined>(
  undefined,
);

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldInfo, setFieldInfo] = useState<FieldInfo | null>(null);

  const openModal = (info: FieldInfo) => {
    setFieldInfo(info);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFieldInfo(null);
  };

  return (
    <FormModalContext.Provider
      value={{ isOpen, fieldInfo, openModal, closeModal }}
    >
      {children}
      {/* Modal Component */}
      {isOpen && fieldInfo && (
        <Dialog
          open={isOpen}
          onClose={closeModal}
          className="relative z-50 text-center"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-2xl rounded bg-white p-6">
              <div className="flex items-start justify-between">
                <h3 className="flex-grow text-center text-xl font-semibold text-gray-900">
                  {fieldInfo.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-gray-600">
                  {fieldInfo.content.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>

              {fieldInfo.images && (
                <div className="mt-6 space-y-4">
                  {fieldInfo.images.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <img
                        src={getLectureMediaUrl(image.url)}
                        alt={image.alt}
                        className="mx-auto rounded-lg"
                        style={{ width: image.width || "100%" }}
                      />
                      {image.caption && (
                        <p className="text-center text-sm text-gray-500">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const context = useContext(FormModalContext);
  if (context === undefined) {
    throw new Error("useFormModal must be used within a FormModalProvider");
  }
  return context;
}
