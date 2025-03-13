import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnChanges {
  @Input() hideSideMenu = true;
  @Output() linkClicked = new EventEmitter<void>();
  mobileMode = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hideSideMenu']) {
      this.mobileMode = !changes['hideSideMenu'].currentValue;
    }
  }

  onLinkClicked() {
    this.linkClicked.emit();
  }
}
