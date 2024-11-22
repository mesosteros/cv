import { Component } from '@angular/core';
import { NgxTimelineEvent, NgxTimelineModule } from '@frxjs/ngx-timeline';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgxTimelineModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  events: NgxTimelineEvent[] = [];
}
