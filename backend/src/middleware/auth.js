const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  // hash the password using argon2 then call next()
  try {
    const hash = await argon2.hash(req.body.Password, hashingOptions);
    req.body.hashedPassword = hash;
    delete req.body.Password;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const verifyPassword = async (req, res) => {
  console.info(req.user);
  try {
    const isVerified = await argon2.verify(
      req.user.hashedPassword,
      req.body.Password
    );
    if (isVerified) {
      const payload = { sub: req.user.User_ID };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      // delete req.user.hashedPassword;
      res.send({ token, user: req.user });
    } else {
      res.status(401).send("Incorrect password");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res
        .status(401)
        .send("Vous n'avez pas d'authorisation de voir cette ressource");
    }
    // Check if the token starts with "Bearer "
    const isBearerToken = authHeader.startsWith("Bearer ");
    if (!isBearerToken) {
      res
        .status(401)
        .send({ message: "Authorisation Header is not of the type 'Bearer'" });
    }
    const token = authHeader.replace(/^Bearer\s+/, "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);
        res.sendStatus(401);
      } else {
        // Token is valid, proceed with the next middleware
        req.User_ID = decoded.sub;
        next();
      }
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyId = (req, res, next) => {
  try {
    if (req.User_ID === parseInt(req.params.id, 10)) {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyId,
};
