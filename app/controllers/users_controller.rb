class UsersController < ApplicationController
	def index
		@users = User.find(:all)
	end
	def login
		@user = User.new
	end
	def post_login
		loginUser = User.find_by_login(params[:user][:login])
		if loginUser then
			if loginUser.password_valid?(params[:user][:password]) then
				session[:userid] = loginUser.id
				redirect_to(:controller => :users, :action => :index, :id => loginUser.id)
			else
				if(params[:user][:password] == "") then
					flash[:notice] = "Please enter a password."
				else
					flash[:notice] = "Incorrect password for user '#{params[:user][:login]}'."
				end
				redirect_to(:action => :login)
			end
		else
			if(params[:user][:login] == "") then
				flash[:notice] = "Please enter a username."
			else
				flash[:notice] = "No users matching '#{params[:user][:login]}'."
			end
			redirect_to(:action => :login)
		end
	end
	def logout
		reset_session
		redirect_to(:action => :login)
	end

	def new
		@user = User.new
		@airlines = [["American AAdvantage", "American Airlines"],
        			["Delta SkyMiles", "Delta Air Lines"],
        			["Frontier EarlyReturns", "Frontier Airlines"],
        			["HawaiianMiles", "Hawaiian Airlines"],
        			["JetBlue TrueBlue", "JetBlue Airways"],
        			["Southwest Rapid Rewards", "Southwest Airlines"],
        			["United Mileage Plus", "United Airlines"],
        			["US Dividend Miles", "US Airways"],
        			["Virgin America", "Virgin America"]]
	end
	def create
		if(params[:user][:password] == params[:user][:password_copy]) then 
			if User.find_by_login(params[:user][:login]) == nil then
				user = User.new
				user.first_name = params[:user][:first_name]
				user.last_name = params[:user][:last_name]
				user.login = params[:user][:login]
				user.password=params[:user][:password]
				user.save

				redirect_to(:controller => :users, :action => :login)
			else
				flash[:notice] = "Username '#{params[:user][:login]}' already taken."
				redirect_to(:action => :new)
			end
		else
			flash[:notice] = "Passwords must match."
			redirect_to(:action => :new)
		end
	end
end