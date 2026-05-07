
import React, { useMemo, useState } from "react";
import {
  Home, Grid2X2, CalendarDays, User, FileText, Camera,
  RotateCcw, Check, Bell, Menu, ArrowLeft, ChevronRight,
  ShieldCheck, ScanLine, DoorOpen, Smartphone, SlidersHorizontal,
  Plus, Settings, Clock, Mail, MapPin, PhoneCall
} from "lucide-react";

const gold = "#d3b56f";
const cream = "#f7f3ea";
const dark = "#111111";

const products = [
  {
    id: "spannrahmen",
    label: "Spannrahmen",
    price: 293,
    step: 8,
    minW: 50,
    minH: 50,
    maxW: 180,
    maxH: 250,
    icon: Grid2X2,
    meshOptions: ["Standardnetz", "Transparent Netz"]
  },
  {
    id: "schiebe_1",
    label: "Schiebeelement 1-flügelig",
    price: 515,
    step: 11,
    minW: 50,
    minH: 50,
    maxW: 180,
    maxH: 250,
    icon: SlidersHorizontal,
    meshOptions: ["Standardnetz", "Transparent Netz"]
  },
  {
    id: "drehtuer",
    label: "Drehtür / Drehfenster",
    price: 388,
    step: 13,
    minW: 50,
    minH: 190,
    maxW: 220,
    maxH: 260,
    icon: DoorOpen,
    meshOptions: ["Standardnetz", "Transparent Netz"]
  },
  {
    id: "pendeltuer",
    label: "Pendeltür",
    price: 995,
    step: 22,
    minW: 70,
    minH: 190,
    maxW: 220,
    maxH: 260,
    icon: DoorOpen,
    meshOptions: ["Standardnetz", "Transparent Netz"]
  },
  {
    id: "rollo",
    label: "Rollo",
    price: 343,
    step: 13,
    minW: 60,
    minH: 60,
    maxW: 200,
    maxH: 240,
    icon: Smartphone,
    meshOptions: ["BetterVue"]
  },
  {
    id: "plissee",
    label: "Plissée",
    price: 892,
    step: 23,
    minW: 100,
    minH: 190,
    maxW: 350,
    maxH: 340,
    icon: Grid2X2,
    meshOptions: ["Standardnetz"]
  },
  {
    id: "lichtschacht",
    label: "Lichtschachtabdeckung Standard",
    price: 390,
    step: 12,
    minW: 60,
    minH: 40,
    maxW: 200,
    maxH: 120,
    icon: Grid2X2,
    meshOptions: ["Chromstahlnetz"]
  }
];

const colors = [
  { name: "Weiss", ral: "RAL 9016", value: "#f3f1eb", special: false },
  { name: "Eloxiert", ral: "Standard", value: "#b8b2a8", special: false },
  { name: "Sonderfarbe", ral: "nach Wunsch", value: "#d3b56f", special: true }
];

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

function BottomNav({ active, go }) {
  const items = [
    ["home", "Home", Home],
    ["products", "Produkte", Grid2X2],
    ["offers", "Offerten", FileText],
    ["appointments", "Termine", CalendarDays],
    ["profile", "Profil", User],
  ];

  return (
    <div style={styles.nav}>
      {items.map(([id, label, Icon]) => (
        <button key={id} onClick={() => go(id)} style={{ ...styles.navItem, color: active === id ? "#a98745" : "#777" }}>
          <Icon size={21} strokeWidth={active === id ? 2.8 : 2} />
          <span style={{ fontWeight: active === id ? 800 : 600 }}>{label}</span>
        </button>
      ))}
    </div>
  );
}

function QuickButton({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} style={styles.quickCard}>
      <Icon size={22} color="#a98745" />
      <span style={styles.quickLabel}>{label}</span>
    </button>
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
          <QuickButton icon={Grid2X2} label="Produkte konfigurieren" onClick={() => go("products")} />
          <QuickButton icon={ScanLine} label="AR-Vorschau" onClick={() => go("ar")} />
          <QuickButton icon={CalendarDays} label="Montage buchen" onClick={() => go("appointments")} />
          <QuickButton icon={Smartphone} label="Smart-Home" onClick={() => go("smart")} />
          <QuickButton icon={FileText} label="Meine Offerten" onClick={() => go("offers")} />
          <QuickButton icon={User} label="Kundenportal" onClick={() => go("profile")} />
        </div>

        <div style={styles.sectionTop}>
          <h3>Meine Projekte</h3>
          <button style={styles.textAction} onClick={() => go("products")}>Neu</button>
        </div>

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
      <BottomNav active="home" go={go} />
    </Phone>
  );
}

function Products({ go }) {
  return (
    <Phone>
      <Header title="Produkte" go={go} />
      <main style={styles.page}>
        <h1 style={styles.h1}>Produkt wählen</h1>
        <p style={styles.smallMuted}>Konfigurieren Sie Ihren Insektenschutz nach Mass.</p>

        <div style={styles.list}>
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <button key={p.id} onClick={() => go("config")} style={styles.productListItem}>
                <div style={styles.iconBox}><Icon color="#a98745" /></div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <b>{p.label}</b>
                  <p style={styles.smallMuted}>ab CHF {p.price}.00</p>
                </div>
                <ChevronRight />
              </button>
            );
          })}
        </div>

        <button style={styles.fullGold} onClick={() => go("config")}>
          <Plus size={18} /> Neues Produkt konfigurieren
        </button>
      </main>
      <BottomNav active="products" go={go} />
    </Phone>
  );
}

function Configurator({ go }) {
  const [product, setProduct] = useState(products[0]);
  const [color, setColor] = useState(colors[0]);
  const [w, setW] = useState(120);
  const [h, setH] = useState(140);
  const [quantity, setQuantity] = useState(1);
  const [room, setRoom] = useState("Wohnzimmer");
  const [meshType, setMeshType] = useState(products[0].meshOptions[0]);
  const [quoteItems, setQuoteItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("vindonissaQuoteItems") || "[]");
    } catch {
      return [];
    }
  });

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: ""
  });

  function selectProduct(productId) {
    const selected = products.find((p) => p.id === productId) || products[0];
    setProduct(selected);
    setMeshType(selected.meshOptions[0]);
  }

  const area = Math.max(0.5, (Number(w) * Number(h)) / 10000);
  const perimeter = Math.max(2, ((Number(w) + Number(h)) * 2) / 100);

  function roundUp10(value) {
    return Math.ceil(Number(value || 0) / 10) * 10;
  }

  const priceData = useMemo(() => {
    const widthSteps = Math.max(0, (roundUp10(w) - product.minW) / 10);
    const heightSteps = Math.max(0, (roundUp10(h) - product.minH) / 10);

    let base = product.price + Math.round((widthSteps + heightSteps) * product.step);

    const meshAddons = {
      "Standardnetz": 0,
      "Transparent Netz": 15 * area,
      "BetterVue": 0,
      "Chromstahlnetz": 0
    };

    const meshAddon = Math.round(meshAddons[meshType] || 0);

    const specialColorAllowed = product.id !== "lichtschacht";
    const specialColor = color.special && specialColorAllowed ? Math.max(95, Math.round(9.5 * perimeter)) : 0;

    const total = Math.round((base + meshAddon + specialColor) * Math.max(1, Number(quantity) || 1));

    return { base, meshAddon, specialColor, total };
  }, [product, w, h, quantity, meshType, color, area, perimeter]);

  const quoteTotal = quoteItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

  function saveQuoteItems(nextItems) {
    setQuoteItems(nextItems);
    localStorage.setItem("vindonissaQuoteItems", JSON.stringify(nextItems));
  }

  function addToQuote() {
    const item = {
      id: Date.now(),
      room,
      product: product.label,
      quantity: Math.max(1, Number(quantity) || 1),
      width: w,
      height: h,
      color: product.id === "lichtschacht" ? "Chromstahl" : color.name,
      ral: product.id === "lichtschacht" ? "" : color.ral,
      meshType,
      extraColor: color.special,
      base: priceData.base,
      meshAddon: priceData.meshAddon,
      specialColor: priceData.specialColor,
      price: priceData.total
    };

    saveQuoteItems([...quoteItems, item]);

    setRoom("");
    setQuantity(1);
    setW(120);
    setH(140);
  }

  function removeItem(id) {
    saveQuoteItems(quoteItems.filter((item) => item.id !== id));
  }

  function clearQuote() {
    saveQuoteItems([]);
  }

  function updateCustomer(field, value) {
    setCustomer({ ...customer, [field]: value });
  }

  function sendQuoteRequest() {
    if (quoteItems.length === 0) {
      alert("Bitte zuerst mindestens ein Produkt zur Offerte hinzufügen.");
      return;
    }

    const itemsText = quoteItems.map((item, index) => {
      return (
        `${index + 1}. ${item.product}\n` +
        `Raum: ${item.room || "-"}\n` +
        `Anzahl: ${item.quantity || 1} Stk.\n` +
        `Masse: ${item.width} × ${item.height} cm\n` +
        `Gewebe: ${item.meshType}\n` +
        `Farbe: ${item.color} ${item.ral ? "(" + item.ral + ")" : ""}\n` +
        `Sonderfarbe: ${item.extraColor ? "Ja" : "Nein"}\n` +
        `Preis: CHF ${item.price}.00\n`
      );
    }).join("\n");

    const subject = encodeURIComponent("Neue Offertenanfrage über Vindonissa Home");
    const body = encodeURIComponent(
      `Neue Offertenanfrage\n\n` +
      `Kundendaten\n` +
      `Name: ${customer.name}\n` +
      `E-Mail: ${customer.email}\n` +
      `Telefon: ${customer.phone}\n` +
      `Adresse: ${customer.address}\n\n` +
      `Produkte\n\n${itemsText}\n` +
      `Gesamtsumme: CHF ${quoteTotal}.00\n\n` +
      `Nachricht:\n${customer.note}`
    );

    window.location.href = `mailto:info@insektenschutzvindonissa.ch?subject=${subject}&body=${body}`;
  }

  return (
    <Phone>
      <Header title="Offerte erstellen" back go={go} />
      <main style={styles.page}>
        <h3>Produkt hinzufügen</h3>

        <input
          style={styles.formInput}
          placeholder="Raum / Projektname"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <h4>Produktgruppe</h4>
        <select
          style={styles.formInput}
          value={product.id}
          onChange={(e) => selectProduct(e.target.value)}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>

        <h4>Anzahl</h4>
        <label style={styles.inputRow}>Anzahl
          <input
            style={styles.input}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          /> Stk.
        </label>

        <h4>Masse in cm</h4>
        <label style={styles.inputRow}>Breite
          <input style={styles.input} value={w} onChange={(e) => setW(Number(e.target.value) || 0)} /> cm
        </label>
        <label style={styles.inputRow}>Höhe
          <input style={styles.input} value={h} onChange={(e) => setH(Number(e.target.value) || 0)} /> cm
        </label>

        {product.id !== "lichtschacht" && (
          <>
            <h4>Farbe Rahmen</h4>
            <div style={styles.colorChoiceGrid}>
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  style={{
                    ...styles.colorChoice,
                    borderColor: color.name === c.name ? gold : "#eee",
                    background: color.name === c.name ? "#fff8e7" : "white"
                  }}
                >
                  <span style={{ ...styles.colorDot, background: c.value }}></span>
                  <b>{c.name}</b>
                  <small>{c.ral}</small>
                </button>
              ))}
            </div>
            {color.special && (
              <div style={styles.noticeBox}>
                Sonderfarbzuschlag wird automatisch berechnet.
              </div>
            )}
          </>
        )}

        <h4>Gewebe</h4>
        <select style={styles.formInput} value={meshType} onChange={(e) => setMeshType(e.target.value)}>
          {product.meshOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>


        <div style={styles.priceDetails}>
          <div><span>Aktueller Preis total</span><b>CHF {priceData.total}.00</b></div>
        </div>

        <button style={styles.fullGold} onClick={addToQuote}>Produkt zur Offerte hinzufügen</button>

        <h3>Offertenliste</h3>

        {quoteItems.length === 0 && (
          <div style={styles.emptyBox}>Noch keine Produkte hinzugefügt.</div>
        )}

        {quoteItems.map((item) => (
          <div key={item.id} style={styles.quoteItem}>
            <div style={{ flex: 1 }}>
              <b>{item.product}</b>
              <p style={styles.smallMuted}>
                {item.room || "Ohne Raum"} · {item.quantity || 1} Stk. · {item.width} × {item.height} cm<br />
                {item.meshType} · {item.color}
              </p>
              <b>CHF {item.price}.00</b>
            </div>
            <button style={styles.removeButton} onClick={() => removeItem(item.id)}>×</button>
          </div>
        ))}

        <div style={styles.totalBox}>
          <span>Gesamtsumme</span>
          <b>CHF {quoteTotal}.00</b>
        </div>

        <h3>Kundendaten</h3>
        <input style={styles.formInput} placeholder="Vorname und Nachname" value={customer.name} onChange={(e) => updateCustomer("name", e.target.value)} />
        <input style={styles.formInput} placeholder="E-Mail-Adresse" type="email" value={customer.email} onChange={(e) => updateCustomer("email", e.target.value)} />
        <input style={styles.formInput} placeholder="Telefonnummer" value={customer.phone} onChange={(e) => updateCustomer("phone", e.target.value)} />
        <input style={styles.formInput} placeholder="Adresse / PLZ / Ort" value={customer.address} onChange={(e) => updateCustomer("address", e.target.value)} />
        <textarea style={{ ...styles.formInput, minHeight: 90, resize: "none" }} placeholder="Nachricht / Besonderheiten" value={customer.note} onChange={(e) => updateCustomer("note", e.target.value)} />

        <button style={styles.fullGold} onClick={sendQuoteRequest}>Offerte senden</button>
        <button style={styles.secondaryButton} onClick={clearQuote}>Liste leeren</button>
      </main>

      <div style={styles.priceBar}>
        <div><small>Offertensumme</small><br /><b>CHF {quoteTotal}.00</b></div>
        <button style={styles.goldSmall} onClick={sendQuoteRequest}>Senden</button>
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

function Offers({ go }) {
  return (
    <Phone>
      <Header title="Offerten" go={go} />
      <main style={styles.page}>
        <h1 style={styles.h1}>Offerte erstellen</h1>
        <p style={styles.smallMuted}>Wählen Sie mehrere Produkte aus. Die App zählt alles automatisch zusammen.</p>

        <div style={styles.simpleCard}>
          <FileText color="#a98745" />
          <h3>Mehrere Produkte hinzufügen</h3>
          <p style={styles.smallMuted}>Fenster, Türen, Rollos, Plissées und Lichtschachtabdeckungen können zusammen in eine Offerte aufgenommen werden.</p>
          <button style={styles.fullGold} onClick={() => go("config")}>Offerte starten</button>
        </div>
      </main>
      <BottomNav active="offers" go={go} />
    </Phone>
  );
}

function Appointments({ go }) {
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Ausmessung vor Ort",
    date: "",
    time: "",
    address: "",
    note: ""
  });

  function update(field, value) {
    setBooking({ ...booking, [field]: value });
  }

  function submitBooking(e) {
    e.preventDefault();

    const subject = encodeURIComponent("Neue Terminanfrage über Vindonissa Home");
    const body = encodeURIComponent(
      `Neue Terminanfrage

` +
      `Name: ${booking.name}
` +
      `E-Mail: ${booking.email}
` +
      `Telefon: ${booking.phone}
` +
      `Adresse: ${booking.address}

` +
      `Terminart: ${booking.type}
` +
      `Wunschdatum: ${booking.date}
` +
      `Wunschzeit: ${booking.time}

` +
      `Notiz:
${booking.note}`
    );

    window.location.href = `mailto:info@insektenschutzvindonissa.ch?subject=${subject}&body=${body}`;
  }

  return (
    <Phone>
      <Header title="Termine" go={go} />
      <main style={styles.page}>
        <h1 style={styles.h1}>Termin buchen</h1>
        <p style={styles.smallMuted}>Buchen Sie eine Ausmessung, Beratung oder Montageanfrage.</p>

        <form onSubmit={submitBooking} style={styles.form}>
          <input style={styles.formInput} placeholder="Vorname und Nachname" value={booking.name} onChange={(e) => update("name", e.target.value)} required />
          <input style={styles.formInput} placeholder="E-Mail-Adresse" type="email" value={booking.email} onChange={(e) => update("email", e.target.value)} required />
          <input style={styles.formInput} placeholder="Telefonnummer" value={booking.phone} onChange={(e) => update("phone", e.target.value)} />

          <select style={styles.formInput} value={booking.type} onChange={(e) => update("type", e.target.value)}>
            <option>Ausmessung vor Ort</option>
            <option>Beratung</option>
            <option>Montage</option>
            <option>Service / Reparatur</option>
          </select>

          <div style={styles.twoCols}>
            <input style={styles.formInput} type="date" value={booking.date} onChange={(e) => update("date", e.target.value)} />
            <input style={styles.formInput} type="time" value={booking.time} onChange={(e) => update("time", e.target.value)} />
          </div>

          <input style={styles.formInput} placeholder="Adresse / PLZ / Ort" value={booking.address} onChange={(e) => update("address", e.target.value)} />
          <textarea style={{ ...styles.formInput, minHeight: 90, resize: "none" }} placeholder="Notiz / Besonderheiten" value={booking.note} onChange={(e) => update("note", e.target.value)} />

          <button type="submit" style={styles.fullGold}>Terminanfrage senden</button>
        </form>

        <div style={styles.appointmentCard}>
          <CalendarDays color="#a98745" />
          <div>
            <b>Nächster geplanter Termin</b>
            <p style={styles.smallMuted}>Freitag, 14:30 Uhr · Brugg AG</p>
          </div>
        </div>
      </main>
      <BottomNav active="appointments" go={go} />
    </Phone>
  );
}

function Profile({ go }) {
  const [customer, setCustomer] = useState({
    name: "Vindonissa Kunde",
    email: "kunde@email.ch",
    phone: "+41 ",
    address: "Brugg, Schweiz"
  });

  function update(field, value) {
    setCustomer({ ...customer, [field]: value });
  }

  function saveProfile(e) {
    e.preventDefault();
    localStorage.setItem("vindonissaCustomer", JSON.stringify(customer));
    alert("Kundendaten wurden lokal gespeichert.");
  }

  return (
    <Phone>
      <Header title="Kundenportal" go={go} />
      <main style={styles.page}>
        <div style={styles.profileHead}>
          <div style={styles.avatar}>V</div>
          <h1 style={styles.h1}>{customer.name || "Kundenportal"}</h1>
          <p style={styles.smallMuted}>Ihre Daten, Projekte und Anfragen</p>
        </div>

        <div style={styles.quickGrid}>
          <QuickButton icon={FileText} label="Offerte anfragen" onClick={() => go("offers")} />
          <QuickButton icon={CalendarDays} label="Termin buchen" onClick={() => go("appointments")} />
          <QuickButton icon={PhoneCall} label="Anrufen" onClick={() => window.location.href = "tel:+41790000000"} />
        </div>

        <h3>Kundendaten</h3>
        <form onSubmit={saveProfile} style={styles.form}>
          <input style={styles.formInput} placeholder="Name" value={customer.name} onChange={(e) => update("name", e.target.value)} />
          <input style={styles.formInput} placeholder="E-Mail" value={customer.email} onChange={(e) => update("email", e.target.value)} />
          <input style={styles.formInput} placeholder="Telefon" value={customer.phone} onChange={(e) => update("phone", e.target.value)} />
          <input style={styles.formInput} placeholder="Adresse" value={customer.address} onChange={(e) => update("address", e.target.value)} />
          <button type="submit" style={styles.fullGold}>Daten speichern</button>
        </form>

        <h3>Meine Projekte</h3>
        <button style={styles.project} onClick={() => go("config")}>
          <div style={styles.projectImg}></div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <b>Terrassentür Wohnzimmer</b>
            <p style={styles.smallMuted}>Drehrahmen · In Bearbeitung</p>
            <span style={styles.badge}>Offerte offen</span>
          </div>
          <ChevronRight />
        </button>
      </main>
      <BottomNav active="profile" go={go} />
    </Phone>
  );
}

function ProfileRow({ icon: Icon, label, value }) {
  return (
    <div style={styles.profileRow}>
      <Icon color="#a98745" />
      <div>
        <b>{label}</b>
        <p style={styles.smallMuted}>{value}</p>
      </div>
    </div>
  );
}

function SmartHome({ go }) {
  return (
    <Phone>
      <Header title="Smart-Home" back go={go} />
      <main style={styles.page}>
        <h1 style={styles.h1}>Smart-Home Steuerung</h1>
        <div style={styles.simpleCard}>
          <Smartphone color="#a98745" />
          <h3>Automatische Steuerung</h3>
          <p style={styles.smallMuted}>Hier könnten später motorisierte Rollos, Sensoren und Zeitpläne verbunden werden.</p>
        </div>
      </main>
    </Phone>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");

  if (screen === "welcome") return <div style={styles.app}><Welcome go={setScreen} /></div>;
  if (screen === "home") return <div style={styles.app}><Dashboard go={setScreen} /></div>;
  if (screen === "products") return <div style={styles.app}><Products go={setScreen} /></div>;
  if (screen === "config") return <div style={styles.app}><Configurator go={setScreen} /></div>;
  if (screen === "ar") return <div style={styles.app}><ARPreview go={setScreen} /></div>;
  if (screen === "offers") return <div style={styles.app}><Offers go={setScreen} /></div>;
  if (screen === "appointments") return <div style={styles.app}><Appointments go={setScreen} /></div>;
  if (screen === "profile") return <div style={styles.app}><Profile go={setScreen} /></div>;
  if (screen === "smart") return <div style={styles.app}><SmartHome go={setScreen} /></div>;

  return <div style={styles.app}><Dashboard go={setScreen} /></div>;
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
  smallMuted: { color: "#777", fontSize: 12, margin: "5px 0" },
  h1: { marginTop: 0, fontSize: 26 },
  hero: { background: "linear-gradient(135deg,#171717,#77705f)", color: "white", borderRadius: 20, padding: 22, height: 145, margin: "18px 0", boxShadow: "0 12px 25px rgba(0,0,0,.12)" },
  heroButton: { background: gold, border: 0, borderRadius: 12, padding: "12px 16px", fontWeight: 800 },
  quickGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 },
  quickCard: { background: "white", border: "1px solid #eee", borderRadius: 18, padding: 12, height: 92, textAlign: "left", boxShadow: "0 4px 12px rgba(0,0,0,.05)" },
  quickLabel: { display: "block", marginTop: 14, fontSize: 11, fontWeight: 700 },
  sectionTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 },
  textAction: { background: "transparent", border: 0, color: "#a98745", fontWeight: 800 },
  project: { width: "100%", display: "flex", alignItems: "center", gap: 12, background: "white", border: "1px solid #eee", borderRadius: 18, padding: 12 },
  projectImg: { width: 70, height: 58, borderRadius: 12, background: "linear-gradient(135deg,#ddd,#333)" },
  badge: { background: "#efe3c5", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800, display: "inline-block" },
  nav: { position: "absolute", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #ddd", display: "grid", gridTemplateColumns: "repeat(5,1fr)", padding: "10px 4px 13px" },
  navItem: { background: "none", border: 0, fontSize: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  list: { display: "grid", gap: 12, marginTop: 18 },
  productListItem: { display: "flex", alignItems: "center", gap: 14, background: "white", border: "1px solid #eee", borderRadius: 18, padding: 14 },
  iconBox: { width: 46, height: 46, borderRadius: 14, background: "#f0e5ca", display: "flex", alignItems: "center", justifyContent: "center" },
  fullGold: { width: "100%", marginTop: 20, background: gold, border: 0, borderRadius: 16, padding: 16, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
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
  input: { flex: 1, border: 0, textAlign: "right", background: "transparent", fontWeight: 800, outline: "none" },
  priceBar: { position: "absolute", bottom: 0, left: 0, right: 0, background: "#111", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", padding: 18 },
  goldSmall: { background: gold, border: 0, borderRadius: 13, padding: "13px 18px", fontWeight: 800 },
  ar: { position: "relative", height: 660, background: "linear-gradient(#d9c7aa,#eee8dc,#9fa98f)" },
  arWindow: { position: "absolute", top: 70, left: 45, right: 45, height: 395, border: "14px solid #222", borderRadius: 16, background: "rgba(255,255,255,.35)" },
  arTools: { position: "absolute", right: 15, top: 205, background: "white", borderRadius: 16, padding: 12, textAlign: "center", fontSize: 12 },
  arActions: { position: "absolute", bottom: 100, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 35, color: "white", textAlign: "center" },
  place: { width: 78, height: 78, borderRadius: 999, background: gold, color: "white", border: "4px solid white" },
  arCard: { position: "absolute", bottom: 0, left: 18, right: 18, background: "white", borderRadius: "24px 24px 0 0", padding: 16, display: "flex", alignItems: "center", gap: 12 },
  productMini: { width: 50, height: 55, borderRadius: 10, background: "#ddd" },
  offerCard: { background: "white", borderRadius: 18, padding: 16, border: "1px solid #eee", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" },
  appointmentCard: { background: "white", borderRadius: 18, padding: 16, border: "1px solid #eee", marginBottom: 12, display: "flex", gap: 14, alignItems: "center" },
  profileHead: { textAlign: "center", background: "white", borderRadius: 24, padding: 22, marginBottom: 15 },
  avatar: { width: 70, height: 70, borderRadius: 999, background: gold, color: "#111", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900 },
  profileList: { display: "grid", gap: 10 },
  profileRow: { display: "flex", alignItems: "center", gap: 14, background: "white", border: "1px solid #eee", borderRadius: 16, padding: 14 },
  form: { display: "grid", gap: 10, marginTop: 16, marginBottom: 18 },
  formInput: { width: "100%", boxSizing: "border-box", border: "1px solid #e7e1d3", background: "white", borderRadius: 14, padding: "14px 14px", fontSize: 14, outline: "none" },
  twoCols: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  successBox: { background: "#e9f5df", color: "#2e5c1f", border: "1px solid #cde7be", borderRadius: 14, padding: 12, marginBottom: 12, fontWeight: 800, fontSize: 13 },
  secondaryButton: { width: "100%", marginTop: 16, background: "#111", color: "white", border: 0, borderRadius: 16, padding: 15, fontWeight: 900 },
  checkRow: { display: "flex", alignItems: "center", gap: 10, background: "white", border: "1px solid #eee", borderRadius: 14, padding: 13, marginTop: 10, fontWeight: 700 },
  priceDetails: { background: "white", border: "1px solid #eee", borderRadius: 18, padding: 14, marginTop: 14, display: "grid", gap: 10 },
  quoteItem: { display: "flex", alignItems: "center", gap: 10, background: "white", border: "1px solid #eee", borderRadius: 16, padding: 14, marginBottom: 10 },
  removeButton: { width: 34, height: 34, borderRadius: 999, border: 0, background: "#111", color: "white", fontSize: 22, lineHeight: "30px" },
  totalBox: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#111", color: "white", borderRadius: 18, padding: 16, margin: "14px 0", fontSize: 18 },
  emptyBox: { background: "white", border: "1px dashed #d8c9a5", borderRadius: 16, padding: 16, color: "#777", textAlign: "center" },
  colorChoiceGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10, marginBottom: 12 },
  colorChoice: { display: "flex", alignItems: "center", gap: 10, border: "2px solid #eee", borderRadius: 16, padding: 13, textAlign: "left" },
  noticeBox: { background: "#fff8e7", border: "1px solid #ead59b", color: "#7c5f1d", borderRadius: 14, padding: 12, fontSize: 12, fontWeight: 800, marginBottom: 12 },
  simpleCard: { background: "white", borderRadius: 24, padding: 24, boxShadow: "0 8px 22px rgba(0,0,0,.08)" },
};
