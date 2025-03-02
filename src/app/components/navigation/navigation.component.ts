import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnChanges {
  @Input() hideSideMenu = true;
  mobileMode = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hideSideMenu']) {
      this.mobileMode = !changes['hideSideMenu'].currentValue;
    }
  }
}
