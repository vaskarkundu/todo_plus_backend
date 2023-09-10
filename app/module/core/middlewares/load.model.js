module.exports = function (options, populate) {
  return function (req, res, next) {
    var query = { shop: req.user.shop };

    if (options.scope != undefined && options.key != undefined) {
      query[options.key] = req[options.scope][options.key];
    } else if (options.key != undefined) {
      query[options.key] = req.params[options.key];
    } else {
      query["_id"] = req.params.id;
    }

    var model = options.model.findOne(query);
    if (options.populate != undefined) {
      for (let field of options.populate) {
        model.populate({ path: field });
      }
    }
    model
      .exec()
      .then((doc) => {
        if (!doc) throw new Error(404);
        req["model"] = doc;
        next();
      })
      .catch((err) => {
        next(err);
      });
  };
};
