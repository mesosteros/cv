import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
  NgxDateFormat,
  NgxTimelineEvent,
  NgxTimelineEventChangeSide,
} from '@frxjs/ngx-timeline';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { SeoService } from '../../shared/seo/seo.service';
import { environment } from '../../../environments/environment';
import { Meta } from '@angular/platform-browser';

const canonicalUrl = `${environment.hostUrl}/education`;

@Component({
  selector: 'app-education',
  imports: [CommonModule, LoadingSpinnerComponent, TimelineComponent],
  providers: [ContentfulService, SeoService],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent implements OnInit {
  public isLoading: boolean = true;
  public mobileMode = false;
  public educationData: any;
  public events: NgxTimelineEvent[] = [];
  public timelineSide: NgxTimelineEventChangeSide =
    NgxTimelineEventChangeSide.ALL;

  public ngxDateFormat: NgxDateFormat = NgxDateFormat.MONTH_YEAR;

  constructor(
    private contentfulService: ContentfulService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private seoService: SeoService,
    private loadingService: LoadingService,
    private state: TransferState,
    private meta: Meta
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      const url: any = this.state.get(
        this.seoService.CANONICAL_URL_KEY,
        canonicalUrl
      );
      this.meta.updateTag({ rel: 'canonical', href: url });
    }
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setCanonicalURL(this.document.URL);
    }
    this.loadingService.show();

    this.contentfulService
      .getEntries('landingPage')
      .then((data: any) => {
        const educationData = data.items
          .filter((item: any) => item.fields.title === 'Academic Experience')
          .map((educationData: any) => educationData.fields);
        this.educationData = educationData[0];
        const listExperience = this.educationData.sections.map(
          (section: any) => section.fields
        );
        const events = listExperience.map(
          (experience: any, index: number): any => {
            if (!experience.endDate) {
              const currentDate = new Date();
              const year = currentDate.getFullYear(); // 4-digit year (e.g., 2024)
              const month = currentDate.getMonth() + 1; // Months are 0-indexed (0=Jan, 11=Dec)
              const day = currentDate.getDate(); // Day of the month (1-31)
              const formattedDate = `${year}-${month
                .toString()
                .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
              experience.endDate = formattedDate;
            }

            const experienceImage = {
              altText: `${experience?.logo?.fields.title} Logo`,
              url: experience?.logo?.fields.file.url,
            };

            const eventDescription = {
              location: experience.location,
              description: experience.description,
              startDate: experience.startDate,
              endDate: experience.endDate,
              image: experienceImage,
            };

            const processedData = {
              timestamp: new Date(experience.startDate),
              title: `${experience.title} - ${experience.role}`,
              description: eventDescription,
              id: index,
            };
            return processedData;
          }
        );
        this.events = events;
      })
      .catch((error) => (this.educationData = []))
      .finally(() => {
        this.loadingService.hide();
        this.isLoading = false;
      });
  }

  handleClick(event: any) {
    return;
  }

  findCorrespondingEndDate(startDate: any) {
    const matchingEvent = this.events.find(
      (event: any) => event.timestamp === startDate
    );

    if (matchingEvent) {
      const convertedEvent = matchingEvent.description as any;
      return convertedEvent.endDate;
    } else {
      return;
    }
  }

  convertToHtml(text: any) {
    return documentToHtmlString(text);
  }
}
