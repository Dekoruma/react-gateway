import React from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

export const GatewayContext = React.createContext(null);

export default class GatewayProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  };

  constructor(props) {
    super(props);
    this.gatewayRegistry = new GatewayRegistry();
  }

  render() {
    return (
      <GatewayContext.Provider value={this.gatewayRegistry}>
        {this.props.children}
      </GatewayContext.Provider>
    );
  }
}
