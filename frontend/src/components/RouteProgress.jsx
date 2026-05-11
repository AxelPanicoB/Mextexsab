import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function RouteProgress() {
  const location = useLocation();
  const [phase, setPhase] = useState('hidden'); // hidden | in | out
  const t1 = useRef(null);
  const t2 = useRef(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    clearTimeout(t1.current);
    clearTimeout(t2.current);

    setPhase('in');
    t1.current = setTimeout(() => setPhase('out'), 480);
    t2.current = setTimeout(() => setPhase('hidden'), 820);

    return () => {
      clearTimeout(t1.current);
      clearTimeout(t2.current);
    };
  }, [location.pathname]);

  if (phase === 'hidden') return null;

  return (
    <div className={`page-loader${phase === 'out' ? ' page-loader--out' : ''}`}>
      <div className="page-loader__stage">
        <div className="page-loader__ring pl-ring-1" />
        <div className="page-loader__ring pl-ring-2" />
        <div className="page-loader__ring pl-ring-3" />

        <div className="page-loader__orbit pl-orbit-1">
          <span className="page-loader__dot" />
        </div>
        <div className="page-loader__orbit pl-orbit-2">
          <span className="page-loader__dot pl-dot--md" />
        </div>
        <div className="page-loader__orbit pl-orbit-3a">
          <span className="page-loader__dot" />
        </div>
        <div className="page-loader__orbit pl-orbit-3b">
          <span className="page-loader__dot" />
        </div>

        <div className="page-loader__badge">
          <img src={`${BASE}img/logo(1).png`} alt="Metexsab" />
        </div>
      </div>
    </div>
  );
}

export default RouteProgress;
