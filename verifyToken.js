const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('access denied');

    try {
        //verify is a built in method for jwt which will compare the two params you pass in. so in our case its comparing our secret token and the actual token that comes back from req.header
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        //next is used when you have private routes, which this application as of now does not
        //next();
    } catch (err) {
        req.status(400).send('invalid token');
    }
}