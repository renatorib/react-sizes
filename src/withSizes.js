/* eslint-disable no-console */

import React, { PureComponent } from 'react'
import throttle from 'lodash.throttle'

import getDisplayName from './utils/getDisplayName'
import shallowDiff from './utils/shallowDiff'
import getWindowSizes from './utils/getWindowSizes'
import SizesContext from './SizesContext'
import * as presets from './presets'

const getWindowSizesWithFallback = props => {
  const { fallbackHeight, fallbackWidth, forceFallback } = props
  return getWindowSizes({ fallbackHeight, fallbackWidth, forceFallback })
}

const withSizes = (...mappedSizesToProps) => WrappedComponent => {
  const parseMappedSizesToProps = (dimensions, props) =>
    mappedSizesToProps
      .map(check => check(dimensions, props))
      .reduce((acc, props) => ({ ...acc, ...props }), {})

  class ComponentWithSizes extends PureComponent {
    static displayName = `withSizes(${getDisplayName(WrappedComponent)})`

    constructor(props) {
      super(props)

      this.getPropsToPass = () => {
        return parseMappedSizesToProps(
          getWindowSizesWithFallback(this.props),
          this.props
        )
      }

      this.state = {
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

    throttledDispatchSizes = throttle(this.dispatchSizes, this.props.throttle)

    /* Lifecycles */
    static getDerivedStateFromProps(props, state) {
      const propsToPass = parseMappedSizesToProps(
        getWindowSizesWithFallback(props),
        props
      )
      if (shallowDiff(propsToPass, state.propsToPass)) {
        return { propsToPass }
      }
    }

    componentDidMount() {
      window.addEventListener('resize', this.throttledDispatchSizes)
      this.dispatchSizes()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.throttledDispatchSizes)
    }

    render() {
      const {
        fallbackHeight,
        fallbackWidth,
        forceFallback,
        ...otherProps
      } = this.props

      return <WrappedComponent {...otherProps} {...this.state.propsToPass} />
    }
  }

  const WithSizes = props => (
    <SizesContext.Consumer>
      {config => <ComponentWithSizes {...config} {...props} />}
    </SizesContext.Consumer>
  )

  return WithSizes
}

export default Object.assign(withSizes, { ...presets })
