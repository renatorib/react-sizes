import React from 'react';
import withSizes from '../../src/withSizes';

const MobileBreakpoint = ({ isMobile, breakpoint, width }) => (
  <div>
    <div>breakpoint: {breakpoint} | width: {width}</div>
    <div>{isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
    <br /><br />
  </div>
);

const mapSizesToProps = ({ width }, { breakpoint }) => ({
  isMobile: width < breakpoint,
  width,
});

export default withSizes(mapSizesToProps)(MobileBreakpoint);
