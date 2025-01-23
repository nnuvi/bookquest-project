import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (userID, res) => {
     try {
          const token = jwt.sign({userID}, process.env.JWT_SECRET, {
               expiresIn:'15d'
          });
     
          console.log('token in gent: ', token, ' for userId: ', userID);
     
          res.cookie("jwt", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "development",
               sameSite: 'None',
               maxAge: 15 * 24 * 60 * 60 * 1000, //MS
          });
     } catch (error) {
          console.error('Error generating token:', error);
     }
}