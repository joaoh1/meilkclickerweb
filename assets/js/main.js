$(document).ready(function(){
  //Basic Variables
  var meilk = 0;
  var meilkpclick = 1;
  var meilkpsecond = 0;
  var cost = 0;
  //Shop Upgrades for Items
  var sic1 = 30;
  var sic2 = 70;
  var sic3 = 200;
  var sic4 = 500;
  //Shop Upgrades for Seconds
  var sis1 = 20;
  var sis2 = 100;
  var sis3 = 250;
  var sis4 = 475;
  var sis5 = 750;


  //Stuff to reload shop :I
  function reloadShop() {
    var sicloading = 1;
    var sisloading = 1;
    var sicloading2 = 1;
    var sisloading2 = 1;
    while (sicloading < 5) {
       eval(`sic${sicloading} = Math.floor(sic${sicloading});`);
       sicloading2 = eval(`sic${sicloading}`);
       $(`#sicl${sicloading}`).text(`${sicloading2} Meilk`);
       sicloading++;
       console.log(`Sic Loading ${sicloading};${sicloading2};`);
    }
    while (sisloading < 6) {
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
    meilk += meilkpclick
    console.log(`Meilk: ${meilk}; MPC: ${meilkpclick};`);
    $(".meilkstats").text(`${meilk} Meilk`);
  });


  //Loop
  setInterval(function () {
    meilk += meilkpsecond;
    $(".meilkstats").text(`${meilk} Meilk`);
    meilk = Math.floor(meilk);
    meilkpsecond = Math.floor(meilkpsecond);
    meilkpclick = Math.floor(meilkpclick);
  }, 1000);


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

  //R Keybind to reload shop
  $("body").keydown(function(event){
    if (event.keyCode == 82 ) {
      reloadShop();
    }
  });
});
