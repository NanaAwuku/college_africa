// const asyncHandler = require('express-async-handler')
const pool = require("../database/index");
const validation = require('../middleWare/validationMiddleware')
const userSchema = require('../validations/userValidation')
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// @desc Register new user
// @route POST /api/users

const registerUser = async (req, res) => {
  try {
     validation(userSchema);

     const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const sql =
      "INSERT INTO ca_users (`USR_NAME`, `USR_EMAIL`, `USR_PASSWORD`) VALUES (?)";
    const values = [req.body.name, req.body.email, hashedPassword];
    if (!values) {
      res.status(400).json({message: "request not successful"});
      
    } else {
      const [rows, fields] = await pool.query(sql, [values]);
      res.status(200).json({
        message:"account successfuly created",
        data: rows,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};





// @desc Login a new user
// @route POST /api/users/login
const loginUser = async (req, res) => {
  try {
    await schema.validate(req.body);
    // form submission 
     const sql = "SELECT * FROM ca_users WHERE USR_EMAIL = ?";
     const [rows, fields] = await pool.query(sql, [req.body.email]);
     const user = rows[0];
 
     // Check if user exists in the database
     if (!user) {
       return res.status(401).json({ error: "Invalid email or password" });
     }
 
     // Compare the user password with the hashed password in the database
     const match = await bcrypt.compare(req.body.password, user.USR_PASSWORD);
     if (!match) {
       return res.status(401).json({ error: "Invalid email or password" });
     }

     res.status(200).json({
       message: "Login successful",
    
     });
   } catch (error) {
     return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
