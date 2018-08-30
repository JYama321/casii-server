class EthereumController < ApplicationController
  require 'json'
  require 'jsonclient'
  include Common

  def index
    @url=ENV["INFURA_ENDPOINT_RINKEBY"]
    @user = User.new
    @client = JSONClient.new
    params = {
        "to":  ENV["CONTRACT_ADDRESS"],
        "data": "0xf9cee0bdaca142eb8852e8754e169a688f0abf505c8ede1adb8e33381313327c",
    }
    res = infura_eth_call(params)
    result = res["result"]
    @jp =  Float(result) == 0 ? 0.00 : Float(result) / (10 ** 18)
  end

  def jackpot_ajax
    params = {
        "to":  ENV["CONTRACT_ADDRESS"],
        "data": "0xf9cee0bdaca142eb8852e8754e169a688f0abf505c8ede1adb8e33381313327c",
    }
    res = infura_eth_call(params)
    result = res["result"]
    @jp = Float(result) == 0 ? 0.00 : Float(result) / (10 ** 18)
    puts @jp
    respond_to do |format|
      format.json
    end
  end

  def event_logs
    params = {
        "fromBlock":"0x1",
        "toBlock": "latest",
        "address":"0x05c9dabdcc658f437aab9571f44219b1edc4787b",
        "topics":["0x2f7e081b637f086fe9a4ba1a33ef520aed864eb0339560563b8990894172e7cc"]
    }
    res = infura_eth_getLogs(params)
    @events = res["result"]
  end

  private

  def get_web3
    if @web3 == nil
      @web3 = Web3::Eth::Rpc.new host: 'rinkeby.infura.io',
                                 port: 443,
                                 connect_options: {
                                     open_timeout: 20,
                                     read_timeout: 140,
                                     use_ssl: true
                                 }
    end
  end

  def jackpot
    res = JSON.parse(@client.get(ENV["INFURA_GET_BALANCE_ENDPOINT_RINKEBY"]).body)
    res['result']
  end


end
