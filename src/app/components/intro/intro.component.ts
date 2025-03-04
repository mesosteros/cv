import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { CommonModule } from '@angular/common';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { ResponsiveService } from '../../shared/responsive/responsive.service';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/loading/loading.service';
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
  public isLoading: boolean = true;

  public defaultIntro: string =
    'With 10+ years of hands-on experience in web projects, I bridge technical excellence and leadership as a Front-End Tech Manager. My expertise centers on modern JavaScript frameworks, particularly Angular, where I’ve architected scalable solutions and mentored teams to deliver polished, user-centric products. As a Tech Manager and Agile Scrum advocate, I thrive in dynamic environments, translating complex requirements into actionable workflows. My leadership extends beyond code: I’ve shaped high-performing teams through technical interviews, on-boarding mentorship, and fostering a culture of continuous growth.';
  public introText: any;
  public mobileMode = false;

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
      .catch((error) => (this.introText = this.defaultIntro))
      .finally(() => {
        this.loadingService.hide();
        this.isLoading = false;
      });
  }
}
