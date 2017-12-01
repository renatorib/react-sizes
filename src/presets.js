export const isMobile = ({ width }) => width < 480
export const isTablet = ({ width }) => width >= 480 && width < 1024
export const isDesktop = ({ width }) => width >= 1024

export const isGtMobile = sizes => !isMobile(sizes)
export const isGtTablet = sizes => isDesktop(sizes)

export const isStTablet = sizes => isMobile(sizes)
export const isStDesktop = sizes => !isDesktop(sizes)

export const isTabletAndGreater = sizes => !isMobile(sizes)
export const isTabletAndSmaller = sizes => !isStDesktop(sizes)
