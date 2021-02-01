class Step < ApplicationRecord
  validates :title, :body, presence: true
  validates :done, inclusion: { in: [ true, false ] }

  belongs_to :todo
end
