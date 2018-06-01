/* eslint-disable no-console */

import React, { Component } from 'react'
import throttle from 'lodash.throttle'

import getDisplayName from './utils/getDisplayName'
import shallowDiff from './utils/shallowDiff'
import getWindowSizes from './utils/getWindowSizes'

import contextTypes, { contextKey } from './contextTypes'
import * as presets from './presets'

const withSizes = (...mappedSizesToProps) => WrappedComponent => {
  const parseMappedSizesToProps = (dimensions, props) =>
    mappedSizesToProps
      .map(check => check(dimensions, props))
      .reduce((acc, props) => ({ ...acc, ...props }), {})

  return class ComponentWithSizes extends Component {
    static displayName = `withSizes(${getDisplayName(WrappedComponent)})`
    static contextTypes = contextTypes

    constructor(props, context) {
      super(props, context)

      this.getWindowSizesWithFallback = () => {
        const config = this.context[contextKey] || {}
        const { fallbackHeight = null, fallbackWidth = null } = config
        return getWindowSizes({ fallbackHeight, fallbackWidth })
      }

      this.getPropsToPass = () => {
        return parseMappedSizesToProps(
          this.getWindowSizesWithFallback(),
          this.props
        )
      }

      this.state = {
        initialSizes: this.getWindowSizesWithFallback(),
        propsToPass: this.getPropsToPass(),
      }
    }

    /* Dispatching & Throttling */

    dispatchSizes = () => {
      const propsToPass = this.getPropsToPass()

      if (shallowDiff(propsToPass, this.state.propsToPass)) {
        this.setState({ propsToPass })
      }
    }

    throttledDispatchSizes = throttle(
      this.dispatchSizes,
      (this.context[contextKey] || {}).throttle || 200
    )

    /* Lifecycles */

    componentDidMount() {
      window.addEventListener('resize', this.throttledDispatchSizes)
      this.dispatchSizes()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.throttledDispatchSizes)
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state.propsToPass} />
    }
  }
}

export default Object.assign(withSizes, { ...presets })
