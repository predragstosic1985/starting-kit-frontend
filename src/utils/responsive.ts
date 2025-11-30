export const getBreakpointValue = (theme: any, breakpoint: string) => {
    return theme.breakpoints.values[breakpoint]
}

export const isMobileScreen = () => {
    return window.innerWidth < 600
}

export const isTabletScreen = () => {
    return window.innerWidth >= 600 && window.innerWidth < 960
}

export const isDesktopScreen = () => {
    return window.innerWidth >= 960
}