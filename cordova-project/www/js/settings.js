var BookIt = BookIt || {};
BookIt.Settings = BookIt.Settings || {};
BookIt.Settings.signUpUrl = "http://127.0.0.1:30000/api/account/register";  //"http://192.168.1.104:30000/api/account/register"; //;
BookIt.Settings.signInUrl = "http://127.0.0.1:30000/api/account/logon"; //"http://192.168.1.104:30000/api/account/logon"; //
BookIt.Settings.bookingsUrl = "http://127.0.0.1:30000/api/bookings"; //"http://192.168.1.104:30000/api/bookings"; //
BookIt.Settings.sessionIdKey = "bookit-session";
BookIt.Settings.sessionTimeoutInMSec = 86400000 * 30;   // 30 days.