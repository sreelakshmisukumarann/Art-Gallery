const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log('inside jwt middleware');
    
    // Check if the Authorization header is present
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json("Authorization failed. Please provide a valid token");
    }

    // Extract the token from the Authorization header
    const token = authorizationHeader.split(' ')[1];
    console.log(token);

    try {
        // Verify the token and extract the user ID
        const jwtResponse = jwt.verify(token, "superkeylakshmi123");
        console.log(jwtResponse);
        
        // Attach the user ID to the request object
        req.userId = jwtResponse.userId;
        next();
    } catch (err) {
        res.status(401).json("Authorization failed. Please login");
    }
};

module.exports = jwtMiddleware;
