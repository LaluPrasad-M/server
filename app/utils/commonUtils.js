exports.makeId = (length, startString) => {
  var result = "";
  if (startString) {
    if (startString.lastIndexOf("@") !== -1) {
      startString = startString.substring(0, startString.lastIndexOf("@"));
    }
    startString = startString.replace(/[^a-zA-Z0-9.]/g, "");
    result = startString + "_";
  }
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};