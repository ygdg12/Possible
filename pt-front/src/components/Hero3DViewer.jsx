import { useEffect, useRef } from "react";

export default function Hero3DViewer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animId;
    let t = 0;

    // ── Particles ──────────────────────────────────────────────────────────
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.3 + 0.08,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    // ── 3-D projection helpers ─────────────────────────────────────────────
    const FOV = 420;
    function project(x, y, z) {
      const scale = FOV / (FOV + z);
      return { x: x * scale, y: y * scale, scale };
    }

    // Build a unit-cube vertex list (side = 1, centred at origin)
    const S = 110; // half-size
    const rawVerts = [
      [-S,-S,-S],[ S,-S,-S],[ S, S,-S],[-S, S,-S], // back face
      [-S,-S, S],[ S,-S, S],[ S, S, S],[-S, S, S], // front face
    ];

    // Cube faces (vertex indices)
    const faces = [
      { idx:[0,1,2,3], label:"back"   },
      { idx:[4,5,6,7], label:"front"  },
      { idx:[0,1,5,4], label:"bottom" },
      { idx:[2,3,7,6], label:"top"    },
      { idx:[0,3,7,4], label:"left"   },
      { idx:[1,2,6,5], label:"right"  },
    ];

    // ── Orbit rings config ─────────────────────────────────────────────────
    const rings = [
      { rx: 0.3,  ry: 0,    rz: 0,    radius: 170, speed: 0.6,  phase: 0     },
      { rx: 1.1,  ry: 0.4,  rz: 0.2,  radius: 200, speed: -0.4, phase: 2.1   },
      { rx: 0.5,  ry: 1.2,  rz: 0.8,  radius: 145, speed: 0.9,  phase: 1.0   },
    ];

    function rotX(p, a) {
      const [x,y,z] = p;
      return [x, y*Math.cos(a)-z*Math.sin(a), y*Math.sin(a)+z*Math.cos(a)];
    }
    function rotY(p, a) {
      const [x,y,z] = p;
      return [x*Math.cos(a)+z*Math.sin(a), y, -x*Math.sin(a)+z*Math.cos(a)];
    }
    function rotZ(p, a) {
      const [x,y,z] = p;
      return [x*Math.cos(a)-y*Math.sin(a), x*Math.sin(a)+y*Math.cos(a), z];
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      t += 0.008;

      // ── Particles ────────────────────────────────────────────────────────
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4 || p.x > W + 4) { p.x = Math.random() * W; }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Ground glow ──────────────────────────────────────────────────────
      const glow = ctx.createRadialGradient(cx, cy + 150, 0, cx, cy + 150, 160);
      glow.addColorStop(0, "rgba(255,255,255,0.07)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 150, 150, 30, 0, 0, Math.PI * 2);
      ctx.fill();

      // ── Rotating cube ────────────────────────────────────────────────────
      const ay = t * 0.7;
      const ax = t * 0.35;
      const az = t * 0.15;

      const verts3d = rawVerts.map(v => {
        let p = rotX(v, ax);
        p = rotY(p, ay);
        p = rotZ(p, az);
        return p;
      });

      const proj = verts3d.map(([x,y,z]) => {
        const { x: px, y: py, scale } = project(x, y, z);
        return { x: cx + px, y: cy + py, z, scale };
      });

      // Sort faces back-to-front by average Z
      const sortedFaces = faces.map(f => {
        const avgZ = f.idx.reduce((s, i) => s + verts3d[i][2], 0) / 4;
        return { ...f, avgZ };
      }).sort((a, b) => a.avgZ - b.avgZ);

      sortedFaces.forEach(({ idx, avgZ }) => {
        const pts = idx.map(i => proj[i]);

        // Normal-based light
        const brightness = Math.max(0, Math.min(1, (avgZ + S) / (2 * S)));
        const alpha = 0.72 + brightness * 0.18;
        const edgeAlpha = 0.55 + brightness * 0.45;

        // Face fill — dark charcoal to black
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.closePath();

        const grad = ctx.createLinearGradient(
          pts[0].x, pts[0].y, pts[2].x, pts[2].y
        );
        const dark = `rgba(8,8,8,${alpha})`;
        const mid  = `rgba(28,28,28,${alpha * 0.85})`;
        grad.addColorStop(0, dark);
        grad.addColorStop(0.5, mid);
        grad.addColorStop(1, dark);
        ctx.fillStyle = grad;
        ctx.fill();

        // Edge glow
        ctx.strokeStyle = `rgba(200,200,200,${edgeAlpha * 0.55})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();

        // Corner dots
        pts.forEach(pt => {
          ctx.save();
          ctx.globalAlpha = edgeAlpha * 0.7;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      });

      // ── Orbit rings ──────────────────────────────────────────────────────
      rings.forEach(ring => {
        const angle = t * ring.speed + ring.phase;
        const segments = 80;
        const pts2d = [];

        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          let p = [ring.radius * Math.cos(a), ring.radius * Math.sin(a), 0];
          p = rotX(p, ring.rx);
          p = rotY(p, ring.ry + angle);
          p = rotZ(p, ring.rz);
          const pr = project(p[0], p[1], p[2]);
          const opacity = Math.max(0, (p[2] + ring.radius) / (2 * ring.radius));
          pts2d.push({ x: cx + pr.x, y: cy + pr.y, opacity });
        }

        // Draw ring as polyline with fading opacity per segment
        for (let i = 0; i < pts2d.length - 1; i++) {
          const p1 = pts2d[i];
          const p2 = pts2d[i + 1];
          const op = (p1.opacity + p2.opacity) / 2;
          ctx.save();
          ctx.globalAlpha = op * 0.55;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.restore();
        }

        // Glowing dot traveling the ring
        const dotAngle = t * ring.speed * 3 + ring.phase;
        let dp = [ring.radius * Math.cos(dotAngle), ring.radius * Math.sin(dotAngle), 0];
        dp = rotX(dp, ring.rx);
        dp = rotY(dp, ring.ry + angle);
        dp = rotZ(dp, ring.rz);
        const dpr = project(dp[0], dp[1], dp[2]);
        const dotOp = Math.max(0, (dp[2] + ring.radius) / (2 * ring.radius));
        ctx.save();
        ctx.globalAlpha = dotOp * 0.9;
        const dg = ctx.createRadialGradient(cx + dpr.x, cy + dpr.y, 0, cx + dpr.x, cy + dpr.y, 6);
        dg.addColorStop(0, "rgba(255,255,255,1)");
        dg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = dg;
        ctx.beginPath();
        ctx.arc(cx + dpr.x, cy + dpr.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Centre glow behind cube ───────────────────────────────────────────
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      cg.addColorStop(0, "rgba(255,255,255,0.04)");
      cg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="hero3d-wrap">
      <canvas ref={canvasRef} className="hero3d-canvas" />
      {/* Corner decoration lines */}
      <div className="hero3d-corner hero3d-corner--tl" />
      <div className="hero3d-corner hero3d-corner--tr" />
      <div className="hero3d-corner hero3d-corner--bl" />
      <div className="hero3d-corner hero3d-corner--br" />
      {/* Label */}
      <div className="hero3d-label">
        <span className="hero3d-dot" />
        3D ENGINE · LIVE
      </div>
    </div>
  );
}
