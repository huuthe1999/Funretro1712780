const Board = require('../models/board.model');

exports.readBoardController = (req, res) => {
    const { idUser, idBoard } = req.params;
    Board.findById(idBoard).exec((err, board) => {
        if (err || !board) {
            res.status(400).json({
                error: 'Board không tìm thấy'
            });
        } else {
            return res.json({ resultBoard: board });
        }
    });

}

exports.updateNameBoardController = (req, res) => {
    const { nameBoard } = req.body;
    const { idBoard } = req.params;
    Board.findByIdAndUpdate(idBoard, { name: nameBoard }, (err, result) => {
        if (err || !result) {
            res.status(400).json({
                error: 'Không thể cập nhật Board'
            });
        } else {
            return res.json({ resultBoard: result });
        }
    })
}

exports.updateContentBoardController = (req, res) => {
    const { content_context } = req.body;
    const { idBoard } = req.params;
    Board.findByIdAndUpdate(idBoard, { content_context: content_context }, (err, result) => {
        if (err || !result) {
            res.status(400).json({
                error: 'Không thể cập nhật Board'
            });
        } else {
            return res.json({ resultBoard: result });
        }
    })
}

exports.updateColumnBoardController = (req, res) => {
    const { column_header } = req.body;
    const { idBoard } = req.params;
    Board.findByIdAndUpdate(idBoard, { column_header: column_header }, (err, result) => {
        if (err || !result) {
            res.status(400).json({
                error: 'Không thể cập nhật Board'
            });
        } else {
            return res.json({ resultBoard: result });
        }
    })
}