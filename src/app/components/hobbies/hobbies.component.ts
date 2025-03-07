import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDAndD } from '@fortawesome/free-brands-svg-icons';
import {
  faGamepad,
  faRecordVinyl,
  faCameraRetro,
  faFilm,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { SeoService } from '../../shared/seo/seo.service';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

const canonicalUrl = `${environment.hostUrl}/hobbies`;

@Component({
  selector: 'app-hobbies',
  imports: [CommonModule, LoadingSpinnerComponent, FontAwesomeModule],
  providers: [ContentfulService, LoadingService, SeoService],
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
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private seoService: SeoService,
    private contentfulService: ContentfulService,
    private state: TransferState,
    private meta: Meta
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      const url: any = this.state.get(
        this.seoService.CANONICAL_URL_KEY,
        canonicalUrl
      );
      if (isPlatformBrowser(this.platformId)) {
        this.seoService.setCanonicalURL(this.document.URL);
      }
      this.meta.updateTag({ rel: 'canonical', href: url });
    }
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
