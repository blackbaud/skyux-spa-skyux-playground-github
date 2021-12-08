import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  AboutComponent
} from './about/about.component';

import {
  HomeComponent
} from './home.component';

import {
  AppNavComponent
} from './shared/app-nav.component';

import {
  AboutRouteIndexComponent
} from './about/index.component';

import {
  RootRouteIndexComponent
} from './index.component';

import {
  NotFoundComponent
} from './not-found.component';

import {
  AppExtrasModule
} from './app-extras.module';

/**
 * @deprecated This module was migrated from SKY UX Builder v.4.
 * It is highly recommended that this module be factored-out into separate, lazy-loaded feature modules.
 */
@NgModule({
  imports: [
    AppExtrasModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SkyAppLinkModule,
    SkyI18nModule
  ],
  declarations: [
    AboutComponent,
    AboutRouteIndexComponent,
    AppNavComponent,
    HomeComponent,
    NotFoundComponent,
    RootRouteIndexComponent
  ],
  exports: [
    AppExtrasModule,
    AboutComponent,
    AppNavComponent,
    HomeComponent,
    NotFoundComponent,
    RootRouteIndexComponent
  ]
})
export class SkyPagesModule { }
