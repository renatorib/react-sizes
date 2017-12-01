const getDisplayName = Component =>
  Component.displayName ||
  Component.name ||
  (typeof Component === 'string' && Component.length > 0
    ? Component
    : 'Unknown')

export default getDisplayName
