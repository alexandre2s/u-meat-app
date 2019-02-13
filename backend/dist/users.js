"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "j@j.com": new User('j@j.com', 'juliana', 'j@j.com'),
    "a@a.com": new User('a@a.com', 'amanda', 'a@a.com')
};
