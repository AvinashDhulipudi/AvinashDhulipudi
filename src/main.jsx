import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/app.scss";

const BASE = import.meta.env.BASE_URL;
const RESUME_URL = `${BASE}Avinash_Dhulipudi_Technical_Lead_Resume.pdf`;

const featuredWork = [
  {
    number: "01", slug: "feast-factory", icon: "language", category: "Independent build · Website · Commerce", title: "The Feast Factory",
    summary: "A live catering platform that makes ordering for offices, communities and celebrations simpler—from menu discovery to confirmed booking.",
    image: "images/pictures/case-feast-factory.jpg", imageAlt: "Modern Indian catering prepared for The Feast Factory case study",
    proof: "Live customer, admin and API platform", stack: ["Next.js", "React", "NestJS", "PostgreSQL", "Razorpay"],
    href: "https://thefeastfactory.in/", linkLabel: "Visit the live website",
    facts: [["Role", "Sole designer and developer"], ["Engagement", "Independent product build"], ["Scope", "Customer, admin and APIs"], ["Status", "Live platform"]],
    decisions: [
      ["account_tree", "One authoritative platform", "Customer journeys, administration and backend rules share one product model instead of drifting across disconnected tools."],
      ["payments", "Payments treated as a workflow", "Booking, payment status, receipts and invoices are connected so operations can reconcile what a customer sees."],
      ["deployed_code", "Built for continued change", "Menus, packages, venues and availability can evolve without rebuilding the ordering experience for every business change."],
    ],
    details: [
      ["Challenge", "Turn meal boxes, packages, venues and service windows into one clear customer journey while keeping pricing authoritative."],
      ["My role", "As the sole developer, I designed and built the customer experience, administration application, APIs, data model, authentication, cart, booking and payment workflows."],
      ["Result", "An end-to-end platform with menu builders, saved carts, quotes, Razorpay payments, receipts, invoices and booking administration."],
    ],
  },
  {
    number: "02", slug: "apollo-homecare", icon: "health_and_safety", category: "Consulting work · Healthcare platform", title: "Apollo HomeCare",
    summary: "Consulting and engineering contribution to a production healthcare experience spanning care discovery, bookings, diagnostics, equipment and ordering.",
    image: "images/pictures/case-apollo-homecare.jpg", imageAlt: "Home healthcare consultation for the Apollo HomeCare case study",
    proof: "Service and commerce", stack: ["Next.js", "TypeScript", "Medusa", "PostgreSQL", "GCP"],
    facts: [["Role", "Consulting engineer"], ["Engagement", "Healthcare platform"], ["Scope", "Storefront and backend"], ["Focus", "Production readiness"]],
    decisions: [
      ["location_on", "Location-aware availability", "City and service availability need to remain clear before customers enter a booking or ordering journey."],
      ["health_and_safety", "Care journeys before commerce", "The interface has to preserve trust and clarity while supporting the mechanics of catalogues, checkout and fulfilment."],
      ["monitor_heart", "Graceful production behaviour", "Health checks, cold-start handling and defensive integration paths reduce avoidable disruption for customer-facing journeys."],
    ],
    details: [
      ["Challenge", "Bring a broad care catalogue and commerce journey into a fast, resilient experience that works across cities and devices."],
      ["Consulting contribution", "Worked across the storefront and backend on bookings, catalogues, city availability, authentication, checkout, payments and admin tooling."],
      ["Result", "Improved production readiness through graceful degradation, cold-start handling, health checks and cloud deployment improvements."],
    ],
  },
  {
    number: "03", slug: "enterprise-lending-modernization", icon: "cloud_sync", category: "Architecture · Modernization · Cloud", title: "Enterprise lending modernization",
    summary: "Modernizing a large Java service estate and corporate-credit workflows without interrupting business-critical journeys.",
    image: "images/pictures/case-enterprise-modernization.jpg", imageAlt: "Modern technology campus representing enterprise platform modernization",
    proof: "70% lower infrastructure cost", stack: ["Java 21", "Spring Boot", "Docker", "Kubernetes", "GCP"],
    facts: [["Role", "Architecture and technical lead"], ["Estate", "40+ Java services"], ["Delivery", "13 containerized services"], ["Outcome", "70% lower infrastructure cost"]],
    decisions: [
      ["conversion_path", "Modernize in controlled slices", "Services move through repeatable upgrade and validation paths so business-critical lending journeys stay protected."],
      ["container", "Standardize the runtime boundary", "Containerization reduces environmental drift and makes deployment, scaling and operational ownership more consistent."],
      ["shield_lock", "Security inside the delivery path", "Identity, secrets, vulnerability remediation and release evidence are treated as architecture concerns—not final checks."],
    ],
    details: [
      ["Challenge", "Evolve a mission-critical lending estate while protecting availability, business rules and operational confidence."],
      ["My role", "Led an AI-assisted Java 21 upgrade across 40+ services and containerized 13 services for Kubernetes-based delivery."],
      ["Result", "Reduced infrastructure cost by 70% while improving scalability, release consistency and maintainability."],
    ],
  },
];

const additionalWork = [
  { number: "04", category: "Power Platform · Integration", title: "Corporate-credit journeys", summary: "Dataverse models, Canvas Apps, governed Power Automate flows and secure OData integrations supporting a reduction from roughly 30 days to 2 days for eligible credit processing.", stack: ["Canvas Apps", "Dataverse", "Power Automate", "OData", "Cloud Run", "IAM"] },
  { number: "05", category: "Applied AI · Platform resilience", title: "Operational intelligence", summary: "Evidence-led paths for fault isolation, release summaries, change review, deployment orchestration and secure knowledge retrieval.", stack: ["RAG", "Embeddings", "AI agents", "Jenkins", "JIRA"] },
  { number: "06", category: "Independent project · Education · 2020", title: "Fiorello LMS", summary: "Designed and delivered the responsive learning experience, connected frontend journeys to APIs, and prepared the product for release.", stack: ["React", "Node.js", "MongoDB", "REST APIs", "Docker"] },
];

const services = [
  { number: "01", icon: "architecture", title: "Architecture consulting", lead: "Turn business constraints into systems that teams can actually deliver and operate.", description: "I help define boundaries, integration patterns, data ownership, security decisions and pragmatic modernization roadmaps. I stay close to delivery so the architecture survives contact with production.", outcomes: ["System and solution design", "Modernization planning", "Architecture reviews", "Root-cause and resilience work"], proof: ["70%", "lower infrastructure cost", "#/work/enterprise-lending-modernization", "Read the modernization case"] },
  { number: "02", icon: "language", title: "Websites and digital products", lead: "From a clear professional website to a full commerce or operations platform.", description: "Every Laxmi Lancer engagement is delivered directly by me as the sole developer. I design and build the interface, backend services, data model, integrations and cloud deployment, with clear milestones that keep delivery accountable and on time.", outcomes: ["Business and portfolio websites", "Commerce and booking platforms", "React and Next.js products", "Direct ownership from scope to launch"], proof: ["Live", "customer, admin and API platform", "#/work/feast-factory", "Read the Feast Factory case"] },
  { number: "03", icon: "hub", title: "Technical leadership", lead: "Practical direction for teams working through difficult delivery and engineering decisions.", description: "I provide technical direction, critical design and code reviews, mentoring, interview leadership and a structured approach to debugging. I currently lead a 15-person team and support architecture decisions across 50–60 engineers.", outcomes: ["Technical direction", "Engineering mentoring", "Interview panels", "Delivery and quality reviews"], proof: ["50–60", "engineers supported across projects", "#/about", "Review career progression"] },
];

const craftPillars = [
  { icon: "architecture", label: "Think in systems", title: "Architecture that survives reality.", text: "Clear boundaries, secure integrations and delivery choices shaped around the business—not a fashionable diagram.", meta: "Java · GCP · Kubernetes · Power Platform", tone: "blue" },
  { icon: "language", label: "Design for people", title: "Web experiences with a point of view.", text: "Responsive, accessible interfaces that make the business easier to understand and the next action obvious.", meta: "UX · React · Next.js · Accessibility", tone: "paper" },
  { icon: "troubleshoot", label: "Solve the hard part", title: "Root cause before workaround.", text: "I trace failures across the full request path, prove the explanation and strengthen the system after the fix.", meta: "Observability · Performance · Resilience", tone: "acid" },
  { icon: "rocket_launch", label: "Own the launch", title: "One developer, end to end.", text: "Requirements, interface, APIs, data, cloud and production readiness stay with one accountable person.", meta: "Scope · Build · Test · Release", tone: "ink" },
];

const articles = [
  {
    icon: "language", category: "Website delivery", read: "8 min read", title: "What does a professional website really cost?",
    intro: "Projects start from ₹1,00,000. The right quote depends on what the website must achieve, connect to and support after launch.",
    image: "images/pictures/website-pricing-cover.jpg", imageAlt: "A consultant reviewing a business website and wireframes with clients",
    prices: [["Starts from ₹1,00,000", "Requirement-based website delivery", "A clear scope, responsive build, essential SEO, analytics, enquiry journeys and launch support. Integrations and product workflows are quoted after discovery."]],
    body: [
      "A professional website can start from ₹1,00,000, but that is a starting point rather than a universal package. A focused site for a consultant or small business has very different engineering needs from a product with accounts, payments, live availability and operational workflows.",
      "Page count matters less than the work behind those pages. Original design, a content-management system, catalogues, payments, authentication, third-party integrations, migration, accessibility, performance targets, infrastructure and long-term support all affect effort and risk.",
      "Once an engagement includes operational workflows, it is no longer only a website. The Feast Factory is a useful example: its customer experience connects to menus, packages, carts, quotes, bookings, payments, receipts, invoices, administration, APIs and a database.",
      "You work directly with one accountable technical lead who can move from requirements and UX to frontend, backend, data, payments, cloud and production debugging. I bring enterprise engineering discipline without forcing enterprise complexity onto a straightforward business site.",
      "My quote starts with a short requirements conversation. I separate must-haves from later phases, identify integrations and content ownership, agree the launch target, and document inclusions, exclusions and assumptions. The proposal then gives you deliverables, milestones, timeline, price and optional ongoing support.",
      "These ranges are planning guidance, not a fixed menu. Share the business goal, required pages or workflows, integrations, content readiness and preferred launch date, and I will provide a genuine quote in the agreed billing currency.",
    ],
  },
  { icon: "apps", category: "Power Platform", read: "10 min read", title: "Canvas Apps, Power Automate and Dataverse that stay reliable", intro: "Data design, delegation, resilient flows, security and ALM for maintainable enterprise solutions.", body: ["Start with Dataverse, not the first screen. Model business ownership, lifecycle, relationships and alternate keys before adding interface logic. Security roles should describe responsibilities, while teams and field-level controls protect access deliberately.", "Canvas Apps stay maintainable when screens compose reusable components and named formulas instead of duplicating rules. Delegation must be validated against production-scale data because a filter that looks right in development can silently return incomplete results later.", "Power Automate deserves the same discipline as any integration service: explicit trigger contracts, idempotency, deliberate retries, correlation identifiers, failure scopes and a human recovery path.", "Solutions, publishers, connection references, environment variables and data-loss-prevention policies form the ALM boundary. A repeatable route to production lets apps, flows and the data model evolve as one governed product."] },
  { icon: "memory", category: "Java engineering", read: "11 min read", title: "Optimizing Java services: measure the whole request path", intro: "Java 21 profiling, JVM memory, concurrency, database access and the guardrails that keep gains real.", body: ["Optimization begins with a precise symptom and a representative workload. Baseline throughput, error rate and p50, p95 and p99 latency, then follow a slow request across the API, dependencies and database.", "Java Flight Recorder and allocation profiling reveal expensive call paths, object churn, lock contention and retained heap. Examine pause time and allocation rate before changing heap sizes or garbage collectors.", "Java 21 virtual threads can simplify high-concurrency blocking I/O, but they do not create more database connections or downstream capacity. Pools, timeouts, bulkheads and back-pressure must be sized as one system.", "A change is complete only when the same load test proves the improvement without moving the bottleneck or weakening correctness. Regression thresholds and production telemetry preserve the gain through future releases."] },
  { icon: "cloud", category: "Cloud architecture", read: "7 min read", title: "Operating Kubernetes on GCP with fewer surprises", intro: "Workload boundaries, probes, resource policy and observability practices for dependable platforms.", body: ["Reliability starts before deployment YAML. Workloads need clear ownership, graceful shutdown, meaningful readiness and liveness probes, and resource requests based on observed behaviour.", "On GCP, I prefer workload identity over long-lived keys, centralized logging with useful correlation fields, and releases that make rollback ordinary. Autoscaling should follow a signal connected to user impact, not CPU by habit.", "A cluster is an operating environment, not the architecture. Simpler service boundaries and rehearsed failure handling create more resilience than another controller."] },
  { icon: "troubleshoot", category: "Problem solving", read: "5 min read", title: "Debugging from symptom to root cause", intro: "A disciplined way to isolate intermittent failures, test explanations and improve the next investigation.", body: ["Strong debugging begins by making the symptom precise: who is affected, when it starts, what changed and which evidence distinguishes a cause from a coincidence.", "Narrow the system at its boundaries—client, API, dependency, data and infrastructure—and choose the smallest experiment that can disprove a hypothesis. Logs help only when they share identifiers and answer a concrete question.", "After the fix, capture the root cause, the conditions that allowed it and the missing signal that made diagnosis slow. The best resolution prevents the defect and shortens the next investigation."] },
];

const routeMap = { "": "home", top: "home", work: "work", expertise: "services", services: "services", writing: "journal", journal: "journal", about: "about" };
function currentRoute() {
  const path = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (path.startsWith("work/")) return path;
  return routeMap[path] || "home";
}
function MaterialIcon({ name, className = "" }) { return <span className={`material-symbols-rounded ${className}`} aria-hidden="true">{name}</span>; }
function LinkButton({ href, children, tone = "dark" }) { return <a className={`button button-${tone}`} href={href}>{children}<MaterialIcon name="arrow_outward" className="button-icon" /></a>; }
function ResumeLink({ className = "" }) { return <a className={`resume-link ${className}`.trim()} href={RESUME_URL} download="Avinash_Dhulipudi_Technical_Lead_Resume.pdf">Résumé <MaterialIcon name="download" /></a>; }

function ScrollProgress({ page }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [page]);
  return <div className="scroll-progress" aria-hidden="true"><span style={{ "--scroll-progress": progress }} /></div>;
}

function Header({ page }) {
  const [open, setOpen] = useState(false);
  const links = [["Projects", "work"], ["Consulting", "services"], ["Insights", "journal"], ["About", "about"]];
  return <header className="site-header">
    <a className="brand" href="#/" onClick={() => setOpen(false)}><span className="brand-mark">AD</span><span><strong>Avinash Dhulipudi</strong><small>Architecture · Consulting · Web development</small></span></a>
    <button className="menu-button" type="button" aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? "Close" : "Menu"}</button>
    <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
      {links.map(([label, route]) => <a className={page === route || page.startsWith(`${route}/`) ? "active" : ""} href={`#/${route}`} key={route} onClick={() => setOpen(false)}>{label}</a>)}
      <ResumeLink className="nav-resume" />
      <a className="nav-contact" href="mailto:avinashdhulipudi4444@gmail.com?subject=Project%20or%20consulting%20enquiry">Discuss a project <MaterialIcon name="arrow_outward" /></a>
    </nav>
  </header>;
}

function SectionHeading({ eyebrow, title, intro }) { return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{intro && <p>{intro}</p>}</div>; }

function ContactBand() { return <section className="contact-band" data-reveal><MaterialIcon name="chat_bubble" className="contact-symbol" /><p className="eyebrow">Available for selected freelance, consulting and full-time conversations</p><h2>Bring me the problem.<br /><em>I’ll help make it clear.</em></h2><p>Tell me what you are building, where it is stuck and what a good outcome looks like. I’ll reply with a practical next step.</p><LinkButton href="mailto:avinashdhulipudi4444@gmail.com?subject=Project%20or%20consulting%20enquiry" tone="light">Email Avinash</LinkButton></section>; }

function AudiencePaths() { return <section className="audience-paths" data-reveal><div className="page-width audience-path-grid"><article className="audience-card audience-card-project"><div className="audience-card-top"><MaterialIcon name="rocket_launch" /><span>01 · For businesses</span></div><h2>Build something<br /><em>that has to work.</em></h2><p>Bring a website, digital product or architecture problem. You work directly with the person who scopes, designs and builds it.</p><div className="audience-card-actions"><LinkButton href="mailto:avinashdhulipudi4444@gmail.com?subject=Project%20or%20consulting%20enquiry" tone="light">Start a project</LinkButton><a className="text-link light-link" href="#/services">See consulting options</a></div></article><article className="audience-card audience-card-career"><div className="audience-card-top"><MaterialIcon name="badge" /><span>02 · For hiring teams</span></div><h2>Review ten years of<br /><em>engineering depth.</em></h2><p>See my progression from hands-on engineer to Senior Consultant Specialist, along with the architecture and delivery work behind it.</p><div className="audience-card-actions"><ResumeLink className="button button-dark" /><a className="text-link" href="#/about">Review career story</a></div></article></div></section>; }

function CraftSection() { return <section className="craft-section page-section" id="capabilities" data-reveal><div className="page-width craft-layout"><div className="craft-intro"><p className="eyebrow">Design mind · Engineering depth</p><h2>I shape the idea.<br /><em>Then I build it.</em></h2><p>Good digital work is equal parts judgement and execution. I bring both into one direct engagement, whether the brief is a website, a product or a difficult architecture decision.</p><a className="text-link" href="#/services">Explore how I can help</a></div><div className="craft-grid">{craftPillars.map((pillar, index) => <article className={`craft-card craft-${pillar.tone}`} key={pillar.title} data-reveal style={{ "--reveal-delay": `${index * 70}ms` }}><div className="craft-card-top"><MaterialIcon name={pillar.icon} /><span>0{index + 1}</span></div><p className="craft-label">{pillar.label}</p><h3>{pillar.title}</h3><p>{pillar.text}</p><small>{pillar.meta}</small></article>)}</div></div></section>; }

function ProjectShowcase() { return <section className="project-showcase page-section" data-reveal><div className="page-width"><SectionHeading eyebrow="Selected project stories" title="Proof you can scroll through." intro="Three different contexts. The same standard of ownership, technical depth and practical delivery." /></div><div className="project-scroller" aria-label="Selected project highlights">{featuredWork.map((project, index) => <article className="project-slide" key={project.number} data-reveal style={{ "--reveal-delay": `${index * 90}ms` }}><img src={`${BASE}${project.image}`} alt={project.imageAlt} /><div className="project-slide-shade" /><div className="project-slide-copy"><div><span>{project.number}</span><span>{project.category}</span></div><h3>{project.title}</h3><p>{project.summary}</p><strong>{project.proof}</strong><a href={`#/work/${project.slug}`} aria-label={`Read the ${project.title} case study`}>View case study <MaterialIcon name="arrow_outward" /></a></div></article>)}</div><div className="page-width scroll-hint"><MaterialIcon name="swipe" /><span>Scroll the work horizontally</span><div /></div></section>; }

function ArchitectureSection() { return <section className="architecture-section" data-reveal><div className="page-width architecture-grid"><div className="architecture-copy"><p className="eyebrow">Architecture with delivery in mind</p><h2>Systems that make sense <em>on the diagram and in production.</em></h2><p>I connect user experience, APIs, Java services, Power Platform, applied AI, cloud infrastructure and data into one accountable design. The goal is not a complicated picture—it is clear ownership, secure boundaries and a system a team can operate.</p><div className="architecture-principles"><div><MaterialIcon name="route" /><span>Business journeys first</span></div><div><MaterialIcon name="shield_lock" /><span>Secure integration boundaries</span></div><div><MaterialIcon name="monitoring" /><span>Observable by design</span></div></div><a className="text-link light-link" href="#/services">Explore architecture consulting</a></div><figure><img src={`${BASE}images/pictures/architecture-blueprint.jpg`} alt="Blueprint showing web, API, Java, Power Platform, AI, Kubernetes and data architecture" /><figcaption>Reference architecture · shaped to the requirement, not copied from a template</figcaption></figure></div></section>; }

function RemoteDeliverySection() { return <section className="remote-section" data-reveal><div className="page-width remote-grid"><figure><img src={`${BASE}images/pictures/remote-delivery-blueprint.jpg`} alt="Blueprint showing a remote delivery workflow from discovery through release" /><figcaption>Remote delivery model · discover, design, build, review and release</figcaption></figure><div className="remote-copy"><p className="eyebrow">Remote delivery</p><h2>One developer.<br /><em>Clear ownership.</em></h2><p>I work from Hyderabad with clients across locations. As the sole developer on independent engagements, I own the path from requirements and architecture through build, testing and launch. Visible milestones and working demonstrations keep progress clear and delivery on time.</p><ul><li><strong>Direct communication</strong><span>You speak with the person designing and building the solution—without layers of hand-offs.</span></li><li><strong>Progress you can inspect</strong><span>Milestones, demonstrations and risks stay visible throughout delivery.</span></li><li><strong>Production discipline</strong><span>Secure access, controlled environments and careful handling of client data.</span></li><li><strong>Timezone-aware cadence</strong><span>Planned overlap for decisions, with uninterrupted build time between reviews.</span></li></ul></div></div></section>; }

function BitsNetworkSection() { return <section className="bits-section" data-reveal><div className="page-width bits-grid"><figure><img src={`${BASE}images/pictures/bits-pilani-campus.jpg`} alt="An editorial campus view representing BITS Pilani" /><figcaption><strong>BITS Pilani</strong><span>B.E. Computer Science · 2016–2020</span></figcaption></figure><div><p className="eyebrow">Built at BITS Pilani</p><h2>A strong foundation.<br /><em>A wider perspective.</em></h2><p>I started building software in college and still draw on the curiosity, discipline and friendships formed there. I stay connected with fellow alumni for knowledge-sharing and perspective, while every Laxmi Lancer client project remains solely designed, built and delivered by me.</p><p className="bits-note">One developer. One accountable relationship—from the first conversation to launch.</p><a className="text-link" href="#/about">Read my story</a></div></div></section>; }

function HomePage() { return <main>
  <section className="hero page-width" data-reveal><div className="hero-copy"><div className="availability-pill"><span />Available for selected projects</div><p className="eyebrow">Architecture · Products · Websites</p><h1>Complex ideas, turned into <em>dependable digital products.</em></h1><p className="hero-lede">I’m Avinash Dhulipudi—an architecture consultant and hands-on engineer based in Hyderabad. I work directly with businesses as the sole developer on independent projects, from the first technical decision through a dependable launch.</p><div className="hero-actions"><LinkButton href="mailto:avinashdhulipudi4444@gmail.com?subject=Project%20or%20consulting%20enquiry">Discuss your project</LinkButton><LinkButton href="#/work" tone="outline">See projects</LinkButton></div><p className="hero-note">Sole developer for every independent engagement · Clear milestones · On-time delivery</p><a className="scroll-cue" href="#capabilities"><span>Scroll to explore</span><MaterialIcon name="south" /></a></div><figure className="hero-image"><div className="hero-image-frame"><img src={`${BASE}images/pictures/hero-collaboration.jpg`} alt="An engineering team collaborating on a technical problem" /><div className="hero-image-card"><MaterialIcon name="code_blocks" /><span><strong>Design + engineering</strong>One owner from idea to launch</span></div></div><figcaption><span>Hyderabad, India</span><span>Working with clients worldwide</span></figcaption></figure></section>
  <section className="proof-strip" aria-label="Experience highlights"><div><strong>10+</strong><span>years building software</span></div><div><strong>10+</strong><span>successful projects &amp; websites</span></div><div><strong>6+</strong><span>years independent delivery</span></div><div><strong>50–60</strong><span>engineers supported</span></div></section>
  <AudiencePaths />
  <CraftSection />
  <ProjectShowcase />
  <ArchitectureSection />
  <BitsNetworkSection />
  <section className="page-section page-width journal-preview" data-reveal><SectionHeading eyebrow="Field notes" title="Useful thinking, shared openly." intro="Practical writing for clients and engineering teams—without hiding the trade-offs." /><div className="journal-feature"><img src={`${BASE}images/pictures/website-pricing-cover.jpg`} alt="A website planning conversation between a consultant and clients" /><div><MaterialIcon name="edit_note" className="journal-symbol" /><p className="eyebrow">Website delivery · 8 min read</p><h3>{articles[0].title}</h3><p>{articles[0].intro}</p><a className="text-link" href="#/journal">Read the article</a></div></div></section>
  <ContactBand />
</main>; }

function WorkPage() { return <main>
  <section className="page-intro page-width" data-reveal><p className="eyebrow">10+ successful projects and websites</p><h1>Built to launch.<br /><em>Designed to last.</em></h1><p>Independent products, consulting contributions and enterprise modernization—each showing what I owned, how I approached the problem and what changed. Every Laxmi Lancer engagement is designed and delivered solely by me.</p></section>
  <section className="case-page page-width">{featuredWork.map((project, index) => <article className={`case-feature ${index % 2 ? "reverse" : ""}`} key={project.number} data-reveal><div className="case-image-wrap"><img src={`${BASE}${project.image}`} alt={project.imageAlt} /><span><MaterialIcon name={project.icon} />{project.number}</span></div><div className="case-copy"><div className="project-meta"><span>{project.number}</span><span>{project.category}</span></div><h2>{project.title}</h2><p className="case-summary">{project.summary}</p><strong className="case-proof">{project.proof}</strong><div className="case-details">{project.details.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div><div className="tag-row">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><a className="project-visit" href={`#/work/${project.slug}`}>Read full case study <MaterialIcon name="arrow_forward" /></a>{project.href && <a className="project-visit project-visit-secondary" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <MaterialIcon name="arrow_outward" /></a>}</div></div></article>)}</section>
  <RemoteDeliverySection />
  <section className="more-work page-width" data-reveal><SectionHeading eyebrow="More project evidence" title="Focused engagements. Useful outcomes." intro="Power Platform delivery, applied AI and the Fiorello learning platform." />{additionalWork.map(project => <article key={project.number} data-reveal><div className="project-meta"><span>{project.number}</span><span>{project.category}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="tag-row">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</section>
  <ContactBand />
</main>; }

function CaseStudyPage({ project }) {
  const index = featuredWork.findIndex(item => item.slug === project.slug);
  const nextProject = featuredWork[(index + 1) % featuredWork.length];
  return <main className="case-study-detail">
    <section className="case-detail-hero page-width" data-reveal><a className="back-link" href="#/work"><MaterialIcon name="arrow_back" /> All projects</a><div className="case-detail-heading"><div><p className="eyebrow">Case {project.number} · {project.category}</p><h1>{project.title}</h1></div><div><p>{project.summary}</p><strong>{project.proof}</strong></div></div><figure className="case-detail-media"><img src={`${BASE}${project.image}`} alt={project.imageAlt} /><figcaption><span>Selected work</span><span>{project.title}</span></figcaption></figure></section>
    <section className="case-facts" aria-label={`${project.title} project facts`}><div className="page-width case-facts-grid">{project.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>
    <section className="case-narrative page-width" data-reveal><aside><span>{project.number}</span><p className="eyebrow">The work</p></aside><div className="case-story-grid">{project.details.map(([title, text], detailIndex) => <article key={title}><span>0{detailIndex + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</div></section>
    <section className="case-decisions" data-reveal><div className="page-width"><SectionHeading eyebrow="Decisions that mattered" title="Technical judgement, made visible." intro="A case study should explain more than the finished screen. These are the choices that shaped a dependable outcome." /><div className="decision-grid">{project.decisions.map(([icon, title, text], decisionIndex) => <article key={title}><div><MaterialIcon name={icon} /><span>0{decisionIndex + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="case-stack page-width" data-reveal><div><p className="eyebrow">Technology in context</p><h2>The stack served<br /><em>the requirement.</em></h2></div><div><p>Tools were selected around delivery, integration, operating constraints and the people responsible for the system after launch.</p><div className="tag-row">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>{project.href && <a className="project-visit" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <MaterialIcon name="arrow_outward" /></a>}</div></section>
    <section className="next-case" data-reveal><a className="page-width" href={`#/work/${nextProject.slug}`}><span><small>Next case</small>{nextProject.category}</span><strong>{nextProject.title}</strong><MaterialIcon name="arrow_forward" /></a></section>
    <ContactBand />
  </main>;
}

function ServicesPage() { return <main><section className="page-intro page-width" data-reveal><p className="eyebrow">Architecture and delivery consulting</p><h1>Clear decisions.<br /><em>Confident delivery.</em></h1><p>Bring me a difficult technical decision, a product that needs shaping or a website that must do more than look polished. You work directly with me from the first requirement to production—without sales layers or developer hand-offs.</p></section><section className="service-page page-width">{services.map(service => <article key={service.number} data-reveal><div className="service-number"><MaterialIcon name={service.icon} /><span>{service.number}</span></div><div><h2>{service.title}</h2><p className="service-lead">{service.lead}</p></div><div><p>{service.description}</p><ul>{service.outcomes.map(item => <li key={item}><MaterialIcon name="check" />{item}</li>)}</ul><a className="service-proof" href={service.proof[2]}><strong>{service.proof[0]}</strong><span><small>Evidence from the work</small>{service.proof[1]}<b>{service.proof[3]} <MaterialIcon name="arrow_forward" /></b></span></a></div></article>)}</section><section className="website-offer" data-reveal><div className="page-width website-offer-grid"><div><p className="eyebrow">Website projects</p><h2>Start with the outcome.<br /><em>Price the real requirement.</em></h2><p>Professional website engagements start from ₹1,00,000. The final quote reflects the content, design, integrations, workflows and launch support your business actually needs.</p><a className="text-link light-link" href="#/journal">How website estimates work</a></div><div className="price-start"><MaterialIcon name="request_quote" /><span>Starts from</span><strong>₹1,00,000</strong><p>Requirement discovery, responsive delivery and a clear written scope before build.</p></div></div></section><section className="page-section page-width process-section" data-reveal><SectionHeading eyebrow="How engagements run" title="Clear decisions before heavy delivery." intro="A lightweight process that keeps scope, progress and ownership visible." /><ol><li><MaterialIcon name="travel_explore" /><span>01</span><h3>Understand</h3><p>Business goal, audience, workflows, constraints and what success should look like.</p></li><li><MaterialIcon name="account_tree" /><span>02</span><h3>Shape</h3><p>Scope, architecture, milestones, assumptions, risks and a requirement-based quote.</p></li><li><MaterialIcon name="code_blocks" /><span>03</span><h3>Build</h3><p>I build the solution directly, share working progress and keep each milestone on track.</p></li><li><MaterialIcon name="rocket_launch" /><span>04</span><h3>Support</h3><p>Launch, handover, documentation and optional ongoing improvement.</p></li></ol></section><ContactBand /></main>; }

function JournalPage() { return <main><section className="page-intro page-width" data-reveal><p className="eyebrow">Engineering insights</p><h1>Better decisions.<br /><em>Fewer expensive surprises.</em></h1><p>Practical notes for clients and engineering teams on websites, architecture, Power Platform, Java, cloud delivery and root-cause debugging.</p></section><section className="article-list page-width">{articles.map((article, index) => <details className="article" key={article.title} data-reveal><summary>{article.image && <img src={`${BASE}${article.image}`} alt={article.imageAlt} />}<div className="article-index"><MaterialIcon name={article.icon} /><span>0{index + 1}</span></div><div><div className="article-meta"><span>{article.category}</span><span>{article.read}</span></div><h2>{article.title}</h2><p>{article.intro}</p><span className="read-label">Read insight <MaterialIcon name="add" /></span></div></summary><div className="article-body">{article.prices && <div className="price-guide">{article.prices.map(([price, label, text]) => <div key={price}><strong>{price}</strong><h3>{label}</h3><p>{text}</p></div>)}</div>}<div className="article-columns">{article.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>{index === 0 && <LinkButton href="mailto:avinashdhulipudi4444@gmail.com?subject=Website%20project%20quote&body=Business%20goal%3A%0ARequired%20pages%20or%20workflows%3A%0AIntegrations%3A%0ATarget%20launch%20date%3A%0ABudget%20range%3A">Request a requirement-based quote</LinkButton>}<span className="close-note">Select the title again to close</span></div></details>)}</section><ContactBand /></main>; }

function AboutPage() { return <main><section className="about-hero page-width" data-reveal><div><p className="eyebrow">Engineer · Consultant · Sole proprietor</p><h1>Curious by nature.<br /><em>Accountable by choice.</em></h1><p>I started building software at BITS Pilani and have spent 10+ years learning how technology, people and business decisions fit together.</p><div className="about-actions"><ResumeLink className="button button-dark" /><a className="text-link" href="mailto:avinashdhulipudi4444@gmail.com?subject=Career%20conversation">Discuss a role</a></div></div><img src={`${BASE}images/pictures/hero-collaboration.jpg`} alt="Engineers collaborating around a table" /></section><section className="about-story page-width" data-reveal><div><p className="eyebrow">The short version</p></div><div><p className="large-copy">I’m a Senior Consultant Specialist and Technical Lead at HSBC Technology India, based in Hyderabad. I lead a 15-person team and support architecture decisions across 50–60 engineers.</p><p>Laxmi Lancer™ is my sole proprietorship for independent client work. I am the sole developer on every engagement—owning requirements, architecture, UX, code, testing, deployment and launch. I have completed 10+ successful projects and websites with clear milestones and on-time delivery.</p><p>My independent work includes The Feast Factory and Fiorello’s learning platform, while my consulting work has included engineering contributions to Apollo HomeCare. I’m at my best when a system feels difficult: clarifying the real constraint, debugging the root cause and turning the fix into a more resilient design.</p></div></section><section className="career-section" data-reveal><div className="page-width"><SectionHeading eyebrow="Experience" title="From hands-on engineer to architecture lead." /><div className="career-list"><article><span>Sep 2020 — now</span><div><h3>HSBC Technology India</h3><p>Enterprise lending, cloud, Power Platform, applied AI and technical leadership.</p><ol><li>Trainee Software Engineer</li><li>Software Engineer</li><li>Senior Software Engineer</li><li>Consultant Specialist</li><li>Senior Consultant Specialist</li></ol></div></article><article><span>2020 — now</span><div><h3>Laxmi Lancer™ · Sole proprietorship</h3><p>10+ successful projects and websites, personally scoped, built and delivered by me for growing businesses.</p></div></article><article><span>Mar — Jul 2020</span><div><h3>Fiorello Technologies</h3><p>UI/UX, responsive frontend delivery, API integration and release preparation for an LMS.</p></div></article><article><span>Jul — Dec 2019</span><div><h3>BlueJeans Networks</h3><p>Production video-calling UI modernization, accessibility and P1/P2 defect resolution.</p></div></article><article><span>2016 — 2020</span><div><h3>B.E. Computer Science · BITS Pilani</h3><p>The foundation for a trusted professional network and a career in engineering.</p></div></article></div></div></section><section className="values page-width" data-reveal><SectionHeading eyebrow="Working principles" title="Professional does not have to mean distant." /><div><article><span>01</span><h3>Tell the truth early</h3><p>Clear risks, realistic trade-offs and a quote grounded in the actual requirement.</p></article><article><span>02</span><h3>Own the outcome</h3><p>One developer stays accountable for architecture, quality, delivery and launch.</p></article><article><span>03</span><h3>Deliver to the plan</h3><p>Visible milestones, early risk management and direct communication keep commitments on time.</p></article></div></section><ContactBand /></main>; }

function Footer() { return <footer className="site-footer"><div className="page-width footer-grid"><div><a className="brand footer-brand" href="#/"><span className="brand-mark">LL</span><span><strong>Laxmi Lancer™</strong><small>Sole proprietorship · Avinash Dhulipudi</small></span></a><p>Architecture consulting, technical leadership and website development—personally delivered from Hyderabad, India.</p></div><div><h3>Explore</h3><a href="#/work">Projects</a><a href="#/services">Consulting</a><a href="#/journal">Insights</a><a href="#/about">About</a></div><div><h3>Connect</h3><a href="mailto:avinashdhulipudi4444@gmail.com">Email</a><a href="https://github.com/AvinashDhulipudi" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/avinash-dhulipudi/" target="_blank" rel="noreferrer">LinkedIn</a><ResumeLink /></div><div className="copyright">© {new Date().getFullYear()} Avinash Dhulipudi<br />Laxmi Lancer™ · Sole proprietorship</div></div></footer>; }

function App() {
  const [page, setPage] = useState(currentRoute());
  useEffect(() => { const onHashChange = () => { setPage(currentRoute()); window.scrollTo({ top: 0, behavior: "auto" }); }; window.addEventListener("hashchange", onHashChange); return () => window.removeEventListener("hashchange", onHashChange); }, []);
  useEffect(() => { const titles = { home: "Avinash Dhulipudi — Architecture, Websites & Technical Leadership", work: "Projects — Avinash Dhulipudi", services: "Architecture & Delivery Consulting — Avinash Dhulipudi", journal: "Engineering Insights — Avinash Dhulipudi", about: "About — Avinash Dhulipudi" }; const project = featuredWork.find(item => page === `work/${item.slug}`); document.title = project ? `${project.title} Case Study — Avinash Dhulipudi` : titles[page]; }, [page]);
  useEffect(() => {
    const root = document.documentElement;
    const elements = [...document.querySelectorAll("[data-reveal]")];
    root.classList.add("reveal-enabled");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    elements.forEach(element => observer.observe(element));
    return () => { observer.disconnect(); root.classList.remove("reveal-enabled"); };
  }, [page]);
  const pages = { home: <HomePage />, work: <WorkPage />, services: <ServicesPage />, journal: <JournalPage />, about: <AboutPage /> };
  const caseProject = featuredWork.find(item => page === `work/${item.slug}`);
  return <div className="site-shell"><ScrollProgress page={page} /><Header page={page} />{caseProject ? <CaseStudyPage project={caseProject} /> : pages[page] || pages.home}<Footer /></div>;
}

const appRoot = createRoot(document.getElementById("root"));
appRoot.render(<StrictMode><App /></StrictMode>);

if (import.meta.hot) {
  import.meta.hot.dispose(() => appRoot.unmount());
}
