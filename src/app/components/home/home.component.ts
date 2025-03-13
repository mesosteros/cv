import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { SeoService } from '../../shared/seo/seo.service';
import { IntroComponent } from '../intro/intro.component';

const canonicalUrl = `${environment.hostUrl}`;

@Component({
  selector: 'app-home',
  imports: [IntroComponent],
  providers: [SeoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private state: TransferState
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      const url: any = this.state.get(
        this.seoService.CANONICAL_URL_KEY,
        canonicalUrl
      );
      this.seoService.updateTitleServer('Home');
      this.seoService.updateCanonicalURLserver(url);
    }
  }

  ngAfterViewInit(): void {
    this.seoService.updateTitleServer('Home');
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setCanonicalURL(this.document.URL);
    }
  }
}
