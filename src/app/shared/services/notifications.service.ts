import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
      providedIn: 'root'
})
export class NotificationsService {
      constructor(
            private toastrService: ToastrService,
            // private translate: TranslationService,
            private matDialog: MatDialog
      ) {
      }
      success(message?: string, title?: string) {
            this.toastrService.success(message, title);
      }

      warn(message?: string, title?: string) {
            this.toastrService.warning(message, title)
      }

      error(message?: string, title?: string) {
            this.toastrService.error(message, title)
      }

      info(message?: string, title?: string) {
            this.toastrService.info(message, title);
      }

}