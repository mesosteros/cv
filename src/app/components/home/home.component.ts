import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { IntroComponent } from '../intro/intro.component';
import { SeoService } from '../../shared/seo/seo.service';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

const canonicalUrl = `${environment.hostUrl}`;

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
    @Inject(DOCUMENT) private document: Document,
    private state: TransferState,
    private meta: Meta
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      const url: any = this.state.get(
        this.seoService.CANONICAL_URL_KEY,
        canonicalUrl
      );
      this.seoService.updateCanonicalURLserver(url);
    }
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setCanonicalURL(this.document.URL);
    }
  }
}
