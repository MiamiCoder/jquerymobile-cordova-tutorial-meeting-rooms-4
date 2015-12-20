var BookingsController = require('../controllers/bookings.js'),
    should = require('should'),
    BookingMock = require('./booking-mock.js');

describe('BookingsController', function () {

    var controller,
        bookingMock,
        userSessionMock;

    beforeEach(function (done) {
        bookingMock = new BookingMock();
        controller = new BookingsController(bookingMock);
        done();
    });

    describe('#bookings', function () {

        it('Returns bookings list', function (done) {

            var userId = 0,
                fromDate = null,
                toDate = null,
                page = 1,
                pageSize = 10,
                sortColumn = null,
                sortDir = null;

            controller.getBookings(userId, fromDate, toDate, page, pageSize, sortColumn, sortDir, function (err, apiResponse) {

                should(apiResponse.success).equal(true);
                done();
            });
        });
    })
});