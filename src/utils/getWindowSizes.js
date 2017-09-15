const getSizes = (window) => {
  const canUseDOM = typeof window !== 'undefined'

  return {
    width: canUseDOM ? window.innerWidth : null,
    height: canUseDOM ? window.innerHeight : null,
    canUseDOM,
  }
}

export default getSizes
