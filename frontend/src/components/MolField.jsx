// Campo animado de moléculas y puntos brillantes que va detrás del texto de los banners
// (Inicio y Nosotros). Es decorativo: no recibe clics y se oculta a los lectores de pantalla.
function MolField() {
  return (
    <div className="unified-mol-field" aria-hidden="true">
      <svg className="m-svg m-svg-1" viewBox="0 0 80 92" fill="none">
        <polygon points="40,3 77,23 77,69 40,89 3,69 3,23" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5"/>
        <circle cx="40" cy="46" r="5" fill="rgba(92,184,69,0.12)"/>
        <circle cx="40" cy="3"  r="3" fill="rgba(119,208,105,0.2)"/>
        <circle cx="77" cy="23" r="3" fill="rgba(119,208,105,0.15)"/>
        <circle cx="77" cy="69" r="3" fill="rgba(119,208,105,0.15)"/>
        <circle cx="40" cy="89" r="3" fill="rgba(119,208,105,0.2)"/>
        <circle cx="3"  cy="69" r="3" fill="rgba(119,208,105,0.12)"/>
        <circle cx="3"  cy="23" r="3" fill="rgba(119,208,105,0.12)"/>
      </svg>
      <svg className="m-svg m-svg-2" viewBox="0 0 130 50" fill="none">
        <circle cx="12" cy="25" r="9"  stroke="rgba(119,208,105,0.15)" strokeWidth="1.3"/>
        <line x1="21" y1="22" x2="37" y2="14" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/>
        <line x1="21" y1="28" x2="37" y2="36" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/>
        <circle cx="44" cy="11" r="7"  stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
        <circle cx="44" cy="39" r="7"  stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
        <line x1="51" y1="11" x2="73" y2="25" stroke="rgba(119,208,105,0.1)"  strokeWidth="1"/>
        <line x1="51" y1="39" x2="73" y2="25" stroke="rgba(119,208,105,0.1)"  strokeWidth="1"/>
        <circle cx="79" cy="25" r="9"  stroke="rgba(119,208,105,0.15)" strokeWidth="1.3"/>
        <line x1="88" y1="25" x2="108" y2="25" stroke="rgba(119,208,105,0.12)" strokeWidth="1.5"/>
        <line x1="88" y1="21" x2="108" y2="21" stroke="rgba(119,208,105,0.08)" strokeWidth="1"/>
        <circle cx="115" cy="25" r="7"  stroke="rgba(119,208,105,0.1)"  strokeWidth="1"/>
      </svg>
      <svg className="m-svg m-svg-3" viewBox="0 0 56 64" fill="none">
        <polygon points="28,2 54,16 54,48 28,62 2,48 2,16" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
        <circle cx="28" cy="32" r="5" fill="none" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
        <circle cx="28" cy="32" r="2" fill="rgba(92,184,69,0.2)"/>
      </svg>
      <svg className="m-svg m-svg-4" viewBox="0 0 70 70" fill="none">
        <circle cx="35" cy="35" r="31" stroke="rgba(119,208,105,0.06)" strokeWidth="1" strokeDasharray="5 5"/>
        <circle cx="35" cy="35" r="10" stroke="rgba(119,208,105,0.16)" strokeWidth="1.5"/>
        <circle cx="35" cy="4"  r="3.5" fill="rgba(92,184,69,0.15)"/>
        <circle cx="66" cy="35" r="3.5" fill="rgba(92,184,69,0.10)"/>
        <circle cx="35" cy="66" r="3.5" fill="rgba(92,184,69,0.12)"/>
        <circle cx="4"  cy="35" r="3.5" fill="rgba(92,184,69,0.08)"/>
        <line x1="35" y1="7"  x2="35" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/>
        <line x1="63" y1="35" x2="45" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/>
        <line x1="35" y1="63" x2="35" y2="45" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/>
        <line x1="7"  y1="35" x2="25" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/>
      </svg>
      <svg className="m-svg m-svg-5" viewBox="0 0 50 58" fill="none">
        <polygon points="25,2 48,14 48,44 25,56 2,44 2,14" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5"/>
        <circle cx="25" cy="29" r="2.5" fill="rgba(92,184,69,0.25)"/>
      </svg>
      <svg className="m-svg m-svg-6" viewBox="0 0 60 52" fill="none">
        <polygon points="30,2 58,50 2,50" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2"/>
        <circle cx="30" cy="2"  r="3" fill="rgba(92,184,69,0.18)"/>
        <circle cx="58" cy="50" r="3" fill="rgba(92,184,69,0.12)"/>
        <circle cx="2"  cy="50" r="3" fill="rgba(92,184,69,0.12)"/>
      </svg>
      <svg className="m-svg m-svg-7" viewBox="0 0 70 80" fill="none">
        <polygon points="35,3 67,20 67,60 35,77 3,60 3,20" stroke="rgba(119,208,105,0.16)" strokeWidth="1.4"/>
        <circle cx="35" cy="40" r="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
      </svg>
      <svg className="m-svg m-svg-8" viewBox="0 0 100 30" fill="none">
        <circle cx="15" cy="15" r="10" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
        <line x1="25" y1="11" x2="75" y2="11" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
        <line x1="25" y1="19" x2="75" y2="19" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
        <circle cx="85" cy="15" r="10" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
      </svg>
      <svg className="m-svg m-svg-9" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="5" fill="rgba(92,184,69,0.20)"/>
        <ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
        <ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.10)" strokeWidth="1" transform="rotate(60 30 30)"/>
        <ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.08)" strokeWidth="1" transform="rotate(120 30 30)"/>
      </svg>
      <svg className="m-svg m-svg-10" viewBox="0 0 40 80" fill="none">
        <path d="M20,5 C35,22 5,42 20,57 C35,72 5,80 20,80" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2" fill="none"/>
        <circle cx="20" cy="5"  r="3" fill="rgba(92,184,69,0.15)"/>
        <circle cx="20" cy="57" r="3" fill="rgba(92,184,69,0.12)"/>
      </svg>
      <svg className="m-svg m-svg-11" viewBox="0 0 60 60" fill="none">
        <line x1="30" y1="5"  x2="30" y2="55" stroke="rgba(119,208,105,0.13)" strokeWidth="1.5"/>
        <line x1="5"  y1="30" x2="55" y2="30" stroke="rgba(119,208,105,0.13)" strokeWidth="1.5"/>
        <circle cx="30" cy="30" r="6" fill="rgba(92,184,69,0.15)"/>
        <circle cx="30" cy="5"  r="3" fill="rgba(92,184,69,0.10)"/>
        <circle cx="30" cy="55" r="3" fill="rgba(92,184,69,0.10)"/>
        <circle cx="5"  cy="30" r="3" fill="rgba(92,184,69,0.10)"/>
        <circle cx="55" cy="30" r="3" fill="rgba(92,184,69,0.10)"/>
      </svg>
      <svg className="m-svg m-svg-12" viewBox="0 0 60 58" fill="none">
        <polygon points="30,2 58,22 48,54 12,54 2,22" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
        <circle cx="30" cy="28" r="4" fill="rgba(92,184,69,0.14)"/>
      </svg>
      <svg className="m-svg m-svg-13" viewBox="0 0 40 46" fill="none">
        <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" stroke="rgba(119,208,105,0.20)" strokeWidth="1.8"/>
      </svg>
      <svg className="m-svg m-svg-14" viewBox="0 0 80 40" fill="none">
        <circle cx="10" cy="20" r="7" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
        <line x1="17" y1="14" x2="33" y2="8"  stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
        <circle cx="40" cy="6"  r="6" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
        <line x1="46" y1="10" x2="62" y2="20" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
        <circle cx="70" cy="22" r="7" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
      </svg>
      <svg className="m-svg m-svg-15" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="7" stroke="rgba(119,208,105,0.16)" strokeWidth="1.3"/>
        <line x1="25" y1="4"  x2="25" y2="18" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
        <line x1="46" y1="25" x2="32" y2="25" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
        <line x1="25" y1="46" x2="25" y2="32" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
        <line x1="4"  y1="25" x2="18" y2="25" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
        <circle cx="25" cy="4"  r="2.5" fill="rgba(92,184,69,0.15)"/>
        <circle cx="46" cy="25" r="2.5" fill="rgba(92,184,69,0.12)"/>
        <circle cx="25" cy="46" r="2.5" fill="rgba(92,184,69,0.12)"/>
        <circle cx="4"  cy="25" r="2.5" fill="rgba(92,184,69,0.10)"/>
      </svg>
      <svg className="m-svg m-svg-16" viewBox="0 0 70 45" fill="none">
        <circle cx="22" cy="22" r="18" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/>
        <circle cx="22" cy="22" r="5"  fill="rgba(92,184,69,0.12)"/>
        <line x1="40" y1="22" x2="65" y2="22" stroke="rgba(119,208,105,0.10)" strokeWidth="1.5"/>
        <circle cx="65" cy="22" r="4" fill="rgba(92,184,69,0.14)"/>
      </svg>
      <svg className="m-svg m-svg-17" viewBox="0 0 110 64" fill="none">
        <polygon points="28,2 54,16 54,48 28,62 2,48 2,16"    stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
        <polygon points="82,2 108,16 108,48 82,62 56,48 56,16" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
      </svg>
      <svg className="m-svg m-svg-18" viewBox="0 0 50 44" fill="none">
        <polygon points="25,2 48,42 2,42" stroke="rgba(119,208,105,0.16)" strokeWidth="1.4"/>
        <circle cx="25" cy="22" r="3" fill="rgba(92,184,69,0.18)"/>
      </svg>
      <svg className="m-svg m-svg-19" viewBox="0 0 55 55" fill="none">
        <circle cx="27" cy="10" r="8" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2"/>
        <circle cx="10" cy="42" r="8" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/>
        <circle cx="45" cy="42" r="8" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/>
        <line x1="22" y1="17" x2="15" y2="35" stroke="rgba(119,208,105,0.09)" strokeWidth="1"/>
        <line x1="32" y1="17" x2="40" y2="35" stroke="rgba(119,208,105,0.09)" strokeWidth="1"/>
        <line x1="18" y1="42" x2="37" y2="42" stroke="rgba(119,208,105,0.08)" strokeWidth="1"/>
      </svg>
      <svg className="m-svg m-svg-20" viewBox="0 0 120 28" fill="none">
        <circle cx="10"  cy="14" r="8" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2"/>
        <line x1="18"  y1="14" x2="38"  y2="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1.2"/>
        <circle cx="46"  cy="14" r="7" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/>
        <line x1="53"  y1="14" x2="73"  y2="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1.2"/>
        <circle cx="81"  cy="14" r="7" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/>
        <line x1="88"  y1="14" x2="108" y2="14" stroke="rgba(119,208,105,0.09)" strokeWidth="1.2"/>
        <circle cx="113" cy="14" r="6" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
      </svg>
      <div className="m-dot m-dot-1"/><div className="m-dot m-dot-2"/><div className="m-dot m-dot-3"/>
      <div className="m-dot m-dot-4"/><div className="m-dot m-dot-5"/><div className="m-dot m-dot-6"/>
      <div className="m-dot m-dot-7"/><div className="m-dot m-dot-8"/>
    </div>
  );
}

export default MolField;
