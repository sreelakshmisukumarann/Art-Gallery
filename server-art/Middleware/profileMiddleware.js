const jwt = require('jsonwebtoken')

const profileMiddleware = (req, res, next) => {
    console.log('inside the profile middleware');

    // Check if the 'authorization' header exists
    if (!req.headers['authorization']) {
        return res.status(401).json("Authorization header missing");
    }

    // Split the 'authorization' header to get the token
    const tokenArray = req.headers['authorization'].split(' ');

    // Check if the token is present
    if (tokenArray.length !== 2 || tokenArray[0].toLowerCase() !== 'bearer') {
        return res.status(401).json("Invalid authorization header format");
    }

    const token = tokenArray[1];
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token, "superkeylakshmi123")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next();
    } catch (err) {
        res.status(401).json("Authorization failed, please login");
    }
}

module.exports = profileMiddleware;
