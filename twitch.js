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

 let request = new XMLHttpRequest();
 let url = 'https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?'
 request.open('GET', url, true);

 request.onload = function() {
     if (this.status >= 200 && this.status < 400) {
         // success codes
         let data = JSON.parse(this.response);
         console.log(data._links.channel);
     } else {
         // returned an error
         alert("Error");
     }
 };

 request.onerror = function() {
     alert("Actual connection error");
 };

 request.send();