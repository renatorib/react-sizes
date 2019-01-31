import React from 'react'

const SizesContext = React.createContext({
  fallbackWidth: null,
  fallbackHeight: null,
  forceFallback: false,
  throttle: 200,
})

SizesContext.displayName = 'SizesContext'

export default SizesContext
