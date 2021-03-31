import React from 'react'

export default function useResize(myRef: React.MutableRefObject<any>) {
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        // height: window.innerHeight,
        // width: window.innerWidth,
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight,
      })
      console.log(dimensions); 
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    
    }
  })
  return dimensions
}