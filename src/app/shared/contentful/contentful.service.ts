import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client: any;

  constructor() {
    this.client = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.token,
    });
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
