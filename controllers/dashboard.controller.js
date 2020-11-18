const Board = require('../models/board.model');
const User = require('../models/user.model');

exports.readDashboardController = (req, res) => {
    const userId = req.params.idUser;

    User.findById(userId).exec((err, user) => {
        let resultlistBoard = [];
        if (err || !user) {
            res.status(400).json({
                resultlistBoard,
                error: 'Tài khoản không tìm thấy'
            });
        } else {
            const listBoardId = user.listBoardId;
            if (!listBoardId || listBoardId.length === 0) {
                res.status(400).json({
                    resultlistBoard,
                    error: 'Tài khoản chưa có danh sách công việc'
                });
            }
            else {
                Board.find().where('_id').in(listBoardId).exec((err, result) => {
                    if (err) {
                        return res.json({
                            error: `Lỗi`
                        });
                    }
                    else {
                        return res.json({
                            resultlistBoard: result
                        });
                    }
                })
            }
        }
    });

}

exports.addBoardItemController = (req, res) => {
    const { idUser, nameBoard, contentBoard } = req.body;
    const board = new Board({
        name: nameBoard,
        content_context: contentBoard
    });
    board.save((err, board) => {
        if (err) {
            return res.status(401).json({
                errors: errorHandler(err),
            })
        } else {
            User.findOne({ _id: idUser }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Tài khoản không tìm thấy'
                    });
                }
                user.listBoardId.push(board._id);
                user.save((err, updatedUser) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Cập nhật thông tin không thành công'
                        });
                    }
                    updatedUser.hashPassword = undefined;
                    updatedUser.salt = undefined;
                    return res.json({
                        updatedUser,
                        board
                    });
                });
            });
        }
    });

}

exports.deleteBoardItemController = (req, res) => {
    const { idBoard, idUser } = req.params;
    User.findById(idUser, (err, user) => {
        if (err) {
            res.status(400).json({
                error: 'Xóa bảng không thành công'
            });
        } else {
            const filteredBoardItems = user.listBoardId.filter(item => item != idBoard);
            user.listBoardId = filteredBoardItems;
            user.save((err, updatedUser) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Cập nhật thông tin Board không thành công'
                    });
                } else {
                    Board.findByIdAndDelete(idBoard, async (err, board) => {
                        if (err) {
                            res.status(400).json({
                                error: 'Xóa bảng không thành công'
                            });
                        } else {
                            res.json({
                                updatedUser,
                                board
                            });
                        }
                    })
                }
            });
        }
    })
    // User.findById(userId).exec((err, user) => {
    //     let resultlistBoard = [];
    //     if (err || !user) {
    //         res.status(400).json({
    //             resultlistBoard,
    //             error: 'Tài khoản không tìm thấy'
    //         });
    //     } else {
    //         const listBoardId = user.listBoardId;
    //         if (!listBoardId || listBoardId.length === 0) {
    //             res.status(400).json({
    //                 resultlistBoard,
    //                 error: 'Tài khoản chưa có danh sách công việc'
    //             });
    //         }
    //         else {
    //             Board.findByIdAndDelete(boardSelectId, (err, board) => {
    //                 if (err) {
    //                     res.status(400).json({
    //                         error: 'Xóa bảng không thành công'
    //                     });
    //                 } else {
    //                     User.findByIdAndRemove({ _id: idUser }, { listBoardId: boardSelectId }, (err, user) => {
    //                         if (err) {
    //                             res.status(400).json({
    //                                 error: 'Cập nhật danh sách Board không thành công'
    //                             });
    //                         } else {
    //                             return res.json({
    //                                 updatedUser: user,
    //                             });
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     }
    // });




}