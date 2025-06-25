import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';

const { parsed: envParsed } = configDotenv();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).send('Token required');
    jwt.verify(token, envParsed.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).send('Invalid or expired token');
      req.authUserId = user.userId;
      next();
    });
  };