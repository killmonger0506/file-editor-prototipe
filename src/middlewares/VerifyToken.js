import User from '../modules/user/user.models';
import { verifyJWT } from '../shared/Utils';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(403).json({msg: 'No token provided'})

    const decoded = await verifyJWT(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({msg: "not user found"});

    next();
  } catch (err) {
    res.status(401).json({msg: "Unauthorized"});
  }
};
