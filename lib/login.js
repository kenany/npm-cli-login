const fs = require('fs');
const profile = require('npm-profile');
const path = require('path');

module.exports = {
    /**
     * @param {string} npmUser
     * @param {string} npmPass
     * @param {string} npmEmail
     * @param {string} npmRegistry
     * @param {string} npmScope
     * @param {boolean} quotes
     * @param {string} configPath
     */
    processArguments: function (npmUser, npmPass, npmEmail, npmRegistry, npmScope, quotes, configPath) {
        var registry = npmRegistry || 'https://registry.npmjs.org';
        var homePath = process.env.HOME ? process.env.HOME : process.env.USERPROFILE;
        var finalPath = configPath ? configPath : path.join(homePath, '.npmrc');
        var hasQuotes = quotes ? quotes : false;
        var args = {
            user: npmUser,
            pass: npmPass,
            email: npmEmail,
            registry: registry,
            scope: npmScope,
            quotes: hasQuotes,
            configPath: finalPath
        };

        return args;
    },

    /**
     * @param {{ user: string; pass: string; registry: string; }} args
     * @param {(error: Error | null, data: { token: string; }) => void} callback
     */
    login: function (args, callback) {
        profile.loginCouch(args.user, args.pass, { registry: args.registry })
            .then((data) => callback(null, data))
            .catch(callback);
    },

    /**
     * @param {{ configPath: string; }} args
     * @param {(error: Error | null, contents: string) => void} callback
     */
    readFile: function (args, callback) {
        fs.readFile(args.configPath, 'utf-8', function (err, contents) {
            if (err) {
                contents = '';
            }
            return callback(null, contents);
        });
    },

    /**
     * @param {{ quotes: boolean; registry: string; scope?: string; }} args
     * @param {string} contents
     * @param {{ token: string; }} response
     */
    generateFileContents: function (args, contents, response) {
        // `contents` holds the initial content of the NPMRC file
        // Convert the file contents into an array
        var lines = contents ? contents.split('\n') : [];

        if (args.scope !== undefined) {
            var scopeWrite = lines.findIndex(function (element) {
                if ( element.indexOf(args.scope + ':registry=' + args.registry) !== -1) {
                    // If an entry for the scope is found, replace it
                    element = args.scope + ':registry=' + args.registry;
                    return true;
                }
            });

            // If no entry for the scope is found, add one
            if ( scopeWrite === -1 ) {
                lines.push(args.scope + ':registry=' + args.registry);
            }
        }

        var authWrite = lines.findIndex(function (element, index, array) {
            if ( element.indexOf(args.registry.slice(args.registry.search(/\:\/\//, '') + 1) +
            '/:_authToken=') !== -1) {
                // If an entry for the auth token is found, replace it
                array[index] = element.replace(/authToken\=.*/, 'authToken=' + (args.quotes ? '"' : '') +
                response.token + (args.quotes ? '"' : ''));
                return true;
            }
        });

        // If no entry for the auth token is found, add one
        if (authWrite === -1) {
            lines.push(args.registry.slice(args.registry.search(/\:\/\//, '') +
            1) + '/:_authToken=' + (args.quotes ? '"' : '') + response.token + (args.quotes ? '"' : ''));
        }

        var toWrite = lines.filter(function (element) {
            if (element === '') {
                return false;
            }
            return true;
        });

        return toWrite;
    },

    /**
     * @param {{ configPath: string; }} args
     * @param {readonly string[]} lines
     * @param {import('fs').NoParamCallback} callback
     */
    writeFile: function (args, lines, callback) {
        fs.writeFile(args.configPath, lines.join('\n') + '\n', callback);
    }
};
