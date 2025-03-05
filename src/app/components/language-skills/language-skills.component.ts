import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-skills',
  imports: [CommonModule],
  templateUrl: './language-skills.component.html',
  styleUrl: './language-skills.component.scss',
})
export class LanguageSkillsComponent implements OnInit {
  public languageSkillsData: any;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService.getEntries('languageSkill').then((entries: any) => {
      this.languageSkillsData = entries.items
        .map((skill: any) => skill.fields)
        .sort(
          (skillA: any, skillB: any) => skillB.proficiency - skillA.proficiency
        );
    });
  }

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
