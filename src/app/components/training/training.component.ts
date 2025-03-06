import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../shared/seo/seo.service';

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
    private contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
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
