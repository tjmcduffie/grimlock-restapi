// var UserSchema = require(process.cwd() + '/db/schema/User');
var mongoose = require('mongoose');
// var urlify = require('urlify').create({
//   spaces: '-',
//   toLower: true,
//   nonPrintable: '-',
//   trim: true
// });

var Schema = mongoose.Schema;

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
  createdOn: {type: Date, 'default': Date.now},
  updatedOn: {type: Date, 'default': Date.now}
});


ProfileSchema.set('toObject', { getters: true });
ProfileSchema.set('toJSON', { getters: true });


// Schema Hooks
// ProfileSchema.post('remove', function (data) {
//   var referenceDocuments = {};

//   // if reference documents are already hydrated this can be simplified.
//   ['projects', 'employments', 'educations'].map(function(value) {
//     if (data[value].length > 0) {
//       for(var i = 0; i < data[value].length; i++) {
//         referenceDocuments[data[value][i]._id] = value;
//       }
//     }
//   });

//   for (var prop in referenceDocuments) {
//     // will these already be hydrated?
//     var model;
//     switch referenceDocuments[prop] {
//       case: 'profile':
//         model = ProfileModel;
//       case: 'employments':
//         model = EmploymentModel;
//       case: 'educations':
//         model = EducationModel;
//     }
//     model.findOneAndRemove({_id, prop}, function(err) {
//       if (!!err) {
//         throw new Error('couldn\'t remove subdocument');
//       }
//     });
//   }
// });


ProfileSchema.methods = {};

ProfileSchema.statics = {};

mongoose.model('Profile', ProfileSchema);