import withSizes from './withSizes'

const Conductor = ({ children, render, ...props }) => {
  const fn = children || render
  return fn ? fn(props) : null
}

const createSizedComponent = (...mapSizesToProps) => {
  return withSizes(mapSizesToProps)(Conductor)
}

export default createSizedComponent
