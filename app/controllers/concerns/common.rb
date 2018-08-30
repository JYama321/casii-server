module Common
  extend ActiveSupport::Concern
  require 'jsonclient'

  def infura_eth_call(**params)
    endpoint = ENV["INFURA_ENDPOINT_RINKEBY"]
    client = JSONClient.new
    res = client.post(endpoint, {
        "Content-Type": "application/json",
        :body => {
            "jsonrpc":"2.0",
            "method": "eth_call",
            "params": [params, "latest"],
            "id": 10
        }
    })
    JSON.parse(res.body)
  end

  def infura_eth_getLogs(**params)
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
end