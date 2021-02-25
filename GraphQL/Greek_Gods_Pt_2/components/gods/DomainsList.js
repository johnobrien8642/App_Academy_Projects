import React from 'react';
import AddDomain from '../detail/AddDomain'
import DeleteDomain from '../detail/DeleteDomain'


class DomainsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      domains: this.props.domains
    }

    this.updateDomains = this.updateDomains.bind(this)
  }

  updateDomains(newDomainsArr) {
    this.setState({ domains: newDomainsArr })
  }
  
  render() {
    const updateDomains = this.updateDomains;
    return (
      <ul>
        {this.state.domains.map((domain, i) => {
          return (
            <li key={i}>
              <p>{domain}</p>
              <DeleteDomain 
                id={this.props.id} 
                domain={domain}
                updateDomains={updateDomains.bind(this)} 
              />
            </li>
          )
        })}
        <li><AddDomain id={this.props.id} updateDomains={updateDomains.bind(this)} /></li>
      </ul>
    )
  }
}

export default DomainsList;