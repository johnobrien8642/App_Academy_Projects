import React from 'react';

const handleChange = (filter, updateFilters) => e => (
  updateFilters(filter, parseInt(e.currentTarget.value))
)

const FilterForm = ({minSeating, maxSeating, updateFilters}) => {
  return (
    <div>
      <span>Filter results:</span>
      <label>minSeating:
      <input 
      type="number"
      min="0"
      max="18"
      value={minSeating}
      onChange={handleChange('minSeating', updateFilters)}/>
      </label>
      <label>maxSeating:
      <input 
      type="number"
      min="2"
      max="20"
      value={maxSeating}
      onChange={handleChange('maxSeating', updateFilters)}/>
      </label>
    </div>
  )
}

export default FilterForm;