import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../shared/seo/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [SeoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags(
      'Home',
      'Front-End Tech Manager | Angular Expert | Delivering innovative web solutions',
      'path/to/your/image.png'
    );
  }
}
