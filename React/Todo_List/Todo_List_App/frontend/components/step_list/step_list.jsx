import React from 'react';
import StepListItemContainer from './step_list_item_container'
import StepForm from './step_form'

export const StepList = ({steps, todo_id, createStep}) => {
  const stepItems = steps.map(step => (
    <StepListItemContainer 
      key={step.id}
      step={step} />
  ))

  return (
    <div>
      <StepForm todo_id={ todo_id } createStep={ createStep }/>
      <ul className='step-list'>
        {stepItems}
      </ul>
    </div>
  )
}