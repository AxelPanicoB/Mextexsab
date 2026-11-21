import { useEffect, useRef } from 'react';

const SITEKEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

// appearance: 'always' (se ve el recuadro) o 'interaction-only' (invisible; solo aparece si Cloudflare pide
// una comprobación). El formulario corto del inicio usa la invisible para no recargar el diseño.
export default function Turnstile({ onVerify, resetKey = 0, appearance = 'always' }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!SITEKEY) return;

    // Load script once globally
    if (!document.getElementById('cf-turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      document.head.appendChild(script);
    }

    const render = () => {
      if (!window.turnstile || !containerRef.current) return;
      if (widgetIdRef.current !== null) {
        try { window.turnstile.reset(widgetIdRef.current); } catch {}
        onVerify('');
        return;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITEKEY,
        theme: 'light',
        appearance,
        callback: (token) => onVerify(token),
        'expired-callback': () => onVerify(''),
        'error-callback': () => onVerify(''),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const timer = setInterval(() => {
        if (window.turnstile) { clearInterval(timer); render(); }
      }, 150);
      return () => clearInterval(timer);
    }

    return () => {
      if (window.turnstile && widgetIdRef.current !== null) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [resetKey]);

  // Don't render anything if not configured (dev without keys)
  if (!SITEKEY) return null;
  return <div ref={containerRef} style={{ margin: appearance === 'always' ? '10px 0 2px' : 0 }} />;
}
