![react-sizes](./logo.png)

[![npm](https://img.shields.io/npm/v/react-sizes.svg?style=flat-square)](https://www.npmjs.com/package/react-sizes)
[![npm](https://img.shields.io/npm/dt/react-sizes.svg?style=flat-square)](https://www.npmjs.com/package/react-sizes)
[![GitHub issues](https://img.shields.io/github/issues/renatorib/react-sizes.svg?style=flat-square)](https://github.com/renatorib/react-sizes/issues)
[![GitHub stars](https://img.shields.io/github/stars/renatorib/react-sizes.svg?style=flat-square)](https://github.com/renatorib/react-sizes/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/renatorib/react-sizes.svg?style=social&style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/renatorib/react-sizes)

## Install

```
yarn add react-sizes
```

```
npm install react-sizes
```

## What and why

React Sizes is a high-order component with a high performance that transform window sizes (width and height) into props.  
You can check inside your component, for example, if user's window is less than 480 pixels of width, and add a custom
content.

It can be very powerful for when you need to display different content for mobile and desktop.
But it's not limited to this case. Just use that at your needs.

## Usage

#### With class component.

```jsx
import React, { Component } from 'react'
import withSizes from 'react-sizes'

class MyComponent extends Component {
  render() {
    return <div>{this.props.isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
})

export default withSizes(mapSizesToProps)(MyComponent)
```

You can play with this example [here](https://codesandbox.io/s/Rg0DDOWnE).

#### As decorator.

```jsx
import React from 'react'
import withSizes from 'react-sizes'

@withSizes(({ width }) => ({ isMobile: width < 480 }))
class MyComponent extends Component {
  render() {
    return <div>{this.props.isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
  }
}

export default MyComponent
```

#### Interoperate with other libraries.

```jsx
import React from 'react'
import withSizes from 'react-sizes'
import { withState, compose } from 'recompose'

const enhancer = compose(
  withState('counter', 'setCounter', 0),
  withSizes(({ width }) => ({ isMobile: width < 480 }))
)

const MyComponent = enhancer(({ isMobile, counter, setCounter }) => (
  <div>
    <div>
      Count: {counter}{' '}
      <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    </div>
    <div>{isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
  </div>
))

export default MyComponent
```

#### With functional component.

```jsx
import React from 'react'
import withSizes from 'react-sizes'

const MyComponent = ({ isMobile }) => (
  <div>{isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
)

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
})

export default withSizes(mapSizesToProps)(MyComponent)
```

#### Mess with props.

(Added in 0.1.0)

```jsx
import React from 'react'
import withSizes from 'react-sizes'

const MyComponent = ({ isMobile }) => (
  <div>{isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
)

const mapSizesToProps = ({ width }, { mobileBreakpoint }) => ({
  isMobile: width < mobileBreakpoint,
})

export default withSizes(mapSizesToProps)(MyComponent)
```

then:

```jsx
<MyComponent mobileBreakpoint={480} />
<MyComponent mobileBreakpoint={400} />
<MyComponent mobileBreakpoint={600} />
```

#### With presets selectors.

```diff
- const mapSizesToProps = ({ width }) => ({
-   isMobile: width < 480,
- });

+ const mapSizesToProps = sizes => ({
+  isMobile: withSizes.isMobile(sizes),
+ });
```

## Presets Selectors

You can check all **our** presets selectors at our main code `src/withSizes.js`.

```js
withSizes.isMobile = ({ width }) => width < 480
withSizes.isTablet = ({ width }) => width >= 480 && width < 1024
withSizes.isDesktop = ({ width }) => width >= 1024

withSizes.isGtMobile = sizes => !withSizes.isMobile(sizes)
withSizes.isGtTablet = sizes => withSizes.isDesktop(sizes)

withSizes.isStTablet = sizes => withSizes.isMobile(sizes)
withSizes.isStDesktop = sizes => !withSizes.isStDesktop(sizes)

withSizes.isTabletAndGreater = sizes => !withSizes.isMobile(sizes)
withSizes.isTabletAndSmaller = sizes => !withSizes.isStDesktop(sizes)
```

If it don't fit to your needs, you can create your own selectors.

```jsx
// utils/sizes/selectors.js
export const isntDesktop = ({ width }) => width < 1024
export const backgroundColor = ({ width }) => (width < 480 ? 'red' : 'green')

// your component
import { isntDesktop, backgroundColor } from 'utils/sizes/selectors'

const mapSizesToProps = sizes => ({
  canDisplayMobileFeature: isntDesktop(sizes),
  backgroundColor: backgroundColor(sizes),
})
```

> `sizes` argument is an object with `width` and `height` properties and represents DOM window width and height.

## Guide

#### mapSizesToProps(sizes)

`sizes` argument is an object with `width` and `height` of DOM window.

```js
const mapSizesToProps = sizes => {
  console.log(sizes) // { width: 1200, height: 720 } (example)
}
```

In pratice, it is a callback that return props that will injected into your Component.

```js
const mapSizesToProps = function(sizes) {
  const props = {
    backgroundColor: sizes.width < 700 ? 'red' : 'green',
  }

  return props
}
```

But you can simplify this to stay practical and elegant.

```js
const mapSizesToProps = ({ width }) => ({
  backgroundColor: width < 700 ? 'red' : 'green',
})
```

## Server Side Rendering

Since React Sizes rely on window to computate sizes, we can't computate the values in server enviroment. To try to get around this we can **guess** user viewport based on your user-agent, and pass values by a Context Provider.  
But be careful, **user-agent based detection is not a reliable solution**. It's a workaround.

```js
// Config can be created based on user-agent. See below
const config = { fallbackWidth: 360, fallbackHeight: 640 }

return (
  <SizesProvider config={config}>
    <App />
  </SizesProvider>
)
```

Example:

```js
import MobileDetect from 'mobile-detect'
import Express from 'express'
import { SizesProvider } from 'react-sizes'
// All other imports

const getSizesFallback = userAgent => {
  const md = new MobileDetect(userAgent)

  if (!!md.mobile()) {
    return {
      fallbackWidth: 360,
      fallbackHeight: 640,
    }
  } else if (!!md.tablet()) {
    return {
      fallbackWidth: 768,
      fallbackHeight: 1024,
    }
  }

  return {
    fallbackWidth: 1280,
    fallbackHeight: 700,
  }
}

// Note: you don't need to use express, this is just an example
const app = new Express()
app.use((req, res) => {
  // ...
  const sizesConfig = getSizesFallback(req.headers['user-agent'])

  const App = (
    <AnotherProvider>
      <Router location={req.url}>
        <SizesProvider config={sizesConfig}>
          <Root />
        </SizesProvider>
      </Router>
    </AnotherProvider>
  )

  res.status(200)
  res.send(`<!doctype html>\n${ReactDOM.renderToString(<App />)}`)
  res.end()
})

app.listen(/* ... */)
```

## Performance Notes

#### Shallow Compare

React Sizes do a shallow compare in props generated from `mapSizesToProps` (called `propsToPass`), so it will only rerender when they really change. If you create a deep data sctructure, this can generate false positives. In these cases, we recommend using immutable for a more reliable shallow compare result. Or just don't use deep data structures, if possible.

## Contribute

You can help improving this project sending PRs and helping with issues.  
Also you ping me at [Twitter](http://twitter.com/renatorib_)
