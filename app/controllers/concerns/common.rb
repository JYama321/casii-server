module Common
  extend ActiveSupport::Concern
  require 'jsonclient'

  def infura_rpc(**params)
    endpoint = ENV["INFURA_ENDPOINT_RINKEBY"]
    client = JSONClient.new
    res = client.post(endpoint, {
        "Content-Type": "application/json",
        :body => {
            "jsonrpc":"2.0",
            "method":"eth_call",
            "params": [params,"latest"],
            "id": 10
        }
    })
    JSON.parse(res.body)
  end
end