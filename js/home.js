$(document).ready(function(){
    // var x = document.getElementById("demo");

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      // set cur coords into the JS session for later usage
      sessionStorage.setItem("cur_lat", position.coords.latitude);
      sessionStorage.setItem("cur_long", position.coords.longitude);
      // sessionStorage.setItem("cur_lat", 40.746810763447996);
      // sessionStorage.setItem("cur_long", -73.94531759007909);
      $("#ready").html("Ready to Roll");
      console.log(position.coords.latitude, position.coords.longitude);
    }

    getLocation();
})
