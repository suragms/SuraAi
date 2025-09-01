import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      setIsInitialized(true)
    }

    // Check immediately
    checkMobile()

    // Set up event listener for window resize
    const handleResize = () => {
      checkMobile()
    }
    
    window.addEventListener('resize', handleResize)
    
    // Set up media query listener for more precise detection
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    
    mql.addEventListener("change", handleMediaQueryChange)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      mql.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  // Return false until we've determined the screen size to prevent hydration mismatches
  return isInitialized ? isMobile : false
}
