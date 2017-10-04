/**
Meilk Clicker 0.3-X Mod
**/
siccount += 1;
createSi("c5", 1000, "Lunar Meilk", 1);
var ownmeilkrocket = 0;
if (ownmeilkrocket == 1) {
  siCheck("c5", 25, 0)
}
$("#sic4").click(function(){
  cost = sic4;
  if (meilk >= cost) {
    ownmeilkrocket = 1;
    reloadShop();
  }
});
modLoaded();
