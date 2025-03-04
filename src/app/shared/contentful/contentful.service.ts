import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from '../../../environments/environment';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = contentful.createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token,
  });
  constructor() {}

  // console logs a response for debugging
  logContent(contentId: string) {
    return this.client
      .getEntries(Object.assign({ content_type: 'landingPage' }))
      .then((entry) => console.log(entry.items));
  }

  // retrieves content mapped to its data fields
  getContent(contentId: string): Observable<any> {
    const promise = this.client.getEntries(
      Object.assign({ content_type: contentId })
    );

    return from(promise).pipe(
      map((entry: any) => {
        console.log(entry.items);
        return entry.items;
      })
    );
  }
}
