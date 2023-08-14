'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { Engine, Container } from 'tsparticles-engine';

type Props = {};

export default function Backgrand({}: Props) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      <Particles
        className="absolute -z-50 h-full w-full blur-sm"
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 1200,
              },
            },
            color: {
              value: '#22d3ee',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: 'img/github.svg',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 65,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 200,
              color: '#22d3ee',
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'window',
            events: {
              onhover: {
                enable: true,
                mode: 'grab',
              },
              onclick: {
                enable: false,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 200,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 100,
                size: 20,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />
    </>
  );
}
