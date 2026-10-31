import type { ComponentType, SVGProps } from 'react';
import {
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  TailwindIcon,
  Html5Icon,
  Css3Icon,
  PythonIcon,
  GitIcon,
  SupabaseIcon,
  ViteIcon,
  ResponsiveIcon,
} from '@/components/SkillIcons';

export type SkillCategory = 'all' | 'frontend' | 'backend' | 'languages' | 'tools';

export type Skill = {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'languages' | 'tools';
  categoryLabel: string;
  description: string;
  color: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// Clean verified skills from Kareem Ahmed's actual project
export const skills: Skill[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Component architecture, state management, hooks & SPA routing',
    color: '#61DAFB',
    icon: ReactIcon,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'Language',
    description: 'Strict type safety, custom interfaces & robust scalable code',
    color: '#3178C6',
    icon: TypeScriptIcon,
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'languages',
    categoryLabel: 'Language',
    description: 'Modern asynchronous programming, DOM APIs & modular patterns',
    color: '#F7DF1E',
    icon: JavaScriptIcon,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Utility-first styling, design system tokens & adaptive layouts',
    color: '#38BDF8',
    icon: TailwindIcon,
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Semantic markup, accessibility (a11y) & SEO structured data',
    color: '#E34F26',
    icon: Html5Icon,
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Custom properties, flexbox, CSS grid & hardware-accelerated animations',
    color: '#1572B6',
    icon: Css3Icon,
  },
  {
    id: 'responsive',
    name: 'Responsive Design',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Mobile-first fluid layouts, media queries & cross-browser perfection',
    color: '#ff2525',
    icon: ResponsiveIcon,
  },
  {
    id: 'supabase',
    name: 'Supabase & SQL',
    category: 'backend',
    categoryLabel: 'Backend',
    description: 'PostgreSQL database schemas, migrations & client-side integration',
    color: '#3ECF8E',
    icon: SupabaseIcon,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Language',
    description: 'Backend scripting, algorithmic logic & automated workflows',
    color: '#3776AB',
    icon: PythonIcon,
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'tools',
    categoryLabel: 'Tools',
    description: 'Next-generation build tooling, optimized bundling & fast dev environment',
    color: '#646CFF',
    icon: ViteIcon,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    categoryLabel: 'Tools',
    description: 'Version control, atomic commits, branching workflows & code reviews',
    color: '#F05033',
    icon: GitIcon,
  },
];
