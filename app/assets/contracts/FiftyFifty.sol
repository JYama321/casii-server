pragma solidity ^0.4.23;
import "./safeMath.sol";

contract FiftyFifty{
    using SafeMath for uint;
    uint[11] betValues = [0.125 ether, 0.250 ether, 0.500 ether, 1.00 ether, 2.00 ether, 4.00 ether, 8.00 ether, 16.00 ether, 32.00 ether, 64.00 ether];
    uint[11] returnValues = [0.2375 ether, 0.475 ether, 0.950 ether, 1.90 ether, 3.80 ether, 7.60 ether, 15.20 ether, 30.40 ether, 60.80 ether, 121.60 ether];
    uint[11] jackpotValues = [0.010 ether, 0.020 ether, 0.040 ether, 0.080 ether, 0.16 ether, 0.32 ether, 0.64 ether, 1.28 ether, 2.56 ether, 5.12 ether];
    uint[11] fees = [0.0025 ether, 0.005 ether, 0.010 ether, 0.020 ether, 0.040 ether, 0.080 ether, 0.16 ether, 0.32 ether, 0.64 ether, 1.28 ether];
    uint roundNumber;
    mapping(uint => uint) jackpot;
    mapping(uint => address[]) roundToUsers;
    uint jackpotBlockNum;
    mapping(uint => address) currentUser;
    address owner;
    uint ownerDeposit;

    event Jackpot(address indexed _user, uint _value, uint indexed _round);
    event Bet(address indexed _winner,address indexed _looser,uint _bet, uint _payBack);


    constructor() public {
        owner = msg.sender;
        roundNumber = 1;
    }

    modifier onlyOwner () {
        require(msg.sender == owner);
        _;
    }

    function() external payable {
        //送金額が設定した額と違かったら弾く
        uint valueNumber = checkValue(msg.value);
        //jackpotの時間になっていた場合
        uint randJackpot = uint(blockhash(block.number - 1)) % 10000;
        if(randJackpot == 0){
            uint randJackpotUser = uint(blockhash(block.number - 1)) % roundToUsers[roundNumber].length;
            address user = roundToUsers[roundNumber][randJackpotUser];
            uint jp = jackpot[roundNumber];
            user.transfer(jp);
            jackpot[roundNumber] = 0;
            emit Jackpot(user,jp,roundNumber);
            roundNumber = roundNumber.add(1);
        }
        //currentUserがいるかどうかで分ける
        if(currentUser[valueNumber] == address(0)){
            //currentUser がいない場合、リクエストを投げたuserがcurrentUserになる
            currentUser[valueNumber] = msg.sender;
            roundToUsers[roundNumber].push(currentUser[valueNumber]);
        }else{
            roundToUsers[roundNumber].push(msg.sender);
            uint rand = uint(blockhash(block.number-1)) % 2;
            jackpot[roundNumber] = jackpot[roundNumber].add(jackpotValues[valueNumber]);
            ownerDeposit = ownerDeposit.add(fees[valueNumber]);
            if(rand == 0){
                currentUser[valueNumber].transfer(returnValues[valueNumber]);
                emit Bet(currentUser[valueNumber], msg.sender, returnValues[valueNumber], betValues[valueNumber]);
            }else{
                msg.sender.transfer(returnValues[valueNumber]);
                emit Bet(currentUser[valueNumber], msg.sender, returnValues[valueNumber], betValues[valueNumber]);
            }
            currentUser[valueNumber] = address(0);
        }
    }

    function checkValue(uint sendValue) internal view returns(uint) {
        uint num = 0;
        while (sendValue != betValues[num]){
            if(num == 11){
                revert();
            }
            num = num.add(1);
        }
        return num;
    }

    function withdrawDeposit() public onlyOwner{
        owner.transfer(ownerDeposit);
        ownerDeposit = 0;
    }

    function currentJackpot() public view  returns(uint){
        return jackpot[roundNumber];
    }

}
