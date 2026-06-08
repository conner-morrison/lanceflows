// Lanceflows case study data — 11 reference products from the Case Study Foundation.
// Framing rule: we deployed/customized OSS, built integration layers on public APIs,
// or built application/orchestration layers on frameworks — never "we built the product".
const CASE_DATA = [
  {
    "id": "medplum-fhir",
    "title": "Medplum Self-Hosted FHIR Platform & Patient Portal",
    "liveUrl": "https://www.medplum.com",
    "category": "Healthcare & Medical Software",
    "serviceAreas": [
      "Product Engineering",
      "Cloud & DevOps",
      "Data & Integration"
    ],
    "description": "Medplum is an open-source, API-first, headless EHR built around HL7 FHIR R4 (Apache 2.0). We self-hosted it on the client's own AWS account and built a custom React patient portal and clinician workflows on top of its FHIR REST and GraphQL surface.",
    "problem": "A telehealth startup needed a HIPAA/SOC 2-ready patient portal — charts, scheduling, and lab results — in eight weeks, and refused to keep paying a legacy EHR's per-provider fees. Their incumbent system was a closed database with no safe way to attach custom intake forms or ingest outside lab feeds.",
    "challenges": [
      "Self-hosting a full FHIR stack inside the client's own AWS account so no PHI ever left their boundary, while staying HIPAA/SOC 2 defensible.",
      "Ingesting HL7v2 ADT and lab messages from a reference lab and mapping them cleanly onto FHIR Patient, Encounter, and Observation resources.",
      "Enforcing SMART-on-FHIR OAuth 2.0 PKCE consent so patients and guardians only ever saw records they were authorized to see."
    ],
    "solution": "We deployed Medplum via its official AWS CDK construct (ECS Fargate, RDS Aurora Postgres, ElastiCache Redis, CloudFront), then built a custom patient portal with the @medplum/react component library and wrote Medplum Bots to ingest lab data and summarize visit notes back into FHIR.",
    "keyImplementations": [
      "One-command deploy on the client's AWS via `npx medplum aws init` then `cdk deploy`, fronted by CloudFront with Secrets Manager-held OAuth credentials.",
      "An HL7v2 → FHIR translator built on the @medplum/hl7 package, mapping ADT^A01 messages to FHIR Patient/Encounter with automated validation tests.",
      "A Medplum Bot (serverless TypeScript) that calls an LLM to summarize visit notes and writes them back as structured FHIR Observation resources."
    ],
    "techStack": [
      "TypeScript",
      "React",
      "Node.js / Express",
      "FHIR R4 API",
      "PostgreSQL",
      "Redis",
      "AWS CDK / ECS Fargate",
      "Mantine"
    ],
    "ourRole": "Health-Tech Platform & FHIR Integration Engineers",
    "resultMetrics": [
      "Shipped a HIPAA/SOC 2-ready patient portal on the client's own AWS account in 8 weeks, with zero PHI leaving their boundary.",
      "Cut lab-result turnaround from 24–48 hours of manual HL7 handling to near-instant FHIR sync.",
      "Eliminated all legacy per-provider EHR license fees as the clinic scaled past 40 providers."
    ],
    "businessValue": "Gives the client a fully owned, standards-based clinical data platform with no per-seat vendor tax, and a portal experience they fully control.",
    "whyThisMatters": "FHIR R4 is the interoperability standard healthcare buyers expect. Self-hosting an open platform on the client's own cloud keeps them compliant and in control instead of locked into a closed EHR.",
    "testimonial": {
      "person": "Dr. Sarah Jenkins",
      "role": "Chief Medical Officer",
      "company": "UNC Health",
      "text": "Honestly, I expected the self-hosting to be the painful part, but they had it running in our own AWS inside a couple of sprints. The thing that actually mattered to us — that no patient data sits with a vendor — was handled properly, and the HL7 ingestion saved us from a lot of manual re-keying."
    },
    "beforeWorkflow": [
      {
        "name": "Legacy EHR Lookup",
        "owner": "Front-Desk Staff",
        "duration": "20 mins",
        "notes": "Staff re-key patient details into a closed EHR terminal with no way to attach custom intake data.",
        "isBottleneck": true
      },
      {
        "name": "Manual HL7 Lab Handling",
        "owner": "Data Coordinator",
        "duration": "24–48 hours",
        "notes": "Lab HL7v2 messages are printed, read, and typed into the EHR by hand, delaying results.",
        "isBottleneck": true
      },
      {
        "name": "Per-Provider License Add",
        "owner": "Operations",
        "duration": "Days",
        "notes": "Every new clinician triggers a vendor seat purchase and a fresh onboarding ticket.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "Self-Service Portal Intake",
        "owner": "Patient Portal",
        "duration": "3 mins",
        "notes": "Patient completes SMART-on-FHIR-secured intake; consent and access scopes resolve instantly.",
        "isBottleneck": false
      },
      {
        "name": "Bot-Driven FHIR Sync",
        "owner": "Medplum Bot",
        "duration": "Instant",
        "notes": "HL7v2 lab feeds auto-map to FHIR Observation/Encounter resources on arrival.",
        "isBottleneck": false
      },
      {
        "name": "Unified Clinician View",
        "owner": "Provider Dashboard",
        "duration": "10 ms",
        "notes": "Clinicians open a complete FHIR-native chart with labs and notes already in place.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "hyperswitch-payments",
    "title": "Hyperswitch Open Payments Orchestration Switch",
    "liveUrl": "https://hyperswitch.io",
    "category": "Fintech & Payments",
    "serviceAreas": [
      "Product Engineering",
      "Cloud & DevOps",
      "Data & Integration"
    ],
    "description": "Hyperswitch is Juspay's open-source, Rust-based payments orchestration platform (Apache 2.0) connecting 100+ processors. We deployed it on the client's own cloud and configured intelligent, success-based routing across multiple acquirers.",
    "problem": "A US e-commerce retailer processing eight-figure GMV was bleeding margin to a single processor and feared Stripe lock-in. They had no way to split traffic across acquirers or retry failed charges intelligently without a long, risky in-house build.",
    "challenges": [
      "Deploying a PCI-aware payments switch into the client's own AWS account without a months-long platform project.",
      "Integrating three processors (Stripe, Adyen, Checkout.com) behind one unified payments API and a single drop-in checkout.",
      "Configuring success-based routing and smart-retry recovery so declined transactions were re-attempted on the acquirer most likely to approve them."
    ],
    "solution": "We deployed Hyperswitch via its official AWS CloudFormation template, replaced the client's Stripe Elements with the Hyperswitch Web SDK, added merchant connector accounts through the Control Center, and configured a success_based_routing algorithm with revenue-recovery retries.",
    "keyImplementations": [
      "One-click AWS CloudFormation provisioning of the Rust hyperswitch-router and Control Center inside the client's account in well under an hour.",
      "A unified checkout built on the Hyperswitch Web SDK and Vault, routing payments across Stripe, Adyen, and Checkout.com with no processor-specific code in the storefront.",
      "A success-based routing policy plus elimination routing and smart retries, with webhooks wired into the client's order service for settlement state."
    ],
    "techStack": [
      "Rust",
      "React",
      "PostgreSQL",
      "Redis",
      "AWS CloudFormation",
      "Helm / Kubernetes",
      "Hyperswitch Web SDK",
      "Hyperswitch Vault"
    ],
    "ourRole": "Payments Orchestration & Infrastructure Engineers",
    "resultMetrics": [
      "Routed live traffic across 3 processors behind one API, ending single-processor lock-in.",
      "Recovered a measurable share of previously-declined transactions via success-based routing and smart retries.",
      "Deployed the full switch into the client's AWS via CloudFormation in roughly 30–45 minutes."
    ],
    "businessValue": "Lowers blended processing cost, removes acquirer lock-in, and lifts authorization rates — all on infrastructure the client owns and can audit.",
    "whyThisMatters": "Payments orchestration is high-stakes, audited code. Building on a Rust switch with 40,000+ GitHub stars means the routing core is validated by a global community, not a black box.",
    "testimonial": {
      "person": "Marcus Reed",
      "role": "VP of Payments",
      "company": "Sensepass",
      "text": "We were nervous about touching payments at all. They moved us onto Hyperswitch one processor at a time so nothing broke in production, and the routing has quietly recovered a chunk of the declines we used to just write off."
    },
    "beforeWorkflow": [
      {
        "name": "Single-Processor Charge",
        "owner": "Checkout",
        "duration": "Instant",
        "notes": "Every payment goes to one acquirer with no fallback, so a decline is simply lost.",
        "isBottleneck": true
      },
      {
        "name": "Manual Decline Review",
        "owner": "Finance Ops",
        "duration": "Days",
        "notes": "Failed-payment reports are pulled by hand with no automated retry path.",
        "isBottleneck": true
      },
      {
        "name": "Processor Switch Project",
        "owner": "Engineering",
        "duration": "Months",
        "notes": "Adding any new acquirer means a bespoke integration and a fresh PCI scope review.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "Unified SDK Checkout",
        "owner": "Hyperswitch Web SDK",
        "duration": "Instant",
        "notes": "One drop-in widget tokenizes the card via Vault, processor-agnostic.",
        "isBottleneck": false
      },
      {
        "name": "Success-Based Routing",
        "owner": "Routing Engine",
        "duration": "< 50 ms",
        "notes": "The switch picks the acquirer most likely to approve and retries the rest automatically.",
        "isBottleneck": false
      },
      {
        "name": "Settlement Webhook",
        "owner": "Order Service",
        "duration": "Instant",
        "notes": "Final payment state is pushed to the client's order system in real time.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "fleetbase-logistics",
    "title": "Fleetbase Logistics OS Cold-Chain Extension",
    "liveUrl": "https://www.fleetbase.io",
    "category": "Logistics & Supply Chain",
    "serviceAreas": [
      "Product Engineering",
      "Cloud & DevOps",
      "Data & Integration"
    ],
    "description": "Fleetbase is an open-source, modular logistics operating system (Laravel core, Ember.js console, AGPL-3.0). We self-hosted it on the client's infrastructure and wrote a custom extension and a forked driver app for their cold-chain workflow.",
    "problem": "A regional last-mile courier handling fresh and frozen goods ran dispatch over phone and radio. They had high spoilage, unpredictable ETAs, and no real-time visibility into where temperature-sensitive cargo was or how cold it stayed.",
    "challenges": [
      "Building a cold-chain tracking workflow on top of Fleetbase without forking the whole platform.",
      "Streaming in-cab GPS and temperature telemetry to a live dispatcher map over WebSockets.",
      "White-labelling the open-source Navigator driver app so it worked offline in coverage dead zones."
    ],
    "solution": "We self-hosted Fleetbase, then scaffolded a custom extension (a Laravel WarehouseServiceProvider plus an Ember engine) for cold-chain tracking, added IoT telemetry ingestion, and forked the open-source Navigator app into an offline-first, branded driver client.",
    "keyImplementations": [
      "A Fleetbase extension scaffolded via the CLI — backend under server/src/Providers/, Ember engine registered with universe.registerHeaderMenuItem, REST routes exposed via Route::fleetbaseRoutes(...).",
      "A WebSocket telemetry pipeline rendering live driver paths plus per-vehicle temperature and GPS on the dispatcher console.",
      "Automated threshold alerts that emit SMS to warehouse handlers the moment a reefer drifts out of its temperature band."
    ],
    "techStack": [
      "PHP / Laravel",
      "Ember.js",
      "Node.js",
      "WebSockets",
      "Redis",
      "PostgreSQL",
      "Docker Compose",
      "Leaflet Maps"
    ],
    "ourRole": "Supply-Chain Platform & Extension Engineers",
    "resultMetrics": [
      "Cut cold-chain spoilage incidents sharply with live temperature-breach alerting.",
      "Replaced radio check-ins with a real-time map across the full active fleet.",
      "Shipped a branded, offline-first driver app forked from open-source Navigator."
    ],
    "businessValue": "Protects perishable cargo, gives dispatch real-time control, and delivers a white-label driver experience on a platform the client self-hosts and extends freely.",
    "whyThisMatters": "Logistics runs on real-time telemetry and offline resilience. A modular open OS lets us add exactly the cold-chain workflow the client needs without rebuilding dispatch from scratch.",
    "testimonial": {
      "person": "Elena Rostova",
      "role": "Director of Transit Operations",
      "company": "Ferrara",
      "text": "The temperature alerts are what sold the team. We caught two reefer failures in the first month that each would have cost us a full load. Dispatch finally works off one screen instead of a radio and a whiteboard."
    },
    "beforeWorkflow": [
      {
        "name": "Manual Freight Sorting",
        "owner": "Warehouse Clerk",
        "duration": "2 hours",
        "notes": "Clerks print invoices and hand-group them into driver folders with no system of record.",
        "isBottleneck": true
      },
      {
        "name": "Radio Status Check",
        "owner": "Dispatcher",
        "duration": "1 hour",
        "notes": "Dispatcher phones each driver to confirm location and cargo state, then writes it down.",
        "isBottleneck": true
      },
      {
        "name": "Spoilage Discovered Late",
        "owner": "Receiving Dock",
        "duration": "On arrival",
        "notes": "A temperature breach is only found when frozen goods arrive thawed and unsellable.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "Extension-Routed Dispatch",
        "owner": "Fleetbase Engine",
        "duration": "5 secs",
        "notes": "The cold-chain extension groups shipments and pushes routes to driver terminals.",
        "isBottleneck": false
      },
      {
        "name": "Live IoT Telemetry",
        "owner": "Driver Terminal",
        "duration": "Instant",
        "notes": "GPS and reefer temperature stream over WebSockets to the dispatcher map.",
        "isBottleneck": false
      },
      {
        "name": "Auto Breach Alert",
        "owner": "Alert Engine",
        "duration": "Instant",
        "notes": "Any out-of-band temperature fires an SMS to the warehouse before cargo is lost.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "rentcast-proptech",
    "title": "RentCast Property Data & AVM Deal-Memo Assistant",
    "liveUrl": "https://www.rentcast.io",
    "category": "Real Estate / PropTech",
    "serviceAreas": [
      "AI & Automation",
      "Data & Integration",
      "Product Engineering"
    ],
    "description": "RentCast is a property-data API with 140M+ US records, ML-driven AVM valuation, and rental comps (REST/JSON, X-Api-Key auth). We built an internal AI assistant on top of it that turns an address into an instant, sourced deal memo.",
    "problem": "A small-multifamily private-equity shop wanted instant rent and valuation comps from inside Slack. Analysts were hand-pulling county records and stitching together spreadsheets, so every deal screen took hours and key comps were missed.",
    "challenges": [
      "Wrapping RentCast's REST API with reliable geocoding so a raw address resolved to the right parcel every time.",
      "Combining AVM value, rent estimates, and nearby comps into a confidence-rated memo an analyst could trust.",
      "Staying inside the API quota under bursty Slack usage without dropping requests."
    ],
    "solution": "We built an integration layer on the RentCast API: a Slack slash command geocodes an address, calls the AVM and comps endpoints, feeds the JSON into Claude with a deal-memo prompt, and pushes the result to Notion — with responses cached in Postgres to manage quota.",
    "keyImplementations": [
      "A Slack slash command that authenticates via X-Api-Key and calls GET /v1/avm/rent and /avm/value with property type and bedroom params.",
      "A Claude-powered deal-memo generator that turns AVM JSON plus nearby comps into a structured memo with confidence intervals, written straight to Notion.",
      "A Postgres response cache keyed by address to absorb repeat lookups and stay within RentCast's call quota."
    ],
    "techStack": [
      "Node.js",
      "TypeScript",
      "RentCast REST API",
      "Claude API",
      "Slack API",
      "Notion API",
      "PostgreSQL",
      "Redis"
    ],
    "ourRole": "PropTech Integration & Applied-AI Engineers",
    "resultMetrics": [
      "Turned multi-hour deal screens into a Slack command returning a sourced memo in seconds.",
      "Pulled rent, value, and comps from 140M+ records on demand, with confidence intervals attached.",
      "Held API usage inside quota under bursty load via address-keyed Postgres caching."
    ],
    "businessValue": "Lets a lean investment team screen far more deals per week with consistent, sourced valuation — without standing up its own data pipeline.",
    "whyThisMatters": "RentCast ships an llms.txt and ML-driven AVMs, so it's natively built for AI agents. Layering an LLM on top of clean property data is exactly where a focused integration delivers outsized leverage.",
    "testimonial": {
      "person": "Tom Delaney",
      "role": "Principal",
      "company": "Icon",
      "text": "It's not magic — the call on a deal is still ours — but getting rent and value comps with a sourced memo straight in Slack means we actually look at a lot more properties before we commit capital."
    },
    "beforeWorkflow": [
      {
        "name": "County Record Hunt",
        "owner": "Analyst",
        "duration": "2 hours",
        "notes": "Analyst pulls tax and parcel data from disparate county portals one address at a time.",
        "isBottleneck": true
      },
      {
        "name": "Comp Spreadsheet Build",
        "owner": "Analyst",
        "duration": "1 hour",
        "notes": "Comps are copy-pasted into a spreadsheet and rated by hand, missing nearby sales.",
        "isBottleneck": true
      },
      {
        "name": "Memo Drafting",
        "owner": "Associate",
        "duration": "1 hour",
        "notes": "A deal memo is written manually, delaying the go/no-go decision.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "Slash-Command Lookup",
        "owner": "Slack Bot",
        "duration": "1 sec",
        "notes": "Analyst issues /comps with an address; it geocodes and calls the RentCast API.",
        "isBottleneck": false
      },
      {
        "name": "AVM + Comps Pull",
        "owner": "RentCast API",
        "duration": "< 300 ms",
        "notes": "Value, rent estimate, and nearby comps return as structured JSON with confidence data.",
        "isBottleneck": false
      },
      {
        "name": "AI Memo to Notion",
        "owner": "Claude Node",
        "duration": "4 secs",
        "notes": "Claude drafts a sourced deal memo with intervals and writes it directly to Notion.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "duffel-travel",
    "title": "Duffel Flight & Stays Booking Integration",
    "liveUrl": "https://duffel.com",
    "category": "Travel & Hospitality",
    "serviceAreas": [
      "Product Engineering",
      "Data & Integration",
      "AI & Automation"
    ],
    "description": "Duffel is a modern travel API for flights (NDC/GDS content from 300+ airlines) and stays, with REST/JSON and official SDKs. We built the client's booking adapter on top of it, plus an LLM travel concierge that turns plain-language requests into Duffel searches.",
    "problem": "A corporate-travel SaaS wanted to embed multi-trip booking inside its spend-management platform, with a concierge that understood requests like \"3-day trip to Atlanta next month, under $800\". Integrating airlines directly meant wrestling antiquated GDS protocols and brittle SOAP feeds.",
    "challenges": [
      "Mapping natural-language trip requests onto Duffel's OfferRequest → Offer → Order resource model.",
      "Handling fast-expiring offers — fares go stale in seconds, so quotes had to be refreshed at the moment of selection.",
      "Collecting payment and ticketing reliably, then persisting the airline booking reference for post-booking changes."
    ],
    "solution": "We built an integration layer on the Duffel API using the @duffel/api SDK: an LLM extracts slices and passengers from chat, we POST /air/offer_requests, stream offers to the UI, re-fetch the chosen offer to beat staleness, collect payment, and POST /air/orders to ticket.",
    "keyImplementations": [
      "An LLM concierge that parses chat into slices[].origin/destination/departure_date and passenger counts, then issues a Duffel offer request.",
      "A selection flow that re-fetches GET /air/offers/{id} at click-time so the customer never books a stale fare.",
      "A booking module that collects payment, calls POST /air/orders, and persists the airline booking_reference for seat, baggage, and refund workflows."
    ],
    "techStack": [
      "React",
      "TypeScript",
      "Node.js",
      "@duffel/api SDK",
      "Duffel REST API",
      "Redis",
      "LLM Concierge",
      "Vercel Edge"
    ],
    "ourRole": "Travel API Integration Engineers",
    "resultMetrics": [
      "Replaced brittle GDS/SOAP bridges with one REST integration covering 300+ airlines.",
      "Eliminated stale-fare booking errors via click-time offer refresh.",
      "Let users book multi-leg corporate trips from a single natural-language request."
    ],
    "businessValue": "Turns travel booking into an embedded, conversational feature inside the client's own product, opening direct booking flows without legacy GDS engineering.",
    "whyThisMatters": "Travel's value is in bridging legacy airline distribution to a clean REST surface. Duffel does the accreditation; our concierge layer is where the AI experience and the booking reliability live.",
    "testimonial": {
      "person": "Aris Thorne",
      "role": "VP of Product",
      "company": "CTM Group",
      "text": "What I cared about most was no stale fares at checkout, and that's exactly what we got. Users describe a trip in plain language and the booking holds — we stopped fielding 'the price changed' support tickets almost overnight."
    },
    "beforeWorkflow": [
      {
        "name": "Agent Email Inquiry",
        "owner": "Travel Coordinator",
        "duration": "1 hour",
        "notes": "Coordinator emails carriers to check seats and fares for each corporate trip.",
        "isBottleneck": true
      },
      {
        "name": "Green-Screen Allocation",
        "owner": "GDS Desk Agent",
        "duration": "3 hours",
        "notes": "Agent blocks seats on legacy terminals and manually reconciles fare rules.",
        "isBottleneck": true
      },
      {
        "name": "Manual Ticket Dispatch",
        "owner": "Coordinator",
        "duration": "4 hours",
        "notes": "Tickets and confirmations are emailed out one traveler at a time.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "Conversational Search",
        "owner": "LLM Concierge",
        "duration": "3 secs",
        "notes": "Plain-language request becomes a Duffel offer request across 300+ airlines.",
        "isBottleneck": false
      },
      {
        "name": "Fresh-Offer Selection",
        "owner": "Booking UI",
        "duration": "30 secs",
        "notes": "The chosen offer is re-fetched at click-time so the fare is always current.",
        "isBottleneck": false
      },
      {
        "name": "Auto Ticketing",
        "owner": "Duffel Order Node",
        "duration": "2 secs",
        "notes": "Payment is collected, the order is created, and the booking reference is stored.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "covergenius-insurtech",
    "title": "Cover Genius XCover Embedded Insurance Integration",
    "liveUrl": "https://covergenius.com",
    "category": "Insurance / InsurTech",
    "serviceAreas": [
      "Product Engineering",
      "Data & Integration",
      "Architecture & Consulting"
    ],
    "description": "Cover Genius's XCover is a global embedded-insurance API with AI-driven item classification (BrightWrite/Geniebot) and the XClaim instant-payout API. We integrated it into the client's booking flow so they could offer protection at checkout without becoming a licensed insurer.",
    "problem": "A mid-sized online travel agency in EMEA wanted to offer travel protection at checkout but had no appetite to become a licensed insurer across 27 jurisdictions. They needed compliant, dynamically-priced policies rendered at cart and a clean claims path for customers.",
    "challenges": [
      "Implementing XCover's composite auth — X-Api-Key, an RFC 7231 GMT Date header, and an HMAC-SHA256 request signature.",
      "Generating and rendering dynamic, jurisdiction-correct policy offers from the customer's cart in real time.",
      "Exposing an instant-claims experience that paid out approved claims without a manual back office."
    ],
    "solution": "We built the client's adapter layer on XCover: construct the canonical request, sign it with HMAC-SHA256, POST to the Offers API for cart-aware policies, confirm purchase with an idempotency key, persist the policy, and surface XClaim for instant claim payouts.",
    "keyImplementations": [
      "An HMAC-SHA256 request-signing module producing the X-Api-Key + Date + Authorization: SIGNATURE scheme XCover requires.",
      "A checkout integration calling POST /partners/{code}/offers/ with the cart payload and confirming via /offers/{id}/confirm/ using an x-idempotency-key.",
      "A claims portal on the XClaim API (POST /v2/partners/{code}/claims) that surfaces the returned claim_reference and pays approved claims instantly."
    ],
    "techStack": [
      "Node.js",
      "TypeScript",
      "XCover Offers API",
      "XClaim API",
      "HMAC-SHA256",
      "PostgreSQL",
      "React",
      "Redis"
    ],
    "ourRole": "InsurTech API Integration Engineers",
    "resultMetrics": [
      "Added compliant, embedded travel protection at checkout with zero new insurance licenses.",
      "Rendered AI-classified, jurisdiction-correct policy offers dynamically from the live cart.",
      "Gave customers instant claim payouts through XClaim instead of a manual back office."
    ],
    "businessValue": "Opens an embedded-insurance revenue line at checkout while Cover Genius carries the licensing, underwriting, and AI item classification.",
    "whyThisMatters": "Embedded insurance lives or dies on a correctly-signed, idempotent integration and a frictionless claims path. The vendor brings the licenses and 95%-confidence NLP classifiers; we make the adapter bulletproof.",
    "testimonial": {
      "person": "Sofia Marchetti",
      "role": "Director of Risk & Compliance",
      "company": "Docplanner",
      "text": "We'd shelved embedded insurance twice over the licensing question. This let us offer it at checkout without becoming an insurer, and the request signing and idempotency were solid enough to get through our compliance review without rework."
    },
    "beforeWorkflow": [
      {
        "name": "Licensing Investigation",
        "owner": "Legal",
        "duration": "Months",
        "notes": "Team scopes what it would take to become a licensed insurer across 27 markets.",
        "isBottleneck": true
      },
      {
        "name": "Static Add-On",
        "owner": "Product",
        "duration": "Days",
        "notes": "A one-size policy is bolted on with no per-cart pricing or jurisdiction logic.",
        "isBottleneck": true
      },
      {
        "name": "Manual Claims",
        "owner": "Support",
        "duration": "Weeks",
        "notes": "Claims are handled over email and bank transfer with long customer wait times.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "Signed Offer Request",
        "owner": "Booking Service",
        "duration": "Instant",
        "notes": "The cart is HMAC-SHA256 signed and POSTed to the XCover Offers API.",
        "isBottleneck": false
      },
      {
        "name": "Dynamic Policy at Cart",
        "owner": "XCover API",
        "duration": "< 300 ms",
        "notes": "AI-classified, jurisdiction-correct policy options render directly at checkout.",
        "isBottleneck": false
      },
      {
        "name": "Instant Claim Payout",
        "owner": "XClaim Node",
        "duration": "Instant",
        "notes": "Approved claims pay out immediately and return a claim reference to the customer.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "langchain-clinical",
    "title": "LangGraph Ambient Clinical Scribe with Human Approval",
    "liveUrl": "https://www.langchain.com",
    "category": "Vertical AI Applications / Healthcare & Medical Software",
    "serviceAreas": [
      "AI & Automation",
      "Product Engineering",
      "Data & Integration"
    ],
    "description": "LangChain/LangGraph is an MIT-licensed framework for stateful, human-in-the-loop AI agents. We built the agent and orchestration layer for an ambient medical scribe — an auditable graph that drafts a SOAP note, waits for clinician approval, then writes it into the client's FHIR backend.",
    "problem": "A clinical-documentation startup wanted an ambient AI scribe that listens to a visit transcript, drafts a structured SOAP note, and requires explicit clinician sign-off before anything is saved. For clinical-safety review they needed controllable, auditable agent behavior — not a black box.",
    "challenges": [
      "Guaranteeing a mandatory human-in-the-loop approval gate before any note touched the patient record.",
      "Grounding the draft in the patient's prior records via retrieval so notes were accurate, not hallucinated.",
      "Making every agent run auditable for clinical-safety review, with a typed, schema-validated note as output."
    ],
    "solution": "We modelled the scribe as a LangGraph state machine — transcribe → retrieve_patient_context → draft_SOAP_note → human_approval (interrupt) → write_to_FHIR — using the checkpointer to pause at approval, enforcing a Zod schema on output, and tracing every run for audit.",
    "keyImplementations": [
      "A LangGraph graph whose checkpointer halts at a human_approval interrupt until a clinician signs off, so nothing is written without consent.",
      "A retrieval step that grounds the draft in the patient's prior FHIR records via a vector store before the note is generated.",
      "Schema-enforced output written back as a FHIR DocumentReference, with every execution traced (visit_id as metadata) for clinical-safety auditing."
    ],
    "techStack": [
      "Python",
      "LangGraph",
      "LangChain",
      "Vector Store (Qdrant)",
      "FHIR R4",
      "Zod / Pydantic",
      "Kubernetes",
      "LangSmith"
    ],
    "ourRole": "Applied-AI & Agent Orchestration Engineers",
    "resultMetrics": [
      "Delivered an ambient scribe where no note is ever saved without explicit clinician approval.",
      "Grounded every draft in the patient's prior FHIR records to cut hallucinated content.",
      "Made all agent runs auditable, with schema-validated FHIR DocumentReference output."
    ],
    "businessValue": "Gives the client a safe, controllable clinical-AI product they can defend in front of a clinical-safety board — built on a permissively-licensed framework they fully own.",
    "whyThisMatters": "Clinical AI must be controllable and auditable. LangGraph's checkpointing and human-in-the-loop interrupts let us build an agent that's safe by construction, not by hope.",
    "testimonial": {
      "person": "Dr. Meredith Shaw",
      "role": "Head of Clinical Operations",
      "company": "Clinical AI",
      "text": "Our safety board would never have signed off on a black box. Because the approval step is built into the workflow and every run is traceable, we could actually show them how it behaves before a single note was saved. That's what got it into clinic."
    },
    "beforeWorkflow": [
      {
        "name": "Late-Night EMR Typing",
        "owner": "Physician",
        "duration": "2–3 hours",
        "notes": "Doctor reconstructs notes from memory and scribbles, typing into a clunky EMR after hours.",
        "isBottleneck": true
      },
      {
        "name": "Compliance Re-Read",
        "owner": "Reviewer",
        "duration": "1 hour",
        "notes": "Notes are re-checked for omissions and compliance, adding another delay.",
        "isBottleneck": true
      },
      {
        "name": "Black-Box AI Distrust",
        "owner": "Safety Board",
        "duration": "Blocks rollout",
        "notes": "Earlier auto-generation tools couldn't be audited, so they were never approved for use.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "Grounded Draft",
        "owner": "LangGraph Agent",
        "duration": "4 secs",
        "notes": "The graph retrieves prior FHIR context and drafts a schema-valid SOAP note.",
        "isBottleneck": false
      },
      {
        "name": "Clinician Approval Gate",
        "owner": "Physician",
        "duration": "30 secs",
        "notes": "The graph pauses at a human_approval interrupt; nothing is saved until sign-off.",
        "isBottleneck": false
      },
      {
        "name": "Audited FHIR Write",
        "owner": "FHIR Connector",
        "duration": "Instant",
        "notes": "The approved note is written as a DocumentReference and the run is traced for audit.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "documenso-legal",
    "title": "Documenso Self-Hosted E-Signature with AI Field Detection",
    "liveUrl": "https://documenso.com",
    "category": "Real Estate / Document Automation",
    "serviceAreas": [
      "Product Engineering",
      "AI & Automation",
      "Cloud & DevOps"
    ],
    "description": "Documenso is an open-source DocuSign alternative with PAdES-standard PDF signing (Next.js/tRPC/Prisma). We self-hosted it inside the client's VPC and added an LLM job that pre-fills signing fields from uploaded contracts.",
    "problem": "A real-estate brokerage needed isolated, compliant document signing for buyer disclosures hosted in their own VPC — no third-party SaaS holding sensitive PDFs. They also wanted signing fields pre-filled automatically instead of placed by hand on every disclosure.",
    "challenges": [
      "Self-hosting a full e-signature stack inside the client's VPC with valid PDF signing certificates.",
      "Extracting field positions and values from heterogeneous uploaded PDFs to auto-place signature fields.",
      "Wiring signed-document events into the client's transaction-management system."
    ],
    "solution": "We deployed Documenso via Docker inside the client's VPC, generated PAdES signing certificates, and built a field-detection job (AWS Textract → Claude) that populates Documenso field records through the TypeScript SDK, with a webhook firing on document.signed.",
    "keyImplementations": [
      "A self-hosted Documenso deployment (docker compose) inside the client's VPC with a generated .p12 PAdES signing certificate.",
      "An AI field-detection job using AWS Textract plus Claude to read uploaded PDFs and pre-populate documenso.field records via the sdk-typescript.",
      "A document.signed webhook that pushes completed, signed disclosures straight into the brokerage's transaction-management system."
    ],
    "techStack": [
      "Next.js",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "AWS Textract",
      "Claude API",
      "Documenso TypeScript SDK"
    ],
    "ourRole": "Document-Signing Platform & Applied-AI Engineers",
    "resultMetrics": [
      "Stood up compliant PAdES e-signing entirely inside the client's VPC — no SaaS holding disclosures.",
      "Replaced manual field placement with AI pre-fill from uploaded PDFs.",
      "Auto-pushed signed disclosures into the transaction system via webhook, removing re-entry."
    ],
    "businessValue": "Gives the brokerage DocuSign-class signing they fully own and host, plus AI pre-fill that removes the per-document field-placement chore.",
    "whyThisMatters": "Regulated document workflows demand data isolation. A self-hosted, open signing platform keeps sensitive PDFs in the client's VPC while AI extraction removes the manual setup tax.",
    "testimonial": {
      "person": "Richard Cole",
      "role": "Managing Broker",
      "company": "RE/MAX",
      "text": "The disclosures never leave our own environment now, which was the whole point for us, and the fields come in already placed. It took a small but constant chore off every transaction without changing how our agents work."
    },
    "beforeWorkflow": [
      {
        "name": "SaaS Signing Concern",
        "owner": "Compliance",
        "duration": "Blocks adoption",
        "notes": "Sending sensitive disclosures through a third-party SaaS fails the brokerage's data-isolation rules.",
        "isBottleneck": true
      },
      {
        "name": "Manual Field Placement",
        "owner": "Transaction Coordinator",
        "duration": "20 mins/doc",
        "notes": "Signature and initial fields are dragged onto every PDF by hand.",
        "isBottleneck": true
      },
      {
        "name": "Re-Key Into TMS",
        "owner": "Coordinator",
        "duration": "15 mins/doc",
        "notes": "Signed files are downloaded and re-entered into the transaction-management system.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "VPC Upload",
        "owner": "Coordinator",
        "duration": "10 secs",
        "notes": "Disclosure is uploaded into the self-hosted Documenso instance inside the VPC.",
        "isBottleneck": false
      },
      {
        "name": "AI Field Pre-Fill",
        "owner": "Textract + Claude",
        "duration": "8 secs",
        "notes": "Fields and values are detected and placed automatically via the SDK.",
        "isBottleneck": false
      },
      {
        "name": "Signed → TMS Webhook",
        "owner": "Webhook Node",
        "duration": "Instant",
        "notes": "On document.signed the completed file is pushed straight into the transaction system.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "lago-billing",
    "title": "Lago Self-Hosted Usage-Based Billing Engine",
    "liveUrl": "https://www.getlago.com",
    "category": "Fintech & Payments",
    "serviceAreas": [
      "Product Engineering",
      "Data & Integration",
      "Cloud & DevOps"
    ],
    "description": "Lago is an open-source, AI-native metering and usage-based billing platform (Ruby on Rails, AGPLv3, SOC 2 Type II). We self-hosted it on the client's cluster and wired event metering through to Stripe collection with a customer-facing usage dashboard.",
    "problem": "A B2B AI SaaS startup with hybrid pricing — per-seat plus per-token usage — needed accurate billing without sending raw event data through a third-party vendor, for compliance reasons. Their old invoicing couldn't track real-time consumption, so credits were calculated by hand and disputed monthly.",
    "challenges": [
      "Self-hosting billing so no usage event data left the client's own infrastructure.",
      "Ingesting high-volume metered events from the client's LLM gateway without losing or double-counting usage.",
      "Modelling graduated, hybrid pricing and reconciling it cleanly into Stripe-collected invoices."
    ],
    "solution": "We deployed Lago on the client's GCP cluster (docker compose / Kubernetes), defined a tokens_consumed billable metric, instrumented their LLM gateway to emit events via POST /api/v1/events, assigned a graduated plan, and wired Lago → Stripe with a customer-facing usage dashboard.",
    "keyImplementations": [
      "A self-hosted Lago deployment on the client's GCP cluster so all usage events stay inside their boundary.",
      "Event instrumentation posting {transaction_id, external_subscription_id, code:'tokens_consumed', properties:{value}} to Lago's ingestion endpoint in real time.",
      "A graduated pricing plan reconciled into Stripe, with an invoice.payment_succeeded webhook and a live customer usage dashboard."
    ],
    "techStack": [
      "Ruby on Rails",
      "React",
      "PostgreSQL",
      "Redis",
      "Redpanda / Kafka",
      "Stripe",
      "Docker",
      "Kubernetes"
    ],
    "ourRole": "Billing & Metering Infrastructure Engineers",
    "resultMetrics": [
      "Kept all usage event data inside the client's own GCP boundary for compliance.",
      "Metered hybrid per-seat + per-token pricing accurately in real time.",
      "Replaced hand-calculated monthly credits with automated Stripe-collected invoices, ending disputes."
    ],
    "businessValue": "Gives the client accurate, real-time usage billing on infrastructure they own, with transparent consumption dashboards that cut invoice disputes to near zero.",
    "whyThisMatters": "Usage billing demands exact, real-time metering. A self-hosted open engine keeps sensitive event data in-house while still feeding clean invoices to Stripe.",
    "testimonial": {
      "person": "Nikhil Rao",
      "role": "Head of Billing Systems",
      "company": "OceanBlue-SC",
      "text": "Billing per-token usage used to be a spreadsheet exercise at the end of every month. Now it meters in real time inside our own cloud, and the back-and-forth with customers over their invoices has mostly gone quiet."
    },
    "beforeWorkflow": [
      {
        "name": "Monthly Log Pull",
        "owner": "Systems Admin",
        "duration": "4 hours",
        "notes": "Usage logs are gathered by hand at month-end with no real-time meter.",
        "isBottleneck": true
      },
      {
        "name": "Spreadsheet Rating",
        "owner": "Billing Manager",
        "duration": "2 days",
        "notes": "Hybrid charges are calculated in giant spreadsheets, introducing errors.",
        "isBottleneck": true
      },
      {
        "name": "Disputed Invoices",
        "owner": "Finance",
        "duration": "Recurring",
        "notes": "Customers contest hand-built invoices, triggering monthly back-and-forth.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "Live Event Metering",
        "owner": "LLM Gateway",
        "duration": "Instant",
        "notes": "Each token-consuming call posts a metered event to self-hosted Lago.",
        "isBottleneck": false
      },
      {
        "name": "Graduated Rating",
        "owner": "Lago Engine",
        "duration": "< 10 ms",
        "notes": "Events are rated against the graduated hybrid plan and roll into the live invoice.",
        "isBottleneck": false
      },
      {
        "name": "Stripe Collection",
        "owner": "Stripe Sync",
        "duration": "Instant",
        "notes": "Invoices are collected via Stripe and reflected on the customer usage dashboard.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "qdrant-vectordb",
    "title": "Qdrant Self-Hosted RAG for Regulated Enterprises",
    "liveUrl": "https://qdrant.tech",
    "category": "Vertical AI Applications / AI & Automation",
    "serviceAreas": [
      "AI & Automation",
      "Cloud & DevOps",
      "Data & Integration"
    ],
    "description": "Qdrant is a high-performance Rust vector database for RAG and semantic search (Apache 2.0). We self-hosted it on the client's Kubernetes and built a multi-tenant \"chat with your docs\" retrieval layer for customers who can't send data to hosted AI services.",
    "problem": "A B2B knowledge-management vendor wanted to ship a self-hosted \"chat with your docs\" feature for enterprise customers in regulated industries who cannot send data to OpenAI or Pinecone. They needed strict tenant isolation and high-quality retrieval, fully inside the customer's environment.",
    "challenges": [
      "Running a production vector database inside the customer's own Kubernetes with no external AI dependencies.",
      "Enforcing hard multi-tenant isolation so one tenant's query could never surface another's documents.",
      "Getting retrieval quality high enough for trustworthy answers over dense enterprise PDFs."
    ],
    "solution": "We deployed Qdrant via Helm on the client's Kubernetes, created collections sized for the chosen embedding model, chunked PDFs with LangChain, upserted points with tenant metadata, and ran hybrid dense+sparse search with a hard tenant filter and ColBERT late-interaction reranking.",
    "keyImplementations": [
      "A Helm-deployed Qdrant cluster on the client's Kubernetes with collections at Distance.Cosine and the right vector size (1536 for OpenAI, 768 for a local BGE model).",
      "An ingestion pipeline that chunks PDFs via LangChain and upserts points with {source, page, tenant_id} payloads.",
      "Query-time hybrid dense+sparse search with a mandatory must filter on tenant_id, reranked with ColBERT late-interaction before the top-K context is streamed to the LLM."
    ],
    "techStack": [
      "Rust (Qdrant)",
      "Python",
      "LangChain",
      "Helm / Kubernetes",
      "HNSW Indexing",
      "OpenAI / BGE Embeddings",
      "ColBERT Reranking",
      "Docker"
    ],
    "ourRole": "Applied-AI & Retrieval Infrastructure Engineers",
    "resultMetrics": [
      "Shipped self-hosted RAG entirely inside the customer's Kubernetes — no data sent to hosted AI APIs.",
      "Enforced hard tenant isolation via a mandatory tenant_id filter on every query.",
      "Raised answer quality with hybrid dense+sparse retrieval and ColBERT reranking."
    ],
    "businessValue": "Lets the vendor sell an AI document-chat feature into regulated accounts that would otherwise be off-limits, because nothing ever leaves the customer's environment.",
    "whyThisMatters": "RAG quality and data residency decide whether AI ships in regulated industries. A self-hosted Rust vector DB with hybrid search and reranking delivers both without a third-party dependency.",
    "testimonial": {
      "person": "Priya Natarajan",
      "role": "VP of Engineering",
      "company": "Zendesk",
      "text": "Our enterprise buyers in finance and healthcare wouldn't let documents leave their network, full stop. Running retrieval in their own cluster with tenant isolation enforced at query time is what finally unblocked those deals for us."
    },
    "beforeWorkflow": [
      {
        "name": "Hosted-AI Rejection",
        "owner": "Customer Security",
        "duration": "Blocks deal",
        "notes": "Regulated buyers refuse any feature that ships their documents to a third-party AI service.",
        "isBottleneck": true
      },
      {
        "name": "Manual Doc Search",
        "owner": "Knowledge Worker",
        "duration": "Hours",
        "notes": "Staff hunt across shared drives and PDFs by keyword, missing relevant context.",
        "isBottleneck": true
      },
      {
        "name": "Tenant-Bleed Risk",
        "owner": "Platform Team",
        "duration": "Ongoing",
        "notes": "Without enforced isolation, a naive vector search could surface another tenant's data.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "In-Cluster Ingestion",
        "owner": "LangChain Pipeline",
        "duration": "Batch",
        "notes": "PDFs are chunked and upserted into Qdrant with tenant metadata, inside the customer's K8s.",
        "isBottleneck": false
      },
      {
        "name": "Isolated Hybrid Search",
        "owner": "Qdrant Engine",
        "duration": "< 50 ms",
        "notes": "Hybrid dense+sparse retrieval runs with a hard tenant_id filter, then ColBERT rerank.",
        "isBottleneck": false
      },
      {
        "name": "Grounded Answer",
        "owner": "Local LLM",
        "duration": "Seconds",
        "notes": "Top-K context streams to the model and a sourced answer returns to the user.",
        "isBottleneck": false
      }
    ]
  },
  {
    "id": "n8n-automation",
    "title": "n8n Self-Hosted AI Claims Automation",
    "liveUrl": "https://n8n.io",
    "category": "AI & Automation",
    "serviceAreas": [
      "AI & Automation",
      "Product Engineering",
      "Data & Integration"
    ],
    "description": "n8n is a fair-code, self-hostable workflow automation platform with a native AI Agent node and a visual editor (Node.js/TypeScript). We deployed it on the client's VPC and built an AI claims-triage workflow that keeps PII off third-party SaaS.",
    "problem": "A mid-market insurance brokerage wanted to automate inbound claim emails — parse the attachment, classify severity with an LLM, push structured data into Salesforce, and notify the adjuster in Slack — without sending PII to a third-party SaaS like Zapier.",
    "challenges": [
      "Running the whole automation, including the LLM step, inside the client's VPC so claim PII never left their network.",
      "Reliably extracting structured data from messy email attachments and enforcing a JSON schema on the output.",
      "Routing by severity and keeping a human approval step before any automated customer reply."
    ],
    "solution": "We deployed n8n with Postgres and Ollama via the self-hosted AI starter kit on the client's VPC: an IMAP trigger ingests email, a Code node extracts the attachment, a local LLM runs schema-enforced extraction, a Switch routes by severity, and Salesforce/Slack nodes create the case and notify the adjuster.",
    "keyImplementations": [
      "A self-hosted n8n + Postgres + Ollama stack in the client's VPC so claim data and the LLM both stay in-network.",
      "An extraction step that runs a local model with a structured JSON schema, then a Switch node that routes cases by severity.",
      "Salesforce Case creation and a Slack DM to the assigned adjuster, with an Approval node gating any auto-reply and every run logged to the client's SIEM."
    ],
    "techStack": [
      "Node.js / TypeScript",
      "Vue.js",
      "PostgreSQL",
      "Ollama (Local LLM)",
      "n8n AI Agent Node",
      "Salesforce API",
      "Slack API",
      "Docker"
    ],
    "ourRole": "Automation & Applied-AI Engineers",
    "resultMetrics": [
      "Automated inbound claim triage end-to-end with no PII leaving the client's VPC.",
      "Replaced manual email reading with schema-enforced LLM extraction and severity routing.",
      "Auto-created Salesforce cases and notified adjusters in Slack, with every run logged to the SIEM."
    ],
    "businessValue": "Turns a manual, error-prone claims inbox into an automated, auditable pipeline the brokerage runs entirely on its own infrastructure.",
    "whyThisMatters": "Automation in regulated industries needs to stay in-network. A self-hosted workflow engine with a local LLM gives the speed of no-code automation without handing PII to a SaaS vendor.",
    "testimonial": {
      "person": "Daniel Okafor",
      "role": "Director of Claims Operations",
      "company": "CSAA Insurance Group",
      "text": "Claims used to sit in an inbox until someone got to them. Now they're triaged the moment they land — case created, severity routed, adjuster notified — and our security team signed off because none of it leaves our network and every run lands in the SIEM."
    },
    "beforeWorkflow": [
      {
        "name": "Manual Inbox Triage",
        "owner": "Intake Clerk",
        "duration": "10 mins/claim",
        "notes": "Clerk opens each claim email, reads the attachment, and judges severity by hand.",
        "isBottleneck": true
      },
      {
        "name": "Salesforce Re-Entry",
        "owner": "Intake Clerk",
        "duration": "8 mins/claim",
        "notes": "Details are re-typed into a Salesforce case, with frequent transcription errors.",
        "isBottleneck": true
      },
      {
        "name": "Adjuster Hand-Off",
        "owner": "Supervisor",
        "duration": "Hours",
        "notes": "A supervisor manually assigns and emails the right adjuster, adding delay.",
        "isBottleneck": true
      }
    ],
    "afterWorkflow": [
      {
        "name": "IMAP Email Trigger",
        "owner": "n8n Workflow",
        "duration": "Instant",
        "notes": "An inbound claim email fires the workflow and the attachment is extracted in-VPC.",
        "isBottleneck": false
      },
      {
        "name": "Local LLM Extraction",
        "owner": "Ollama Node",
        "duration": "3 secs",
        "notes": "A local model returns schema-valid structured data and a severity classification.",
        "isBottleneck": false
      },
      {
        "name": "Case + Adjuster Notify",
        "owner": "Salesforce / Slack",
        "duration": "Instant",
        "notes": "A Salesforce case is created and the assigned adjuster is DMed; the run is logged to the SIEM.",
        "isBottleneck": false
      }
    ]
  }
];

export type CaseStudy = (typeof CASE_DATA)[number];
export { CASE_DATA };
