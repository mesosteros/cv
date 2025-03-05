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

@Component({
  selector: 'app-skills',
  imports: [
    CommonModule,
    TechnicalSkillsComponent,
    SoftSkillsComponent,
    LanguageSkillsComponent,
  ],
  providers: [SeoService],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.seoService.updateMetaTags(
        'Skills',
        'Front-End Tech Manager | Angular Expert | Delivering innovative web solutions',
        'path/to/your/image.png'
      );
    }
  }
}
