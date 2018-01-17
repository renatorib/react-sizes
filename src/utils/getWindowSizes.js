const getWindowSizes = ({ fallbackWidth = null, fallbackHeight = null }) => {
  const canUseDOM = typeof window !== 'undefined'

  return {
    width: canUseDOM ? window.innerWidth : fallbackWidth,
    height: canUseDOM ? window.innerHeight : fallbackHeight,
    canUseDOM,
  }
}

export default getWindowSizes
