import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-soft-skills',
  imports: [CommonModule, MatChipsModule],
  templateUrl: './soft-skills.component.html',
  styleUrl: './soft-skills.component.scss',
})
export class SoftSkillsComponent implements OnInit {
  @Input() softSkillsData: any = [];

  constructor() {}

  ngOnInit() {}
}
