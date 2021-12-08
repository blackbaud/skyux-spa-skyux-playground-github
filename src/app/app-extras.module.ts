import {
  NgModule
} from '@angular/core';

import {
  AppSkyModule
} from './app-sky.module';

/**
 * @deprecated Provided services, imported modules, etc. should be moved to
 * their respective feature modules, and this module should be removed.
 */
@NgModule({
  exports: [
    AppSkyModule
  ]
})
export class AppExtrasModule { }
