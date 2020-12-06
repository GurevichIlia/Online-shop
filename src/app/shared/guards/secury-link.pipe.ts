import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'securyLink'
})
export class SecuryLinkPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {

  }

  transform(link: string, ...args: unknown[]): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(link);

  }

}
