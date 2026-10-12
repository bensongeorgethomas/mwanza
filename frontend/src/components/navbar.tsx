'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const links = [{ title: 'Our stays', href: '/#stays' }, { title: 'Our story', href: '/#story' }, { title: 'Experiences', href: '/#experiences' }, { title: 'Journal', href: '/#journal' }]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="hotel-nav"><Link href="/" className="brand"><span>O</span>RIEL</Link><nav>{links.map(link => <a key={link.title} href={link.href}>{link.title}</a>)}</nav><a className="book-link" href="#contact">Book a stay <span>↗</span></a><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X /> : <Menu />}</button>{open && <div className="mobile-menu">{links.map(link => <a onClick={() => setOpen(false)} key={link.title} href={link.href}>{link.title}</a>)}<a href="#contact">Book a stay</a></div>}</header>
}
