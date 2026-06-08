'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const navLinks = [
  'Products',
  'Service',
  'Construction Cases',
  'Investor',
  'News',
  'About Zoomlion',
  'Contact',
]

const categories = [
  { name: 'Earthmoving Machinery',          image: '/images/Nav-Photos/p1.png' },
  { name: 'MEWPs',                           image: '/images/Nav-Photos/p2.png' },
  { name: 'Mobile Crane Machinery',          image: '/images/Nav-Photos/p3.png' },
  { name: 'Construction Hoisting Machinery', image: '/images/Nav-Photos/p4.png' },
  { name: 'Concrete Machinery',              image: '/images/Nav-Photos/p5.png' },
  { name: 'Agricultural Machinery',          image: '/images/Nav-Photos/p6.png' },
]

const hotlines = [
  { country: 'RUSSIA',    number: '800-2508-157'   },
  { country: 'INDONESIA', number: '0800-1-157-157' },
  { country: 'UAE',       number: '800-9666-5466'  },
  { country: 'VIETNAM',   number: '0888-000-157'   },
  { country: 'MALAYSIA',  number: '6012-398-0157'  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [megaOpen, setMegaOpen]             = useState(false)
  const [activeCategory, setActiveCategory] = useState(categories[0].name)
  const [serviceOpen, setServiceOpen]       = useState(false)
  const [investorOpen, setInvestorOpen]     = useState(false)
  const [newsOpen, setNewsOpen]             = useState(false)
  const [aboutOpen, setAboutOpen]           = useState(false)
  const [contactOpen, setContactOpen]       = useState(false)
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [mobileProdOpen, setMobileProdOpen] = useState(false)

  const isActive = megaOpen || serviceOpen || investorOpen || newsOpen || aboutOpen || contactOpen || mobileOpen

  // Debounce close so a fast mouse move from a nav link into its dropdown
  // doesn't fire onMouseLeave before the panel has fully expanded.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startClose  = () => { closeTimer.current = setTimeout(() => { setMegaOpen(false); setServiceOpen(false); setInvestorOpen(false); setNewsOpen(false); setAboutOpen(false); setContactOpen(false) }, 120) }
  const cancelClose = () => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null } }
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileProdOpen(false)
  }

if (pathname === '/exploreproduct' || pathname === '/login') {
    return null
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      onMouseLeave={startClose}
      onMouseEnter={cancelClose}
    >
      {/* ── Header bar ────────────────────────────────── */}
      <header
        className={[
          'group flex items-center justify-between px-6 py-5 lg:px-20 lg:py-6 transition-all duration-300',
          isActive ? 'bg-white' : 'hover:bg-white',
          isActive && !megaOpen && !serviceOpen && !investorOpen && !newsOpen && !aboutOpen && !contactOpen ? 'shadow-md' : '',
        ].join(' ')}
      >
        {/* Logo */}
        <div
        className={[
          'text-2xl font-bold tracking-[0.2em] uppercase select-none transition-colors duration-300',
          isActive ? 'text-secondary' : 'text-white group-hover:text-secondary',
        ].join(' ')}
      >
        Zoomlion
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const linkClass = [
              'text-base font-medium tracking-wide whitespace-nowrap transition-colors duration-300',
              megaOpen
                ? link === 'Products'  ? 'text-primary' : 'text-secondary-light hover:text-secondary'
                : serviceOpen
                ? link === 'Service'   ? 'text-primary' : 'text-secondary-light hover:text-secondary'
                : investorOpen
                ? link === 'Investor'  ? 'text-primary' : 'text-secondary-light hover:text-secondary'
                : newsOpen
                ? link === 'News'            ? 'text-primary' : 'text-secondary-light hover:text-secondary'
                : aboutOpen
                ? link === 'About Zoomlion'  ? 'text-primary' : 'text-secondary-light hover:text-secondary'
                : contactOpen
                ? link === 'Contact'          ? 'text-primary' : 'text-secondary-light hover:text-secondary'
                : link === 'Products' || link === 'Service' || link === 'Construction Cases' || link === 'Investor' || link === 'News' || link === 'About Zoomlion' || link === 'Contact'
                ? 'text-white/85 group-hover:text-secondary-light hover:text-white group-hover:hover:text-primary'
                : 'text-white/85 group-hover:text-secondary-light hover:text-white group-hover:hover:text-secondary',
            ].join(' ')

            const handleEnter = () => {
              if      (link === 'Products') { setMegaOpen(true);     setServiceOpen(false);  setInvestorOpen(false); setNewsOpen(false) }
              else if (link === 'Service')  { setServiceOpen(true);  setMegaOpen(false);     setInvestorOpen(false); setNewsOpen(false) }
              else if (link === 'Investor') { setInvestorOpen(true); setMegaOpen(false);     setServiceOpen(false);  setNewsOpen(false) }
              else if (link === 'News')           { setNewsOpen(true);    setMegaOpen(false); setServiceOpen(false); setInvestorOpen(false); setAboutOpen(false) }
              else if (link === 'About Zoomlion') { setAboutOpen(true);   setMegaOpen(false); setServiceOpen(false); setInvestorOpen(false); setNewsOpen(false);  setContactOpen(false) }
              else if (link === 'Contact')        { setContactOpen(true); setMegaOpen(false); setServiceOpen(false); setInvestorOpen(false); setNewsOpen(false);  setAboutOpen(false) }
              else                                { setMegaOpen(false);   setServiceOpen(false); setInvestorOpen(false); setNewsOpen(false); setAboutOpen(false); setContactOpen(false) }
            }

            if (link === 'Service') {
              return (
                <a key="Service" href="#" onMouseEnter={handleEnter} className={linkClass}>
                  Service
                </a>
              )
            }

            return (
              <a key={link} href="#" onMouseEnter={handleEnter} className={linkClass}>
                {link}
              </a>
            )
          })}
        </nav>

        {/* Desktop right icons */}
        <div
        className={[
          'hidden lg:flex items-center gap-5 transition-colors duration-300',
          isActive ? 'text-secondary' : 'text-white group-hover:text-secondary',
        ].join(' ')}
        >
          <button aria-label="Search" className="hover:opacity-60 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <span className={['w-px h-5 transition-colors duration-300', isActive ? 'bg-gray-300' : 'bg-white/30 group-hover:bg-gray-300'].join(' ')} />
          <button className="text-base font-medium tracking-wide hover:opacity-60 transition-opacity">Global</button>
          <button aria-label="Menu grid" className="hover:opacity-60 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3"  y="3"  width="7" height="7" rx="1" />
              <rect x="14" y="3"  width="7" height="7" rx="1" />
              <rect x="3"  y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={['lg:hidden transition-colors duration-300', isActive ? 'text-secondary' : 'text-white'].join(' ')}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3"  y1="6"  x2="21" y2="6"  />
              <line x1="3"  y1="12" x2="21" y2="12" />
              <line x1="3"  y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* ── Desktop mega menu ──────────────────────────── */}
      <div
        className={[
          'hidden lg:block w-full bg-white overflow-hidden transition-all duration-[400ms] ease-out',
          megaOpen ? 'max-h-[600px] border-t border-gray-100 shadow-2xl' : 'max-h-0 pointer-events-none',
        ].join(' ')}
      >
        <div
          className={[
            'flex flex-col min-h-[360px] mx-auto max-w-7xl px-10 lg:px-20 transition-[opacity,transform] duration-[400ms] ease-out',
            megaOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
          ].join(' ')}
        >

          <div className="flex flex-1">

            {/* Left column — categories */}
            <div className="w-72 flex-shrink-0 border-r border-gray-100 py-6">
              {categories.map((cat) => {
                const isActivecat = activeCategory === cat.name
                return (
                  <div
                    key={cat.name}
                    onMouseEnter={() => setActiveCategory(cat.name)}
                    className={[
                      'flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors duration-150 rounded-sm',
                      isActivecat ? 'bg-primary' : 'hover:bg-gray-50',
                    ].join(' ')}
                  >
                    <img src={cat.image} alt={cat.name} className="h-10 w-auto object-contain flex-shrink-0" />
                    <span className={['text-sm font-medium leading-tight', isActivecat ? 'text-white' : 'text-secondary'].join(' ')}>
                      {cat.name}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Right column — service panel */}
            <div className="flex-1 flex flex-col justify-between py-7 px-10 bg-gray-50">
              <div className="flex gap-16">
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-secondary-light uppercase mb-3">Service Support</p>
                  <ul className="space-y-2">
                    {['ZOOMLION Services', 'Service Network'].map((link) => (
                      <li key={link}>
                        <a href="#" className="text-base text-secondary-light hover:text-primary transition-colors duration-150 font-medium">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-secondary-light uppercase mb-3">Service Hotline</p>
                  <ul className="space-y-2">
                    {hotlines.map(({ country, number }) => (
                      <li key={country} className="flex items-center gap-3">
                        <span className="w-24 text-sm font-semibold tracking-wide text-secondary-light">{country}</span>
                        <span className="text-base text-secondary font-medium tabular-nums">{number}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <div className="inline-flex items-center bg-primary px-4 py-2">
                  <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">Zoomlion</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom action buttons */}
          <div className="flex items-center gap-3 border-t border-gray-100 py-5">
            <button className="px-6 py-2.5 rounded-full bg-secondary/5 text-secondary text-sm font-medium hover:bg-secondary/10 transition-colors duration-200">
              Inquiry
            </button>
            <button className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors duration-200">
              Online consultation
            </button>
          </div>

        </div>
      </div>

      {/* ── Service subnav (full-width) ───────────────── */}
      <div
        className={[
          'hidden lg:block w-full bg-white overflow-hidden transition-all duration-[350ms] ease-out',
          serviceOpen ? 'max-h-[64px] border-t border-gray-100 shadow-md' : 'max-h-0 pointer-events-none',
        ].join(' ')}
      >
        <div className={['flex items-center gap-8 pl-[350px] pr-10 lg:pl-[620px] lg:pr-20 h-[60px] transition-[opacity,transform] duration-[350ms] ease-out', serviceOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'].join(' ')}>
          <span className="text-base font-bold text-secondary whitespace-nowrap">Service</span>
          <span className="w-px h-5 bg-gray-300 flex-shrink-0" />
          {['ZOOMLION Services', 'Services Offered', 'Service Network', 'Parts Network'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-secondary-light hover:text-primary transition-colors duration-200 whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── Investor subnav (full-width) ──────────────── */}
      <div
        className={[
          'hidden lg:block w-full bg-white overflow-hidden transition-all duration-[350ms] ease-out',
          investorOpen ? 'max-h-[64px] border-t border-gray-100 shadow-md' : 'max-h-0 pointer-events-none',
        ].join(' ')}
      >
        <div className={['flex items-center gap-8 pl-[850px] pr-10 lg:pl-[730px] lg:pr-20 h-[60px] transition-[opacity,transform] duration-[350ms] ease-out', investorOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'].join(' ')}>
          <span className="text-base font-bold text-secondary whitespace-nowrap">Investor</span>
          <span className="w-px h-5 bg-gray-300 flex-shrink-0" />
          {['Stock Chart', 'Announcements', 'Financial Reports'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-secondary-light hover:text-primary transition-colors duration-200 whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── News subnav (full-width) ──────────────────── */}
      <div
        className={[
          'hidden lg:block w-full bg-white overflow-hidden transition-all duration-[350ms] ease-out',
          newsOpen ? 'max-h-[64px] border-t border-gray-100 shadow-md' : 'max-h-0 pointer-events-none',
        ].join(' ')}
      >
        <div className={['flex items-center gap-8 pl-[960px] pr-10 lg:pl-[800px] lg:pr-20 h-[60px] transition-[opacity,transform] duration-[350ms] ease-out', newsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'].join(' ')}>
          <span className="text-base font-bold text-secondary whitespace-nowrap">News</span>
          <span className="w-px h-5 bg-gray-300 flex-shrink-0" />
          {['Press Release', 'Events', 'Video'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-secondary-light hover:text-primary transition-colors duration-200 whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── About Zoomlion subnav (full-width) ───────── */}
      <div
        className={[
          'hidden lg:block w-full bg-white overflow-hidden transition-all duration-[350ms] ease-out',
          aboutOpen ? 'max-h-[64px] border-t border-gray-100 shadow-md' : 'max-h-0 pointer-events-none',
        ].join(' ')}
      >
        <div className={['flex items-center gap-8 pl-[1040px] pr-10 lg:pl-[580px] lg:pr-20 h-[60px] transition-[opacity,transform] duration-[350ms] ease-out', aboutOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'].join(' ')}>
          <span className="text-base font-bold text-secondary whitespace-nowrap">About Zoomlion</span>
          <span className="w-px h-5 bg-gray-300 flex-shrink-0" />
          {['Company Profile', 'Technology & Innovation', 'Social Responsibility', 'Career'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-secondary-light hover:text-primary transition-colors duration-200 whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── Contact subnav (full-width) ──────────────── */}
      <div
        className={[
          'hidden lg:block w-full bg-white overflow-hidden transition-all duration-[350ms] ease-out',
          contactOpen ? 'max-h-[64px] border-t border-gray-100 shadow-md' : 'max-h-0 pointer-events-none',
        ].join(' ')}
      >
        <div className={['flex items-center gap-8 pl-[1180px] pr-10 lg:pl-[880px] lg:pr-20 h-[60px] transition-[opacity,transform] duration-[350ms] ease-out', contactOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'].join(' ')}>
          <span className="text-base font-bold text-secondary whitespace-nowrap">Contact</span>
          <span className="w-px h-5 bg-gray-300 flex-shrink-0" />
          {['Contact Us'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-secondary-light hover:text-primary transition-colors duration-200 whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── Mobile menu ────────────────────────────────── */}
      <div
        className={[
          'lg:hidden bg-white border-t border-gray-100 overflow-y-auto transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-[calc(100vh-72px)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {navLinks.map((link) =>
          link === 'Products' ? (
            <div key={link}>
              {/* Products toggle */}
              <button
                onClick={() => setMobileProdOpen((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-4 text-secondary font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <span>Products</span>
                <svg
                  className={['transition-transform duration-200', mobileProdOpen ? 'rotate-180' : ''].join(' ')}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Categories accordion */}
              <div
                className={[
                  'overflow-hidden transition-all duration-300 ease-in-out bg-gray-50',
                  mobileProdOpen ? 'max-h-[480px]' : 'max-h-0',
                ].join(' ')}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-3 px-8 py-3 border-b border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <img src={cat.image} alt={cat.name} className="h-8 w-auto object-contain flex-shrink-0" />
                    <span className="text-sm text-secondary font-medium">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <a
              key={link}
              href="#"
              onClick={closeMobile}
              className="block px-6 py-4 text-secondary font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {link}
            </a>
          )
        )}
      </div>
    </div>
  )
}
