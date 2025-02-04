import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-4/form-content.json";

export default function ObservationPartOne() {
  const { openModal } = useFormModal();
  const { fields } = formContent.observerInfoSection;

  return (
    <>
      <h2 onClick={() => openModal(fields.general)} className="cursor-pointer hover:bg-gray-50 text-right text-xl font-medium">Form #_____ of ______</h2>

      <div className="pt-4">
        {" "}
        <div onClick={() => openModal(fields.observationDateAndTime)} className="cursor-pointer hover:bg-gray-50 grid grid-cols-6 divide-x divide-gray-300 border border-gray-300 p-2">
          <div
            className="col-span-2  pr-2 "
          >
            <div className="text-sm">Observation Date</div>
          </div>
          <div
            className="col-span-2  px-2 "
          >
            <div className="text-sm">Start Time</div>
          </div>
          <div
            className="col-span-2  pl-2"
          >
            <div className="text-sm">End time</div>
          </div>
        </div>
        <div onClick={() => openModal(fields.observations)} className="cursor-pointer hover:bg-gray-50">
          <div className="mx-auto w-full max-w-2xl">
            <div className="border border-gray-300">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="relative w-16 border border-gray-300 p-0">
                        <div className="relative h-12">
                          <div
                            className="absolute left-0 top-0 h-full w-full"
                            style={{
                              background:
                                "linear-gradient(to top right, transparent calc(50% - 1px), black, transparent calc(50% + 1px))",
                            }}
                          />
                          <div className="absolute bottom-1 left-1 text-sm">
                            MIN.
                          </div>
                          <div className="absolute right-1 top-1 text-sm">
                            SEC.
                          </div>
                        </div>
                      </th>
                      <th className="w-16 border border-gray-300 p-1">0</th>
                      <th className="w-16 border border-gray-300 p-1">15</th>
                      <th className="w-16 border border-gray-300 p-1">30</th>
                      <th className="w-16 border border-gray-300 p-1">45</th>
                      <th className="relative w-16 border border-gray-300 p-0">
                        <div className="relative h-12">
                          <div
                            className="absolute left-0 top-0 h-full w-full"
                            style={{
                              background:
                                "linear-gradient(to top right, transparent calc(50% - 1px), black, transparent calc(50% + 1px))",
                            }}
                          />
                          <div className="absolute bottom-1 left-1 text-sm">
                            SEC.
                          </div>
                          <div className="absolute right-1 top-1 text-sm">
                            MIN.
                          </div>
                        </div>
                      </th>
                      <th className="w-16 border border-gray-300 p-1">0</th>
                      <th className="w-16 border border-gray-300 p-1">15</th>
                      <th className="w-16 border border-gray-300 p-1">30</th>
                      <th className="w-16 border border-gray-300 p-1">45</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(30)].map((_, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-1 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 p-1"></td>
                        <td className="border border-gray-300 p-1"></td>
                        <td className="border border-gray-300 p-1"></td>
                        <td className="border border-gray-300 p-1"></td>
                        <td className="border border-gray-300 p-1 text-center">
                          {index + 31}
                        </td>
                        <td className="border border-gray-300 p-1"></td>
                        <td className="border border-gray-300 p-1"></td>
                        <td className="border border-gray-300 p-1"></td>
                        <td className="border border-gray-300 p-1"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
