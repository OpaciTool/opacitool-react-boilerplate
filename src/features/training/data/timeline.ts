export interface TimelineEventInterface {
  year: string;
  title: string;
  description: string;
  image: string;
}

export const events: TimelineEventInterface[] = [
  {
    year: "1881",
    title: "Chicago Smoke Ordinance",
    description:
      'The rise of industrialization and its associated air pollution significantly impacted the quality of life for Chicago residents. In response, the Chicago City Council enacted the first U.S. smoke ordinance to include a penalty clause. The ordinance classified dense smoke from sources other than private residences as a nuisance. However, the key challenge lay in defining what constituted "dense smoke."',
    image: "module-8/1.jpg",
  },
  {
    year: "1899",
    title: "Ringelmann Cards",
    description:
      "Max Ringelmann developed a series of cards in the late 1890s to increase the efficiency of coal-fired boilers. Six cards ranged from all white (Card 0) to all black (Card 5). The rest of the cards consisted of black lines creating squares. As the card number increases, the line thickness increases and creates the appearance of a darker shade of grey. The cards were used to visually compare with smoke from the coal-fired boiler and determine the operating efficiency. But they ended up having unintended uses.\n\nIn 1899, the Ringelmann Charts were adopted as a standard measure of smoke density by the American Society of Mechanical Engineers. Ordinances restricting “dense smoke” could now assign an opacity limit which could be measured with a Ringelmann Card.",
    image: "module-8/2.jpg",
  },
  {
    year: "1916",
    title: "Northwestern Laundry",
    description:
      "A smoke ordinance in Des Moines prohibited dense smoke from certain parts of the city. Northwestern Laundry argued the ordinance was void because it would require retrofitting their equipment at a great expense. The court upheld the ordinance even though Northwestern Laundry would be subjected to large expenses to comply.",
    image: "module-8/3.jpg",
  },
  {
    year: "1945",
    title: "Equivalent Opacity",
    description:
      "Ringelmann cards were originally designed to be used on coal-fired sources with black smoke. In 1945, the city of Los Angeles decided the Ringelmann cards could also be used to determine the “equivalent opacity” from sources producing white smoke.",
    image: "module-8/4.jpg",
  },
  {
    year: "1948",
    title: "Donora Smog",
    description:
      "Donora, Pennsylvania was a mill town of approximately 14,000 residents. On October 27, 1948, fog formed over the town. Hydrogen fluoride and sulfur dioxide from the town’s steel mills coupled with a temperature inversion created toxic air pollution which resulted in 20 deaths and nearly 7000 residents sickened.",
    image: "module-8/5.jpg",
  },
  {
    year: "1950",
    title: "California Rule 50A",
    description:
      "Rule 50A limited the density of smoke from stationary sources based on comparisons to the Ringelmann scale. Rule 50A would eventually be adopted by nearly every state and was one of the cornerstones for EPA Method 9.",
    image: "module-8/6.jpg",
  },
  {
    year: "1963",
    title: "Clean Air Act",
    description:
      "The Clean Air Act was the first federal legislation regarding air pollution control and was signed into law by President Lyndon Johnson. It established a federal program within the U.S. Public Health Service and authorized research into techniques for monitoring and controlling air pollution.",
    image: "module-8/7.jpg",
  },
  {
    year: "1970",
    title: "Clean Air Act Amendment",
    description:
      "The 1970 Clean Air Act amendment authorized the development of federal and state regulations to limit emissions from stationary and mobile sources. It was signed into law by President Richard Nixon. Four major regulatory programs were initiated; the National Ambient Air Quality Standards (NAAQS), State Implementation Plans (SIPs), New Source Performance Standards (NSPS) and National Emission Standards for Hazardous Air Pollutants (NESHAPs). The EPA was created to implement these programs.",
    image: "module-8/8.jpg",
  },
  {
    year: "1970",
    title: "EPA is Formed",
    description:
      "The Environmental Protection Agency was officially formed by President Richard Nixon and began operating on December 2, 1970. The ten designated EPA regions cover the entire U.S. and its protectorates.",
    image: "module-8/9.jpg",
  },
  {
    year: "1974",
    title: "EPA Method 9",
    description:
      "EPA Method 9 was promulgated in 1974 to determine the opacity of visible emissions without the use of a Ringelmann card. Instead of comparing smoke to a card, people were trained and tested to visually assess the opacity of smoke produced by a smoke generator. This test method provides a quick and effective way to monitor emissions and has resulted in a significant reduction in air pollution.",
    image: "module-8/10.jpg",
  },
  {
    year: "1982",
    title: "EPA Method 22",
    description:
      "EPA Method 22 was promulgated in 1982 and determines the presence of visible emissions instead of the opacity of visible emissions.",
    image: "module-8/11.jpg",
  },
  {
    year: "1990",
    title: "Clean Air Act Amendment",
    description:
      "The 1990 Clean Air Act Amendment was significant in its intent and effect.The amendment addressed acid rain, urban smog and the hole in the ozone layer. Since its inception, carbon monoxide pollution is down by 75%, sulfur dioxide is down by 80% and the hole in the ozone layer is the smallest it has been in over 20 years.",
    image: "module-8/12.jpg",
  },
];
