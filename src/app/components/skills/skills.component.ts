import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { SeoService } from '../../shared/seo/seo.service';
import { CommonModule, isPlatformServer } from '@angular/common';
import { TechnicalSkillsComponent } from '../technical-skills/technical-skills.component';
import { SoftSkillsComponent } from '../soft-skills/soft-skills.component';
import { LanguageSkillsComponent } from '../language-skills/language-skills.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LoadingService } from '../../shared/loading/loading.service';
import { ContentfulService } from '../../shared/contentful/contentful.service';

@Component({
  selector: 'app-skills',
  imports: [
    CommonModule,
    TechnicalSkillsComponent,
    SoftSkillsComponent,
    LanguageSkillsComponent,
    LoadingSpinnerComponent,
  ],
  providers: [SeoService, ContentfulService],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  loadedData = 0;
  public isLoading: boolean = true;
  public techSkillsData: any = [];
  public languageSkillsData: any = [];
  public softSkillsData: any = [];

  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private loadingService: LoadingService,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.seoService.updateMetaTags(
        'Skills',
        'Front-End Tech Manager | Angular Expert | Delivering innovative web solutions',
        'path/to/your/image.png'
      );
    }
    this.fetchData();
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
