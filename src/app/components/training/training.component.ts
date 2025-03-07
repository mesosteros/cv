import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { LoadingService } from '../../shared/loading/loading.service';
import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import { SeoService } from '../../shared/seo/seo.service';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

const canonicalUrl = `${environment.hostUrl}/training`;

@Component({
  selector: 'app-training',
  imports: [CommonModule, LoadingSpinnerComponent],
  providers: [ContentfulService, SeoService],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent implements OnInit {
  public isLoading: boolean = true;
  public trainingData: any = [];

  constructor(
    private loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private seoService: SeoService,
    private contentfulService: ContentfulService,
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

    this.loadingService.show();

    this.contentfulService
      .getEntries('training')
      .then((entries: any) => {
        this.trainingData = entries.items
          .map((trainingEntry: any) => trainingEntry.fields)
          .sort((trainingA: any, trainingB: any) =>
            trainingA.trainingGroup.localeCompare(trainingB.trainingGroup)
          );
      })
      .catch((error) => (this.trainingData = []))
      .finally(() => {
        this.loadingService.hide();
        this.isLoading = false;
      });
  }
}
