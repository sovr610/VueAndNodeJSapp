util = {};

/**
 * @param {object} err the error object
 * @returns {object} error object
 */
util.getErrorObject = function(err) {
    var error_obj = {
        message: err
    };
    return error_obj;
};

module.exports = util;
