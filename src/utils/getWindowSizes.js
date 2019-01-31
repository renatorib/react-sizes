const getWindowSizes = ({ fallbackWidth = null, fallbackHeight = null, forceFallback = false }) => {
  const canUseDOM = typeof window !== 'undefined'

  return {
    width: canUseDOM && !forceFallback ? window.innerWidth : fallbackWidth,
    height: canUseDOM && !forceFallback ? window.innerHeight : fallbackHeight,
    canUseDOM,
  }
}

export default getWindowSizes
