# Playwright Template
Template repository for Playwright TypeScript

**VS Code is recommended and will be assumed throughout this documentation**

## Table of Contents
- [Pre-Requisites](#pre-requisites)
- [NPM Scripts](#npm-scripts)
- [Config](#config)
  - [File Config](#file-config)
  - [Environment Config](#environment-config)
  - [Playwright Project Config](#playwright-project-config)
  - [Playwright Reporter Config](#playwright-reporter-config)

## Pre-Requisites
1. Run `npm install` in project folder
2. Run `npx playwright install --with-deps` in project folder
3. Install [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## NPM Scripts
- `npm run test` - will run across configured mobile and desktop 'projects'
  - `npm run test:desktop` - runs tests all configured desktop 'projects'
  - `npm run test:mobile` - runs tests in all configured mobile 'projects'
  - `npm run test:<platform>` - runs tests in the designated 'project' (see below for list)
    - `firefox`
    - `chrome`
    - `safari`
- `npm run ui` - launches the Playwright test runner UI
- `npm run results` - Starts the webserver for latest results and auto-launches your default browser
- `npm run ref:generate` - generates the below assets
  - `/.ref/device-list.txt` - list of all the devices currently available

## Config

Config is exported as a class, any new config will need manually adding in the relevant sub class (i.e. `file config`, `env config` etc.)

### File Config

All file based config is stored in `/env/config` and read and parsed by `/lib/config/file-config.ts`
 
- Available Props:
  - PlayWrightServerConfig
    - File location - `/env/config/web-server.json`
    - Description - Configures the local web server for tests to run against
    - [Schema](https://playwright.dev/docs/test-webserver)

### Environment Config

Environment config values can be passed as additional args i.e. `npm run test --BASE_URL http://localhost` or configured in `/env/{.environment}.env`. All config is retreived by `lib/config/environment-config.ts`

<span style="color: red">*Currently, `.env` is only supported and requires some further integration work for environment specific config.*</span>

- Available Props:
  - BasePath
    - Env Variable Key - BASE_URL
    - Type - string
    - Default - `N/A` (Throws error if not provided)
    - Description - The base path for the browser session running the tests
  - DesktopReportPath
    - Env Variable Key - DESKTOP_REPORT_PATH
    - Type - string
    - Default - `html-report/desktop`
    - Description - The path relative to project root to store the html reports for desktop 'projects'
  - MobileReportPath
    - Env Variable Key - MOBILE_REPORT_PATH
    - Type - string
    - Default - `html-report/mobile`
    - Description - The path relative to project root to store the html reports for mobile 'projects'
  - RunParallel
    - Env Variable Key - RUN_PARALLEL
    - Type - boolean
    - Default - `false`
    - Description - Declares whether to run the tests in parallel

### Playwright Project Config

Defines the available 'projects'/devices to run tests against.

Control using the `mobileBrowsers` and `desktopBrowsers` arrays using devices from `/.ref/device-list.txt`. Projects will be configured and added to the relevant project configurations based on the array you pass the device name into

### Playwright Reporter Config

Defines the reporters for the tests to use, [see documentation for available options and config](https://playwright.dev/docs/test-reporters)

## Defining Custom Devices

1. Create a new file under `types/devices` with the name of your desired device i.e. `samsung-a52.ts`
2. import the type `DeviceDescriptor` from `./..` 
    - i.e. `import { type DeviceDescriptor } from "./..";`
3. Create a new variable of type `DeviceDescriptor` and implement the relevant properties i.e. `const GalaxyA52: DeviceDescriptor = {...}`
4. Export the variable as default i.e. `export default GalaxyA52`
5. Import exported device into `/types/devices/index.ts` i.e. `import GalaxyA52 from './samsung-a52';`
6. Add a new property to the type of `__customList` using your device name with specified type of `DeviceDescriptor` i.e. `const __customList: { "DeviceA": DeviceDescriptor, "GalaxyA52": DeviceDescriptor }`
7. Add property to the object with imported device as it's value i.e. `const __customList = ... { "Galaxy A52": GalaxyA52`
8. Run the npm script `ref:generate` to generate the `device-list.txt` and ensure your new device is there