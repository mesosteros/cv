import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    // Parse Markdown to HTML
    const html = marked.parse(value) as string;
    // Sanitize HTML to prevent XSS
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
