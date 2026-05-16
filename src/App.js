import { useState, useEffect, useRef } from "react";
import "./App.css";

// ── Owner Details (only you receive messages) ─────────────────────────────
const OWNER_EMAIL = "cognifyanalytics@gmail.com";
const OWNER_PHONE = "7020436547";
const OWNER_WHATSAPP = "917020436547";

const NAV_LINKS = ["Home", "About", "Services", "Industries", "FAQ", "Contact"];

const SERVICES = [
  { icon: "📊", title: "Sales Analytics", desc: "Deep-dive into sales trends, patterns, and forecasts to drive revenue growth and spot opportunities before they pass." },
  { icon: "💹", title: "Profit & Loss Analysis", desc: "Identify exactly where money is leaking, optimize margins, and get clear P&L dashboards every month." },
  { icon: "🖥️", title: "Power BI Dashboards", desc: "Custom-built interactive dashboards that update in real-time and give you instant business clarity on any device." },
  { icon: "🧾", title: "GST Reporting & Analytics", desc: "Automated GST report generation, filing analytics, and compliance tracking for stress-free tax seasons." },
  { icon: "📦", title: "Inventory Analysis", desc: "Track stock movement, identify dead stock, and optimize purchasing with data-driven insights." },
  { icon: "🔍", title: "Business Intelligence", desc: "End-to-end BI strategy, data warehousing, and decision support systems tailored for small businesses." },
  { icon: "📈", title: "Data Visualization", desc: "Transform raw numbers into compelling charts, graphs, and reports your team actually understands." },
  { icon: "🎯", title: "Performance Tracking", desc: "KPI dashboards and performance metrics that help you measure what matters most to your business." },
];

const INDUSTRIES = [
  { icon: "💊", name: "Medical Stores", desc: "Track medicine inventory, expiry dates, and daily billing patterns to eliminate losses." },
  { icon: "🏨", name: "Hotels", desc: "Occupancy analytics, revenue per room, and seasonal demand forecasting." },
  { icon: "🏢", name: "Agencies", desc: "Client billing, project profitability, and team performance analytics." },
  { icon: "🍽️", name: "Restaurants", desc: "Menu profitability, food cost analysis, and daily sales pattern tracking." },
  { icon: "🛒", name: "Retail Shops", desc: "Top-selling SKUs, shrinkage analysis, and customer purchase trend reports." },
  { icon: "🥗", name: "Food Businesses", desc: "Raw material cost tracking, wastage analytics, and pricing optimization." },
];

const TESTIMONIALS = [
  { name: "Rajesh Patil", role: "Owner, Patil Medical Store, Aurangabad", text: "Revnex helped us discover we were losing ₹40,000/month on expired medicines. Their inventory dashboard completely changed how we run our store.", initials: "RP", color: "#3b82f6" },
  { name: "Sneha Kulkarni", role: "Manager, Sky Hotel Group", text: "Our occupancy reporting went from Excel chaos to a beautiful Power BI dashboard. We now make pricing decisions in minutes, not days.", initials: "SK", color: "#8b5cf6" },
  { name: "Amit Sharma", role: "Director, Fresh Bites Restaurant", text: "The profit & loss analysis revealed our top 3 dishes were actually losing money. We restructured our menu and profit shot up 28% in 60 days.", initials: "AS", color: "#06b6d4" },
];

const FAQS = [
  { q: "What types of businesses do you work with?", a: "We specialize in medical stores, hotels, agencies, restaurants, retail shops, and food businesses — any SME that wants to make smarter decisions with data." },
  { q: "How long does it take to build a Power BI dashboard?", a: "Typically 7–14 working days for a standard dashboard. Complex multi-department setups may take 3–4 weeks." },
  { q: "Do I need to know data analytics to use your services?", a: "Not at all. We handle everything technical. You just share your data files and we deliver clear, actionable insights." },
  { q: "What file formats do you accept?", a: "We accept Excel (.xlsx, .xls), CSV, PDF invoices, Tally exports, and can connect to your POS or accounting software." },
  { q: "Is my business data kept confidential?", a: "Absolutely. We sign an NDA with every client and your data is never shared with any third party. Security is our top priority." },
  { q: "How much does it cost?", a: "Pricing depends on the scope of work. Contact us for a free consultation and we'll give you a transparent quote with no hidden charges." },
];

// ── Intersection Observer Hook ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Logo ──────────────────────────────────────────────────────────────────
function Logo({ large }) {
  return (
    <div className="logo-wrap">
      <div className={`logo-icon ${large ? "logo-icon-lg" : ""}`}>
        <svg width={large ? 28 : 22} height={large ? 28 : 22} viewBox="0 0 24 24" fill="none">
          <polyline points="3,17 7,9 11,13 15,7 19,11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="19" cy="11" r="2.5" fill="#93c5fd"/>
        </svg>
      </div>
      <div>
        <div className={`logo-name ${large ? "logo-name-lg" : ""}`}>Revnex</div>
        <div className="logo-sub">Analytics Consulting</div>
      </div>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────
function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

// ── Section Title ─────────────────────────────────────────────────────────
function SectionTitle({ badge, title, subtitle, center, highlight }) {
  const parts = highlight ? title.split(highlight) : null;
  return (
    <div className={`section-title ${center ? "text-center" : ""}`}>
      {badge && <div style={{ marginBottom: 14 }}><Badge>{badge}</Badge></div>}
      <h2 className="section-h2">
        {highlight
          ? <>{parts[0]}<span className="gradient-text">{highlight}</span>{parts[1]}</>
          : title}
      </h2>
      {subtitle && <p className="section-sub" style={{ maxWidth: center ? 620 : "none", margin: center ? "0 auto" : 0 }}>{subtitle}</p>}
    </div>
  );
}

// ── Button ────────────────────────────────────────────────────────────────
function Btn({ children, primary, onClick, href, full }) {
  const cls = `btn ${primary ? "btn-primary" : "btn-outline"} ${full ? "btn-full" : ""}`;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

// ── Animated Dashboard ────────────────────────────────────────────────────
function Dashboard() {
  const [ref, inView] = useInView(0.2);
  const bars = [65, 82, 58, 91, 74, 88, 62, 95, 78, 85, 70, 93];
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  return (
    <div ref={ref} className={`dashboard ${inView ? "dashboard-in" : ""}`}>
      {/* Header */}
      <div className="dash-header">
        <div>
          <div className="dash-label">Live Business Dashboard</div>
          <div className="dash-title">Revnex Analytics — FY 2024-25</div>
        </div>
        <div className="dash-tabs">
          {["All","Q1","Q2","Q4"].map((t,i) => (
            <div key={t} className={`dash-tab ${i===0?"dash-tab-active":""}`}>{t}</div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {[
          { label:"Revenue", value:"₹48.2L", change:"+18%", up:true },
          { label:"Net Profit", value:"₹11.8L", change:"+24%", up:true },
          { label:"Margin", value:"38.4%", change:"+3.2%", up:true },
          { label:"Loss Found", value:"₹2.1L", change:"-15%", up:false },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className={`kpi-change ${k.up?"kpi-up":"kpi-down"}`}>{k.change}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="chart-box">
        <div className="chart-label">Monthly Revenue (₹ Lakhs)</div>
        <div className="bars">
          {bars.map((h, i) => (
            <div key={i} className="bar-col">
              <div className="bar" style={{ height: inView ? h + "%" : "0%", background: h>=90?"linear-gradient(0deg,#1e40af,#60a5fa)":h>=75?"linear-gradient(0deg,#1e3a5f,#3b82f6)":"rgba(59,130,246,0.3)", transitionDelay: i*0.04+"s" }} />
              <div className="bar-month">{months[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="dash-bottom">
        <div className="dash-card">
          <div className="dash-card-label">Top Products</div>
          {[["Amoxicillin","₹4.2L",82],["Paracetamol","₹3.8L",73],["Vitamin D3","₹2.9L",56]].map(([n,v,p]) => (
            <div key={n} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span className="dash-item-name">{n}</span>
                <span className="dash-item-val">{v}</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: inView ? p+"%" : "0%" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="dash-card">
          <div className="dash-card-label">Loss Breakdown</div>
          {[["Expired Stock","₹85K","#ef4444"],["Shrinkage","₹42K","#f97316"],["Returns","₹31K","#eab308"],["Billing Err","₹18K","#8b5cf6"]].map(([c,a,col]) => (
            <div key={c} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:col, flexShrink:0 }} />
                <span className="dash-item-name">{c}</span>
              </div>
              <span style={{ color:col, fontSize:11, fontWeight:700 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Service Card ──────────────────────────────────────────────────────────
function ServiceCard({ icon, title, desc, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} className={`service-card ${inView ? "card-in" : ""}`} style={{ transitionDelay: delay+"ms" }}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{desc}</p>
    </div>
  );
}

// ── Industry Card ─────────────────────────────────────────────────────────
function IndustryCard({ icon, name, desc, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} className={`industry-card ${inView ? "card-in" : ""}`} style={{ transitionDelay: delay+"ms" }}>
      <div style={{ fontSize:40, marginBottom:14 }}>{icon}</div>
      <h4 className="card-title">{name}</h4>
      <p className="card-desc">{desc}</p>
    </div>
  );
}

// ── Testimonial ───────────────────────────────────────────────────────────
function TestiCard({ name, role, text, initials, color }) {
  return (
    <div className="testi-card">
      <div className="stars">{"★★★★★"}</div>
      <p className="testi-text">"{text}"</p>
      <div className="testi-author">
        <div className="testi-avatar" style={{ background:`linear-gradient(135deg,${color}80,${color})` }}>{initials}</div>
        <div>
          <div className="testi-name">{name}</div>
          <div className="testi-role">{role}</div>
        </div>
      </div>
    </div>
  );
}

// ── Contact Form (sends mail to owner) ───────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", business:"", message:"" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!form.name || !form.email) { alert("Please enter your name and email."); return; }
    setLoading(true);
    // Opens owner's Gmail with prefilled message
    const subject = encodeURIComponent(`New Consulting Enquiry from ${form.name} — ${form.business || "Business"}`);
    const body = encodeURIComponent(
      `New enquiry from Revnex website:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBusiness Type: ${form.business}\n\nMessage:\n${form.message}\n\n---\nSent via revnex.in contact form`
    );
    window.open(`mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    setTimeout(() => { setLoading(false); setDone(true); }, 800);
  };

  if (done) return (
    <div className="form-success">
      <div style={{ fontSize:52 }}>✅</div>
      <h3>Message Sent!</h3>
      <p>Thank you for reaching out! We'll personally contact you within 24 hours on your phone or email.</p>
      <div className="success-whatsapp">
        📱 For faster response, WhatsApp us at <strong>+91 {OWNER_PHONE}</strong>
      </div>
    </div>
  );

  return (
    <div className="form-grid">
      <div className="form-row">
        <div className="form-field">
          <label>Full Name *</label>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your Name" />
        </div>
        <div className="form-field">
          <label>Email Address *</label>
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@business.com" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label>Phone / WhatsApp</label>
          <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210" />
        </div>
        <div className="form-field">
          <label>Business Type</label>
          <input value={form.business} onChange={e=>setForm({...form,business:e.target.value})} placeholder="Medical Store / Hotel / Restaurant..." />
        </div>
      </div>
      <div className="form-field">
        <label>Your Message</label>
        <textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your business challenges and what you need help with..." />
      </div>
      <button onClick={submit} disabled={loading} className={`submit-btn ${loading?"loading":""}`}>
        {loading ? "Opening Mail..." : "🚀 Send Message to Revnex"}
      </button>
      <p className="form-note">We respond within 24 hours · 100% confidential · No spam</p>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (p) => { setPage(p); setOpen(false); };
  return (
    <nav className={`navbar ${scrolled?"navbar-scrolled":""}`}>
      <div className="nav-inner">
        <div onClick={() => go("Home")} style={{ cursor:"pointer" }}><Logo /></div>
        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)} className={`nav-link ${page===l?"nav-link-active":""}`}>{l}</button>
          ))}
          <Btn primary onClick={() => go("Contact")}>Get Free Consultation</Btn>
        </div>
        <button className="hamburger" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
      </div>
      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)} className="mobile-link">{l}</button>
          ))}
          <Btn primary onClick={() => go("Contact")} full>Get Free Consultation</Btn>
        </div>
      )}
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Logo />
          <p className="footer-about">Helping small businesses across India turn raw data into profitable decisions using modern analytics and dashboards.</p>
          <div className="social-links">
            {[["LI","https://linkedin.com"],["TW","https://twitter.com"],["IG","https://instagram.com"]].map(([s,u]) => (
              <a key={s} href={u} target="_blank" rel="noreferrer" className="social-btn">{s}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-heading">Company</div>
          {["Home","About","Services","Industries","FAQ","Contact"].map(l => (
            <div key={l} onClick={() => setPage(l)} className="footer-link">{l}</div>
          ))}
        </div>
        <div>
          <div className="footer-heading">Services</div>
          {["Sales Analytics","P&L Analysis","Power BI","GST Reports","Inventory","BI Consulting","Data Visualization","Performance Tracking"].map(s => (
            <div key={s} className="footer-link muted">{s}</div>
          ))}
        </div>
        <div>
          <div className="footer-heading">Contact Us</div>
          <a href={`mailto:${OWNER_EMAIL}`} className="footer-contact-item">📧 {OWNER_EMAIL}</a>
          <a href={`tel:+91${OWNER_PHONE}`} className="footer-contact-item">📱 +91 {OWNER_PHONE}</a>
          <div className="footer-contact-item muted">📍 Aurangabad, Maharashtra</div>
          <div className="footer-contact-item muted">🕐 Mon–Sat: 9AM – 7PM IST</div>
          <a href={`https://wa.me/${OWNER_WHATSAPP}`} target="_blank" rel="noreferrer" className="wa-btn">💬 WhatsApp Us</a>
          <div style={{ marginTop:24, display:"flex", gap:16 }}>
            <span onClick={() => setPage("Privacy")} className="footer-legal">Privacy Policy</span>
            <span onClick={() => setPage("Terms")} className="footer-legal">Terms</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Revnex Analytics Consulting. All rights reserved.</span>
        <span>Built for Indian SMEs · Aurangabad, Maharashtra 🇮🇳</span>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGES
// ══════════════════════════════════════════════════════════════════════════

function Home({ setPage }) {
  const [heroRef, heroIn] = useInView(0.1);
  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero">
        {/* Animated background blobs */}
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
        <div className="particles">
          {Array.from({length:18}).map((_,i) => (
            <div key={i} className="particle" style={{ left:Math.random()*100+"%", top:Math.random()*100+"%", animationDelay:Math.random()*6+"s", animationDuration:(6+Math.random()*8)+"s", width:(2+Math.random()*4)+"px", height:(2+Math.random()*4)+"px" }} />
          ))}
        </div>

        <div className="hero-inner">
          {/* Left Text */}
          <div ref={heroRef} className={`hero-text ${heroIn?"hero-text-in":""}`}>
            <Badge>🇮🇳 Trusted by 50+ Indian SMEs</Badge>
            <h1 className="hero-h1">
              Turn Your Business<br />
              <span className="gradient-text">Data Into Profit</span>
            </h1>
            <p className="hero-sub">
              We help medical stores, hotels, restaurants & retail businesses uncover hidden losses, boost profit margins, and make smarter decisions — using powerful dashboards and analytics.
            </p>
            <div className="hero-btns">
              <Btn primary onClick={() => setPage("Contact")}>🚀 Get Free Consultation</Btn>
              <Btn onClick={() => setPage("Services")}>Explore Services →</Btn>
            </div>
            <div className="trust-badges">
              {[["🔒","NDA Protected"],["⚡","7–14 Day Delivery"],["📞","Free Consultation"],["💯","Guaranteed Results"]].map(([icon,label]) => (
                <div key={label} className="trust-badge">
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Dashboard */}
          <div className="hero-dashboard">
            <Dashboard />
            <div className="hero-badge-profit">
              <div className="hbp-value">+28%</div>
              <div className="hbp-label">Avg Profit Increase</div>
            </div>
            <div className="hero-badge-live">
              <div className="live-dot" />
              <div>
                <div className="live-title">Live Dashboard</div>
                <div className="live-sub">Real-time insights</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="stats-bar">
        {[["50+","Clients Served"],["₹1.2Cr","Losses Identified"],["28%","Avg Profit Increase"],["100%","Client Satisfaction"]].map(([v,l]) => (
          <div key={l} className="stat-item">
            <div className="stat-value">{v}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </section>

      {/* ── SERVICES ── */}
      <section className="section bg-dark">
        <div className="container">
          <SectionTitle badge="Our Services" title="Analytics Solutions Built for " highlight="Indian SMEs" subtitle="Practical, affordable, and powerful analytics designed for businesses that don't have a data team — yet." center />
          <div className="services-grid">
            {SERVICES.map((s,i) => <ServiceCard key={s.title} {...s} delay={i*60} />)}
          </div>
          <div className="text-center" style={{ marginTop:48 }}>
            <Btn primary onClick={() => setPage("Services")}>View All Services →</Btn>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section bg-darker">
        <div className="container">
          <SectionTitle badge="Industries We Serve" title="Specialized Analytics for " highlight="Every Business" subtitle="We've designed analytics solutions around the unique challenges of your specific industry." center />
          <div className="industries-grid">
            {INDUSTRIES.map((ind,i) => <IndustryCard key={ind.name} {...ind} delay={i*70} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section bg-dark">
        <div className="container">
          <SectionTitle badge="How It Works" title="From Data to Decisions in " highlight="4 Simple Steps" center />
          <div className="steps-grid">
            {[
              { n:"01", icon:"📤", t:"Share Your Data", d:"Upload Excel/CSV files or share access to your POS or accounting software. We handle everything else." },
              { n:"02", icon:"🔬", t:"We Analyze", d:"Our team processes your data, identifies patterns, losses, and hidden profit opportunities." },
              { n:"03", icon:"📊", t:"Dashboard Delivered", d:"You receive a custom interactive Power BI dashboard with real-time, actionable business insights." },
              { n:"04", icon:"🚀", t:"Grow Your Profits", d:"Regular reviews and recommendations keep your profits growing month after month." },
            ].map(({n,icon,t,d}) => (
              <div key={n} className="step-card">
                <div className="step-num">{n}</div>
                <div className="step-icon">{icon}</div>
                <h4 className="step-title">{t}</h4>
                <p className="step-desc">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section bg-darker">
        <div className="container">
          <SectionTitle badge="Client Stories" title="Real Results from Real Businesses" center />
          <div className="testi-grid">
            {TESTIMONIALS.map(t => <TestiCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section bg-dark">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-blob1" /><div className="cta-blob2" />
            <Badge>Free Consultation — No Cost</Badge>
            <h2 className="cta-h2">Ready to See What Your Data Is Hiding?</h2>
            <p className="cta-sub">Get a free 30-minute consultation. We'll identify your top 3 business profit leaks — at absolutely no cost.</p>
            <div className="cta-btns">
              <button onClick={() => setPage("Contact")} className="cta-btn-white">📅 Book Free Consultation</button>
              <a href={`https://wa.me/${OWNER_WHATSAPP}?text=Hi! I found Revnex Analytics online and I'm interested in a free consultation for my business.`} target="_blank" rel="noreferrer" className="cta-btn-green">💬 WhatsApp Us Now</a>
            </div>
            <div className="cta-contact-info">
              <span>📧 <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a></span>
              <span>📱 <a href={`tel:+91${OWNER_PHONE}`}>+91 {OWNER_PHONE}</a></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="section bg-darker">
        <div className="container">
          <div className="form-section">
            <SectionTitle badge="Send a Message" title="We'll Personally Reach Out to You" subtitle="Fill in the form and we'll contact you within 24 hours — via call or WhatsApp." center />
            <div className="form-box">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── About ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <div className="page-top">
      <div className="page-hero">
        <Badge>About Revnex</Badge>
        <h1 className="page-h1">We Turn Small Business Data Into Big Wins</h1>
        <p className="page-sub">Founded in Aurangabad, Maharashtra — on a mission to make enterprise-grade analytics accessible to every Indian SME.</p>
      </div>

      <section className="section bg-dark">
        <div className="container">
          <div className="two-col">
            <div>
              <SectionTitle badge="Our Story" title="Why We Started Revnex" />
              <p className="body-text">Most analytics tools are built for large enterprises with huge budgets and dedicated data teams. Small business owners in India — the medical store owner, restaurant operator, hotel manager — were left behind.</p>
              <p className="body-text">We saw businesses losing lakhs of rupees every month simply because they didn't have visibility into their own data. Revnex was built to change that.</p>
              <p className="body-text">We deliver the same quality of business intelligence to a local store owner that a Fortune 500 company would have — at a price that actually works for Indian SMEs.</p>
            </div>
            <div className="four-grid">
              {[
                { icon:"🎯", t:"Mission", d:"Democratize data analytics for Indian SMEs." },
                { icon:"👁️", t:"Vision", d:"Every Indian business owner making data-driven decisions." },
                { icon:"💎", t:"Values", d:"Transparency, accuracy, affordability, client-first." },
                { icon:"🚀", t:"Goal", d:"Help 500+ businesses improve profitability by 2026." },
              ].map(c => (
                <div key={c.t} className="mini-card">
                  <div style={{ fontSize:28, marginBottom:10 }}>{c.icon}</div>
                  <div className="mini-card-title">{c.t}</div>
                  <div className="mini-card-desc">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-darker">
        <div className="container">
          <SectionTitle badge="Why Choose Us" title="The Revnex Difference" center />
          <div className="six-grid">
            {[
              ["⚡","Fast Turnaround","Dashboards delivered in 7–14 working days."],
              ["💰","SME-Friendly Pricing","Enterprise analytics at prices that work for small businesses."],
              ["🎓","Deep Expertise","Power BI certified team with real-world SME experience."],
              ["🔒","100% Confidential","Full NDA signed before every project. Your data stays yours."],
              ["📞","Personal Support","Direct WhatsApp & call access to your assigned analyst."],
              ["📈","Proven ROI","Clients see 20–35% profit improvement within 90 days on average."],
            ].map(([icon,t,d]) => (
              <div key={t} className="service-card">
                <div className="card-icon">{icon}</div>
                <h4 className="card-title">{t}</h4>
                <p className="card-desc">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-dark">
        <div className="container">
          <SectionTitle badge="Our Team" title="The Analysts Behind Your Growth" center />
          <div className="team-grid">
            {[
              { ini:"AK", name:"Arjun Kulkarni", role:"Founder & Lead Analyst", bio:"8+ years in data analytics. Power BI & SQL certified. Expert in SME business intelligence." },
              { ini:"PM", name:"Priya Mehta", role:"Business Intelligence Consultant", bio:"Specialized in GST analytics and retail data modeling. MBA from PUMBA, Pune." },
              { ini:"RS", name:"Rohan Sawant", role:"Dashboard Developer", bio:"Power BI certified developer. Built dashboards for 30+ SMEs across Maharashtra." },
            ].map(m => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">{m.ini}</div>
                <h4 className="team-name">{m.name}</h4>
                <div className="team-role">{m.role}</div>
                <p className="card-desc">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Services ───────────────────────────────────────────────────────────────
function Services({ setPage }) {
  const list = [
    { icon:"📊", title:"Sales Analytics", color:"#3b82f6", desc:"Get complete visibility into your sales data — daily, weekly, monthly.", points:["Daily/weekly/monthly sales tracking","Product-wise performance breakdown","Top customer identification","Sales trend & seasonality forecasting","Regional sales comparison"] },
    { icon:"💹", title:"Profit & Loss Analysis", color:"#22c55e", desc:"Know exactly where every rupee goes. Uncover hidden costs and shrinking margins.", points:["Revenue vs cost detailed breakdown","Margin analysis per product/service","Loss identification & root cause","Month-over-month P&L comparison","Cost-cutting roadmap"] },
    { icon:"🖥️", title:"Power BI Dashboard Development", color:"#8b5cf6", desc:"Beautiful, interactive dashboards accessible from any device — laptop, tablet, or mobile.", points:["Fully interactive custom dashboards","Auto-refresh with latest data","Custom KPIs & business metrics","Mobile-responsive design","Training & ongoing support included"] },
    { icon:"🧾", title:"GST Reporting & Analytics", color:"#f59e0b", desc:"Simplify GST compliance with automated reports and analytics that make filing stress-free.", points:["GSTR-1 & GSTR-3B analytics","ITC reconciliation reports","Vendor-wise GST breakdowns","Filing deadline tracking","Tax liability trend analysis"] },
    { icon:"📦", title:"Inventory Analysis", color:"#06b6d4", desc:"Stop losing money to dead stock, expiry, and over-purchasing.", points:["Slow-moving & dead stock reports","Expiry date tracking (medical stores)","Reorder point calculations","Purchase order optimization","Stock shrinkage & loss detection"] },
    { icon:"🔍", title:"Business Intelligence Consulting", color:"#f97316", desc:"Strategic BI consulting to build a data culture in your business.", points:["End-to-end BI strategy design","Data source integration","KPI framework development","Competitor benchmarking","Quarterly business review sessions"] },
  ];
  return (
    <div className="page-top">
      <div className="page-hero">
        <Badge>Our Services</Badge>
        <h1 className="page-h1">Analytics Services for Indian SMEs</h1>
        <p className="page-sub">Practical, affordable, and built for businesses that don't have a data team — yet.</p>
      </div>
      <section className="section bg-dark">
        <div className="container">
          <div style={{ display:"grid", gap:28 }}>
            {list.map((s, i) => (
              <div key={s.title} className="service-detail-card" style={{ borderTopColor: s.color }}>
                {i%2===0 ? (
                  <>
                    <div className="sd-left">
                      <div style={{ fontSize:52, marginBottom:18 }}>{s.icon}</div>
                      <h2 className="sd-title">{s.title}</h2>
                      <p className="sd-desc">{s.desc}</p>
                      <Btn primary onClick={() => setPage("Contact")}>Get Started →</Btn>
                    </div>
                    <div className="sd-right">
                      {s.points.map(p => (
                        <div key={p} className="sd-point">
                          <div className="sd-dot" style={{ background: s.color }} />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sd-right">
                      {s.points.map(p => (
                        <div key={p} className="sd-point">
                          <div className="sd-dot" style={{ background: s.color }} />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div className="sd-left" style={{ textAlign:"right" }}>
                      <div style={{ fontSize:52, marginBottom:18 }}>{s.icon}</div>
                      <h2 className="sd-title">{s.title}</h2>
                      <p className="sd-desc">{s.desc}</p>
                      <Btn primary onClick={() => setPage("Contact")}>Get Started →</Btn>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Industries ─────────────────────────────────────────────────────────────
function Industries() {
  const list = [
    { icon:"💊", name:"Medical Stores", color:"#3b82f6", challenges:["Expired medicine stock losses","Over-stocking slow-moving items","Missing daily billing patterns","Untracked supplier payments"], outcomes:["Reduce expiry losses by up to 60%","Identify top 20 selling medicines","Track daily billing & cash flow","Optimize purchase orders"] },
    { icon:"🏨", name:"Hotels", color:"#8b5cf6", challenges:["Low occupancy rate visibility","No RevPAR tracking","Seasonal demand unpredictability","F&B profitability gaps"], outcomes:["Optimize room pricing dynamically","Forecast high and low seasons","Track F&B margins precisely","Benchmark vs industry standards"] },
    { icon:"🏢", name:"Agencies", color:"#06b6d4", challenges:["Project profitability unclear","Billing errors & delays","Team utilization gaps","Revenue mix imbalance"], outcomes:["Find most profitable clients","Track billable hours accurately","Forecast monthly revenue","Improve team productivity"] },
    { icon:"🍽️", name:"Restaurants", color:"#f59e0b", challenges:["Menu item profitability unclear","Food cost percentage too high","Staffing inefficiency","Wastage eating profits"], outcomes:["Find loss-making menu items fast","Reduce food cost by 8–12%","Optimize staff by hour","Cut wastage with smart ordering"] },
    { icon:"🛒", name:"Retail Shops", color:"#22c55e", challenges:["Dead stock piling up","High return rates untracked","Customer frequency unknown","Low-margin categories unclear"], outcomes:["Clear dead stock 40% faster","Identify top profit categories","Track customer buying patterns","Reduce shrinkage losses"] },
    { icon:"🥗", name:"Food Businesses", color:"#f97316", challenges:["Raw material cost overruns","Batch production issues","Pricing vs competition unclear","Delivery profitability unknown"], outcomes:["Cut raw material waste","Price products for optimal margin","Track best-selling SKUs weekly","Analyze delivery profitability"] },
  ];
  return (
    <div className="page-top">
      <div className="page-hero">
        <Badge>Industries We Serve</Badge>
        <h1 className="page-h1">Built for Your Specific Industry</h1>
        <p className="page-sub">Specialized analytics solutions designed around the unique challenges of 6 key Indian SME industries.</p>
      </div>
      <section className="section bg-dark">
        <div className="container">
          <div className="ind-detail-grid">
            {list.map(ind => (
              <div key={ind.name} className="ind-detail-card" style={{ borderTopColor: ind.color }}>
                <div style={{ fontSize:44, marginBottom:14 }}>{ind.icon}</div>
                <h3 className="ind-name">{ind.name}</h3>
                <div style={{ marginBottom:20 }}>
                  <div className="ind-section-label">Common Challenges</div>
                  {ind.challenges.map(c => <div key={c} className="ind-row"><span className="warn-icon">⚠️</span><span>{c}</span></div>)}
                </div>
                <div style={{ borderTop:"1px solid #1e3a5f", paddingTop:16 }}>
                  <div className="ind-section-label">What We Deliver</div>
                  {ind.outcomes.map(o => <div key={o} className="ind-row"><span style={{ color:ind.color, fontSize:15 }}>✓</span><span>{o}</span></div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="page-top">
      <div className="page-hero">
        <Badge>FAQ</Badge>
        <h1 className="page-h1">Frequently Asked Questions</h1>
        <p className="page-sub">Everything you need to know before getting started with Revnex Analytics.</p>
      </div>
      <section className="section bg-dark">
        <div className="container">
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${open===i?"faq-open":""}`}>
                <button onClick={() => setOpen(open===i?null:i)} className="faq-q">
                  <span>{f.q}</span>
                  <span className={`faq-icon ${open===i?"faq-icon-open":""}`}>+</span>
                </button>
                <div className="faq-a" style={{ maxHeight: open===i?300:0 }}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <div className="page-top">
      <div className="page-hero">
        <Badge>Contact Us</Badge>
        <h1 className="page-h1">Let's Talk About Your Business</h1>
        <p className="page-sub">Reach out via any channel. We'll personally call or message you within 24 hours — no bots, no automated replies.</p>
      </div>
      <section className="section bg-dark">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 className="contact-h2">Get In Touch</h2>
              <div className="contact-items">
                {[
                  { icon:"📧", label:"Email Us", value:OWNER_EMAIL, href:`mailto:${OWNER_EMAIL}` },
                  { icon:"📱", label:"Call Us", value:`+91 ${OWNER_PHONE}`, href:`tel:+91${OWNER_PHONE}` },
                  { icon:"💬", label:"WhatsApp", value:`+91 ${OWNER_PHONE}`, href:`https://wa.me/${OWNER_WHATSAPP}` },
                  { icon:"📍", label:"Location", value:"Aurangabad, Maharashtra, India", href:null },
                  { icon:"🕐", label:"Working Hours", value:"Mon – Sat: 9:00 AM – 7:00 PM IST", href:null },
                ].map(c => (
                  <div key={c.label} className="contact-item">
                    <div className="contact-icon">{c.icon}</div>
                    <div>
                      <div className="contact-label">{c.label}</div>
                      {c.href
                        ? <a href={c.href} target={c.href.startsWith("http")?"_blank":"_self"} rel="noreferrer" className="contact-value link">{c.value}</a>
                        : <div className="contact-value">{c.value}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <a href={`https://wa.me/${OWNER_WHATSAPP}?text=Hi! I found Revnex Analytics online. I'm interested in a free consultation for my business.`} target="_blank" rel="noreferrer" className="wa-big-btn">💬 Start WhatsApp Chat Now</a>
            </div>
            <div className="form-box">
              <h3 className="form-heading">Send Us a Message</h3>
              <p className="form-subheading">We'll personally review and respond within 24 hours.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Static Pages ───────────────────────────────────────────────────────────
function StaticPage({ title, badge, sections }) {
  return (
    <div className="page-top">
      <div className="page-hero" style={{ textAlign:"left", padding:"90px 5% 60px" }}>
        <Badge>{badge}</Badge>
        <h1 className="page-h1" style={{ margin:"20px 0 0" }}>{title}</h1>
      </div>
      <section className="section bg-dark">
        <div className="container" style={{ maxWidth:800 }}>
          {sections.map(([h,t]) => (
            <div key={h} className="static-card">
              <h3 className="static-h3">{h}</h3>
              <p className="static-p">{t}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const navigate = (p) => { setPage(p); setTimeout(() => window.scrollTo({ top:0, behavior:"smooth" }), 50); };

  const renderPage = () => {
    switch(page) {
      case "Home": return <Home setPage={navigate} />;
      case "About": return <About />;
      case "Services": return <Services setPage={navigate} />;
      case "Industries": return <Industries />;
      case "FAQ": return <FAQ />;
      case "Contact": return <Contact />;
      case "Privacy": return (
        <StaticPage title="Privacy Policy" badge="Legal" sections={[
          ["Data Collection","We collect only the business data you explicitly share with us for the purpose of analytics and consulting. No data is collected without your direct consent."],
          ["Data Security","All client data is stored with encryption and industry-standard security. We use secure channels for all data transfers and storage."],
          ["Data Sharing","We do not sell, share, or disclose your business data to any third party under any circumstances. A mutual NDA is signed before every project begins."],
          ["Data Retention","Your data is retained only for the project duration and deleted within 30 days of project completion, unless you explicitly request otherwise."],
          ["Contact","For any privacy-related queries, reach us at "+OWNER_EMAIL+" or call +91 "+OWNER_PHONE+"."],
        ]} />
      );
      case "Terms": return (
        <StaticPage title="Terms & Conditions" badge="Legal" sections={[
          ["Services","Revnex Analytics Consulting provides data analytics and business intelligence services as described in the project agreement signed before work commencement."],
          ["Payment","50% advance payment is required to begin work. The remaining 50% is due upon project delivery. All payments are non-refundable once work has commenced."],
          ["Intellectual Property","All dashboards, reports, and deliverables created for you become your property upon full payment. Our methodologies and templates remain our intellectual property."],
          ["Confidentiality","Both parties agree to keep all shared business information strictly confidential. A mutual NDA is signed before any data sharing occurs."],
          ["Liability","Revnex's liability is limited to the fees paid for the specific project. We are not responsible for business decisions made based on our analytics outputs."],
          ["Contact","For any questions about these terms, reach us at "+OWNER_EMAIL+" or call +91 "+OWNER_PHONE+"."],
        ]} />
      );
      default: return <Home setPage={navigate} />;
    }
  };

  return (
    <div className="app">
      <Navbar page={page} setPage={navigate} />
      {renderPage()}
      <Footer setPage={navigate} />
    </div>
  );
}