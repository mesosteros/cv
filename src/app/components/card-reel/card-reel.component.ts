import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-card-reel',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-reel.component.html',
  styleUrl: './card-reel.component.scss',
})
export class CardReelComponent implements OnInit, OnDestroy {
  cardItems = [
    { id: 1, title: 'test 1', description: 'testing' },
    { id: 2, title: 'test 2', description: 'testing' },
    { id: 3, title: 'test 3', description: 'testing' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
