function playBTN1_1(){
    document.getElementById("pbtn1").innerText = "Hall type: x2";
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#current-hall-address").html(contract_addresses[0] + '?amount=' + value);
    insertQrCode(0);
}

function playBTN1_2(){
    document.getElementById("pbtn1").innerText = "Hall type: x3";
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#current-hall-address").html(contract_addresses[1] + '?amount=' + value);
    playBTN2_4();
    insertQrCode(1)
}

function playBTN1_3(){
    document.getElementById("pbtn1").innerText = "Hall type: x6";
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#current-hall-address").html(contract_addresses[2] + '?amount=' + value);
    playBTN2_4();
    insertQrCode(2);
}

function playBTN1_4(){
    document.getElementById("pbtn1").innerText = "Hall type: x10";
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#current-hall-address").html(contract_addresses[3] + '?amount=' + value);
    playBTN2_4();
    insertQrCode(3);
}

function playBTN2_1(){
    checkHallTypeIsX2(0);
    document.getElementById("pbtn2").innerText = "Bet Value: 0.125";
    insertQrCode(0);
}

function playBTN2_2(){
    checkHallTypeIsX2(1);
    document.getElementById("pbtn2").innerText = "Bet Value: 0.25";
    insertQrCode(1);
}

function playBTN2_3(){
  checkHallTypeIsX2(2);
  document.getElementById("pbtn2").innerText = "Bet Value: 0.50";
  insertQrCode(2);
}

function playBTN2_4(){
  checkHallTypeIsX2(3);
  document.getElementById("pbtn2").innerText = "Bet Value: 1";
    insertQrCode(3);
}

function playBTN2_5(){
  checkHallTypeIsX2(4);
  document.getElementById("pbtn2").innerText = "Bet Value: 2";
    insertQrCode(4);
}

function playBTN2_6(){
  checkHallTypeIsX2(5);
  document.getElementById("pbtn2").innerText = "Bet Value: 4";
  insertQrCode(5);
}

function playBTN2_7(){
  checkHallTypeIsX2(6);
  document.getElementById("pbtn2").innerText = "Bet Value: 8";
  insertQrCode(6);
}

function playBTN2_8(){
  checkHallTypeIsX2(7);
  document.getElementById("pbtn2").innerText = "Bet Value: 16";
  insertQrCode(7);
}

function playBTN2_9(){
  checkHallTypeIsX2(8);
  document.getElementById("pbtn2").innerText = "Bet Value: 32";
  insertQrCode(8);
}

function playBTN2_10(){
  checkHallTypeIsX2(9);
  document.getElementById("pbtn2").innerText = "Bet Value: 64";
  insertQrCode(9)
}

// validate hall type
function  checkHallTypeIsX2(inputIndex){
  if (inputIndex !== 3) {
      const hallType = $("#pbtn1").text().trim();
      if (hallType !== "Hall type: x2") {
          throw "Hall type should be X2"
      }
  }
  $(`input[name=btn2]:eq(${inputIndex})`).prop('checked', true);
}

// insert qr code
function insertQrCode(index) {
    const value = $("#pbtn2").text().split(":")[1].trim();
    $("#qr-code").empty();
    $("#qr-code").qrcode({ width: 130, height: 130, text: `ethereum:${contract_addresses[index]}?amount=${value}`})
}

function getHallType () {
    const hallType = $('#pbtn1').text().trim();
    switch (hallType) {
        case "Hall type: x2":
            return 0;
        case "Hall type: x3":
            return 1;
        case "Hall type: x6":
            return 2;
        case "Hall type: x10":
            return 3;
        default:
            return 0;
    }
}

// change user address button state
function changeBtnState() {
    addressIsEdit = !addressIsEdit;
}