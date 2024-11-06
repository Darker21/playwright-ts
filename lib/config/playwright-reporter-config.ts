/**
 * Configures the reporters for Playwright test results.
 *
 * This module imports the `ReporterDescription` type from Playwright and defines an array 
 * of reporters that specify how test results should be reported. The configuration includes 
 * both built-in reporter types and custom options for the HTML reporter, allowing for flexible 
 * reporting formats during test execution.
 *
 * @module
 * @requires ReporterDescription - A type from Playwright that describes the structure of reporter configurations.
 * 
 * @constant {Array<LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string> | ReporterDescription>} reporters - 
 * An array of reporter configurations, including built-in types and custom settings for the HTML reporter.
 */
import { ReporterDescription } from "@playwright/test";
import { LiteralUnion } from "../types";

const reporters: LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string> | ReporterDescription[] = [
    [
        "html", {
            open: 'never'
        }
    ],
    [
        "line"
    ]
]

export {
    reporters
}
