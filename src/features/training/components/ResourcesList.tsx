import { Resource, resources } from "../data/resources";
import { getLectureMediaUrl } from "../lib/getLectureMedia";

export default function ResourcesList() {
  // const handleThumbnailClick = (pdfUrl: string) => {
  //   window.open(pdfUrl, "_blank", "noopener,noreferrer")
  // }

  const handleThumbnailClick = (resource: Resource) => {
    if (resource.fileType === "pdf") {
      window.open(getLectureMediaUrl(resource.fileUrl), "_blank", "noopener,noreferrer");
    } else if (resource.fileType === "excel") {
      const link = document.createElement("a");
      link.href = getLectureMediaUrl(resource.fileUrl);
      link.download = `${resource.title}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="px-4 py-8  lg:px-14">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Resources & Downloads for Visible Emissions Observations
        </h2>
      </div>
      <p className="text-lg text-zinc-900 mb-4">
        The forms and calculator below can be downloaded for student use.
      </p>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="group flex items-start gap-4  border-t border-gray-800 p-4 transition-colors hover:bg-gray-50"
          >
            <button
              onClick={() => handleThumbnailClick(resource)}
              className="relative h-[100px] w-[80px] flex-shrink-0 overflow-hidden rounded border border-gray-200 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Open ${resource.title} PDF`}
            >
              <img
                src={
                  getLectureMediaUrl(resource.thumbnail) ||
                  "module-10/download.svg"
                }
                alt={resource.title}
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/5">
                <div className="hidden h-full w-full items-center justify-center bg-gray-300/80 group-hover:flex">
                  <img
                    src={getLectureMediaUrl("module-10/download.svg")}
                    alt="Download"
                    className="h-6 w-6 text-transparent transition-colors"
                  />
                </div>

                {/* <Download className="h-6 w-6 text-transparent transition-colors group-hover:text-gray-700" /> */}
              </div>
            </button>
            <div className="flex-1">
              <h3 className="font-bold text-2xl text-[#ff6b6b]">{resource.title}</h3>
              <p className="mt-1 text-lg text-gray-600">
                {resource.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
