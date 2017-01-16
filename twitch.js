 // USAGE:
 // Replace the Twitch API base URL 
 // https://api.twitch.tv/kraken with https://wind-bow.gomix.me/twitch-api. 
 // Use this endpoint according to the Twitch API documentation.

 // NOTE:
 // This server caches data to lower the request rate. 
 // To prevent abuses this server accepts GET requests only, and 
 // serves only routes /users/:user, /channels/:channel, and /streams/:stream. 
 // These are more than enough to complete the challenge.
 // https://forum.freecodecamp.com/t/freecodecamp-challenge-guide-how-to-use-the-twitchtv-api/19541


 //IE 10+
 let twitchList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
     "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
 ]
 let len = twitchList.length
 for (var i = 0; i < len; i++) {
     let request = new XMLHttpRequest();
     let url = 'https://wind-bow.gomix.me/twitch-api/streams/' + twitchList[i] + "?"
     request.open('GET', url, true);

     request.onload = function() {
         if (this.status >= 200 && this.status < 400) {
             // success codes
             let data = JSON.parse(this.response);
             console.log(data);
             if (data.stream) {
                 // if the stream is online
                 let container = document.getElementById("container")
                     //          <div class="user-wrapper">
                     //     <img src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" class="user-image">
                     //     <p class="user-name">User.Name</p>
                     //     <span class="indicator-on"></span>
                     //     <p class="title">User.Title</p>
                     // </div>

                 let appendString = "<div class='user-wrapper'>" +
                     "<img src='" + data.stream.channel.logo + "' class = 'user-image'>" +
                     "<p class='user-name'>" + twitchList[i] + "</p>" +
                     "<span class='indicator-on'></span>" +
                     "<p class='title'>" + data.stream.channel.game + "</p></div>";
                 container.innerHTML += appendString;
             }
         } else {
             // returned an error
             alert("Error");
         }
     };

     request.onerror = function() {
         alert("Actual connection error");
     };

     request.send();
 }