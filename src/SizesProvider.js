import { Component } from 'react'
import contextTypes, { contextKey } from './contextTypes'

class SizesProvider extends Component {
  static childContextTypes = contextTypes

  getChildContext() {
    const { config = {} } = this.props

    return {
      [contextKey]: {
        fallbackWidth: config.fallbackWidth || null,
        fallbackHeight: config.fallbackHeight || null,
        throttle: config.throttle || 200,
      },
    }
  }

  render() {
    return this.props.children
  }
}

export default SizesProvider
