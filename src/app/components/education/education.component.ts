import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
  NgxDateFormat,
  NgxTimelineEvent,
  NgxTimelineEventChangeSide,
  NgxTimelineModule,
} from '@frxjs/ngx-timeline';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { ResponsiveService } from '../../shared/responsive/responsive.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-education',
  imports: [CommonModule, LoadingSpinnerComponent, NgxTimelineModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent implements OnInit {
  public isMobile$!: Observable<boolean>;
  public isDesktop$!: Observable<boolean>;
  public isLoading: boolean = true;
  public mobileMode = false;
  public professionalData: any;
  public events: NgxTimelineEvent[] = [];
  public timelineSide: NgxTimelineEventChangeSide =
    NgxTimelineEventChangeSide.ALL;

  public ngxDateFormat: NgxDateFormat = NgxDateFormat.MONTH_YEAR;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private contentfulService: ContentfulService,
    private responsiveService: ResponsiveService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.isMobile$ = this.responsiveService.isMobile$;
    this.isDesktop$ = this.responsiveService.isDesktop$;

    this.loadingService.show();

    this.contentfulService
      .getEntries('landingPage')
      .then((data: any) => {
        console.log(data.items);
        const professionalData = data.items
          .filter((item: any) => item.fields.title === 'Academic Experience')
          .map((professionalData: any) => professionalData.fields);
        this.professionalData = professionalData[0];
        const listExperience = this.professionalData.sections.map(
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

            const eventDescription = {
              location: experience.location,
              description: experience.description,
              startDate: experience.startDate,
              endDate: experience.endDate,
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
      .catch((error) => (this.professionalData = []))
      .finally(() => {
        this.loadingService.hide();
        this.isLoading = false;
      });
  }

  handleClick(event: any) {
    console.log(event);
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
