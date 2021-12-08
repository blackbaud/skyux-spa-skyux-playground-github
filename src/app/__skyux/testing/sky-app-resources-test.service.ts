// DO NOT MODIFY
// This file is handled by the '@blackbaud-internal/skyux-angular-builders' library.

import { Injectable } from '@angular/core';
import { SkyAppLocaleInfo, SkyAppResources } from '@skyux/i18n';
import { forkJoin, Observable, of as observableOf } from 'rxjs';

import RESOURCES from './test-resources.json';

type ResourceKey = string;
type TemplatedResource = [ResourceKey, ...any[]];
type ResourceDictionary = Record<string, ResourceKey | TemplatedResource>;

function throwMissingResourceError(name: string, message: string): void {
  throw new Error(
    `No matching string for the resource name "${name}" ` +
    `was found in the default culture's resource file. ${message}`
  );
}

@Injectable()
export class SkyAppResourcesTestService {

  private get resources(): SkyAppResources {
    return RESOURCES as SkyAppResources;
  }

  public getString(name: string, ...args: any[]): Observable<string> {
    const resource = this.resources[name];

    // Instead of falling back to the key like the standard resources service does, throw
    // an error to notify the unit test author that an invalid resource string is being
    // referenced.
    if (resource === undefined) {
      throwMissingResourceError(
        name,
        'Ensure your component or service is referencing a valid resource string.'
      );
    }

    return observableOf(
      this.formatText(resource.message, ...args)
    );
  }

  public getStrings<T extends ResourceDictionary>(dictionary: T): Observable<{ [K in keyof T]: string }> {
    const resources$: Record<string, Observable<string>> = {};

    for (const objKey of Object.keys(dictionary)) {
      const resource: string | [string, ...any[]] = dictionary[objKey];

      if (typeof resource === 'string') {
        resources$[objKey] = this.getString(resource);
      } else {
        const [key, ...templateItems] = resource;
        resources$[objKey] = this.getString(key, ...templateItems);
      }
    }

    return forkJoin(resources$);
  }

  /**
   * Ignores the locale passed and returns the resource for en_US.
   */
  public getStringForLocale(
    _locale: SkyAppLocaleInfo,
    name: string,
    ...args: any[]
  ): Observable<string> {
    return this.getString(name, args);
  }

  /**
   * Copied from the `Format` utility in `@skyux/i18n`.
   * @see: https://github.com/blackbaud/skyux-i18n/blob/master/src/app/public/utils/format.ts
   *
   */
  private formatText(format: string, ...args: any[]): string {
    return String(format).replace(
      /\{(\d+)\}/g,
      function (match, capture): string {
        const argsIndex = parseInt(capture, 10);
        return args[argsIndex] === undefined ? match : args[argsIndex];
      }
    );
  }
}
