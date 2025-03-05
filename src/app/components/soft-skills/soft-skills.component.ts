import { Component, OnInit } from '@angular/core';
import {
  CloudData,
  CloudOptions,
  TagCloudComponent,
} from 'angular-tag-cloud-module';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soft-skills',
  imports: [CommonModule, TagCloudComponent],
  templateUrl: './soft-skills.component.html',
  styleUrl: './soft-skills.component.scss',
})
export class SoftSkillsComponent implements OnInit {
  public softSkillsData: any;

  options: CloudOptions = {
    overflow: false,
  };

  wordCloudData: CloudData[] = [];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService.getEntries('softSkills').then((entries: any) => {
      this.softSkillsData = entries.items.map((skill: any) => skill.fields);
      this.wordCloudData = this.softSkillsData.map((skill: any) => {
        const skillCloud = {
          text: skill.title,
          weight: skill.weight,
          tooltip: skill.tooltip ? skill.tooltip : null,
          color: skill.color
            ? skill.color
            : '#' + Math.floor(Math.random() * 16777215).toString(16),
        };
        return skillCloud;
      });
    });
  }
}
