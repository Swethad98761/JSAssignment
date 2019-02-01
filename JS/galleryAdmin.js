function valid(imageName, imageURL, uploadedDate) {
  if (imageName == "") {
    window.alert("Please enter your name.");
    return false;
  }
  var regex = /(http(s?):)?([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  if (regex.test(imageURL) == false) {
    window.alert("Please enter valid URL");
    return false;
  }
  var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  // Match the date format through regular expression
  if (uploadedDate.match(dateformat)) {
    var currentDate = new Date();
    var givenDate = uploadedDate;
    var givenDate = new Date(
      givenDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    );

    if (currentDate < givenDate) {
      window.alert("Please do not enter future date");
      return false;
    }
    //Test which seperator is used '/' or '-'
    var opera1 = uploadedDate.split("/");
    var opera2 = uploadedDate.split("-");
    lopera1 = opera1.length;
    lopera2 = opera2.length;
    // Extract the string into month, date and year
    if (lopera1 > 1) {
      var pdate = uploadedDate.split("/");
    } else if (lopera2 > 1) {
      var pdate = uploadedDate.split("-");
    }
    var dd = parseInt(pdate[0]);
    var mm = parseInt(pdate[1]);
    var yy = parseInt(pdate[2]);
    // Create list of days of a month [assume there is no leap year by default]
    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm == 1 || mm > 2) {
      if (dd > ListofDays[mm - 1]) {
        window.alert("Invalid date format!");
        return false;
      }
    }
    if (mm == 2) {
      var lyear = false;
      if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        lyear = true;
      }
      if (lyear == false && dd >= 29) {
        window.alert("Invalid date format!");
        return false;
      }
      if (lyear == true && dd > 29) {
        window.alert("Invalid date format!");
        return false;
      }
    }
  } else {
    window.alert("Invalid date format!");
    return false;
  }
  return true;
}
function displayModalForAdd() {
  var modal = document.getElementById("myModalForAdd");
  displayModal(modal);
}
function addImages() {
  var imageName = document.getElementById("ImageName").value;
  var imageURL = document.getElementById("ImageURL").value;
  var uploadedDate = document.getElementById("UploadedDate").value;
  var imageInfo = document.getElementById("additionalInfo").value;
  if (valid(imageName, imageURL, uploadedDate) == true) {
    var modal = document.getElementById("myModalForAdd");
    modal.style.display = "none";
    if (localStorage.getItem("images")) {
      var data = JSON.parse(localStorage.getItem("images"));
      data.images.push({
        name: imageName,
        URL: imageURL,
        date: uploadedDate,
        information: imageInfo
      });
      localStorage.setItem("images", JSON.stringify(data));
      displayImages(data);
    } else {
      var request = new XMLHttpRequest();
      request.open("GET", "../JSON/images.json", false);
      request.send(null);
      var data = JSON.parse(request.responseText);
      data.images.push({
        name: imageName,
        URL: imageURL,
        date: uploadedDate,
        information: imageInfo
      });
      localStorage.setItem("images", JSON.stringify(data));
      displayImages(data);
    }
  }
}
if (localStorage.getItem("images")) {
  var data = JSON.parse(localStorage.getItem("images"));
  displayImages(data);
} else {
  var request = new XMLHttpRequest();
  request.open("GET", "../JSON/images.json", false);
  request.send(null);
  var data = JSON.parse(request.responseText);
  localStorage.setItem("images", JSON.stringify(data));
  displayImages(data);
}
function deleteOrEditImage(index) {
  setIndex(index);
  var modal = document.getElementById("myModalForEdit");
  var data = JSON.parse(localStorage.getItem("images"));
  var name = data.images[index].name;
  var URL = data.images[index].URL;
  var date = data.images[index].date;
  var information = data.images[index].information;
  displayModal(modal);
  document.getElementById("ImageNameForEdit").value = name;
  document.getElementById("ImageURLForEdit").value = URL;
  document.getElementById("UploadedDateForEdit").value = date;
  document.getElementById("additionalInfoForEdit").value = information;
}
function setIndex(index) {
  window.index = index;
}
function editImage() {
  var data = JSON.parse(localStorage.getItem("images"));
  var imageName = document.getElementById("ImageNameForEdit").value;
  var imageURL = document.getElementById("ImageURLForEdit").value;
  var uploadedDate = document.getElementById("UploadedDateForEdit").value;
  var imageInfo = document.getElementById("additionalInfoForEdit").value;
  if (valid(imageName, imageURL, uploadedDate)) {
    data.images[index].name = imageName;
    data.images[index].URL = imageURL;
    data.images[index].date = uploadedDate;
    data.images[index].information = imageInfo;
    localStorage.setItem("images", JSON.stringify(data));
    var modal = document.getElementById("myModalForEdit");
    modal.style.display = "none";
  }
}
function deleteImage() {
  if (localStorage.getItem("images")) {
    var data = JSON.parse(localStorage.getItem("images"));
    data.images.splice(window.index, 1);
    localStorage.setItem("images", JSON.stringify(data));
    var modal = document.getElementById("myModalForEdit");
    modal.style.display = "none";
    displayImages(data);
  }
}
function displayImages(data) {
  var images = "";
  var i;
  for (i = 0; i < data.images.length; i++) {
    images +=
      '<img src="' +
      data.images[i].URL +
      '"ondblclick="deleteOrEditImage(' +
      i +
      ')"/>';
  }
  document.getElementById("img-container").innerHTML = images;
}
// Get the modal
function displayModal(modal) {
  // Get the <span> element that closes the modal
  var span = modal.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
