class EthereumController < ApplicationController
  require 'json'
  require 'jsonclient'
  include Common

  def index
    @url=ENV["INFURA_ENDPOINT_RINKEBY"]
    @user = User.new
    @client = JSONClient.new
    params = {
        "to":  "0x05c9dabdcc658f437aab9571f44219b1edc4787b",
        "data": "0xf9cee0bdaca142eb8852e8754e169a688f0abf505c8ede1adb8e33381313327c",
    }
    res = infura_rpc(params)
    result = res["result"]
    @jp =  Float(result) / (10 ** 18)
    puts @jp
  end

  def jackpot_ajax
    params = {
        "to":  "0x05c9dabdcc658f437aab9571f44219b1edc4787b",
        "data": "0xf9cee0bdaca142eb8852e8754e169a688f0abf505c8ede1adb8e33381313327c",
    }
    res = infura_rpc(params)
    result = res["result"]
    @jp = Float(result) / (10 ** 18)
    respond_to do |format|
      format.json
    end
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
