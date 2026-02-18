// src/content_data.js

export const content = {
  /* ================= HOME PAGE (example placeholder) ================= */
  homePage: {
    hero: {
      title: "Modern Digital Experiences",
      subtitle: "Design. Build. Scale.",
    },
  },

  /* ================= ABOUT PAGE (example placeholder) ================= */
  aboutPage: {
    title: "About Us",
    description:
      "We are a digital-focused team building modern, scalable, and immersive solutions.",
  },

  /* ================= SERVICES PAGE (USED BY Services.jsx) ================= */
  servicesPage: {
    hero: {
      title: "Our Services",
      description: "We design, build, and scale modern digital experiences.",
    },

    categories: [
      {
        title: "Web Development",
        focus: "Scalable & performant applications",
        type: "web", // 👈 used by ServiceConcept3D
        items: [
          "React Applications",
          "Next.js Websites",
          "REST & GraphQL APIs",
          "Admin Dashboards",
          "Performance Optimization",
          "SEO-Friendly Architecture",
        ],
      },

      {
        title: "AI Solutions",
        focus: "Smart automation & intelligence",
        type: "ai", // 👈 used by ServiceConcept3D
        items: [
          "Machine Learning Models",
          "AI Chatbots",
          "Data Pipelines",
          "Recommendation Systems",
          "Automation Workflows",
        ],
      },

      {
        title: "UI / UX Design",
        focus: "Human-centered digital design",
        type: "design",
        items: [
          "User Interface Design",
          "User Experience Strategy",
          "Wireframes & Prototypes",
          "Design Systems",
          "Accessibility Optimization",
        ],
      },

      {
        title: "Cloud & DevOps",
        focus: "Reliable infrastructure & scaling",
        type: "cloud",
        items: [
          "Cloud Architecture",
          "CI / CD Pipelines",
          "Docker & Kubernetes",
          "Monitoring & Logging",
          "Scalability Planning",
        ],
      },
    ],
  },

  /* ================= CONTACT PAGE (optional placeholder) ================= */
  contactPage: {
    title: "Get in Touch",
    description:
      "Have a project in mind? Let’s build something exceptional together.",
  },
};
