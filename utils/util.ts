/**

Generate a random string with specified length.
@param length Length of the random string.
@returns A randomly generated string with the specified length.
*/
export const randomString = (length: number) => {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < length; i++) {
    var index = Math.floor(Math.random() * chars.length);
    result += chars.charAt(index);
  }
  return result;
};

/**

Format a date time string to a human-readable date time format.
@param time The date time string to format.
@returns A formatted date time string in the format "MM/DD/YYYY hh:mm AM/PM".
*/
export const formatDateTime = (time: string) => {
  var date = new Date(time);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours() % 12 || 12;
  var minutes = date.getMinutes();
  var ampm = date.getHours() < 12 ? 'AM' : 'PM';
  var formattedTime = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
  return formattedTime;
};
