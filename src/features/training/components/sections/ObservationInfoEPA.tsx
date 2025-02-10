import { useFormModal } from "../../context/FormModalContext";
import formContent from "../../data/content/module-7/form-content.json";

export default function ObservationInfoEPA() {
  const { openModal } = useFormModal();
  const { fields } = formContent.method22Section;
  return (
    <div className="px-4  lg:px-14">
      <div className="border border-black">
        {/* Header */}
        <div className="grid grid-cols-6">
          <div className="col-span-5 bg-gray-900 p-3">
            <h2 className="text-lg font-bold text-white">OBSERVATION INFO</h2>
          </div>
          <div className="border-l border-black p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observation_test_date)}>
            <div className="text-sm italic text-gray-600">Test Date</div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 border-t border-black bg-[#E4EAED]">
          <div className="col-span-3 p-3">
            <div className="text-sm font-medium">Location</div>
          </div>
          <div className="col-span-3 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.clock_time)}>
            <div className="text-sm font-medium">Clock Time</div>
          </div>
          <div className="col-span-3 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observation_duration_column)}>
            <div className="text-center text-sm font-medium">
              Observation Duration
              <div className="text-xs">(min:sec)</div>
            </div>
          </div>
          <div className="col-span-3 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.emission_duration_column)}>
            <div className="text-center text-sm font-medium">
              Emission Duration
              <div className="text-xs">(min:sec)</div>
            </div>
          </div>
        </div>

        {/* Table Rows */}

        <div  className="grid grid-cols-12 ">
          <div className="col-span-3 border-r border-black bg-[#E4EAED] p-3">
            <div className="text-sm">Location 1 - Start</div>
          </div>
          <div className="col-span-3 border-r border-black bg-gray-50 p-3 border-t cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.clock_time)}></div>
          <div className="col-span-3 b bg-[#E4EAED] p-3"></div>
          <div className="col-span-3 bg-[#E4EAED] p-3"></div>
        </div>

        <div  className="grid grid-cols-12 ">
          <div className="col-span-3 border-r border-black bg-[#E4EAED] p-3">
            <div className="text-sm">Location 1 - Stop</div>
          </div>
          <div className="col-span-3 border-r border-t  border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.clock_time)}></div>
          <div className="col-span-3 border-r border-t border-b border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observation_duration_column)}></div>
          <div className="col-span-3 border-t border-b border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.emission_duration_column)}></div>
        </div>

        <div  className="grid grid-cols-12 ">
          <div className="col-span-3 border-r border-black bg-[#E4EAED] p-3">
            <div className="text-sm">Location 2 - Start</div>
          </div>
          <div className="col-span-3 border-r border-black bg-gray-50 p-3 border-t cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.clock_time)}></div>
          <div className="col-span-3  bg-[#E4EAED] p-3"></div>
          <div className="col-span-3 bg-[#E4EAED] p-3"></div>
        </div>

        <div  className="grid grid-cols-12 ">
          <div className="col-span-3 border-r border-black bg-[#E4EAED] p-3">
            <div className="text-sm">Location 2 - Stop</div>
          </div>
          <div className="col-span-3 border-r border-t  border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.clock_time)}></div>
          <div className="col-span-3 border-r border-t border-b border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observation_duration_column)}></div>
          <div className="col-span-3 border-t border-b border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.emission_duration_column)}></div>
        </div>

        <div  className="grid grid-cols-12 ">
          <div className="col-span-3 border-r border-black bg-[#E4EAED] p-3">
            <div className="text-sm">Location 3 - Start</div>
          </div>
          <div className="col-span-3 border-r border-black bg-gray-50 p-3 border-t cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.clock_time)}></div>
          <div className="col-span-3 b bg-[#E4EAED] p-3"></div>
          <div className="col-span-3 bg-[#E4EAED] p-3"></div>
        </div>

        <div  className="grid grid-cols-12 ">
          <div className="col-span-3 border-r border-black bg-[#E4EAED] p-3">
            <div className="text-sm">Location 3 - Stop</div>
          </div>
          <div className="col-span-3 border-r border-t border-b border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.clock_time)}></div>
          <div className="col-span-3 border-r border-t border-b border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observation_duration_column)}></div>
          <div className="col-span-3 border-t border-b border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.emission_duration_column)}></div>
        </div>

        {/* Total Row */}
        <div className="grid grid-cols-12">
          <div className="col-span-3 p-3 bg-[#E4EAED]">
            <div className="text-sm font-medium"></div>
          </div>
          <div className="col-span-3 border-r border-black bg-[#E4EAED] p-3 text-right">Total</div>
          <div className="col-span-3 border-r border-black bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.observation_duration_total)}></div>
          <div className="col-span-3 bg-gray-50 p-3 cursor-pointer hover:bg-gray-100" onClick={() => openModal(fields.emission_duration_total)}></div>
        </div>
      </div>
    </div>
  );
}
