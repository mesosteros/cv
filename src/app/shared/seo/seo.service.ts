import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private titleService: Title) {}

  updateMetaTags(
    pageTitle: string,
    pageDescription: string,
    pageImagePath: string
  ) {
    this.titleService.setTitle(`Carlos Ermida Santos - ${pageTitle}`);

    // Standard Meta Tags
    this.meta.addTag({ name: 'description', content: pageDescription });

    this.meta.addTag({
      name: 'keywords',
      content:
        'Front-End Developer, Angular Developer, Angular Expert, Technical Manager, Web Developer, JavaScript Developer, TypeScript Developer, Web Application Development, Team Leadership, Project Management, Experienced Angular Front-End Developer, Front-End Development Consultant',
    });

    // Open Graph Meta Tags

    this.meta.addTag({
      property: 'og:title',
      content: `Carlos Ermida Santos - ${pageTitle}`,
    });

    this.meta.addTag({
      property: 'og:description',
      content: pageDescription,
    });

    this.meta.addTag({
      property: 'og:image',
      content: pageImagePath,
    });
  }
}
