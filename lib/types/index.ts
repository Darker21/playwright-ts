/**
 * Provides type definitions for device configurations and browser channels used in automation.
 *
 * This module defines several types related to device descriptors, browser channels, and 
 * device name-channel associations. These types facilitate the configuration of devices 
 * for browser automation, ensuring type safety and clarity when specifying device properties 
 * and browser options in testing environments.
 *
 * @module
 * @requires LaunchOptions - The options for launching a browser, imported from Playwright.
 * @requires ViewportSize - The type representing the size of the viewport for devices.
 */
import { LaunchOptions, ViewportSize } from "@playwright/test";

/**
 * Represents a union type that allows for literal string values or a broader type.
 *
 * The `LiteralUnion` type enables the creation of a union type that includes specific 
 * literal types `T` while also allowing for a broader type `U`, defaulting to `string`. 
 * This is useful for scenarios where you want to restrict a type to specific string literals 
 * but still allow for other values of a broader type, while preventing accidental usage 
 * of the broader type alone.
 *
 * @template T - The specific literal type(s) to include in the union.
 * @template U - The broader type that can be included in the union, defaulting to string.
 * @typedef {T | (U & { zz_IGNORE_ME?: never })} LiteralUnion - A union type that combines literal types with a broader type.
 */
export type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });


/**
 * Represents the configuration for a device used in browser automation.
 *
 * The `DeviceDescriptor` type defines an object structure that includes properties 
 * describing the device's viewport size, user agent string, scale factor, mobile 
 * capabilities, touch support, and the default browser type. This type is useful 
 * for configuring device emulation in testing environments.
 *
 * @typedef {Object} DeviceDescriptor
 * @property {ViewportSize} viewport - The size of the viewport for the device.
 * @property {string} userAgent - The user agent string that identifies the device.
 * @property {number} deviceScaleFactor - The scale factor for the device's display.
 * @property {boolean} isMobile - Indicates whether the device is a mobile device.
 * @property {boolean} hasTouch - Indicates whether the device supports touch input.
 * @property {'chromium' | 'firefox' | 'webkit'} defaultBrowserType - The default browser type for the device.
 */
export type DeviceDescriptor = {
    viewport: ViewportSize;
    userAgent: string;
    deviceScaleFactor: number;
    isMobile: boolean;
    hasTouch: boolean;
    defaultBrowserType: 'chromium' | 'firefox' | 'webkit';
};


/**
 * Represents a browser channel type excluding undefined values.
 *
 * The `BrowserChannel` type is derived from the `LaunchOptions['channel']` type by using 
 * TypeScript's `Exclude` utility type to remove `undefined`. This ensures that any variable 
 * of type `BrowserChannel` will only accept valid channel values, enhancing type safety 
 * when working with browser launch options.
 *
 * @typedef {string} BrowserChannel - A type representing valid browser channels, excluding undefined.
 */
type BrowserChannel = Exclude<LaunchOptions['channel'], undefined>;


/**
 * Represents a device name associated with an optional browser channel.
 *
 * The `DeviceNameChannel` type defines an object structure that includes a mandatory `deviceName` 
 * property representing the name of the device, and an optional `channel` property that specifies 
 * the associated browser channel, which can be of type `BrowserChannel` or `undefined`.
 *
 * @typedef {Object} DeviceNameChannel
 * @property {string} deviceName - The name of the device.
 * @property {BrowserChannel|undefined} [channel] - An optional property representing the associated browser channel.
 */
export type DeviceNameChannel = {
    deviceName: string,
    channel?: BrowserChannel | undefined
}


export interface TestConfigWebServer {
    /**
     * Shell command to start. For example `npm run start`..
     */
    command: string;

    /**
     * Current working directory of the spawned process, defaults to the directory of the configuration file.
     */
    cwd?: string;

    /**
     * Environment variables to set for the command, `process.env` by default.
     */
    env?: { [key: string]: string; };

    /**
     * Whether to ignore HTTPS errors when fetching the `url`. Defaults to `false`.
     */
    ignoreHTTPSErrors?: boolean;

    /**
     * The port that your http server is expected to appear on. It does wait until it accepts connections. Either `port`
     * or `url` should be specified.
     */
    port?: number;

    /**
     * If true, it will re-use an existing server on the `port` or `url` when available. If no server is running on that
     * `port` or `url`, it will run the command to start a new server. If `false`, it will throw if an existing process is
     * listening on the `port` or `url`. This should be commonly set to `!process.env.CI` to allow the local dev server
     * when running tests locally.
     */
    reuseExistingServer?: boolean;

    /**
     * If `"pipe"`, it will pipe the stdout of the command to the process stdout. If `"ignore"`, it will ignore the stdout
     * of the command. Default to `"ignore"`.
     */
    stdout?: "pipe" | "ignore";

    /**
     * Whether to pipe the stderr of the command to the process stderr or ignore it. Defaults to `"pipe"`.
     */
    stderr?: "pipe" | "ignore";

    /**
     * How long to wait for the process to start up and be available in milliseconds. Defaults to 60000.
     */
    timeout?: number;

    /**
     * The url on your http server that is expected to return a 2xx, 3xx, 400, 401, 402, or 403 status code when the
     * server is ready to accept connections. Redirects (3xx status codes) are being followed and the new location is
     * checked. Either `port` or `url` should be specified.
     */
    url?: string;
}