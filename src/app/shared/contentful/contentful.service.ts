import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { createClient, ContentfulClientApi } from 'contentful';
import { environment } from '../../../environments/environment';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client: ContentfulClientApi<any> = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token,
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (environment.production && isPlatformServer(this.platformId)) {
      try {
        // Server-side only
        let serverConfig: any;
        serverConfig = require('/var/www/cv/server-config/contentful.js');
        this.client = createClient({
          space: serverConfig.spaceId,
          accessToken: serverConfig.accessToken,
        });
      } catch (e) {
        console.error('Server config missing:', e);
      }
    } else {
      this.client = createClient({
        space: environment.contentful.spaceId,
        accessToken: environment.contentful.token,
      });
    }
  }

  // retrieves content mapped to its data fields
  getEntry(entryId: string): Promise<any> {
    const entry = this.client.getEntry(entryId);
    return entry;
  }

  // retrieves content mapped to its data fields
  getEntries(contentType: string): Promise<any> {
    const entries = this.client.getEntries(
      Object.assign({ content_type: contentType })
    );
    return entries;
  }
}
