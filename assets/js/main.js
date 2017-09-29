$(document).ready(function(){
  //Basic Variables
  var meilk = parseInt(localStorage['meilkcache']) || 0;
  var meilkpclick = parseInt(localStorage['mpccache']) || 1;
  var meilkpsecond = parseInt(localStorage['mpscache']) || 0;
  var cost = 0;
  var siccount = 4;
  var siscount = 5;
  var antimacro = 0;
  var version = "0.2";
  var buildnumber = "35";
  //To make Shop Stuff easier!
  function createSi(si, sicost, sin, cuid) {
    eval(`${'si' + si} = parseInt(localStorage['si${si}cache']) || ${sicost};`);
    sihtml = `<li class="shopitem" id="si${si}"><p class="shopitem1">${sin}</p><p id="lsi${si}" class="shopitem2"> </p></li>`;
    $(`#cu${cuid}`).append(sihtml);
    console.log(`Created Si! ${si} ${sicost} ${'si' + si} ${cuid} ${sihtml}`);
  }
  //Shop Upgrades for Items
  createSi("c1", 30, "Better Meilk", 1);
  createSi("c2", 70, "Moo Meilk", 1);
  createSi("c3", 200, "Super Meilk", 1);
  createSi("c4", 500, "Crazy Meilk", 1);
  //Shop Upgrades for Seconds
  createSi("s1", 20, "Auto Meilker", 2);
  createSi("s2", 100, "Meilk Farm", 2);
  createSi("s3", 250, "Meilk Mine", 2);
  createSi("s4", 475, "Meilk Drill", 2);
  createSi("s5", 750, "Meilk Rocket", 2);

  //Stuff to reload shop :I
  function reloadShop() {
    let siloading = 1;
    let siloading2 = 1;
    let siloading3 = 0;
    while (siloading <= siccount && siloading3 == 0 ) {
       eval(`sic${siloading} = Math.floor(sic${siloading});`);
       siloading2 = eval(`sic${siloading}`);
       $(`#lsic${siloading}`).text(`${siloading2} Meilk`);
       siloading++;
       console.log(`Sic Loading ${siloading};${siloading2};${siloading3};`);
    }
    siloading = 1;
    siloading2 = 1;
    siloading3 = 1;
    while (siloading <= siscount && siloading3 == 1) {
       eval(`sis${siloading} = Math.floor(sis${siloading});`);
       siloading2 = eval(`sis${siloading}`);
       $(`#lsis${siloading}`).text(`${siloading2} Meilk`);
       siloading++;
       console.log(`Sis Loading ${siloading};${siloading2};${siloading3};`);
    }
  }

  //Set the meilk count
  $("#version").text(`v${version}-${buildnumber}`)
  $(".meilkstats").text(`${meilk} Meilk`);
  $(".mpsstats").text(`${meilkpsecond} Meilk / Second`);
  $(".mpcstats").text(`${meilkpclick} Meilk / Click`);
  reloadShop();

  //Meilk Clicker!
  $(".meilk").click(function(){
    if (antimacro <= 20) {
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
       let sicaching = 1;
       let sicaching2 = 0;
       while (sicaching <= siccount && sicaching2 == 0) {
          eval(`localStorage['sic${sicaching}cache'] = sic${sicaching};`);
          console.log(`Caching Sic: ${sicaching}`);
          sicaching++;
       }
       sicaching = 1;
       sicaching2 = 1;
       while (sicaching <= siscount && sicaching2 == 1) {
          eval(`localStorage['sis${sicaching}cache'] = sis${sicaching};`);
          console.log(`Caching Sis: ${sicaching}`);
          sicaching++;
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

  //Prepare the loading!
  function prepareLoad() {
    var codetoload = document.getElementById('loadinput2').value
    console.log(codetoload);
    loadGame(codetoload);
  }

  //Keybinds!
  $("body").keydown(function(event){
    //R Keybind to reload shop
    if (event.keyCode == 82 ) {
      reloadShop();
    }

    //Save dah game
    if (event.keyCode == 83 ) {
      saveGame();
    }

    //Show options to load
    if (event.keyCode == 76 ) {
      $(".meilkoptions").show();
      $("#menucontent").html(`
        <p>Paste your Save Code!</p>
        <input id="loadinput2" type="text" name="Load Input" value="">
        <p></p>
        <button class="loadbutton">Load</p>`);
    }

    //Hide the options
    if (event.keyCode == 27 ) {
      $(".meilkoptions").hide();
    }

    //"Load" button
    $(".loadbutton").click(function(){
      prepareLoad();
    });

    //P Keybind to toggle caching
    if (event.keyCode == 80 ) {
      if (localStorage['cacheenabled'] == "true") {
        localStorage['cacheenabled'] = undefined;
        console.log("P Disabled");
        $(".savestatus").text("Caching: Disabled").fadeIn(0).delay(500).fadeOut(600);
        localStorage['meilkcache'] = undefined;
        localStorage['mpscache'] = undefined;
        localStorage['mpccache'] = undefined;
        let sicleaning = 1;
        let sicleaning2 = 0;
        while (sicleaning <= siccount && sicleaning2 == 0) {
           eval(`localStorage['sic${sicleaning}cache'] = undefined;`);
           console.log(`Cleaning Sic Cache: ${sicleaning}`);
           sicleaning++;
        }
        sicleaning = 1;
        sicleaning2 = 1;
        while (sicleaning <= siscount && sicleaning2 == 1) {
           eval(`localStorage['sis${sicleaning}cache'] = undefined`);
           console.log(`Cleaning Sis Cache: ${sicleaning}`);
           sicleaning++;
        }
      } else {
        console.log("PPressed");
        localStorage['cacheenabled'] = "true"
        $(".savestatus").text("Caching: Enabled").fadeIn(0).delay(500).fadeOut(600);
      }
    }
  });

  //Saving
  function saveGame() {
    let savecode = `Meilk Clicker;${version};${buildnumber};${meilk};${meilkpclick};${meilkpsecond};`
    let saveshop1 = 1;
    let saveshop2 = 1;
    let saveshop3 = 0;
    console.log(savecode);
    while (saveshop1 <= siccount && saveshop3 == 0) {
      eval(`saveshop2 = sic${saveshop1}`);
      savecode += saveshop2;
      savecode += ";";
      saveshop1++;
      console.log(savecode);
    }
    saveshop1 = 1;
    saveshop2 = 1;
    saveshop3 = 1;
    while (saveshop1 <= siscount && saveshop3 == 1) {
      eval(`saveshop2 = sis${saveshop1}`);
      savecode += saveshop2;
      savecode += ";";
      saveshop1++
      console.log(savecode);
    }
    savecode = window.btoa(savecode);
    console.log(savecode);
    $(".meilkoptions").show();
    $("#menucontent").html(`
      <p>Copy your Save Code!</p>
      <input type="text" name="Save Input" value="${savecode}">`);
    console.log("Save Done");
  }

  //Loading
  function loadGame(loadcode) {
    loadcode = atob(loadcode);
    loadcode = loadcode.split(";");
    console.log(loadcode);
    if (version != loadcode[1] || loadcode[0] != "Meilk Clicker") {
      loadcode = "Meilk Clicker;0.2;29;0;1;0;30;70;200;500;20;100;250;475;750;"
      loadcode = loadcode.split(";");
      console.error("Error!");
      console.error("Possibility 1: This isn't a Meilk Clicker code");
      console.error("Possibility 2: The version isn't the same as the current one!");
    }
    meilk = parseInt(loadcode[3]);
    meilkpclick = parseInt(loadcode[4]);
    meilkpsecond = parseInt(loadcode[5]);
    let sisaveload = 1;
    let sisaveload2 = 1;
    let sisaveload3 = 0;
    while (sisaveload <= siccount && sisaveload3 == 0) {
      eval(`sisaveload2 = ${sisaveload} + 5;`);
      eval(`sic${sisaveload} = parseInt(loadcode[${sisaveload2}]);`);
      sisaveload++
    }
    sisaveload = 1;
    sisaveload2 = 1;
    sisaveload3 = 1;
    while (sisaveload <= siscount && sisaveload3 == 1) {
      eval(`sisaveload2 = ${sisaveload} + 5 + ${siccount};`);
      eval(`sis${sisaveload} = parseInt(loadcode[${sisaveload2}]);`);
      sisaveload++
    }
    $(".meilkstats").text(`${meilk} Meilk`);
    $(".mpsstats").text(`${meilkpsecond} Meilk / Second`);
    $(".mpcstats").text(`${meilkpclick} Meilk / Click`);
    reloadShop();
    $(".meilkoptions").hide();
  }

  //Button Visuals
  $(".shopitem").mousedown(function(){
    $(this).css({"border-color": "#B5A61E", "background-color": "#E8DB6C"});
  });

  $(".closemenu").click(function(){
    $(".meilkoptions").css({"display": "none"});
  });

  $("body").mouseup(function(){
    $(".shopitem").css({"border-color": "#CCBB22", "background-color": "#EEE697"});
  });

  $(".shopitem").mouseleave(function(){
    $(".shopitem").css({"border-color": "#CCBB22", "background-color": "#EEE697"});
  });
});
