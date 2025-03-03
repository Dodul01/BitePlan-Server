import Jwt from 'jsonwebtoken';

export const createToken = (
  JwtPayload: { email: string; phone: string; role: string },
  secret: string,
  expiresIn: string | number 
) => {
  const options = { expiresIn: expiresIn as Jwt.SignOptions["expiresIn"] };
  return Jwt.sign(JwtPayload, secret, options);
};
