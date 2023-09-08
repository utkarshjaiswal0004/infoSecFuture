module.exports = function(req, res, next) {
    // Check if the URL starts with '/api/' or contains an API version
    if (!req.url.startsWith('/api/') && req.url.indexOf('/api/') === -1) {
      req.url = `/api/${process.env.API_Version}${req.url}`;
    }
    next();
  };