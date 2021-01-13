class HelperFunctions

    def self.rand_length_and_rand_num_arr
        set = Set.new  
        rand_arr_length = rand(1..10)
            until set.length == rand_arr_length  
              set << rand(1..20)    
            end  
        set.to_a
    end  

end