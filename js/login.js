$(document).ready(function () {
  $(".cup").hide();
  $("#login").click(function () {
    $(".cup").show();
    $("#feedback").html("");
    $("#warning").html("");
    var login = {
      username: $("#username").val(),
      password: $("#password").val(),
    };

    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(login),
      url: "https://7y3j13beig.execute-api.us-east-1.amazonaws.com/v1/login",
      success: function (data) {
        console.log("success", data);
        if (data["statusCode"] == 200) {
          $("#feedback").html(data["body"].replaceAll('"', ""));
          $("#feedback").css("color", "#01dc01");
        } else {
          $(".cup").hide();
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
  });
});
