import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = contentful.createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token,
  });
  constructor() {}

  // retrieves content mapped to its data fields
  getEntry<T>(entryId: string): Promise<any> {
    return this.client.getEntry(entryId);
  }

  // retrieves content mapped to its data fields
  getEntries(contentId: string): Promise<any> {
    return this.client.getEntries(Object.assign({ content_type: contentId }));
  }
}
