let map, infoWindow;

var isLocalize = false

function initMap() {
  infoWindow = new google.maps.InfoWindow();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          isLocalize == true
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            zoom: 15,
            mapId: '1060af6985c74d8c',
            disableDefaultUI: true,
          }); 
          const marker = new google.maps.Marker({
            position: { lat: position.coords.latitude, lng: position.coords.longitude },
            map: map,
          });
        },
      );
    }
}


const currentTheme = localStorage.getItem('theme');
window.onload=function(){
  const toggleSwitch = document.querySelector('.theme-switch');
  toggleSwitch.addEventListener('change', switchTheme, false);
  const checkbox = document.querySelectorAll('input[name="checkbox"]');

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.querySelector("#myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
      console.log('block')
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme == 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}


