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
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  hideSideMenu = true;
  private renderer = inject(Renderer2);
  private rendererFactory = inject(RendererFactory2);

  constructor(private responsive: BreakpointObserver) {
    afterNextRender(() => {
      this.renderer = this.rendererFactory.createRenderer(null, null);
      this.addStructuredData();
    });
  }

  ngOnInit() {
    this.responsive
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.WebPortrait,
        Breakpoints.Small,
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
      "@context": "http://www.carlosesantos.com",
      "@type": "Personal",
      "name": "Carlos Santos - Front-End Tech Manager | Angular Expert",
      "url": "https://www.carlosesantos.com",
      "logo": "https://www.carlosesantos.com/favicon.ico",
      "description": "Tech Manager (10+ yrs) specializing in Angular. Leads teams, architects solutions, and mentors development in JavaScript frameworks"
    }`;

    this.renderer.appendChild(document.head, script);
  }
}
