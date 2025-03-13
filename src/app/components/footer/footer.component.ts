import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBluesky,
  faGithub,
  faLinkedin,
  faTwitch,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
  public faEnvelope = faEnvelope;
}
