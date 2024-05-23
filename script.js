//Get the elements
const image=document.querySelector("img");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const music=document.querySelector('audio');

//buttons
const prevButton=document.getElementById("prev");
const playButton=document.getElementById("play");
const nextButton=document.getElementById('next');

//progress bar
const progressContainer=document.getElementById("progress-container");
const progress=document.getElementById("progress");

//Duration Elements
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('end-time');

//boolean to determine if music is currently playing or not
let isPlaying=false;

//Music list array
const songs=[
    {
        name:"jacinto-1",
        displayName:'Electric Chill Machine',
        artist:'Jacinto'
    },
    {
        name:"jacinto-2",
        displayName:'Seven Nation Army',
        artist:'bkk'
    },
    {
        name:"jacinto-3",
        displayName:'Jacinto 3',
        artist:'Jacinto'
    },
    {
        name:"metric-1",
        displayName:'Electric Bread Machine',
        artist:'Bread and Butter'
    }
]


//Functions to play and pause music

function playMusic(){
    music.play();
    isPlaying=true;
    playButton.classList.replace('fa-play','fa-pause');
    playButton.setAttribute('title', "Pause");
}

function pauseMusic(){
    music.pause();
    isPlaying=false;
    playButton.classList.replace('fa-pause','fa-play');
    playButton.setAttribute("title", "Play");
}

playButton.addEventListener('click',()=>{
isPlaying? pauseMusic(): playMusic();
})

//Function to load son into ui
function loadMusic(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    image.src=`img/${song.name}.jpg`;
    music.src=`music/${song.name}.mp3`;
}

//Function to play prev and next song

let songIndex=0;

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadMusic(songs[songIndex]);
    playMusic()
}

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadMusic(songs[songIndex]);
    playMusic();
}

//UPdate progress bar

function updateProgressBar(e){
    const {currentTime, duration}=e.srcElement;
    if (isPlaying){
        // console.log(currentTime, duration);
        const progressPercentage=currentTime*100/duration
    progress.style.width=`${progressPercentage}%`;
    //Calculate the duration
    const durationMinutes=Math.floor(duration/60);
    let durationSeconds=Math.floor(duration%60);
    
    if(durationSeconds<10){
        durationSeconds=`0${durationSeconds}`;
    }
    //delay switching when durationseconds is NaN   
    if(durationSeconds){
        durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
    }
    const currentTimeMinutes=Math.floor(currentTime/60);
    let currentTimeSeconds=Math.floor(currentTime%60);
    if(currentTimeSeconds<10){
        currentTimeSeconds=`0${currentTimeSeconds}`;
    }
    //delay switching when currentSEconds is NaN
    if(currentTimeSeconds){
        currentTimeEl.textContent=`${currentTimeMinutes}:${currentTimeSeconds}`;
    }
    
    }
    
}

function setProgressBar(e){
    // console.log(e);
    // console.log(this.clientWidth, e.offsetX);
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const {duration}=music;
    music.currentTime=(clickX/width)*duration;
}

//Onload

loadMusic(songs[0]);

//Event Listeners
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click', setProgressBar);

