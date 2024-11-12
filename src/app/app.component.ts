import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SeoService } from './shared/seo/seo.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [SeoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'cv';

  hideSideMenu = true;
  private renderer = inject(Renderer2);
  private rendererFactory = inject(RendererFactory2);

  constructor(
    private responsive: BreakpointObserver,
    private seoService: SeoService
  ) {
    afterNextRender(() => {
      this.renderer = this.rendererFactory.createRenderer(null, null);
      this.addStructuredData();
    });
  }

  ngOnInit() {
    this.seoService.updateMetaTags(
      'Home',
      'Front-End Tech Manager | Angular Expert | Delivering innovative web solutions',
      'path/to/your/image.png'
    );

    this.responsive
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.WebPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletLandscape,
      ])
      .subscribe((result) => {
        this.hideSideMenu = true;

        if (result.matches) {
          this.hideSideMenu = false;
        }
      });
  }

  addStructuredData() {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = `
    {
      "@context": "http://carlosesantos.com",
      "@type": "Personal",
      "name": "Carlos Ermida Santos",
      "url": "https://carlosesantos.com",
      "logo": "https://carlosesantos.com/logo.png",
      "description": "Front-End Tech Manager | Angular Expert | Delivering innovative web solutions"
    }`;

    this.renderer.appendChild(document.head, script);
  }
}
