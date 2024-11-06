import { defineConfig } from '@playwright/test';
import {config} from './lib/config/config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests-examples',

  /* Run tests in files in parallel */
  fullyParallel: config.EnvironmentConfig.RunParrel,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: config.Reporters,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: config.EnvironmentConfig.BasePath,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: config.ProjectConfig,

  /* Run your local dev server before starting the tests */
  webServer: config.FileConfig.PlayWrightServerConfig,
});
