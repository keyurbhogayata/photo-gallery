import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryDashboardComponent } from './components/gallery-dashboard/gallery-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ImageGridComponent } from './components/image-grid/image-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { InMemoryDataService } from './services/in-memory-data.service'; 
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddImageComponent } from './components/add-image/add-image.component';
@NgModule({ declarations: [
        AppComponent,
        GalleryDashboardComponent,
        NavbarComponent,
        ImageGridComponent,
        FooterComponent,
        ImageViewComponent,
        AboutComponent,
        NotfoundComponent,
        CategoriesComponent,
        AddImageComponent,
    ],
    bootstrap: [AppComponent],
    exports: [RouterModule], imports: [FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
