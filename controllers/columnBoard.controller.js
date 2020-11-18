const Board = require('../models/board.model');
const { v4: uuidv4 } = require('uuid');

exports.updateNameColumnController = (req, res) => {

    const { columnType } = req.query;
    const { nameColumn } = req.body;
    const { idBoard } = req.params;

    Board.findOneAndUpdate({ _id: idBoard, "column_header.type": columnType }, { $set: { "column_header.$.name": nameColumn } }, (err, result) => {
        if (err || !result) {
            res.status(400).json({
                error: 'Không thể cập nhật tên Column Board'
            });
        } else {
            return res.json({ resultBoard: result });
        }
    })
}

exports.addTaskColumnController = (req, res) => {
    const { columnType } = req.query;
    const { content } = req.body;
    const { idBoard } = req.params;

    const taskObject = {
        _id: uuidv4(),
        content: content,
        timeCreated: new Date().toLocaleString()
    }

    Board.findOneAndUpdate({ _id: idBoard, "column_header.type": columnType }, { $push: { "column_header.$.comment": taskObject } }, { new: true }, (err, result) => {
        if (err || !result) {
            res.status(400).json({
                error: 'Không thể thêm Task'
            });
        } else {
            return res.json({ resultBoard: result });
        }
    })
}

exports.updateTaskColumnController = (req, res) => {
    const { columnType, idTask } = req.query;
    const { nameTask } = req.body;
    const { idBoard } = req.params;

    Board.findOneAndUpdate({ "_id": idBoard, "column_header.type": columnType, "column_header.comment": { "$elemMatch": { "_id": idTask } } },
        { "$set": { "column_header.$[outer].comment.$[inner].content": nameTask } },
        { "arrayFilters": [{ "outer.type": columnType }, { "inner._id": idTask }] }, (err, result) => {
            if (err || !result) {
                res.status(400).json({
                    error: 'Không thể cập nhật tên Task'
                });
            } else {
                Board.findById({ _id: result._id }, (err, data) => {
                    return res.json({ resultBoard: data });
                })
            }
        });
}

exports.deleteTaskColumnController = (req, res) => {
    const { columnType, idTask } = req.query;
    const { idBoard } = req.params;

    Board.findOneAndUpdate({ "_id": idBoard, "column_header.type": columnType },
        { "$pull": { "column_header.$.comment": { _id: idTask } } }, (err, result) => {
            if (err || !result) {
                res.status(400).json({
                    error: 'Không thể cập nhật tên Task'
                });
            } else {
                Board.findById({ _id: result._id }, (err, data) => {
                    return res.json({ resultBoard: data });
                })
            }
        });
}