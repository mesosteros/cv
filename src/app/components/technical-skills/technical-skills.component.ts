import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-technical-skills',
  imports: [CommonModule],
  templateUrl: './technical-skills.component.html',
  styleUrl: './technical-skills.component.scss',
})
export class TechnicalSkillsComponent implements OnInit {
  @Input() techSkillsData: any = [];

  constructor() {}

  ngOnInit() {}
}
