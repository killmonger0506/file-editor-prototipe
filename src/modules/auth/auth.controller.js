import User from '../user/user.models';
import { 
  encryptPassword, 
  comparePassword,
  generateJWT,
} from '../../shared/Utils';

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email })
    if (!user || !await comparePassword(password, user.password)) {
      res.status(400).json({msg: "User or Password invalid"});
      return;
    }
    const token = generateJWT({id: user._id});
    res.status(200).json({token});

  } catch (err) {
    res.status(400).json({msg: "error on login"});
  }
};

export const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const verifyUser = await User.findOne({email: email});
    if (verifyUser) {
      res.status(400).json({msg: "email already in use."})
      return;
    };

    const newUser = new User({
      username,
      email,
      password: await encryptPassword(password),
    });

    await newUser.save();
    res.status(201).json({msg: "user created successfuly"});
    
  } catch (err) {
    res.status(400).json({msg: 'error creating user'});
  }
};
