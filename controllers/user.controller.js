const User = require('../models/user.model');

exports.readController = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Tài khoản không tìm thấy'
            });
        }
        user.hashPassword = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.updateController = (req, res) => {
    const { name, password } = req.body;
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Tài khoản không tìm thấy'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name không được để trống'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 8) {
                return res.status(400).json({
                    error: 'Mật khẩu chứa ít nhất 8 kí tự'
                });
            } else if (!password.match(/\d/)) {
                return res.status(400).json({
                    error: 'Mật khẩu phải chứa ít nhất 1 số'
                })
            } else if (!password.match(/^(?=.*[a-z])/)) {
                return res.status(400).json({
                    error: 'Mật khẩu phải chứa ít nhất 1 kí tự thường'
                })
            } else if (!password.match(/^(?=.*[A-Z])/)) {
                return res.status(400).json({
                    error: 'Mật khẩu phải chứa ít nhất 1 kí tự hoa'
                })
            } else if (!password.match(/^(?=.*[@$!%*#?&]).*$/)) {
                return res.status(400).json({
                    error: 'Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt'
                })
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                return res.status(400).json({
                    error: 'Cập nhật thông tin không thành công'
                });
            }
            updatedUser.hashPassword = undefined;
            updatedUser.salt = undefined;
            res.json({
                updatedUser
            });
        });
    });
};
