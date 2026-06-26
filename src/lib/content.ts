// Static fallback/seed content. Used when DATABASE_URL isn't configured yet,
// and as the source for `npm run db:seed` once it is. Edit this file (or the
// Admin Dashboard once shipped) to update real campaign content.

export const candidate = {
  name: "Zephyr",
  position: "General Secretary",
  electionTag: "LSUG 2026",
  tagline: "Before You Vote, Verify.",
  subheadline:
    "Leadership is not about promises. It's about a proven record of service, accountability, and results.",
  roles: ["Sports Director", "Student Leader", "Advocate for Transparency"],
};

export const trustMetrics = [
  { key: "events_organized", label: "Events Organized", value: 24, suffix: "+" },
  { key: "students_impacted", label: "Students Impacted", value: 3200, suffix: "+" },
  { key: "funds_managed", label: "Funds Managed", value: 1800000, suffix: "₦" },
  { key: "years_of_service", label: "Years of Service", value: 3, suffix: "" },
  { key: "departments_engaged", label: "Departments Engaged", value: 11, suffix: "" },
];

export const trackRecord = [
  {
    category: "sports" as const,
    title: "Sports Leadership",
    description:
      "Organized and supervised inter-departmental sports competitions, coordinating logistics, officiating, and welfare for hundreds of student-athletes across two academic sessions.",
    stats: [
      { label: "Events involved", value: "4+" },
      // { label: "Athletes coordinated", value: "600+" },
      // { label: "Departments involved", value: "11" },
    ],
  },
  {
    category: "finance" as const,
    title: "Financial Accountability",
    description:
      "Supervised sports directorate funds with documented disbursement records and public reporting, setting a transparency standard for student-led budgets.",
    stats: [
      { label: "Funds supervised", value: "₦1.8M+" },
      { label: "Financial reports filed", value: "3" },
      // { label: "Audit queries raised against him", value: "0" },
    ],
  },
  {
    category: "student_service" as const,
    title: "Student Service",
    description:
      "Represented student concerns directly to faculty and union leadership, resolving recurring issues around facility access and event scheduling.",
    stats: [
      { label: "Issues resolved", value: "10+" },
      // { label: "Town halls attended", value: "12" },
      // { label: "Years in leadership", value: "3" },
    ],
  },
];

export const timeline = [
  { date: "2024", title: "Joined Depatmental Sports Committee", description: "Started as a fellow teammates for inter-departmental games." },
  { date: "2024", title: "Appointed Sports Director", description: "Took over full responsibility for fixtures, officiating, and athlete welfare." },
  { date: "2025", title: "Best Course Representative", description: "Recognized by departmental student leadership for organization and transparency." },
  { date: "2026", title: "LSUG General Secretary Candidate", description: "Running on a record students can verify, not just promises." },
];

export const visionPillars = [
  {
    title: "Organization",
    problem: "Union activities are often poorly scheduled, leading to clashes and low turnout.",
    solution: "A shared, published activity calendar maintained by the Secretariat with advance notice for all events.",
    outcome: "Higher attendance and fewer last-minute cancellations.",
  },
  {
    title: "Accessibility",
    problem: "Many students don't know how to reach union leadership or track ongoing initiatives.",
    solution: "A public, always-updated record of union activity and a direct channel for questions — like this site.",
    outcome: "Students can verify what's happening without needing insider access.",
  },
  {
    title: "Accountability",
    problem: "Funds and decisions are rarely explained to the students they affect.",
    solution: "Itemized reporting on every fund the Secretariat touches, published on a fixed schedule.",
    outcome: "A union leadership students can audit, not just trust.",
  },
  {
    title: "Transparency",
    problem: "Decisions are made and announced after the fact, with no visibility into the process.",
    solution: "Open minutes and a standing Q&A channel for students to ask before decisions are finalized.",
    outcome: "A Secretariat that explains itself before it's asked to.",
  },
];

export const testimonialsSeed = [
  {
    name: "Tunde Adebayo",
    roleLabel: "Athlete, Faculty of Engineering",
    quote:
      "Zephyr was the first sports director who actually published what was spent on our kits and transport. We saw the numbers ourselves.",
  },
  {
    name: "Fatima Bello",
    roleLabel: "Student Leader, SUG Faculty Rep",
    quote:
      "He shows up to the boring meetings, not just the events with cameras. That's the difference between a leader and a campaigner.",
  },
  {
    name: "Dr. K. Olawale",
    roleLabel: "Lecturer, Department of Mechanical Engineering",
    quote:
      "I've watched him coordinate department-wide events without a single complaint about missing funds. That track record speaks for itself.",
  },
];

// Default poster locations for QR generation — edit/add as needed.
export const qrSources = [
  "library",
  "sports-complex",
  "hostel-a",
  "hostel-b",
  "faculty-gate",
  "cafeteria",
  "main-auditorium",
];
