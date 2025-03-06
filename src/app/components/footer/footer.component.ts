import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLinkedin,
  faGithub,
  faTwitch,
  faBluesky,
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public year = new Date().getFullYear();
  public faLinkedin = faLinkedin;
  public faGithub = faGithub;
  public faTwitch = faTwitch;
  public faBluesky = faBluesky;
}
