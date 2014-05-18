// var UserSchema = require(process.cwd() + '/db/schema/User');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var urlify = require('urlify').create({
  spaces: '-',
  toLower: true,
  nonPrintable: '-',
  trim: true
});


/**
 * User model Schema
 * @type {Schema}
 */
var ProfileSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  contact: {
    emails: [String],
    websites: [String],
    social: [{
      url: String,
      name: String
    }]
  },
  title: String,
  interests: String,
  picture: String,
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
  employments: [{type: Schema.Types.ObjectId, ref: 'Employment'}],
  educations: [{type: Schema.Types.ObjectId, ref: 'Education'}],
  skills: [String],
  createdOn: {type: Date, default: Date.now},
  updatedOn: {type: Date, default: Date.now}
});


ProfileSchema.set('toObject', { getters: true });
ProfileSchema.set('toJSON', { getters: true });


// Schema Hooks
// ProfileSchema.pre('save', function (next) {
//   console.log(this);
//   console.log(arguments[0]);
//   console.log(arguments[1]);
//   next();
// });
ProfileSchema.post('remove', function (data) {
  console.log('Profile %s removed', data._id);
});



// Schema Validations
// ProfileSchema.path('name.first').validate(function (prop) {
//   return typeof prop !== 'undefined' && prop.length > 0;
// }, 'First name cannot be blank');


ProfileSchema.methods = {};

ProfileSchema.statics = {};

mongoose.model('Profile', ProfileSchema);