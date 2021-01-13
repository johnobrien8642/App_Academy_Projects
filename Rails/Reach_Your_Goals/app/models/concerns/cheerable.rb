module Cheerable
  extend ActiveSupport::Concern

  included do
    has_many :cheers, as: :cheerable
  end

end