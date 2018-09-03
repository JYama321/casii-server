class EthereumController < ApplicationController
  require 'json'
  require 'jsonclient'
  include Common

  def index
    @url=ENV["INFURA_ENDPOINT_RINKEBY"]
    @user = User.new
    @client = JSONClient.new
    @send_total_rank = Transaction.joins(:user).group("users.address").order('sum_t_send desc').sum(:t_send)
    @total_number_of_bets = Transaction.joins(:user).group("users.address").order('count_all desc').count
    @jp = 0.00
  end

  def jackpot_ajax
    params = {
        "to":  ENV["CONTRACT_ADDRESS"],
        "data": "0xf9cee0bdaca142eb8852e8754e169a688f0abf505c8ede1adb8e33381313327c",
    }
    res = infura_eth_call(params)
    result = Float(res["result"])
    @jp = result == 0 ? 0.00 : (result / (10 ** 18))
    puts @jp
    respond_to do |format|
      format.json
    end
  end

  def event_logs
    params = {
        "fromBlock":"0x1",
        "toBlock": "latest",
        "address":"0x0efc9628411a980639ec2f455ef7bab7603bbe74",
        "topics":["0x79332159d97b6c85dc0cb60c8b8c436f780180e3ed9181e69898fff5a9935b60"]
    }
    res = infura_eth_getLogs(params)
    @events = res["result"]
  end

  def aggregate_total_number_of_bet

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
