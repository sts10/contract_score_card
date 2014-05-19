$(document).ready(function(){
  // alert('test');

  var low_score = 10000;
  var leader = 0;


  $('input[type=text]').on("keyup", function(){
    var player_number = ($(this).attr('id')).charAt(6);
    low_score = 10000;
    
    if (playerHasName(player_number)) {
      calculatePlayerTotal(player_number); 
      postPlayerTotal(player_number);
    }

    findCurrentLeader();
    highlightHighScore();
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
    var player_total = sumArray(player_array);
    return player_total;
  }

  function postPlayerTotal(player_num){
    var player_total = calculatePlayerTotal(player_num);
    var id = "#player" + player_num + "_total";

    $(id).html(player_total);
  }


  function findCurrentLeader(){
    var i = 1;

    while(i<9){
      if (playerHasName(i)) {
        var this_player_score = calculatePlayerTotal(i);
        console.log("I'm going through the loop and this player's score is " + this_player_score);
        if (this_player_score < low_score){  
          low_score = this_player_score;
          leader = i;
        }
      }
      i = i + 1;
    }
    console.log('I found the leader and it is player '+ leader + ' with score of ' + low_score);
    // return [leader, high_ score];
  }

  function highlightHighScore(){

    // remove background color from old leader
    
    $('.name').css("background-color", "transparent");
    $('.name').parent().css("background-color", "transparent");
    $('.total').css("background-color", "transparent");
    
    var name_id = "#player" + leader+"_name";
    var total_id = "#player" + leader+"_total";

    $(name_id).css("background-color", "#FFFF99");
    $(name_id).parent().css("background-color", "#FFFF99");
    $(total_id).css("background-color", "#FFFF99");
  }

  function playerHasName(player_number){
    var id = "#player" + player_number + "_name";
    if ($(id).val().trim().length >= 1) {
      return true;
    } else {
      return false;
    }

  }

 
});

