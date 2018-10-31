class EthereumController < ApplicationController
  require 'json'
  require 'jsonclient'
  include Common

  def initialize
    @jp = 0.00
    @url=ENV["INFURA_ENDPOINT_RINKEBY"]
    @user = User.new
    @client = JSONClient.new
  end

  def index
    #total bet rank
    week_day = (Time.now.day - Time.now.wday) == 0 ? + 1 : (Time.now.day - Time.now.wday)
    @total_send_rank = Transaction.joins(:user).group("users.address").order('sum_t_send desc').limit(4).sum(:t_send)
    @monthly_send_rank = Transaction.where("t_time > #{Date.new(Time.now.year, Time.now.month, + 1).to_time.to_i}").joins(:user).group("users.address").order('sum_t_send desc').limit(4).sum(:t_send)
    @weekly_send_rank = Transaction.where("t_time > #{Date.new(Time.now.year, Time.now.month, week_day ).to_time.to_i}").joins(:user).group("users.address").order('sum_t_send desc').limit(4).sum(:t_send)
    @daily_send_rank = Transaction.where("t_time >= #{Date.new(Time.now.year, Time.now.month, Time.now.day).to_time.to_i}").joins(:user).group("users.address").order('sum_t_send desc').limit(4).sum(:t_send)

    # total number of transactions ranking
    @daily_total_number_of_bets = Transaction.where("t_time >= #{Date.new(Time.now.year, Time.now.month, Time.now.day).to_time.to_i}").joins(:user).group("users.address").order('count_all desc').limit(4).count
    @weekly_total_number_of_bets = Transaction.where("t_time > #{Date.new(Time.now.year, Time.now.month, week_day).to_time.to_i}").joins(:user).group("users.address").order('count_all desc').limit(4).count
    @monthly_total_number_of_bets = Transaction.where("t_time > #{Date.new(Time.now.year, Time.now.month, +1).to_time.to_i}").joins(:user).group("users.address").order('count_all desc').limit(4).count
    @total_number_of_bets = Transaction.joins(:user).group("users.address").order('count_all desc').limit(4).count

    # total balance
    @daily_balance_rank = Transaction.where("t_time >= #{Date.new(Time.now.year, Time.now.month, Time.now.day).to_time.to_i}").joins(:user).select("sum(t_get - t_send) as balance,address").group("users.address").order("balance desc").limit(4)
    @weekly_balance_rank = Transaction.where("t_time > #{Date.new(Time.now.year, Time.now.month, week_day).to_time.to_i}").joins(:user).select("sum(t_get - t_send) as balance,address").group("users.address").order("balance desc").limit(4)
    @monthly_balance_rank = Transaction.where("t_time > #{Date.new(Time.now.year, Time.now.month, + 1).to_time.to_i}").joins(:user).select("sum(t_get - t_send) as balance,address").group("users.address").order("balance desc").limit(4)
    @total_balance_rank = Transaction.joins(:user).select("sum(t_get - t_send) as balance,address").group("users.address").order("balance desc").limit(4)
    render layout: 'application'
  end


  def jackpot_ajax
    parameters = {
        "to":  params[:contract_address],
        "data": "0xf9cee0bdaca142eb8852e8754e169a688f0abf505c8ede1adb8e33381313327c",
    }
    res = infura_eth_call(parameters)
    result = res["result"] == "0x0000000000000000000000000000000000000000000000000000000000000000" ? 0.0 : Float(res["result"])
    @jp = result == 0 ? 0.00 : (result / (10 ** 18))
    respond_to do |format|
      format.json
    end
  end

  def event_logs
    params = {
        "fromBlock":"0x1",
        "toBlock": "latest",
        "address":"0x9cb4f5fb9bc5f3a3918c1d90c9f0236406d6c106",
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