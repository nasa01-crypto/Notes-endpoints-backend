const jwt = require('jsonwebtoken');

const authMiddleware = () => {
  return {
    before: async (handler) => {
   
      const authorizationHeader = handler.event.headers.Authorization;


      if (!authorizationHeader) {
        throw new Error('Authorization token missing');
      }


      const token = authorizationHeader.split(' ')[1]; 

      if (!token) {
        throw new Error('Token is malformed or missing');
      }

      try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
        handler.event.user = { username: decoded.username };

      } catch (err) {
       
        if (err.name === 'TokenExpiredError') {
          throw new Error('Token has expired');
        }
        throw new Error('Invalid or expired token');
      }
    }
  };
};

module.exports = { authMiddleware };
