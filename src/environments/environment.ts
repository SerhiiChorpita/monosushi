// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'monosushi',
    appId: '1:126065826039:web:4849c928eae8806ee05bf2',
    storageBucket: 'monosushi.appspot.com',
    apiKey: 'AIzaSyBQjKRsYgJwQbHLqP_EAw-m_KqrwFPeBxQ',
    authDomain: 'monosushi.firebaseapp.com',
    messagingSenderId: '126065826039',
  },
  production: true,
  BACKEND_URL: 'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
