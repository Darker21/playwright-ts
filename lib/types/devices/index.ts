/**
 * Combines predefined device configurations with custom device settings.
 *
 * This module imports device configurations from Playwright and a specific device descriptor 
 * for the Galaxy A52. It creates a custom device list that includes the Galaxy A52 and merges 
 * it with the existing Playwright devices, resulting in a comprehensive device configuration 
 * object for use in browser automation testing.
 *
 * @module
 * @requires devices - The collection of predefined devices from Playwright.
 * @requires GalaxyA52 - The specific device descriptor for the Galaxy A52.
 * @requires DeviceDescriptor - The type representing the structure of a device descriptor.
 * 
 * @constant {Object} __customList - An object containing custom device configurations.
 * 
 * @constant {Object} customDevices - The merged object containing both Playwright devices 
 * and custom device configurations.
 */
import { devices } from '@playwright/test';
import GalaxyA52 from './samsung-a52';
import { DeviceDescriptor } from '..';

const __customList: { "Galaxy A52": DeviceDescriptor } = {
    "Galaxy A52": GalaxyA52
};

export const customDevices = { ...devices, ...__customList };
