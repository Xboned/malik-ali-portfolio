export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "jobs"
      jobs: { title: string; meta: string; points: string[] }[]
    }
  | { type: "link"; href: string; label: string; download?: boolean }

export type Item = {
  id: string
  title: string
  subtitle: string
  icon: string
  href?: string
  download?: boolean
  body?: Block[]
}

export type Category = {
  id: string
  label: string
  icon: string
  items: Item[]
}

export const categories: Category[] = [
  {
    id: "about",
    label: "About",
    icon: "/assets/icons/about.png",
    items: [
      {
        id: "bio",
        title: "Malik Ali",
        subtitle: "Front-end developer · LA / OC",
        icon: "/assets/icons/photo.png",
        body: [
          {
            type: "p",
            text: "Front-end developer in Los Angeles / Orange County. I ship production websites and UI in HTML, CSS, JavaScript, TypeScript, and React.",
          },
          {
            type: "p",
            text: "I build Shopify and WordPress storefronts, turn Figma files into layouts, and handle QA, on-page SEO, and analytics on work that has to go live.",
          },
          {
            type: "p",
            text: "Mathematics & Statistics, Cal Poly Pomona, 2018-2024.",
          },
        ],
      },
      {
        id: "experience",
        title: "Experience",
        subtitle: "Contract, independent, and in-house",
        icon: "/assets/icons/video.png",
        body: [
          {
            type: "jobs",
            jobs: [
              {
                title: "Front-End Developer (Contract), Tempura Inc.",
                meta: "May 2026 - Present · Remote",
                points: [
                  "Built the company marketing homepage in static HTML, CSS, and JavaScript on Cloudflare, with a skip link, responsive nav, self-hosted fonts, and Content-Security-Policy headers.",
                  "Set a develop/main preview-to-production workflow so staging deploys stay off the live site until a change is ready.",
                ],
              },
              {
                title: "Front-End Developer (Independent)",
                meta: "2026 - Present · Orange County, CA",
                points: [
                  "Nest & Nooks (dormsheets.com): FLAT30 cart logic, delayed promo overlay, and a mobile announcement bar on Shopify.",
                  "Sculpt Spa: React + TypeScript + Vite booking funnel with Tailwind and shadcn/ui, talking to Boulevard for live services and availability.",
                ],
              },
              {
                title: "User Experience Designer (Contract), CoScript",
                meta: "Aug 2024 - May 2026 · Hybrid",
                points: [
                  "Designed responsive pages and UI in Figma, then implemented them as HTML, CSS, and JavaScript.",
                  "Added titles, meta tags, alt text, and heading structure, and used Google Analytics to find drop-off points.",
                ],
              },
              {
                title: "Marketing Assistant, Steelgem",
                meta: "May 2025 - Jan 2026 · Santa Ana, CA",
                points: [
                  "Built and updated WordPress pages so launches stayed accurate and on time.",
                  "Produced web and mobile assets in Figma, Canva, and Adobe Creative Suite.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    icon: "/assets/icons/faq.png",
    items: [
      {
        id: "where",
        title: "Where",
        subtitle: "Los Angeles / Orange County",
        icon: "/assets/icons/remote.png",
        body: [
          {
            type: "p",
            text: "Based in Southern California. Remote work is fine; hybrid in LA / OC is also fine.",
          },
        ],
      },
      {
        id: "available",
        title: "Availability",
        subtitle: "Front-end roles and contract",
        icon: "/assets/icons/date.png",
        body: [
          {
            type: "p",
            text: "Open to front-end developer roles and contract work: marketing sites, Shopify, WordPress, and React UI.",
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        subtitle: "HTML, CSS, JS, TypeScript",
        icon: "/assets/icons/memory-stick.png",
        body: [
          {
            type: "list",
            items: [
              "HTML, CSS, JavaScript, TypeScript",
              "React, Next.js, Gatsby, Vite, Tailwind CSS",
              "Shopify (Liquid, theme sections, cart scripts)",
              "WordPress, Elementor",
              "Figma, Git, Cloudflare, Vercel, Google Analytics",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    icon: "/assets/icons/work.png",
    items: [
      {
        id: "development",
        title: "Development",
        subtitle: "HTML/CSS - TypeScript - React - Vite",
        icon: "/assets/icons/browser.png",
        body: [
          {
            type: "jobs",
            jobs: [
              {
                title: "This site (malikalidev.com)",
                meta: "React, TypeScript, Vite · Cloudflare Workers",
                points: [
                  "PSP XMB shell from a Figma file: category row, item column, keyboard and touch, animated wave backdrop.",
                  "Git deploy from github.com/Xboned/malik-ali-portfolio, with CSP headers, robots.txt, and security.txt.",
                ],
              },
              {
                title: "Tempura Inc. marketing homepage",
                meta: "HTML, CSS, JavaScript · Cloudflare Workers · May 2026 - Present",
                points: [
                  "Static homepage with skip link, responsive nav, self-hosted fonts, and Content-Security-Policy headers.",
                  "develop branch for preview deploys; main for production.",
                ],
              },
              {
                title: "Nest & Nooks (dormsheets.com)",
                meta: "Shopify · Liquid · 2026",
                points: [
                  "FLAT30: 30% off the second Flat Sheet when two flats are in the cart, combined with existing bundle discounts, then tested cart and checkout.",
                  "Delayed promo overlay with rotating codes (FLAT30, FIT30, DUV30), Shopify Forms signup tags, and a mobile announcement bar placed so the floating menu does not cover the offer.",
                ],
              },
              {
                title: "Sculpt Spa booking funnel",
                meta: "React, TypeScript, Vite, Tailwind, shadcn/ui · 2026",
                points: [
                  "Service cards, week calendar, time slots, and a validated client form.",
                  "Talks to Boulevard for live services and availability.",
                ],
              },
              {
                title: "CoScript",
                meta: "Figma to HTML, CSS, JavaScript · Aug 2024 - May 2026",
                points: [
                  "Designed responsive pages and UI in Figma, then implemented them as HTML, CSS, and JavaScript.",
                  "Titles, meta tags, alt text, and heading structure, plus Analytics-driven layout changes.",
                ],
              },
              {
                title: "Steelgem",
                meta: "WordPress · May 2025 - Jan 2026",
                points: [
                  "Built and updated WordPress pages (content, layout, QA) so launches stayed accurate and on time.",
                ],
              },
            ],
          },
          {
            type: "link",
            href: "https://dormsheets.com",
            label: "dormsheets.com",
          },
        ],
      },
      {
        id: "tools",
        title: "Tools",
        subtitle: "Figma - VS Code - Git - Cloudflare - Shopify",
        icon: "/assets/icons/usb.png",
        body: [
          {
            type: "p",
            text: "Grouped the way I use them on shipped work:",
          },
          {
            type: "list",
            items: [
              "Languages: HTML, CSS, JavaScript, TypeScript",
              "Libraries / frameworks: React, Next.js, Gatsby, Vite, Tailwind CSS",
              "CMS / commerce: Shopify (Liquid, theme sections, cart scripts), WordPress, Elementor",
              "Design: Figma, Adobe Creative Suite, Canva",
              "Tooling: Git, VS Code, Cloudflare, Vercel, Google Analytics",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    icon: "/assets/icons/contact.png",
    items: [
      {
        id: "email",
        title: "Email",
        subtitle: "malikali2164@gmail.com",
        icon: "/assets/icons/sharing.png",
        href: "mailto:malikali2164@gmail.com",
        body: [
          {
            type: "p",
            text: "Best way to reach me for roles or contract work.",
          },
          {
            type: "link",
            href: "mailto:malikali2164@gmail.com",
            label: "malikali2164@gmail.com",
          },
        ],
      },
      {
        id: "linkedin",
        title: "LinkedIn",
        subtitle: "malik-ali-msa",
        icon: "/assets/icons/psn.png",
        href: "https://linkedin.com/in/malik-ali-msa/",
        body: [
          {
            type: "link",
            href: "https://linkedin.com/in/malik-ali-msa/",
            label: "linkedin.com/in/malik-ali-msa",
          },
        ],
      },
    ],
  },
  {
    id: "links",
    label: "Links",
    icon: "/assets/icons/links.png",
    items: [
      {
        id: "github",
        title: "GitHub",
        subtitle: "github.com/Xboned",
        icon: "/assets/icons/umd.png",
        href: "https://github.com/Xboned",
        body: [
          {
            type: "link",
            href: "https://github.com/Xboned",
            label: "github.com/Xboned",
          },
        ],
      },
      {
        id: "resume",
        title: "Resume",
        subtitle: "Malik Ali Resume.pdf",
        icon: "/assets/icons/savedata.png",
        href: "/Malik Ali Resume.pdf",
        download: true,
        body: [
          {
            type: "p",
            text: "Front-end resume. Same content as the HTML version, as a PDF.",
          },
          {
            type: "link",
            href: "/Malik Ali Resume.pdf",
            label: "Download Malik Ali Resume.pdf",
            download: true,
          },
          { type: "link", href: "/resume.html", label: "Open HTML resume" },
        ],
      },
    ],
  },
  {
    id: "theme",
    label: "Theme",
    icon: "/assets/icons/music.png",
    items: [
      {
        id: "wave",
        title: "XMB Wave",
        subtitle: "How this site is laid out",
        icon: "/assets/icons/theme.png",
        body: [
          {
            type: "p",
            text: "The shell is a PSP XrossMediaBar. Categories run left and right. Items run up and down. Enter opens a panel. Escape closes it.",
          },
          {
            type: "p",
            text: "Designed in Figma, built in React, hosted on Cloudflare.",
          },
        ],
      },
    ],
  },
]

export const START_CATEGORY = 2
