var BookingsController = function (bookingModel) {
    this.ApiResponse = require('../models/api-response.js');
    this.ApiMessages = require('../models/api-messages.js');
    this.bookingModel = bookingModel;
};

BookingsController.prototype.getBookings = function (userId, fromDate, toDate, page, pageSize, sortColumn, sortDir, callback) {

    var me = this;   

    var query = {
        ownerUserId: userId,
        fromDate: { '$gte': fromDate },
        toDate: { '$lt': toDate }
    };

    me.bookingModel.find(query)
        .sort({
            sortColumn: sortDir
        })
        .skip(pageSize * page)
        .limit(pageSize)
        .exec(function (err, bookings) {
            if (err) {
                return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
            }

            return callback(err, new me.ApiResponse({success: true, extras: {bookings: bookings}}));
        });
};

module.exports = BookingsController;