import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Queries from '../../client/graphql/queries'
import NameDetail from '../detail/NameDetail'
import TypeDetail from '../detail/TypeDetail'
import DescriptionDetail from '../detail/DescriptionDetail'
import DomainsList from './DomainsList'
import AbodeDetail from '../detail/AbodeDetail'
import EmblemDetail from '../detail/EmblemDetail'
import RelativeDetail from '../detail/RelativeDetail'


const { FETCH_GOD } = Queries;

const GodDetail = props => {
  return (
    <Query query={FETCH_GOD} variables={{ id: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return (
          <div className="detail">
            <NameDetail id={data.god.id} name={data.god.name} />
            <TypeDetail id={data.god.id} type={data.god.type} />
            <DescriptionDetail id={data.god.id} description={data.god.description} />
            <DomainsList id={data.god.id} domains={data.god.domains} />
            <AbodeDetail id={data.god.id} god={data.god} abode={data.god.abode} />
            <EmblemDetail id={data.god.id} god={data.god} />
            <RelativeDetail id={data.god.id} god={data.god}/>
          </div>
        )
      }}
    </Query>
  );
}

export default GodDetail;