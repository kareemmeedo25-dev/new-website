export type Language = 'en' | 'ar';

export type TranslationKey =
  | 'nav.home'
  | 'nav.about'
  | 'nav.skills'
  | 'nav.projects'
  | 'nav.services'
  | 'nav.terminal'
  | 'nav.github'
  | 'nav.contact'
  | 'nav.letsTalk'
  | 'nav.toggleMenu'
  | 'terminal.eyebrow'
  | 'terminal.title1'
  | 'terminal.title2'
  | 'terminal.subtitle'
  | 'terminal.windowTitle'
  | 'terminal.hint'
  | 'terminal.quickCommands'
  | 'terminal.reset'
  | 'terminal.clear'
  | 'hero.hi'
  | 'hero.developer'
  | 'hero.kareem'
  | 'hero.ahmed'
  | 'hero.description'
  | 'hero.viewWork'
  | 'hero.contactMe'
  | 'hero.follow'
  | 'hero.namePlate.role'
  | 'hero.badge.top'
  | 'hero.badge.bottom'
  | 'hero.scrollHint'
  | 'about.eyebrow'
  | 'about.title1'
  | 'about.title2'
  | 'about.title3'
  | 'about.paragraph'
  | 'about.trait1'
  | 'about.trait2'
  | 'about.trait3'
  | 'about.stat1Value'
  | 'about.stat1Label'
  | 'about.stat2Value'
  | 'about.stat2Label'
  | 'about.stat3Value'
  | 'about.stat3Label'
  | 'about.quote'
  | 'skills.eyebrow'
  | 'skills.title1'
  | 'skills.title2'
  | 'skills.subtitle'
  | 'projects.eyebrow'
  | 'projects.title1'
  | 'projects.title2'
  | 'projects.subtitle'
  | 'projects.liveDemo'
  | 'projects.sourceCode'
  | 'projects.viewDetails'
  | 'projects.comingSoon'
  | 'projects.demoNote'
  | 'projects.practiceBadge'
  | 'projectModal.overview'
  | 'projectModal.technologies'
  | 'projectModal.features'
  | 'projectModal.screenshots'
  | 'projectModal.liveDemo'
  | 'projectModal.sourceCode'
  | 'projectModal.close'
  | 'services.eyebrow'
  | 'services.title1'
  | 'services.title2'
  | 'services.subtitle'
  | 'services.s1Title'
  | 'services.s1Desc'
  | 'services.s2Title'
  | 'services.s2Desc'
  | 'services.s3Title'
  | 'services.s3Desc'
  | 'services.s4Title'
  | 'services.s4Desc'
  | 'services.s5Title'
  | 'services.s5Desc'
  | 'services.s6Title'
  | 'services.s6Desc'
  | 'services.inquire'
  | 'services.deliverables'
  | 'services.workflowEyebrow'
  | 'services.workflowTitle1'
  | 'services.workflowTitle2'
  | 'services.workflowSubtitle'
  | 'services.step1Title'
  | 'services.step1Desc'
  | 'services.step2Title'
  | 'services.step2Desc'
  | 'services.step3Title'
  | 'services.step3Desc'
  | 'services.ctaTitle'
  | 'services.ctaDesc'
  | 'services.ctaButton'
  | 'github.eyebrow'
  | 'github.title1'
  | 'github.title2'
  | 'github.subtitle'
  | 'github.usernameLabel'
  | 'github.usernamePlaceholder'
  | 'github.load'
  | 'github.loading'
  | 'github.error'
  | 'github.stars'
  | 'github.forks'
  | 'github.viewOnGithub'
  | 'github.enterUsername'
  | 'github.empty'
  | 'contact.eyebrow'
  | 'contact.title1'
  | 'contact.title2'
  | 'contact.description'
  | 'contact.name'
  | 'contact.email'
  | 'contact.subject'
  | 'contact.message'
  | 'contact.send'
  | 'contact.sending'
  | 'contact.success'
  | 'contact.error'
  | 'contact.whatsapp'
  | 'contact.whatsappSub'
  | 'contact.call'
  | 'contact.callSub'
  | 'contact.emailBtn'
  | 'contact.phoneLabel'
  | 'contact.copyNumber'
  | 'contact.copied'
  | 'contact.statusBadge'
  | 'contact.badgeSubtitle'
  | 'contact.sendViaEmail'
  | 'contact.sendViaWhatsApp'
  | 'contact.mailClientOpened'
  | 'contact.copiedEmail'
  | 'contact.location'
  | 'contact.locationVal'
  | 'contact.responseTime'
  | 'contact.responseTimeVal'
  | 'contact.backendTitle'
  | 'contact.backendNotConnected'
  | 'contact.backendConnected'
  | 'contact.viewGuide'
  | 'contact.hideGuide'
  | 'contact.guideStep1'
  | 'contact.guideStep2'
  | 'contact.guideStep3'
  | 'contact.socialTitle'
  | 'contact.placeholderName'
  | 'contact.placeholderEmail'
  | 'contact.placeholderSubject'
  | 'contact.placeholderMessage'
  | 'contact.errName'
  | 'contact.errEmail'
  | 'contact.errEmailValid'
  | 'contact.errSubject'
  | 'contact.errMessage'
  | 'contact.errMessageShort'
  | 'footer.tagline'
  | 'footer.navigation'
  | 'footer.getTouch'
  | 'footer.backTop'
  | 'footer.copyright'
  | 'footer.allRightsReserved'
  | 'footer.craftedWith'
  | 'footer.brandTitle'
  | 'footer.directContact'
  | 'hero.kicker'
  | 'hero.subheadline'
  | 'hero.intro'
  | 'hero.connect'
  | 'hero.available'
  | 'hero.hireMe'
  | 'hero.scroll'
  | 'hero.cap1Title'
  | 'hero.cap1Desc'
  | 'hero.cap2Title'
  | 'hero.cap2Desc'
  | 'hero.cap3Title'
  | 'hero.cap3Desc'
  | 'hero.cap4Title'
  | 'hero.cap4Desc'
  | 'skills.all'
  | 'skills.frontend'
  | 'skills.backend'
  | 'skills.languages'
  | 'skills.tools'
  | 'skills.verified'
  | 'skills.production'
  | 'skills.standard1Title'
  | 'skills.standard1Desc'
  | 'skills.standard2Title'
  | 'skills.standard2Desc'
  | 'skills.standard3Title'
  | 'skills.standard3Desc'
  | 'projects.filterAll'
  | 'projects.filterEcommerce'
  | 'projects.filterWeb'
  | 'projects.filterDashboard'
  | 'projects.flagship'
  | 'projects.techUsed'
  | 'projects.previewShots'
  | 'projects.stagingDemo'
  | 'whatsapp.tooltip'
  | 'theme.dark'
  | 'theme.light'
  | 'theme.toggle'
  | 'lang.toggle';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.terminal': 'Terminal',
    'nav.github': 'GitHub',
    'nav.contact': 'Contact',
    'nav.letsTalk': "Let's Talk",
    'nav.toggleMenu': 'Toggle menu',
    'terminal.eyebrow': 'Interactive Shell',
    'terminal.title1': 'Developer',
    'terminal.title2': 'Terminal',
    'terminal.subtitle': 'Explore my technical background, projects, skills, and direct contact channels through a simulated command-line interface.',
    'terminal.windowTitle': 'kareem@developer:~',
    'terminal.hint': 'Type commands or click quick chips below • Tab for autocomplete • ↑↓ for history',
    'terminal.quickCommands': 'Quick Commands',
    'terminal.reset': 'Reset',
    'terminal.clear': 'Clear',
    'hero.hi': "Hi, I'm",
    'hero.developer': 'Developer',
    'hero.kareem': 'Kareem',
    'hero.ahmed': 'Ahmed',
    'hero.description':
      'I build modern and responsive websites, turning ideas into real digital experiences.',
    'hero.viewWork': 'View My Work',
    'hero.contactMe': 'Contact Me',
    'hero.follow': 'Follow',
    'hero.namePlate.role': 'Web Developer',
    'hero.badge.top': 'Building',
    'hero.badge.bottom': 'Digital Experiences',
    'hero.scrollHint': 'Scroll to About',
    'about.eyebrow': 'About Me',
    'about.title1': 'Crafting modern digital experiences with',
    'about.title2': 'passion',
    'about.title3': '& precision.',
    'about.paragraph':
      "I'm Kareem Ahmed, a passionate developer who enjoys building modern, clean, and responsive digital experiences. I focus on creating websites that combine beautiful design with functionality and performance.",
    'about.trait1': 'Beautiful, clean, and modern design',
    'about.trait2': 'Functional, performant, and reliable code',
    'about.trait3': 'Turning ideas into real digital experiences',
    'about.stat1Value': '8+',
    'about.stat1Label': 'Technologies',
    'about.stat2Value': '6',
    'about.stat2Label': 'Services',
    'about.stat3Value': '100%',
    'about.stat3Label': 'Responsive',
    'about.quote':
      'Every project I take on is an opportunity to build something memorable — fast, accessible, and crafted down to the last detail.',
    'skills.eyebrow': 'Skills',
    'skills.title1': 'Technologies I',
    'skills.title2': 'work with',
    'skills.subtitle': 'The tools and languages I use to bring ideas to life on the web.',
    'projects.eyebrow': 'Projects',
    'projects.title1': 'Featured',
    'projects.title2': 'work',
    'projects.subtitle':
      'A selection of projects showcasing my approach to design and development.',
    'projects.liveDemo': 'Live Demo',
    'projects.sourceCode': 'Source Code',
    'projects.viewDetails': 'View Details',
    'projects.comingSoon': 'Links coming soon',
    'projects.demoNote':
      'These are personal practice projects, clearly labeled as demos. Real client links will be added as they go live.',
    'projects.practiceBadge': 'Practice Project',
    'projectModal.overview': 'Project Overview',
    'projectModal.technologies': 'Technologies Used',
    'projectModal.features': 'Main Features',
    'projectModal.screenshots': 'Screenshots',
    'projectModal.liveDemo': 'Live Demo',
    'projectModal.sourceCode': 'Source Code',
    'projectModal.close': 'Close',
    'services.eyebrow': 'Services',
    'services.title1': 'What I',
    'services.title2': 'Offer',
    'services.subtitle': 'End-to-end web development services tailored to your brand and goals.',
    'services.s1Title': 'Custom Website Development',
    'services.s1Desc':
      'Bespoke, high-performance websites built from scratch to match your brand and goals — pixel-perfect and fully functional.',
    'services.s2Title': 'E-commerce Website Development',
    'services.s2Desc':
      'Online stores with secure checkout, product management, and a smooth shopping experience designed to convert.',
    'services.s3Title': 'Landing Page Design',
    'services.s3Desc':
      'High-converting landing pages that capture attention and drive visitors toward a clear, measurable action.',
    'services.s4Title': 'Responsive Website Design',
    'services.s4Desc':
      'Sites that look and work flawlessly across every device — desktop, tablet, and mobile, with no compromises.',
    'services.s5Title': 'UI/UX Design',
    'services.s5Desc':
      'Clean, intuitive interfaces backed by thoughtful user flows that make every interaction feel effortless.',
    'services.s6Title': 'Website Improvements & Optimization',
    'services.s6Desc':
      'Performance audits, speed boosts, and redesigns that turn a slow or dated site into a polished experience.',
    'services.inquire': 'Discuss Project',
    'services.deliverables': 'Key Deliverables',
    'services.workflowEyebrow': 'Collaboration Process',
    'services.workflowTitle1': 'How We Work',
    'services.workflowTitle2': 'Together',
    'services.workflowSubtitle':
      'A structured, communicative 3-step workflow from the first conversation to live deployment.',
    'services.step1Title': '01. Discovery & Architecture',
    'services.step1Desc':
      'Understanding your goals, clarifying technical requirements, and planning a solid component structure.',
    'services.step2Title': '02. Engineering & Iteration',
    'services.step2Desc':
      'Building with clean React & TypeScript, testing responsiveness, and sharing progress checkpoints.',
    'services.step3Title': '03. QA & Production Launch',
    'services.step3Desc':
      'Thorough cross-device testing, performance and accessibility tuning, and smooth final deployment.',
    'services.ctaTitle': 'Have a project or web idea in mind?',
    'services.ctaDesc':
      "Let's talk through your goals and build a modern, high-performance website tailored to your needs.",
    'services.ctaButton': "Let's Talk About Your Project",
    'github.eyebrow': 'GitHub',
    'github.title1': 'My Open Source',
    'github.title2': 'Repositories',
    'github.subtitle':
      "Enter your GitHub username and I'll load your public repositories. Your real repos will appear here.",
    'github.usernameLabel': 'GitHub Username',
    'github.usernamePlaceholder': 'e.g. octocat',
    'github.load': 'Load Repositories',
    'github.loading': 'Loading repositories...',
    'github.error': 'Could not load repositories. Check the username and try again.',
    'github.stars': 'Stars',
    'github.forks': 'Forks',
    'github.viewOnGithub': 'View on GitHub',
    'github.enterUsername': 'Enter a GitHub username above to load public repositories.',
    'github.empty': 'No public repositories found for this username.',
    'contact.eyebrow': 'Contact',
    'contact.title1': "Let's Build Something",
    'contact.title2': 'Great Together',
    'contact.description':
      "Have a project in mind? Let's turn your ideas into a professional digital experience.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': "Your message has been sent. I'll get back to you soon!",
    'contact.error': 'Something went wrong. Please try again or reach me via WhatsApp.',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsappSub': 'Chat with me instantly',
    'contact.call': 'Direct Call',
    'contact.callSub': 'Tap to call me',
    'contact.emailBtn': 'Email',
    'contact.phoneLabel': 'My business number',
    'contact.copyNumber': 'Copy phone number',
    'contact.copied': 'Copied',
    'contact.statusBadge': 'Available for New Projects',
    'contact.badgeSubtitle': 'Open for freelance & contract work',
    'contact.sendViaEmail': 'Send via Email App',
    'contact.sendViaWhatsApp': 'Send via WhatsApp',
    'contact.mailClientOpened': 'Email app opened! Your message has been prepared for hello@kareemahmed.dev. You can review and click send directly.',
    'contact.copiedEmail': 'Email copied to clipboard',
    'contact.location': 'Location',
    'contact.locationVal': 'Cairo, Egypt (GMT+2)',
    'contact.responseTime': 'Response Time',
    'contact.responseTimeVal': 'Within 24 hours',
    'contact.backendTitle': 'Submission Backend Status',
    'contact.backendNotConnected': 'No cloud backend is configured. Submissions open directly in your email client or WhatsApp so no messages are ever lost.',
    'contact.backendConnected': 'Cloud database connected. Messages are saved securely.',
    'contact.viewGuide': 'How to connect a backend or email API',
    'contact.hideGuide': 'Hide connection instructions',
    'contact.guideStep1': '1. Create a free Supabase project or sign up for an email relay (Resend / EmailJS / Formspree).',
    'contact.guideStep2': '2. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env environment variables.',
    'contact.guideStep3': '3. Run the SQL table migration in supabase/migrations/20261030004519_create_contact_messages.sql.',
    'contact.socialTitle': 'Official Profiles',
    'contact.placeholderName': 'e.g. Alex Morgan',
    'contact.placeholderEmail': 'e.g. alex@example.com',
    'contact.placeholderSubject': 'e.g. Custom Web App or Portfolio Redesign',
    'contact.placeholderMessage': 'Describe your project, timeline, budget, or any specific requirements...',
    'contact.errName': 'Please enter your name.',
    'contact.errEmail': 'Please enter your email.',
    'contact.errEmailValid': 'Please enter a valid email address.',
    'contact.errSubject': 'Please enter a subject.',
    'contact.errMessage': 'Please enter a message.',
    'contact.errMessageShort': 'Message should be at least 10 characters.',
    'footer.tagline':
      'Building modern, responsive, and cinematic web experiences for clients worldwide.',
    'footer.navigation': 'Navigation',
    'footer.getTouch': 'Get in touch',
    'footer.backTop': 'Back to top',
    'footer.copyright': '© 2026 Kareem Ahmed. All Rights Reserved.',
    'footer.allRightsReserved': 'All rights reserved.',
    'footer.craftedWith': 'Crafted with React, TypeScript & Tailwind CSS',
    'footer.brandTitle': 'Developer Kareem Ahmed',
    'footer.directContact': 'Direct Contact',
    'hero.kicker': 'Full-Stack & Web Developer',
    'hero.subheadline': 'Crafting modern, responsive websites that turn ambitious ideas into digital realities.',
    'hero.intro': 'I build high-performance web applications, bespoke landing pages, and intuitive user interfaces with clean architecture and meticulous attention to detail.',
    'hero.connect': 'Connect',
    'hero.available': 'Available for hire',
    'hero.hireMe': 'Hire Me',
    'hero.scroll': 'Scroll',
    'hero.cap1Title': 'Custom Web Apps',
    'hero.cap1Desc': 'React, TypeScript & tailored frontend architecture',
    'hero.cap2Title': 'Adaptive Design',
    'hero.cap2Desc': 'Flawless across mobile, tablet & ultra-wide screens',
    'hero.cap3Title': 'Speed & SEO',
    'hero.cap3Desc': 'Optimized performance, clean semantics & fast load times',
    'hero.cap4Title': 'Direct Delivery',
    'hero.cap4Desc': 'Transparent communication & rapid turnaround',
    'skills.all': 'All Technologies',
    'skills.frontend': 'Frontend & UI',
    'skills.backend': 'Backend & Data',
    'skills.languages': 'Languages',
    'skills.tools': 'Tools & DevOps',
    'skills.verified': 'Verified in Codebase',
    'skills.production': 'Production',
    'skills.standard1Title': 'Modern Standards',
    'skills.standard1Desc': 'Writing clean, semantic, and reusable code aligned with modern TypeScript and React patterns.',
    'skills.standard2Title': 'Fast & Optimized',
    'skills.standard2Desc': 'Harnessing Vite and Tailwind for lightning-fast bundling, minimal runtime footprint, and high lighthouse scores.',
    'skills.standard3Title': 'Reliable Integration',
    'skills.standard3Desc': 'Connecting responsive client frontends with relational databases and backend APIs with graceful fallbacks.',
    'projects.filterAll': 'All Projects',
    'projects.filterEcommerce': 'E-Commerce',
    'projects.filterWeb': 'Websites & Dining',
    'projects.filterDashboard': 'Dashboards & Data',
    'projects.flagship': 'Featured Flagship',
    'projects.techUsed': 'Technologies Used',
    'projects.previewShots': 'Preview Shots',
    'projects.stagingDemo': 'Demo in Staging',
    'whatsapp.tooltip': 'Chat on WhatsApp',
    'theme.dark': 'Dark mode',
    'theme.light': 'Light mode',
    'theme.toggle': 'Toggle theme',
    'lang.toggle': 'Switch language',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة عني',
    'nav.skills': 'المهارات',
    'nav.projects': 'المشاريع',
    'nav.services': 'الخدمات',
    'nav.terminal': 'الطرفية',
    'nav.github': 'جيت هاب',
    'nav.contact': 'تواصل',
    'nav.letsTalk': 'لنتحدث',
    'nav.toggleMenu': 'القائمة',
    'terminal.eyebrow': 'الطرفية التفاعلية',
    'terminal.title1': 'شاشة أوامر',
    'terminal.title2': 'المطور',
    'terminal.subtitle': 'استكشف مهاراتي ومشاريعي ومعلومات التواصل معي عبر واجهة أوامر برمجية تفاعلية تحاكي أنظمة التطوير.',
    'terminal.windowTitle': 'kareem@developer:~',
    'terminal.hint': 'اكتب أمراً أو اضغط على الأزرار السريعة • Tab للإكمال التلقائي • ↑↓ للتنقل في السجل',
    'terminal.quickCommands': 'أوامر سريعة',
    'terminal.reset': 'إعادة ضبط',
    'terminal.clear': 'مسح الشاشة',
    'hero.hi': 'مرحباً، أنا',
    'hero.developer': 'مطور',
    'hero.kareem': 'كريم',
    'hero.ahmed': 'أحمد',
    'hero.description':
      'أقوم ببناء مواقع ويب حديثة ومتجاوبة، وأحول الأفكار إلى تجارب رقمية حقيقية.',
    'hero.viewWork': 'شاهد أعمالي',
    'hero.contactMe': 'تواصل معي',
    'hero.follow': 'تابعني',
    'hero.namePlate.role': 'مطور ويب',
    'hero.badge.top': 'أبني',
    'hero.badge.bottom': 'تجارب رقمية',
    'hero.scrollHint': 'انتقل إلى نبذة عني',
    'about.eyebrow': 'نبذة عني',
    'about.title1': 'أصنع تجارب رقمية حديثة بـ',
    'about.title2': 'شغف',
    'about.title3': 'ودقة.',
    'about.paragraph':
      'أنا كريم أحمد، مطور شغوف يستمتع ببناء تجارب رقمية حديثة ونظيفة ومتجاوبة. أركز على إنشاء مواقع تجمع بين التصميم الجميل والوظائف والأداء.',
    'about.trait1': 'تصميم جميل ونظيف وحديث',
    'about.trait2': 'كود وظيفي وسريع وموثوق',
    'about.trait3': 'تحويل الأفكار إلى تجارب رقمية حقيقية',
    'about.stat1Value': '+8',
    'about.stat1Label': 'تقنيات',
    'about.stat2Value': '6',
    'about.stat2Label': 'خدمات',
    'about.stat3Value': '100%',
    'about.stat3Label': 'متجاوب',
    'about.quote':
      'كل مشروع أتولاه هو فرصة لبناء شيء لا يُنسى — سريع وسهل الوصول ومصمم بأدق التفاصيل.',
    'skills.eyebrow': 'المهارات',
    'skills.title1': 'التقنيات التي',
    'skills.title2': 'أعمل بها',
    'skills.subtitle': 'الأدوات واللغات التي أستخدمها لأجعل الأفكار واقعاً على الويب.',
    'projects.eyebrow': 'المشاريع',
    'projects.title1': 'أعمال',
    'projects.title2': 'مميزة',
    'projects.subtitle': 'مجموعة من المشاريع تعكس منهجي في التصميم والتطوير.',
    'projects.liveDemo': 'عرض مباشر',
    'projects.sourceCode': 'الكود المصدري',
    'projects.viewDetails': 'عرض التفاصيل',
    'projects.comingSoon': 'الروابط قريباً',
    'projects.demoNote':
      'هذه مشاريع تدريبية شخصية، موضّحة كعروض تجريبية. ستُضاف روابط المشاريع الحقيقية عند تفعيلها.',
    'projects.practiceBadge': 'مشروع تدريبي',
    'projectModal.overview': 'نظرة عامة على المشروع',
    'projectModal.technologies': 'التقنيات المستخدمة',
    'projectModal.features': 'المميزات الرئيسية',
    'projectModal.screenshots': 'لقطات الشاشة',
    'projectModal.liveDemo': 'عرض مباشر',
    'projectModal.sourceCode': 'الكود المصدري',
    'projectModal.close': 'إغلاق',
    'services.eyebrow': 'الخدمات',
    'services.title1': 'ما',
    'services.title2': 'أقدمه',
    'services.subtitle': 'خدمات تطوير ويب متكاملة مصممة لعلامتك التجارية وأهدافك.',
    'services.s1Title': 'تطوير مواقع مخصصة',
    'services.s1Desc':
      'مواقع عالية الأداء مصممة من الصدر لتطابق علامتك وأهدافك — دقيقة ووظيفية بالكامل.',
    'services.s2Title': 'تطوير متاجر إلكترونية',
    'services.s2Desc':
      'متاجر بإتمام دفع آمن وإدارة منتجات وتجربة تسوق سلسة مصممة لزيادة المبيعات.',
    'services.s3Title': 'تصميم صفحات هبوط',
    'services.s3Desc':
      'صفحات هبوط عالية التحويل تجذب الانتباه وتقود الزائر نحو إجراء واضح وقابل للقياس.',
    'services.s4Title': 'تصميم مواقع متجاوبة',
    'services.s4Desc':
      'مواقع تعمل بشكل مثالي على كل جهاز — كمبيوتر ولوحي وهاتف، دون أي تنازلات.',
    'services.s5Title': 'تصميم واجهات وتجربة المستخدم',
    'services.s5Desc':
      'واجهات نظيفة وبديهية مدعومة بمسارات استخدام مدروسة تجعل كل تفاعل سهلاً.',
    'services.s6Title': 'تحسين وترقية المواقع',
    'services.s6Desc':
      'تدقيق الأداء وتسريع الموقع وإعادة التصميم لتحويل الموقع البطيء إلى تجربة متقنة.',
    'services.inquire': 'ناقش المشروع',
    'services.deliverables': 'أهم المخرجات',
    'services.workflowEyebrow': 'منهجية العمل',
    'services.workflowTitle1': 'كيف نعمل',
    'services.workflowTitle2': 'معاً',
    'services.workflowSubtitle':
      'خطوات عمل واضحة ومنظمة من أول جلسة نقاش وحتى إطلاق الموقع على الهواء.',
    'services.step1Title': '01. الاستكشاف والتخطيط',
    'services.step1Desc':
      'فهم الأهداف بدقة، توضيح المتطلبات التقنية، وتخطيط هيكل المكونات والواجهات.',
    'services.step2Title': '02. التطوير والبرمجة',
    'services.step2Desc':
      'كتابة كود نظيف وحديث بـ React و TypeScript، اختبار التجاوب، ومشاركة التحديثات المستمرة.',
    'services.step3Title': '03. الفحص والإطلاق',
    'services.step3Desc':
      'اختبار شامل على كل الشاشات، ضبط السرعة والتوافقية، والإطلاق السلس للموقع.',
    'services.ctaTitle': 'هل لديك فكرة أو مشروع ويب قيد التفكير؟',
    'services.ctaDesc':
      'لنتحدث عن أهدافك ونبني معاً موقعاً سريعاً وعصرياً يليق بعلامتك التجارية.',
    'services.ctaButton': 'لنتحدث عن مشروعك',
    'github.eyebrow': 'جيت هاب',
    'github.title1': 'مستودعاتي على',
    'github.title2': 'المصدر المفتوح',
    'github.subtitle':
      'أدخل اسم مستخدم جيت هاب خاصتك وسيتم تحميل مستودعاتك العامة. ستظهر مستودعاتك الحقيقية هنا.',
    'github.usernameLabel': 'اسم مستخدم جيت هاب',
    'github.usernamePlaceholder': 'مثال: octocat',
    'github.load': 'تحميل المستودعات',
    'github.loading': 'جارٍ تحميل المستودعات...',
    'github.error': 'تعذر تحميل المستودعات. تحقق من الاسم وحاول مرة أخرى.',
    'github.stars': 'نجوم',
    'github.forks': 'تفرعات',
    'github.viewOnGithub': 'عرض على جيت هاب',
    'github.enterUsername': 'أدخل اسم مستخدم جيت هاب أعلاه لتحميل المستودعات العامة.',
    'github.empty': 'لا توجد مستودعات عامة لهذا الاسم.',
    'contact.eyebrow': 'تواصل',
    'contact.title1': 'لنبني شيئاً',
    'contact.title2': 'رائعاً معاً',
    'contact.description':
      'لديك مشروع في ذهنك؟ لنحوّل أفكارك إلى تجربة رقمية احترافية.',
    'contact.name': 'الاسم',
    'contact.email': 'البريد الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.sending': 'جارٍ الإرسال...',
    'contact.success': 'تم إرسال رسالتك. سأعود إليك قريباً!',
    'contact.error': 'حدث خطأ. حاول مرة أخرى أو تواصل معي عبر واتساب.',
    'contact.whatsapp': 'واتساب',
    'contact.whatsappSub': 'تحدث معي فوراً',
    'contact.call': 'اتصال مباشر',
    'contact.callSub': 'اضغط للاتصال بي',
    'contact.emailBtn': 'بريد إلكتروني',
    'contact.phoneLabel': 'رقم عملي',
    'contact.copyNumber': 'نسخ الرقم',
    'contact.copied': 'تم النسخ',
    'contact.statusBadge': 'متاح للمشاريع الجديدة',
    'contact.badgeSubtitle': 'مستعد للعمل الحر واستفسارات المشاريع',
    'contact.sendViaEmail': 'إرسال عبر تطبيق البريد',
    'contact.sendViaWhatsApp': 'إرسال عبر واتساب',
    'contact.mailClientOpened': 'تم فتح تطبيق البريد الخاص بك مع تجهيز رسالتك إلى hello@kareemahmed.dev. يمكنك المراجعة والضغط على إرسال.',
    'contact.copiedEmail': 'تم نسخ البريد الإلكتروني',
    'contact.location': 'الموقع',
    'contact.locationVal': 'القاهرة، مصر (توقيت جرينتش+2)',
    'contact.responseTime': 'وقت الرد',
    'contact.responseTimeVal': 'خلال 24 ساعة',
    'contact.backendTitle': 'حالة خدمة الإرسال',
    'contact.backendNotConnected': 'لم يتم ربط خدمة سحابية في المتغيرات. يتم فتح الرسائل مباشرة عبر البريد أو واتساب لضمان عدم ضياع أي رسالة.',
    'contact.backendConnected': 'قاعدة البيانات السحابية متصلة. سيتم حفظ الرسائل مباشرة.',
    'contact.viewGuide': 'كيفية ربط قاعدة بيانات أو خدمة بريد إلكتروني',
    'contact.hideGuide': 'إخفاء تعليمات الربط',
    'contact.guideStep1': '1. أنشئ مشروعاً مجانياً على Supabase أو اشترك بخدمة بريد مثل (Resend / EmailJS / Formspree).',
    'contact.guideStep2': '2. أضف بيانات الاتصال (VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY) في ملف .env.',
    'contact.guideStep3': '3. نفّذ كود SQL في supabase/migrations/20261030004519_create_contact_messages.sql.',
    'contact.socialTitle': 'الحسابات الرسمية',
    'contact.placeholderName': 'مثال: أحمد علي',
    'contact.placeholderEmail': 'مثال: ahmed@example.com',
    'contact.placeholderSubject': 'مثال: تطوير متجر إلكتروني أو إعادة تصميم موقع',
    'contact.placeholderMessage': 'أخبرني عن تفاصيل مشروعك، أهدافك، الميزانية، أو أي متطلبات خاصة...',
    'contact.errName': 'يرجى إدخال اسمك.',
    'contact.errEmail': 'يرجى إدخال بريدك الإلكتروني.',
    'contact.errEmailValid': 'يرجى إدخال بريد إلكتروني صالح.',
    'contact.errSubject': 'يرجى إدخال الموضوع.',
    'contact.errMessage': 'يرجى إدخال رسالة.',
    'contact.errMessageShort': 'يجب أن تكون الرسالة 10 أحرف على الأقل.',
    'footer.tagline': 'أبني تجارب ويب حديثة ومتجاوبة وسينمائية لعملاء حول العالم.',
    'footer.navigation': 'التنقل',
    'footer.getTouch': 'تواصل معي',
    'footer.backTop': 'العودة للأعلى',
    'footer.copyright': '© 2026 كريم أحمد. جميع الحقوق محفوظة.',
    'footer.allRightsReserved': 'جميع الحقوق محفوظة.',
    'footer.craftedWith': 'صُنع باستخدام React و TypeScript و Tailwind CSS',
    'footer.brandTitle': 'المطور كريم أحمد',
    'footer.directContact': 'اتصال مباشر',
    'hero.kicker': 'مطور ويب وتطبيقات متكاملة',
    'hero.subheadline': 'أصنع مواقع حديثة ومتجاوبة تحول الأفكار الطموحة إلى واقع رقمي.',
    'hero.intro': 'أقوم ببناء تطبيقات ويب عالية الأداء وصفحات هبوط مخصصة وواجهات مستخدم بديهية مع معمارية برمجية نظيفة ودقة في التفاصيل.',
    'hero.connect': 'تواصل',
    'hero.available': 'متاح للعمل',
    'hero.hireMe': 'وظّفني',
    'hero.scroll': 'التمرير',
    'hero.cap1Title': 'تطبيقات ويب مخصصة',
    'hero.cap1Desc': 'React و TypeScript ومعمارية واجهات مخصصة',
    'hero.cap2Title': 'تصميم متكيف وشامل',
    'hero.cap2Desc': 'مثالي على الهاتف واللوحي والشاشات العريضة',
    'hero.cap3Title': 'سرعة وتحسين محركات البحث',
    'hero.cap3Desc': 'أداء فائق وسرعة تحميل متوافقة مع معايير الويب',
    'hero.cap4Title': 'تسليم مباشر وموثوق',
    'hero.cap4Desc': 'تواصل شفاف وتسليم دقيق وفق الجدول الزمني',
    'skills.all': 'كل التقنيات',
    'skills.frontend': 'الواجهات وتجربة المستخدم',
    'skills.backend': 'الخلفية والبيانات',
    'skills.languages': 'لغات البرمجة',
    'skills.tools': 'الأدوات وبيئة العمل',
    'skills.verified': 'مؤكد في المشروع',
    'skills.production': 'جاهز للإنتاج',
    'skills.standard1Title': 'معايير حديثة',
    'skills.standard1Desc': 'كتابة كود نظيف وقابل لإعادة الاستخدام وفق أحدث أنماط TypeScript و React.',
    'skills.standard2Title': 'سريع ومحسن',
    'skills.standard2Desc': 'استغلال Vite و Tailwind للحصول على بناء فائق السرعة وأعلى درجات الأداء.',
    'skills.standard3Title': 'تكامل موثوق',
    'skills.standard3Desc': 'ربط الواجهات الأمامية التفاعلية مع قواعد البيانات وواجهات برمجة التطبيقات بسلاسة.',
    'projects.filterAll': 'كل المشاريع',
    'projects.filterEcommerce': 'متاجر إلكترونية',
    'projects.filterWeb': 'مواقع ومطاعم',
    'projects.filterDashboard': 'لوحات تحكم وبيانات',
    'projects.flagship': 'المشروع الرئيسي المميز',
    'projects.techUsed': 'التقنيات المستخدمة',
    'projects.previewShots': 'لقطات الشاشة',
    'projects.stagingDemo': 'نسخة تجريبية',
    'whatsapp.tooltip': 'تحدث معي عبر واتساب',
    'theme.dark': 'الوضع الداكن',
    'theme.light': 'الوضع الفاتح',
    'theme.toggle': 'تبديل المظهر',
    'lang.toggle': 'تبديل اللغة',
  },
};
