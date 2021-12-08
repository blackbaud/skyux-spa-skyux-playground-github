// DO NOT MODIFY
// This file is handled by the '@blackbaud-internal/skyux-angular-builders' library.

import { NgModule } from '@angular/core';
import { SkyAppSetTitleArgs, SkyAppTitleService } from '@skyux/core';
import { SkyAppResourcesService } from '@skyux/i18n';
import { SkyAppStyleLoader } from '@skyux/theme';

import { AppModule } from '../../app.module';

import { SkyAppResourcesTestService } from './sky-app-resources-test.service';

@NgModule({
  imports: [AppModule],
  providers: [
    {
      provide: SkyAppResourcesService,
      useClass: SkyAppResourcesTestService
    },
    {
      provide: SkyAppStyleLoader,
      useFactory: () => {
        return {
          loadStyles(): Promise<void> {
            return Promise.resolve();
          }
        };
      }
    },
    {
      provide: SkyAppTitleService,
      useFactory: () => {
        return {
          setTitle(args: SkyAppSetTitleArgs): void {}
        };
      }
    }
  ]
})
export class SkyAppTestModule {}
