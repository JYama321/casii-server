require "#{Rails.root}/app/models/transaction"
require "#{Rails.root}/app/models/user"
require "#{Rails.root}/app/models/log"
class Tasks::Logs
  require 'json'
  require 'jsonclient'


  def self.infura_eth_getLogs(**params)
    endpoint = ENV["INFURA_ENDPOINT_RINKEBY"]
    client = JSONClient.new
    res = client.post(endpoint, {
        "Content-Type": "application/json",
        :body => {
            "jsonrpc":"2.0",
            "method": "eth_getLogs",
            "params": [params],
            "id": 10
        }
    })
    JSON.parse(res.body)
  end

  def self.infura_eth_getBlock
    endpoint = ENV["INFURA_ENDPOINT_RINKEBY"]
    client = JSONClient.new
    res = client.post(endpoint, {
        "Content-Type": "application/json",
        :body => {
            "jsonrpc":"2.0",
            "method": "eth_blockNumber",
            "params": [],
            "id": 1
        }
    })
    JSON.parse(res.body)
  end

  def self.infura_eth_getTransactionReceit(t_hash)
    endpoint = ENV["INFURA_ENDPOINT_RINKEBY"]
    client = JSONClient.new
    res = client.post(endpoint, {
        "Content-Type": "application/json",
        :body => {
            "jsonrpc": "2.0",
            "method": "eth_getTransactionReceipt",
            "params": [t_hash],
            "id": 2
        }
    })
    JSON.parse(res.body)
  end

  def self.batch_get_logs_contract_one
    log = Log.order("created_at desc").limit(1)
    previous_end_block = log[0].end_block + 1
    next_end_block = infura_eth_getBlock["result"]
    next_start_block = sprintf("%#x",previous_end_block + 1)
    transactions = []
    params = {
        "fromBlock": next_start_block,
        "toBlock": next_end_block,
        "address":"0x5ebe9c8e69144a5822f88ea1437f14bb85f53e6f",
        "topics":["0x79332159d97b6c85dc0cb60c8b8c436f780180e3ed9181e69898fff5a9935b60"]
    }
    res = infura_eth_getLogs(params)
    events = res["result"]
    puts events
    begin
      events.each do |event|
        tx_receit = infura_eth_getTransactionReceit(event["transactionHash"])
        t_hash = tx_receit["result"]["transactionHash"]
        from_address = tx_receit["result"]["from"]
        data = tx_receit["result"]["logs"][0]["data"]
        t_send = data.slice(0,66).to_i(16) / (10 ** 18)
        t_get = ('0x' + data.slice(66,64)).to_i(16) / (10 ** 18)
        t_datetime = ('0x' + data.slice(130,64)).to_i(16)

        user = User.new(address: from_address)
        if user.save
          #userが新規だった場合
          t_user_id = user.id
        else
          #userがすでに存在していた場合
          t_user_id = User.find_by(address: from_address).id
        end
        transactions << Transaction.new(t_hash: t_hash, user_id: t_user_id, t_send: t_send, t_get: t_get, t_time: t_datetime)
      end
      Transaction.import(transactions)
      log = Log.new(contract_id: 1, start_block: next_start_block.to_i(16), end_block: next_end_block.to_i(16))
      log.save
    rescue => error
      puts "error occurred: #{error}"
    end
  end

  def self.batch_get_logs_two

  end

end
