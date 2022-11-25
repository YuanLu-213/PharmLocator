function validation(profile) {
  $("#addr_valid").empty();
  $("#age_valid").empty();
  $("#last_name_valid").empty();
  $("#first_name_valid").empty();
  $("#password_valid").empty();
  $("#confirm_password_valid").empty();
  $("#username_valid").empty();
  var username = profile["username"];
  var password = profile["password"];
  var confirm = $("#confirm_password").val();
  var firstname = profile["firstname"];
  var lastname = profile["lastname"];
  var age = $("#age").val();
  var addr = profile["addr"];
  console.log(age);

  if (username.replace(/\s+/g, "").length == 0) {
    $("#username_valid").html("Please create a valid username");
    return false;
  } else if (username.indexOf(" ") >= 0) {
    $("#username_valid").html("Invalid username: containing whitespaces");
    return false;
  } else if (password.replace(/\s+/g, "").length == 0) {
    $("#password_valid").html("Please create a valid password");
    return false;
  } else if (password.indexOf(" ") >= 0) {
    $("#password_valid").html("Invalid password: containing whitespaces");
    return false;
  } else if (password != confirm) {
    $("#confirm_password_valid").html("Input does not match with password");
    return false;
  } else if (firstname.replace(/\s+/g, "").length == 0) {
    $("#first_name_valid").html("First name cannot be empty");
    return false;
  } else if (firstname.replace(/\s+/g, "").match(/\d/)) {
    $("#first_name_valid").html("First name cannot contain numbers");
    return false;
  } else if (lastname.replace(/\s+/g, "").length == 0) {
    $("#last_name_valid").html("Last name cannot be empty");
    return false;
  } else if (lastname.replace(/\s+/g, "").match(/\d/)) {
    $("#last_name_valid").html("Last name cannot contain numbers");
    return false;
  } else if (parseInt(age) < 0) {
    $("#age_valid").html(
      "Please fill in a valid age greater than or equal to 0"
    );
    return false;
  } else if (age == "") {
    $("#age_valid").html(
      "Please fill in a valid age greater than or equal to 0"
    );
    return false;
  } else if (addr.replace(/\s+/g, "").length == 0) {
    $("#addr_valid").html("Please fill in a valid address");
    return false;
  } else {
    return true;
  }
}
$(document).ready(function () {
  $(".cup-register").hide();
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
      }
    }
  });

  $("#submit").click(function () {
    $("#feedback").html("");
    $("#warning").html("");

    var dose = parseInt($("#dose option:selected").val());
    console.log(dose);
    if (dose == 1) {
      var dose_1_brand = $("#brand_1").val();
      var dose_1_date = $("#date_1").val();

      var profile = {
        username: $("#username").val(),
        password: $("#password").val(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        gender: $("#gender").val(),
        age: parseInt($("#age").val()),
        addr: $("#addr").val(),
        numOfdose: $("#dose").val(),
        dose_1: [dose_1_brand, dose_1_date],
      };
    } else if (dose == 2) {
      var dose_1_brand = $("#brand_1").val();
      var dose_1_date = $("#date_1").val();
      var dose_2_brand = $("#brand_2").val();
      var dose_2_date = $("#date_2").val();

      var profile = {
        username: $("#username").val(),
        password: $("#password").val(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        gender: $("#gender").val(),
        age: parseInt($("#age").val()),
        addr: $("#addr").val(),
        numOfdose: $("#dose").val(),
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
        username: $("#username").val(),
        password: $("#password").val(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        gender: $("#gender").val(),
        age: parseInt($("#age").val()),
        addr: $("#addr").val(),
        numOfdose: $("#dose").val(),
        dose_1: [dose_1_brand, dose_1_date],
        dose_2: [dose_2_brand, dose_2_date],
        dose_3: [dose_3_brand, dose_3_date],
      };
    } else if (dose == 4) {
      var dose_1_brand = $("#brand_1").val();
      var dose_1_date = $("#date_1").val();
      var dose_2_brand = $("#brand_2").val();
      var dose_2_date = $("#date_2").val();
      var dose_3_brand = $("#brand_3").val();
      var dose_3_date = $("#date_3").val();
      var dose_4_brand = $("#brand_4").val();
      var dose_4_date = $("#date_4").val();

      var profile = {
        username: $("#username").val(),
        password: $("#password").val(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        gender: $("#gender").val(),
        age: parseInt($("#age").val()),
        addr: $("#addr").val(),
        numOfdose: $("#dose").val(),
        dose_1: [dose_1_brand, dose_1_date],
        dose_2: [dose_2_brand, dose_2_date],
        dose_3: [dose_3_brand, dose_3_date],
        dose_4: [dose_4_brand, dose_4_date],
      };
    } else if (dose == 5) {
      var dose_1_brand = $("#brand_1").val();
      var dose_1_date = $("#date_1").val();
      var dose_2_brand = $("#brand_2").val();
      var dose_2_date = $("#date_2").val();
      var dose_3_brand = $("#brand_3").val();
      var dose_3_date = $("#date_3").val();
      var dose_4_brand = $("#brand_4").val();
      var dose_4_date = $("#date_4").val();
      var dose_5_brand = $("#brand_5").val();
      var dose_5_date = $("#date_5").val();

      var profile = {
        username: $("#username").val(),
        password: $("#password").val(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        gender: $("#gender").val(),
        age: parseInt($("#age").val()),
        addr: $("#addr").val(),
        numOfdose: $("#dose").val(),
        dose_1: [dose_1_brand, dose_1_date],
        dose_2: [dose_2_brand, dose_2_date],
        dose_3: [dose_3_brand, dose_3_date],
        dose_4: [dose_4_brand, dose_4_date],
        dose_5: [dose_5_brand, dose_5_date],
      };
    } else {
      var profile = {
        username: $("#username").val(),
        password: $("#password").val(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        gender: $("#gender").val(),
        age: parseInt($("#age").val()),
        addr: $("#addr").val(),
        numOfdose: $("#dose").val(),
      };
    }

    if (validation(profile)) {
      $("#addr_valid").empty();
      $("#age_valid").empty();
      $("#last_name_valid").empty();
      $("#first_name_valid").empty();
      $("#password_valid").empty();
      $("#confirm_password_valid").empty();
      $("#username_valid").empty();

      $(".cup-register").show();

      $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(profile),
        url: "https://7y3j13beig.execute-api.us-east-1.amazonaws.com/v1/register",
        success: function (data) {
          console.log("success", data);
          if (data["statusCode"] == 200) {
            $("#feedback").html(data["body"].replaceAll('"', ""));
            $("#feedback").css("color", "#01dc01");
          } else {
            $(".cup-register").hide();
            $("#feedback").html(data["body"].replaceAll('"', ""));
            $("#feedback").css("color", "red");
          }
          if (data["statusCode"] == 200) {
            let username = $("#username").val();
            // store the username after validation success
            sessionStorage.setItem("username", username);
            console.log(sessionStorage.getItem("username"));
            setTimeout(function () {
              window.location = "person.html";
            }, 6000);
          }
        },
        error: function (data) {
          console.log("Error", data);
        },
      });
    }
  });
});
