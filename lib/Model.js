var DB = require(process.cwd() + '/lib/Database');
var util = require(process.cwd() + '/lib/util');



var Model = function() {
  this.db = DB;
  this.collection = undefined;
  this.collectionName = this.collectionName || undefined;
  this.collectionArray = undefined;

  if (!this.collectionName) {
    throw new ModelError('A collection name must be set when instantiating' +
        ' the model');
  }
};

Model.prototype.getCollection = function(callback) {
  var self = this;

  if (this.collection) {
    callback(collection);
    return;
  }

  this.db.collection(this.collectionName, function(e, collection){
    if(e) {
      throw new ModelError('Could not retrieve collection: ' + e);
    }

    self.collection = collection;
    callback(collection);
  });
};

Model.prototype.findAll = function(callback) {
  this.getCollection(function(collection) {
    collection.find().toArray(function(e, results) {
      if (e) {
        throw new ModelError('Could not retrieve collection array ');
      }

      callback(results);
    });
  });
};

Model.prototype.findOneById = function(id, callback) {
  id = this.serialize(id);

  this.getCollection(function(collection) {
    var params = {
      _id: id
    };
    collection.findOne(params, function(e, result) {
      if (e) {
        throw new ModelError('Could not retrieve the item of id ' + id +
            ': ');
      }
      callback(result);
    });
  });
};

Model.prototype.findOneByProps = function(props, callback) {
  this.getCollection(function(collection) {
    var params = props;
    collection.findOne(params, function(e, result) {
      if (e) {
        throw new ModelError('Could not retrieve the item of id ' + id +
            ': ');
      }
      callback(result);
    });
  });
};

Model.prototype.insert = function(items, callback) {
  this.getCollection(function(collection) {
    if (!util.isArray(items)) {
       items = [items];
    }

    items.forEach(function(item, index, arr) {
      if (!item.created_at) {
        item.created_at = new Date();
      }
    });

    collection.insert(items, function(e, result) {
      if (e) {
        throw new ModelError('Cannot insert new item into collection. ' );
      }
      callback(result);
    });
  });
};

Model.prototype.update = function(id, item, callback) {
  id = this.serialize(id);

  this.getCollection(function(collection) {
    console.log('@TODO: hunt down the reference to projects (now collection');
    var params = {
      _id : id
    };
    console.log('break1');
    collection.update(params, item, function(e, result) {
      if (e) {
        throw new ModelError('Could not update collection. ');
      }
      callback(result);
    });
  });
};

Model.prototype.del = function(id, callback) {
  id = this.serialize(id);

  this.getCollection(function(collection) {
    var params = {
      _id: id
    };
    collection.remove(params, function(e, item) {
      if (e) {
        throw new ModelError('Could not delete item. ' + e);
      }
      callback(item);
    });
  });
};

Model.prototype.serialize = function(value) {
  if (!this.collection) {
    throw new ModelError('The collection is necessary to serialize an object');
  }
  return this.collection.db.bson_serializer.ObjectID.createFromHexString(value);
};



/**
 * [ModelError description]
 * @param {[type]} message        [description]
 * @param {[type]} opt_linenumber [description]
 */
var ModelError = function(message, opt_linenumber) {
  util.base(this, message, __filename, opt_linenumber);

  this.name = 'ModelError';
  this.message = message;
};
util.inherits(ModelError, Error);

module.exports = Model;