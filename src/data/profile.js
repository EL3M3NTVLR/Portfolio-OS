export const ownerProfile = {
  identity: {
    fullName: "Aritra Banerjee",
    shortName: "Aritra",
    osName: "AritraOS",
    domain: "aritrabjee.vercel.app",
    location: "Kolkata, India · Open to relocate",
    timezone: "Asia/Kolkata",
    timezoneLabel: "IST (UTC+5:30)",
    pronouns: "He/Him",
    roles: [
      "Designer",
      "Video Editor",
      "Colorist",
      "AI Builder"
    ],
    headlineBengali: "Welcome to my প্রদর্শনী",
    headlineEnglish: "Welcome to my Exhibition",
    subheadline: "UI/UX, film, colour and AI-assisted craft, made with a refusal to ship anything that looks like everyone else's.",
    positioning: "Digital Karigor from Kolkata who designs, edits and grades work that means something.",
    dailyMotivation: "Make It Mean Something",
    aboutDocName: "About.txt",
    primaryPortrait: "/assets/01-portraits/alt-campus-sweater.webp",
    altPortraits: {
      cinematicWarm: "/assets/01-portraits/alt-cinematic-warm.webp",
      campusSweater: "/assets/01-portraits/alt-campus-sweater.webp",
      smileWaterfall: "/assets/01-portraits/alt-campus-sweater.webp",
      avatarRefJacketGlance: "/assets/01-portraits/avatar-ref-jacket-glance.webp",
      avatarRefJacketSide: "/assets/01-portraits/avatar-ref-jacket-side.webp"
    },
    resumePdf: "/assets/00-brand/AritraBanerjee_Resume_v6.pdf",
    resumePdfFallback: "/assets/00-brand/AritraBanerjee_Resume.pdf"
  },
  commercial: {
    primaryCtaLabel: "Enter Portfolio",
    primaryCtaAction: "open-projects",
    secondaryCtaLabel: "Email Me",
    secondaryCtaUrl: "mailto:aritra.bjee@gmail.com",
    resumeButtonLabel: "Download Résumé",
    resumeUrl: "/assets/00-brand/AritraBanerjee_Resume_v6.pdf",
    offerings: [
      {
        title: "UI/UX Design",
        desc: "Research-led interface design, concept prototyping in Figma and Google Stitch, interaction flows, and design systems with personality.",
        tags: ["Figma", "Stitch", "Design Thinking", "Interaction Design"]
      },
      {
        title: "Video Editing & Colour Grading",
        desc: "Narrative short films, commercial reels, and documentary series graded with earthy, cinematic warm tones in DaVinci Resolve & Premiere.",
        tags: ["DaVinci Resolve", "Premiere Pro", "Colour Grading", "Cinematography"]
      },
      {
        title: "AI-Assisted Craft & Prototyping",
        desc: "Rapid prototyping, AI audio integration, voice agents, prompt engineering, and intelligent interface explorations.",
        tags: ["Vite", "React", "AI Prototyping", "Speech Synthesis"]
      }
    ],
    idealVisitor: "Recruiters, hiring managers, and creative leads at studios, agencies, and product teams hiring for full-time roles."
  },
  contact: {
    email: "aritra.bjee@gmail.com",
    linkedin: "https://www.linkedin.com/in/aritrabjee/",
    locationText: "Kolkata, India · Open to relocate"
  },
  metrics: [
    {
      value: "Meta Certified",
      label: "Social Media Marketing Professional",
      status: "verified",
      source: "Coursera / Meta Verification",
      public: true,
    },
    {
      value: "~35,000",
      label: "Instagram Views",
      status: "self-reported",
      source: "Munchables.tv video production reach (approximate)",
      public: true
    },
    {
      value: "~33,000",
      label: "YouTube Views",
      status: "self-reported",
      source: "Munchables.tv video production reach (approximate)",
      public: true
    },
    {
      value: "5 Flagships",
      label: "Deep Case Studies",
      status: "verified",
      source: "Legaloid, HerbTantra, Heartware, Mirage, Museum of a Normal Person",
      public: true
    },
    {
      value: "22 Projects",
      label: "In Public Archive",
      status: "verified",
      source: "UI/UX, Film, Posters, Commercial & Research",
      public: true
    }
  ],
  companion: {
    name: "Lyadh",
    mood: "Chilling, laid-back Bengali mood ('lyadh')",
    defaultState: "idle",
    states: ["idle", "sleeping", "alert", "excited", "celebrating", "dragging", "happy", "sad"]
  },
  flagships: [
    {
      id: "legaloid",
      title: "Legaloid",
      context: "Design Thinking and Innovation, Christ University, 2026 (group project)",
      category: "UI/UX · AI · Legal Tech",
      overview: "A guided legal-assistance platform for first-time legal help seekers in India: verified lawyer discovery, plain-language guidance and case tracking in one journey.",
      theQuestion: "I started from watching someone close to me struggle through a first encounter with the legal system with no guidance and nobody to ask. It made me wonder why there is no platform that walks first-timers through the process.",
      role: "Came up with the original idea and pitch, fleshed out the solution, did market research and designed the prototype. Team: Aritra Banerjee, Ansh Banerjee, Hrishika Jain, Tavishi Batra.",
      howItCameTogether: [
        "Assumed cost was the main barrier, then surveyed 10 young adults. 7 had first-time legal experience. Only 2 named legal fees as a top challenge; all 7 struggled to understand legal procedures (stress averaged 4.0/5). Cost-led idea was dropped.",
        "Created a six-step journey: describe issue, find verified advocate, know before booking, book & upload docs, track case. Layouts generated in Google Stitch and refined in Figma.",
        "Replaced confusing legal-category pickers with a plain-text 'describe what happened' box."
      ],
      outcome: "In unassisted testing with 6 first-time seekers, 5 completed all tasks without help, and self-reported stress fell from 4.0 to 2.3 out of 5. Faculty gave strong feedback and encouraged taking it forward. (Source note: small team survey & usability test; directional).",
      reflection: "Starting from what people actually experience led us to reject our own assumption before building on it. A cost-led product would have been well made and poorly aimed.",
      cover: "/assets/02-projects/legaloid/cover.webp",
      links: [
        { label: "↗ Open Legaloid deck", url: "https://drive.google.com/file/d/1K6JgaScD9_3Z94UYPchjR6P9BVKNNUcP/view?usp=sharing" }
      ]
    },
    {
      id: "herbtantra",
      title: "HerbTantra (App Prototype)",
      context: "Personal project, before internship",
      category: "UI/UX · iOS · E-commerce",
      overview: "An app prototype for Herb Tantra, an Ayurvedic wellness brand, built before I had been hired by them.",
      theQuestion: "I was just learning Figma and UI/UX principles and wanted to apply to Herb Tantra as an intern. So I made something for them instead of only sending a résumé.",
      role: "Everything: researched the brand, designed the Figma prototype, and put together the presentation.",
      howItCameTogether: [
        "Researched Ayurvedic wellness and existing brand aesthetics so the prototype felt natively on-brand.",
        "Structured mobile commerce patterns, clean ingredient breakdowns, and tailored remedy discovery.",
        "Designed comprehensive interactive iOS flows and high-fidelity prototype in Figma."
      ],
      outcome: "The founder appreciated the initiative and how on-brand the prototype was, inquiring about app viability and customer retention. The prototype directly helped land the internship (Apr to May 2025).",
      reflection: "A made thing speaks louder than an application.",
      cover: "/assets/02-projects/herbtantra/cover.webp",
      links: [
        { label: "↗ View Figma Prototype", url: "https://www.figma.com/proto/t5931rMZ8uq3U2FEU8vCWn/HerbTantra-iOS?page-id=483%3A1720&node-id=547-1116&starting-point-node-id=547%3A1116&scaling=scale-down&content-scaling=fixed&t=ZQOma4n0ukD8Ghqg-1" }
      ]
    },
    {
      id: "heartware",
      title: "Heartware",
      context: "College assignment, group project",
      category: "Film · Documentary · Direction & Edit",
      overview: "A documentary exploring dating apps and the culture of modern dating in urban India.",
      theQuestion: "The assignment asked for an explorative, research-based documentary. As a group we chose dating apps and how technology shapes intimacy.",
      role: "Shot and edited the film. Teammates appeared on screen, conducted interviews, set up shots, handled art direction and background research.",
      howItCameTogether: [
        "Interviewed both strangers and ourselves to capture both objective social commentary and intimate insider vulnerability.",
        "Faced with a camera lacking optical stabilization and no gimbal, we innovated camera techniques so organic shake felt deliberate, human, and cinematically raw.",
        "Paced the edit to reflect digital scrolling contrasted with real conversational silence."
      ],
      outcome: "One of my favourite pieces so far; earned our group an outstanding grade and great peer reception.",
      reflection: "Dating can appear superficial on screens, but people differ widely in how stereotypes are perceived, performed, and felt.",
      cover: "/assets/02-projects/heartware/cover.webp",
      links: [
        { label: "▶ Watch on YouTube", url: "https://youtu.be/Rk8zTI0Rc60" }
      ]
    },
    {
      id: "mirage",
      title: "Mirage",
      context: "SDG 6: Clean Water and Sanitation, Sep 2026, Group 1 production",
      category: "Film · Music Video · Direction",
      overview: "A cinematic music video built around the theme of water shortage and urban depletion.",
      theQuestion: "Tasked with making a music video on a Sustainable Development Goal, I chose water shortage because I experienced Bengaluru's water crisis firsthand in 2024.",
      role: "Ideated and directed it, sang on the track, and starred in it. Directing while performing succeeded thanks to trust with the DOP and AD.",
      howItCameTogether: [
        "Communicated shot composition and aesthetic vision deeply with the cinematographer (Vaibhavi Chaturvedi) so I could perform without obsessing over the monitor.",
        "Collaborated on music production with Swapnendu Mukherjee and contributed vocals.",
        "Credits: Directed by Aritra Banerjee; DOP Vaibhavi Chaturvedi; AD & Editor Aditya Deo Prasad; Screenplay Vaibhavi Chaturvedi; Music Producer Swapnendu Mukherjee; Vocals Swapnendu Mukherjee, Aritra Banerjee, Evan Joshua Joseph; Line Producer Ansh Banerjee."
      ],
      outcome: "Great feedback from faculty, heavily contributed to our semester grade, and proved full multidisciplinary execution.",
      reflection: "Constraints pushed creative problem solving; for future productions I aim to allow more schedule runway and expand camera rigging.",
      cover: "/assets/02-projects/mirage/cover.webp",
      links: [
        { label: "▶ Watch on YouTube", url: "https://youtu.be/CX_G0lGilr8" }
      ]
    },
    {
      id: "museum-of-a-normal-person",
      title: "Museum of a Normal Person",
      context: "3 episodes, college assignment docu-series",
      category: "Film · Docu-Series · Cinematography & Grade",
      overview: "A 3-part mini-documentary series exploring the craft of sourcing, curating, and restoring trinkets, antiques, and furniture in Bengaluru.",
      theQuestion: "Given a 'Humans of Bangalore' documentary assignment, we selected Mr. Ramachandran and his antique store—a fascinating universe constructed of ordinary people's pasts.",
      role: "Cinematographer, Editor & Colorist. Equal creative partnership across the team.",
      howItCameTogether: [
        "Graded the entire series in earthy, warm tones to reflect the tactile authenticity and grounded memories of aged wood and metal.",
        "Introduced an academic angle exploring what counts as curation and what provenance remains in everyday relics.",
        "Ep 1 to Ep 3 shot across dynamic, compact interior store lighting."
      ],
      outcome: "Strong faculty praise, high academic marks, and a deep human connection with the shopkeepers and living archives.",
      reflection: "I want to travel, document, and meet many more people so every piece I craft carries lived experience.",
      cover: "/assets/02-projects/museum-of-a-normal-person/cover.webp",
      links: [
        { label: "▶ Ep 1 on YouTube", url: "https://youtu.be/dzIodzUOJjw" },
        { label: "▶ Ep 2 on YouTube", url: "https://youtu.be/j1Iw5m5Ztf0" },
        { label: "▶ Ep 3 on YouTube", url: "https://youtu.be/oopxkjOC5tw" }
      ]
    }
  ],
  journey: [
    {
      year: "2004",
      title: "Origins in Kolkata",
      desc: "Born in Kolkata. Growing up immersed in Bengali culture, literature, cinema, and the rich tradition of craftsmanship ('karigori'). Absorbing stimuli and visual storytelling from day one.",
      tag: "Roots & Cultural Identity"
    },
    {
      year: "2023",
      title: "Christ University & Media Studies",
      desc: "Commences B.A. in Communications & Media and Psychology at Christ University, Bengaluru. Blending human cognitive psychology with visual design and narrative media.",
      tag: "Academic Foundation"
    },
    {
      year: "Jul 2024",
      title: "First Web Design Role · Indian Oakleaf",
      desc: "First professional web design experience, delivering responsive digital layouts and structured digital experiences for clients.",
      tag: "Professional Milestone"
    },
    {
      year: "Oct 2024",
      title: "Video Production · Munchables.tv",
      desc: "Video editing and production for Munchables.tv, generating ~35,000 Instagram views and ~33,000 YouTube views through punchy, concept-driven video narratives.",
      tag: "Digital Reach"
    },
    {
      year: "Apr 2025",
      title: "HerbTantra Internship via Prototyping",
      desc: "Designs an unsolicited, on-brand iOS prototype for Ayurvedic wellness brand Herb Tantra. The initiative impresses the founder and converts directly into an internship.",
      tag: "Craft Initiative"
    },
    {
      year: "2025",
      title: "Moiré — Independent Short Film",
      desc: "Directs and edits zero-budget psychological thriller short film exploring digital footprints and surveillance anxiety. Pure concept over budget.",
      tag: "Directorial Work"
    },
    {
      year: "Aug 2026",
      title: "Watched Magazine",
      desc: "Designs comprehensive publication layout investigating surveillance capitalism, algorithmic behavioral modification, and digital autonomy.",
      tag: "Editorial & Typography"
    },
    {
      year: "Sep 2026",
      title: "Legaloid & Meta Certification",
      desc: "Pitches and prototypes Legaloid with team; conducts user research that pivots product strategy; earns Meta Social Media Marketing Professional Certificate.",
      tag: "Design Thinking & Research"
    },
    {
      year: "Sep 2026",
      title: "Mirage & Docu-Series",
      desc: "Directs, stars in, and records vocals for Mirage (SDG 6 water crisis); films and grades the 3-part Museum of a Normal Person documentary series.",
      tag: "Film & Sound"
    }
  ],
  aboutText: `I am Aritra Banerjee — a digital karigor from Kolkata who designs, edits, and grades work that means something.

Currently completing my B.A. in Communications & Media and Psychology at Christ University, my work sits at the intersection of human psychology, visual rhythm, and deliberate digital craft.

Whether I am designing a guided legal assistance flow in Figma, color-grading a 3-part documentary series in DaVinci Resolve, or directing a short film with no stabilizer by turning camera shake into narrative emotion, I refuse to ship anything that looks like everyone else's template.

What I care about:
• Concepts before polish — a well-crafted solution aimed at the wrong problem is just polite noise.
• Grounded aesthetics — Bengali terracotta warmth, cinematic film grain, deliberate typography.
• Making things speak louder than résumés — prototypes that open doors, films that ask real questions.

If you are a studio, product team, or agency looking for a creative who brings taste, technical execution, and genuine curiosity to the table: let's talk.

Email: aritra.bjee@gmail.com
LinkedIn: linkedin.com/in/aritrabjee`
};
