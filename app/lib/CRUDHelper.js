var Response = require(process.cwd() + '/lib/Response');

module.exports = {
  create: function(obj, res) {
    obj.save(function(err, data) {
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });
  },

  readOne: function(obj, res, id, options) {
    var results = obj.findById(id);

    if (typeof id === 'undefined') {
      throw new Error('The readOne operation requires an id as the third parameter');
    }

    if (options) {
      if(options.populate) {
        results.populate(options.populate);
      }
    }

    results.exec(function(err, data) {
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });
  },

  readMany: function(obj, res, options) {
    var results = obj.find();

    if (options) {
      if (options.skip) {
        // console.log('skipping')
        results.skip(options.skip);
      }

      if (options.limit) {
        // console.log('limiting')
        results.limit(options.limit);
      }

      if (options.select) {
        // console.log('selecting')
        results.select(options.select);
      }

      if (options.populate) {
        // console.log('populating')
        results.populate(options.populate);
      }
    }

      // console.log('executing')
    results.exec(function(err, data) {
      if (err) {
        console.log(err);
      }
      var response = new Response(err, data);
      // console.log('responding')
      res.json(response.getCode(), response.getData());
    });
  },

  update: function(obj, res, id, options) {
    var key = null;
    var updates = {
      $set: {},
      $push: {}
    };

    var updateIterator = function(element) {
      if (typeof element === 'string' && typeof options.receivedData[element] !== 'undefined') {
        updates[key][element] = options.receivedData[element];
      } else if (typeof element === 'object' && element.key && typeof element.value  !== 'undefined') {
        updates[key][element.key] = element.value;
      }
    };

    if (typeof res === 'undefined') {
      throw new Error('The update operation requires a response object as the second parameter');
    }

    if (typeof id === 'undefined') {
      throw new Error('The update operation requires an id as the third parameter');
    }

    if (!options || !options.receivedData) {
      throw new Error('The update operation requires an options object with a populated receivedData prop');
    }

    for (var opt in options) {
      // console.log('checking for ' + opt);
      if (options.hasOwnProperty(opt) && updates.hasOwnProperty(opt)) {
        key = opt;
        options[opt].forEach(updateIterator);
      }
    }

    obj.findByIdAndUpdate(id, updates, function(err, data) {
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });

  },

  del: function(obj, res, id) {
    if (typeof id === 'undefined') {
      throw new Error('The delete operation requires an id as the third parameter');
    }
    obj.findOneAndRemove({_id: id}, function(err, data) {
      data.remove();
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });
  }
};