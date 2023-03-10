console.log("Welcome to Spotify");

// creating objects or variables
let songindex = 0; //songs will play according to this index
let audioElement=new Audio("songs/1.mp3") //current audio
let playButton = document.getElementById("playButton") //playbutton on the bottom bar
let bottomSongName = document.getElementById("bottomSongName") //placard song name
let bottomPlacard = document.getElementById("bottomPlacard") //placard
let progressBar  = document.getElementById("progressBar") //progress bar of song
let song = Array.from(document.getElementsByClassName("song"))  //to get song name
let songItemPlay= Array.from(document.getElementsByClassName("songItemPlay")) //to get song id 
// let volumeBar = document.getElementById('volumeBar');

// songlist
let songs=[
    {songname:"Calm down",file:"songs/1.mp3",cover:"cover/1.jpg",length:"03:59"},
    {songname:"Baazigar",file:"songs/2.mp3",cover:"cover/2.jpg",length:"02:47"},
    {songname:"3-59 AM",file:"songs/3.mp3",cover:"cover/3.jpg",length:"04:46"},
    {songname:"Intentions",file:"songs/4.mp3",cover:"cover/4.jpg",length:"03:33"},
    {songname:"Spaceship",file:"songs/5.mp3",cover:"cover/5.jpg",length:"02:04"},
    {songname:"Sunroof",file:"songs/6.mp3",cover:"cover/6.jpg",length:"02:43"},
    {songname:"Bones",file:"songs/7.mp3",cover:"cover/7.jpg",length:"02:45"},
    {songname:"Peaches",file:"songs/8.mp3",cover:"cover/8.jpg",length:"03:17"},
    {songname:"No Love",file:"songs/9.mp3",cover:"cover/9.jpg",length:"03:32"},
    {songname:"Namastute",file:"songs/10.mp3",cover:"cover/10.jpg",length:"02:00"},
    {songname:"Barking",file:"songs/11.mp3",cover:"cover/11.jpg",length:"03:21"}
]

// creating event listner

// handing play/pause button

playButton.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause")
        audioElement.play();  //will play audio
    }
    else{
        playButton.classList.remove("fa-circle-pause");
        playButton.classList.add("fa-circle-play")
        audioElement.pause();
    }
}
)

// creating make all play class to change the icons play/pause on click

const makeAllPlays=()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    }
    )
}

//Handling play pause button in middle list
// songItemPlay.forEach((element)=>{
//     element.addEventListener("click",(e)=>{
//     makeAllPlays();
//     //to get index  of songs
//     songindex = parseInt(e.target.id);
//     e.target.classList.remove("fa-play-circle");
//     e.target.classList.add("fa-pause-circle");
//     audioElement.src=`songs/${songindex+1}.mp3`;
//     audioElement.currentTime=0;
//     bottomSongName.innerText=songs[songindex].songname;
//     bottomPlacard.src=songs[songindex].cover;
//     audioElement.play();
//     playButton.classList.remove("fa-circle-play");
//     playButton.classList.add("fa-circle-pause");
//     })

// })

//progressbar working

audioElement.addEventListener("timeupdate",()=>{
    //Updating progress bar according to time
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100) //converting value of progressbar to percentage
    progressBar.value=progress;
    if(progress==100){
        playButton.classList.remove("fa-circle-pause");
        playButton.classList.add("fa-circle-play");
        progressBar.value=progress;
    }
    // console.log(progress)
}
)

progressBar.addEventListener("change",()=>{
    audioElement.currentTime=(progressBar.value * audioElement.duration)/100;
}
)

// to get song name and song img using objects inn javascript.

song.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].cover;//getting cover image of song fromg songs object
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname; //getting song name from object songs
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].length; //getting song length
}
)

//previous and next button working

document.getElementById("next").addEventListener('click',()=>{
    if(songindex>=11){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    audioElement.currentTime=0;
    bottomSongName.innerText=songs[songindex].songname;
    audioElement.play();
    playButton.classList.remove("fa-circle-play");
    playButton.classList.add("fa-circle-pause");
}
)

document.getElementById("previous").addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
        audioElement.src=`songs/${songindex+1}.mp3`;
        audioElement.currentTime=0;
        bottomSongName.innerText=songs[songindex].songname;
        audioElement.play();
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
    }
}
)

songItemPlay.forEach((element)=>{
        element.addEventListener("click",(e)=>{
            makeAllPlays();
            //to get index  of songs
            songindex = parseInt(e.target.id);
            console.log(e.target);
            console.log(e);
            if(audioElement.paused || audioElement.currentTime<=0){
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                audioElement.src=`songs/${songindex+1}.mp3`;
                audioElement.currentTime=0;
                bottomSongName.innerText=songs[songindex].songname;
                bottomPlacard.src=songs[songindex].cover;
                audioElement.play();
                playButton.classList.remove("fa-circle-play");
                playButton.classList.add("fa-circle-pause");
            }
            else{
                playButton.classList.remove("fa-circle-pause");
                playButton.classList.add("fa-circle-play");
                e.target.classList.remove("fa-pause-circle");
                e.target.classList.add("fa-play-circle");
                audioElement.src=`songs/${songindex+1}.mp3`;
                audioElement.currentTime=0;
                bottomSongName.innerText=songs[songindex].songname;
                bottomPlacard.src=songs[songindex].cover;
                audioElement.pause();  
            }
        }
        )
    }
)