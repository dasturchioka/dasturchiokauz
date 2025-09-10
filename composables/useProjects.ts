export interface Project {
  id: string;
  title: string;
  description: string;
  status: "successful" | "in-progress" | "failed" | "archived";
  year: string;
  stack: string[];

  // Extended fields
  paragraphs?: string[]; // Long form content
  sourceCode?: string[]; // One or more repo links
  demoLink?: string[]; // One or more demo URLs
  demoVideo?: string; // Single video link
  bannerUrl?: string; // Header image
}

export function useProjects() {
  const projects = ref<Project[]>([]);
  const project = ref<Project | null>(null);
  const loading = ref<Boolean>(true);

  const categories = {
    successful: {
      title: "Successful",
      light: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        cardBg: "bg-white",
        cardBorder: "border-green-100",
      },
      dark: {
        bg: "dark:bg-green-950/30",
        border: "dark:border-green-800/50",
        text: "dark:text-green-200",
        cardBg: "dark:bg-neutral-900",
        cardBorder: "dark:border-neutral-800",
      },
    },
    "in-progress": {
      title: "In Progress",
      light: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        cardBg: "bg-white",
        cardBorder: "border-blue-100",
      },
      dark: {
        bg: "dark:bg-blue-950/30",
        border: "dark:border-blue-800/50",
        text: "dark:text-blue-200",
        cardBg: "dark:bg-neutral-900",
        cardBorder: "dark:border-neutral-800",
      },
    },
    failed: {
      title: "Failed",
      light: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        cardBg: "bg-white",
        cardBorder: "border-red-100",
      },
      dark: {
        bg: "dark:bg-red-950/30",
        border: "dark:border-red-800/50",
        text: "dark:text-red-200",
        cardBg: "dark:bg-neutral-900",
        cardBorder: "dark:border-neutral-800",
      },
    },
    archived: {
      title: "Archived",
      light: {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-800",
        cardBg: "bg-white",
        cardBorder: "border-gray-100",
      },
      dark: {
        bg: "dark:bg-gray-950/30",
        border: "dark:border-gray-800/50",
        text: "dark:text-gray-200",
        cardBg: "dark:bg-neutral-900",
        cardBorder: "dark:border-neutral-800",
      },
    },
  };

  const demoProjects: Project[] = [
    {
      id: "proj-1",
      title: "IELTS CD Mock Exam Platform",
      description:
        "A production-grade platform replicating the official computer-delivered IELTS exam experience.",
      status: "successful",
      year: "2024",
      stack: ["Next.js", "Supabase", "TailwindCSS", "TypeScript", "Vercel"],
      bannerUrl: "https://i.ibb.co/SD3q66nT/Screenshot-20250911-013826.jpg",
      demoLink: ["https://www.aplusacademy.uz/"],
      demoVideo: "https://youtu.be/RELewHrQ7w4",
      paragraphs: [
        "The IELTS CD Mock Exam Platform is a fully functional system used by multiple learning centres in Uzbekistan to conduct realistic IELTS practice tests. It closely mirrors the official computer-delivered IELTS exam, giving students the chance to prepare under authentic conditions.",
        "The platform was built with **Next.js** for blazing-fast performance and SEO-ready rendering, while **Supabase** powers authentication, secure data storage, and real-time features. A clean, exam-focused UI designed with **TailwindCSS** ensures candidates can focus solely on their performance without distractions.",
        "It supports these modules: **Listening, Reading and Writing**. Listening tasks feature timed audio playback with no replay beyond the rules. Writing tasks include autosave, word count enforcement, and timed submission. Reading tasks replicate the split-screen question format found in the official test. You still can grade student's speaking results through admin dashboard.",
        "Teachers and admins benefit from a backend that allows them to upload new test materials, manage candidates, and review results. Students receive detailed score breakdowns and progress analytics, helping them identify their strengths and weaknesses.",
        "The system has been successfully deployed in local centres and continues to serve hundreds of test-takers. Future improvements aim to include **AI-driven essay evaluation**, mobile app support, and integration with third-party learning platforms.",
        "Contact me for **DEMO**"
      ],
    },
  ];

  async function loadProjects() {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      projects.value = demoProjects;
    } catch (e) {
      console.error("Failed to load projects:", e);
      projects.value = demoProjects;
    } finally {
      loading.value = false;
    }
  }

  async function loadOneProject(id: string) {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      project.value = demoProjects.find((p) => p.id === id) ?? null;
      console.log(demoProjects.find((p) => p.id === id));
    } catch (e) {
      console.error("Failed to load projects:", e);
    } finally {
      loading.value = false;
    }
  }

  return {
    projects,
    loading,
    loadProjects,
    categories,
    loadOneProject,
    project,
  };
}
