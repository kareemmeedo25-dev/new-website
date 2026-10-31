export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  overview: string;
  tags: string[];
  features: string[];
  screenshots: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
  isPractice: boolean;
};

// Personal practice projects, clearly labeled as demos.
// Replace demoUrl / codeUrl with real links when available.
export const projects: Project[] = [
  {
    id: 'fashion-store',
    title: 'Fashion E-commerce Store',
    tagline: 'A modern online fashion boutique',
    description:
      'A modern e-commerce storefront for a fashion brand with product browsing, cart, and a frictionless checkout flow. Personal practice project.',
    overview:
      'A full e-commerce experience built as a personal practice project to explore modern storefront architecture. It includes a product catalog with filtering by category and size, a persistent shopping cart, a multi-step checkout, and an admin-style order summary. The UI emphasizes large product imagery and a clean, conversion-focused layout. This is a demo project, not a real client engagement.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Vite'],
    features: [
      'Product catalog with category and size filters',
      'Persistent shopping cart with quantity controls',
      'Multi-step checkout with order summary',
      'Responsive product grid with quick view',
      'Wishlist and recently viewed products',
      'Animated page transitions and micro-interactions',
    ],
    screenshots: [
      'https://images.pexels.com/photos/36730469/pexels-photo-36730469.jpeg?auto=compress&cs=tinysrgb&w=1260',
      'https://images.pexels.com/photos/7679440/pexels-photo-7679440.jpeg?auto=compress&cs=tinysrgb&w=1260',
      'https://images.pexels.com/photos/7679814/pexels-photo-7679814.jpeg?auto=compress&cs=tinysrgb&w=1260',
    ],
    image:
      'https://images.pexels.com/photos/36730469/pexels-photo-36730469.jpeg?auto=compress&cs=tinysrgb&w=1260',
    isPractice: true,
  },
  {
    id: 'restaurant-site',
    title: 'Restaurant Website',
    tagline: 'An elegant restaurant presence',
    description:
      'An elegant restaurant website with a menu, reservation form, gallery, and story section. Personal practice project.',
    overview:
      'A cinematic restaurant website built as a personal practice project to practice content-rich layouts and storytelling. It features an immersive hero, a filterable menu with dietary tags, an interactive reservation form with date/time selection, a photo gallery, and an about-the-chef story section. The design leans into warm imagery and smooth scroll reveals. This is a demo project, not a real client engagement.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    features: [
      'Immersive full-screen hero with parallax',
      'Filterable menu with dietary tags (veg, vegan, spicy)',
      'Interactive reservation form with date and time picker',
      'Photo gallery with lightbox preview',
      'Story section with scroll-triggered reveals',
      'Google Maps embed for location',
    ],
    screenshots: [
      'https://images.pexels.com/photos/37968303/pexels-photo-37968303.jpeg?auto=compress&cs=tinysrgb&w=1260',
      'https://images.pexels.com/photos/2290740/pexels-photo-2290740.jpeg?auto=compress&cs=tinysrgb&w=1260',
      'https://images.pexels.com/photos/19442296/pexels-photo-19442296.jpeg?auto=compress&cs=tinysrgb&w=1260',
    ],
    image:
      'https://images.pexels.com/photos/2290740/pexels-photo-2290740.jpeg?auto=compress&cs=tinysrgb&w=1260',
    isPractice: true,
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    tagline: 'A data visualization dashboard',
    description:
      'An analytics dashboard with charts, KPIs, filters, and a responsive dark UI. Personal practice project.',
    overview:
      'A responsive analytics dashboard built as a personal practice project to practice data visualization and state management. It features KPI cards, interactive line, bar, and donut charts, a date-range filter, a sortable data table, and a collapsible sidebar. The interface adapts from desktop to mobile with a reflowing layout. This is a demo project, not a real client engagement.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Vite'],
    features: [
      'KPI summary cards with trend indicators',
      'Interactive line, bar, and donut charts',
      'Date-range filter with preset ranges',
      'Sortable and paginated data table',
      'Collapsible sidebar navigation',
      'Fully responsive layout from desktop to mobile',
    ],
    screenshots: [
      'https://images.pexels.com/photos/34069/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260',
      'https://images.pexels.com/photos/139387/pexels-photo-139387.jpeg?auto=compress&cs=tinysrgb&w=1260',
      'https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&w=1260',
    ],
    image:
      'https://images.pexels.com/photos/34069/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260',
    isPractice: true,
  },
];
