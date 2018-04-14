const express = require('express');
const router = express.Router();

const db = require('../db/queries');

router.get('/:query/:topicId', async (req, res, next) => {
  try {
      const results = await db.search.searchResults(req.params.query, req.params.topicId);
      res.json(results);
  } catch (e) {
      res.sendStatus(400);
  }
});
  
module.exports = router;