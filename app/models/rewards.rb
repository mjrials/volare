class Rewards < ActiveRecord::Base
	attr_accessible :id, :airline, :r_miles, :q_miles
	belongs_to :user
end
