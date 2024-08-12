const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");

const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");


// descargar despues los enlaces de esta pag: "https://rocknation.su/mp3/album-121"

let allSongs = [
{
    id: 0,
    title: "Women",
    artist: "Def Leppard",
    duration: "5:43",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/01.%20Women.mp3",
    },
    {
    id: 1,
    title: "Rocket",
    artist: "Def Leppard",
    duration: "6:37",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/02.%20Rocket.mp3",
    },
    {
    id: 2,
    title: "Animal",
    artist: "Def Leppard",
    duration: "4:04",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/03.%20Animal.mp3",
    },
    {
    id: 3,
    title: "Love Bites",
    artist: "Def Leppard",
    duration: "5:47",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/04.%20Love%20Bites.mp3",
    },
    {
    id: 4,
    title: "Pour Some Sugar On Me",
    artist: "Def Leppard",
    duration: "4:27",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/05.%20Pour%20Some%20Sugar%20On%20Me.mp3",
    },
    {
    id: 5,
    title: "Armageddon It",
    artist: "Def Leppard",
    duration: "5:23",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/06.%20Armageddon%20It.mp3",
    },
    {
    id: 6,
    title: "Gods of War",
    artist: "Def Leppard",
    duration: "6:36",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/07.%20Gods%20Of%20War.mp3",
    },
    {
    id: 7,
    title: "Don't Shoot Shotgun",
    artist: "Def Leppard",
    duration: "4:26",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/08.%20Don%27t%20Shoot%20Shotgun.mp3",
    },
    {
    id: 8,
    title: "Run Riot",
    artist: "Def Leppard",
    duration: "4:39",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/09.%20Run%20Riot.mp3",
    },
    {
    id: 9,
    title: "Hysteria",
    artist: "Def Leppard",
    duration: "5:54",
    src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/10.%20Hysteria.mp3",
    },
    {
      id: 10,
      title: "Excitable",
      artist: "Def Leppard",
      duration: "4:19",
      src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/11.%20Excitable.mp3",
      },
      {
        id: 11,
        title: "Love And Affection",
        artist: "Def Leppard",
        duration: "4:35",
        src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/12.%20Love%20And%20Affection.mp3",
        },
        {
          id: 12,
          title: "Love And Affection [Live]",
          artist: "Def Leppard",
          duration: "4:52",
          src: "https://rocknation.su/upload/mp3/Def%20Leppard/1987%20-%20Hysteria/13.%20Love%20And%20Affection%20%5BLive%5D.mp3",
          },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  
  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
   if (userData?.currentSong === null) return;
   else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
   }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs); 
  highlightCurrentSong(); 
  setPlayButtonAccessibleText(); 

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSongs(sortSongs()); 
      setPlayButtonAccessibleText();
      resetButton.remove();
    });

  }

};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click",  pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
      playNextSong();
    } else {
      userData.currentSong = null;
      userData.songCurrentTime = 0;  


    }
});

//se ordena por ID
const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.id < b.id) {
      return -1;
    }

    if (a.id > b.id) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(sortSongs());
setPlayButtonAccessibleText();