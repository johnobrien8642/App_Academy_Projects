import React from 'react';

export default class StepListItem extends React.Component {
  constructor(props) {
    super(props)

    this.toggleDone = this.toggleDone.bind(this)
  }

  toggleDone(e) {
    e.preventDefault();
    const toggledStep = Object.assign(
      {},
      this.props.step,
      { done: !this.props.step.done }
    );

    this.props.updateStep(toggledStep)
  }

  render() {
    const { step, removeStep } = this.props;
    const { title, done, body } = step;

    return (
      <li key={`step-list-item${step.id}`}
        className="step-list-item">
          <label htmlFor="step-title">Title</label>
          <h2 className="step-title" id="step-title">
            {title}
          </h2>
          <label htmlFor="step-body">Body</label>
        <p className="step-body" id="step-body">
          {body}
        </p>
          <button
            className={done ? 'done' : 'undone'}
            onClick={this.toggleDone}>
            { this.props.step.done ? 'Undo' : 'Done'}
          </button>
          <button onClick={ () => removeStep(step) }>Delete</button>
      </li>
    )
  }
}