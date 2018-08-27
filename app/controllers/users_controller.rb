class UsersController < ApplicationController
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

  def destroy
    @user.find(params[:id]).destroy
  end

  private

  def user_params
    params.require(:user).permit(:address)
  end

end
