var util = require(process.cwd() + '/lib/util');



ParamCleaner = function() {};


ParamCleaner.clean = function(input) {
  // @TODO clean however necessary here
  return decodeURIComponent(input);
};

module.exports = ParamCleaner;