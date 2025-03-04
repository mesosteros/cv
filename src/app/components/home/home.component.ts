import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { SeoService } from '../../shared/seo/seo.service';
import { IntroComponent } from '../intro/intro.component';

@Component({
  selector: 'app-home',
  imports: [IntroComponent],
  providers: [SeoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.seoService.updateMetaTags(
        'Home',
        'Front-End Tech Manager | Angular Expert | Delivering innovative web solutions',
        'path/to/your/image.png'
      );
    }
  }
}
