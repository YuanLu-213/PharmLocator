function getData(input) {
  return $.ajax({
    type: "GET",
    dataType: "json",
    url:
      "https://7y3j13beig.execute-api.us-east-1.amazonaws.com/v1/user?username=" +
      input,
  });
}
$(document).ready(function () {
  // $("#content").empty();
  let username = sessionStorage.getItem("username");
  console.log(username);
  // $("#content").text("the username from last page is " + username);
  // $(".navbar-brand").html(username);
  var userinfo = "";
  var image_url = "";

  $(".logout").click(function () {
    sessionStorage.clear();
  });

  $(".logout").click(function () {
    sessionStorage.clear();
  });

  $.when(getData(username)).then(
    function success(data) {
      // set username to left corner
      $("#username-nav").text(sessionStorage.getItem("username"));

      console.log("success", data);
      userinfo = data["body"][0][0];
      image_url = data["body"][1];
      console.log(userinfo["First_Name"]);

      // userinfo = data['body'];
      let fullname = userinfo["First_Name"] + " " + userinfo["Last_Name"];

      sessionStorage.setItem("fullname", fullname);
      sessionStorage.setItem("password", userinfo["Password"]);
      sessionStorage.setItem("gender", userinfo["Gender"]);
      sessionStorage.setItem("address", userinfo["Address"]);
      sessionStorage.setItem("doses", userinfo["Number_of_Dose"]);
      sessionStorage.setItem("age", userinfo["Age"]);

      $("#username").html("Welcome Back, " + userinfo["First_Name"]);
      //   if (userinfo["full"] == true) {
      //     $("#dose").html(
      //       "Congratulations! You have received all recommended vaccine and are fully protected."
      //     );
      //   }
      if (userinfo["Number_of_Dose"] == "3") {
        $("#dose").html(
          "Congratulations! You have received 3 doses of vaccine and are fully vaccinated."
        );
      } else {
        $("#dose").html(
          "You currently have received " +
            userinfo["Number_of_Dose"] +
            " doses of vaccine. Below is the history."
        );
      }

      $("#qrcode").attr("src", image_url);

      for (
        var index = 0;
        index < parseInt(userinfo["Number_of_Dose"]);
        index++
      ) {
        var doserow = $("<div></div>");
        // var inforow = $("<div class='row'></div>")
        // var inforow2 = $("<div class='row'></div>")
        // var inforow3 = $("<div class='row'></div>")
        var dose = $("<div class='row'></div>").attr("id", "dose_num");
        dose.html("Vaccine " + (index + 1));
        // inforow.append(dose);
        var info = $("<div class='row'></div>").html(
          "Vaccine Brand: " + userinfo["Dose_" + (index + 1)][0]
        );
        // inforow2.append(info);
        var date = $("<div class='row'></div>").html(
          "Vaccinated Date: " + userinfo["Dose_" + (index + 1)][1]
        );
        // inforow3.append(date);
        doserow.append(dose);
        doserow.append(info);
        doserow.append(date);
        $("#info").append(doserow);
      }
    },
    function error(data) {
      console.log("Error", data);
    }
  );
});
