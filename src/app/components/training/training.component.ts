import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training',
  imports: [CommonModule, LoadingSpinnerComponent],
  providers: [ContentfulService],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent implements OnInit {
  public isLoading: boolean = true;
  public trainingData: any = [];

  constructor(
    private loadingService: LoadingService,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();

    this.contentfulService
      .getEntries('training')
      .then((entries: any) => {
        this.trainingData = entries.items
          .map((trainingEntry: any) => trainingEntry.fields)
          .sort((trainingA: any, trainingB: any) =>
            trainingA.trainingGroup.localeCompare(trainingB.trainingGroup)
          );
      })
      .catch((error) => (this.trainingData = []))
      .finally(() => {
        this.loadingService.hide();
        this.isLoading = false;
      });
  }
}
