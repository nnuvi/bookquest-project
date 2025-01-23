import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (userID, res) => {
     const token = jwt.sign({userID}, process.env.JWT_SECRET, {
          expiresIn:'15d'
     });


     res.cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: 'None',
          maxAge: 15 * 24 * 60 * 60 * 1000, //MS
     });

}