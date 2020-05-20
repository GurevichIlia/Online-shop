import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Import your library
@NgModule({
  declarations: [
    AppComponent,

  ],
  
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'he',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(), // ToastrModule added
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule // import NgxUiLoaderRouterModule. By default, it will show foreground loader.
    // If you need to show background spinner, do as follow:
    // NgxUiLoaderRouterModule.forRoot({ showForeground: false })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
