import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDAndD } from '@fortawesome/free-brands-svg-icons';
import {
  faGamepad,
  faRecordVinyl,
  faCameraRetro,
  faFilm,
  faBook,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hobbies',
  imports: [CommonModule, LoadingSpinnerComponent, FontAwesomeModule],
  providers: [ContentfulService, LoadingService],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.scss',
})
export class HobbiesComponent implements OnInit {
  public isLoading: boolean = true;
  public faDAndD = faDAndD;
  public faGamepad = faGamepad;
  public faRecordVinyl = faRecordVinyl;
  public faCameraRetro = faCameraRetro;
  public faFilm = faFilm;
  public hobbiesData: any = [];

  constructor(
    private loadingService: LoadingService,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit() {
    this.loadingService.show();

    this.contentfulService
      .getEntries('hobbies')
      .then((entries: any) => {
        this.hobbiesData = entries.items
          .map((entry: any) => entry.fields)
          .map((hobby: any) => {
            const hobbyObj = {
              hobbyName: hobby.hobbyName,
              hobbyIcon: this.getMatchingIcon(hobby.hobbyName),
            };
            return hobbyObj;
          });
        console.log(this.hobbiesData);
      })
      .catch((error) => (this.hobbiesData = []))
      .finally(() => {
        this.loadingService.hide();
        this.isLoading = false;
      });
  }

  private getMatchingIcon(hobbyName: string) {
    if (hobbyName === 'Video Games') {
      return faGamepad;
    } else if (hobbyName === 'TableTop RPGs') {
      return faDAndD;
    } else if (hobbyName === 'Photography') {
      return faCameraRetro;
    } else if (hobbyName === 'Music') {
      return faRecordVinyl;
    } else if (hobbyName === 'Movies') {
      return faFilm;
    } else if (hobbyName === 'Books') {
      return faBook;
    } else {
      return faGamepad;
    }
  }
}
