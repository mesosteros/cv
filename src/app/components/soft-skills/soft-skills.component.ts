import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  CloudData,
  CloudOptions,
  TagCloudComponent,
} from 'angular-tag-cloud-module';

@Component({
  selector: 'app-soft-skills',
  imports: [CommonModule, TagCloudComponent],
  templateUrl: './soft-skills.component.html',
  styleUrl: './soft-skills.component.scss',
})
export class SoftSkillsComponent implements OnInit {
  @Input() softSkillsData: any = [];
  @Input() wordCloudData: CloudData[] = [];

  options: CloudOptions = {
    width: 500,
    height: 300,
    overflow: false,
  };

  constructor() {}

  ngOnInit() {}
}
