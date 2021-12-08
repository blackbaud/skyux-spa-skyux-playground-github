import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  SkyPagesModule
} from './sky-pages.module';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  HttpClientModule
} from '@angular/common/http';
import { SkyuxModule } from './__skyux';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SkyPagesModule,
    BrowserModule,
    AppRoutingModule,
    SkyuxModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
