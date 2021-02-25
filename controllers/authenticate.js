const router = require('express').Router();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const {
  verifyBodySingUp,
  verifyBodySingIn,
} = require('../middlewares/verifyBody');

const { User } = require('../db/models');
const { generateToken } = require('../libs/jwt');
const generatePassword = require('../libs/password');

/** Route sign In */
router.post('/signIn', verifyBodySingIn, async (req, res) => {
  const errors = validationResult(req);

  // If there are any errors
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { password, email } = req.body;

  try {
    // I search user
    const user = await User.findOne({ where: { email }, raw: true });

    // If user does not exist.
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Account does not exist',
      });
    }

    const { password: hash, ...currentUser } = user;

    // Verify password
    const hashValid = await bcrypt.compare(password, hash);

    // If the password is incorrect.
    if (!hashValid) {
      return res.status(401).json({
        success: false,
        message: 'Password incorrect',
      });
    }

    // Generate and sign jwt.
    const { token, expiresIn } = generateToken(user);

    // Connect successfully.
    return res.status(200).json({
      success: true,
      user: currentUser,
      token: {
        jwt: token,
        expiresIn,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.sqlMessage,
      sql: error.sql,
    });
  }
});

/** Route sign Up */
router.post('/signUp', verifyBodySingUp, async (req, res) => {
  const errors = validationResult(req);

  // If there are any errors
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { password, ...userInfo } = req.body;

  try {
    // I search user
    const user = await User.findOne({
      where: { email: userInfo.email },
      raw: true,
    });

    // If user exist.
    if (user) {
      return res.status(401).json({
        success: false,
        message: 'Account already exist',
      });
    }

    // hash password.
    const hash = await generatePassword(password);

    // Create user.
    const useCreated = (await User.create({ password: hash, ...userInfo })).get(
      {
        plain: true,
      },
    );

    console.log();
    // If user is not create.
    if (!useCreated) {
      return res.status(400).json({
        success: false,
        message: 'Error create account',
      });
    }

    const { password: pwd, ...currentUser } = useCreated;

    // Generate and sign jwt.
    const { token, expiresIn } = generateToken(currentUser);

    // User created successfully.
    return res.status(201).json({
      success: true,
      user: currentUser,
      token: {
        jwt: token,
        expiresIn,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.sqlMessage,
      sql: error.sql,
    });
  }
});

module.exports = router;
