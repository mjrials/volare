class User < ActiveRecord::Base
 	attr_accessible :id, :first_name, :last_name, :login, :salt, :password_digest
 	has_many :rewards

 	def password
 	    @password
 	end

 	def password=(pass)
 	    self.salt = Random.rand(100)
 	    predigest = pass.to_s + self.salt.to_s
 	    self.password_digest = Digest::SHA1.hexdigest predigest
 	end
 	    
 	def password_valid?(password)
 	    predigest = password.to_s + self.salt.to_s
 	    digest = Digest::SHA1.hexdigest predigest
 	    if(digest == self.password_digest) then
 	        return true
 	    else
 	        return false
 	    end
 	end
end
