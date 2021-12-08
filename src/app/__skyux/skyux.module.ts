// DO NOT MODIFY
// This file is handled by the '@blackbaud-internal/skyux-angular-builders' library.

import {
  CommonModule
} from '@angular/common';

import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import {
  SkyAuthHttpClientModule,
  SkyAuthModule,
  SkyAuthTokenProvider
} from '@blackbaud-internal/skyux-auth';

import {
  SkyShellModule
} from '@blackbaud-internal/skyux-shell';

import {
  RuntimeConfig,
  SkyAppConfig,
  SkyAppRuntimeConfigParams,
  SkyuxConfig
} from '@skyux/config';

import skyAppConfigJson from './skyappconfig.json';
const skyAppConfig: {
  runtime: RuntimeConfig,
  skyux: SkyuxConfig & {
    experiments: any
  }
} = skyAppConfigJson as any;

import assetsMap from './app-assets-map.json';

skyAppConfig.skyux.params = skyAppConfig.skyux.params || {};

const runtimeParams = new SkyAppRuntimeConfigParams(
  window.location.href,
  skyAppConfig.skyux.params
);

@NgModule({
  exports: [
    SkyAuthHttpClientModule,
    SkyShellModule
  ],
  imports: [
    CommonModule,
    SkyAuthModule.forRoot({
      blackbaudEmployee: skyAppConfig.skyux.authSettings?.blackbaudEmployee,
      enabled: !!skyAppConfig.skyux.auth
    }),
    SkyShellModule.forRoot({
      assetsMap,
      omnibarEnabled: skyAppConfig.skyux.omnibar && runtimeParams.get('addin') !== '1'
    })
  ]
})
export class SkyuxModule {

  // Prevent this module from being imported more than once.
  // @see: https://angular.io/guide/singleton-services#prevent-reimport-of-the-greetingmodule
  constructor(
    @Optional() @SkipSelf() parentModule?: SkyuxModule
  ) {
    if (parentModule) {
      throw new Error(
        'SkyuxModule is already loaded. Import it in the AppModule only.'
      );
    }
  }

  public static forRoot(): ModuleWithProviders<SkyuxModule> {
    return {
      ngModule: SkyuxModule,
      providers: [
        SkyAuthTokenProvider,
        {
          provide: SkyAppConfig,
          useFactory: () => {
            const config = new SkyAppConfig();
            config.runtime = skyAppConfig.runtime;
            config.skyux = skyAppConfig.skyux;

            config.runtime.params = runtimeParams;

            return config;
          },
        },
      ]
    };
  }
}
