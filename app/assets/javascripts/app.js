//path to abi
const contract_paths = [
    "/FiftyFifty.json",
];

var events, my_events, plus_minus, hall_type_index;
[events, my_events, plus_minus, hall_type_index] = [[],[], 0, 0];
//get web3 from window if exists metamask else from infura.
function getWeb3() {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    return new Promise((resolve, reject) => {
        var results;
        var web3 = window.web3;
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            web3 = new Web3(web3.currentProvider);
            results = {
                web3: web3
            };

            console.log('Injected web3 detected.');

            resolve(results)
        } else {
            web3 = new Web3();

            web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/c80185451d9f44f9848cfb331df03c35"));
            results = {
                web3: web3
            };
            resolve(results)
        }
    })
}

$(function(){
    $.ajaxSetup({ headers : {'X-CSRF-TOKEN': $( 'meta [name = "csrf-token"]').attr("content")}});
    //submit address button
    // $('#address-submit-button').click(function(e) {
    //     e.preventDefault();
    //     const address = $('#myaddress').val().trim();
    //     const currentLogs = my_events.length;
    //     my_events = [];
    //     events.forEach(function(elem, index) {
    //         window.web3.eth.getTransactionReceipt(elem.transactionHash,function (e, receit) {
    //             if (e) {
    //                 console.log(e)
    //             }
    //             const from = receit.from;
    //             if (address === from) {
    //                 const decodeLogs = abiDecoder.decodeLogs(receit.logs);
    //                 const winner = decodeLogs[0].events[0].value;
    //                 const looser = decodeLogs[0].events[1].value;
    //                 const bet = Number(decodeLogs[0].events[2].value);
    //                 const payBack = Number(decodeLogs[0].events[3].value);
    //                 if( winner === address) {
    //                     //勝ってた場合または掛けただけの時
    //                     my_events.push({ bet: bet, payback: payBack });
    //                     plus_minus += (payBack - bet);
    //                 } else if ( looser === address ) {
    //                     //負けてた場合
    //                     my_events.push({ bet: bet, payback: payBack });
    //                     plus_minus -= bet
    //                 }
    //                 if(my_events.length > currentLogs){
    //                     if(payBack > 0){
    //                         $('#my-page-logs').append('<p class="my-event-red"> Bet: ' + bet / (10 ** 18) + ' ETH' +  '  payBack: ' + payBack / (10 ** 18) + ' ETH</p>').css('color', 'red');
    //                     } else {
    //                         $('#my-page-logs').append('<p class="my-event-blue"> Bet: ' + bet / (10 ** 18) + ' ETH' +  '  payBack: ' + payBack / (10 ** 18) + ' ETH</p>').css('color', 'blue');
    //                     }
    //                 }
    //                 if(events.length === index + 1) {
    //                     if(plus_minus < 0){
    //                         $('#my-page-plus-minus p').html((plus_minus / (10 ** 18)) + " ETH").css('color', 'blue');
    //                     } else {
    //                         $('#my-page-plus-minus p').html('+' +(plus_minus / (10 ** 18)) + " ETH").css('color', 'red');
    //                     }
    //                 }
    //             }
    //         })
    //     });
    // });

    // //ranking tab button
    // $('.ranking-contents').hide();
    // $('.ranking-contents').eq(0).show();
    // $('.ranking-tab-button').eq(0).addClass('active');
    // $('.ranking-tab-button').each(function () {
    //     $(this).on('click', function () {
    //         var index = $('.ranking-tab-button').index(this);
    //         $('.ranking-tab-button').removeClass('active');
    //         $(this).addClass('active');
    //         $('.ranking-contents').hide();
    //         $('.ranking-contents').eq(index).show();
    //     })
    // });
    //
    // //play tab setting
    // $('.tab-inner-content').hide();
    // $('.tab-inner-content').eq(0).show();
    // $('.tab-button-user').eq(0).addClass('button-active');
    // //click event
    // $('.tab-button-user').each(function () {
    //     $(this).on('click', function () {
    //         var index = $('.tab-button-user').index(this);
    //         $('.tab-button-user').removeClass('button-active');
    //         $(this).addClass('button-active');
    //         $('.tab-inner-content').hide();
    //         $('.tab-inner-content').eq(index).show();
    //     })
    // });
    // //user tab setting
    // $('.tab-inner-content-play').hide();
    // $('.tab-inner-content-play').eq(0).show();
    // $('.tab-button-play').eq(0).addClass('button-active');
    // //click event
    // $('.tab-button-play').each(function () {
    //     $(this).on('click', function () {
    //         var index = $('.tab-button-play').index(this);
    //         $('.tab-button-play').removeClass('button-active');
    //         $(this).addClass('button-active');
    //         $('.tab-inner-content-play').hide();
    //         $('.tab-inner-content-play').eq(index).show();
    //     })
    // });
    // //Ranking Bet
    // $('.tab-inner-content-bet-rank').hide();
    // $('.tab-inner-content-bet-rank').eq(0).show();
    // $('.total-bet-ranking').eq(0).addClass('button-active-rank-bet');
    // $('.total-bet-ranking').each(function () {
    //     $(this).on('click', function () {
    //         var index = $('.total-bet-ranking').index(this);
    //         $('.total-bet-ranking').removeClass('button-active-rank-bet');
    //         $(this).addClass('button-active-rank-bet');
    //         $('.tab-inner-content-bet-rank').hide();
    //         $('.tab-inner-content-bet-rank').eq(index).show();
    //     })
    // });
    // //Ranking Transaction
    // $('.tab-inner-content-transaction-rank').hide();
    // $('.tab-inner-content-transaction-rank').eq(0).show();
    // $('.total-transaction-ranking').eq(0).addClass('button-active-rank-transaction');
    // $('.total-transaction-ranking').each(function () {
    //     $(this).on('click', function () {
    //         var index = $('.total-transaction-ranking').index(this);
    //         $('.total-transaction-ranking').removeClass('button-active-rank-transaction');
    //         $(this).addClass('button-active-rank-transaction');
    //         $('.tab-inner-content-transaction-rank').hide();
    //         $('.tab-inner-content-transaction-rank').eq(index).show();
    //     })
    // });
    //
    // //Ranking Balances
    // $('.tab-inner-content-balance-rank').hide();
    // $('.tab-inner-content-balance-rank').eq(0).show();
    // $('.total-balance-ranking').eq(0).addClass('button-active-rank-transaction');
    // $('.total-balance-ranking').each(function () {
    //     $(this).on('click', function () {
    //         var index = $('.total-balance-ranking').index(this);
    //         $('.total-balance-ranking').removeClass('button-active-rank-transaction');
    //         $(this).addClass('button-active-rank-transaction');
    //         $('.tab-inner-content-balance-rank').hide();
    //         $('.tab-inner-content-balance-rank').eq(index).show();
    //     })
    // });


    //qr code 最初の表示
//abi-decoderへのabiセット。最初
    $.getJSON("/FiftyFifty.json", function(data){
        getWeb3().then(function(result){
            window.web3 = result.web3;
            const contract = window.web3.eth.contract(data.abi);
            abiDecoder.addABI(data.abi);
            window.contract_instance = contract.at(contract_addresses[getHallType()]);
            console.log(window.web3.sha3("Bet(address,address,uint256,uint256,uint256)", { encoding: 'hex' }));
            $.ajax({
                url: "https://rinkeby.infura.io/v3/2f42131ae42e463c8c475d1090903783",
                type: "POST",
                data: JSON.stringify({"jsonrpc": "2.0", "method": "eth_getLogs", "params": [{"fromBlock":"0x0", "toBlock": "latest",address: contract_addresses[0] }], "id": 1}),
                dataType: "json",
                success: (data) => {
                    updateHistories(data.result)
                },
                error: (err) => {
                    console.log(err)
                }
            })
        });
    });


    // $.ajax({
    //     url: "/ethereum/ranking/send",
    //     type: "POST"
    // });
    setInterval(function () {
        $.ajax({
            url: "/ethereum/jp",
            type: "POST",
            data: { contract_address: contract_addresses[0] }
        }).done(function(data){
            $('.eth').html(data.jp)
        })
    }, 2500);
    // setInterval(function () {
    //     $.ajax({
    //         url: "/ethereum/event",
    //         type: "POST"
    //     }).done(function(data){
    //         if(events.length !== data.logs.length) {
    //
    //             events = data.logs.reverse();
    //             //current number of logs
    //             const currentLogLength = $('.event-log-element').length;
    //             $.each(events, function (index, elem) {
    //                 window.web3.eth.getTransactionReceipt(elem.transactionHash, function(e, receit) {
    //                     if(e){
    //                         console.log(e);
    //                         return ;
    //                     }
    //                     if(index + 1 > currentLogLength) {
    //                         const decodeLogs = abiDecoder.decodeLogs(receit.logs);
    //                         const winner = decodeLogs[0].events[0].value;
    //                         const bet = decodeLogs[0].events[2].value;
    //                         $('#event-logs').append('<p class="event-log-element">' + winner + ' ' + bet / (10 ** 18) + ' ETH' + '</p>')
    //                     }
    //                 })
    //             });
    //         }
    //     })
    // }, 2500);




    // タブ関連
    $('.scroll-pane').jScrollPane({showArrows: true});

    //左
    $(".tabBody-1:not('.active-1 + .tabBody-1')").fadeOut();
    $(".tab-head-1").click(function(){
        $(".tab-head-1").removeClass("active-1");
        $ (this).addClass("active-1");
        $(".tabBody-1:not('.active-1 + .tabBody-1')").fadeOut();
        $ (".active-1 + .tabBody-1").fadeIn();
    });


    // 右
    $(".tabBody-2:not('.active-2 + .tabBody-2')").fadeOut();
    $(".tab-head-2").click(function(){
        $(".tab-head-2").removeClass("active-2");
        $ (this).addClass("active-2");
        $(".tabBody-2:not('.active-2 + .tabBody-2')").fadeOut();
        $ (".active-2 + .tabBody-2").fadeIn();
    });

    // 中 mypage
    $(".tabBody-3:not('.active-3 + .tabBody-3')").fadeOut();
    $(".tab-head-3").click(function(){
        $(".tab-head-3").removeClass("active-3");
        $ (this).addClass("active-3");
        $(".tabBody-3:not('.active-3 + .tabBody-3')").fadeOut();
        $ (".active-3 + .tabBody-3").fadeIn();
    });

    // 中 ranking
    $(".tabBody-4:not('.active-4 + .tabBody-4')").fadeOut();
    $(".tab-head-4").click(function(){
        $(".tab-head-4").removeClass("active-4");
        $ (this).addClass("active-4");
        $(".tabBody-4:not('.active-4 + .tabBody-4')").fadeOut();
        $ (".active-4 + .tabBody-4").fadeIn();
    });
    // 中 ranking　の中
    $(".tabBody-5:not('.active-5 + .tabBody-5')").fadeOut();
    $(".tab-head-5").click(function(){
        $(".tab-head-5").removeClass("active-5");
        $ (this).addClass("active-5");
        $(".tabBody-5:not('.active-5 + .tabBody-5')").fadeOut();
        $ (".active-5 + .tabBody-5").fadeIn();
    });

    var nice = $("html").niceScroll();  // The document page (body)
    $("#div1").html($("#div1").html()+' '+nice.version);
    $(".BS_list1 , .BS_list2 ,.BS_list3 ").niceScroll({cursorborder:"",cursorcolor:"#d4a94e",cursorwidth:"3px",autohidemode: false});
    $(".BS2_list1 , .BS2_list2 ,.BS2_list3 ").niceScroll({cursorborder:"",cursorcolor:"#d4a94e",cursorwidth:"3px",autohidemode: false});
    $(".BS3-1_list1 , .BS3-1_list2").niceScroll({cursorborder:"",cursorcolor:"#fac347",cursorwidth:"3px",autohidemode: false});
    $(".BS3-2_list1 , .BS3-2_list2").niceScroll({cursorborder:"",cursorcolor:"#bfbfbf",cursorwidth:"3px",autohidemode: false});
    $(".BS3-3_list1 , .BS3-3_list2").niceScroll({cursorborder:"",cursorcolor:"#de9a56",cursorwidth:"3px",autohidemode: false});
    $(".BS3-4_list1 , .BS3-4_list2").niceScroll({cursorborder:"",cursorcolor:"#d4a94e",cursorwidth:"3px",autohidemode: false});


    // insertQrCode
    insertQrCode(0)
});
