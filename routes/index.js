const router = require('express').Router();

router.get(':id', (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;
