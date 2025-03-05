import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { SeoService } from '../../shared/seo/seo.service';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { CommonModule, isPlatformServer } from '@angular/common';
import {
  CloudData,
  CloudOptions,
  TagCloudComponent,
} from 'angular-tag-cloud-module';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, TagCloudComponent],
  providers: [SeoService],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements OnInit {
  public softSkillsData: any;
  public techSkillsData: any;
  public languageSkillsData: any;

  options: CloudOptions = {
    overflow: false,
  };

  wordCloudData: CloudData[] = [];

  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
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

    this.contentfulService.getEntries('softSkills').then((entries: any) => {
      this.softSkillsData = entries.items.map((skill: any) => skill.fields);
      this.wordCloudData = this.softSkillsData.map((skill: any) => {
        const skillCloud = {
          text: skill.title,
          weight: skill.weight,
          tooltip: skill.tooltip ? skill.tooltip : null,
          color: skill.color
            ? skill.color
            : '#' + Math.floor(Math.random() * 16777215).toString(16),
        };
        return skillCloud;
      });
    });

    this.contentfulService.getEntries('skills').then((entries: any) => {
      this.techSkillsData = entries.items
        .map((skill: any) => skill.fields)
        .sort((skillA: any, skillB: any) =>
          skillA.title.localeCompare(skillB.title)
        );
    });

    this.contentfulService.getEntries('languageSkill').then((entries: any) => {
      this.languageSkillsData = entries.items
        .map((skill: any) => skill.fields)
        .sort(
          (skillA: any, skillB: any) => skillB.proficiency - skillA.proficiency
        );
    });
  }

  getSkillLevelString(level: number): string {
    if (level === 5) {
      return 'Native';
    } else if (level === 4) {
      return 'Fluent';
    } else if (level === 3) {
      return 'Advanced';
    } else if (level === 2) {
      return 'Intermediate';
    } else if (level === 1) {
      return 'Basic';
    } else {
      return 'Unknown';
    }
  }
}
