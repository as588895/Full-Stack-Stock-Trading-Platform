const User = require("../../model/UserModel");
const generateToken = require("../utils/generateToken");

// =======================
// Signup
// =======================

// exports.signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all fields",
//       });
//     }

//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already registered",
//       });
//     }

//     const user = await User.create({
//       username,
//       email,
//       password,
//     });

//     const token = generateToken(user._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Account Created Successfully",
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     });

//   } catch (err) {

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });

//   }
// };

exports.signup = async (req, res) => {
  try {
    console.log("Signup Body:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    console.log("User Created:", user);

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      token,
    });

  } catch (err) {
    console.error("Signup Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// Login
// =======================

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please enter email & password",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });

    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });

    }

    const token = generateToken(user._id);

res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // localhost
});

res.json({
    message:"Login Successful",
    token,
    user
});

  } catch (err) {

    console.error("Signup Error:", err);

  res.status(500).json({
    success: false,
    message: err.message,
  });


  }

};

exports.getMe = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({

                success:false,
                message:"User not found"

            });

        }

        res.json({

            success:true,
            user

        });

    } catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

};

// =======================
// Logout
// =======================

exports.logout = (req, res) => {

  res.cookie("token", "", {

    httpOnly: true,
    expires: new Date(0),

  });

  res.json({

    success: true,
    message: "Logged Out Successfully",

  });

};