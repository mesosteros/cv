import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
  NgxDateFormat,
  NgxTimelineEvent,
  NgxTimelineEventChangeSide,
  NgxTimelineModule,
} from '@frxjs/ngx-timeline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, NgxTimelineModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements OnInit {
  public isMobile$!: Observable<boolean>;
  public isDesktop$!: Observable<boolean>;
  public mobileMode = false;
  @Input() events: NgxTimelineEvent[] = [];
  public timelineSide: NgxTimelineEventChangeSide =
    NgxTimelineEventChangeSide.ALL;

  public ngxDateFormat: NgxDateFormat = NgxDateFormat.MONTH_YEAR;

  constructor() {}

  ngOnInit() {}

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
