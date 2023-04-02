import VimeoPlayer from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframeEl = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframeEl);
const savedTime = {
  mySeconds: 0,
};
const saveData = (key, value) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error('Stringify error:', err.message, err.type);
  }
};
const readData = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (err) {
    console.error('Parse error:', err.message, err.type);
  }
};

player.on(
  'timeupdate',
  throttle(function ({ seconds }) {
    savedTime.mySeconds = seconds;
    saveData('videoplayer-current-time', savedTime.mySeconds);
  }, 1000)
);

const newTime = readData('videoplayer-current-time');
player
  .setCurrentTime(newTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log('The time is out of range!');
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        console.log(`Some other error occured, maybe 'newTime' is ${newTime}?`);
        // some other error occurred
        break;
    }
  });
