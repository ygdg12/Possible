import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import helvetikerBold from "three/examples/fonts/helvetiker_bold.typeface.json";

export default function LogoViewer3D({ width = "100%", height = 520 }) {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const [mode, setMode] = useState("auto");
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark"
  );

  // Keep isDark in sync whenever the theme toggles
  useEffect(() => {
    const root = document.documentElement;
    const obs = new MutationObserver(() => {
      setIsDark(root.getAttribute("data-theme") === "dark");
    });
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace    = THREE.SRGBColorSpace;
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.2;
    renderer.setClearColor(0x000000, 0); // fully transparent

    // ── Scene / Camera ────────────────────────────────────────
    const scene  = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const resize = () => {
      const w = container.clientWidth;
      const h = typeof height === "number" ? height : container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    // ── Geometry — plain "P" via TextGeometry ─────────────────
    const font = new FontLoader().parse(helvetikerBold);
    const geo  = new TextGeometry("P", {
      font,
      size:           2.6,
      depth:          0.55,
      curveSegments:  64,
      bevelEnabled:   true,
      bevelThickness: 0.07,
      bevelSize:      0.05,
      bevelOffset:    0,
      bevelSegments:  24,
    });
    geo.center();
    geo.computeVertexNormals();

    // ── Material — pure glossy black ──────────────────────────
    const mat = new THREE.MeshPhysicalMaterial({
      color:              "#000000",
      metalness:          0.0,
      roughness:          0.0,
      clearcoat:          1.0,
      clearcoatRoughness: 0.01,
      reflectivity:       1.0,
      sheen:              0.0,
      ior:                1.8,
      envMapIntensity:    6,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // ── Environment ───────────────────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // ── Lights ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.05));

    const addLight = (x, y, z, intensity, color = 0xffffff) => {
      const l = new THREE.DirectionalLight(color, intensity);
      l.position.set(x, y, z);
      scene.add(l);
    };
    addLight(-4, 10,  9, 16);          // main key
    addLight( 6,  1,  7, 10);          // fill right
    addLight( 0, -6, -5,  8);          // rim bottom
    addLight(-2, 16,  2, 14);          // top fill
    addLight( 3,  2, 10, 20, 0xeef4ff); // hot specular front

    // ── Rotation state ────────────────────────────────────────
    let rxCur = 0.02, ryCur = -0.18;
    let rxTgt = rxCur, ryTgt = ryCur;
    let t = 0;
    const stateRef = { mode };

    // ── Cursor tracking ───────────────────────────────────────
    const onMouseMove = (e) => {
      if (stateRef.mode !== "follow") return;
      const nx = (e.clientX / window.innerWidth)  * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      ryTgt =  nx * 0.9;
      rxTgt = -ny * 0.45;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ────────────────────────────────────────
    const lerp  = (a, b, k) => a + (b - a) * k;
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t  += 0.016;

      if (stateRef.mode === "auto") {
        ryTgt += 0.004;
        rxTgt  = 0.02 + Math.sin(t * 0.35) * 0.02;
      }

      const speed = stateRef.mode === "follow" ? 0.06 : 0.04;
      rxCur = lerp(rxCur, rxTgt, speed);
      ryCur = lerp(ryCur, ryTgt, speed);

      mesh.rotation.x = rxCur * (stateRef.mode === "follow" ? 1 : 0.35);
      mesh.rotation.y = ryCur;
      mesh.rotation.z = 0;
      mesh.position.y = Math.sin(t * 0.4) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    // ── Click — toggle mode ───────────────────────────────────
    const onClick = () => {
      setMode(prev => {
        const next      = prev === "auto" ? "follow" : "auto";
        stateRef.mode   = next;
        if (next === "auto") { ryTgt = ryCur; rxTgt = rxCur; }
        return next;
      });
    };
    canvas.addEventListener("click", onClick);

    // ── Resize observer ───────────────────────────────────────
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      ro.disconnect();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height: typeof height === "number" ? height : height,
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", cursor: mode === "follow" ? "none" : "grab" }}
      />

      {/* Mode hint badge — theme-aware */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: isDark
          ? "rgba(255,255,255,0.07)"
          : "rgba(0,0,0,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(0,0,0,0.10)",
        borderRadius: 999,
        padding: "7px 18px",
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        boxShadow: isDark
          ? "0 4px 16px rgba(0,0,0,0.3)"
          : "0 2px 12px rgba(0,0,0,0.08)",
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
          background: mode === "follow" ? "#10b981" : "#7c3aed",
          boxShadow: mode === "follow" ? "0 0 8px #10b981" : "0 0 8px #7c3aed",
        }} />
        <span style={{
          fontSize: 11,
          color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.60)",
          letterSpacing: "0.06em",
          fontWeight: 500,
        }}>
          {mode === "follow" ? "Following cursor · click to release" : "Click to follow cursor"}
        </span>
      </div>
    </div>
  );
}