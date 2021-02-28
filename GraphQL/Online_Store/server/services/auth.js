const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const register = async data => {
  try { 
    const { message, isValid } = validateRegisterInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password, date } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('This user already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User(
        {
          name,
          email,
          password: hashedPassword,
          date
        },
        err => {
          if (err) throw err;
        }
      )
      const token = jwt.sign({ id: user._id }, keys.secretOrKey);
      
      user.save();
      return { token, loggedIn: true, ...user._doc, password: '' }
  } catch (err) {
    throw err;
  }
}

const logout = async data => {
  try {
    const { _id } = data
    const token = '';
    const user = await User.findByIdAndUpdate(
      { _id }, 
      { loggedIn: false, token: token },
      { useFindAndModify: false }
    )
    return { token, loggedIn: false, ...user._doc }
  } catch (err) {
    throw err;
  }
}

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);
    
    if (!isValid) {
      throw new Error(message);
    }
    
    const { email, password } = data;
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error('Invalid email')
    }
    
    const { _id } = user;

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: _id }, keys.secretOrKey)
      return { token, loggedIn: true, ...user._doc, password: ''}
    } else {
      throw new Error('Password incorrect')
    }
  } catch (err) {
    throw err
  }
}

const verifyUser = async data => {
  try {
    const { token } = data;

    const decoded = jwt.verify(token, keys.secretOrKey)
    const { id } = decoded;

    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    })

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
}
module.exports = { register, logout, login, verifyUser };

