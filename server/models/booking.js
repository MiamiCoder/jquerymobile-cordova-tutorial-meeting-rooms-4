// ./models/booking.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    ownerUserId: String,
    locationId: String,
    dateTimeFrom: Date,
    dateTimeTo: Date,
    numberOfAttendees: Number,
    needsNetwork: Boolean,
    needsConfPhone: Boolean,
    needsVideo: Boolean,
    needsInternet: Boolean
    // TODO: Add description field.
});

module.exports = mongoose.model('Booking', BookingSchema);