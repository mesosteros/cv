import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
})
export class SkillsComponent implements OnInit {
  public skillsData: any;

  options: CloudOptions = {
    overflow: false,
  };

  data: CloudData[] = [];

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

    this.contentfulService.getEntries('skills').then((entries: any) => {
      this.skillsData = entries.items.map((skill: any) => skill.fields);
      this.data = this.skillsData.map((skill: any) => {
        const skillCloud = {
          text: skill.title,
          weight: skill.weight,
          link: skill.link ? skill.link : null,
          tooltip: skill.tooltip ? skill.tooltip : null,
          external: skill.link ? true : false,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        };
        return skillCloud;
      });
      console.log(this.skillsData[0].title);
    });
  }
}
