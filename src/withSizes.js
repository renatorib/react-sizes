/* eslint-disable no-console */

import React, { Component } from 'react'
import throttle from 'lodash.throttle'

import getDisplayName from './utils/getDisplayName'
import shallowDiff from './utils/shallowDiff'
import getWindowSizes from './utils/getWindowSizes'

const debug = process && process.env &&
  process.env.NODE_ENV === 'debug'

const withSizes = (...mappedSizesToProps) => (WrappedComponent) => {
  const parseMappedSizesToProps = (dimensions, props) =>
    mappedSizesToProps
      .map(check => check(dimensions, props))
      .reduce((acc, props) => ({ ...acc, ...props }), {})

  return class ComponentWithSizes extends Component {
    static displayName = `withSizes(${getDisplayName(WrappedComponent)})`

    state = {
      initialSizes: getWindowSizes(window),
      propsToPass: parseMappedSizesToProps(getWindowSizes(window), this.props),
    }

    /* Dispatching & Throttling */

    dispatchSizes = () => {
      const propsToPass = parseMappedSizesToProps(getWindowSizes(window), this.props)

      if (shallowDiff(propsToPass, this.state.propsToPass)) {
        this.setState({ propsToPass })
      }
    }

    throttledDispatchSizes = (
      throttle(this.dispatchSizes, 200)
    )

    /* Lifecycles */

    componentDidMount() {
      if (this.state.initialSizes.canUseDOM) {
        window.addEventListener('resize', this.throttledDispatchSizes)
      } else {
        /* dispatch if aren't computed on first render */
        this.dispatchSizes()
      }
    }

    componentWillUnmount() {
      if (this.state.initialSizes.canUseDOM) {
        window.removeEventListener('resize', this.throttledDispatchSizes)
      }
    }

    render() {
      if (debug) console.log('render', this.state.propsToPass)
      return <WrappedComponent {...this.props} {...this.state.propsToPass} />
    }
  }
}

export default withSizes
