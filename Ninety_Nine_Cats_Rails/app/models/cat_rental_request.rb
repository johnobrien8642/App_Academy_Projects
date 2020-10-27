class CatRentalRequest < ApplicationRecord
    STATUS_TYPES = %w(Pending Approved Denied)

    validates :status, inclusion: STATUS_TYPES
    validates :cat_id, :start_date, :end_date, presence: true
    validate :does_not_overlap_approved_requests

    belongs_to :cat,
      class_name: :Cat,
      foreign_key: :cat_id

    def denied?
      self.status == "Denied"
    end

    private

    def does_not_overlap_approved_requests
      return if self.denied?

      unless overlapping_approved_requests.empty?
        errors[:base] << 'Request conflicts with existing approved request'
      end
    end

    def overlapping_pending_requests
      overlapping_requests.where('status = \'Pending\'')
    end

    def overlapping_approved_requests
      overlapping_requests.where('status = \'Approved\'')
    end
    
    def overlapping_requests
       CatRentalRequest
         .where.not(id: self.id)
         .where(cat_id: cat_id)
         .where('(cat_rental_requests.start_date = :start_date) OR 
         (cat_rental_requests.end_date = :end_date) OR
         (:start_date BETWEEN cat_rental_requests.start_date AND 
         cat_rental_requests.end_date) OR
         (:end_date BETWEEN cat_rental_requests.start_date AND 
         cat_rental_requests.end_date)', 
         start_date: start_date, end_date: end_date
        )
    end
end