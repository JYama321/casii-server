class EthereumController < ApplicationController
  require 'json'

  def index
    get_web3
    json_data = File.open(Rails.root.join('app/assets/contracts','FiftyFifty.json')) do |j|
      JSON.parse(j.read)
    end
    contract = @web3.eth.contract(json_data["abi"])
    contract_instance = contract.at(ENV["CONTRACT_ADDRESS"])
    @url=ENV["INFURA_ENDPOINT_RINKEBY"]
    @user = User.new
    @client = HTTPClient.new
    @jp =  Float(contract_instance.currentJackpot()) / (10 ** 18)
  end

  def jackpot_ajax
    get_web3
    json_data = File.open(Rails.root.join('app/assets/contracts','FiftyFifty.json')) do |j|
      JSON.parse(j.read)
    end
    contract = @web3.eth.contract(json_data["abi"])
    contract_instance = contract.at(ENV["CONTRACT_ADDRESS"])
    @jp = Float(contract_instance.currentJackpot()) / (10 ** 18)
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
