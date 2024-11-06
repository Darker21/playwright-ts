/**
 * Represents an error for a missing environment variable.
 *
 * The `ConfigError` class extends the built-in `Error` class to provide 
 * a specific error type that indicates when an expected environment variable 
 * is not set, along with a helpful message guiding the user to check their 
 * configuration file for the missing value.
 *
 * @param {string} varName - The name of the environment variable that is missing.
 * @throws {Error} Throws an error with a message detailing the missing variable.
 * @property {string} varName - The name of the missing environment variable, stored for reference.
 * @property {Object} options - An object containing additional error properties.
 * @property {string} options.cause - A string indicating the source of the error, set to "config".
 */
class ConfigError extends Error {
    private varName: string;

    /**
     * Constructs an error indicating a missing environment variable.
     *
     * This constructor creates an error message that specifies which environment variable 
     * is missing and suggests checking the configuration file for the appropriate value. 
     * It also stores the variable name for reference in the error instance.
     *
     * @param {string} varName - The name of the environment variable that is missing.
     * @throws {Error} Throws an error with a message indicating the missing variable.
     * @property {string} varName - The name of the missing environment variable, stored for reference.
     * @property {Object} options - An object containing additional error properties.
     * @property {string} options.cause - A string indicating the source of the error, set to "config".
     */
    constructor(varName: string) {
        let message: string = `No environment variable declared for "${varName}" - have you set the value in "~/env/.env"?`
        super(message, {
            cause: "config"
        });
        this.varName = varName;
    }

}

export default ConfigError;
