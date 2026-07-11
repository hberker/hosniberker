export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** key into the ProjectThumb SVG set */
  thumb: 'wispr' | 'guitar' | 'search' | 'os' | 'quantum' | 'cnote';
  url?: string;
}

export const projects: Project[] = [
  {
    title: 'WisprFree',
    description:
      'A privacy-first voice-dictation tool that runs entirely offline — Whisper transcription cleaned up by a local LLM, with a personal dictionary, per-app tone profiles, and LoRA fine-tuning on your own corrections.',
    tags: ['Python', 'Whisper', 'Local LLMs', 'Electron'],
    thumb: 'wispr',
    url: 'https://github.com/hberker/WisprFree',
  },
  {
    title: 'Guitar Trainer',
    description:
      'A dependency-free fretboard trainer that listens through the mic: autocorrelation pitch detection accurate to ~1 cent, a Karplus-Strong synth, and six practice modes with rhythm scoring.',
    tags: ['JavaScript', 'Web Audio', 'DSP'],
    thumb: 'guitar',
    url: 'https://github.com/hberker/guitar-app',
  },
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
    tags: ['Unity', 'C#', 'AR'],
    thumb: 'cnote',
    url: 'https://github.com/Jableman19/CNote',
  },
];
