import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
  effect,
  signal,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDAndD } from '@fortawesome/free-brands-svg-icons';
import {
  faBook,
  faCameraRetro,
  faFilm,
  faGamepad,
  faRecordVinyl,
} from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { ContentfulService } from '../../shared/contentful/contentful.service';
import { SeoService } from '../../shared/seo/seo.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

const canonicalUrl = `${environment.hostUrl}/hobbies`;

@Component({
  selector: 'app-hobbies',
  imports: [CommonModule, LoadingSpinnerComponent, FontAwesomeModule],
  providers: [ContentfulService, SeoService],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.scss',
})
export class HobbiesComponent implements OnInit, AfterViewInit {
  public isLoading: boolean = true;
  public faDAndD = faDAndD;
  public faGamepad = faGamepad;
  public faRecordVinyl = faRecordVinyl;
  public faCameraRetro = faCameraRetro;
  public faFilm = faFilm;
  public hobbiesData: any = [];
  public loading = signal(false);
  public error = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private seoService: SeoService,
    private contentfulService: ContentfulService,
    private state: TransferState
  ) {
    effect(() => {
      if (this.error()) {
        console.error('Contentful error');
      }
    });
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      const url: any = this.state.get(
        this.seoService.CANONICAL_URL_KEY,
        canonicalUrl
      );
      if (isPlatformBrowser(this.platformId)) {
        this.seoService.setCanonicalURL(this.document.URL);
      }
      this.seoService.updateTitleServer('Hobbies');
      this.seoService.updateCanonicalURLserver(url);
    }
    this.fetchContent();
  }

  ngAfterViewInit(): void {
    this.seoService.updateTitleServer('Hobbies');
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setCanonicalURL(this.document.URL);
    }
  }

  private fetchContent() {
    this.loading.set(true);
    this.error.set(false);
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
      .catch((error) => {
        this.hobbiesData = [];
        this.error.set(true);
      })
      .finally(() => {
        this.loading.set(false);
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
