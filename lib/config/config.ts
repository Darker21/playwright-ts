/**
 * Exports the application environment configuration and reporter settings.
 *
 * This module imports the environment configuration from the `environment-config` module 
 * and the reporter settings from the `playwright-runner-config` module. It then exports 
 * both configurations as a default object, allowing other parts of the application to 
 * easily access environment settings and reporting configurations in a structured manner 
 * for improved management and usability.
 *
 * @module
 * @requires environmentConfig - The configuration object containing environment-specific settings.
 * @requires reporters - The configuration object for Playwright test reporters.
 * 
 * @constant {Object} environmentConfig - The imported environment configuration object.
 * @constant {Array<LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string> | ReporterDescription>} reporters - The imported reporter settings for Playwright tests.
 */
import {envConfig} from "./environment-config";
import { reporters } from "./playwright-reporter-config";
import projectConfig from "./playwright-project-config";
import fileConfig from "./file-config";

class Config {
    EnvironmentConfig = envConfig;
    Reporters = reporters;
    ProjectConfig = projectConfig;
    FileConfig = fileConfig;
}

export const config = new Config();
