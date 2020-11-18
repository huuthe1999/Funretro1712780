const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    salt: String,
    resetPassWordLink: {
        data: String,
        default: ''
    },
    listBoardId: [],
}, { timeStamp: true });

userSchema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashPassword = this.encryptPassword(password);
}).get(function () {
    return this._password;
});

userSchema.methods = {

    //Tao Salt
    makeSalt: () => {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },

    // Encypt mat khau
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    },

    //Compare password
    authenticate: function (authPassword) {
        return this.encryptPassword(authPassword) === this.hashPassword;
    }
}

module.exports = mongoose.model('User', userSchema);