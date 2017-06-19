import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { Code, Result } from '../components';
import MobileBreakpoint from '../components/MobileBreakpoint';
import withSizes from '../../lib/withSizes';

const mapSizesToProps = sizes => ({
  backgroundColor: sizes.width > 800 ? 'green' : 'blue',
  isMobile: withSizes.isMobile(sizes),
  isTablet: withSizes.isTablet(sizes),
  isDesktop: withSizes.isDesktop(sizes),
});

const ExampleSizedComponent = withSizes(mapSizesToProps)(
  ({ isMobile, isTablet, isDesktop, backgroundColor }) => (
    <div style={{ backgroundColor, color: 'white', padding: '30px' }}>
      <div><strong>Resize your window</strong></div>
      {isMobile && 'isMobile '}
      {isTablet && 'isTablet '}
      {isDesktop && 'isDesktop '}
    </div>
  )
);

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
;
