'use client'

import { ArrowDown, ArrowUpRight, Play, Plus } from 'lucide-react'
import { useState } from 'react'

const stays = [
  { name: 'The Riverside House', place: 'Mwanza, Tanzania', type: 'City escape', shade: 'stay-one' },
  { name: 'Kopje Retreat', place: 'Lake Victoria', type: 'Quiet indulgence', shade: 'stay-two' },
]

const experiences = [
  ['01', 'Lake rituals', 'Unhurried moments shaped by water, light and local character.'],
  ['02', 'A table for you', 'Seasonal plates, carefully poured drinks and conversations that last.'],
  ['03', 'The city, slowly', 'A more intimate way to meet Mwanza and its remarkable surroundings.'],
]

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <section className="hotel-hero">
        <div className="hero-grain" />
        <div className="hero-media-note">YOUR HERO VIDEO / IMAGE</div>
        <div className="hero-content">
          <p className="eyebrow text-white/80">Mwanza · Tanzania</p>
          <h1>Stay a little<br /><em>longer.</em></h1>
          <p className="hero-copy">A collection of places for slow mornings, generous tables and stories worth bringing home.</p>
          <a className="outline-link" href="#stays">Explore our stays <ArrowDown size={15} /></a>
        </div>
        <button className="play-button" onClick={() => setVideoOpen(true)} aria-label="Play brand film"><Play size={20} fill="currentColor" /></button>
        <div className="hero-index">01 / 04</div>
      </section>

      <section className="intro-section" id="story">
        <p className="eyebrow">A considered welcome</p>
        <div className="intro-grid">
          <h2>More than a place<br />to <em>stay.</em></h2>
          <div className="intro-copy"><p>We believe the best kind of hospitality is felt, not announced. It lives in beautifully simple spaces, thoughtful details and the feeling that there is nowhere else you need to be.</p><a href="#experiences" className="text-link">Discover our story <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="stays-section" id="stays">
        <div className="section-title"><div><p className="eyebrow">Our places</p><h2>Choose your<br /><em>occasion.</em></h2></div><p>Every address has its own pace. Find the one that feels like yours.</p></div>
        <div className="stay-grid">
          {stays.map((stay, index) => <article key={stay.name} className={`stay-card ${stay.shade}`}>
            <div className="media-label">YOUR {index === 0 ? 'HOTEL PHOTO' : 'HOTEL VIDEO'}</div>
            <div className="stay-details"><p>{stay.type}</p><h3>{stay.name}</h3><span>{stay.place}</span><a href="#contact" aria-label={`Discover ${stay.name}`}><ArrowUpRight size={20} /></a></div>
          </article>)}
        </div>
      </section>

      <section className="experiences-section" id="experiences">
        <div className="experience-photo"><span>YOUR EXPERIENCE PHOTO</span></div>
        <div className="experience-content"><p className="eyebrow">Make it memorable</p><h2>There is always<br />more to <em>discover.</em></h2><p className="experience-lead">Stay for the quiet luxury of doing less, or let us arrange something entirely unexpected.</p><div className="experience-list">{experiences.map(([number, title, copy]) => <div className="experience-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><Plus size={19} /></div>)}</div></div>
      </section>

      <section className="journal-section">
        <p className="eyebrow">The journal</p><h2>Notes from<br /><em>our world.</em></h2><div className="journal-card"><div><p>BEHIND THE DOORS</p><h3>A sense of place,<br />in every detail.</h3><a href="#contact" className="text-link">Read our journal <ArrowUpRight size={16} /></a></div><span>YOUR EDITORIAL IMAGE</span></div>
      </section>

      {videoOpen && <div className="video-modal" role="dialog" aria-modal="true" aria-label="Brand film"><button onClick={() => setVideoOpen(false)}>Close ×</button><div><Play size={32} fill="currentColor" /><p>Replace this panel with your video embed.</p></div></div>}
    </>
  )
}
