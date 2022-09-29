const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const navbarAccount = $('.navbar__account')
const boxAccount = $('.box__account')
const modalLayout = $('.modal__layout')
const album__playlist = $('.album__item')
const wrrapContainerMusic = $('#wrrap__container-music')
const containerPlaylist = $('#container__playlist')
const arrowLeft = $('.navbar__arrow--left')
const arrowRight = $('.navbar__arrow--right')
const heart_drop = $('.icon__heart-drop') 
const heart_white = $('.icon__heart-white')

//! function open and close box account 
navbarAccount.onclick = function(){
    boxAccount.classList.toggle('showtoWeb')
    modalLayout.style.display='block'
}
modalLayout.onclick = function(){
    boxAccount.classList.remove('showtoWeb')
    modalLayout.style.display='none'
}
boxAccount.addEventListener('click',function(event){
           event.stopPropagation()
       })

//! function open and close album__playlist us uk
album__playlist.onclick = function(){
  wrrapContainerMusic.style.display='none'
  containerPlaylist.style.display='block'
  arrowLeft.onclick = function(){
    wrrapContainerMusic.style.display='block'
    containerPlaylist.style.display='none'
  }
  arrowRight.onclick = function(){
    wrrapContainerMusic.style.display='none'
    containerPlaylist.style.display='block'
  }
}

//! function click to heart_drop 
heart_drop.onclick = function(){
  heart_drop.style.display='none'
  heart_white.style.display='block'
}
heart_white.onclick=function(){
  heart_drop.style.display='block'
  heart_white.style.display='none'
}

//! code JS xử lý chức năng bài hát
const music_playlist = $('.music_playlist')
const songName = $('.infor__song .song__name-main')
const songAuthor = $('.song__author-main')
const songImage = $('.song__image-main')
const audio = $('#audio')
const playPauseBtn = $('.play-pause-btn')
const toggleBtn = $('.toggle_btn')
const nextbtn = $('.next__button')
const prevbtn = $('.prev__button')
const shufflebtn = $('.shuffle__button .control__btn')
const repeatBtn = $('.repeat__button .control__btn')
const progress = $('.progress')
const listNumber = $('.list__number')
const startTime = $('.start__time')
const totalTime = $('.total__time')
const volume = $('.volume')
const activeSong = $('.active__song')
const playedSong = [];
const app ={
  currentIndex: 0,
  isPlaying:false,
  isRandom: false,
  isRepeat: false,
    songs: [
  {
    name:'Unstoppable',
    singer:'Sia',
    path:'./mp3/song1.mp3',
    image:'./img/img1.jpg'
  },
  {
    name:'Older',
    singer:'Sasha Alex Sloan',
    path:'./mp3/song2.mp3',
    image:'./img/img2.jpg'
  },
  {
    name:'Umbrella',
    singer:'Ember lsland',
    path:'./mp3/song3.mp3',
    image:'./img/img3.jpg'
  },
  {
    name:'So Far Away',
    singer:'Adam Christopher',
    path:'./mp3/song4.mp3',
    image:'./img/img4.jpg'
  },
  {
    name:'The nights',
    singer:'Citycreed Cover',
    path:'./mp3/song5.mp3',
    image:'./img/img5.jpg'
  },
  {
    name:'Cửu môn hồi ức',
    singer:'Đẳng Thập Ma Quân',
    path:'./mp3/song6.mp3',
    image:'./img/img6.jpg'
  },
  {
    name:'Imagination',
    singer:'Shawn Mendes',
    path:'./mp3/song7.mp3',
    image:'./img/img7.jpg'
  },
  {
    name:'Navada',
    singer:'Vicetone',
    path:'./mp3/song8.mp3',
    image:'./img/img8.jpg'
  },
  {
    name:'2002',
    singer:'Anne-Marie',
    path:'./mp3/song9.mp3',
    image:'./img/img9.jpg'
  },
  {
    name:'Alone',
    singer:'Alan Walker',
    path:'./mp3/song10.mp3',
    image:'./img/img10.jpg'
  },
  {
    name:'Way Back Home',
    singer:'SHAUN',
    path:'./mp3/song11.mp3',
    image:'./img/img11.jpg'
  },
  {
    name:'Always',
    singer:'lsak Danielson',
    path:'./mp3/song12.mp3',
    image:'./img/img12.jpg'
  }
],
//! Hàm render bài hát ra playlist
    render: function(){
        var htmls = this.songs.map((song,index)=>{
            return` <div class="box__music--infor ${index===this.currentIndex ?'active__song':''}" data-index="${index}">
                            <div class="list__number">
                              <span class="list__number--stt">${index+=1}</span>
                              <img src="https://phamhongphuc1403.github.io/spotify/assets/images/main-view/icon-playing.gif" alt="" class="playing__img-gif">
                              <span class="pause-btn">
                                <img src="https://phamhongphuc1403.github.io/spotify/assets/images/main-view/play-this-song.PNG" alt="" class="pause-btn-img">
                              </span>
                            </div>
                            <div class="box__song">
                              <div class="box__song-infor">
                          <img src="${song.image}" alt="" class="song__image-main img-small-size">
                          <div class="infor__song">
                            <span class="song__name-main">${song.name}</span>
                            <span class="song__author-main">${song.singer}</span>
                          </div>
                          </div>
                            </div>
                            <span class="album hide-on-mobile">All fall down</span>
                            <span class="date hide-on-supper-mobile hide-on-supper-tablet ">30 thg 9, 2022</span>
                            <div class="box__time-tool hide-on-mobile">
                              <div class="icon__heart-song ">
                                <img src="https://phamhongphuc1403.github.io/spotify/assets/images/now-playing/favorite.png" alt="">
                              </div>
                              <span class="time">3:56</span>
                              <span class="three__dot">
                                <img src="https://phamhongphuc1403.github.io/spotify/assets/images/main-view/see-more.PNG" alt="">
                              </span>
                            </div>
                          </div>`
        })
        music_playlist.innerHTML = htmls.join('') 
        this.TimeDurationSong()
    },
    //! Load active song: 
    LoadActiveSong: function(){
      const activeSong = $('.active__song')
      return activeSong;
    }
    ,
    //! Xử lý ActiveSong when pause:
    ActiveSongWhenPause: function(){
      const activeNumber = $('.active__song .list__number .list__number--stt')
      activeNumber.classList.remove('hiddenn')
      $('.active__song .pause-btn-img').src = 'https://phamhongphuc1403.github.io/spotify/assets/images/main-view/play-this-song.PNG';
      
    }
    ,
    //! Xử lý ActiveSong when play:
    ActiveSongWhenPlay: function(){
      const activeNumber = $('.active__song .list__number .list__number--stt')
      activeNumber.classList.add('hiddenn')
      $('.active__song .pause-btn-img').src = 'https://phamhongphuc1403.github.io/spotify/assets/images/main-view/pause-this-song.PNG';
    }
    ,
    //! Định nghĩa thuộc tính mới 
    defineproperties: function(){
      Object.defineProperty(this,'currentSong',{
        get: function(){
          return this.songs[this.currentIndex]
        }
      }
      )
    },
//! Load ra bài hát đầu tiên:
LoadCurrentSong: function(){
      songName.innerHTML = this.currentSong.name
      songAuthor.innerHTML = this.currentSong.singer
      songImage.src = this.currentSong.image
      audio.src = this.currentSong.path;
    },
//! Hàm handle xử lý các chức năng nhạc:
handleEvents: function(){
  const _this = this
  //todo xử lý khi bấm play/pause bài hát:
  playPauseBtn.onclick = function(){
      if(_this.isPlaying){
        audio.pause();
        const activeNumber = $('.active__song .list__number .list__number--stt')
        activeNumber.style.display='block'  
        toggleBtn.src = './img button/pause__toggle.png';
          const playingGif = $('.active__song .list__number .playing__img-gif')
          playingGif.style.display = 'none';
      }
      else {
        const activeNumber = $('.active__song .list__number .list__number--stt')
        audio.play()
        activeNumber.style.display = 'none';  
        toggleBtn.src = './img button/play__toggle.png';
        const playingGif = $('.active__song .list__number .playing__img-gif')
        playingGif.style.display='block';
      }
    }
    
    //todo xử lý khi nhạc phát và nhạc dừng:
    audio.onplay = function(){
         _this.isPlaying=true;
         toggleBtn.src = './img button/play__toggle.png';
         _this.ActiveSongWhenPlay()
      app.LoadActiveSong().onmouseover = function () {
        toggleBtn.src = './img button/play__toggle.png';
        const playingGif = $('.active__song .list__number .playing__img-gif')
        playingGif.style.display = 'none';
      }
      app.LoadActiveSong().onmouseout = function () {
          toggleBtn.src = './img button/play__toggle.png';
            const playingGif = $('.active__song .list__number .playing__img-gif')
            playingGif.style.display = 'block';
  }
      }
      
      audio.onpause = function(){
        _this.isPlaying=false;
        toggleBtn.src = './img button/pause__toggle.png';
        _this.ActiveSongWhenPause()
        app.LoadActiveSong().onmouseover = function () {
          toggleBtn.src = './img button/pause__toggle.png';
        }
        app.LoadActiveSong().onmouseout = function () {
          toggleBtn.src = './img button/pause__toggle.png';
        }
    }
      //todo xử lý khi next bài hát:
      nextbtn.onclick = function(){
        setTimeout(function(){
          if (_this.isRandom) {
            _this.ShuffleSong();
            _this.render();
            _this.scrollIntoView()
            _this.ActiveSongWhenPlay()
            const playingGif = $('.active__song .list__number .playing__img-gif')
            playingGif.style.display = 'block';
          }
          else {
            _this.NextSong();
            _this.render()
            _this.scrollIntoView()
            _this.ActiveSongWhenPlay()
            const playingGif = $('.active__song .list__number .playing__img-gif')
            playingGif.style.display = 'block';
          }
        },300)
      }
      //todo Xử lý khi mở lại bài hát trước đó:
      prevbtn.onclick = function(){
         setTimeout(function(){
           if (_this.isRandom) {
             _this.ShuffleSong();
             _this.render();
             _this.scrollIntoView()
             _this.ActiveSongWhenPlay()
             const playingGif = $('.active__song .list__number .playing__img-gif')
             playingGif.style.display = 'block';
           }
           else {
             _this.PrevSong()
             _this.render()
             _this.scrollIntoView()
             _this.ActiveSongWhenPlay()
             const playingGif = $('.active__song .list__number .playing__img-gif')
             playingGif.style.display = 'block';
           }
         },300)
      }
      //todo Xử lý khi Random bài hát:
      shufflebtn.onclick = function() {
        _this.isRandom = !_this.isRandom
        shufflebtn.classList.toggle('active',_this.isRandom)
      }
      //todo Xử lý khi lặp lại bài hát:
      repeatBtn.onclick = function(){
        _this.isRepeat=!_this.isRepeat;
        repeatBtn.classList.toggle('active',_this.isRepeat)
      }
      //todo Xử lý khi tua  bài hát: 
      progress.onchange = function(e){
        var seekTime = e.target.value / 100 * audio.duration
        audio.currentTime = seekTime
      }
      //todo Xử lý khi tiến trình bài hát thay đổi:
      audio.ontimeupdate = function(){
        if(audio.duration){
          var progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
          progress.value = progressPercent
        }
        _this.TimeCurrentSong()
        _this.TimeDurationSong()
      }
      //todo Xử lý next và repeat khi kết thúc bài hát:
      audio.onended = function(){
        if(_this.isRepeat){
          _this.repeatSong()
            _this.render()
          _this.scrollIntoView()
          const playingGif = $('.active__song .list__number .playing__img-gif')
          playingGif.style.display = 'block';
        }
        else {
          if(_this.isRandom){
          _this.ShuffleSong()
            _this.render()
          _this.scrollIntoView()
            const playingGif = $('.active__song .list__number .playing__img-gif')
            playingGif.style.display = 'block';
        }
          else {
          _this.NextSong()
            _this.render()
          _this.scrollIntoView()
          const playingGif = $('.active__song .list__number .playing__img-gif')
          playingGif.style.display = 'block';
        }
        }
      }
      //todo Xử lý khi active song:       
  music_playlist.onclick = function(e){
    const activeNumber = $('.active__song .list__number .list__number--stt')
        const songNode = e.target.closest('.box__music--infor:not(.active__song)')           
        if(songNode){
          _this.currentIndex = Number(songNode.dataset.index)
          _this.LoadCurrentSong()
          audio.play()
          _this.render()
        }      
        activeNumber.classList.add('hiddenn')  
      }
      //todo Xử lý khi volume thay đổi:
      volume.onchange = function(e){
          var seekVolume = e.target.value / 100
          audio.volume = seekVolume;
      }
    }
,
 //! Hàm xử lý next bài hát:
      NextSong: function(){
         this.currentIndex++;
         if(this.currentIndex === this.songs.length){
         this.currentIndex=0
         }
         this.LoadCurrentSong()
         audio.play()
      }
 ,
 //! Hàm xử lý quay lại bài hát trước:
      PrevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex=this.songs.length - 1
         }
        this.LoadCurrentSong()
        audio.play()
      }
 ,
//! Hàm xử lý khi random bài hát:
      ShuffleSong: function(){
        let newIndex 
        newIndex = (Math.floor(Math.random()*this.songs.length)) 
        while(playedSong.find(index=>index==newIndex)!==undefined){
            newIndex = (Math.floor(Math.random()*this.songs.length)) 
        }
        playedSong.push(newIndex);
        if(playedSong.length === this.songs.length){
          playedSong.length = [];
        }
        this.currentIndex = newIndex;
        this.LoadCurrentSong();
        audio.play()
        const playingGif = $('.active__song .list__number .playing__img-gif')
        playingGif.style.display = 'block';
      }
 ,
 //! Hàm xử lý khi lặp lại bài hát:
        repeatSong: function(){
          let newIndex;
          newIndex = this.currentIndex;
          this.currentIndex = newIndex
          this.LoadCurrentSong()
          audio.play()
          const playingGif = $('.active__song .list__number .playing__img-gif')
          playingGif.style.display = 'block';
        }
        ,
  //! Hàm xử lý scroll into view:
  scrollIntoView: function(){
    var scroll = $('.active__song')
    scroll.scrollIntoView({
      behavior: "smooth", block: "center"
    })
     if (document.querySelector(".active__song").offsetTop <= 72) {
				window.scrollTo({ top: 1200 + "px", behavior: "smooth" });
  }}
  ,
  //! Hàm Format chuyển đổi giữa giây và phút:
  TimeFormat: function(currentTimeSecond){
          let minutes = Math.floor(currentTimeSecond / 60)
          let seconds = Math.floor(currentTimeSecond - minutes*60)
          if(minutes<10){
            minutes = '' + minutes;
          }
          if(seconds<10){
            seconds = '0' + seconds
          }
          return minutes+':'+seconds;
        },
    //! Hàm hiển thi thời gian bài hát:
        TimeCurrentSong: function(){
            let cur =this.TimeFormat(audio.currentTime)
            startTime.textContent = `${cur}`;
        },
        TimeDurationSong: function(){
            if(audio.duration){
              let dur =this.TimeFormat(audio.duration)
              totalTime.textContent=`${dur}`
            }
        }
 ,
start: function(){
    this.defineproperties()
    this.LoadCurrentSong()
    this.handleEvents()
    this.render()
    this.scrollIntoView()
    this.TimeDurationSong()
}

}
app.start()
