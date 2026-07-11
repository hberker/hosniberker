export interface Experience {
  meta: string;
  title: string;
  org: string;
  url?: string;
  description: string;
  tags: string[];
}

export const experience: Experience[] = [
  {
    meta: '2023 — Present',
    title: 'Senior Software Engineer',
    org: 'Bloomberg',
    url: 'https://www.bloomberg.com/company/',
    description:
      'Work on AI surveillance — training, fine-tuning, and deploying models that detect trader abuse such as insider trading, excessive gifting, and collusion, along with the annotation pipelines, deattribution, and evaluation datasets behind them. Spent the first years here on the C++ snapshot systems behind derivatives pricing, including a 90% response-time cut on a service handling 2.6M requests a day.',
    tags: ['Python', 'Fine-tuning', 'Human-in-the-loop', 'Evals', 'C++'],
  },
  {
    meta: 'Summer 2022',
    title: 'Software Engineer Intern',
    org: 'Google',
    url: 'https://www.google.com/photos/about/',
    description:
      'Shipped image-editing features for the new Google Photos collage editor, integrating a facial-detection ML service into the post-editing workflow of a product with over a billion users. Wrote the design docs and drove the implementation reviews with engineers and PMs across Photos.',
    tags: ['Image editing', 'ML integration', 'Design docs'],
  },
  {
    meta: '2020 — 2022',
    title: 'Software Engineer Intern',
    org: 'TechSmith',
    url: 'https://www.techsmith.com/camtasia/',
    description:
      'Across part-time and full-time rotations, delivered 25+ features for the Camtasia video editor on Windows — including an accessibility mode enabling users with limited mouse use to navigate the app, and end-to-end video processing tools serving 70M+ users.',
    tags: ['C#', 'C++', 'XAML', 'Accessibility'],
  },
  {
    meta: 'Summer 2021',
    title: 'Software Engineer Intern',
    org: 'Vectorworks',
    url: 'https://www.vectorworks.net',
    description:
      'Built Python tools for processing localization text and merging relational datasets, working directly with a director to improve internal data workflows.',
    tags: ['Python', 'Data tooling'],
  },
  {
    meta: '2019 — 2020',
    title: 'Software Engineering Intern',
    org: 'Fraunhofer USA',
    url: 'https://www.fraunhofer.org',
    description:
      'Programmed and tested a Raspberry Pi tool that monitored temperature during diamond-creation experiments, converting analog sensor readings through an ADC for logging and analysis.',
    tags: ['Python', 'Raspberry Pi', 'Sensors'],
  },
];

export const education = {
  meta: '2023',
  title: 'BSE, Computer Science',
  org: 'University of Michigan',
  url: 'https://cse.engin.umich.edu',
  description:
    'Magna cum laude. Coursework in advanced operating systems, computer vision, computer networks, and quantum computing.',
} as const;
