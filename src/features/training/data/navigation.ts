export interface Module {
  id: number;
  title: string;
  slug: string;
  lectures: {
    title: string;
    slug: string;
  }[];
}

export const navigationData: Module[] = [
  {
    id: 1,
    title: "Introduction",
    slug: "introduction",
    lectures: [
      { title: "About this Course", slug: "about-course" },
      { title: "Visible Emissions & Opacity", slug: "visible-emissions-opacity" },
      { title: "Smoke School", slug: "smoke-school" },
      { title: "Importance of VE Observations", slug: "ve-observations-importance" },
      { title: "Module 1 Quiz", slug: "module-1-quiz" },
    ],
  },
  {
    id: 2,
    title: "Emission Types & Controls",
    slug: "emission-types-controls",
    lectures: [
      { title: "Air Emission Types", slug: "air-emission-types" },
      { title: "Plume Shapes", slug: "plume-shapes" },
      { title: "Particulate Matter", slug: "particulate-matter" },
      { title: "Particle Types", slug: "particle-types" },
      { title: "Particles & Light", slug: "particles-and-light" },
      { title: "Emission Controls", slug: "emission-controls" },
      { title: "Module 2 Quiz", slug: "module-2-quiz" },
    ],
  },
  {
    id: 3,
    title: "Method 9 Observation Procedures",
    slug: "method-9-observation-procedures",
    lectures: [
      { title: "Method 9 Basics", slug: "method-9-basics" },
      { title: "Sun Position", slug: "sun-position" },
      { title: "Viewing Angle & Distance", slug: "viewing-angle-distance" },
      { title: "Contrasting Background", slug: "contrasting-background" },
      { title: "Atmospheric Conditions", slug: "atmospheric-conditions" },
      { title: "Steam Plumes", slug: "steam-plumes" },
      { title: "Fugitive Emissions", slug: "fugitive-emissions" },
      { title: "Equipment Needed", slug: "equipment-needed" },
      { title: "Module 3 Quiz", slug: "module-3-quiz" },
    ],
  },
  {
    id: 4,
    title: "Method 9 Documentation Procedures",
    slug: "method-9-documentation-procedures",
    lectures: [
      { title: "Documentation Procedure", slug: "documentation-procedure" },
      { title: "Calculating Average Opacity", slug: "calculating-average-opacity" },
      { title: "Auditing the Form", slug: "auditing-form" },
      { title: "Legal Aspects", slug: "legal-aspects" },
      { title: "Module 4 Quiz", slug: "module-4-quiz" },
    ],
  },
  {
    id: 5,
    title: "Special Observation Situations",
    slug: "special-observation-situations",
    lectures: [
      { title: "Rectangular Emission Points", slug: "rectangular-emission-points" },
      { title: "Multiple Sources", slug: "multiple-sources" },
      { title: "Intermittent Emissions", slug: "intermittent-emissions" },
      { title: "Tall Stacks & Viewing Angles", slug: "tall-stacks-viewing-angles" },
      { title: "Predicting Steam Plumes", slug: "predicting-steam-plumes" },
      { title: "Reacting Plumes", slug: "reacting-plumes" },
      { title: "Night Observations", slug: "night-observations" },
      { title: "Module 5 Quiz", slug: "module-5-quiz" },
    ],
  },
  {
    id: 6,
    title: "Alternative Test Methods",
    slug: "alternative-test-methods",
    lectures: [
      { title: "What is an Alternative Test Method?", slug: "alternative-test-method-intro" },
      { title: "EPA Methods 203a, b & c", slug: "epa-methods-203" },
      { title: "EPA ALT-082", slug: "epa-alt-082" },
      { title: "EPA ALT-152", slug: "epa-alt-152" },
      { title: "Module 6 Quiz", slug: "module-6-quiz" },
    ],
  },
  {
    id: 7,
    title: "EPA Method 22",
    slug: "epa-method-22",
    lectures: [
      { title: "What is EPA Method 22?", slug: "method-22-intro" },
      { title: "Observation Procedure", slug: "method-22-observation" },
      { title: "Documentation Procedure", slug: "method-22-documentation" },
      { title: "Equipment Needed", slug: "method-22-equipment" },
      { title: "Module 7 Quiz", slug: "module-7-quiz" },
    ],
  }
];
