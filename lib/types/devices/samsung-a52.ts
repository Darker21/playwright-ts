/**
 * Represents the device descriptor for the Samsung Galaxy A52.
 *
 * The `GalaxyA52` constant is defined as a `DeviceDescriptor` type, encapsulating 
 * the device's user agent string, viewport dimensions, scale factor, mobile capabilities, 
 * touch support, and the default browser type. This configuration is useful for 
 * emulating the Galaxy A52 in browser automation and testing environments.
 *
 * @constant {DeviceDescriptor} GalaxyA52 - The configuration object for the Samsung Galaxy A52 device.
 * @property {string} userAgent - The user agent string that identifies the device.
 * @property {ViewportSize} viewport - The size of the viewport for the device.
 * @property {number} deviceScaleFactor - The scale factor for the device's display.
 * @property {boolean} isMobile - Indicates whether the device is a mobile device.
 * @property {boolean} hasTouch - Indicates whether the device supports touch input.
 * @property {'chromium'} defaultBrowserType - The default browser type for the device.
 */
import { type DeviceDescriptor } from "./..";

const GalaxyA52: DeviceDescriptor = {
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A526B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36',
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2.75,
    isMobile: true,
    hasTouch: true,
    defaultBrowserType: 'chromium',
};

export default GalaxyA52;
