import React from 'react'
import SizesContext from './SizesContext'

const SizesProvider = ({ config, children }) => (
  <SizesContext.Provider value={config}>{children}</SizesContext.Provider>
)

export default SizesProvider
