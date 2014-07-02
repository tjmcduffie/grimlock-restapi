var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProfileModel = require(process.cwd() + '/models/Profile.js');
var Profile = mongoose.model('Profile');
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
var UserSchema = new Schema({
  lid: {type: String, unique: true, required: true},
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true},
    formatted: String
  },
  email: {type: String, unique: true, 'default': '', required: true},
  username: {type: String, 'default': '', required: true},
  hashed_password: {type: String, 'default': ''},
  salt: {type: String, 'default': ''},
  profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
  slug: {type: String, unique: true, trim: true, index: true},
  editDomain: {type: String, index: true},
  createdOn: {type: Date, 'default': Date.now},
  updatedOn: {type: Date, 'default': Date.now}
});


UserSchema.set('toObject', { getters: true });
UserSchema.set('toJSON', { getters: true });


// Schema Hooks
UserSchema.pre('save', function (next) {
  // Store the urlify'ed name as the url
  if (!this.slug) {
    var slug = this.name.formatted || (this.name.first + ' ' + this.name.last).trim();
    if (!!slug) {
      this.slug = urlify(slug);
    }
  }
  next();
});

UserSchema.pre('save', function (next) {
  if (!this.profile) {
    var profile =  new Profile({
      user: this._id,
      'contact.email': this.email
    });
    this.profile = profile._id;

    profile.save();
  }
  next();
});

UserSchema.post('remove', function (data) {
  if (data.profile) {
    Profile.findOneAndRemove({_id: data.profile}, function(err, profile) {
      profile.remove();
      if (err) {
        console.log('Unable to remove profile %s while removing user %s', data.profile, data._id);
      } else {
        console.log('%s has been removed', data.profile);
      }
    });
  }
});


// Schema Validations
UserSchema.path('lid').validate(function (prop) {
  return typeof prop !== 'undefined' && prop.length > 0;
}, 'A LinkedIn id is required');


UserSchema.methods = {};

UserSchema.statics = {
  findOneBySlug : function(slug, callback) {
    this.findOne({'slug': slug})
      .exec(callback);
  },
  findOneById : function(id, callback) {
    this.findOne({'_id': id})
      .exec(callback);
  }
};

mongoose.model('User', UserSchema);