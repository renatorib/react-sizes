import React, { Component } from 'react';
import { v4 } from 'uuid';
import keys from 'lodash.keys';
import throttle from 'lodash.throttle';

import getDisplayName from 'react-display-name';

let resizeListener;
const listeners = {};

const Sizes = (...mappedSizesToProps) => (WrappedComponent) => {
  const parseMappedSizesToProps = ({ width, height }) => {
    const propsToPass = mappedSizesToProps
      .map(check => check({width, height}))
      .reduce((acc, props) => ({...acc, ...props}), {});
    return propsToPass
  }

  return class extends Component {
    static displayName = `Sizes(${getDisplayName(WrappedComponent)})`;

    state = {
      id: `A${v4()}`,
      propsToPass: {},
    };

    constructor(props) {
      super(props)
      this.state.propsToPass = parseMappedSizesToProps({
        width: typeof window !== 'undefined' && window.innerWidth,
        height: typeof window !== 'undefined' && window.innerHeight,
      })
    }

    componentDidMount() {
      if (!resizeListener) {
        resizeListener = window.addEventListener('resize', this.throttledWindowResize);
      }

      listeners[this.state.id] = dimensions => this.setState({ propsToPass: parseMappedSizesToProps(dimensions) });
      this.dispatchSizes();
    }

    componentWillUnmount() {
      delete listeners[this.state.id];
      if (keys(listeners).length < 1) {
        window.removeEventListener('resize', this.throttledWindowResize);
        resizeListener = null;
      }
    }

    dispatchSizes = () => {
      keys(listeners).forEach(key => {
        const callback = listeners[key];

        if (typeof callback === 'function') {
          callback({
            width: typeof window !== 'undefined' && window.innerWidth,
            height: typeof window !== 'undefined' && window.innerHeight,
          });
        }
      });
    };

    throttledWindowResize = (
      throttle(this.dispatchSizes, 200)
    );

    render() {
      return <WrappedComponent {...this.props} {...this.state.propsToPass} />;
    }
  };
};

Sizes.isMobile = ({ width }) => width < 480;
Sizes.isTablet = ({ width }) => width >= 480 && width < 1024;
Sizes.isDesktop = ({ width }) => width >= 1024;

Sizes.isGtMobile = (sizes) => !Sizes.isMobile(sizes);
Sizes.isGtTablet = (sizes) => Sizes.isDesktop(sizes);

Sizes.isStTablet = (sizes) => Sizes.isMobile(sizes);
Sizes.isStDesktop = (sizes) => !Sizes.isStDesktop(sizes);

Sizes.isTabletAndGreater = (sizes) => !Sizes.isMobile(sizes);
Sizes.isTabletAndSmaller = (sizes) => !Sizes.isStDesktop(sizes);

export default Sizes;
