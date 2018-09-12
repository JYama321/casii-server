
//smart contract addresses
const contract_addresses = [
    "0x5ebe9c8e69144a5822f88ea1437f14bb85f53e6f",
    "0x869e72ccfd2e6d71b41f2ac6bb480b6d1594bec2",
    "0x9caf07c20ce793cc8c859cb7f48d66b21c8eec6f",
    "0xee1efbd636991e262f2f3fb428a6d71aaf451c54"
];
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
    //submit address button
    $('#address-submit-button').click(function(e) {
        e.preventDefault();
        const address = $('#myaddress').val().trim();
        const currentLogs = my_events.length;
        my_events = [];
        events.forEach(function(elem, index) {
            window.web3.eth.getTransactionReceipt(elem.transactionHash,function (e, receit) {
                if (e) {
                    console.log(e)
                }
                const from = receit.from;
                if (address === from) {
                    const decodeLogs = abiDecoder.decodeLogs(receit.logs);
                    const winner = decodeLogs[0].events[0].value;
                    const looser = decodeLogs[0].events[1].value;
                    const bet = Number(decodeLogs[0].events[2].value);
                    const payBack = Number(decodeLogs[0].events[3].value);
                    if( winner === address) {
                        //勝ってた場合または掛けただけの時
                        my_events.push({ bet: bet, payback: payBack });
                        plus_minus += (payBack - bet);
                    } else if ( looser === address ) {
                        //負けてた場合
                        my_events.push({ bet: bet, payback: payBack });
                        plus_minus -= bet
                    }
                    if(my_events.length > currentLogs){
                        if(payBack > 0){
                            $('#my-page-logs').append('<p class="my-event-red"> Bet: ' + bet / (10 ** 18) + ' ETH' +  '  payBack: ' + payBack / (10 ** 18) + ' ETH</p>').css('color', 'red');
                        } else {
                            $('#my-page-logs').append('<p class="my-event-blue"> Bet: ' + bet / (10 ** 18) + ' ETH' +  '  payBack: ' + payBack / (10 ** 18) + ' ETH</p>').css('color', 'blue');
                        }
                    }
                    if(events.length === index + 1) {
                        if(plus_minus < 0){
                            $('#my-page-plus-minus p').html((plus_minus / (10 ** 18)) + " ETH").css('color', 'blue');
                        } else {
                            $('#my-page-plus-minus p').html('+' +(plus_minus / (10 ** 18)) + " ETH").css('color', 'red');
                        }
                    }
                }
            })
        });
    });

    //ranking tab button
    $('.ranking-contents').hide();
    $('.ranking-contents').eq(0).show();
    $('.ranking-tab-button').eq(0).addClass('active');
    $('.ranking-tab-button').each(function () {
        $(this).on('click', function () {
            var index = $('.ranking-tab-button').index(this);
            $('.ranking-tab-button').removeClass('active');
            $(this).addClass('active');
            $('.ranking-contents').hide();
            $('.ranking-contents').eq(index).show();
        })
    });

    //play tab setting
    $('.tab-inner-content').hide();
    $('.tab-inner-content').eq(0).show();
    $('.tab-button-user').eq(0).addClass('button-active');
    //click event
    $('.tab-button-user').each(function () {
        $(this).on('click', function () {
            var index = $('.tab-button-user').index(this);
            $('.tab-button-user').removeClass('button-active');
            $(this).addClass('button-active');
            $('.tab-inner-content').hide();
            $('.tab-inner-content').eq(index).show();
        })
    });
    //user tab setting
    $('.tab-inner-content-play').hide();
    $('.tab-inner-content-play').eq(0).show();
    $('.tab-button-play').eq(0).addClass('button-active');
    //click event
    $('.tab-button-play').each(function () {
        $(this).on('click', function () {
            var index = $('.tab-button-play').index(this);
            $('.tab-button-play').removeClass('button-active');
            $(this).addClass('button-active');
            $('.tab-inner-content-play').hide();
            $('.tab-inner-content-play').eq(index).show();
        })
    });
    //Ranking Bet
    $('.tab-inner-content-bet-rank').hide();
    $('.tab-inner-content-bet-rank').eq(0).show();
    $('.total-bet-ranking').eq(0).addClass('button-active-rank-bet');
    $('.total-bet-ranking').each(function () {
        $(this).on('click', function () {
            var index = $('.total-bet-ranking').index(this);
            $('.total-bet-ranking').removeClass('button-active-rank-bet');
            $(this).addClass('button-active-rank-bet');
            $('.tab-inner-content-bet-rank').hide();
            $('.tab-inner-content-bet-rank').eq(index).show();
        })
    });
    //Ranking Transaction
    $('.tab-inner-content-transaction-rank').hide();
    $('.tab-inner-content-transaction-rank').eq(0).show();
    $('.total-transaction-ranking').eq(0).addClass('button-active-rank-transaction');
    $('.total-transaction-ranking').each(function () {
        $(this).on('click', function () {
            var index = $('.total-transaction-ranking').index(this);
            $('.total-transaction-ranking').removeClass('button-active-rank-transaction');
            $(this).addClass('button-active-rank-transaction');
            $('.tab-inner-content-transaction-rank').hide();
            $('.tab-inner-content-transaction-rank').eq(index).show();
        })
    });

    //Ranking Balances
    $('.tab-inner-content-balance-rank').hide();
    $('.tab-inner-content-balance-rank').eq(0).show();
    $('.total-balance-ranking').eq(0).addClass('button-active-rank-transaction');
    $('.total-balance-ranking').each(function () {
        $(this).on('click', function () {
            var index = $('.total-balance-ranking').index(this);
            $('.total-balance-ranking').removeClass('button-active-rank-transaction');
            $(this).addClass('button-active-rank-transaction');
            $('.tab-inner-content-balance-rank').hide();
            $('.tab-inner-content-balance-rank').eq(index).show();
        })
    });

    //login成功、失敗時のメッセージ
    $('#flash-message').fadeOut(3000);
    $('#bet-value').html('0.125');
    $('#hall-type').html($('.hall-type-tab-button').eq(0).text().trim());
    $('.hall-type-tab-button').eq(0).addClass('hall-tab-button-active');
    //何人用のhallかを選択
    $('.hall-type-tab-button').each(function () {
        $(this).on('click', function () {
            $('.hall-tab-value-button').removeClass('hall-tab-button-inactive');
            $('.hall-type-tab-button').removeClass('hall-tab-button-active');
            var index = $('.hall-type-tab-button').index(this);
            hall_type_index = index
            var text = $(this).text().trim();
            $(this).addClass('hall-tab-button-active');
            const c_address = contract_addresses[index];
            //x2以外を選んだ時はbet valueをeq(3)に制限する
            if(index !== 0){
                $('.hall-tab-value-button').removeClass('hall-tab-button-active');
                $('.hall-tab-value-button').addClass('hall-tab-button-inactive');
                $('.hall-tab-value-button').eq(3).removeClass('hall-tab-button-inactive');
                $('.hall-tab-value-button').eq(3).addClass('hall-tab-button-active');
                $('#bet-value').html('1')
            }
            $('#hall-type').html(text);
            $('#hall-qr').empty();
            $('#hall-qr').qrcode({render: 'div', text: `ethereum:${c_address}?amount=${$('#bet-value').text().trim()}&gas=1000000`});
            $('#contract-address-shown').html(c_address)
        })
    });
    $('.hall-tab-value-button').eq(0).addClass('hall-tab-button-active');
    $('.hall-tab-value-button').each(function () {
        $(this).on('click', function () {
            //x2以外が選択されている時は何もしない
            var text = $(this).text().trim();
            if($('.hall-tab-button-active').eq(0).text().trim() === 'x2'){
                $('.hall-tab-value-button').removeClass('hall-tab-button-active');
                $(this).addClass('hall-tab-button-active');
                //x2の時だけbet valueは変更される
                $('#bet-value').html(text);
                //qr コードのamountも変更
                $('#hall-qr').empty();
                $('#hall-qr').qrcode({render: 'div', text: `ethereum:${contract_addresses[0]}?amount=${text.trim()}&gas=1000000`});
            }
        })
    });
    //qr code 最初の表示
    $('#hall-qr').qrcode({render: 'div', text: `ethereum:${contract_addresses[0]}?amount=${$('#bet-value').text().trim()}&gas=1000000`});
    $('#contract-address-shown').html(contract_addresses[0]);
    //abi-decoderへのabiセット。最初
    $.getJSON("/FiftyFifty.json", function(data){
        getWeb3().then(function(result){
            window.web3 = result.web3;
            const contract = window.web3.eth.contract(data.abi);
            abiDecoder.addABI(data.abi);
            window.contract_instance = contract.at(contract_addresses[0]);
        });
    });
    $.ajax({
        url: "/ethereum/ranking/send",
        type: "POST"
    });
    setInterval(function () {
        $.ajax({
            url: "/ethereum/jp",
            type: "POST",
            data: { contract_address: contract_addresses[hall_type_index] }
        }).done(function(data){
            $('span#jp').html(data.jp)
        })
    }, 2500);
    setInterval(function () {
        $.ajax({
            url: "/ethereum/event",
            type: "POST"
        }).done(function(data){
            if(events.length !== data.logs.length) {

                events = data.logs.reverse();
                //current number of logs
                const currentLogLength = $('.event-log-element').length;
                $.each(events, function (index, elem) {
                    window.web3.eth.getTransactionReceipt(elem.transactionHash, function(e, receit) {
                        if(e){
                            console.log(e);
                            return ;
                        }
                        if(index + 1 > currentLogLength) {
                            const decodeLogs = abiDecoder.decodeLogs(receit.logs);
                            const winner = decodeLogs[0].events[0].value;
                            const bet = decodeLogs[0].events[2].value;
                            $('#event-logs').append('<p class="event-log-element">' + winner + ' ' + bet / (10 ** 18) + ' ETH' + '</p>')
                        }
                    })
                });
            }
        })
    }, 2500);
})