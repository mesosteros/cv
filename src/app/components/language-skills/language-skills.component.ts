import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ContentfulService } from '../../shared/contentful/contentful.service';

@Component({
  selector: 'app-language-skills',
  imports: [CommonModule],
  providers: [ContentfulService],
  templateUrl: './language-skills.component.html',
  styleUrl: './language-skills.component.scss',
})
export class LanguageSkillsComponent implements OnInit {
  @Input() languageSkillsData: any = [];

  constructor() {}

  ngOnInit() {}

  getSkillLevelString(level: number): string {
    if (level === 5) {
      return 'Native';
    } else if (level === 4) {
      return 'Fluent';
    } else if (level === 3) {
      return 'Advanced';
    } else if (level === 2) {
      return 'Intermediate';
    } else if (level === 1) {
      return 'Basic';
    } else {
      return 'Unknown';
    }
  }
}
