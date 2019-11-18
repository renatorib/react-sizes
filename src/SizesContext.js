import React from 'react'

const SizesContext = React.createContext({
  // Keep these fields in sync with the excluded fields in the `render()`
  // function of `withSizes.js`
  fallbackWidth: null,
  fallbackHeight: null,
  forceFallback: false,
  throttle: 200,
})

SizesContext.displayName = 'SizesContext'

export default SizesContext
