import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframeEl = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframeEl);
const saveData = ({ seconds }) => {
  try {
    const data = JSON.stringify(seconds);
    localStorage.setItem('videoplayer-current-time', data);
  } catch (err) {
    console.error('Stringify error:', err.message, err.type);
  }
};
const readData = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? 0 : JSON.parse(data);
  } catch (err) {
    console.error('Parse error:', err.message, err.type);
  }
};

player.on('timeupdate', throttle(saveData, 1000));

player.setCurrentTime(readData('videoplayer-current-time'));

// const saveData = (key, value) => {
//   try {
//     const data = JSON.stringify(value);
//     localStorage.setItem(key, data);
//   } catch (err) {
//     console.error('Stringify error:', err.message, err.type);
//   }
// };
// const readData = key => {
//   try {
//     const data = localStorage.getItem(key);
//     return data === null ? undefined : JSON.parse(data);
//   } catch (err) {
//     console.error('Parse error:', err.message, err.type);
//   }
// };

// player.on(
//   'timeupdate',
//   throttle(({ seconds }) => {
//     savedTime.mySeconds = seconds;
//     saveData('videoplayer-current-time', savedTime.mySeconds);
//   }, 1000)
// );

// player.setCurrentTime(readData('videoplayer-current-time'));
