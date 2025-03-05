import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../shared/contentful/contentful.service';

@Component({
  selector: 'app-technical-skills',
  imports: [CommonModule],
  templateUrl: './technical-skills.component.html',
  styleUrl: './technical-skills.component.scss',
})
export class TechnicalSkillsComponent implements OnInit {
  public techSkillsData: any;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService.getEntries('skills').then((entries: any) => {
      this.techSkillsData = entries.items
        .map((skill: any) => skill.fields)
        .sort((skillA: any, skillB: any) =>
          skillA.title.localeCompare(skillB.title)
        );
      console.log(this.techSkillsData);
    });
  }
}
