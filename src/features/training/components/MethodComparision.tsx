export default function MethodsComparison() {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Headline */}
        <h2 className="text-xl font-bold text-center mb-6">Comparison of Method 203-series and Method 9</h2>
  
        <div className="grid grid-cols-5 gap-1 bg-pink-100">
          {/* Header Row */}
          <div className="bg-[#FF9999] p-4"></div>
          <div className="bg-[#FF9999] p-4">
            <div className="text-center font-medium">Method 9</div>
          </div>
          <div className="bg-[#FF9999] p-4">
            <div className="text-center font-medium">Method 203a</div>
          </div>
          <div className="bg-[#FF9999] p-4">
            <div className="text-center font-medium">Method 203b</div>
          </div>
          <div className="bg-[#FF9999] p-4">
            <div className="text-center font-medium">Method 203c</div>
          </div>
  
          {/* Averaging Period Row */}
          <div className="bg-[#FFCDCD] p-4">
            <div className="font-medium">Averaging Period</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">6 minutes</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">2-6 minutes</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">None</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">1 minute</div>
          </div>
  
          {/* Observation Interval Row */}
          <div className="bg-[#FFCDCD] p-4">
            <div className="font-medium">Observation Interval</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">15 seconds</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">15 seconds</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">15 seconds</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">5 seconds</div>
          </div>
  
          {/* Test Form Row */}
          <div className="bg-[#FFCDCD] p-4">
            <div className="font-medium">Test Form</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Method 9 Form</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Method 9 Form</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Method 9 Form</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Method 203c Form</div>
          </div>
  
          {/* Certification Method Row */}
          <div className="bg-[#FFCDCD] p-4">
            <div className="font-medium">Certification Method</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Smoke School</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Smoke School</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Smoke School</div>
          </div>
          <div className="bg-[#FFE3E3] p-4">
            <div className="text-center">Smoke School</div>
          </div>
        </div>
      </div>
    )
  }
  
  