var origin_lat = parseFloat(sessionStorage.getItem("cur_lat"));
var origin_lon = parseFloat(sessionStorage.getItem("cur_long"));
var test_data = [];

function RenderAll(
  selectedMode,
  directionsService = null,
  directionsRenderer = null
) {
  const service = new google.maps.DistanceMatrixService();
  let request = constructMatrixHeader(geneCorLi(test_data), selectedMode);
  service.getDistanceMatrix(request).then((response) => {
    let repLi = response.rows[0]["elements"];
    for (let i = 0; i < repLi.length; i++) {
      test_data[i]["cur_dis"] = parseFloat(repLi[i]["distance"]["text"]);
      test_data[i]["cur_dur"] = repLi[i]["duration"]["text"];
      test_data[i]["cur_mode"] = selectedMode.toLowerCase();
    }
    test_data.sort(sortOnDistance);
    RenderRecords(test_data, directionsService, directionsRenderer);
  });
}

function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: origin_lat, lng: origin_lon },
  });

  // init data from post
  // postLocation(origin_lat, origin_lon, "https://7y3j13beig.execute-api.us-east-1.amazonaws.com/v1/testsites");
  let url =
    "https://7y3j13beig.execute-api.us-east-1.amazonaws.com/v1/testsites";
  $.when(postLocation(origin_lat, origin_lon, url)).then(function success(
    data
  ) {
    // parse ret data
    let cur_ret = [];
    for (let i = 0; i < data["body"].length; i++) {
      cur_ret.push(data["body"][i][0]);
    }
    test_data = cur_ret;

    // init with WALKING mode
    RenderAll("WALKING", directionsService, directionsRenderer);

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(
      directionsService,
      directionsRenderer,
      origin_lat,
      origin_lon,
      test_data[0]["latitude"],
      test_data[0]["longitude"]
    );
    document.getElementById("mode").addEventListener("change", () => {
      // test_data[0] is always the nearest after sort
      calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        origin_lat,
        origin_lon,
        test_data[0]["latitude"],
        test_data[0]["longitude"]
      );
      RenderAll($("#mode").val(), directionsService, directionsRenderer);
    });
  });
}

function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  origin_lat,
  origin_lon,
  dest_lat,
  dest_lon
) {
  const selectedMode = document.getElementById("mode").value;
  directionsService
    .route({
      origin: { lat: parseFloat(origin_lat), lng: parseFloat(origin_lon) },
      destination: { lat: parseFloat(dest_lat), lng: parseFloat(dest_lon) },
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode],
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

function RenderRecords(
  data_li,
  directionsService = null,
  directionsRenderer = null
) {
  $("#testing-li-group").empty();
  for (let i = 0; i < data_li.length; i++) {
    let cur_site = data_li[i]["test_site"];
    let cur_date = data_li[i]["dates"];
    let cur_lon = data_li[i]["longitude"];
    let cur_comment = data_li[i]["comments"];
    let cur_address = data_li[i]["address"];
    let cur_id = data_li[i]["id"];
    let cur_phone = data_li[i]["phone"];
    let cur_lat = data_li[i]["latitude"];
    let cur_opt_time = data_li[i]["op_time"];
    let cur_dis = data_li[i]["cur_dis"];
    let cur_dur = data_li[i]["cur_dur"];
    let cur_mode = data_li[i]["cur_mode"];
    let activate = "";
    let data_color = "";

    // always set the first to be activate
    if (i == 0) {
      activate = "active";
      data_color = "#C70039";
    } else {
      activate = "";
      data_color = "green";
    }

    $("#testing-li-group").append(
      `<a href="#" class='list-group-item list-group-item-action flex-column align-items-start ${activate}' s_id='${cur_id}' lat=${cur_lat} lon=${cur_lon}>
                    <p style='color:${data_color};'>Distance from you: <b>${cur_dis} km</b>, approximate time: <b>${cur_dur}</b> by <b>${cur_mode}</b> </p>
                    <div class='d-flex w-100 justify-content-between'>
                      <h5 class='mb-1'>${cur_site}</h5>
                      <small>${cur_date}</small>
                    </div>
                    <p class="mb-1">${cur_address}</p>
                    <p>${cur_phone}</p>
                    <p>${cur_opt_time}</p>
                    <small>${cur_comment}</small>
            </a>`
    );

    // add trigger for current
    $(`a[s_id=${cur_id}]`).click(function () {
      $("a").removeClass("active");
      $(`a[s_id=${cur_id}]`).addClass("active");
      calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        origin_lat,
        origin_lon,
        cur_lat,
        cur_lon
      );
    });
  }
}

$(document).ready(function () {
  // set username to left corner
  $("#username-nav").text(sessionStorage.getItem("username"));

  $("#sites-container").scrollTop(400);
  let username = sessionStorage.getItem("username");
  $(".navbar-brand").html(username);

  $(".logout").click(function () {
    sessionStorage.clear();
  });
  // init map
  window.initMap = initMap;
});
