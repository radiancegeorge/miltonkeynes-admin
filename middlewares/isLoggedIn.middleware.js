const asyncHandler = require('express-async-handler');

const isLoggedIn = asyncHandler(async(req, res, next)=>{
    const isLoggedIn = req.app.locals.isLoggedIn;
    isLoggedIn ? next() : res.redirect('/login');
});

module.exports = {
    protect: isLoggedIn
}