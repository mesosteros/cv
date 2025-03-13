import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, signal } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { ResponsiveService } from '../../shared/responsive/responsive.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-intro',
  imports: [CommonModule, LoadingSpinnerComponent],
  providers: [ContentfulService],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements OnInit {
  isMobile$!: Observable<boolean>;
  isDesktop$!: Observable<boolean>;
  public loading = signal(false);
  public error = signal(false);

  public defaultIntro: string =
    'With 10+ years of hands-on experience in web projects, I bridge technical excellence and leadership as a Front-End Tech Manager. My expertise centers on modern JavaScript frameworks, particularly Angular, where I’ve architected scalable solutions and mentored teams to deliver polished, user-centric products. As a Tech Manager and Agile Scrum advocate, I thrive in dynamic environments, translating complex requirements into actionable workflows. My leadership extends beyond code: I’ve shaped high-performing teams through technical interviews, on-boarding mentorship, and fostering a culture of continuous growth.';
  public introText: any;
  public mobileMode = false;

  constructor(
    private contentfulService: ContentfulService,
    private responsiveService: ResponsiveService
  ) {
    effect(() => {
      if (this.error()) {
        console.error('Contentful error');
      }
    });
  }

  ngOnInit() {
    this.isMobile$ = this.responsiveService.isMobile$;
    this.isDesktop$ = this.responsiveService.isDesktop$;
    this.fetchContent();
  }

  private fetchContent() {
    this.loading.set(true);
    this.error.set(false);

    this.contentfulService
      .getEntries('introduction')
      .then((data: any) => {
        if (data.items[0].fields.introductionText) {
          this.introText = documentToHtmlString(
            data.items[0].fields.introductionText
          );
        } else {
          this.introText = this.defaultIntro;
        }
      })
      .catch((error) => {
        this.introText = this.defaultIntro;
        this.error.set(true);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
