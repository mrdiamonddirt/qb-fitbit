var openedApp = ".main-screen";
qbFitbit = {};

// get time and date from browser
qbFitbit.GetTime = function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var time = hours + ":" + minutes + ":" + seconds;
    var date = day + "/" + month + "/" + year;
    return { time: time, date: date };
};
// time = qbFitbit.GetTime();
// date = qbFitbit.GetTime();

console.log(qbFitbit.GetTime().time);
console.log(qbFitbit.GetTime().date);

//  set returned time and date to html
qbFitbit.SetTime = function (time, date) {
    document.getElementById("time").innerHTML = time;
    document.getElementById("date").innerHTML = date;
};
// update clock every second
setInterval(function () {
    time = qbFitbit.GetTime().time;
    date = qbFitbit.GetTime().date;
    qbFitbit.SetTime(time, date);
}, 1000);

$(document).ready(function () {
    // console.log('Fitbit is loaded..')

    window.addEventListener("message", function (event) {
        var eventData = event.data;

        if (eventData.action == "openWatch") {
            qbFitbit.Open();
        }
    });
});

$(document).on("keydown", function () {
    switch (event.keyCode) {
        case 27:
            qbFitbit.Close();
            break;
    }
});

qbFitbit.Open = function () {
    $(".container").fadeIn(150);
};

qbFitbit.Close = function () {
    $(".container").fadeOut(150);
    $.post("https://qb-fitbit/close");
};

$(document).on("click", ".fitbit-app", function (e) {
    e.preventDefault();

    var pressedApp = $(this).data("app");

    $(openedApp).css({ display: "none" });
    $("." + pressedApp + "-app").css({ display: "block" });
    console.log(pressedApp);
    openedApp = pressedApp;
    $(document).on("contextmenu", function () {
        console.log("right click");
        $("." + openedApp + "-app").css({ display: "none" });
        openedApp = ".main-screen";
        $(".main-screen").css({ display: "flex" });
    });
});

// event listener for on right click
// if (openedApp == ".main-screen") {
//     console.log("main screen");
//     $(document).on("contextmenu", ".main-screen", function () {
//         console.log("right click menu");
//         $(".main-screen").css({ display: "none" });
//         console.log(openedApp);
//         openedApp = ".clock-app";
//         console.log(openedApp);
//         $(".clock-app").css({ display: "flex" });
//         console.log("clock app");
//     });
// }

// if (openedApp == ".clock-app") {
//     console.log("clock screen");
//     $(document).on("contextmenu", ".clock-app", function () {
//         console.log("right click clock");
//         $(".clock-app").css({ display: "none" });
//         console.log(openedApp);
//         $(".main-screen").css({ display: "flex" });
//         openedApp = ".main-screen";
//         console.log(openedApp);
//         console.log("main app");
//     });
//}

$(document).on("click", ".back-food-settings", function (e) {
    e.preventDefault();

    $(".food-app").css({ display: "none" });
    $(".main-screen").css({ display: "flex" });

    openedApp = ".main-screen";
});

$(document).on("click", ".back-thirst-settings", function (e) {
    e.preventDefault();

    $(".thirst-app").css({ display: "none" });
    $(".main-screen").css({ display: "flex" });

    openedApp = ".main-screen";
});

$(document).on("click", ".save-food-settings", function (e) {
    e.preventDefault();

    var foodValue = $(this).parent().parent().find("input");

    if (parseInt(foodValue.val()) <= 100) {
        $.post(
            "https://qb-fitbit/setFoodWarning",
            JSON.stringify({
                value: foodValue.val(),
            })
        );
    }
});

$(document).on("click", ".save-thirst-settings", function (e) {
    e.preventDefault();

    var thirstValue = $(this).parent().parent().find("input");

    if (parseInt(thirstValue.val()) <= 100) {
        $.post(
            "https://qb-fitbit/setThirstWarning",
            JSON.stringify({
                value: thirstValue.val(),
            })
        );
    }
});

// when open map app list for double click
$(document).on("dblclick", ".map-app", function (e) {
    e.preventDefault();

    // increase size of map image
    $(".map").css({ width: calc("100%" + "100%") });

    console.log("map app double click");
    // $.post("https://qb-fitbit/MapApp");
});

// when click on location button run faux getting location script
$(document).on("click", ".locationButton", function (e) {
    e.preventDefault();
    $(".mapdata-container").css({ display: "flex" });
    setTimeout(function () {
        $(".mapdata-container").css({ display: "none" });
    }, 5000);
    console.log("location button click");
    // get location
    // $.post("https://qb-fitbit/GetLocation");
});

// js for calculator app

// if input box selected and enter pressed run eval function
$(document).on("keydown", ".calculator-app .calculator-display", function (e) {
    if (e.keyCode == 13) {
        var sum = eval($(".calculator-app .calculator-display").val());
        $(".calculator-app .calculator-display").val(sum);
        return;
    }
});

// if input box selected and delete pressed clear input box
$(document).on("keydown", ".calculator-app .calculator-display", function (e) {
    if (e.keyCode == 8) {
        $(".calculator-app .calculator-display").val("");
        return;
    }
});

// when click on calculator app button add the number to the calculator screen
$(document).on("click", ".calculator-app .calcButton", function (e) {
    e.preventDefault();
    console.log("number clicked", e.target.value);
    if (e.target.value == "C") {
        $(".calculator-app .calculator-display").val("");
        return;
    }
    if (e.target.value == "=") {
        var sum = eval($(".calculator-app .calculator-display").val());
        $(".calculator-app .calculator-display").val(sum);
        return;
    }
    var number = e.target.value;
    var screen = $(".calculator-app .calculator-display");
    console.log(screen.val());
    screen.val(screen.val() + number);
    console.log(screen.val());
});
