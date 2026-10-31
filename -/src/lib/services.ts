import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Palette,
  ShoppingCart,
  LayoutTemplate,
  Smartphone,
  Gauge,
} from 'lucide-react';
import type { TranslationKey } from './i18n';

export type Service = {
  id: string;
  number: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  title: string;
  description: string;
  category: string;
  categoryAr: string;
  badge: string;
  badgeAr: string;
  deliverables: string[];
  deliverablesAr: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: 'custom-web-dev',
    number: '01',
    titleKey: 'services.s1Title',
    descKey: 'services.s1Desc',
    title: 'Custom Website Development',
    description:
      'Bespoke, high-performance websites built from scratch to match your brand and goals — pixel-perfect and fully functional.',
    category: 'Full-Stack Web',
    categoryAr: 'تطوير ويب مخصص',
    badge: 'React & TypeScript',
    badgeAr: 'رياكت وتايب سكريبت',
    deliverables: [
      'Component-driven React & TypeScript architecture',
      'Clean, modular and easily maintainable codebase',
      'Fast load speeds and SEO-ready meta structure',
    ],
    deliverablesAr: [
      'معمارية مكونات متطورة بـ React و TypeScript',
      'كود نظيف ومنظم وقابل للتوسع والصيانة بسهولة',
      'سرعة تحميل فائقة وتهيئة متكاملة لمحركات البحث',
    ],
    icon: Code2,
  },
  {
    id: 'ecommerce-dev',
    number: '02',
    titleKey: 'services.s2Title',
    descKey: 'services.s2Desc',
    title: 'E-commerce Website Development',
    description:
      'Online stores with secure checkout, product management, and a smooth shopping experience designed to convert.',
    category: 'E-Commerce',
    categoryAr: 'متاجر إلكترونية',
    badge: 'Store Architecture',
    badgeAr: 'بنية المتاجر',
    deliverables: [
      'Interactive product catalog & smart cart management',
      'Frictionless checkout experience focused on conversion',
      'Mobile-first shopping flows and inventory display',
    ],
    deliverablesAr: [
      'كتالوج منتجات تفاعلي وسلة تسوق ذكية',
      'تجربة إتمام طلب سلسة ومصممة لرفع المبيعات',
      'مسارات تسوق موجهة للهاتف وتصفح مريح',
    ],
    icon: ShoppingCart,
  },
  {
    id: 'landing-pages',
    number: '03',
    titleKey: 'services.s3Title',
    descKey: 'services.s3Desc',
    title: 'Landing Page Design',
    description:
      'High-converting landing pages that capture attention and drive visitors toward a clear, measurable action.',
    category: 'Conversion & Growth',
    categoryAr: 'صفحات هبوط وتحويل',
    badge: 'High-Converting',
    badgeAr: 'عالية التحويل',
    deliverables: [
      'Compelling visual hierarchy with strategic CTAs',
      'Ultra-fast load times optimized for advertising campaigns',
      'Subtle interactive animations that keep users engaged',
    ],
    deliverablesAr: [
      'تسلسل بصري جذاب مع أزرار إجراء استراتيجية',
      'سرعة تحميل فائقة مهيأة للحملات التسويقية',
      'تفاعلات حركية ناعمة تحافظ على انتباه الزائر',
    ],
    icon: LayoutTemplate,
  },
  {
    id: 'responsive-design',
    number: '04',
    titleKey: 'services.s4Title',
    descKey: 'services.s4Desc',
    title: 'Responsive Website Design',
    description:
      'Sites that look and work flawlessly across every device — desktop, tablet, and mobile, with no compromises.',
    category: 'Cross-Device Polish',
    categoryAr: 'تصميم متجاوب',
    badge: 'Mobile · Tablet · Desktop',
    badgeAr: 'هاتف · لوحي · حاسوب',
    deliverables: [
      'Fluid layouts engineered for mobile, tablet, and desktop',
      'Touch-friendly navigation with accessible tap targets',
      'Retina and high-DPI asset optimization without layout shifts',
    ],
    deliverablesAr: [
      'تخطيط مرن ومضبوط للهواتف والأجهزة اللوحية والحواسيب',
      'عناصر تنقل سهلة للمس ومريحة في الاستخدام',
      'دقة وضوح عالية للأصول والأيقونات بدون أي اهتزاز',
    ],
    icon: Smartphone,
  },
  {
    id: 'ui-ux-design',
    number: '05',
    titleKey: 'services.s5Title',
    descKey: 'services.s5Desc',
    title: 'UI/UX Design',
    description:
      'Clean, intuitive interfaces backed by thoughtful user flows that make every interaction feel effortless.',
    category: 'Interface Systems',
    categoryAr: 'تصميم واجهات وتجربة',
    badge: 'Design System',
    badgeAr: 'نظام تصميم',
    deliverables: [
      'Cohesive Dark & Light theme token systems',
      'Intuitive user journeys minimizing cognitive friction',
      'High-fidelity implementation using Tailwind CSS',
    ],
    deliverablesAr: [
      'نظام ألوان متناسق للوضع الداكن والوضع الفاتح',
      'مسارات استخدام سهلة تقلل الحيرة وتسهل التصفح',
      'تنفيذ دقيق للتصميم البرمجي عبر Tailwind CSS',
    ],
    icon: Palette,
  },
  {
    id: 'optimization',
    number: '06',
    titleKey: 'services.s6Title',
    descKey: 'services.s6Desc',
    title: 'Website Improvements & Optimization',
    description:
      'Performance audits, speed boosts, and redesigns that turn a slow or dated site into a polished experience.',
    category: 'Performance & Speed',
    categoryAr: 'تحسين وأداء',
    badge: 'Core Web Vitals',
    badgeAr: 'مؤشرات الأداء',
    deliverables: [
      'Lighthouse performance analysis & asset compression',
      'Bug fixing, refactoring, and modernizing legacy code',
      'Accessibility enhancements and WCAG contrast compliance',
    ],
    deliverablesAr: [
      'تحليل أداء Lighthouse وضغط الصور والأكواد',
      'إصلاح المشكلات البرمجية وتحديث الأكواد القديمة',
      'تحسين سهولة الوصول والامتثال لمعايير التباين WCAG',
    ],
    icon: Gauge,
  },
];
