![react-sizes](./logo.png)

[![npm](https://img.shields.io/npm/v/react-sizes.svg?style=flat-square)](https://img.shields.io/npm/v/react-sizes.svg)
[![npm](https://img.shields.io/npm/dt/react-sizes.svg?style=flat-square)](https://img.shields.io/npm/v/react-sizes.svg)
[![GitHub issues](https://img.shields.io/github/issues/renatorib/react-sizes.svg?style=flat-square)](https://github.com/renatorib/react-sizes/issues)
[![GitHub stars](https://img.shields.io/github/stars/renatorib/react-sizes.svg?style=flat-square)](https://github.com/renatorib/react-sizes/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/renatorib/react-sizes.svg?style=social&style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/renatorib/react-sizes)

## Install
```
yarn add react-sizes
```
or
```
npm install react-sizes
```

## What and why.
React Sizes is a high-order component with a high performance that transform window sizes (width and height) into props.  
You can check inside your component, for example, if user's window is less than 480 pixels of width, and add a custom
content.

It can be very powerful for when you need to display different content for mobile and desktop.
But it's not limited to this case. Just use that at your needs.  

## Usage

#### With class component.
```jsx
import React from 'react';
import Sizes from 'react-sizes';

class MyComponent extends Component {
  render() {
    return (
      <div>{this.props.isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
});

export Sizes(mapSizesToProps)(MyComponent);
```

#### As decorator.
```jsx
import React from 'react';
import Sizes from 'react-sizes';

@Sizes(({ width }) => ({ isMobile: width < 480 }))
class MyComponent extends Component {
  render() {
    return (
      <div>{this.props.isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
    );
  }
}

export default MyComponent;
```

#### With functional component.
```jsx
import React from 'react';
import Sizes from 'react-sizes';

const MyComponent = ({ isMobile }) => (
  <div>{isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
);

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
});

export Sizes(mapMediaToProps)(MyComponent);
```

#### Interoperate with other libraries.
```jsx
import React from 'react';
import Sizes from 'react-sizes';
import { withState, compose } from 'recompose';

const enhancer = compose(
  withState('counter', 'setCounter', 0),
  Sizes(({ width }) => ({ isMobile: width < 480 })),
);

const MyComponent = enhancer(({ isMobile, counter, setCounter }) => (
  <div>
    <div>
      Count: {counter} <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    </div>
    <div>{ this.props.isMobile ? 'Is Mobile' : 'Is Not Mobile' }</div>
  </div>
));

export default MyComponent;
```

#### With presets selectors.
```diff
- const mapSizesToProps = ({ width }) => ({
+ const mapSizesToProps = sizes => ({
-  isMobile: width < 480,
+  isMobile: Sizes.isMobile(sizes),
});
```

## Presets Selectors

You can check all **our** presets selectors at our main code `src/Sizes.js`.
```js
Sizes.isMobile = ({ width }) => width < 480;
Sizes.isTablet = ({ width }) => width >= 480 && width < 1024;
Sizes.isDesktop = ({ width }) => width >= 1024;

Sizes.isGtMobile = (sizes) => !Sizes.isMobile(sizes);
Sizes.isGtTablet = (sizes) => Sizes.isDesktop(sizes);

Sizes.isStTablet = (sizes) => Sizes.isMobile(sizes);
Sizes.isStDesktop = (sizes) => !Sizes.isStDesktop(sizes);

Sizes.isTabletAndGreater = (sizes) => !Sizes.isMobile(sizes);
Sizes.isTabletAndSmaller = (sizes) => !Sizes.isStDesktop(sizes);
```

If it don't fit to your needs, you can create your own selectors.
```jsx
// utils/sizes/selectors.js
export const isntDesktop = ({ width }) => width < 1024;

// your component
import { isntDesktop } from 'utils/sizes/selectors';

const mapSizesToProps = sizes => ({
  canDisplayMobileFeature: isntDesktop(sizes),
});
```
> `sizes` argument is an object with `width` and `height` properties and represents DOM window width and height.

## Performance Notes

#### Global listener
Window resize event listener is grouped at one global listener only.
So you can have as many components as you want using Sizes hoc, which will not have multiple resize listeners,
but only one that will dispatch for all instances.  

Don't worry, Sizes handles `componentWillUnmount` to remove unnecessary callbacks.
When each component unmounted, it unsubscribe for global dispatches, and when last component is unmounted,
the listener is removed.

#### Throttle
By now the listener callback is hardcoded as [throttle](https://css-tricks.com/debouncing-throttling-explained-examples/)
function of 200ms. Because of having a global listener, we have a limitation on changing this behavior.
I don't see it as tradeoff, and I think it can have good workarounds.
Then, for the future, I intend to work to bring a solution to this important customization.

## Guide

#### mapSizesToProps(sizes)
`sizes` argument is an object with `width` and `height` of DOM window.

```js
const mapSizesToProps = sizes => {
  console.log(sizes) // { width: 1200, height: 720 } (example)
};
```

In pratice, it is a callback that return props that will injected into your Component.  
```js
const mapSizesToProps = function(sizes) {
  const props = {
    backgroundColor: sizes.width < 700 ? 'red' : 'green',
  };

  return props;
};
```

But you can simplify this to stay practical and elegant.
```js
const mapSizesToProps = ({ width }) => ({
  backgroundColor: width < 700 ? 'red' : 'green',
});
```

## Contribute

You can help improving this project sending PRs and helping with issues.  
Also you ping me at [Twitter](http://twitter.com/renatorib_)
