var BookingMock = function () {
    this.err = false;
    this.numberAffected = 0;
    this.bookings = [];
}

BookingMock.prototype.setError = function (err) {
    this.err = err;
};

BookingMock.prototype.setNumberAffected = function (number) {
    this.numberAffected = number;
};

BookingMock.prototype.find = function (query, callback) {
    return this;
};

BookingMock.prototype.sort = function (sort) {
    return this;
};

BookingMock.prototype.skip = function (count) {
    return this;
};

BookingMock.prototype.limit = function (pageSize) {
    return this;
};

BookingMock.prototype.exec = function (callback) {
    return callback(this.err, []);
};

module.exports = BookingMock;