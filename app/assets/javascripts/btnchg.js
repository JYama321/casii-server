function playBTN1_1(){
    document.getElementById("pbtn1").innerText = "Hall type: x2";
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#current-hall-address").html(contract_addresses[0] + '?amount=' + value);
}

function playBTN1_2(){
    document.getElementById("pbtn1").innerText = "Hall type: x3";
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#current-hall-address").html(contract_addresses[1] + '?amount=' + value);
    playBTN2_4();
}

function playBTN1_3(){
    document.getElementById("pbtn1").innerText = "Hall type: x6";
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#current-hall-address").html(contract_addresses[2] + '?amount=' + value);
    playBTN2_4();
}

function playBTN1_4(){
    document.getElementById("pbtn1").innerText = "Hall type: x10";
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#current-hall-address").html(contract_addresses[3] + '?amount=' + value);
    playBTN2_4();
}

function playBTN2_1(){
    checkHallTypeIsX2(0);
    document.getElementById("pbtn2").innerText = "Bet Value: 0.125";
}

function playBTN2_2(){
    checkHallTypeIsX2(1);
    document.getElementById("pbtn2").innerText = "Bet Value: 0.25";

}

function playBTN2_3(){
  checkHallTypeIsX2(2);
  document.getElementById("pbtn2").innerText = "Bet Value: 0.50";
}

function playBTN2_4(){
  checkHallTypeIsX2(3);
  document.getElementById("pbtn2").innerText = "Bet Value: 1";
}

function playBTN2_5(){
  checkHallTypeIsX2(4);
  document.getElementById("pbtn2").innerText = "Bet Value: 2";
}

function playBTN2_6(){
  checkHallTypeIsX2(5);
  document.getElementById("pbtn2").innerText = "Bet Value: 4";
}

function playBTN2_7(){
  checkHallTypeIsX2(6);
  document.getElementById("pbtn2").innerText = "Bet Value: 8";
}

function playBTN2_8(){
  checkHallTypeIsX2(7);
  document.getElementById("pbtn2").innerText = "Bet Value: 16";
}

function playBTN2_9(){
  checkHallTypeIsX2(8);
  document.getElementById("pbtn2").innerText = "Bet Value: 32";
}

function playBTN2_10(){
  checkHallTypeIsX2(9);
  document.getElementById("pbtn2").innerText = "Bet Value: 64";
}

function  checkHallTypeIsX2(inputIndex){
  console.log("checkHallTypeIsX2()")
  if (inputIndex !== 3) {
      const hallType = $("#pbtn1").text().trim();
      if (hallType !== "Hall type: x2") {
          throw "Hall type should be X2"
      }
  }
  console.log($(`input[name=btn2]:eq(${inputIndex})`));
  $(`input[name=btn2]:eq(${inputIndex})`).prop('checked', true);
}