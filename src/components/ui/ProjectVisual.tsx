import type { JSX } from "react";
import type { ProjectSlug } from "@/lib/projects";

/**
 * Art-directed key visuals for Sanjeev Nadgir's featured projects, drawn as SVG so they are
 * crisp at any size, weigh almost nothing, and never rely on external image dependencies.
 */
export function ProjectVisual({ slug, className }: { slug: ProjectSlug; className?: string }) {
  const Art = ART[slug] ?? RedisJava;
  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={LABELS[slug] ?? "Project visual"}
    >
      <Art />
    </svg>
  );
}

const LABELS: Record<ProjectSlug, string> = {
  "redis-java": "Building Redis from Scratch: TCP network architecture and port 6379 client-server server visualization.",
  echomind: "EchoMind: Speech emotion recognition neural network with audio frequency waveforms and emotion classification.",
  "smart-medicine-box": "AI Smart Medicine Box: Healthcare mobile schedule dashboard with medicine dose tracking.",
  intellimind: "IntelliMind: Retrieval-augmented generation pipeline with document embedding vectors and AI assistant graph.",
};

function RedisJava() {
  return (
    <>
      <defs>
        <linearGradient id="rj-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#121316" />
          <stop offset="60%" stopColor="#181a1f" />
          <stop offset="100%" stopColor="#251616" />
        </linearGradient>
        <linearGradient id="rj-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D82C20" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="rj-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D82C20" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D82C20" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#rj-bg)" />
      <circle cx="800" cy="500" r="420" fill="url(#rj-pulse)" />

      {/* Grid Pattern */}
      <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1">
        {[...Array(17)].map((_, i) => (
          <line key={`x-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="1000" />
        ))}
        {[...Array(11)].map((_, i) => (
          <line key={`y-${i}`} x1="0" y1={i * 100} x2="1600" y2={i * 100} />
        ))}
      </g>

      {/* Central Server Console / Port 6379 */}
      <rect x="360" y="240" width="880" height="520" rx="8" fill="#15171c" stroke="#323640" strokeWidth="2" />
      <rect x="360" y="240" width="880" height="48" rx="8" fill="#1d2027" />
      <circle cx="392" cy="264" r="6" fill="#D82C20" />
      <circle cx="414" cy="264" r="6" fill="#F59E0B" />
      <circle cx="436" cy="264" r="6" fill="#10B981" />
      <text x="470" y="269" fill="#8f8a85" fontFamily="monospace" fontSize="15" letterSpacing="0.1em">
        java -jar redis-server.jar --port 6379
      </text>

      {/* Terminal Content & Key-Value Memory Slots */}
      <g fontFamily="monospace" fontSize="18" fill="#e2e8f0">
        <text x="400" y="340" fill="#10B981">&gt; TCP Server initialized on 0.0.0.0:6379</text>
        <text x="400" y="380" fill="#94a3b8">&gt; Awaiting client connection...</text>
        <text x="400" y="420" fill="#F59E0B">&gt; Client 127.0.0.1:54210 connected via SocketChannel</text>
        <text x="400" y="460" fill="#e2e8f0">&gt; RESP Command received: SET session:user:nadgir active</text>
        <text x="400" y="500" fill="#D82C20">&gt; Hash table write: O(1) in-memory storage updated</text>
        <text x="400" y="540" fill="#10B981">&gt; Response dispatched: +OK\r\n</text>
      </g>

      {/* Data Buffer visualization */}
      <g transform="translate(400, 580)">
        {[...Array(6)].map((_, i) => (
          <g key={i} transform={`translate(${i * 135}, 0)`}>
            <rect width="120" height="110" rx="4" fill="#1f232b" stroke={i === 2 ? "#D82C20" : "#2a2f3a"} strokeWidth={i === 2 ? "2" : "1"} />
            <text x="12" y="32" fill="#94a3b8" fontFamily="monospace" fontSize="12">Slot 0x0{i}</text>
            <text x="12" y="65" fill={i === 2 ? "#D82C20" : "#ffffff"} fontFamily="monospace" fontSize="15" fontWeight="bold">
              {["GET", "SET", "RESP", "PONG", "AUTH", "KEYS"][i]}
            </text>
            <rect x="12" y="82" width="70" height="6" rx="2" fill={i === 2 ? "#F59E0B" : "#3b4252"} />
          </g>
        ))}
      </g>

      {/* Connection Beam */}
      <path d="M 200 500 Q 280 500 360 500" stroke="url(#rj-glow)" strokeWidth="3" strokeDasharray="8 6" fill="none" />
      <path d="M 1240 500 Q 1320 500 1400 500" stroke="url(#rj-glow)" strokeWidth="3" strokeDasharray="8 6" fill="none" />
      <circle cx="200" cy="500" r="14" fill="#D82C20" />
      <circle cx="1400" cy="500" r="14" fill="#F59E0B" />
      <text x="170" y="540" fill="#8f8a85" fontFamily="monospace" fontSize="14">TCP CLIENT</text>
      <text x="1360" y="540" fill="#8f8a85" fontFamily="monospace" fontSize="14">RESP PARSER</text>
    </>
  );
}

function EchoMind() {
  const waves = [
    { freq: 0.015, amp: 90, color: "#6366F1", opacity: 0.8 },
    { freq: 0.02, amp: 65, color: "#06B6D4", opacity: 0.6 },
    { freq: 0.025, amp: 45, color: "#EC4899", opacity: 0.4 },
  ];

  return (
    <>
      <defs>
        <linearGradient id="em-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B0F19" />
          <stop offset="60%" stopColor="#0d1424" />
          <stop offset="100%" stopColor="#1e1338" />
        </linearGradient>
        <radialGradient id="em-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#em-bg)" />
      <circle cx="800" cy="460" r="450" fill="url(#em-glow)" />

      {/* Audio Waveforms */}
      {waves.map((w, idx) => {
        let d = `M 150 480 `;
        for (let x = 150; x <= 1450; x += 15) {
          const envelope = Math.sin(((x - 150) / 1300) * Math.PI);
          const y = 480 + Math.sin(x * w.freq + idx * 1.8) * w.amp * envelope;
          d += `L ${x} ${y} `;
        }
        return (
          <path
            key={idx}
            d={d}
            fill="none"
            stroke={w.color}
            strokeWidth="3"
            opacity={w.opacity}
          />
        );
      })}

      {/* Central Neural Network Spectrogram Hub */}
      <g transform="translate(800, 480)">
        <circle r="140" fill="#111827" stroke="#6366F1" strokeWidth="2" opacity="0.8" />
        <circle r="180" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="6 6" opacity="0.6" />
        <circle r="220" fill="none" stroke="#EC4899" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
        <text x="0" y="-20" textAnchor="middle" fill="#06B6D4" fontFamily="monospace" fontSize="14" letterSpacing="0.15em">
          MFCC AUDIO INPUT
        </text>
        <text x="0" y="16" textAnchor="middle" fill="#ffffff" fontFamily="serif" fontSize="32" fontStyle="italic">
          81.02%
        </text>
        <text x="0" y="44" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="12" letterSpacing="0.1em">
          TEST ACCURACY
        </text>
      </g>

      {/* 8 Emotion Classes Arc Labels */}
      {[
        { name: "Neutral", x: 300, y: 220, val: "0.94", color: "#06B6D4" },
        { name: "Calm", x: 550, y: 160, val: "0.91", color: "#10B981" },
        { name: "Happy", x: 1050, y: 160, val: "0.89", color: "#F59E0B" },
        { name: "Sad", x: 1300, y: 220, val: "0.82", color: "#6366F1" },
        { name: "Angry", x: 300, y: 740, val: "0.87", color: "#EF4444" },
        { name: "Fearful", x: 550, y: 800, val: "0.79", color: "#8B5CF6" },
        { name: "Disgust", x: 1050, y: 800, val: "0.84", color: "#EC4899" },
        { name: "Surprised", x: 1300, y: 740, val: "0.88", color: "#3B82F6" },
      ].map((e) => (
        <g key={e.name} transform={`translate(${e.x}, ${e.y})`}>
          <rect x="-80" y="-30" width="160" height="60" rx="6" fill="#131b2e" stroke={e.color} strokeWidth="1.5" />
          <text x="-64" y="-8" fill="#ffffff" fontFamily="sans-serif" fontSize="14" fontWeight="600">
            {e.name}
          </text>
          <text x="-64" y="14" fill={e.color} fontFamily="monospace" fontSize="12">
            Conf: {e.val}
          </text>
          <line x1="50" y1="-10" x2="50" y2="10" stroke={e.color} strokeWidth="2" />
        </g>
      ))}

      {/* CNN Feature Extraction Layer Indicator */}
      <text x="800" y="890" textAnchor="middle" fill="#8f8a85" fontFamily="monospace" fontSize="15" letterSpacing="0.18em">
        CONV2D → BATCHNORM → MAXPOOLING → DENSE CLASSIFIER
      </text>
    </>
  );
}

function SmartMedicineBox() {
  return (
    <>
      <defs>
        <linearGradient id="sm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B131E" />
          <stop offset="60%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#082026" />
        </linearGradient>
        <linearGradient id="sm-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#sm-bg)" />

      {/* Grid line background */}
      <g stroke="#10b981" strokeOpacity="0.05" strokeWidth="1">
        {[...Array(9)].map((_, i) => (
          <line key={`x-${i}`} x1={i * 200} y1="0" x2={i * 200} y2="1000" />
        ))}
        {[...Array(6)].map((_, i) => (
          <line key={`y-${i}`} x1="0" y1={i * 200} x2="1600" y2={i * 200} />
        ))}
      </g>

      {/* Mobile Device Frame */}
      <g transform="translate(560, 100)">
        <rect width="480" height="800" rx="36" fill="#020617" stroke="#334155" strokeWidth="4" />
        <rect x="180" y="14" width="120" height="20" rx="10" fill="#1e293b" />

        {/* Screen Header */}
        <text x="40" y="80" fill="#94a3b8" fontFamily="monospace" fontSize="13" letterSpacing="0.1em">
          SMART MEDICINE DASHBOARD
        </text>
        <text x="40" y="115" fill="#f8fafc" fontFamily="serif" fontSize="26">
          Today&apos;s Schedule
        </text>
        <rect x="360" y="65" width="80" height="30" rx="15" fill="#065f46" />
        <text x="375" y="85" fill="#34d399" fontFamily="monospace" fontSize="11" fontWeight="bold">
          RLS SYNC
        </text>

        {/* Dosage Cards */}
        {[
          { time: "08:00 AM", med: "Metformin 500mg", status: "Taken", color: "#10b981", iconBg: "#064e3b" },
          { time: "01:30 PM", med: "Multivitamin Active", status: "Taken", color: "#10b981", iconBg: "#064e3b" },
          { time: "08:00 PM", med: "Atorvastatin 20mg", status: "Scheduled", color: "#2dd4bf", iconBg: "#134e4a" },
          { time: "10:00 PM", med: "Omega-3 Pure 1000mg", status: "Pending", color: "#f59e0b", iconBg: "#78350f" },
        ].map((card, i) => (
          <g key={i} transform={`translate(40, ${150 + i * 115})`}>
            <rect width="400" height="95" rx="12" fill="url(#sm-card)" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="45" cy="48" r="22" fill={card.iconBg} />
            <circle cx="45" cy="48" r="8" fill={card.color} />
            <text x="82" y="42" fill="#ffffff" fontFamily="sans-serif" fontSize="16" fontWeight="bold">
              {card.med}
            </text>
            <text x="82" y="66" fill="#94a3b8" fontFamily="monospace" fontSize="13">
              {card.time}
            </text>
            <rect x="290" y="34" width="90" height="28" rx="6" fill="#0f172a" stroke={card.color} strokeWidth="1" />
            <text x="306" y="52" fill={card.color} fontFamily="sans-serif" fontSize="12" fontWeight="600">
              {card.status}
            </text>
          </g>
        ))}

        {/* Database security badge */}
        <g transform="translate(40, 650)">
          <rect width="400" height="70" rx="10" fill="#0f172a" stroke="#059669" strokeWidth="1" />
          <text x="20" y="32" fill="#34d399" fontFamily="monospace" fontSize="13" fontWeight="bold">
            SUPABASE POSTGRESQL · ROW LEVEL SECURITY
          </text>
          <text x="20" y="54" fill="#94a3b8" fontFamily="sans-serif" fontSize="12">
            Patient dosage records verified by authenticated JWT policy.
          </text>
        </g>
      </g>

      {/* Decorative Hardware IoT Interface Left & Right */}
      <g transform="translate(180, 420)">
        <rect width="280" height="180" rx="8" fill="#131e2e" stroke="#10b981" strokeWidth="1" opacity="0.8" />
        <text x="25" y="40" fill="#10b981" fontFamily="monospace" fontSize="13" letterSpacing="0.1em">
          HARDWARE TELEMETRY
        </text>
        <text x="25" y="80" fill="#f8fafc" fontFamily="sans-serif" fontSize="18">
          Servo Slot Dispenser #03
        </text>
        <text x="25" y="110" fill="#94a3b8" fontFamily="monospace" fontSize="13">
          Status: Lid Locked
        </text>
        <text x="25" y="140" fill="#34d399" fontFamily="monospace" fontSize="13">
          Buzzer &amp; LED: Armed
        </text>
      </g>

      <g transform="translate(1140, 420)">
        <rect width="280" height="180" rx="8" fill="#131e2e" stroke="#2dd4bf" strokeWidth="1" opacity="0.8" />
        <text x="25" y="40" fill="#2dd4bf" fontFamily="monospace" fontSize="13" letterSpacing="0.1em">
          DOSE ADHERENCE
        </text>
        <text x="25" y="90" fill="#ffffff" fontFamily="serif" fontSize="38">
          98.4%
        </text>
        <text x="25" y="130" fill="#94a3b8" fontFamily="sans-serif" fontSize="13">
          Weekly on-time intake rate
        </text>
      </g>
    </>
  );
}

function IntelliMind() {
  return (
    <>
      <defs>
        <linearGradient id="im-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#09090B" />
          <stop offset="60%" stopColor="#130e24" />
          <stop offset="100%" stopColor="#1e0f2b" />
        </linearGradient>
        <linearGradient id="im-stream" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
        <radialGradient id="im-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#im-bg)" />
      <circle cx="800" cy="500" r="500" fill="url(#im-glow)" />

      {/* Vector Graph Nodes & Edges */}
      <g stroke="#8B5CF6" strokeOpacity="0.25" strokeWidth="1.5">
        <line x1="320" y1="340" x2="620" y2="280" />
        <line x1="620" y1="280" x2="980" y2="280" />
        <line x1="980" y1="280" x2="1280" y2="340" />
        <line x1="620" y1="280" x2="800" y2="500" />
        <line x1="980" y1="280" x2="800" y2="500" />
        <line x1="420" y1="650" x2="800" y2="500" />
        <line x1="1180" y1="650" x2="800" y2="500" />
      </g>

      {/* Document Ingestion Left Card */}
      <g transform="translate(240, 260)">
        <rect width="320" height="240" rx="8" fill="#13111f" stroke="#8B5CF6" strokeWidth="1.5" />
        <text x="25" y="40" fill="#a78bfa" fontFamily="monospace" fontSize="13" letterSpacing="0.1em">
          DOCUMENT INGESTION
        </text>
        <text x="25" y="75" fill="#ffffff" fontFamily="sans-serif" fontSize="17" fontWeight="bold">
          PDF / Markdown Parser
        </text>
        <rect x="25" y="95" width="270" height="8" rx="4" fill="#2e284a" />
        <rect x="25" y="95" width="210" height="8" rx="4" fill="#8B5CF6" />
        <text x="25" y="135" fill="#94a3b8" fontFamily="monospace" fontSize="13">
          Chunks: 1,420 vectors
        </text>
        <text x="25" y="165" fill="#94a3b8" fontFamily="monospace" fontSize="13">
          Dimensions: 1536d / 768d
        </text>
        <rect x="25" y="185" width="110" height="28" rx="4" fill="#231b3e" stroke="#8B5CF6" strokeWidth="1" />
        <text x="38" y="204" fill="#c4b5fd" fontFamily="monospace" fontSize="12">
          pgvector
        </text>
      </g>

      {/* Center Synthesis Node */}
      <g transform="translate(800, 500)">
        <circle r="90" fill="#161226" stroke="url(#im-stream)" strokeWidth="3" />
        <circle r="120" fill="none" stroke="#F43F5E" strokeWidth="1" strokeDasharray="5 5" opacity="0.6" />
        <text x="0" y="-12" textAnchor="middle" fill="#f8fafc" fontFamily="serif" fontSize="24" fontStyle="italic">
          IntelliMind
        </text>
        <text x="0" y="16" textAnchor="middle" fill="#a78bfa" fontFamily="monospace" fontSize="11" letterSpacing="0.14em">
          RAG REASONING
        </text>
        <text x="0" y="34" textAnchor="middle" fill="#F43F5E" fontFamily="monospace" fontSize="11">
          Groq / Ollama LLM
        </text>
      </g>

      {/* Query & Augmented Response Right Card */}
      <g transform="translate(1040, 260)">
        <rect width="320" height="240" rx="8" fill="#13111f" stroke="#F43F5E" strokeWidth="1.5" />
        <text x="25" y="40" fill="#fb7185" fontFamily="monospace" fontSize="13" letterSpacing="0.1em">
          CONTEXT RETRIEVAL
        </text>
        <text x="25" y="75" fill="#ffffff" fontFamily="sans-serif" fontSize="17" fontWeight="bold">
          Top-K Vector Similarity
        </text>
        <g transform="translate(25, 95)">
          <rect width="270" height="32" rx="4" fill="#241421" />
          <text x="12" y="21" fill="#f43f5e" fontFamily="monospace" fontSize="12">
            chunk_092 · cosine: 0.892
          </text>
        </g>
        <g transform="translate(25, 135)">
          <rect width="270" height="32" rx="4" fill="#241421" />
          <text x="12" y="21" fill="#fb7185" fontFamily="monospace" fontSize="12">
            chunk_148 · cosine: 0.865
          </text>
        </g>
        <text x="25" y="200" fill="#94a3b8" fontFamily="monospace" fontSize="12">
          Conversation context retained
        </text>
      </g>

      {/* Stream Pipeline Banner Bottom */}
      <g transform="translate(380, 720)">
        <rect width="840" height="120" rx="8" fill="#131021" stroke="#372c57" strokeWidth="1" />
        <text x="40" y="42" fill="#a78bfa" fontFamily="monospace" fontSize="13" letterSpacing="0.1em">
          STREAMING GENERATION WORKFLOW
        </text>
        <text x="40" y="80" fill="#f1f5f9" fontFamily="monospace" fontSize="16">
          Query → Semantic Vector Match → Augmented Prompt → Realtime Token Stream
        </text>
      </g>
    </>
  );
}

const ART: Record<ProjectSlug, () => JSX.Element> = {
  "redis-java": RedisJava,
  echomind: EchoMind,
  "smart-medicine-box": SmartMedicineBox,
  intellimind: IntelliMind,
};
