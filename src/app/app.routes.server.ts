import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'skills',
    renderMode: RenderMode.Server,
  },
  {
    path: 'professional',
    renderMode: RenderMode.Server,
  },
  {
    path: 'academic',
    renderMode: RenderMode.Server,
  },
  {
    path: 'training',
    renderMode: RenderMode.Server,
  },
  {
    path: 'hobbies',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
