import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return <footer className="hotel-footer" id="contact"><div className="footer-top"><div><p className="eyebrow">Come and stay</p><h2>Make yourself<br /><em>at home.</em></h2></div><a href="mailto:hello@yourhotel.com" className="footer-cta">Start a conversation <ArrowUpRight size={19} /></a></div><div className="footer-bottom"><div className="footer-brand"><span>O</span>RIEL</div><p>YOUR HOTEL COLLECTION<br />Mwanza, Tanzania</p><p>hello@yourhotel.com<br />+255 000 000 000</p><p>Instagram &nbsp; Facebook<br />Privacy policy</p></div></footer>
}
