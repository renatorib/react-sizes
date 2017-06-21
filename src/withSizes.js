import React, { Component } from 'react';
import { v4 } from 'uuid';
import keys from 'lodash.keys';
import throttle from 'lodash.throttle';
import getDisplayName from 'react-display-name';

let resizeListener;
const listeners = {};

const getSizes = (window) => ({
  width: typeof window !== 'undefined' && window.innerWidth,
  height: typeof window !== 'undefined' && window.innerHeight,
  canUseDOM: typeof window !== 'undefined',
});

const withSizes = (...mappedSizesToProps) => (WrappedComponent) => {
  const parseMappedSizesToProps = (dimensions, props) => {
    const propsToPass = mappedSizesToProps
      .map(check => check(dimensions, props))
      .reduce((acc, props) => ({...acc, ...props}), {});

    return propsToPass;
  }

  return class extends Component {
    static displayName = `withSizes(${getDisplayName(WrappedComponent)})`;

    state = {
      id: `A${v4()}`,
      propsToPass: parseMappedSizesToProps(getSizes(window), this.props),
    };

    componentDidMount() {
      if (!resizeListener) {
        resizeListener = window.addEventListener('resize', this.throttledWindowResize);
      }

      listeners[this.state.id] = (sizes) => this.setState({
        propsToPass: parseMappedSizesToProps(sizes, this.props)
      });

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
          callback(getSizes(window));
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

withSizes.isMobile = ({ width }) => width < 480;
withSizes.isTablet = ({ width }) => width >= 480 && width < 1024;
withSizes.isDesktop = ({ width }) => width >= 1024;

withSizes.isGtMobile = (sizes) => !withSizes.isMobile(sizes);
withSizes.isGtTablet = (sizes) => withSizes.isDesktop(sizes);

withSizes.isStTablet = (sizes) => withSizes.isMobile(sizes);
withSizes.isStDesktop = (sizes) => !withSizes.isStDesktop(sizes);

withSizes.isTabletAndGreater = (sizes) => !withSizes.isMobile(sizes);
withSizes.isTabletAndSmaller = (sizes) => !withSizes.isStDesktop(sizes);

export default withSizes;
