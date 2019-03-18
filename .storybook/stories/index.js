import React from 'react'
import { storiesOf } from '@storybook/react'
import { Code, Result } from '../components'
import MobileBreakpoint from '../components/MobileBreakpoint'
import withSizes from '../../src/withSizes'
import SizesProvider from '../../src/SizesProvider'

const mapSizesToProps = sizes => ({
  backgroundColor: sizes.width > 800 ? 'green' : 'blue',
  isMobile: withSizes.isMobile(sizes),
  isTablet: withSizes.isTablet(sizes),
  isDesktop: withSizes.isDesktop(sizes),
})

const ExampleSizedComponent = withSizes(mapSizesToProps)(
  ({ isMobile, isTablet, isDesktop, backgroundColor }) => (
    <div style={{ backgroundColor, color: 'white', padding: '30px' }}>
      <div>
        <strong>Resize your window</strong>
      </div>
      {isMobile && 'isMobile '}
      {isTablet && 'isTablet '}
      {isDesktop && 'isDesktop '}
    </div>
  )
)

class ForceFallbackExample extends React.Component {
  state = {
    forceFallback: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ forceFallback: false })
    }, 5000)
  }

  render() {
    const { forceFallback } = this.state

    return (
      <SizesProvider
        config={{ fallbackHeight: 640, fallbackWidth: 280, forceFallback }}
      >
        <Result>
          {forceFallback && <p>Forcing fallback to mobile</p>}
          <ExampleSizedComponent />
        </Result>
      </SizesProvider>
    )
  }
}

storiesOf('Sizes', module)
  .add('default behavior', () => (
    <div>
      <Result>
        <ExampleSizedComponent />
      </Result>
      <Code>
        {`import React from 'react';
import withSizes from 'react-sizes';

const mapSizesToProps = sizes => ({
  backgroundColor: sizes.width > 800 ? 'green' : 'blue',
  isMobile: withSizes.isMobile(sizes),
  isTablet: withSizes.isTablet(sizes),
  isDesktop: withSizes.isDesktop(sizes),
});

const ExampleSizedComponent = withSizes(mapSizesToProps)(
  ({ isMobile, isTablet, isDesktop, backgroundColor }) => (
    <div><strong>Resize your window</strong></div>
    <div style={{ backgroundColor, color: 'white', padding: '30px' }}>
      {isMobile && 'isMobile '}
      {isTablet && 'isTablet '}
      {isDesktop && 'isDesktop '}
    </div>
  )
);`}
      </Code>
    </div>
  ))
  .add('mobileBreakpoint', () => (
    <div>
      <MobileBreakpoint breakpoint={300} />
      <MobileBreakpoint breakpoint={500} />
      <MobileBreakpoint breakpoint={700} />
    </div>
  ))
  .add('force fallback', () => <ForceFallbackExample />)
