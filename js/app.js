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
    var array = []; // [getHandScore(player, 1), getHandScore(player, 2)];
    var i = 1;
    
    while(i<=5){
      array.push(getHandScore(player, i));  
      i = i + 1;
    }

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
    var i = 1;
    while(i<9){
      calculatePlayerTotal(i);  
      i = i + 1;
    }
   
  }

 
});

