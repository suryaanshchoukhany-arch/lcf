// Mayo College architectural images used throughout the website design
// These are NOT gallery images — they are visual identity assets

export const MAYO = {
  // Hero
  heroMain: '/hero-stage.png',

  // About sections
  about1: '/images/campus/campus-1.jpg',
  about2: '/images/campus/campus-2.jpg',

  // Competition sections
  comp1: '/images/competitions/comp-1.jpg',
  comp2: '/images/competitions/comp-2.jpg',

  // Schedule
  scheduleBg: '/images/campus/campus-4.jpg',

  // CTA
  ctaBg: '/images/hero/hero-secondary.jpg',

  // Footer
  footerBg: '/images/hero/hero-secondary.jpg',

  // Split screens
  split1: '/images/campus/campus-3.jpg',
  split2: '/images/campus/campus-4.jpg',

  // Editorial panels
  editorial1: '/images/competitions/comp-1.jpg',
  editorial2: '/images/competitions/comp-2.jpg',
  editorial3: '/images/competitions/comp-3.jpg',
  editorial4: '/images/competitions/comp-4.jpg',
  editorial5: '/images/competitions/comp-5.jpg',
  editorial6: '/images/competitions/comp-6.jpg',
  editorial7: '/images/competitions/comp-7.jpg',
  editorial8: '/images/competitions/comp-8.jpg',
  editorial9: '/images/competitions/comp-9.jpg',
  editorial10: '/images/competitions/comp-10.jpg',
} as const;

export type MayoImage = typeof MAYO[keyof typeof MAYO];
