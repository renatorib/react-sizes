import withSizes from './withSizes'
import * as presets from './presets'

/* 
// this will be a breaking change
export createSizedComponent from './createSizedComponent'

const all = Object.assign({}, exports)
delete all.default */

export default Object.assign(withSizes, presets)
