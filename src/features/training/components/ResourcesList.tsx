import { resources } from "../data/resources"

export default function ResourcesList() {
    const handleThumbnailClick = (pdfUrl: string) => {
      window.open(pdfUrl, "_blank", "noopener,noreferrer")
    }
  
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Resources & Downloads for Visible Emissions Observations</h2>

        </div>
  
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="group flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
            >
              <button
                onClick={() => handleThumbnailClick(resource.pdfUrl)}
                className="relative h-[100px] w-[80px] flex-shrink-0 overflow-hidden rounded border border-gray-200 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Open ${resource.title} PDF`}
              >
                <img
                  src={resource.thumbnail || "/placeholder.svg"}
                  alt={resource.title}
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/5">
                  {/* <Download className="h-6 w-6 text-transparent transition-colors group-hover:text-gray-700" /> */}
                </div>
              </button>
              <div className="flex-1">
                <h3 className="text-[#ff6b6b] font-medium">{resource.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }