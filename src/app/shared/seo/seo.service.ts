import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, makeStateKey } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  CANONICAL_URL_KEY = makeStateKey<string>('canonicalUrl');

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateCanonicalURLserver(url: string) {
    this.meta.updateTag({ rel: 'canonical', href: url });
    this.meta.addTag({
      property: 'og:url',
      content: url,
    });
  }

  updateTitleServer(titleSuffix: string) {
    const defaultTitle =
      'Carlos Santos - Front-End Tech Manager | Angular Expert';
    this.title.setTitle(`${defaultTitle} | ${titleSuffix}`);
    this.meta.addTag({
      property: 'og:title',
      content: `${defaultTitle} | ${titleSuffix}`,
    });
  }

  setCanonicalURL(url?: string) {
    if (isPlatformBrowser(this.platformId)) {
      const canonical = url == undefined ? this.document.URL : url;
      let link: any = this.document.querySelector('link[rel="canonical"]');
      if (link == null) {
        link = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }
}
