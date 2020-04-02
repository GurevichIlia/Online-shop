import { MainPageService, MainBannerImages, MainBannerImage } from './../../../shared/services/main-page.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {
  banners = [{ id: 1, name: 'Carousel' }, { id: 2, name: 'Images' }];
  selectedBanner = new FormControl(this.banners[0].id);
  sliderImage: string | ArrayBuffer = 'https://via.placeholder.com/900x600';
  smallBannerImage: string | ArrayBuffer = 'https://via.placeholder.com/480x280';
  form: FormGroup;
  existingBanners$: Observable<MainBannerImage[]>;
  logoImage: File;
  constructor(
    private notifications: NotificationsService,
    private fb: FormBuilder,
    private mainPageService: MainPageService,
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.getMainBannerImages();
  }

  get bannerType() {
    return this.form.get('bannerType');
  }

  set color(color: string) {
    this.form.get('textColor').patchValue(color);
  }

  get color() {
    return this.form.get('textColor').value;
  }

  getMainBannerImages() {
    this.existingBanners$ = this.selectedBanner.valueChanges
      .pipe(startWith(this.selectedBanner.value), switchMap(bannerType => this.mainPageService.getMainBannerImages()
        .pipe(map(images => bannerType === 1 ? images.carouselImages : images.images))));

  }

  createForm() {
    this.form = this.fb.group({
      bannerType: [''],
      image: ['', Validators.required],
      title: [''],
      subtitle: [''],
      content: [''],
      link: [''],
      textColor: ['white']
    });
  }

  onChange(file: File) {
    console.log(file);
    if (file && !(file.type.match(/image\/*/) == null)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.selectedBanner.value === 1 ? this.sliderImage = reader.result : this.smallBannerImage = reader.result;
        const image = reader.result;
        this.form.get('image').patchValue(image);
        this.logoImage = file;
      };

    } else {
      this.notifications.warn('Type is not correct. Please select image');
      // SHOW ERROR NOT CORRECT FORMAT
    }
  }

  uploadFile() {
    // if (this.form.valid) {
    //   if (this.selectedBanner.value === 1) {
    //     this.bannerType.patchValue(this.selectedBanner)
    //     this.mainPageService.addMainBannerImage({ ...this.form.value, bannerType: this.selectedBanner.value }, 'carouselImages');
    //     this.sliderImage = 'https://via.placeholder.com/900x600';
    //   } else if (this.selectedBanner.value === 2) {
    //     this.bannerType.patchValue(this.selectedBanner);
    //     this.mainPageService.addMainBannerImage({ ...this.form.value, bannerType: this.selectedBanner.value }, 'images');
    //     this.smallBannerImage = 'https://via.placeholder.com/480x280';
    //   }

    //   this.form.reset();
    // } else {
    //   this.notifications.warn('', 'Please add image');
    // }
    // console.log('FILE', this.form.value);

    this.mainPageService.uploadLogoImage(this.logoImage)
      .subscribe(res => {

        console.log('AFTER UPLOAD LOGO', res);
      })
  }


  onEdit(banner: MainBannerImage) {

  }

  onDelete(id: number) {
    if (this.selectedBanner.value === 1) {
      this.mainPageService.onDeleteImage(id, 'carouselImages');
    }
    if (this.selectedBanner.value === 2) {
      this.mainPageService.onDeleteImage(id, 'images');
    }

  }

}
