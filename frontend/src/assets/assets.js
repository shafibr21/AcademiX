import logo from "./logo.png";
import bin_icon from "./bin_icon.png";
import cross_icon from "./cross_icon.png";
import profile_icon from "./profile_icon.png";
import search_icon from "./search_icon.png";

export const assets = {
  logo,
  profile_icon,
  cross_icon,
  search_icon,
  bin_icon,
};

export const faculty = [
  {
    id: 1,
    name: "Dr. Ayesha Rahman",
    fieldOfInterest: ["Artificial Intelligence", "Natural Language Processing"],
    pastReleases: [
      {
        title: "Semantic Analysis in Multilingual Chatbots",
        publication: "Journal of AI Research",
        year: 2021,
      },
      {
        title: "Optimizing Neural Networks for Text Classification",
        publication: "ACM Transactions on AI",
        year: 2019,
      },
    ],
    currentWork:
      "Developing a sentiment analysis model for analyzing public opinion on climate change using large-scale social media data.",
  },
  {
    id: 2,
    name: "Prof. Rajesh Kumar",
    fieldOfInterest: ["Cybersecurity", "Blockchain Technology"],
    pastReleases: [
      {
        title: "Decentralized Identity Management Systems using Blockchain",
        publication: "IEEE Transactions on Security",
        year: 2020,
      },
      {
        title: "Ransomware Attack Mitigation Techniques",
        publication: "Cyber Defense Journal",
        year: 2018,
      },
    ],
    currentWork: "Designing a blockchain-based secure voting system.",
  },
  {
    id: 3,
    name: "Dr. Sofia Leclerc",
    fieldOfInterest: ["Data Science", "Predictive Analytics"],
    pastReleases: [
      {
        title: "Predictive Analytics in Healthcare Systems",
        publication: "International Journal of Data Science",
        year: 2022,
      },
      {
        title: "Data-Driven Insights for Financial Risk Management",
        publication: "Financial Analytics Quarterly",
        year: 2020,
      },
    ],
    currentWork:
      "Creating predictive models for patient readmission rates in hospitals using real-time data.",
  },
  {
    id: 4,
    name: "Dr. Omar Farooq",
    fieldOfInterest: ["Robotics", "Autonomous Systems"],
    pastReleases: [
      {
        title: "Pathfinding Algorithms for Swarm Robotics",
        publication: "Journal of Robotics Research",
        year: 2021,
      },
      {
        title: "AI-Driven Navigation in Unstructured Environments",
        publication: "Autonomous Systems Review",
        year: 2019,
      },
    ],
    currentWork:
      "Developing AI-driven algorithms for autonomous drone navigation in disaster response scenarios.",
  },
  {
    id: 5,
    name: "Dr. Emily Harper",
    fieldOfInterest: ["Environmental Engineering", "Sustainable Technology"],
    pastReleases: [
      {
        title: "Bio-inspired Solutions for Water Filtration",
        publication: "Environmental Science Letters",
        year: 2022,
      },
      {
        title: "Renewable Energy Solutions for Urban Areas",
        publication: "Green Tech Journal",
        year: 2020,
      },
    ],
    currentWork:
      "Designing low-cost water filtration systems for rural communities using bio-inspired materials.",
  },
  {
    id: 6,
    name: "Dr. Jason Lee",
    fieldOfInterest: ["Quantum Computing", "Cryptography"],
    pastReleases: [
      {
        title: "Quantum Key Distribution Techniques",
        publication: "Quantum Computing Journal",
        year: 2021,
      },
      {
        title: "Breaking Classical Encryption with Quantum Algorithms",
        publication: "Cybersecurity Research",
        year: 2018,
      },
    ],
    currentWork: "Building quantum-resistant cryptographic algorithms.",
  },
  {
    id: 7,
    name: "Dr. Maria Gonzalez",
    fieldOfInterest: ["Machine Learning", "Computer Vision"],
    pastReleases: [
      {
        title: "Deep Learning for Medical Image Analysis",
        publication: "Journal of Medical Imaging",
        year: 2021,
      },
      {
        title: "Object Detection in Crowded Scenes",
        publication: "IEEE Transactions on Computer Vision",
        year: 2020,
      },
    ],
    currentWork:
      "Developing AI-powered tools for early detection of rare diseases.",
  },
  {
    id: 8,
    name: "Prof. Alan Chen",
    fieldOfInterest: ["Human-Computer Interaction", "UX Design"],
    pastReleases: [
      {
        title: "Enhancing User Experience in AR Applications",
        publication: "Journal of HCI Research",
        year: 2020,
      },
      {
        title: "Designing Accessible Interfaces for the Elderly",
        publication: "Universal Design Quarterly",
        year: 2019,
      },
    ],
    currentWork: "Studying the effects of VR environments on user cognition.",
  },
  {
    id: 9,
    name: "Dr. Helena Carter",
    fieldOfInterest: ["Renewable Energy", "Energy Policy"],
    pastReleases: [
      {
        title: "Solar Energy Integration in Smart Grids",
        publication: "Journal of Sustainable Energy",
        year: 2022,
      },
      {
        title: "Impact of Energy Policy on Renewable Adoption",
        publication: "Energy Policy Review",
        year: 2020,
      },
    ],
    currentWork:
      "Analyzing the economic impacts of green energy adoption in developing countries.",
  },
  {
    id: 10,
    name: "Dr. Vikram Mehta",
    fieldOfInterest: ["Bioinformatics", "Genomics"],
    pastReleases: [
      {
        title: "AI-Driven Gene Sequencing Techniques",
        publication: "Bioinformatics Today",
        year: 2021,
      },
      {
        title: "Comparative Genomics of Pathogenic Bacteria",
        publication: "Genome Research Journal",
        year: 2018,
      },
    ],
    currentWork:
      "Researching gene editing techniques for combating hereditary diseases.",
  },
  {
    id: 11,
    name: "Dr. Noor Hasan",
    fieldOfInterest: ["Software Engineering", "Agile Methodologies"],
    pastReleases: [
      {
        title: "Improving Team Productivity in Agile Frameworks",
        publication: "Software Engineering Journal",
        year: 2021,
      },
      {
        title: "Automated Code Review Tools for Large Teams",
        publication: "ACM Software Quarterly",
        year: 2019,
      },
    ],
    currentWork:
      "Developing scalable software solutions for distributed systems.",
  },
  {
    id: 12,
    name: "Dr. Priya Shah",
    fieldOfInterest: ["Educational Technology", "E-Learning Systems"],
    pastReleases: [
      {
        title: "Gamification in Online Learning Platforms",
        publication: "EdTech Insights",
        year: 2022,
      },
      {
        title: "AI-Powered Personalization in E-Learning",
        publication: "Journal of Online Education",
        year: 2020,
      },
    ],
    currentWork:
      "Designing interactive educational platforms for underserved communities.",
  },
  {
    id: 13,
    name: "Dr. Robert Thompson",
    fieldOfInterest: ["Aerospace Engineering", "Propulsion Systems"],
    pastReleases: [
      {
        title: "Optimization of Hybrid Rocket Engines",
        publication: "Aerospace Research Journal",
        year: 2020,
      },
      {
        title: "Aerodynamic Analysis of Supersonic Jets",
        publication: "Flight Mechanics Quarterly",
        year: 2018,
      },
    ],
    currentWork:
      "Creating fuel-efficient propulsion systems for reusable spacecraft.",
  },
  {
    id: 14,
    name: "Dr. Elena Markov",
    fieldOfInterest: ["Environmental Policy", "Urban Planning"],
    pastReleases: [
      {
        title: "Green Spaces in Urban Environments",
        publication: "Journal of Environmental Policy",
        year: 2021,
      },
      {
        title: "Sustainable Urbanization Strategies",
        publication: "City Planning Review",
        year: 2020,
      },
    ],
    currentWork: "Drafting policy frameworks for sustainable urban growth.",
  },
  {
    id: 15,
    name: "Prof. Ahmed Al-Mutairi",
    fieldOfInterest: ["Cultural Studies", "Digital Humanities"],
    pastReleases: [
      {
        title: "Digital Preservation of Ancient Manuscripts",
        publication: "Cultural Heritage Review",
        year: 2022,
      },
      {
        title: "Impact of Technology on Cultural Practices",
        publication: "Journal of Digital Humanities",
        year: 2019,
      },
    ],
    currentWork: "Exploring AI applications in cultural artifact restoration.",
  },
  {
    id: 16,
    name: "Dr. Chloe Simmons",
    fieldOfInterest: ["Marine Biology", "Climate Change"],
    pastReleases: [
      {
        title: "Coral Reef Degradation Due to Rising Sea Temperatures",
        publication: "Marine Ecosystems Journal",
        year: 2021,
      },
      {
        title: "Biodiversity Analysis in Coastal Waters",
        publication: "Journal of Marine Science",
        year: 2019,
      },
    ],
    currentWork:
      "Monitoring the effects of microplastics on marine ecosystems.",
  },
  {
    id: 17,
    name: "Dr. Michael Harris",
    fieldOfInterest: ["Psychology", "Behavioral Science"],
    pastReleases: [
      {
        title: "Cognitive Patterns in Decision Making",
        publication: "Psychology Today",
        year: 2021,
      },
      {
        title: "Impact of Social Media on Youth Behavior",
        publication: "Behavioral Insights Journal",
        year: 2020,
      },
    ],
    currentWork: "Studying the psychological impacts of remote work culture.",
  },
  {
    id: 18,
    name: "Dr. Laura Bennett",
    fieldOfInterest: ["Pharmaceutical Science", "Biotechnology"],
    pastReleases: [
      {
        title: "Advances in Targeted Drug Delivery Systems",
        publication: "Journal of Pharmaceutical Research",
        year: 2021,
      },
      {
        title: "CRISPR-Cas9 Applications in Gene Therapy",
        publication: "Biotech Innovations",
        year: 2019,
      },
    ],
    currentWork:
      "Creating nanotechnology-based drug delivery methods for cancer treatment.",
  },
];
