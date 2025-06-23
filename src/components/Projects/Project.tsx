import React, { Component } from 'react'
import Image from 'next/image';

export default function Project() {

  const projects = [
    { href: 'https://www.benfy.co/', src: '/assets/images/projects__benfy.png', title: 'Benfy' },
    { href: 'https://kethini.com/', src: '/assets/images/projects__kethini.png', title: 'Kethini' },
    { href: 'https://vbdace.com/', src: '/assets/images/projects__vbdace.png', title: 'VBdace' },
    { href: 'https://fyva.in/', src: '/assets/images/projects__fyva.png', title: 'Fyva' },
    { href: 'https://icse.kingston.ac.in/', src: '/assets/images/projects__kingston.png', title: 'Kingston' },
  ];

  return (
    <section className='project__section'>
      <div className='container'>

        <div className='project__header'>
          <h1 className='project__heading mb-5'>Projects</h1>
          <p className='project__desp'>Here's the list of projects!</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <a href={item?.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={item?.src}
                  width={600}
                  height={600}
                  alt={item?.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <h6 className="text-white text-xl font-semibold">{item?.title}</h6>
                </div>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
