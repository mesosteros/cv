import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLinkedin,
  faGithub,
  faTwitch,
  faBluesky,
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnChanges {
  @Input() hideSideMenu = true;
  mobileMode = false;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faTwitch = faTwitch;
  faBluesky = faBluesky;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hideSideMenu']) {
      this.mobileMode = !changes['hideSideMenu'].currentValue;
    }
  }
}
