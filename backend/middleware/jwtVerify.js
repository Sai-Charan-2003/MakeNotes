const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).send("Access denied...No token provided...");
  try {
    const { _, username } = jwt.verify(token, process.env.SECRET_KEY);
    req.username = username;
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = { jwtVerify };
