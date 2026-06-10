// Echoe Landing EN: App shell

import { useEffect } from 'react';
import { NavEN, HeroEN, StickyBarEN } from './components/Hero.jsx';
import { DemoSectionEN } from './components/Demo.jsx';
import { WedgeSectionEN } from './components/Wedge.jsx';
import { MechanicSectionEN, PricingSectionEN, FAQSectionEN, FinalCTAEN, ContactSectionEN, FooterEN } from './components/Rest.jsx';

export default function App() {
  // SSG-safe scroll reveals: only after hydration do we flip on the hidden
  // initial state (.js-anim on <html>) and observe .reveal elements. Static HTML
  // / no-JS ships everything visible; reduced-motion → skip (CSS keeps it shown).
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('js-anim');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <StickyBarEN />
      <NavEN />
      <HeroEN />
      <DemoSectionEN />
      <WedgeSectionEN />
      <MechanicSectionEN />
      <PricingSectionEN />
      <FAQSectionEN />
      <FinalCTAEN />
      <ContactSectionEN />
      <FooterEN />
    </>
  );
}
