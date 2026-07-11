export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** key into the ProjectThumb SVG set */
  thumb: 'search' | 'os' | 'quantum' | 'cnote';
}

export const projects: Project[] = [
  {
    title: 'Distributed Search Engine',
    description:
      'A distributed Wikipedia search engine: crawling, document parsing, MapReduce-based inverted indexing, and PageRank ranking across 6M+ documents.',
    tags: ['Python', 'MapReduce', 'PageRank'],
    thumb: 'search',
  },
  {
    title: 'Operating System Libraries',
    description:
      'Core OS components engineered in C++ — a thread library, a virtual-memory pager, and a multithreaded network file system.',
    tags: ['C++', 'Concurrency', 'Virtual memory'],
    thumb: 'os',
  },
  {
    title: 'Quantum Constraint Solver',
    description:
      'Grover’s algorithm for Boolean satisfiability: classical SAT problems translated into quantum search circuits and run on IBM Quantum hardware.',
    tags: ['Python', 'Grover’s algorithm', 'IBM Quantum'],
    thumb: 'quantum',
  },
  {
    title: 'C-Note',
    description:
      'An augmented-reality app that teaches music students sound design through physical puzzle pieces — turning abstract audio concepts into hands-on play.',
    tags: ['AR', 'Audio', 'Education'],
    thumb: 'cnote',
  },
];
