import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const encryptPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

export const comparePassword = async (pass, receivePass) => {
  return await bcrypt.compare(pass, receivePass);
};

export const JWT_CONFIG = {
  expiresIn: 86400,
};

export const generateJWT = (data) => {
  return jwt.sign(data, process.env.NODE_APP_JWT_SECRET_KEY , JWT_CONFIG);
};

export const verifyJWT = (token) => {
  return jwt.verify(token, process.env.NODE_APP_JWT_SECRET_KEY)
};
