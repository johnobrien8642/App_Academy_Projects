require 'byebug'

module Enumerable
  protected def ins(element)
    return [element] if count.zero?

    head = first
    return [element] + self if element <= head
    debugger
    [head] + drop(1).ins(element)
  end

  def stable_sort
    return [] if count.zero?

    drop(1).stable_sort.ins(first)
  end
end