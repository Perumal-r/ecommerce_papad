// const User = require("../modules/register");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
// };

// const sendOTPEmail = async (email, otp) => {
//   // Setup transporter
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "pr657122@gmail.com",
//       pass: "ylgs qsyf oolw eimv",
//     },
//   });

//   const mailOptions = {
//     from: "pr657122@gmail.com",
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP is: ${otp}`,
//   };

//   await transporter.sendMail(mailOptions);
// };

// const addUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//      const otp = generateOTP();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
//     const user = new User({ email, password: hashedPassword,otp,
//       otpExpires,
//       isVerified: false, });
//     await user.save();
//      await sendOTPEmail(email, otp);
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating user", error: error.message });
//   }
// };

// const verifyOTP = async (req, res) => {
//   const { userId, otp } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user || user.otp !== otp || user.otpExpires < new Date()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid email or password" });

//     const token = jwt.sign({ userId: user._id.toString() }, "perumal123", {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         email: user.email,
//       },
//       token: token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { addUser,loginUser,verifyOTP  };

// const User = require("../modules/register");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
// };

// const sendOTPEmail = async (email, otp) => {
//   try {
//     if (!email || !email.includes('@')) {
//       throw new Error("Invalid email address");
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "pr657122@gmail.com",
//         pass: "ylgs qsyf oolw eimv",
//       },
//     });

//     const mailOptions = {
//       from: '"Your App Name" <pr657122@gmail.com>',
//       to: email,
//       subject: "Your OTP Verification Code",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #4CAF50;">Your OTP Code</h2>
//           <p>Please use the following OTP code to verify your account:</p>
//           <div style="background: #f4f4f4; padding: 10px; margin: 10px 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
//             ${otp}
//           </div>
//           <p>This code will expire in 10 minutes.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//         </div>
//       `,
//     };

//     await transporter.verify();
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//     throw new Error(`Failed to send OTP email: ${error.message}`);
//   }
// };

// const sendOtpOnly = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email || !email.includes('@')) {
//       return res.status(400).json({ message: "Valid email is required" });
//     }

//     // Check if the email is already verified (already registered)
//     const existingUser = await User.findOne({ email, isVerified: true });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered" });
//     }

//     // Find or create unverified user
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({ email, isVerified: false });
//     }

//     // Generate OTP
//     const otp = generateOTP();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

//     user.otp = otp;
//     user.otpExpires = otpExpires;
//     await user.save();

//     await sendOTPEmail(email, otp);

//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       email: user.email,
//       password: user.password,
//       userId: user._id
//     });
//   } catch (error) {
//     console.error("Send OTP error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send OTP",
//       error: error.message
//     });
//   }
// };

// // Step 1: Initiate registration by sending OTP
// const addUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // Check if user already exists (verified or unverified)
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       if (existingUser.isVerified) {
//         return res.status(400).json({ message: "User already exists" });
//       } else {
//         // If unverified user exists, delete it to allow new registration
//         await User.deleteOne({ email });
//       }
//     }

//     // Generate OTP and hash password
//     const otp = generateOTP();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create temporary unverified user
//     const tempUser = new User({
//       email,
//       password: hashedPassword,
//       otp,
//       otpExpires,
//       isVerified: false
//     });

//     await tempUser.save();
//     alert('hii')
//     await sendOTPEmail(email, otp);

//     res.status(200).json({ 
//       message: "OTP sent to email", 
//       userId: tempUser._id 
//     });

//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ 
//       message: "Error during registration", 
//       error: error.message 
//     });
//   }
// };

// // Step 2: Verify OTP and complete registration
// const verifyOTPAndRegister = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;

//     // Find the temporary user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check OTP validity
//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (user.otpExpires < new Date()) {
//       await User.deleteOne({ _id: userId }); // Clean up expired OTP
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // Mark user as verified
//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id.toString() }, "perumal123", {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       message: "Registration successful",
//       user: {
//         id: user._id,
//         email: user.email,
//       },
//       token: token,
//     });

//   } catch (err) {
//     console.error("OTP verification error:", err);
//     res.status(500).json({ 
//       message: "Error during OTP verification", 
//       error: err.message 
//     });
//   }
// };

// // Login controller remains the same
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email, isVerified: true });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ userId: user._id.toString() }, "perumal123", {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         email: user.email,
//       },
//       token: token,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { 
//   addUser, 
//   verifyOTPAndRegister, 
//   sendOtpOnly,
//   loginUser 
// };


// const User = require("../modules/register");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
// };

// const sendOTPEmail = async (email, otp) => {
//   try {
//     if (!email || !email.includes('@')) {
//       throw new Error("Invalid email address");
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "pr657122@gmail.com",
//         pass: "ylgs qsyf oolw eimv", // Use App Password here
//       },
//     });

//     const mailOptions = {
//       from: '"Your App Name" <pr657122@gmail.com>',
//       to: email,
//       subject: "Your OTP Verification Code",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #4CAF50;">Your OTP Code</h2>
//           <p>Please use the following OTP code to verify your account:</p>
//           <div style="background: #f4f4f4; padding: 10px; margin: 10px 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
//             ${otp}
//           </div>
//           <p>This code will expire in 10 minutes.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//         </div>
//       `,
//     };

//     await transporter.verify();
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//     throw new Error(`Failed to send OTP email: ${error.message}`);
//   }
// };

// // ✅ Step 1: Accept Email & Password, Send OTP
// const addUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !email.includes('@') || !password) {
//       return res.status(400).json({ message: "Valid email and password required" });
//     }

//     // If already verified user exists → block registration
//     const existingUser = await User.findOne({ email, isVerified: true });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already registered" });
//     }

//     // Delete old unverified record
//     await User.deleteOne({ email, isVerified: false });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = generateOTP();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       otp,
//       otpExpires,
//       isVerified: false,
//     });

//     await newUser.save();
//     await sendOTPEmail(email, otp);

//     res.status(200).json({
//       success: true,
//       message: "OTP sent to email",
//       userId: newUser._id,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error during registration",
//       error: error.message,
//     });
//   }
// };

// // ✅ Step 2: Verify OTP & Register
// const verifyOTPAndRegister = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;
// const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ message: "User already verified" });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (user.otpExpires < new Date()) {
//       await User.deleteOne({ _id: userId }); // Clean up
//       return res.status(400).json({ message: "OTP expired. Please register again." });
//     }

//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, "perumal123", {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Registration complete",
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         password: hashedPassword,
//       },
//     });

//   } catch (err) {
//     console.error("OTP verification error:", err);
//     res.status(500).json({
//       message: "Error during OTP verification",
//       error: err.message,
//     });
//   }
// };

// // ✅ Login after registration
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email, isVerified: true });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
// const hashedPassword = await bcrypt.hash(password, 10);
//     const token = jwt.sign({ userId: user._id }, "perumal123", {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         email: user.email,
//         password: hashedPassword,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   addUser,
//   verifyOTPAndRegister,
//   loginUser,
// };

const User = require("../modules/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "pr657122@gmail.com",
      pass: "ylgs qsyf oolw eimv", // App password
    },
  });

  const mailOptions = {
    from: '"Your App" <pr657122@gmail.com>',
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <div style="font-family: Arial; padding: 10px;">
        <h2>Your OTP Code</h2>
        <p>Use the code below to verify your account:</p>
        <h3>${otp}</h3>
        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.verify();
  await transporter.sendMail(mailOptions);
};

// 1) API: /send-otp  --> Save user (unverified) + send OTP
const sendOTP = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email and password required" });
    }

    // Check if verified user already exists
    const existingUser = await User.findOne({ email, isVerified: true });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Remove any unverified previous user
    await User.deleteOne({ email, isVerified: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerified: false,
    });
    await sendOTPEmail(email, otp);

    await newUser.save();
     res.status(200).json({
      success: true,
      message: "OTP sent to email",
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

// 2) API: /verify-otp  --> Verify OTP only
const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpires < new Date()) {
      await User.deleteOne({ _id: userId });
      return res.status(400).json({ message: "OTP expired. Please request OTP again." });
    }

    // Mark user as verified, clear OTP fields
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};

// 3) API: /register  --> After OTP verified, send JWT token and user info
const addUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, isVerified: true });
    if (!user) return res.status(400).json({ message: "User not verified" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "perumal123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Registration complete",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration error", error: error.message });
  }
};

// 4) API: /login  --> Login existing verified user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, isVerified: true });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "perumal123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  addUser,
  loginUser,
};
