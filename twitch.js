 var allTab = document.getElementById("all");

 allTab.addEventListener("click", function() {
     alert("plz");
     var targetedParents = document.getElementsByClassName("user-wrapper");
     var len = targetParents.length;
     for (var i = 0; i < len; i++) {
         targetParents[i].classList.remove("hide");
     }
 });

 var liveTab = document.getElementById("live");

 // USAGE:
 // Replace the Twitch API base URL 
 // https://api.twitch.tv/kraken with https://wind-bow.gomix.me/twitch-api. 
 // Use this endpoint according to the Twitch API documentation.


 //IE 10+
 let twitchList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
     "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
 ];
 let len = twitchList.length;
 for (var i = 0; i < len; i++) {
     let request = new XMLHttpRequest();
     let url = 'https://wind-bow.gomix.me/twitch-api/streams/' + twitchList[i] + "?"
     request.open('GET', url, true);

     request.onload = function() {
         if (this.status >= 200 && this.status < 400) {
             // success codes
             let data = JSON.parse(this.response);
             // online
             if (data.stream) {
                 let container = document.getElementById("container");
                 let appendString = "<div class='user-wrapper'>" +
                     "<img src='" + data.stream.channel.logo + "' class = 'user-image'>" +
                     "<p class='user-name'>" + data.stream.channel.display_name + "</p>" +
                     "<span class='indicator-on'></span>" +
                     "<p class='title'>" + data.stream.channel.game + "</p></div>";
                 container.innerHTML += appendString;
             } else {
                 // offline
                 let channelLink = data._links.channel;
                 let url = channelLink.replace("https://api.twitch.tv/kraken/",
                     "https://wind-bow.gomix.me/twitch-api/");
                 url += "?";
                 let request = new XMLHttpRequest();

                 request.open("GET", url, true);

                 request.onload = function() {
                     if (this.status >= 200 && this.status < 400) {
                         let data = JSON.parse(this.response);
                         let container = document.getElementById("container");
                         let appendString = "<div class='user-wrapper'>" +
                             "<img src='" + data.logo + "' class = 'user-image'>" +
                             "<p class='user-name'>" + data.display_name + "</p>" +
                             "<span class='indicator-off'></span>" +
                             "<p class='title'></p></div>";
                         container.innerHTML += appendString;
                     } else {
                         console.log('reached server but returned an error')
                     }
                 };
                 request.onerror = function() {
                     console.log("connection error on second call");
                 };
                 // for offline streamers
                 request.send();


             }
         } else {
             // returned an error
             alert("Error");
         }
     };

     request.onerror = function() {
         alert("Connection error on first call");
     };

     request.send();
 }