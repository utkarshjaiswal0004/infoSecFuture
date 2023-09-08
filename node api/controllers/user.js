
const bcrypt = require("bcrypt");
const AppUser = require("../models/user");
const Token = require("../models/token");
var {generateLogToken, logger, transporter} = require('./utils');


const registerUserWithEmail = async (req, res) => {
  let newUser;
  let token;
  try {
    const { email, fullName, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await AppUser.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User Already Present" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and a verification token within a transaction
    const session = await AppUser.startSession();
    session.startTransaction();

    try {
      newUser = new AppUser({
        email: email,
        full_name: fullName,
        password: hashedPassword,
        created_at: Date.now(),
        user_role:role,
        email_verified: false
      });
      await newUser.save();


      const tokenData =  generateLogToken(newUser);

      // Create a verification token
      token = new Token({
        user_id: newUser._id,
        token: tokenData,
        created_at: Date.now(),
        valid_for_sec: 24 * 60 * 60,
      });
      await token.save(); 

      const link = `${process.env.SERVER_URL}/api/${process.env.API_Version}/user/verifyEmailAccount/${token.token}`;
      // Send a verification email
      await sendVerificationEmail(newUser.email, link);
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        success: true,
        message: 'Verification Email Sent',
        user_data: newUser,
      });
    } catch (err) {
      // Roll back the transaction if an error occurs
      await session.abortTransaction();
      session.endSession();
      throw err; 
    }
  } catch (err) {
    logger.error(`Error during user registration: ${err}`);
    res.status(500).json({
      success: false,
      message: err.message,
      user_data: [],
    });
  }
};

const sendVerificationEmail = async (email, link) => {
  try {
    // Define the email content
    const emailContent = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Account Verification Ask Your Task",
      text: "Welcome",
      html: `
        <div>
          <h2>Welcome to InfoTecSolution.</h2>
          <a href=${link}>
            Click here to activate your account
          </a>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(emailContent);
  } catch (err) {
    logger.error(`Error sending email: ${err}`);
    throw err; // Re-throw the error for global error handling
  }
};


const verifyEmailAccount = async (req, res) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });
    if(token == null) {
      const errorMessage = 'Either the account is already verified or the verification link has been expired.'; // Customize this error message
      res.redirect(`/api/${process.env.API_Version}/user/verification-error?error=${encodeURIComponent(errorMessage)}`);
      return; 
    }
    await AppUser.updateOne({
      _id: token.user_id
    }, 
    {
      $set:
         {
          email_verified:true,
          updated_at: Date.now(),
        }
    });
    await Token.findByIdAndRemove(token._id);
    res.redirect(`/api/${process.env.API_Version}/user/verification-success`);
  } catch (err) {
  const errorMessage = 'Some server side error occurred'; // Customize this error message
  res.redirect(`/api/${process.env.API_Version}/user/verification-error?error=${encodeURIComponent(errorMessage)}`);
  }
};


const loginWithEmail = async (req, res) => {
  try {
    const user = await AppUser.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(500).json({
        accountFound: false,
        passwordMatch: false,
        emailVerified: false,
        message: "Email account not found",
      });
      return;
    }

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) {
      res.status(500).json({
        accountFound: true,
        passwordMatch: false,
        emailVerified: false,
        message: "Password doesn't match",
      });
      return;
    }

    if (!user.email_verified) {
      res.status(500).json({
        accountFound: true,
        passwordMatch: true,
        emailVerified: false,
        message: "Email Id isn't verified. Kindly check your mail inbox to verify the id",
      });
      return;
    }

    const userData = {
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      user_role: user.user_role,
    }; 

    const tokenData = generateLogToken(user);


    res.status(200).json({
      success: true,
      message: 'Fetched User Data',
      userData: userData,
      tokenData: tokenData
    });

  } catch (err) {
    logger.error(`Error sending email: ${err}`);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {
  registerUserWithEmail,
  sendVerificationEmail,
  verifyEmailAccount,
  loginWithEmail
};
