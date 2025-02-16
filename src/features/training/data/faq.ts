interface FAQCategory {
  title: string;
  id: string;
  questions: {
    id: number;
    question: string;
    answer: string;
  }[];
}

export const faqData: FAQCategory[] = [
  {
    id: 'category-1',
    title: "Certification Test Questions",
    questions: [
      {
        id: 1,
        question: "How do you pass the visual test?",
        answer:
          "In order to pass the visual test, your final deviation for each smoke color must be 37 or less. Additionally, you must not miss any single reading by 20% or more. Most students fail the test by missing a single reading by 20% or more.",
      },
      {
        id: 2,
        question: "How long does the visual test take?",
        answer:
          "It depends on how many test runs you need to successfully pass the test. The visual test with a VR system is usually quicker than an in-person field test. A visual test run using VR can be completed in as little as 30 minutes. A visual test run at an in-person smoke school usually takes 1.5 hours.",
      },
      {
        id: 3,
        question: "What is the process during the certification test?",
        answer:
          "Standard values are first demonstrated to give you a visual reference for known opacity values. After the standard values are completed, practice tests are provided to determine if you are reading high or low relative to the actual opacity value. After the practice test is completed, the certification test is given for white or black smoke. The certification test consists of 25 random opacity values. After the certification test is completed for the first smoke color, the process repeats for the other smoke color. A total of 50 (25 black and 25 white) observations will be made during the test.",
      },
      {
        id: 4,
        question: "What happens if I fail the test?",
        answer:
          "With most VR systems, you can retake the test until successful completion. If you are attending an in-person visual test, the provider will usually continue to provide test runs until everyone passes or light conditions no longer allow testing.",
      },
    ],
  },
  {
    id: 'category-2',
    title: "Certification Requirement Questions",
    questions: [
      {
        id: 5,
        question: "How long is EPA Method 9 certification valid?",
        answer:
          "Six months. The duration is established at the Federal level - states can make the duration shorter but not longer. All states have adopted the 6 month duration.",
      },
      {
        id: 6,
        question:
          "Are EPA Method 9 certification requirements the same for each state?",
        answer:
          "No. Most states have the same conditions for certification. However, there are a few exceptions.\n\n • Iowa - Requires passing the visual test and observing at least 500 smoke values before certification.\n\n • Texas - A full test run must be completed before taking the certification test. \n\n • Florida - Requires completion of the lecture at least once every 3 years even if you are certifying in-person.\n\nIf you work for a regulatory agency, your agency may also have additional requirements which do not apply to the private sector. ",
      },
      {
        id: 7,
        question: "Is completion of the lecture required?",
        answer:
          "For In-Person smoke school: Not at the federal level. The text of EPA Method 9 recommends completion of a lecture but does not require it. Florida and Texas require the lecture to be completed at least once every 3 years.  We strongly recommend completing the lecture every 3 years to refresh your observation and documentation skills. For Virtual Reality smoke school:  Yes, the lecture is required for initial certification and every 3 years as a refresher.  ",
      },
      {
        id: 8,
        question: "Is my certification valid in another state?",
        answer:
          "Most states honor smoke school certifications that were earned in other states.  However,  it is good practice to check with the governing state regulatory agency before making observations in another state.",
      },
    ],
  },
  {
    id: 'category-3',
    title: "Observation Questions",
    questions: [
      {
        id: 9,
        question: "What is the duration of a visible emissions test?",
        answer:
          "EPA Method 9 and its alternatives do not set the duration of the test. The duration is established by the regulation affecting the source and is usually found in the facility air permit.",
      },
      {
        id: 10,
        question:
          "How often do I need to perform a visible emissions test at my facility?",
        answer:
          "The frequency is not set by EPA Method 9 or its alternative methods. The frequency is established by the regulation affecting the source and is usually found in the facility air permit. For regulatory agents, the visible emissions test may be conducted as part of a site visit or if the source appears to have excessive emissions.",
      },
      {
        id: 11,
        question: "What is the opacity limit of the source to be tested?",
        answer:
          "EPA Method 9 and its alternatives do not establish opacity limits - they establish the method to determine the opacity. The opacity limit of a source is established by the regulation affecting the source and is usually recorded in the facility air permit.",
      },
      {
        id: 12,
        question: "What happens if my observations show a facility is out of compliance?",
        answer:
          "Notify the plant manager so the process resulting in the emissions can be shut down or fixed. After the process is corrected, retest the source to verify compliance.",
      },
    ],
  },
];
