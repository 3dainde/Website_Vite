import React, { useRef, useState } from 'react';
import './HeroCube.css';

// Hypercube 3D en CSS : 26 cubes de verre (3 x 3 x 3 sans le cœur),
// qui s'écartent au survol, et des orbites fixes parcourues par des électrons.

const POSITIONS = [];
for (let x = -1; x <= 1; x += 1) {
  for (let y = -1; y <= 1; y += 1) {
    for (let z = -1; z <= 1; z += 1) {
      if (x || y || z) POSITIONS.push([x, y, z]);
    }
  }
}

const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];

const ORBITS = [
  { tilt: 'rotateX(72deg) rotateY(-18deg)', size: 1, speed: 9, electron: 'cube' },
  { tilt: 'rotateX(64deg) rotateY(38deg)', size: 1.12, speed: 13, electron: 'dot', reverse: true },
  { tilt: 'rotateY(78deg) rotateX(-22deg)', size: 1.22, speed: 17, electron: 'dot' },
  { tilt: 'rotateX(84deg) rotateY(6deg)', size: 1.34, speed: 23, electron: 'cube', reverse: true },
];

function Cube({ className = 'hc-cube', style }) {
  return (
    <div className={className} style={style}>
      {FACES.map((f) => (
        <span key={f} className={`hc-face hc-face--${f}`} />
      ))}
    </div>
  );
}

export default function HeroCube({ label }) {
  const sceneRef = useRef(null);
  const [exploded, setExploded] = useState(false);

  // Le bloc s'incline légèrement vers la souris.
  const onPointerMove = (e) => {
    const el = sceneRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const onPointerLeave = () => {
    const el = sceneRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
    setExploded(false);
  };

  return (
    <div
      ref={sceneRef}
      className={`hc-scene${exploded ? ' is-exploded' : ''}`}
      role="img"
      aria-label={label}
      onPointerEnter={(e) => e.pointerType !== 'touch' && setExploded(true)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={() => setExploded((v) => !v)}
    >
      <div className="hc-glow" aria-hidden="true" />
      <div className="hc-world" aria-hidden="true">
        <div className="hc-spin">
          <div className="hc-cluster">
            {POSITIONS.map(([x, y, z]) => (
              <Cube key={`${x}${y}${z}`} style={{ '--x': x, '--y': y, '--z': z }} />
            ))}
          </div>

          {ORBITS.map((o, i) => (
            <div key={i} className="hc-orbit" style={{ '--o-size': o.size, transform: `translate(-50%, -50%) ${o.tilt}` }}>
              <div
                className="hc-orbit-track"
                style={{ animationDuration: `${o.speed}s`, animationDirection: o.reverse ? 'reverse' : 'normal' }}
              >
                {o.electron === 'cube' ? (
                  <div className="hc-electron hc-electron--cube">
                    <Cube className="hc-mini" />
                  </div>
                ) : (
                  <div className="hc-electron hc-electron--dot" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
