const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');

const requireSignin = expressJwt({
    secret: '176168hdsd821ie1iKDW'
});

const { updateNameColumnController, addTaskColumnController, updateTaskColumnController, deleteTaskColumnController } = require('../controllers/columnBoard.controller');

router.put('/update/:idBoard/nameColumn', requireSignin, updateNameColumnController);
router.post('/task/add/:idBoard', requireSignin, addTaskColumnController);
router.put('/task/update/:idBoard', requireSignin, updateTaskColumnController);
router.delete('/task/delete/:idBoard', requireSignin, deleteTaskColumnController);

module.exports = router;