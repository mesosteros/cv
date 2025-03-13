import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
  effect,
  signal,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { SeoService } from '../../shared/seo/seo.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

const canonicalUrl = `${environment.hostUrl}/training`;

@Component({
  selector: 'app-training',
  imports: [CommonModule, LoadingSpinnerComponent],
  providers: [ContentfulService, SeoService],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent implements OnInit, AfterViewInit {
  public loading = signal(false);
  public error = signal(false);
  public trainingData: any = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private seoService: SeoService,
    private contentfulService: ContentfulService,
    private state: TransferState
  ) {
    effect(() => {
      if (this.error()) {
        console.error('Contentful error');
      }
    });
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      const url: any = this.state.get(
        this.seoService.CANONICAL_URL_KEY,
        canonicalUrl
      );
      this.seoService.updateTitleServer('Training and Certifications');
      this.seoService.updateCanonicalURLserver(url);
    }
    this.fetchContent();
  }

  ngAfterViewInit(): void {
    this.seoService.updateTitleServer('Training and Certifications');
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setCanonicalURL(this.document.URL);
    }
  }

  private fetchContent() {
    this.loading.set(true);
    this.error.set(false);
    this.contentfulService
      .getEntries('training')
      .then((entries: any) => {
        this.trainingData = entries.items
          .map((trainingEntry: any) => trainingEntry.fields)
          .sort((trainingA: any, trainingB: any) =>
            trainingA.trainingGroup.localeCompare(trainingB.trainingGroup)
          );
      })
      .catch((error) => {
        this.trainingData = [];
        this.error.set(true);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
