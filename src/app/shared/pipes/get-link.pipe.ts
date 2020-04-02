import { Pipe, PipeTransform } from '@angular/core';
import { ProductsWebImageGallery } from '../interfaces';

@Pipe({
  name: 'getLink'
})
export class GetLinkPipe implements PipeTransform {

  transform(value: ProductsWebImageGallery, args: { orgId: number, imageFolder: string, imageName: string }): unknown {
    const link = this.getImageLink(args.orgId, args.imageFolder, args.imageName);

    return link;
  }

  getImageLink(orgId: number, imageFolder: string, imageName: string) {
    // https://secure.amax.co.il/Upload/153P/LogoFileName1/logo.jpg // EXAMPLE
    const imageLink = `https://secure.amax.co.il/Upload/${orgId}P/${imageFolder}/${imageName}`;
    return imageLink;
  }
}
