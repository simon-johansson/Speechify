var SpotifyWebApi = require('spotify-web-api-node');
var spotify = require('spotify-node-applescript');

var spotifyApi = new SpotifyWebApi({
  clientId : '0cfb6d59a89d4162b5afe28933931bb0',
  clientSecret : '30e8308df68c4a26b98abc6a6fbea851',
  redirectUri : 'http://www.example.com/callback'
});

voiceBox.addResponder(/Play (.*)/i, function(){
  var query = RegExp.$1;
  // console.log('Query: ', query);
  spotifyApi.searchTracks(query)
    .then(function(data) {
      var track = data.body.tracks.items[0];
      var trackUri = track.uri;
      var albumUri = track.album.uri;
      // console.log(trackUri, albumUri);
      spotify.playTrackInContext(trackUri, albumUri, function(){
      // spotify.playTrack(trackUri, function(){
        spotify.setVolume(100, function() {});
      });
    }, function(err) {
      console.error(err);
      voiceBox.respond('Sorry, I could not find anything named ' + query, function () {
        spotify.setVolume(100, function() {});
      });
    });
});

voiceBox.addResponder(/What's playing/i, function(){
  spotify.getTrack(function(err, track){
    voiceBox.respond(track.name + ' by ' + track.artist, function () {
      spotify.setVolume(100, function() {});
    });
  });
});

voiceBox.addResponder(/Next/i, function(){
  spotify.next(function() {});
  spotify.setVolume(100, function() {});
});

voiceBox.addResponder(/Previous/i, function(){
  spotify.previous(function() {});
  spotify.previous(function() {});
  spotify.setVolume(100, function() {});
});

voiceBox.addResponder(/Stop/i, function(){
  spotify.pause(function() {});
});

voiceBox.addResponder(/Resume/i, function(){
  spotify.play(function() {});
  spotify.setVolume(100, function() {});
});

// voiceBox.addResponder(/What's my name/i, function(){
//   var name = voiceBox.db.get('users_name');
//   if ( name ){
//   }else{
//     voiceBox.respond("You haven't told me your name")
//   }
// })

// voiceBox.addResponder(/how are you/i, function(){
//   voiceBox.respond('I\'m good, thanks for asking!')
// })

// function storeName(name){
//   voiceBox.db.set('users_name', name);
// }
