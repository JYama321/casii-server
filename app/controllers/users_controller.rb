class UsersController < ApplicationController

  def initialize
    @is_user_exist = false
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to Smart Contract Casino"
      redirect_to root_path
    else
      flash[:danger] = "Log in Failed"
      redirect_to root_path
    end
  end

  def info
    @user = User.find_by(address: params[:user][:address])
    if @user && @user.transactions.count != 0
      @is_user_exist = true
      @transactions = @user.transactions
      @total_balance = @transactions.select("sum(t_get - t_send) as balance")[0]
      @total_balance_send = @transactions.select("sum(t_send) as balance")[0]
      @total_balance_receive = @transactions.select("sum(t_get) as balance")[0]
      respond_to do |format|
        format.js
      end
    else
      @user = User.new(user_params)
      @user.save
      @is_user_exist = true
      @transactions = []
      @total_balance = nil
      @total_balance_send = nil
      @total_balance_receive = nil

      respond_to do |format|
        format.js
      end
    end
  end

  def edit
    respond_to do |format|
      format.js
    end
  end

  def destroy
    @user.find(params[:id]).destroy
  end

  private

  def user_params
    params.require(:user).permit(:address)
  end



end
