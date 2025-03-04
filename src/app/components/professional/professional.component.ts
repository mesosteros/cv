import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { ResponsiveService } from '../../shared/responsive/responsive.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Component({
  selector: 'app-professional',
  imports: [],
  templateUrl: './professional.component.html',
  styleUrl: './professional.component.scss',
})
export class ProfessionalComponent implements OnInit {
  isMobile$!: Observable<boolean>;
  isDesktop$!: Observable<boolean>;
  public isLoading: boolean = true;
  public mobileMode = false;
  public professionalData: any;

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
        const professionalData = data.items
          .filter((item: any) => item.fields.title === 'Experience')
          .map((professionalData: any) => professionalData.fields);
        this.professionalData = professionalData[0];
      })
      .catch((error) => (this.professionalData = []))
      .finally(() => {
        this.loadingService.hide();
        this.isLoading = false;
      });
  }
}
