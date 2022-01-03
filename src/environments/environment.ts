// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  endpointUrl: 'https://mingems-api.herokuapp.com/api',
  signalrRUrl: 'https://mingems-api.herokuapp.com/api',
  cloudStorageUrl: 'https://mingems-cloud.herokuapp.com/api',
  production: false
};
