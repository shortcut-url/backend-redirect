const { dbQuery } = require('../db');

const router = require('express').Router();

router.get('/:shortURL', async (req, res, next) => {
  let { shortURL } = req.params;

  if (!shortURL) {
    return res.redirect(`${process.env.MAIN_SITE_URL}`);
  }

  let {
    rows: [url],
  } = await dbQuery(
    `
      UPDATE
        "urls"
      SET
        "numberTransitions" = "numberTransitions" + 1
      WHERE
        "url" = $1
      RETURNING "originalURL"
    `,
    [shortURL]
  );

  if (!url) {
    let queryParams = new URLSearchParams();
    queryParams.set(
      'errorText',
      'No shortened URL found. Perhaps the author has temporarily restricted the transition or removed it.'
    );

    return res.redirect(`${process.env.MAIN_SITE_URL}/404?${queryParams}`);
  }

  res.redirect(url.originalURL);
});

module.exports = router;
