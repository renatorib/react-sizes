import PropTypes from 'prop-types'

export const contextKey = '_ReactSizesConfig_'

export default {
  [contextKey]: PropTypes.shape({
    fallbackWidth: PropTypes.number,
    fallbackHeight: PropTypes.number,
    throttle: PropTypes.number,
  }),
}
