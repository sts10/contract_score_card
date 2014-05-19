$(document).ready(function(){
  // alert('test');

  $('input[type=text]').on("keyup", function(){
    calculateAll();
  });

  function getHandScore(player, hand){
    var id = "#player" + player + "_hand" + hand;
    var value = $(id).val();
    if(value) {
      return parseInt(value);
    }
    else {
      return 0;
    }
  }

  function makeScoreArray(player){
    var array = [getHandScore(player, 1), getHandScore(player, 2)];
    return array;
  }

  function sumArray(array){
    return array.reduce(function(pv, cv) { return pv + cv; }, 0);
  }

  function calculatePlayerTotal(player_num){
    var player_array = makeScoreArray(player_num);
    var id = "#player" + player_num + "_total";

    $(id).html(sumArray(player_array));
  }

  function calculateAll(){
    calculatePlayerTotal(1);
    calculatePlayerTotal(2);
    calculatePlayerTotal(3);
    calculatePlayerTotal(4);
    calculatePlayerTotal(5);
    calculatePlayerTotal(6);
    calculatePlayerTotal(7);
    calculatePlayerTotal(8);
  }
});

