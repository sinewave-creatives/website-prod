function openVideo(name) {



    videoSource = document.getElementById("videoShot")
    videoSource.setAttribute('src',"/assets/videos/"+name) 
    document.getElementById("myVideo").style.display = "block";    
  }
  
  function closeVideo() {
    videoSource.setAttribute('src',"") 
    document.getElementById("myVideo").style.display = "none";
  }