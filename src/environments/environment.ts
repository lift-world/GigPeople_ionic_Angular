// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  grecaptchakey: "6LeBIcgZAAAAAOr8id4IrM2pCUxJV6tXsad5YZwu",
  serverUrl: "http://localhost:3001",
  firebaseConfig: {
    projectId: "gigpeople-1241e",
    apiKey: "AIzaSyC_EshD3E2GxblQtWWwwMjMml-X1S7epIQ",
    // authDomain: "gigpeople-1241e.firebaseapp.com",
    databaseURL: "https://gigpeople-1241e.firebaseio.com",
    storageBucket: "gs://gigpeople-1241e.appspot.com",
    messagingSenderId: "275498520808"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
