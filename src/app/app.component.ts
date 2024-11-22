import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  afterNextRender,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SeoService } from './shared/seo/seo.service';
@AutoUnsubscribe()
@Component({
    selector: 'app-root',
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
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {}

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
