import { getExpandedModuleId } from "./getExpandedModuleId.helper";
import { navigationData } from "@/features/training/data/navigation";

describe("getExpandedModuleId", () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      },
    };
  })();

  // Replace the real localStorage with our mock
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  it("should return 1 when no bookmark exists", () => {
    expect(getExpandedModuleId()).toBe(1);
  });

  it("should return correct module ID for a bookmarked lecture", () => {
    // Set a bookmark for a lecture in module 2
    const moduleSlug = navigationData[1].slug; // Second module
    const lectureSlug = navigationData[1].lectures[0].slug; // First lecture of second module
    localStorageMock.setItem(
      'lastVisitedLecture', 
      `/training/${moduleSlug}/${lectureSlug}`
    );

    expect(getExpandedModuleId()).toBe(2);
  });

  it("should return 1 if bookmarked lecture path is invalid", () => {
    localStorageMock.setItem('lastVisitedLecture', '/training/invalid/path');
    expect(getExpandedModuleId()).toBe(1);
  });

  it("should return 1 if localStorage is empty", () => {
    localStorageMock.clear();
    expect(getExpandedModuleId()).toBe(1);
  });
}); 