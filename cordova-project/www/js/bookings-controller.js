var BookIt = BookIt || {};

BookIt.BookingsController = function () {
    this.localStorageKey = "bookit.bookings";
    this.$bookingsPage = null;
    this.$btnRefresh = null;
    this.$bookingsListCtn = null;
    this.bookings = [];
};

BookIt.BookingsController.prototype.init = function () {
    this.$bookingsPage = $("#page-bookings");
    this.$btnRefresh = $("#btn-refresh", this.$bookingsPage);
    this.$bookingsListCtn = $("#bookings-list-ctn", this.$bookingsPage)

    // For testing purposes only
    window.localStorage.setItem(this.localStorageKey, JSON.stringify([{
        dateTimeFrom: '8/27/2015 9:00 AM',
        dateTimeTo: '8/27/2015 11:00 AM',
        description: 'HR Systems rollout'
    }, {
        dateTimeFrom: '8/27/2015 3:00 PM',
        dateTimeTo: '8/27/2015 3:30 PM',
        description: 'Business Intelligence Training'
    }, {
        dateTimeFrom: '8/28/2015 11:00 AM',
        dateTimeTo: '8/28/2015 11:30 AM',
        description: 'Development team status check'
    }, {
        dateTimeFrom: '8/28/2015 2:00 PM',
        dateTimeTo: '8/28/2015 4:30 PM',
        description: 'Information Security Awareness Training'
    }]));
};

BookIt.BookingsController.prototype.getBookingsFromLocalStorage = function () {

    var result = [];

    try {
        result = JSON.parse(window.localStorage.getItem(this.localStorageKey)) || [];
    } catch (e) {
        result = [];
    }

    return result;
};

BookIt.BookingsController.prototype.renderBookings = function () {

    var dateGroup,
        bookingDate,
        bookingsCount,
        booking,
        ul,
        li,
        liArray = [],
        lisString,
        view;

   this.$bookingsListCtn.empty();

   if (this.bookings.length === 0) {
       $("<p>No bookings found</p>").appendTo(this.$bookingsListCtn);
       return;
   }


   ul = $("<ul id=\"bookings-list\" data-role=\"listview\"></ul>").appendTo(this.$bookingsListCtn);

    for (i = 0; i < this.bookings.length; i += 1) {

        booking = this.bookings[i];

        bookingDate = (new Date(booking.dateTimeFrom).toDateString())

        if (dateGroup != bookingDate) {
            dateGroup = bookingDate;
            liArray.push("<li data-theme=\"b\" data-role=\"list-divider\">" + dateGroup + "</li>");            
        }

        li = "<li><a><div class=\"bi-list-item-secondary\"><p>" + (new Date(booking.dateTimeFrom)).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) +
           " to " + (new Date(booking.dateTimeTo)).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) + "</p></div>" +
                    "<div class=\"bi-list-item-primary\">" + booking.description + "</div></a></li>";

        liArray.push(li);
    }

    liString = liArray.join("");
    $(liString).appendTo(ul);

    ul.listview();

};

BookIt.BookingsController.prototype.showBookingsFromServer = function () {
    // TODO: implement
    throw "Not Implemented";

    $.ajax({
        url: BookIt.Settings.bookingsUrl,
        data: "" // TODO: send session token.
    })
    .done(function (data,status,xhr) {
        // TODO: Save downloaded bookigns to local storage and render to DOM.
            
    })
    .fail(function (xhr,status,err) {
        // TODO: implement.
    })
    .always(function (xhr,status) {
        this.renderBookings();
    });
};

BookIt.BookingsController.prototype.showBookings = function () {

    this.bookings = this.getBookingsFromLocalStorage();

    // Retrieve from server if local storage empty and online (Add offline check).
    if (!this.bookings || this.bookings.length == 0) {

        this.showBookingsFromServer();  
    } else {

        this.renderBookings();
    }  
};

BookIt.BookingsController.prototype.getBookingsFromServer = function (successCallback, errorCallback) {
    var session = BookIt.Session.getInstance().get();

    if (!session) {
        return errorCallback({ err: BookIt.ApiMessages.SESSION_NOT_FOUND });
    }

    $.ajax({
        type: 'GET',
        url: BookIt.Settings.bookingsUrl + "/sessionId=" + session.sessionId,
        success: successCallback,
        error: errorCallback
    });
};

BookIt.BookingsController.prototype.onRefreshCommand = function () {
    
    this.getBookingsFromServer(
        function (resp) {
            // TODO
        },
        function (error) {
            // TODO
        }
    );
};