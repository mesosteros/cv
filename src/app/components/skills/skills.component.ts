import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CardReelComponent } from '../card-reel/card-reel.component';
import { SeoService } from '../../shared/seo/seo.service';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { CommonModule, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, CardReelComponent],
  providers: [SeoService],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  public skillsData: any;
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
    this.skillsData = this.contentfulService.getEntries('skills');
  }
}
