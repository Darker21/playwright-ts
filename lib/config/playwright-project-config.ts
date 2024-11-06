/**
 * For device list, look to ~/.ref/device-list.txt
 */
/**
 * Configures browser projects for device emulation in Playwright.
 *
 * This module imports necessary types and configurations to define desktop and mobile 
 * browser projects for testing. It creates device projects based on predefined device 
 * names and channels, allowing for flexible browser automation setups in testing environments.
 *
 * @module
 * @requires devices - The collection of predefined devices from Playwright.
 * @requires Project - The type representing a project configuration in Playwright.
 * @requires config - The configuration object containing environment-specific settings.
 * @requires DeviceNameChannel - The type representing a device name and its associated channel.
 * 
 * @constant {DeviceNameChannel[]} desktopBrowsers - An array of desktop browser configurations.
 * @constant {string[]} mobileBrowsers - An array of mobile browser names.
 * @function createDeviceProject - A function that creates a project configuration for a specific device.
 * @param {string} id - The identifier for the device project.
 * @param {string} deviceId - The device name used to access the corresponding device configuration.
 * @param {string} [channel] - An optional channel for the browser.
 * @returns {Project} A project configuration object for the specified device.
 * @constant {Project[]} desktopProjects - An array of project configurations for desktop browsers.
 * @constant {Project[]} mobileProjects - An array of project configurations for mobile browsers.
 * @constant {Object} projectConfig - The final configuration object containing all browser projects.
 */

import { type Project } from "@playwright/test";
import { type DeviceNameChannel } from "../types";
import { envConfig } from "./environment-config";
import { customDevices as devices } from "../types/devices";

const desktopBrowsers: DeviceNameChannel[] = [
    { deviceName: "Desktop Chrome", channel: "chrome" },
    { deviceName: "Desktop Edge", channel: "msedge" },
    { deviceName: "Desktop Firefox" },
    { deviceName: "Desktop Safari" }
];
const mobileBrowsers = ["Galaxy S5", "Galaxy S5 landscape", "Galaxy A52", "iPhone 12"];

/**
 * Creates a project configuration for a specified device.
 *
 * The `createDeviceProject` function constructs a `Project` object that includes the 
 * device's name and its associated configuration. It allows for an optional browser 
 * channel to be specified, which is included in the project's configuration, enabling 
 * tailored browser automation setups.
 *
 * @param {string} id - The identifier for the device project.
 * @param {string} deviceId - The device name used to access the corresponding device configuration.
 * @param {string} [channel] - An optional channel for the browser, which can be used to specify 
 *                             the browser type (e.g., 'chrome', 'firefox').
 * @returns {Project} A project configuration object for the specified device, including the name 
 *                    and device settings.
 */
function createDeviceProject(id: string, deviceId: string, outputDir: string, channel?: string): Project {
    return {
        name: id,
        use: { ...devices[deviceId], channel: channel },
        outputDir: outputDir
    };
}


const desktopProjects: Project[] = desktopBrowsers.map(d => createDeviceProject(d.deviceName.replace("Desktop ", ""), d.deviceName, envConfig.DesktopReportPath, d.channel));
const mobileProjects: Project[] = mobileBrowsers.map(id => createDeviceProject(id, id, envConfig.MobileReportPath));

const projectConfig: Project[] = [
    {
        name: "Desktop",
        use: desktopBrowsers.map(d => devices[d.deviceName]),
        outputDir: envConfig.DesktopReportPath,
    },
    {
        name: "Mobile",
        use: mobileBrowsers.map(id => devices[id]),
        outputDir: envConfig.MobileReportPath,
    },
    ...desktopProjects,
    ...mobileProjects,
];

export default projectConfig;
