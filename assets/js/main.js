$(document).ready(function(){
  //Basic Variables
  var meilk = parseInt(localStorage['meilkcache']) || 0;
  var meilkpclick = parseInt(localStorage['mpccache']) || 1;
  var meilkpsecond = parseInt(localStorage['mpscache']) || 0;
  var cost = 0;
  var siccount = 4;
  var siscount = 5;
  var antimacro = 0;
  //To make Shop Stuff easier!
  function createSi(si, sicost) {
    eval(`${'si' + si} = parseInt(localStorage['si${si}cache']) || ${sicost};`);
    console.log(`Created Si! ${si} ${sicost} ${'si' + si}`);
  }
  //Shop Upgrades for Items
  createSi("c1", 30);
  createSi("c2", 70);
  createSi("c3", 200);
  createSi("c4", 500);
  //Shop Upgrades for Seconds
  createSi("s1", 20);
  createSi("s2", 100);
  createSi("s3", 250);
  createSi("s4", 475);
  createSi("s5", 750);

  //Stuff to reload shop :I
  function reloadShop() {
    let sicloading = 1;
    let sisloading = 1;
    let sicloading2 = 1;
    let sisloading2 = 1;
    while (sicloading <= siccount) {
       eval(`sic${sicloading} = Math.floor(sic${sicloading});`);
       sicloading2 = eval(`sic${sicloading}`);
       $(`#sicl${sicloading}`).text(`${sicloading2} Meilk`);
       sicloading++;
       console.log(`Sic Loading ${sicloading};${sicloading2};`);
    }
    while (sisloading <= siscount) {
       eval(`sis${sisloading} = Math.floor(sis${sisloading});`);
       sisloading2 = eval(`sis${sisloading}`);
       $(`#sisl${sisloading}`).text(`${sisloading2} Meilk`);
       sisloading++;
       console.log(`Sis Loading ${sisloading};${sisloading2};`);
    }
  }

  //Set the meilk count
  $(".meilkstats").text(`${meilk} Meilk`);
  $(".mpsstats").text(`${meilkpsecond} Meilk / Second`);
  $(".mpcstats").text(`${meilkpclick} Meilk / Click`);
  reloadShop();

  //Meilk Clicker!
  $(".meilk").click(function(){
    if (antimacro < 21) {
      meilk += meilkpclick
      console.log(`Meilk: ${meilk}; MPC: ${meilkpclick};`);
      $(".meilkstats").text(`${meilk} Meilk`);
       antimacro++
    } else {
      console.error(`Ha! Anti-Macro caught you! You clicked ${antimacro} in this second! `);
      antimacro++
    }
  });

  //Loop
  setInterval(function () {
    meilk += meilkpsecond;
    $(".meilkstats").text(`${meilk} Meilk`);
    meilk = Math.floor(meilk);
    meilkpsecond = Math.floor(meilkpsecond);
    meilkpclick = Math.floor(meilkpclick);
    antimacro = 0;
  }, 1000);

   //Cache Stuff
   setInterval(function () {
     if (localStorage['cacheenabled'] == "true") {
       $(".savestatus").text("Saving...").fadeIn(0);
       localStorage['meilkcache'] = meilk;
       localStorage['mpscache'] = meilkpsecond;
       localStorage['mpccache'] = meilkpclick;
       //ToDo: Simplify this (a.k.a. less spaghetti)
       let siccaching = 1;
       while (siccaching <= siccount) {
          eval(`localStorage['sic${siccaching}cache'] = sic${siccaching};`);
          console.log(`Caching Sic: ${siccaching}`);
          siccaching++;
       }
       let siscaching = 1;
       while (siscaching <= siscount) {
          eval(`localStorage['sis${siscaching}cache'] = sis${siscaching};`);
          console.log(`Caching Sis: ${siscaching}`);
          siscaching++;
       }
       $(".savestatus").text("Saved!").delay(500).fadeOut(600);
     }
   }, 5000);

  //Shop Items: Per Clicks
  $("#sic1").click(function(){
    cost = sic1;
    if (meilk >= cost) {
      sic1 *= 12;
      sic1 /= 10;
      purchase(1,0);
    }
  });

  $("#sic2").click(function(){
    cost = sic2;
    if (meilk >= cost) {
      sic2 *= 12;
      sic2 /= 10;
      purchase(4,0);
    }
  });

  $("#sic3").click(function(){
    cost = sic3;
    if (meilk >= cost) {
      sic3 *= 12;
      sic3 /= 10;
      purchase(7,0);
    }
  });

  $("#sic4").click(function(){
    cost = sic4;
    if (meilk >= cost) {
      sic4 *= 12;
      sic4 /= 10;
      purchase(12,0);
    }
  });

  //Shop Items: Per Seconds
  $("#sis1").click(function(){
    cost = sis1;
    sis1 = Math.floor(sis1);
    if (meilk >= cost) {
      sis1 *= 12;
      sis1 /= 10;
      purchase(0,1);
    }
  });

  $("#sis2").click(function(){
    cost = sis2;
    if (meilk >= cost) {
      sis2 *= 12;
      sis2 /= 10;
      purchase(0,3);
    }
  });

  $("#sis3").click(function(){
    cost = sis3;
    if (meilk >= cost) {
      sis3 *= 12;
      sis3 /= 10;
      purchase(0,7);
    }
  });

  $("#sis4").click(function(){
    cost = sis4;
    if (meilk >= cost) {
      sis4 *= 12;
      sis4 /= 10;
      purchase(0,10);
    }
  });

  $("#sis5").click(function(){
    cost = sis5;
    if (meilk >= cost) {
      sis5 *= 12;
      sis5 /= 10;
      purchase(0,10);
    }
  });

  //le purchase stuff :I
  function purchase(mpcp, mpsp) {
    if (meilk >= cost) {
      meilk -= cost;
      meilkpclick += mpcp;
      meilkpsecond += mpsp;
      cost = 0;
      $(".meilkstats").text(`${meilk} Meilk`);
      $(".mpsstats").text(`${meilkpsecond} Meilk / Second`);
      $(".mpcstats").text(`${meilkpclick} Meilk / Click`);
      reloadShop();
    }
  }

  $("body").keydown(function(event){
    //R Keybind to reload shop
    if (event.keyCode == 82 ) {
      reloadShop();
    }

    //P Keybind to toggle caching
    if (event.keyCode == 80 ) {
      if (localStorage['cacheenabled'] == "true") {
        localStorage['cacheenabled'] = undefined;
        console.log("P Disabled");
        $(".savestatus").text("Caching: Disabled").fadeIn(0).delay(500).fadeOut(600);
        localStorage['meilkcache'] = undefined;
        localStorage['mpscache'] = undefined;
        localStorage['mpccache'] = undefined;
        let siccleaning = 1;
        while (siccleaning >= siccount) {
           eval(`localStorage['sic${siccleaning}cache'] = undefined;`);
           console.log(`Cleaning Sic Cache: ${siccleaning}`);
           siccleaning++;
        }
        let siscleaning = 1;
        while (siscleaning <= siscount) {
           eval(`localStorage['sis${siscleaning}cache'] = undefined`);
           console.log(`Cleaning Sis Cache: ${siscleaning}`);
           siscleaning++;
        }
      } else {
        console.log("PPressed");
        localStorage['cacheenabled'] = "true"
        $(".savestatus").text("Caching: Enabled").fadeIn(0).delay(500).fadeOut(600);
      }
    }
  });

  //Button Visuals
  $(".shopitem").mousedown(function(){
    $(this).css({"border-color": "#B5A61E", "background-color": "#E8DB6C"});
  });

  $("body").mouseup(function(){
    $(".shopitem").css({"border-color": "#CCBB22", "background-color": "#EEE697"});
  });

  $(".shopitem").mouseleave(function(){
    $(".shopitem").css({"border-color": "#CCBB22", "background-color": "#EEE697"});
  });
});
