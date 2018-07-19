import React from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';
import { deprecated } from 'react-prop-types';
import { GatewayContext } from './GatewayProvider';

class GatewayDest extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    tagName: deprecated(PropTypes.string, 'Use "component" instead.'),
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  state = {
    children: null
  };

  componentWillMount() {
    this.props.gatewayRegistry.addContainer(this.props.name, this);
  }

  componentWillUnmount() {
    this.props.gatewayRegistry.removeContainer(this.props.name, this);
  }

  render() {
    const { component, tagName, gatewayRegistry, ...attrs } = this.props;
    delete attrs.name;
    return React.createElement(
      component || tagName || 'div',
      attrs,
      this.state.children
    );
  }
}

const GatewayDestWithContext = props => (
  <GatewayContext.Consumer>
    {gatewayRegistry => (
      <GatewayDest {...props} gatewayRegistry={gatewayRegistry} />
    )}
  </GatewayContext.Consumer>
);

export default GatewayDestWithContext;
