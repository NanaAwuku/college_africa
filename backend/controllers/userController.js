const pool = require("../database/index");
const validation = require('../middleWare/validationMiddleware')
const userSchema = require('../validations/userValidation')
const bcrypt = require('bcryptjs')

const router = require("../routes/userRoutes");

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
    const { email, password } = req.body;
    const sql = "SELECT * FROM ca_users WHERE USR_EMAIL = ?";
    const [rows, fields] = await pool.query(sql, [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.USR_PASSWORD);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.user = { id: user.USR_ID, name: user.USR_NAME };
    res.status(200).json({ message: "Login successful", data: req.session.user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Route for guest users to view app links


module.exports = {
  registerUser,
  loginUser,
};
