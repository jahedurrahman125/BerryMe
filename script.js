let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { 
        lat: 60.26182426226181, 
        lng: 24.857580172807722
    },
    zoom: 16,
    mapId: '814bf60920bc7d90'
  });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.getElementById("LocateMe");
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("pos",pos)
          new google.maps.Marker({
            position: pos,
            
            map,
            title: "user!",
            icon:{
                url:"/markerImg/you-are-here.svg",
                scaledSize: new google.maps.Size(31, 32)
            }
          });
        
          // Configure the click listener.
            let newPos;
            map.addListener("click", (mapsMouseEvent, pos) => {
                position: mapsMouseEvent.latLng,
                newPos = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)  
            new google.maps.Marker({
                position: JSON.parse(newPos), 
                map,
                
            });
         })
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
 
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
