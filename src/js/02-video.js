import VimeoPlayer from '@vimeo/player';
const throttle = require('lodash.throttle');
console.log(throttle);
const iframeEl = document.querySelector('iframe');
const player = new VimeoPlayer(iframeEl);
const savedTime = {
  second: 0,
};
player.on('timeupdate', function ({ duration, percent, seconds }) {
  savedTime.second = seconds;
  localStorage.setItem('videoplayer-current-time', savedTime.second);
});
const newTime = localStorage.getItem('videoplayer-current-time');
console.log(newTime);
player
  .setCurrentTime(newTime)
  .then(function (newTime) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log('The time is out of range!');
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        console.log('Some other error occured');
        // some other error occurred
        break;
    }
  });