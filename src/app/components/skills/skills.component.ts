import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import { TechnicalSkillsComponent } from '../technical-skills/technical-skills.component';
import { SoftSkillsComponent } from '../soft-skills/soft-skills.component';
import { LanguageSkillsComponent } from '../language-skills/language-skills.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LoadingService } from '../../shared/loading/loading.service';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { SeoService } from '../../shared/seo/seo.service';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

const canonicalUrl = `${environment.hostUrl}/skills`;

@Component({
  selector: 'app-skills',
  imports: [
    CommonModule,
    TechnicalSkillsComponent,
    SoftSkillsComponent,
    LanguageSkillsComponent,
    LoadingSpinnerComponent,
  ],
  providers: [ContentfulService, SeoService],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit, AfterViewInit {
  loadedData = 0;
  public isLoading: boolean = true;
  public techSkillsData: any = [];
  public languageSkillsData: any = [];
  public softSkillsData: any = [];

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
      this.seoService.updateTitleServer('Skills');
      this.seoService.updateCanonicalURLserver(url);
    }

    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.seoService.updateTitleServer('Skills');
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setCanonicalURL(this.document.URL);
    }
  }

  private async fetchData() {
    this.loadingService.show();
    try {
      const [techData, langData, softData] = await Promise.all([
        this.contentfulService.getEntries('skills'),
        this.contentfulService.getEntries('languageSkill'),
        this.contentfulService.getEntries('softSkills'),
      ]);
      this.getTechnicalSkills(techData);
      this.getLanguageSkills(langData);
      this.getSoftSkills(softData);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      this.loadingService.hide();
      this.isLoading = false;
    }
  }

  private getTechnicalSkills(techData: any) {
    this.techSkillsData = techData.items
      .map((skill: any) => skill.fields)
      .sort((skillA: any, skillB: any) =>
        skillA.title.localeCompare(skillB.title)
      );
  }

  private getLanguageSkills(langData: any) {
    this.languageSkillsData = langData.items
      .map((skill: any) => skill.fields)
      .sort(
        (skillA: any, skillB: any) => skillB.proficiency - skillA.proficiency
      );
  }

  private getSoftSkills(softData: any) {
    this.softSkillsData = softData.items.map((skill: any) => skill.fields);
  }
}
