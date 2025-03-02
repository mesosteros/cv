import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./components/skills/skills.component').then(
        (m) => m.SkillsComponent
      ),
  },
  {
    path: 'professional',
    loadComponent: () =>
      import('./components/professional/professional.component').then(
        (m) => m.ProfessionalComponent
      ),
  },
  {
    path: 'academic',
    loadComponent: () =>
      import('./components/education/education.component').then(
        (m) => m.EducationComponent
      ),
  },
  {
    path: 'training',
    loadComponent: () =>
      import('./components/training/training.component').then(
        (m) => m.TrainingComponent
      ),
  },
  {
    path: 'hobbies',
    loadComponent: () =>
      import('./components/hobbies/hobbies.component').then(
        (m) => m.HobbiesComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
