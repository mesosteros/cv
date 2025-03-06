import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IntroComponent } from '../intro/intro.component';
import { SeoService } from '../../shared/seo/seo.service';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [IntroComponent],
  providers: [SeoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setCanonicalURL(this.document.URL);
    }
  }
}
