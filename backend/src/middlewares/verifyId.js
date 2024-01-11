const verifyId = (req, res, next) => {
  try {
    if (req.payload.sub === parseInt(req.params.id, 10)) {
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
  verifyId,
};
