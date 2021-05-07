import React from 'react'
import { storiesOf } from '@storybook/react'
import { Code, Result } from '../components'
import MobileBreakpoint from '../components/MobileBreakpoint'
import withSizes from '../../src/withSizes'
import SizesProvider from '../../src/SizesProvider'

const mapSizesToProps = (sizes) => ({
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

class DocumentElementExample extends React.Component {
  state = {
    windowWidth: window.innerWidth,
    documentWidth: document.documentElement.clientWidth,
  }

  constructor(...args) {
    super(...args)
    this.resetState = this.resetState.bind(this)
  }

  resetState() {
    this.setState({
      windowWidth: window.innerWidth,
      documentWidth: document.documentElement.clientWidth,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.resetState)
    this.resetState()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetState)
  }

  render() {
    return (
      <>
        <style>
          {`html {
            overflow-y: scroll;
          }`}
        </style>
        <SizesProvider config={{ useDocumentElement: true }}>
          <Result>
            <ExampleSizedComponent />
            <table>
              <thead>
                <tr>
                  <th>
                    <pre>window.innerWidth</pre>
                  </th>
                  <th>
                    <pre>document.documentElement.clientWidth</pre>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <pre>{this.state.windowWidth}</pre>
                  </td>
                  <td>
                    <pre>{this.state.documentWidth}</pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </Result>
        </SizesProvider>
      </>
    )
  }
}

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
  .add('useDocumentElement', () => <DocumentElementExample />)
  .add('mobileBreakpoint', () => (
    <div>
      <MobileBreakpoint breakpoint={300} />
      <MobileBreakpoint breakpoint={500} />
      <MobileBreakpoint breakpoint={700} />
    </div>
  ))
  .add('force fallback', () => <ForceFallbackExample />)
