import { Inject, Injectable, PLATFORM_ID, makeStateKey } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  CANONICAL_URL_KEY = makeStateKey<string>('canonicalUrl');

  constructor(
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
