$(document).ready(function() {
    
    /** AJAX CALLS **/
    let twitchList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
        "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
    ];

    let len = twitchList.length;
    for (let i = 0; i < len; i++) {
        let url = 'https://wind-bow.gomix.me/twitch-api/streams/' + twitchList[i] + "?";
        $.ajax({
            url: url,
            data: "json",
            success: function(data) {
                if (data.stream) {
                    let container = document.getElementById("container");
                    let appendString = "<div class='user-wrapper'>" +
                        "<img src='" + data.stream.channel.logo + "' class = 'user-image'>" +
                        "<p class='user-name'>" + data.stream.channel.display_name + "</p>" +
                        "<span class='indicator-on'></span>" +
                        "<p class='title'>" + data.stream.channel.game + "</p></div>";
                    container.innerHTML += appendString;
                } else {
                    let channelLink = data._links.channel;
                    let url = channelLink = channelLink.replace("https://api.twitch.tv/kraken/",
                        "https://wind-bow.gomix.me/twitch-api/");
                    url += "?";
                    $.ajax({
                        url: url,
                        data: "json",
                        success: function(data) {
                            let container = document.getElementById("container");
                            let appendString = "<div class='user-wrapper'>" +
                                "<img src='" + data.logo + "' class = 'user-image'>" +
                                "<p class='user-name'>" + data.display_name + "</p>" +
                                "<span class='indicator-off'></span>" +
                                "<p class='title'></p></div>";
                            container.innerHTML += appendString;
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });
                    // end of 2nd ajax call
                }
            },
            error: function(err) {
                console.log(err);
            },
        });
        // end of 1st ajax call
    }
    // end of for loop


    /** Event Listeners **/
    let allTab = $("#all")
    allTab.addClass("active");
    $("body").on("click", "#all", function(event) {
        let allTab = $(document.getElementById("all"));
        let liveTab = $(document.getElementById("live"));
        let offlineTab = $(document.getElementById("offline"));
        allTab.addClass("active");
        liveTab.removeClass("active");
        offlineTab.removeClass("active");
        let userItems = document.getElementsByClassName("user-wrapper");
        let len = userItems.length;
        for (let i = 0; i < len; i++) {
            if (userItems[i].classList.contains("hide")) {
                userItems[i].classList.remove("hide");
            }
        };

    });

    $("body").on("click", "#live", function(event) {
        let allTab = $(document.getElementById("all"));
        let liveTab = $(document.getElementById("live"));
        let offlineTab = $(document.getElementById("offline"));
        liveTab.addClass("active");
        allTab.removeClass("active");
        offlineTab.removeClass("active");
        offlineUsers = document.getElementsByClassName("indicator-off");
        onlineUsers = document.getElementsByClassName("indicator-on");
        let len = offlineUsers.length;
        let lenOn = onlineUsers.length;
        // hide offline elements
        for (let i = 0; i < len; i++) {
            if (!offlineUsers[i].parentElement.classList.contains("hide")) {
                offlineUsers[i].parentElement.classList.add("hide");
            }
        };
        // show online elements
        for (let i = 0; i < lenOn; i++) {
            if (onlineUsers[i].parentElement.classList.contains("hide")) {
                onlineUsers[i].parentElement.classList.remove("hide");
            }
        };
    });

    $("body").on("click", "#offline", function(event) {
        let allTab = $(document.getElementById("all"));
        let liveTab = $(document.getElementById("live"));
        let offlineTab = $(document.getElementById("offline"));
        offlineTab.addClass("active");
        allTab.removeClass("active");
        liveTab.removeClass("active");
        offlineUsers = $(document.getElementsByClassName("indicator-off"));
        onlineUsers = $(document.getElementsByClassName("indicator-on"));
        let len = offlineUsers.length;
        let lenOn = onlineUsers.length;
        console.log(window.ONLINE_USERS);
        for (let i = 0; i < len; i++) {
            if (offlineUsers[i].parentElement.classList.contains("hide")) {
                offlineUsers[i].parentElement.classList.remove("hide");
            }
        };
        for (let i = 0; i < lenOn; i++) {
            if (!onlineUsers[i].classList.contains("hide")) {
                onlineUsers[i].parentElement.classList.add("hide");
            }
        };
    });


});
// end of document ready