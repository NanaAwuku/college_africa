// const asyncHandler = require('express-async-handler')
const pool = require("../database/index");

const validation = require('../middleWare/validationMiddleware')
const userSchema = require('../validations/userValidation')

// @desc creat app links
// @route POST /api/app

const createApp = async (req, res) => {
  try {
    validation(userSchema);
    const sql =
      "INSERT INTO app_user_tb (`APP_NAME`, `APP_ICON`, `APP_URL`) VALUES (?)";
    const values = [req.body.name, req.body.icon, req.body.url];
    if (!values) {
      return res.status(400).json({ error: error.message });
    } else {
      const [rows, fields] = await pool.query(sql, [values]);
      res.json({
        data: rows,
        message:"account successfuly created",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// @desc Login a new user
// @route POST /api/users/app/:id
const updateApp = async (req, res) => {
  try {
    validation(userSchema);
    const appId = req.params.id;
    const sql =
      "UPDATE app_user_tb SET `APP_NAME` = ?, `APP_ICON` = ?, `APP_URL` = ? WHERE `APP_ID` = ?";
    const values = [req.body.name, req.body.icon, req.body.url, appId];
    if (!values) {
      return res.status(400).json({ error: "Missing app data" });
    } else {
      const [rows, fields] = await pool.query(sql, values);
      res.json({
        data: rows,
        message:"account successfuly Updated",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteApp = async (req, res) => {
  try {
    const appId = req.params.id;
    const sql = "DELETE FROM app_user_tb WHERE `APP_ID` = ?";
    const [rows, fields] = await pool.query(sql, [appId]);
    res.json({
      data: rows,
      message:"account successfuly deleted",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const listApps = async (req, res) => {
  try {
    const sql = "SELECT `APP_NAME`, `APP_URL` FROM app_user_tb";
    const [rows, fields] = await pool.query(sql);
    res.json({
      data: rows,
      message: "all items fetched successfully"
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



module.exports = {
  createApp,
  updateApp,
  deleteApp,
  listApps
};
