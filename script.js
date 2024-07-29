document.addEventListener("DOMContentLoaded", () => {
    // Select elements from the DOM
    let songName = document.querySelector("#song-name");
    let songSinger = document.querySelector("#song-singer");
    let songImage = document.querySelector(".song-image");
    let playlistContainer = document.querySelector("#playlist-container");

    let index = 0; // Initial index (updated from 1 to 0 for 0-based indexing)
    let track = document.createElement("audio"); // Create an audio element
    let songs = [
        {
            name: "Tum Se",
            path: "Tumse.mp3",
            image: "image1.jpg",
            singer: "Sachin-Jigar"
        },
        {
            name: "Soulmate",
            path: "Soulmate.mp3",
            image: "image2.jpeg",
            singer: "Badshah"
        },
        {
            name: "Tauba Tauba",
            path: "TaubaTauba.mp3",
            image: "image3.jpeg",
            singer: "Karan Aujlas"
        },
        {
            name: "Tum Se Hi",
            path: "TumSeHi.mp3",
            image: "image4.jpeg",
            singer: "Mohit Chahuan"
        },
        {
            name: "Pehla Pyaar",
            path: "PehlaPyaar.mp3",
            image: "image5.jpeg",
            singer: "Armaan Malik"
        }
    ];

    function loadTrack(index) {
        if (index >= 0 && index < songs.length) {  // Check index boundaries
            track.src = songs[index].path;
            songName.innerHTML = songs[index].name;
            songSinger.innerHTML = songs[index].singer;
            songImage.style.backgroundImage = `url("${songs[index].image}")`;
        }
    }

    function loadPlaylist() {
        let playlistHTML = songs.map((song, i) => `<li data-index="${i}">${song.name} - ${song.singer}</li>`).join("");
        document.querySelector("#playlist-container ul").innerHTML = playlistHTML;
    }

    // Initial load
    loadTrack(index);
    loadPlaylist();

    // Function to play or pause the song
    function togglePlayPause() {
        if (track.paused) {
            track.play();
            document.querySelector("#play-img").src = "pause.svg"; // Update play button to pause icon
        } else {
            track.pause();
            document.querySelector("#play-img").src = "play.svg"; // Update pause button to play icon
        }
    }

    // Function to change to the next song
    function nextSong() {
        index = (index + 1) % songs.length;  // Loop back to 0 if at the end
        loadTrack(index);
        track.play();  // Automatically play the next song
    }

    // Function to change to the previous song
    function prevSong() {
        index = (index - 1 + songs.length) % songs.length;  // Loop to end if at the start
        loadTrack(index);
        track.play();  // Automatically play the previous song
    }

    // Function to toggle playlist visibility
    function togglePlaylist() {
        if (playlistContainer.style.display === "none") {
            playlistContainer.style.display = "block";
        } else {
            playlistContainer.style.display = "none";
        }
    }

    // Function to select a song from the playlist
    function selectSong(event) {
        let songIndex = event.target.getAttribute("data-index");
        if (songIndex !== null) {
            index = parseInt(songIndex);
            loadTrack(index);
            track.play();
        }
    }

    // Event listeners
    document.querySelector("#prev-img").addEventListener("click", prevSong);
    document.querySelector("#next-img").addEventListener("click", nextSong);
    document.querySelector("#play-img").addEventListener("click", togglePlayPause);
    document.querySelector("#playlist-img").addEventListener("click", togglePlaylist);
    playlistContainer.addEventListener("click", selectSong);

    // Optionally, add event listener for the volume range input
    document.querySelector("#volume-range").addEventListener("input", (event) => {
        track.volume = event.target.value / 100; // Volume is a value between 0 and 1
    });

    // Optionally, add event listener for the song duration input
    document.querySelector("#song-duration").addEventListener("input", (event) => {
        track.currentTime = (event.target.value / 100) * track.duration; // Seek to the position
    });

    // Update the duration range input as the song plays
    track.addEventListener("timeupdate", () => {
        let durationInput = document.querySelector("#song-duration");
        durationInput.value = (track.currentTime / track.duration) * 100;
    });
});
