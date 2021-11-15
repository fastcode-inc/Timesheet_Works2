// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://127.0.0.1:5555',
  emailConfig: {
    xApiKey: 't7HdQfZjGp6R96fOV4P8v18ggf6LLTQZ1puUI2tz',
    apiPath: 'https://ngb-api.wlocalhost.org/v1', //'http://localhost:3001', // 'https://ngb-api.wlocalhost.org/v1',
  },
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
