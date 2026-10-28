import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const active = new WeakMap();
const mounts = new WeakMap();

// Returns a scoped disposer. Its .splits array is available to manual timelines.
export function textReveal01(scope = document, delay = 0, { ignoreManual = false } = {}) {
  const CONFIG = {
    lines: { duration: 1, stagger: 0.06, ease: 'expo.out' },
    words: { duration: 1, stagger: 0.03, ease: 'expo.out' },
    chars: { duration: 0.6, stagger: 0.01, ease: 'expo.out' },
    scrollStart: 'top 72%',
    scrubStart: 'top 80%',
    scrubEnd: 'top 20%',
    once: true,
    markers: false
  };
  const allSplitEls = [...scope.querySelectorAll('[data-reveal-01]')];
  // Re-running against an existing element first restores its unsplit markup.
  allSplitEls.forEach(el => active.get(el)?.dispose());
  const visibility = new Map(allSplitEls.map(el => [el, el.style.visibility]));
  const autoEls = ignoreManual ? allSplitEls : allSplitEls.filter(el => !el.hasAttribute('data-manual'));
  if (autoEls.length) gsap.set(autoEls, { visibility: 'visible' });
  const records = [];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  allSplitEls.forEach(el => {
    const splitType = el.getAttribute('data-reveal-01');
    const c = CONFIG[splitType];
    if (!c) return;
    const manual = !ignoreManual && el.hasAttribute('data-manual');
    const record = { split: null, tween: null, dispose: null };
    record.dispose = ({ preserve = false } = {}) => {
      if (active.get(el) !== record) return;
      record.tween?.scrollTrigger?.kill(false, true);
      record.tween?.kill();
      if (preserve) {
        // Freeze the outgoing copy in place while Swup animates its page surface.
        // Keep the record weakly attached so an aborted visit can safely re-split it.
        record.split?.kill();
      } else {
        record.split?.revert();
        if (visibility.get(el)) el.style.visibility = visibility.get(el);
        else el.style.removeProperty('visibility');
        active.delete(el);
      }
    };
    active.set(el, record);
    records.push(record);
    if (reduced && !manual) return;

    let type, mask, linesClass, wordsClass, charsClass;
    switch (splitType) {
      case 'lines':
        type = 'lines'; mask = 'lines'; linesClass = 'line';
        break;
      case 'words':
        type = 'words, lines'; mask = 'words'; wordsClass = 'word'; linesClass = 'line';
        break;
      case 'chars':
        type = 'chars, words, lines'; mask = 'chars'; charsClass = 'char'; wordsClass = 'word'; linesClass = 'line';
        break;
    }
    const options = {
      type, mask, autoSplit: true,
      ...(linesClass && { linesClass }),
      ...(wordsClass && { wordsClass }),
      ...(charsClass && { charsClass })
    };
    if (manual) {
      record.split = SplitText.create(el, options);
      return;
    }
    const scrollMode = el.getAttribute('data-scroll');
    const useScroll = el.hasAttribute('data-scroll');
    const useScrub = scrollMode === 'scrub';
    // Every formé page scrolls here, even while two generations overlap.
    const scroller = el.closest('#swup') || window;
    record.split = SplitText.create(el, {
      ...options,
      onSplit(instance) {
        const durationValue = parseFloat(el.dataset.duration);
        const staggerValue = parseFloat(el.dataset.stagger);
        const delayValue = parseFloat(el.dataset.delay);
        const duration = Number.isNaN(durationValue) ? c.duration : durationValue;
        const stagger = Number.isNaN(staggerValue) ? c.stagger : staggerValue;
        const elDelay = Number.isNaN(delayValue) ? 0 : delayValue;
        const ease = el.dataset.ease || c.ease;
        const targets = instance[splitType];
        const once = el.hasAttribute('data-once') ? el.getAttribute('data-once') !== 'false' : CONFIG.once;
        const tween = {
          yPercent: 110, duration, stagger,
          delay: useScroll ? elDelay : elDelay + delay,
          immediateRender: true, ease
        };
        if (useScrub) {
          tween.scrollTrigger = {
            trigger: el, scroller,
            start: CONFIG.scrubStart, end: CONFIG.scrubEnd,
            scrub: true, markers: CONFIG.markers,
            ...(once && { onLeave: self => self.kill(false) })
          };
        } else if (useScroll) {
          const start = scrollMode || CONFIG.scrollStart;
          tween.scrollTrigger = {
            trigger: el, scroller,
            start: `clamp(${start})`, markers: CONFIG.markers,
            ...(once ? { once: true } : { toggleActions: 'play none none reverse' })
          };
        }
        record.tween = gsap.from(targets, tween);
        return record.tween;
      }
    });
  });
  const dispose = options => records.forEach(record => record.dispose(options));
  Object.defineProperty(dispose, 'splits', { get: () => records.map(record => record.split).filter(Boolean) });
  return dispose;
}

export function initTextReveals(scope, delay = 0) {
  disposeTextReveals(scope);
  const mount = { cancelled: false, dispose: null };
  mounts.set(scope, mount);
  // Custom fonts determine the line breaks. Pending work is cancelled on navigation.
  Promise.resolve(document.fonts?.ready).then(() => {
    if (mount.cancelled || !scope.isConnected || scope !== document.querySelector('#swup')) return;
    try {
      mount.dispose = textReveal01(scope, delay);
      ScrollTrigger.refresh();
    } catch (error) {
      disposeTextReveals(scope);
      scope.querySelectorAll('[data-reveal-01]:not([data-manual])').forEach(el => { el.style.visibility = 'visible'; });
      console.error('Text reveal could not initialize', error);
    }
  });
}

export function disposeTextReveals(scope, options) {
  const mount = mounts.get(scope);
  if (mount) {
    mount.cancelled = true;
    mount.dispose?.(options);
    mounts.delete(scope);
  }
  // Also cover direct helper calls made after the page's original mount.
  scope.querySelectorAll('[data-reveal-01]').forEach(el => active.get(el)?.dispose(options));
}

export function refreshTextReveals() {
  ScrollTrigger.refresh();
}
