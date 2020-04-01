function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}const { ReactDOM, React, TimlineMax, TweenMax, Power0 } = window;
const { useState, useEffect, useRef } = React;
const { render } = ReactDOM;
const rootNode = document.getElementById('app');

const buildTimelines = (player, video) => {
  const indicators = player.querySelectorAll('.video-player__indicator');
  const playingTL = new TimelineMax().
  add(
  TweenMax.to(indicators[2], video.duration / 2, {
    scaleX: 1,
    ease: Power0.easeNone }),

  0).

  add(
  TweenMax.to(indicators[3], video.duration / 2, {
    scaleY: 1,
    ease: Power0.easeNone }),

  0).

  add(
  TweenMax.to(indicators[0], video.duration / 2, {
    scaleX: 1,
    ease: Power0.easeNone }),

  video.duration / 2).

  add(
  TweenMax.to(indicators[1], video.duration / 2, {
    scaleY: 1,
    ease: Power0.easeNone }),

  video.duration / 2);

  playingTL.seek(video.currentTime);
  playingTL.paused(true);

  const endingTL = new TimelineMax({
    onComplete: () => playingTL.seek(0),
    onReverseComplete: () => video.play() }).

  add(
  TweenMax.to(video, 0.25, {
    scale: 0 })).


  add(TweenMax.to(player.querySelector('.video-player__action'), 0.25, { scale: 1 }));
  endingTL.paused(true);
  return [playingTL, endingTL];
};
const VideoPlayer = ({ src, border = 5, accent = '#bada55', ...videoProps }) => {
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const timeRef = useRef(null);
  const playingTL = useRef(null);
  const endingTL = useRef(null);


  // If the video duration changes, lets build the timelines
  useEffect(() => {
    if (playerRef.current && videoRef.current && videoRef.current.duration > 0) {
      const [playing, ending] = buildTimelines(playerRef.current, videoRef.current);
      playingTL.current = playing;
      endingTL.current = ending;
      // updateTimestamp()
    }
  }, [duration]);

  const onPlay = () => playingTL.current && playingTL.current.play();

  const onPause = () => playingTL.current && playingTL.current.pause();

  const onEnded = () => endingTL.current && endingTL.current.play();

  const onSeeking = () => playingTL.current && playingTL.current.seek(videoRef.current.currentTime);

  const updateTimestamp = () => timeRef.current.innerText = `0:${videoRef.current.currentTime < 10 ? `0${Math.floor(videoRef.current.currentTime)}` : Math.floor(videoRef.current.currentTime)} / 0:${duration < 10 ? `0${Math.floor(duration)}` : Math.floor(duration)}`;

  const onTimeUpdate = () => {
    progressRef.current.value = videoRef.current.currentTime / videoRef.current.duration;
    // updateTimestamp()
  };

  const onReplay = () => {
    videoRef.current.currentTime = 0;
    endingTL.current.reverse();
  };

  const onInput = () => {
    videoRef.current.currentTime = videoRef.current.duration * progressRef.current.value;
    playingTL.current.seek(videoRef.current.duration * progressRef.current.value);
  };

  return (
    React.createElement("div", { ref: playerRef, className: "video-player", style: {
        '--accent': accent,
        '--border': border } },

    React.createElement("video", _extends({
      className: "video-player__video",
      controls: true,
      src: src,
      onPlay: onPlay,
      onPause: onPause,
      onEnded: onEnded,
      onDurationChange: () => setDuration(videoRef.current.duration),
      onSeeking: onSeeking,
      onTimeUpdate: onTimeUpdate,
      ref: videoRef },
    videoProps)),

    new Array(4).fill().map((i, idx) =>
    React.createElement("div", { key: `video-player-indicator--${idx}`, className: "video-player__indicator" })),

    React.createElement("button", { className: "video-player__action", onClick: onReplay },
    React.createElement("svg", { viewBox: "0 0 24 24" },
    React.createElement("path", { d: "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" })))));




};

//       <div className='video-player__controls'>
//         <span ref={timeRef} className='video-player__duration'>0:00 / 0:00</span>
//         <input defaultValue={0} ref={progressRef} type='range' min={0} max={1} step={0.001} onInput={onInput}/>
//       </div>

const App = () => {
  return (
    React.createElement(VideoPlayer, { src: "http://s3.bytecdn.cn/aweme/resource/web/static/image/index/new-tvc_889b57b.mp4" }));

};

render(React.createElement(App, null), rootNode);