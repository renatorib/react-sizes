/* eslint-disable no-console */

import React, { Component } from 'react'
import { v4 } from 'uuid'
import keys from 'lodash.keys'
import throttle from 'lodash.throttle'

import * as presets from './presets'

import getDisplayName from './utils/getDisplayName'
import shallowDiff from './utils/shallowDiff'
import getWindowSizes from './utils/getWindowSizes'

const debug = process.env.NODE_ENV !== 'production'

let resizeListener
const listeners = {}

const withSizes = (...mappedSizesToProps) => (WrappedComponent) => {
  const parseMappedSizesToProps = (dimensions, props) => {
    const propsToPass = mappedSizesToProps
      .map(check => check(dimensions, props))
      .reduce((acc, props) => ({...acc, ...props}), {})

    return propsToPass
  }

  return class extends Component {
    static displayName = `withSizes(${getDisplayName(WrappedComponent)})`;

    state = {
      id: `A${v4()}`,
      propsToPass: parseMappedSizesToProps(getWindowSizes(window), this.props),
    };

    componentDidMount() {
      if (!resizeListener) {
        resizeListener = window.addEventListener('resize', this.throttledWindowResize)
      }

      listeners[this.state.id] = this.listenerCallback

      this.dispatchSizes()
    }

    componentWillUnmount() {
      delete listeners[this.state.id]
      if (keys(listeners).length < 1) {
        window.removeEventListener('resize', this.throttledWindowResize)
        resizeListener = null
      }
    }

    listenerCallback = (sizes) => {
      const propsToPass = parseMappedSizesToProps(sizes, this.props)

      if (shallowDiff(propsToPass, this.state.propsToPass)) {
        this.setState({ propsToPass })
      }
    }

    dispatchSizes = () => {
      keys(listeners).forEach(key => {
        const callback = listeners[key]

        if (typeof callback === 'function') {
          callback(getWindowSizes(window))
        }
      })
    };

    throttledWindowResize = (
      throttle(this.dispatchSizes, 200)
    );

    render() {
      if (debug) console.log('render', this.state.propsToPass)
      return <WrappedComponent {...this.props} {...this.state.propsToPass} />
    }
  }
}

export default Object.assign(withSizes, presets)
