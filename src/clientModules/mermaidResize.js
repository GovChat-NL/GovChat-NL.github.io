/**
 * Client module: forceert mermaid SVGs om de volle breedte te pakken.
 * Mermaid zet inline styles op het <svg> element die CSS overschrijven,
 * daarom is JavaScript nodig na het renderen.
 */

function resizeMermaidSvgs() {
  const svgs = document.querySelectorAll('svg[id^="mermaid"]');
  svgs.forEach((svg) => {
    svg.style.width = '100%';
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
  });
}

if (typeof window !== 'undefined') {
  // Na initieel laden
  window.addEventListener('load', () => {
    setTimeout(resizeMermaidSvgs, 500);
    setTimeout(resizeMermaidSvgs, 1500);
  });

  // Bij navigatie (Docusaurus SPA)
  const observer = new MutationObserver(() => {
    resizeMermaidSvgs();
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
}
