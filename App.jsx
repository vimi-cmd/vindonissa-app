import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home, Grid2X2, CalendarDays, User, FileText, Camera,
  RotateCcw, Check, Bell, Menu, ArrowLeft, ChevronRight,
  ShieldCheck, ScanLine, DoorOpen, Smartphone, SlidersHorizontal
} from "lucide-react";

const gold = "#d3b56f";
const dark = "#111111";
const cream = "#f7f3ea";

const products = [
  { id: "spannrahmen", label: "Spannrahmen", price: 320, icon: Grid2X2 },
  { id: "drehrahmen", label: "Drehrahmen", price: 560, icon: DoorOpen },
  { id: "schiebetuer", label: "Schiebetür", price: 890, icon: SlidersHorizontal },
  { id: "plissee", label: "Plissee", price: 740, icon: Grid2X2 },
  { id: "rollo", label: "Rollo", price: 430, icon: Smartphone },
];

const colors = [
  { name: "Anthrazitgrau", ral: "RAL 7016", value: "#25282a" },
  { name: "Weiss", ral: "RAL 9016", value: "#eeeae0" },
  { name: "Schwarz", ral: "RAL 9005", value: "#050505" },
  { name: "Bronze", ral: "Sonderfarbe", value: "#9a856d" },
];

function IconButton({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} style={styles.quickCard}>
      <Icon size={22} color="#a98745" />
      <span style={styles.quickLabel}>{label}</span>
    </button>
  );
}

function Phone({ children, black = false }) {
  return (
    <div style={styles.phoneOuter}>
      <div style={{ ...styles.phoneInner, background: black ? "#0f0f0f" : cream, color: black ? "white" : "#111" }}>
        <div style={styles.notch}></div>
        <div style={styles.status}>
          <b>9:41</b><span>● ● ●</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div style={{ textAlign: "center" }}>
      <ShieldCheck size={54} color={gold} />
      <div style={{ letterSpacing: 8, fontSize: 24, fontFamily: "Georgia", marginTop: 12 }}>VINDONISSA</div>
      <div style={{ letterSpacing: 8, color: gold, fontSize: 13, marginTop: 5 }}>HOME</div>
    </div>
  );
}

function Welcome({ go }) {
  return (
    <Phone black>
      <div style={styles.welcomeBg}></div>
      <div style={styles.welcome}>
        <Logo />
        <div>
          <h1 style={styles.welcomeTitle}>Herzlich willkommen bei <span style={{ color: gold }}>Vindonissa Home</span></h1>
          <p style={styles.mutedDark}>Ihr Zuhause. Geschützt. Insektenfrei. Mit Stil.</p>
          <button style={styles.goldButton} onClick={() => go("home")}>Los geht’s</button>
          <button style={styles.linkButton} onClick={() => go("home")}>Anmelden</button>
        </div>
      </div>
    </Phone>
  );
}

function Header({ title, back, go }) {
  return (
    <div style={styles.header}>
      {back ? <ArrowLeft onClick={() => go("home")} style={{ cursor: "pointer" }} /> : <Menu />}
      <b>{title}</b>
      {back ? <ScanLine /> : <Bell />}
    </div>
  );
}

function BottomNav({ go }) {
  const items = [
    ["Home", Home, "home"],
    ["Produkte", Grid2X2, "config"],
    ["Anfragen", FileText, "offers"],
    ["Termine", CalendarDays, "appointments"],
    ["Profil", User, "portal"],
  ];
  return (
    <div style={styles.nav}>
      {items.map(([label, Icon, page]) => (
        <button key={label} onClick={() => go(page)} style={styles.navItem}>
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function Dashboard({ go }) {
  return (
    <Phone>
      <Header title="" go={go} />
      <main style={styles.page}>
        <p style={styles.smallMuted}>Guten Morgen</p>
        <h1 style={styles.h1}>Willkommen zurück!</h1>

        <div style={styles.hero}>
          <h2>Insektenfrei geniessen, jeden Tag.</h2>
          <button style={styles.heroButton} onClick={() => go("offers")}>Offerte anfragen →</button>
        </div>

        <h3>Schnellzugriff</h3>
        <div style={styles.quickGrid}>
          <IconButton icon={Grid2X2} label="Produkte konfigurieren" onClick={() => go("config")} />
          <IconButton icon={ScanLine} label="AR-Vorschau" onClick={() => go("ar")} />
          <IconButton icon={CalendarDays} label="Montage-Termin buchen" onClick={() => go("appointments")} />
          <IconButton icon={Smartphone} label="Smart-Home Steuerung" onClick={() => go("smart")} />
          <IconButton icon={FileText} label="Meine Offerten" onClick={() => go("offers")} />
          <IconButton icon={User} label="Kundenportal" onClick={() => go("portal")} />
        </div>

        <h3>Meine Projekte</h3>
        <button style={styles.project} onClick={() => go("config")}>
          <div style={styles.projectImg}></div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <b>Terrassentür Wohnzimmer</b>
            <p style={styles.smallMuted}>Plissee Schiebetür</p>
            <span style={styles.badge}>Angebot erstellt</span>
          </div>
          <ChevronRight />
        </button>
      </main>
      <BottomNav go={go} />
    </Phone>
  );
}

function Configurator({ go }) {
  const [product, setProduct] = useState(products[1]);
  const [color, setColor] = useState(colors[0]);
  const [w, setW] = useState(1200);
  const [h, setH] = useState(2400);
  const price = useMemo(() => Math.round(product.price + (w * h) / 14000), [product, w, h]);

  return (
    <Phone>
      <Header title="Produkt konfigurieren" back go={go} />
      <main style={styles.page}>
        <div style={styles.productTabs}>
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <button key={p.id} onClick={() => setProduct(p)} style={{ ...styles.productTab, borderColor: product.id === p.id ? gold : "#eee" }}>
                <Icon size={20} color="#a98745" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        <div style={styles.windowWrap}>
          <div style={{ ...styles.windowFrame, borderColor: color.value }}>
            <div style={styles.mesh}></div>
          </div>
          <div style={{ ...styles.openFrame, borderColor: color.value }}>
            <div style={styles.mesh}></div>
          </div>
        </div>

        <h4>Farbe Rahmen</h4>
        <div style={styles.colorRow}>
          {colors.map((c) => (
            <button key={c.name} onClick={() => setColor(c)} style={{
              ...styles.colorDot,
              background: c.value,
              outline: color.name === c.name ? `3px solid ${gold}` : "none",
            }} />
          ))}
          <div style={{ marginLeft: "auto", textAlign: "right", fontSize: 12 }}>
            <b>{color.name}</b><br /><span style={styles.smallMuted}>{color.ral}</span>
          </div>
        </div>

        <div style={styles.option}>
          <div style={styles.circle}></div>
          <div style={{ flex: 1 }}>
            <b>Transpatec</b>
            <p style={{ ...styles.smallMuted, margin: 0 }}>Optimale Durchsicht</p>
          </div>
          <ChevronRight />
        </div>

        <h4>Masse</h4>
        <label style={styles.inputRow}>Breite
          <input value={w} onChange={(e) => setW(Number(e.target.value) || 0)} /> mm
        </label>
        <label style={styles.inputRow}>Höhe
          <input value={h} onChange={(e) => setH(Number(e.target.value) || 0)} /> mm
        </label>
      </main>

      <div style={styles.priceBar}>
        <div><small>Preis inkl. MwSt.</small><br /><b>CHF {price}.00</b></div>
        <button style={styles.goldSmall} onClick={() => go("ar")}>Speichern & weiter</button>
      </div>
    </Phone>
  );
}

function ARPreview({ go }) {
  return (
    <Phone>
      <Header title="AR-Vorschau" back go={go} />
      <main style={styles.ar}>
        <div style={styles.arWindow}><div style={styles.mesh}></div></div>
        <div style={styles.arTools}>3D<br /><br />Licht</div>
        <div style={styles.arActions}>
          <div><Camera /><small>Foto</small></div>
          <button style={styles.place}><Check size={34} /></button>
          <div><RotateCcw /><small>Reset</small></div>
        </div>
        <div style={styles.arCard}>
          <div style={styles.productMini}></div>
          <div><b>Drehrahmen</b><p style={styles.smallMuted}>1200 × 2400 mm<br />Anthrazitgrau · Transpatec</p></div>
          <ChevronRight />
        </div>
      </main>
    </Phone>
  );
}

function SimplePage({ title, go }) {
  return (
    <Phone>
      <Header title={title} back go={go} />
      <main style={styles.page}>
        <div style={styles.simpleCard}>
          <h1>{title}</h1>
          <p>Dieser Bereich ist vorbereitet und kann als nächstes mit echten Formularen, Kundendaten, Terminen und E-Mail-Versand verbunden werden.</p>
          <button style={styles.goldSmall}>Weiter</button>
        </div>
      </main>
      <BottomNav go={go} />
    </Phone>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  return (
    <div style={styles.app}>
      {screen === "welcome" && <Welcome go={setScreen} />}
      {screen === "home" && <Dashboard go={setScreen} />}
      {screen === "config" && <Configurator go={setScreen} />}
      {screen === "ar" && <ARPreview go={setScreen} />}
      {screen === "offers" && <SimplePage title="Meine Offerten" go={setScreen} />}
      {screen === "appointments" && <SimplePage title="Montage-Termine" go={setScreen} />}
      {screen === "portal" && <SimplePage title="Kundenportal" go={setScreen} />}
      {screen === "smart" && <SimplePage title="Smart-Home Steuerung" go={setScreen} />}
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "#e9e5dc", display: "flex", justifyContent: "center", alignItems: "center", padding: 24, fontFamily: "Inter, Arial, sans-serif" },
  phoneOuter: { width: 375, height: 760, background: "#050505", borderRadius: 48, padding: 10, boxShadow: "0 28px 80px rgba(0,0,0,.35)" },
  phoneInner: { height: "100%", borderRadius: 38, overflow: "hidden", position: "relative" },
  notch: { position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 95, height: 26, borderRadius: 20, background: "#000", zIndex: 5 },
  status: { height: 48, display: "flex", alignItems: "end", justifyContent: "space-between", padding: "0 28px 8px", fontSize: 12 },
  welcomeBg: { position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 20%, rgba(211,181,111,.22), transparent 30%), radial-gradient(circle at 90% 80%, rgba(211,181,111,.18), transparent 35%)" },
  welcome: { position: "relative", height: 690, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 30px 35px" },
  welcomeTitle: { fontSize: 30, lineHeight: 1.15 },
  mutedDark: { color: "#cfcfcf", lineHeight: 1.6 },
  goldButton: { width: "100%", background: gold, color: "#000", border: 0, borderRadius: 14, padding: 16, fontWeight: 800 },
  linkButton: { width: "100%", background: "transparent", color: gold, border: 0, padding: 18, fontWeight: 700 },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 22px 15px" },
  page: { padding: "0 22px 90px", height: 620, overflowY: "auto" },
  smallMuted: { color: "#777", fontSize: 12 },
  h1: { marginTop: 0, fontSize: 26 },
  hero: { background: "linear-gradient(135deg,#171717,#77705f)", color: "white", borderRadius: 20, padding: 22, height: 145, margin: "18px 0", boxShadow: "0 12px 25px rgba(0,0,0,.12)" },
  heroButton: { background: gold, border: 0, borderRadius: 12, padding: "12px 16px", fontWeight: 800 },
  quickGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 },
  quickCard: { background: "white", border: "1px solid #eee", borderRadius: 18, padding: 12, height: 92, textAlign: "left", boxShadow: "0 4px 12px rgba(0,0,0,.05)" },
  quickLabel: { display: "block", marginTop: 14, fontSize: 11, fontWeight: 700 },
  project: { width: "100%", display: "flex", alignItems: "center", gap: 12, background: "white", border: "1px solid #eee", borderRadius: 18, padding: 12 },
  projectImg: { width: 70, height: 58, borderRadius: 12, background: "linear-gradient(135deg,#ddd,#333)" },
  badge: { background: "#efe3c5", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 },
  nav: { position: "absolute", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #ddd", display: "grid", gridTemplateColumns: "repeat(5,1fr)", padding: "10px 4px 13px" },
  navItem: { background: "none", border: 0, fontSize: 10, color: "#666", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  productTabs: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 },
  productTab: { minWidth: 82, background: "white", border: "1px solid #eee", borderRadius: 14, padding: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700 },
  windowWrap: { position: "relative", height: 240, display: "flex", justifyContent: "center", alignItems: "center" },
  windowFrame: { width: 135, height: 205, border: "10px solid", background: "#f4f4f4", position: "relative", boxShadow: "0 16px 35px rgba(0,0,0,.16)" },
  openFrame: { position: "absolute", right: 70, width: 95, height: 205, border: "10px solid", background: "rgba(255,255,255,.4)", transform: "skewY(-4deg)" },
  mesh: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg,rgba(0,0,0,.08) 1px, transparent 1px),linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px)", backgroundSize: "7px 7px" },
  colorRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  colorDot: { width: 32, height: 32, borderRadius: 999, border: "2px solid white", boxShadow: "0 2px 6px rgba(0,0,0,.18)" },
  option: { display: "flex", alignItems: "center", gap: 12, background: "white", borderRadius: 18, padding: 14, border: "1px solid #eee" },
  circle: { width: 38, height: 38, borderRadius: 999, background: "#ddd" },
  inputRow: { display: "flex", alignItems: "center", gap: 8, background: "white", border: "1px solid #eee", borderRadius: 14, padding: 13, marginTop: 8 },
  priceBar: { position: "absolute", bottom: 0, left: 0, right: 0, background: "#111", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", padding: 18 },
  goldSmall: { background: gold, border: 0, borderRadius: 13, padding: "13px 18px", fontWeight: 800 },
  ar: { position: "relative", height: 660, background: "linear-gradient(#d9c7aa,#eee8dc,#9fa98f)" },
  arWindow: { position: "absolute", top: 70, left: 45, right: 45, height: 395, border: "14px solid #222", borderRadius: 16, background: "rgba(255,255,255,.35)" },
  arTools: { position: "absolute", right: 15, top: 205, background: "white", borderRadius: 16, padding: 12, textAlign: "center", fontSize: 12 },
  arActions: { position: "absolute", bottom: 100, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 35, color: "white", textAlign: "center" },
  place: { width: 78, height: 78, borderRadius: 999, background: gold, color: "white", border: "4px solid white" },
  arCard: { position: "absolute", bottom: 0, left: 18, right: 18, background: "white", borderRadius: "24px 24px 0 0", padding: 16, display: "flex", alignItems: "center", gap: 12 },
  productMini: { width: 50, height: 55, borderRadius: 10, background: "#ddd" },
  simpleCard: { background: "white", borderRadius: 24, padding: 24, boxShadow: "0 8px 22px rgba(0,0,0,.08)" },
};
