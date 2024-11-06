/**
 * Manages environment configuration and provides utility functions for retrieving 
 * environment variables.
 *
 * This module utilizes the `dotenv` package to load environment variables from a `.env` 
 * file and provides functions to retrieve string and boolean values from these variables. 
 * The `EnvironmentConfig` class initializes various configuration properties based on 
 * environment variables, facilitating easy access to application settings.
 *
 * @module
 * @requires dotenv - A package for loading environment variables from a .env file.
 * @requires ConfigError - A custom error class for handling configuration errors.
 * 
 * @function getString
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @param {string} [defaultValue=""] - An optional default value to return if the environment variable is not set.
 * @returns {string} The value of the specified environment variable or the default value if not found.
 * @throws {ConfigError} Throws a ConfigError if the environment variable is not set and no default value is provided.
 * 
 * @function getBool
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @param {boolean} [defaultValue=false] - The default boolean value to return if the environment variable is not set or is falsy.
 * @returns {boolean} The boolean representation of the environment variable value, or the default value if the variable is not set.
 * @throws {ConfigError} Throws a ConfigError if the environment variable value is not 'true' or 'false'.
 * 
 * @function getEnvVariable
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @returns {string | undefined} The value of the specified environment variable, or `undefined` if the variable is not set.
 * 
 * @class EnvironmentConfig
 * @property {string} BasePath - The value of the "BASE_URL" environment variable.
 * @property {string} DesktopReportPath - The value of the "DESKTOP_REPORT_PATH" environment variable, with a default fallback.
 * @property {string} MobileReportPath - The value of the "MOBILE_REPORT_PATH" environment variable, with a default fallback.
 * @property {boolean} RunParrel - The boolean value indicating whether to run tests in parallel, retrieved from the "RUN_PARALLEL" environment variable.
 */
import ConfigError from '../types/errors/config-error';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../env/.env') });

/**
 * Retrieves the value of a specified environment variable with a default fallback.
 *
 * This function checks the environment for a variable corresponding to the provided key. 
 * If the variable is not found and no default value is provided, it throws a `ConfigError`. 
 * Otherwise, it returns the value of the environment variable or the specified default value.
 *
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @param {string} [defaultValue=""] - An optional default value to return if the environment variable is not set.
 * @returns {string} The value of the specified environment variable or the default value if not found.
 * @throws {ConfigError} Throws a ConfigError if the environment variable is not set and no default value is provided.
 */
function getString(configKey: string, defaultValue?: string): string {
    const value = getEnvVariable(configKey);

    if (!value && !defaultValue) {
        throw new ConfigError(configKey);
    }

    return value || (defaultValue || "");
}

/**
 * Retrieves a boolean value from an environment variable with a default fallback.
 *
 * The `getBool` function checks the specified environment variable key and converts its 
 * value to a boolean. If the variable is not set, it returns the provided default value. 
 * The function recognizes the string values 'true' and 'false' (case-insensitive) and 
 * throws a `ConfigError` if the value is neither.
 *
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @param {boolean} [defaultValue=false] - The default boolean value to return if the 
 * environment variable is not set or is falsy.
 * @returns {boolean} The boolean representation of the environment variable value, or 
 * the default value if the variable is not set.
 * @throws {ConfigError} Throws a ConfigError if the environment variable value is not 
 * 'true' or 'false'.
 */
function getBool(configKey: string, defaultValue: boolean = false) {
    const value = getEnvVariable(configKey);

    if (!value) {
        return defaultValue;
    }

    const lowerValue = value.toLowerCase();
    const boolMap = new Map<string, boolean>([
        ['true', true],
        ['false', false]
    ]);

    if (boolMap.has(lowerValue)) {
        return boolMap.get(lowerValue)!;
    } else {
        throw new ConfigError(configKey);
    }
}



/**
 * Retrieves the value of a specified environment variable.
 *
 * The `getEnvVariable` function takes a configuration key as an argument and returns 
 * the corresponding value from the environment variables. If the specified key does not 
 * exist, it will return `undefined`, allowing for easy checks of environment variable 
 * availability in the application.
 *
 * @param {string} configKey - The key of the environment variable to retrieve.
 * @returns {string | undefined} The value of the specified environment variable, or `undefined` 
 * if the variable is not set.
 */
function getEnvVariable(configKey: string) {
    return process.env[configKey];
}


class EnvironmentConfig {
    BasePath = getString("BASE_URL");
    DesktopReportPath = getString("DESKTOP_REPORT_PATH", "html-report/desktop");
    MobileReportPath = getString("MOBILE_REPORT_PATH", "html-report/mobile");
    RunParallel = getBool("RUN_PARALLEL");
}

export const envConfig = new EnvironmentConfig();
