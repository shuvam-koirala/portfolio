// All editable site text lives here. Change wording without touching components.

export const site = {
  name: 'Shuvam Koirala',
  role: 'Flutter developer',
  email: 'suvamkoirala08@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shuvam-koirala',
  github: 'https://github.com/shuvam-koirala',
  location: 'Based in Kathmandu, Nepal',
  timezone: 'UTC+5:45',
  overlap: 'Full working-day overlap with Europe and Asia, mornings with the US East Coast.',
  replyPromise: "Tell me about your project. I'll reply within 24 hours.",
  headline: { lead: 'I build mobile apps that ship and', highlight: 'stay working.' },
  intro:
    'Android & iOS apps with Flutter, from payments and APIs to clean architecture that keeps your app easy to grow.',
  description:
    'Shuvam Koirala is a freelance Flutter developer in Kathmandu building production Android & iOS apps, with payment gateway (eSewa, Khalti, ConnectIPS), API and SDK integration.',
  cta: 'Tell me about your app',
};

export const services: { title: string; body: string }[] = [
  {
    title: 'Complete Flutter apps',
    body: 'One codebase for Android and iOS, from first screen to store release, built to stay maintainable as your app grows.',
  },
  {
    title: 'Nepali payment integration',
    body: 'eSewa, Khalti, ConnectIPS and MyPay, all shipped in production apps. Ideal for local businesses and for companies launching in Nepal.',
  },
  {
    title: 'API & SDK integration',
    body: 'REST backends, Firebase push notifications, native device features, and reusable SDKs that other teams can plug into.',
  },
  {
    title: 'Fixing and improving existing apps',
    body: 'Performance problems, crashes in production, messy architecture: I find the cause and leave the code cleaner than I found it.',
  },
];

export const proofPoints: string[] = [
  '5+ years shipping production Flutter apps',
  'Apps used by 100+ schools and organisations, and by 20+ companies',
  'Designed an SDK that external vendor apps integrate with',
  'Led architecture and code review, and mentored junior developers',
  'Winner, Disaster category, Quantum Hack 2020',
];

export const experience: { role: string; company: string; period: string; summary: string }[] = [
  {
    role: 'Mobile Application Engineer (Flutter)',
    company: 'Diyalo Technologies',
    period: 'Dec 2023 – Present',
    summary:
      'Lead development of a production transportation and ticketing platform: own the architecture, designed a reusable SDK for external vendors, review code and mentor juniors.',
  },
  {
    role: 'Flutter Developer',
    company: 'Spell Innovation',
    period: 'Mar 2022 – Dec 2023',
    summary:
      'Built and maintained production apps in education, healthcare and communication, with ConnectIPS payments, Firebase push notifications and native device features.',
  },
  {
    role: 'Flutter Developer',
    company: 'Enspire Tech',
    period: 'Apr 2021 – Oct 2021',
    summary: 'Integrated Khalti payments and built features with GetX in a product team.',
  },
  {
    role: 'Flutter Developer Intern',
    company: 'PythonMate',
    period: 'Sep 2020 – Nov 2020',
    summary: 'Flutter development and REST API integration, including Khalti payments.',
  },
];

export const education = {
  degree: 'B.Sc. Computer Science & Information Technology',
  school: 'Amrit Science College, Tribhuvan University',
  year: '2023',
};

export const skills = {
  core: [
    'Dart',
    'Flutter',
    'BLoC / Cubit',
    'GetX',
    'Clean Architecture',
    'REST APIs',
    'Firebase',
    'Payment gateways',
    'Git',
    'CI/CD',
  ],
  supporting: ['Kotlin', 'Swift', 'Python', 'PHP'],
  growingInto: ['Backend', 'AI'],
};
