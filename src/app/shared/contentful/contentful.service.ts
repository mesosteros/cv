import {
  Inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { createClient, ContentfulClientApi } from 'contentful';
import { environment } from '../../../environments/environment';
import { isPlatformServer } from '@angular/common';

const CONTENTFUL_DATA_KEY = makeStateKey<any>('contentfulData');
@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client: ContentfulClientApi<any>;

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const accessToken: any = isPlatformServer(this.platformId)
      ? process.env['CONTENTFUL_ACCESS_TOKEN']
      : environment.contentful.token;

    this.client = createClient({
      space: environment.contentful.spaceId,
      accessToken,
    });
  }

  // retrieves content mapped to its data fields
  async getEntry(entryId: string): Promise<any> {
    const cachedData = this.transferState.get(CONTENTFUL_DATA_KEY, null);

    if (cachedData) {
      return cachedData; // Client-side: use cached data
    }

    const entry = await this.client.getEntry(entryId);

    if (isPlatformServer(this.platformId)) {
      this.transferState.set(CONTENTFUL_DATA_KEY, entry); // Server-side cache
    }

    return entry;
  }

  // retrieves content mapped to its data fields
  async getEntries(contentType: string): Promise<any> {
    const cachedData = this.transferState.get(CONTENTFUL_DATA_KEY, null);

    if (cachedData) {
      return cachedData; // Client-side: use cached data
    }

    const entries = await this.client.getEntries({ content_type: contentType });

    if (isPlatformServer(this.platformId)) {
      this.transferState.set(CONTENTFUL_DATA_KEY, entries); // Server-side cache
    }

    return entries;
  }
}
