// function  validation(){
//     var valid = true;
//     var password = $("#input-password").val().trim();
//     var confirm = $("#confirm-password").val().trim();
//     var car_description = $("#input-des").val().trim();

//     if (password.length == 0){
//         $("#input-password").addClass("is-invalid");
//         $(".password").html("Please fill in a valid Password");
//         valid = false;
//     } else if(password.replace(/\s+/g, "").length == 0){
//         $("#input-password").addClass("is-invalid");
//         $(".password").html("Password cannot be empty");
//         valid = false;
//     }

//     if (confirm.length == 0){
//         $("#confirm-password").addClass("is-invalid");
//         $(".confirm").html("Password does not match");
//         valid = false;
//     } else if(confirm != password){
//         $("#confirm-password").addClass("is-invalid");
//         $(".confirm").html("Password does not match");
//         valid = false;
//     }

//     if (car_description.length == 0) {
//         $("#input-des").addClass("is-invalid");
//         $(".des").html("Please fill in a description");
//         valid = false;
//     } else if(car_description.replace(/\s+/g, "").length == 0){
//         $("#input-des").addClass("is-invalid");
//         $(".des").html("Description cannot be empty");
//         valid = false;
//     }

//     if (car_price.replace(/\s+/g, "").length == 0) {
//         $("#input-price").addClass("is-invalid");
//         $(".price").html("Please fill in a valid price");
//         valid = false;
//     } else {
//         var price = Number(car_price);
//         if (Number.isNaN(price) || (!Number.isInteger(price))) {
//             $("#input-price").addClass("is-invalid");
//             $(".price").html("Please fill in an integer number");
//             valid = false;
//         }
//     }

//     if (car_door == 0){
//         $("#car-door").addClass("is-invalid");
//         $(".door").html("Please select number of doors");
//         valid = false;
//     }

//     if (car_drive == 0){
//         $("#car-drive").addClass("is-invalid");
//         $(".drive").html("Please select drive system");
//         valid = false;
//     }

//     if (car_engine.length == 0) {
//         $("#input-engine").addClass("is-invalid");
//         $(".engine").html("Please fill in a valid engine");
//         valid = false;
//     } else if(car_engine.replace(/\s+/g, "").length == 0){
//         $("#input-engine").addClass("is-invalid");
//         $(".engine").html("Engine cannot be empty");
//         valid = false;
//     }

//     if (car_trans.length == 0) {
//         $("#input-trans").addClass("is-invalid");
//         $(".trans").html("Please fill in a valid transmission");
//         valid = false;
//     } else if(car_trans.replace(/\s+/g, "").length == 0){
//         $("#input-trans").addClass("is-invalid");
//         $(".trans").html("Transmission cannot be empty");
//         valid = false;
//     }

//     if (car_fuel == 0){
//         $("#car-fuel").addClass("is-invalid");
//         $(".fuel").html("Please select fuel type");
//         valid = false;
//     }

//     return valid
// }

$(document).ready(function () {
  // set username to left corner
  $("#username-nav").text(sessionStorage.getItem("username"));

  let username = sessionStorage.getItem("username");
  let fullname = sessionStorage.getItem("fullname");
  let password = sessionStorage.getItem("password");
  let address = sessionStorage.getItem("address");
  let doses = sessionStorage.getItem("doses");
  console.log(address);
  $(".navbar-brand").html(username);
  $("#input-name").val(username);
  $("#input-name").prop("disabled", true);
  $("#full-name").val(fullname);
  $("#full-name").prop("disabled", true);
  $("#input-password").val(password);
  $("#confirm-password").val(password);
  $("#addr").html(address);

  $("#dose").change(function () {
    $("#doses_info").empty();
    var dose = parseInt($(this).val());
    // console.log(dose)
    if (dose != 0) {
      dose = parseInt($("#dose option:selected").val());
      for (var index = 0; index < dose; index++) {
        var form_group = $("<div class='form-group bottom_margin_10'></div>");
        var row = $("<div class='row'></div>");
        var col_3 = $("<div class='col-md-5'></div>");
        var label = $("<label class='bottom_margin_10'></label>").html(
          "Vaccination brand:"
        );
        var col_6 = $("<div class='col-md-4'></div>");
        var input = $("<input type='text' class='form-control'>").attr(
          "id",
          "brand_" + (index + 1)
        );
        col_3.append(label);
        col_6.append(input);
        row.append(col_3);
        row.append(col_6);
        form_group.append(row);

        var form_group_2 = $("<div class='form-group bottom_margin_10'></div>");
        var row_2 = $("<div class='row'></div>");
        var col_3_2 = $("<div class='col-md-5'></div>");
        var label_2 = $("<label class='bottom_margin_10'></label>").html(
          "Vaccinated Date:"
        );
        var col_6_2 = $("<div class='col-md-5'></div>");
        var input_2 = $(
          "<input type='date' value='2022-01-01' min='2018-01-01' max='2022-05-31'></input>"
        ).attr("id", "date_" + (index + 1));
        col_3_2.append(label_2);
        col_6_2.append(input_2);
        row_2.append(col_3_2);
        row_2.append(col_6_2);
        form_group_2.append(row_2);

        var span = $("<span class='title bottom_margin_10'></span>").html(
          "Vaccine " + (index + 1) + " Info"
        );
        $("#doses_info").append(span);
        $("#doses_info").append(form_group);
        $("#doses_info").append(form_group_2);
        console.log(index);
      }
    }
  });

  $("#dialog-confirm").dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Discard Changes": function () {
        $(this).dialog("close");
        window.location.href = "./person.html";
      },
      Cancel: function () {
        $(this).dialog("close");
      },
    },
  });

  $("#edit-form").submit(function (event) {
    event.preventDefault();
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").empty();

    // var validated = validation();
    // if (validated == true){
    var username = $("#input-name").val();
    console.log(username);
    var password = $("#input-password").val();
    var address = $("#addr").val();
    var dose_plus = parseInt($("#dose").val()) + parseInt(doses);
    var dose_update = dose_plus.toString();
    var dose = parseInt($("#dose").val());

    if (dose == 1) {
      var dose_1_brand = $("#brand_1").val();
      var dose_1_date = $("#date_1").val();

      var profile = {
        username: username,
        password: password,
        addr: address,
        origin_dose: doses,
        numOfdose: dose_update,
        dose_1: [dose_1_brand, dose_1_date],
      };
    } else if (dose == 2) {
      var dose_1_brand = $("#brand_1").val();
      var dose_1_date = $("#date_1").val();
      var dose_2_brand = $("#brand_2").val();
      var dose_2_date = $("#date_2").val();

      var profile = {
        username: username,
        password: password,
        addr: address,
        origin_dose: doses,
        numOfdose: dose_update,
        dose_1: [dose_1_brand, dose_1_date],
        dose_2: [dose_2_brand, dose_2_date],
      };
    } else if (dose == 3) {
      var dose_1_brand = $("#brand_1").val();
      var dose_1_date = $("#date_1").val();
      var dose_2_brand = $("#brand_2").val();
      var dose_2_date = $("#date_2").val();
      var dose_3_brand = $("#brand_3").val();
      var dose_3_date = $("#date_3").val();

      var profile = {
        username: username,
        password: password,
        addr: address,
        origin_dose: doses,
        numOfdose: dose_update,
        dose_1: [dose_1_brand, dose_1_date],
        dose_2: [dose_2_brand, dose_2_date],
        dose_3: [dose_3_brand, dose_3_date],
      };
    } else {
      var profile = {
        username: username,
        password: password,
        addr: address,
        origin_dose: doses,
        numOfdose: dose_update,
      };
    }
    console.log(profile);

    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(profile),
      url: "https://7y3j13beig.execute-api.us-east-1.amazonaws.com/v1/edit",
      success: function (data) {
        console.log("success", data);
        if (data["statusCode"] == 200) {
          let username = $("#input-name").val();
          // store the username after validation success
          sessionStorage.setItem("username", username);
          console.log(sessionStorage.getItem("username"));
          setTimeout(function () {
            window.location = "person.html";
          }, 3000);
        }
      },
      error: function (data) {
        console.log("Error", data);
      },
    });
  });

  $("#discard").click(function (event) {
    event.preventDefault();
    $("#dialog-confirm").dialog("open", {
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Discard Changes": function () {
          $(this).dialog("close");
          // window.location.href = "/view/" + item["id"];
        },
        Cancel: function () {
          $(this).dialog("close");
        },
      },
    });
  });
});
