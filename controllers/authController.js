// Password hashing
const bcrypt = require("bcryptjs");
const authRepository = require("../repositories/authRepository");

// Validation
const { validationResult } = require("express-validator");

// jsonwebtoken
const jwt = require("jsonwebtoken");

function displayLogin(req, res) {
  res.send(
    "TODO - This currently outputs a res.send but it should actually just output a json file for the front end to process.",
  );
}
function displaySignup(req, res) {
  res.send(
    "TODO - This currently outputs a res.send but it should actually just output a json file for the front end to process.",
  );
}

async function handleLogin(req, res) {
  try {
    const errors = validationResult(req);

    // initial validation
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // check db to ensure email exists
    const userRecord = await authRepository.checkEmailExists(email);
    if (!userRecord) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // check password match
    const match = await bcrypt.compare(password, userRecord.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const opts = { expiresIn: 60 * 60 }; //token expires in 2min
    const secret = process.env["SECRET_KEY"];
    const token = jwt.sign(
      {
        userId: userRecord.id,
        role: userRecord.role,
      },
      secret,
      opts,
    );
    return res.status(200).json({
      message: "Auth Passed",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}

async function handleSignup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log(hashedPassword);
    console.table(req.body);
    await authRepository.createUser(req.body, hashedPassword);
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong please try again");
  }
}

async function handleLogout(req, res) {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
}

module.exports = {
  displayLogin,
  handleLogin,
  displaySignup,
  handleSignup,
  handleLogout,
};
