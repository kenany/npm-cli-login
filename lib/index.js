const ncl = require('./login');

/**
 * @param {string} user
 * @param {string} pass
 * @param {string} email
 * @param {string} registry
 * @param {string} scope
 * @param {boolean} quotes
 * @param {string} configPath
 */
module.exports = function (user, pass, email, registry, scope, quotes, configPath) {
    const finalArgs = ncl.processArguments(user, pass, email, registry, scope, quotes, configPath);
    if (!finalArgs.user) {
        throw new TypeError('`user` is a required argument.')
    }
    if (!finalArgs.pass) {
        throw new TypeError('`pass` is a required argument.')
    }
    if (!finalArgs.email) {
        throw new TypeError('`email` is a required argument.')
    }

    ncl.login(finalArgs, function (err, data) {
        if (err) {
            throw err;
        }
        ncl.readFile(finalArgs, function (err, content) {
            if (err) {
                throw err;
            }
            else {
                const { token } = data;
                const newContent = ncl.generateFileContents(
                    finalArgs,
                    content,
                    { token }
                );
                ncl.writeFile(finalArgs, newContent, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    });
};
