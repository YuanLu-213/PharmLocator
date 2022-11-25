var test_data = [];
var origin_lat = parseFloat(sessionStorage.getItem("cur_lat"));
var origin_lon = parseFloat(sessionStorage.getItem("cur_long"));

function RenderRecords(data_li) {
  // $("#vac-li-group").empty();
  for (let i = 0; i < data_li.length; i++) {
    let cur_site = data_li[i]["vaccine_site"];
    let cur_address = data_li[i]["address"];
    let cur_id = data_li[i]["id"];
    let cur_phone = data_li[i]["phone"];
    let cur_vaccine_type = data_li[i]["vaccine_type"];
    let cur_lat = data_li[i]["latitude"];
    let cur_lon = data_li[i]["longitude"];
    let site_type = data_li[i]["site_type"];
    let cur_dur = data_li[i]["cur_dur"];
    let activate = "";
    let data_color = "";

    // always set the first to be activate
    if (i == 0) {
      // activate = "active";
      data_color = "#C70039";
    } else {
      // activate = "";
      data_color = "green";
    }
    let preferred_v_type = $("#vac-ava").val();
    let highed_v_type_str = highlightSubstring(
      cur_vaccine_type,
      preferred_v_type
    );
    $("#vac-li-group").append(
      `<a href="#" class='list-group-item list-group-item-action flex-column align-items-start ${activate}' s_id='${cur_id}' lat=${cur_lat} lon=${cur_lon}>
                    <p style="color:${data_color}">Approximate arrival time by walking: <b>${cur_dur}</b> minutes</p>
                    <div class='d-flex w-100 justify-content-between'>
                      <h5 class='mb-1'>${cur_site}</h5>
                    </div>
                    <p>${site_type}</p>
                    <p>${cur_address}</p>
                    <p>${cur_phone}</p>
                    <small>Vaccine provided: ${highed_v_type_str}</small>
            </a>`
    );
  }
}

function gene_vac_optons(age) {
  $("#vac-ava").empty();
  if (age >= 18) {
    $("#vac-ava").append(
      `
            <option selected>Pfizer (12+)</option>
            <option>Moderna (18+)</option>
            <option>Johnson & Johnson (18+)</option>
            <option>Monkeypox</option>
            <option>Mumps</option>
            <option>Flu</option>


            `
    );
  } else if (12 <= age && age <= 17) {
    console.log("between 12-17");
    $("#vac-ava").append(
      `
            <option selected>Pfizer (12+)</option>
            <option>Mumps</option>
            <option>Flu</option>
            `
    );
  } else if (5 <= age && age <= 11) {
    $("#vac-ava").append(
      `
            <option selected>Pfizer (5-11)</option>
            <option>Mumps</option>
            <option>Flu</option>
            `
    );
  } else {
    console.log("under 5");
    $("#vac-ava").append(
      `
            <option>Mumps</option>
            <option>Flu</option>            `
    );
  }
}

// unwrap with the first element
function process_from_post(test_data) {
  let cur_data = [];
  for (let i = 0; i < test_data.length; i++) {
    cur_data.push(test_data[i][0]);
  }
  return cur_data;
}

function filter_data_based_on_vt() {
  let cur_data = [];
  // do filter based on age
  let preferred_v_type = $("#vac-ava").val();
  for (let i = 0; i < test_data.length; i++) {
    if (test_data[i]["vaccine_type"].includes(preferred_v_type)) {
      cur_data.push(test_data[i]);
    }
  }
  return cur_data;
}

function renderAll() {
  $("#vac-li-group").empty();
  $("#vac-li-group").append("<h1>Loading...</h1>");
  let dis = $("#vac-dis").val();
  let url =
    "https://7y3j13beig.execute-api.us-east-1.amazonaws.com/v1/vaccination";
  $.when(postVacc(origin_lat, origin_lon, dis, url)).then(function success(
    data
  ) {
    $("#vac-li-group").empty();
    test_data = data["body"];
    test_data = process_from_post(test_data);
    test_data = filter_data_based_on_vt(test_data);
    console.log(test_data);
    if (test_data.length == 0) {
      $("#vac-li-group").prepend(`<h1>No result found within ${dis}km</h1>`);
    } else {
      // display filtered result
      let filter_len = test_data.length;
      $("#vac-li-group").prepend(`<h5>Search result ${filter_len}/20 </h1>`);
      // compute the real-time walking duration for each data
      const service = new google.maps.DistanceMatrixService();
      let request = constructMatrixHeader(geneCorLi(test_data), "WALKING");
      service.getDistanceMatrix(request).then((response) => {
        let repLi = response.rows[0]["elements"];
        for (let i = 0; i < repLi.length; i++) {
          // test_data[i]['cur_dis'] = parseFloat(repLi[i]['distance']['text']);
          test_data[i]["cur_dur"] = parseInt(repLi[i]["duration"]["text"]);
          test_data[i]["cur_mode"] = "walking";
        }
        test_data = test_data.sort(sortOnDuration);
        RenderRecords(test_data);
      });
    }
  });
}

$(document).ready(function () {
  // set username to left corner
  $("#username-nav").text(sessionStorage.getItem("username"));

  let cur_lat = sessionStorage.getItem("cur_lat");
  let cur_lon = sessionStorage.getItem("cur_long");
  let age = sessionStorage.getItem("age");
  let gender = sessionStorage.getItem("gender");

  $("#cur-lat").attr("placeholder", cur_lat);
  $("#cur-lon").attr("placeholder", cur_lon);
  $("#dob").attr("placeholder", age);

  if (age < 18) {
    if (gender == "Male") {
      $("#vac-group").attr("placeholder", "👦 Kid");
    } else {
      $("#vac-group").attr("placeholder", "👧 Kid");
    }
  } else {
    if (gender == "Male") {
      $("#vac-group").attr("placeholder", "👨 Adult");
    } else {
      $("#vac-group").attr("placeholder", "👩 Adult");
    }
  }
  // generate vaccine options based on age
  gene_vac_optons(age);

  // add trigger for range input to change the text
  $("#vac-dis").change(function () {
    // console.log($("#vac-dis").val());
    $("#selected-dis").text($("#vac-dis").val());
  });

  $("#find-btn").click(function (event) {
    event.preventDefault();
    renderAll();
  });
});
