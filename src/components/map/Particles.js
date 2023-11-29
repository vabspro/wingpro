import React, { useEffect, useState, useRef, createRef } from 'react'
import gsap from 'gsap'

export default function Particles({ rotation }) {
    const amount = 200
    const canvas = useRef(null)
    const particleSet = Array.from({ length: amount }, (v, i) => i)
    const particleRefs = useRef(particleSet.map(() => createRef()))
    const [offset, setOffset] = useState(null)

    useEffect(() => {
        if (particleRefs && particleRefs.current.length) {
            particleRefs.current.forEach((item, index) => {
                const particle = item.current
                const animation = gsap.timeline({ repeat: -1, repeatDelay: 0 })
                const delay = {
                    max: 4,
                    min: 0.5,
                }
                animation
                    .to(particle, {
                        opacity: 1,
                        duration: 0.4,
                        delay: Math.random() * (delay.max - delay.min) + delay.min,
                        ease: 'linear',
                    })
                    .to(particle, {
                        x: canvas.current?.clientWidth,
                        duration: 3,
                        delay: -0.2,
                        ease: 'linear',
                    })
                    .to(particle, {
                        opacity: 0,
                        duration: 0.4,
                        delay: -0.6,
                        ease: 'linear',
                    })
            })
        }
    }, [particleRefs])

    useEffect(() => {
        if (canvas) {
            setOffset(canvas.current?.clientHeight / amount)
        }
    }, [canvas])

    useEffect(() => {
        if (rotation) {
            gsap.to(canvas.current, {
                rotate: rotation,
                duration: 0.4,
                ease: 'ease',
            })
        }
    }, [rotation])

    return (
        <div ref={canvas} className="map__particles">
            {particleSet.map((item, index) => (
                <div
                    key={index}
                    ref={particleRefs.current[index]}
                    className="map__particle"
                    style={{ top: index * offset }}
                ></div>
            ))}
        </div>
    )
}
