/* eslint-disable no-console */

import React, { Component } from 'react'
import throttle from 'lodash.throttle'

import getDisplayName from './utils/getDisplayName'
import shallowDiff from './utils/shallowDiff'
import getWindowSizes from './utils/getWindowSizes'

import * as presets from './presets'

const debug = process && process.env && process.env.NODE_ENV === 'debug'

const withSizes = (...mappedSizesToProps) => WrappedComponent => {
  const parseMappedSizesToProps = (dimensions, props) =>
    mappedSizesToProps
      .map(check => check(dimensions, props))
      .reduce((acc, props) => ({ ...acc, ...props }), {})

  return class ComponentWithSizes extends Component {
    static displayName = `withSizes(${getDisplayName(WrappedComponent)})`

    state = {
      initialSizes: getWindowSizes(),
      propsToPass: parseMappedSizesToProps(getWindowSizes(), this.props),
    }

    /* Dispatching & Throttling */

    dispatchSizes = () => {
      const propsToPass = parseMappedSizesToProps(getWindowSizes(), this.props)

      if (shallowDiff(propsToPass, this.state.propsToPass)) {
        this.setState({ propsToPass })
      }
    }

    throttledDispatchSizes = throttle(this.dispatchSizes, 200)

    /* Lifecycles */

    componentDidMount() {
      window.addEventListener('resize', this.throttledDispatchSizes)

      /* dispatch if aren't computed on first render */
      if (!this.state.initialSizes.canUseDOM) {
        this.dispatchSizes()
      }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.throttledDispatchSizes)
    }

    render() {
      if (debug) console.log('render', this.state.propsToPass)
      return <WrappedComponent {...this.props} {...this.state.propsToPass} />
    }
  }
}

export default Object.assign(withSizes, { ...presets })
