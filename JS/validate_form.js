function validate_form() {
  var name = document.forms["ContactInfoForm"]["name"];
  var email = document.forms["ContactInfoForm"]["email"];

  if (name.value == "") {
    window.alert("Please enter your name.");
    name.focus();
    return false;
  }

  if (email.value == "") {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (email.value.indexOf("@", 0) < 0) {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (email.value.indexOf(".", 0) < 0) {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (what.selectedIndex < 1) {
    alert("Please enter your course.");
    what.focus();
    return false;
  }

  return true;
}
