$(document).ready(function(){

  var number_of_players = 8;
  var number_of_hands = 5;

  var low_score = 10000;
  var leader = 0;


  $('input[type=text]').on("keyup", function(){
    var player_number = ($(this).attr('id')).charAt(6);
    low_score = 10000;

    if ($(this).val().indexOf("*") > -1) {
      var hand_number = ($(this).attr('id')).charAt(12);
      $(this).val(getPenaltyScoreForPlayer(player_number, hand_number));
    }

    if (playerHasName(player_number)) { 
      calculateAndPostPlayerTotal(player_number);
    }

    updateCurrentLeader();
    highlightLeader();
  });

  function getHandScore(player, hand){
    var value = $("#player" + player + "_hand" + hand).val();
    return value ? parseInt(value) : 0;
  }

  function getPenaltyScoreForPlayer(penalized_player, hand){
    var i = 1;
    var highest_score_of_hand = 0;

    while (i <= number_of_players){
      if (playerHasName(i) && i !== penalized_player) {
        var this_player_score = getHandScore(i, hand);
        if (this_player_score > highest_score_of_hand){  
          highest_score_of_hand = this_player_score;
        }
      }
      i = i + 1;
    }
    return parseInt(highest_score_of_hand);
  }


  function makeScoreArray(player){
    var array = [];
    var i = 1;
    
    while (i <= number_of_hands){
      array.push(getHandScore(player, i));  
      i = i + 1;
    }

    return array;
  }

  function sumArray(array){
    return array.reduce(function(pv, cv) { return pv + cv; }, 0);
  }

  function calculatePlayerTotal(player_num){
    return sumArray(makeScoreArray(player_num));
  }

  function calculateAndPostPlayerTotal(player_num){
    $("#player" + player_num + "_total").html(calculatePlayerTotal(player_num));
  }


  function updateCurrentLeader(){
    var i = 1;

    while (i <= number_of_players){
      if (playerHasName(i)) {
        var this_player_score = calculatePlayerTotal(i);
        if (this_player_score < low_score){  
          low_score = this_player_score;
          leader = i;
        }
      }
      i = i + 1;
    }
    
  }

  function highlightLeader(){

    // remove background color from old leader
    $('.name').css("background-color", "transparent");
    $('.name').parent().css("background-color", "transparent");
    $('.total').css("background-color", "transparent");
    
    // set local variables to the css ids of the new leader
    var name_id = "#player" + leader+"_name";
    var total_id = "#player" + leader+"_total";

    $(name_id).css("background-color", "#FFFF99");
    $(name_id).parent().css("background-color", "#FFFF99");
    $(total_id).css("background-color", "#FFFF99");
  }

  function playerHasName(player_number){
    return ($("#player" + player_number + "_name").val().trim().length >= 1)
  }

 
});

