/**
 * Manages the loading and parsing of configuration data for the web server.
 *
 * This module imports necessary types and functions to read a JSON configuration file 
 * for the web server. It defines functions to parse JSON strings and read objects from 
 * the file system, facilitating the retrieval of configuration settings in a type-safe 
 * manner. The configuration is exported for use in other parts of the application.
 *
 * @module
 * @requires fs - The Node.js file system module for reading files.
 * @requires PathLike - A type representing valid path inputs for file operations.
 * @requires ConfigError - A custom error class for handling configuration-related errors.
 * @requires path - A Node.js module for handling and transforming file paths.
 * @requires TestConfigWebServer - The type representing the structure of the web server configuration.
 * 
 * @constant {string} basePath - The base path for the configuration files.
 * @constant {string} WebServerConfigPath - The full path to the web server configuration JSON file.
 * 
 * @function parseJSON
 * @template T - The type of the object that the JSON string will be parsed into.
 * @param {string} jsonString - The JSON string to be parsed.
 * @returns {T} The parsed object of type T.
 * @throws {SyntaxError} Throws a SyntaxError if the input string is not valid JSON.
 * 
 * @function readObject
 * @template T - The type of the object to be read from the file.
 * @param {PathLike | string} path - The path to the file containing the JSON object.
 * @returns {T | undefined} The parsed object of type T, or undefined if the file is empty or not found.
 * @throws {ConfigError} Throws a ConfigError if the file cannot be read.
 */
import fs, { PathLike } from "fs";
import ConfigError from "../types/errors/config-error";
import path from "path";
import { TestConfigWebServer } from "../types";

const basePath = path.join(__dirname, "../../env/config");

const WebServerConfigPath = path.join(basePath, "web-server.json");

/**
 * Parses a JSON string and returns the corresponding object of the specified type.
 *
 * The `parseJSON` function takes a JSON string as input and uses `JSON.parse` to convert 
 * it into a JavaScript object. The generic type parameter `T` allows the caller to specify 
 * the expected type of the resulting object, enhancing type safety and ensuring that the 
 * returned value conforms to the desired structure.
 *
 * @template T - The type of the object that the JSON string will be parsed into.
 * @param {string} jsonString - The JSON string to be parsed.
 * @returns {T} The parsed object of type T.
 * @throws {SyntaxError} Throws a SyntaxError if the input string is not valid JSON.
 */
function parseJSON<T>(jsonString: string): T {
    return JSON.parse(jsonString) as T;
}


/**
 * Reads a JSON object from a specified file path and parses it into the specified type.
 *
 * The `readObject` function takes a file path as input, reads the file asynchronously, 
 * and attempts to parse its content as JSON. If the file cannot be read, it throws a 
 * `ConfigError`. If the file is empty or not found, it returns `undefined`. The generic 
 * type parameter `T` allows the caller to specify the expected type of the parsed object.
 *
 * @template T - The type of the object that the JSON content will be parsed into.
 * @param {PathLike | string} path - The path to the file containing the JSON object.
 * @returns {T | undefined} The parsed object of type T, or undefined if the file is empty 
 * or not found.
 * @throws {ConfigError} Throws a ConfigError if the file cannot be read.
 */
function readObject<T>(path: PathLike | string): T | undefined {
    let content: string = "";

    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            throw new ConfigError(path as string);
        }

        content = data;
    });

    if (!content) {
        return undefined;
    }

    return parseJSON<T>(content);
}


export default {
    PlayWrightServerConfig: readObject<TestConfigWebServer[]>(WebServerConfigPath)
}