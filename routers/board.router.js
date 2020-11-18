const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');

const requireSignin = expressJwt({
    secret: '176168hdsd821ie1iKDW'
});

const { readBoardController, updateNameBoardController, updateContentBoardController, updateColumnBoardController } = require('../controllers/board.controller');

router.get('/:idUser/:idBoard', requireSignin, readBoardController);
router.put('/update/:idBoard/name', requireSignin, updateNameBoardController);
router.put('/update/:idBoard/content', requireSignin, updateContentBoardController);
router.put('/update/:idBoard/column', requireSignin, updateColumnBoardController);

module.exports = router;