import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { marked } from 'marked';

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
    this.client.getEntry(contentId).then((entry) => console.log(entry));
  }

  // retrieves content mapped to its data fields
  getContent(contentId: string) {
    const promise = this.client.getEntry(contentId);
    return Observable.fromPromise(promise).map((entry: any) => entry.fields);
  }

  // convert markdown string to
  markdownToHtml(md: string) {
    return marked(md);
  }
}
