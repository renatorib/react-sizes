const getWindowSizes = ({
  useDocumentElement = false,
  fallbackWidth = null,
  fallbackHeight = null,
  forceFallback = false,
}) => {
  const canUseDOM = typeof window !== 'undefined'

  return {
    width:
      canUseDOM && !forceFallback
        ? useDocumentElement
          ? document.documentElement.clientWidth
          : window.innerWidth
        : fallbackWidth,
    height:
      canUseDOM && !forceFallback
        ? useDocumentElement
          ? document.documentElement.clientHeight
          : window.innerHeight
        : fallbackHeight,
    canUseDOM,
  }
}

export default getWindowSizes
