var util = require('util');

var Response = function(err, data) {
  this.err_ = err;
  this.data_ = data;
};

Response.prototype.getCode = function() {
  return (!this.err_ && this.data_) ? 200 : (!this.data_ && this.err_) ? 404 : 500;
};

Response.prototype.getData = function() {
  return {
    status: (this.getCode() === 200) ? 'sussess' : 'fail',
    data: (util.isArray(this.data_)) ? this.data_ :
        (typeof this.data_ !== 'undefined' && this.data_ !== null) ? [this.data_] : [],
    error: this.err_ || ''
  };
};

module.exports = Response;
