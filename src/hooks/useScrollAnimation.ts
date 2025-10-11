import { useEffect, useRef } from 'react'

export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.style.opacity = '1'
          ref.current.style.transform = 'translateY(0)'
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const currentRef = ref.current
    
    if (currentRef) {
      // Styles initiaux pour l'animation
      currentRef.style.opacity = '0'
      currentRef.style.transform = 'translateY(30px)'
      currentRef.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.2, 1)'
      
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return ref
}