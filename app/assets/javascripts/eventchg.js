async function updateHistories(logs) {
    //logs should be a type of array
    if(!Array.isArray(logs)) { throw "arg 'logs' should be an array."}
    $('.history-all').empty();
    let total = 0;
    console.log('logs: ', logs);
    const values = await logs.reverse().map( async function (elem, index) {
        let betValue;
        await window.web3.eth.getTransactionReceipt(elem.transactionHash, function(e, receit) {
            if(e){
                console.log(e);
                return ;
            }
            const decodeLogs = abiDecoder.decodeLogs(receit.logs);
            const sender = decodeLogs[0].events[1].value;
            const bet = window.web3.fromWei(decodeLogs[0].events[2].value, "ether");
            total += Number(bet.toString());
            console.log(total);
            $('.history-all').append(
                `<UL><li><div class='BS2_list1'>${elem.transactionHash}</div></li>\n` +
                `<li><div class='BS2_list2'>${sender}</div></li>\n` +
                `<li><div class='BS2_list3'>${bet} ETH</div></li>\n` +
                `</ul>`
            );
            $('.history-total-eth').html(`${total}ETH`)
        });

    });
}