// var DB = require(process.cwd() + '/lib/Database');
// var util = require(process.cwd() + '/lib/util');



// var Model = function(modelName, schema, schemaMethods) {
//   this.db = undefined;
//   this.modelName = name;
//   this.rawSchema = schema;
//   this.schema = null;

//   DB.open().then(function() {
//     console.log('db connection complete: executing callback');
//     this.db = DBClient.db;
//     this.createSchema_();
//     this.createModel_();
//   }.bind(this));
// };

// Model.prototype.createModel_ = function() {
//   this.model = this.db.model('this.modelName', this.schema)
// };

// Model.prototype.createSchema_ = function() {
//   this.schema = this.db.schema(this.rawSchema);
//   for (var method in this.schemaMethods) {
//     if (this.schemaMethods.hasOwnProperty(method)) {
//       this.schema.methods[method] = this.schemaMethods[method];
//     }
//   }
// };

// module.exports = Model;