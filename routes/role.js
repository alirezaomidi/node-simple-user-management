module.exports = {
  requireRole: function (role) {
    return function (req, res, next) {
      if (req.user && req.user.roles.find(function (r) {
          return r == role || r == 'admin';
        })) {
        next();
      } else {
        res.send(403);
      }
    }
  }
}
