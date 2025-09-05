// Utility functions for the portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  link?: string;
  image?: string;
}

export interface Skill {
  category: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    status: 'completed',
    link: '#'
  },
  {
    id: '2',
    title: 'Mobile Weather App',
    description: 'Cross-platform weather application with real-time data and beautiful UI',
    technologies: ['React Native', 'TypeScript', 'Weather API'],
    status: 'in-progress',
    link: '#'
  },
  {
    id: '3',
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for analyzing business metrics and KPIs',
    technologies: ['D3.js', 'Python', 'FastAPI', 'MongoDB'],
    status: 'completed',
    link: '#'
  }
];

export const skills: Skill[] = [
  { category: 'Frontend', name: 'React', level: 'expert' },
  { category: 'Frontend', name: 'TypeScript', level: 'advanced' },
  { category: 'Frontend', name: 'Next.js', level: 'advanced' },
  { category: 'Frontend', name: 'Vue.js', level: 'intermediate' },
  { category: 'Frontend', name: 'Tailwind CSS', level: 'expert' },
  { category: 'Backend', name: 'Node.js', level: 'advanced' },
  { category: 'Backend', name: 'Python', level: 'intermediate' },
  { category: 'Backend', name: 'PostgreSQL', level: 'advanced' },
  { category: 'Backend', name: 'MongoDB', level: 'intermediate' },
  { category: 'Tools', name: 'Git', level: 'expert' },
  { category: 'Tools', name: 'AWS', level: 'intermediate' },
  { category: 'Tools', name: 'Docker', level: 'intermediate' }
];

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter(skill => skill.category === category);
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter(project => project.status === status);
}