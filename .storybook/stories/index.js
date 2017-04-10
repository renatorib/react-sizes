import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { Code, Result } from '../components';
import Sizes from '../../lib/Sizes';

const mapSizesToProps = sizes => ({
  backgroundColor: sizes.width > 800 ? 'green' : 'blue',
  isMobile: Sizes.isMobile(sizes),
  isTablet: Sizes.isTablet(sizes),
  isDesktop: Sizes.isDesktop(sizes),
});

const ExampleSizedComponent = Sizes(mapSizesToProps)(
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
import Sizes from 'react-sizes';

const mapSizesToProps = sizes => ({
  backgroundColor: sizes.width > 800 ? 'green' : 'blue',
  isMobile: Sizes.isMobile(sizes),
  isTablet: Sizes.isTablet(sizes),
  isDesktop: Sizes.isDesktop(sizes),
});

const ExampleSizedComponent = Sizes(mapSizesToProps)(
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
  ));
