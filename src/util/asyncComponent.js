import React, { Component } from 'react';

const asyncComponent = (importComponent) => class extends Component {
  constructor(props) {
    console.log('creating async component');
    super(props);
    this.state = {
      component: null
    };
  }

  componentDidMount() {
    importComponent()
      .then((cmp) => {
        this.setState({ component: cmp.default });
      });
  }

  render() {
    const C = this.state.component;
    // console.log(this.props);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return C ? <C {...this.props} /> : null;
  }
};

export default asyncComponent;
