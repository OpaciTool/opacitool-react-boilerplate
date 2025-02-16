export default function Method9Comparison() {
  return (
    <div className="dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-4xl p-4">
        <div className="grid grid-cols-3 gap-1 bg-pink-100">
          {/* Header Row */}
          <div className="bg-[#FF9999] p-4"></div>
          <div className="bg-[#FF9999] p-4">
            <div className="text-center font-medium">EPA Method 9</div>
          </div>
          <div className="bg-[#FF9999] p-4">
            <div className="text-center font-medium">EPA Method 22</div>
          </div>

          {/* Averaging Period Row */}
          <div className="bg-[#FFCDCD] p-4">
            <div className="font-medium">Determines Frequency of Emissions</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">No</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Yes</div>
          </div>

          {/* Observation Interval Row */}
          <div className="bg-[#FFCDCD] p-4">
            <div className="font-medium">Determines Opacity of Emissions</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Yes</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">No</div>
          </div>

          {/* Test Form Row */}
          <div className="bg-[#FFCDCD] p-4">
            <div className="font-medium">Requires Certification</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Yes</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">No</div>
          </div>
        </div>
      </div>
    </div>
  );
}
