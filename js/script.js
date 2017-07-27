var menu = document.querySelector(".page-header__menu");
var menu__button = document.querySelector(".page-header__menu-button");
var contest = document.querySelector(".contest");

if(menu && menu__button){
  menu.classList.remove("page-header__menu--opened");
  menu__button.classList.remove("page-header__menu-button--close-menu");
  menu__button.addEventListener("click", function(event){
    var menu_opened = document.querySelector(".page-header__menu--opened");
    event.preventDefault();
    if(menu_opened){
      menu.classList.remove("page-header__menu--opened");
      menu__button.classList.remove("page-header__menu-button--close-menu");
    }
    else {
      menu.classList.add("page-header__menu--opened");
      menu__button.classList.add("page-header__menu-button--close-menu");
    }
  });
};

if (contest) {
  var contestSurname = contest.querySelector("#surname");
  var contestName = contest.querySelector("#name");
  var contestEmail = contest.querySelector("#email");
  var contestSubmit = contest.querySelector("#submit");
  var modal = document.querySelectorAll(".page-modal");
  var modalSuccess = document.querySelector(".page-modal--success");
  var modalFailure = document.querySelector(".page-modal--failure");
  var modalButton = document.querySelectorAll(".page-modal__button");

  function modalClose(event) {
    event.preventDefault();
    for (i=0; i< modal.length; i++) {
      modal[i].classList.remove("page-modal--visible");
    }
  };

  for (i=0; i< modalButton.length; i++) {
    modalButton[i].addEventListener("click", modalClose);
  };

  contestSubmit.addEventListener("click", function(event){
    if (!(contestSurname.value && contestName.value && contestEmail.value)){
      modalFailure.classList.add("page-modal--visible");
    }
    else {
      event.preventDefault();
      modalSuccess.classList.add("page-modal--visible");
    }
  });
};

// ymaps.ready(function () {
//   var myMap = new ymaps.Map("map", {
//     center: [59.9389231, 30.323055],
//     zoom: 16,
//     controls: ["smallMapDefaultSet"]
//   }, {
//     searchControlProvider: "yandex#search"
//   }),
//   myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
//     hintContent: "Pink"
//   }, {
//     cursor: "arrow",
//     iconLayout: "default#image",
//     iconImageHref: "img/icon-map-marker.svg",
//     iconImageSize: [36, 36],
//     iconImageOffset: [-18,-18],
//     hasBalloon: false
//   });
//   myMap.geoObjects.add(myPlacemark);
// });

var mapElement = document.getElementById("map");
if (mapElement) {
  var map ="";
  google.maps.event.addDomListener(window, "load", init);
  google.maps.event.addDomListener(window, "resize", m_res );
  function init() {
      var mapOptions = {
        zoom: 15,
        mapTypeControl: false,
        zoomControl: true,
        scrollwheel: false,
        zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
      streetViewControl: false,
      center: new google.maps.LatLng(59.936287, 30.321047),
    };

    mapElement.classList.add("contacts-map--map-loaded");
    map = new google.maps.Map(mapElement, mapOptions);
    var image = {
      url: "img/icon-map-marker.svg",
      size: new google.maps.Size(36, 36),
      scaledSize: new google.maps.Size(36, 36),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(18, 18)
    };

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(59.936287, 30.321047),
      map: map,
      optimized: false,
      icon: image
    });
    m_res();
  }

  function m_res(){
    google.maps.event.trigger(map, "resize");
    map.panTo(new google.maps.LatLng(59.936287, 30.321047));
  }
}