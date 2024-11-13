import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-reel',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-reel.component.html',
  styleUrl: './card-reel.component.scss',
})
export class CardReelComponent {
  cardItems = [
    { id: 1, title: 'test 1', description: 'testing' },
    { id: 2, title: 'test 2', description: 'testing' },
    { id: 3, title: 'test 3', description: 'testing' },
  ];
}
