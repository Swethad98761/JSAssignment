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

function displayImages(data) {
  var images = "";
  var i;
  for (i = 0; i < data.images.length; i++) {
    images += '<img src="' + data.images[i].URL + '"/>';
  }
  document.getElementById("img-container").innerHTML = images;
}
