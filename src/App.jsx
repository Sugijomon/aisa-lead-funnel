import { useState, useEffect } from "react";
import {
  User, Users, Building2, Target, FileText, Zap, Clock,
  ShieldAlert, Wrench, BookOpen, Bot, HelpCircle, Calendar,
  Euro, Search, Lightbulb, TrendingUp, Rocket, GraduationCap,
  CheckCircle2, Mail, Phone, ChevronRight, Download, ArrowLeft,
  RotateCcw, Check, Compass, Sparkles, BarChart3, Cpu, Code2,
  RefreshCw, PenTool, Layers, Globe, Star, Flame, Hammer,
  BookMarked, Eye, MousePointer, Play, Scale, Shield
} from "lucide-react";

/* ─── BRAND COLORS ───────────────────────────────────────────────────── */
const C = {
  blue:      "#00A1DA",
  blueDark:  "#007AA9",
  blueLight: "#7DD6F0",
  magenta:   "#CC1E6D",
  green:     "#93C942",
  blueGrey:  "#6993AA",
  bgSoft:    "#F7FAFC",
  white:     "#FFFFFF",
  heading:   "#222222",
  body:      "#4A4A4A",
  muted:     "#9B9B9B",
  border:    "#E1E1E1",
  divider:   "#F5F5F5",
  shadow:    "0 2px 12px rgba(0,0,0,0.06)",
  shadowMd:  "0 6px 28px rgba(0,161,218,0.14)",
};

const T = {
  heading: "'Manrope', sans-serif",
  body:    "'Inter', sans-serif",
};

/* ─── D5 PHASES ──────────────────────────────────────────────────────── */
const D5 = {
  discover: { label:"Diagnose", color:"#00A1DA", bg:"#E8F7FD", border:"#b3e4f5" },
  decide:   { label:"Decide",   color:"#6993AA", bg:"#EEF3F6", border:"#c5d8e3" },
  deploy:   { label:"Ontdek",   color:"#CC1E6D", bg:"#FCE8F2", border:"#f0a8cc" },
  scale:    { label:"Versnel",    color:"#5a8a1a", bg:"#EEF7E0", border:"#c5e090" },
  govern:   { label:"Govern",   color:"#007AA9", bg:"#E0F0F8", border:"#90c8e0" },
};

/* ─── MODULES with D5 phase ──────────────────────────────────────────── */
const MODULES = {
  1:  { name:"AI Landschap & Strategie",         Icon:Compass,    phase:"discover" },
  2:  { name:"Prompt & Context Engineering",      Icon:Cpu,        phase:"decide"   },
  3:  { name:"Schrijven & Content Creatie",       Icon:PenTool,    phase:"deploy"   },
  4:  { name:"Research, Analyse & Synthese",      Icon:Search,     phase:"discover" },
  5:  { name:"Visuele Communicatie & Multimedia", Icon:Layers,     phase:"deploy"   },
  6:  { name:"Workflow Automatisering",           Icon:Zap,        phase:"deploy"   },
  7:  { name:"Data, Dashboards & Rapportage",     Icon:BarChart3,  phase:"scale"    },
  8:  { name:"AI Agents & Delegatie",             Icon:Bot,        phase:"scale"    },
  9:  { name:"Vibe Coding & No-Code Bouwen",      Icon:Code2,      phase:"scale"    },
  10: { name:"Change & Implementatie",            Icon:RefreshCw,  phase:"govern"   },
};

/* ─── PROGRAMS ───────────────────────────────────────────────────────── */
const PROGRAMS = {
  foundations: {
    Icon: GraduationCap,
    gradient: `linear-gradient(135deg,${C.blue},${C.blueLight})`,
    name: "AI Foundations",
    tagline: "De basis van AI begrijpen en direct toepassen in jouw dagelijkse werkwijze.",
    includes: ["AI-mogelijkheden en tools verkennen","Eerste use cases in jouw workflow","Hands-on oefenen met ChatGPT & Claude","AI-ready mindset en cultuur"],
    idealFor: "Teams die net beginnen met AI of basistools gebruiken",
    modules: [1,2,3],
  },
  praktijk: {
    Icon: Hammer,
    gradient: `linear-gradient(135deg,#6366f1,${C.magenta})`,
    name: "AI in de Praktijk",
    tagline: "Concrete AI-werkwijzen verankeren in de processen van jouw team.",
    includes: ["Rolspecifieke AI-toepassingen","Workflow automatisering & content","Research, analyse en rapportage","Terugkomdag met praktijkcases"],
    idealFor: "Teams klaar om AI structureel in te zetten",
    modules: [1,2,3,4,5,6],
  },
  verdieping: {
    Icon: Rocket,
    gradient: `linear-gradient(135deg,${C.blueDark},${C.blue})`,
    name: "AI Verdieping & Strategie",
    tagline: "Van experimenten naar een gedragen AI-strategie voor je hele organisatie.",
    includes: ["AI strategie & implementatieplan","Automatisering en data-dashboards","Change management & adoptie","Governance en AI Act bewustzijn"],
    idealFor: "Teams die AI organisatiebreed willen verankeren",
    modules: [1,6,7,8,10],
  },
  voorop: {
    Icon: Lightbulb,
    gradient: `linear-gradient(135deg,${C.green},${C.blue})`,
    name: "AI Voorop",
    tagline: "Jouw organisatie aan de voorkant van AI-innovatie positioneren.",
    includes: ["AI agents en delegatiesystemen","No-code bouwen en prototyping","Data & rapportage automatiseren","Kennisecologie en lerende organisatie"],
    idealFor: "Teams met AI-ervaring die willen innoveren",
    modules: [8,9,7,4],
  },
};

/* ─── FORMATS ────────────────────────────────────────────────────────── */
const FORMATS = {
  workshop:   { label:"AI Workshop",   sublabel:"1 dag",    tagline:"Eén dag. Eén doorbraak. Direct toepasbaar.", Icon:Flame,      color:C.blue },
  werkplaats: { label:"AI Werkplaats", sublabel:"2 dagen",  tagline:"Twee dagen hands-on bouwen als teamdag of strategie-sessie.", Icon:Hammer,     color:C.magenta },
  doorbraak:  { label:"AI Doorbraak",  sublabel:"4 dagen",  tagline:"Intensief als blok of gespreid — van theorie naar werkwijze.", Icon:Zap,        color:"#7c3aed" },
  leerpad:    { label:"AI Leerpad",    sublabel:"6 weken",  tagline:"Één dag per week. Rustig tempo, duurzame verankering.", Icon:BookMarked, color:"#5a8a1a" },
  unsure:     { label:"Help me kiezen",sublabel:"Advies op maat", tagline:"Vertel ons je situatie — wij adviseren het beste format.", Icon:HelpCircle, color:C.blueGrey },
};

/* ─── QUESTIONS ──────────────────────────────────────────────────────── */
const QUESTIONS = [
  { id:"role", n:1, Icon:User, section:"Jouw profiel",
    q:"Wat omschrijft jouw rol het best?", type:"single",
    opts:[{l:"Directeur / Eigenaar",v:"executive"},{l:"Manager",v:"manager"},{l:"Teamleider",v:"lead"},{l:"Medewerker",v:"contributor"},{l:"Consultant",v:"consultant"},{l:"Anders",v:"other"}]
  },
  { id:"teamsize", n:2, Icon:Users, section:"Jouw profiel",
    q:"Hoe groot is jouw team?", type:"single",
    opts:[{l:"Alleen ik",v:"solo"},{l:"2-5 mensen",v:"tiny"},{l:"6-10 mensen",v:"small"},{l:"11-15 mensen",v:"medium"},{l:"15+ mensen",v:"large"}]
  },
  { id:"industry", n:3, Icon:Building2, section:"Jouw profiel",
    q:"In welke sector ben je actief?", type:"single",
    opts:[{l:"Technologie",v:"tech"},{l:"Zorg & Gezondheid",v:"healthcare"},{l:"Financiën",v:"finance"},{l:"Onderwijs",v:"education"},{l:"Marketing / Bureau",v:"marketing"},{l:"Productie & Industrie",v:"manufacturing"},{l:"Retail / E-commerce",v:"retail"},{l:"Consultancy",v:"consulting"},{l:"Anders",v:"other"}]
  },
  { id:"goals", n:4, Icon:Target, section:"Doelen",
    q:"Wat zijn jouw voornaamste doelen?", type:"multi",
    opts:[{l:"Productiviteit verhogen",v:"productivity",ms:[3,6]},{l:"Kosten verlagen",v:"costs",ms:[6,7]},{l:"Betere besluitvorming",v:"decisions",ms:[4,7]},{l:"Klantervaring verbeteren",v:"cx",ms:[3,5]},{l:"Repetitieve taken automatiseren",v:"automate",ms:[6,8]},{l:"Concurrentiepositie versterken",v:"compete",ms:[1,10]},{l:"Producten of diensten innoveren",v:"innovate",ms:[9,8]}]
  },
  { id:"hours_spent", n:5, Icon:FileText, section:"Pijnpunten",
    q:"Hoeveel uur per week besteedt jouw team aan repetitief schrijven, onderzoek en plannen?", type:"single",
    opts:[{l:"Minder dan 5 uur",v:"lt5"},{l:"5-10 uur",v:"5to10"},{l:"11-20 uur",v:"11to20"},{l:"21-40 uur",v:"21to40"},{l:"Meer dan 40 uur",v:"gt40"}]
  },
  { id:"slowdowns", n:6, Icon:ShieldAlert, section:"Pijnpunten",
    q:"Wat vertraagt jouw team het meest?", type:"multi",
    opts:[{l:"Handmatige, repetitieve taken",v:"manual",ms:[6]},{l:"Te veel vergaderingen",v:"meetings",ms:[10]},{l:"Informatie zoeken",v:"search",ms:[4]},{l:"Administratief werk",v:"admin",ms:[6]},{l:"Wachten op goedkeuringen",v:"approvals",ms:[10]},{l:"Communicatie-bottlenecks",v:"comms",ms:[3]},{l:"Schakelen tussen te veel tools en systemen",v:"switching",ms:[2]},{l:"Gebrek aan automatisering",v:"noautomation",ms:[6]},{l:"Data-invoer en verwerking",v:"dataentry",ms:[7]}]
  },
  { id:"hours_saved", n:7, Icon:Clock, section:"Pijnpunten",
    q:"Hoeveel uur per week zou AI realistisch kunnen besparen per persoon?", type:"single",
    opts:[{l:"1-2 uur per week",v:"1to2"},{l:"3-5 uur per week",v:"3to5"},{l:"6-10 uur per week",v:"6to10"},{l:"11-15 uur per week",v:"11to15"},{l:"15+ uur per week",v:"gt15"}]
  },
  { id:"challenges", n:8, Icon:ShieldAlert, section:"Pijnpunten",
    q:"Welke uitdagingen ervaar je?", type:"multi",
    opts:[{l:"Weet niet waar te beginnen",v:"start",ms:[1]},{l:"Gebrek aan AI-kennis in het team",v:"skills",ms:[1,2]},{l:"Budget beperkingen",v:"budget"},{l:"Weerstand tegen verandering",v:"resistance",ms:[10]},{l:"Beveiliging en privacy",v:"security",ms:[10]},{l:"Integratie met bestaande systemen",v:"integration",ms:[6]},{l:"ROI aantonen",v:"roi",ms:[7,10]}]
  },
  { id:"tools", n:9, Icon:Wrench, section:"AI Ervaring",
    q:"Welke AI-tools gebruik je al?", type:"multi",
    opts:[{l:"ChatGPT",v:"chatgpt",mat:1},{l:"Claude",v:"claude",mat:1},{l:"Gemini (Google AI)",v:"gemini",mat:1},{l:"Microsoft Copilot",v:"copilot",mat:1},{l:"Midjourney / DALL-E",v:"image",mat:1,ms:[5]},{l:"GitHub Copilot",v:"github",mat:2,ms:[9]},{l:"Notion AI",v:"notion",mat:1},{l:"Zapier / Make",v:"zapier",mat:2,ms:[6]},{l:"Eigen AI-oplossingen",v:"custom",mat:3,ms:[9]},{l:"Nog geen",v:"none",mat:0}]
  },
  { id:"training", n:10, Icon:BookOpen, section:"AI Ervaring",
    q:"Heeft jouw team eerder AI-training gehad?", type:"multi",
    opts:[{l:"Ja — formeel trainingsprogramma",v:"formal",mat:3},{l:"Ja — zelf geleerd of online cursus",v:"self",mat:2},{l:"Wat informele workshops",v:"informal",mat:1},{l:"Nee — maar wel geïnteresseerd",v:"interested",mat:0},{l:"Nee — nog niet",v:"never",mat:0}]
  },
  { id:"aiusage", n:11, Icon:Bot, section:"AI Ervaring",
    q:"Hoe gebruikt jouw team AI op dit moment?", type:"single",
    opts:[{l:"Nog niet — we kijken de kat uit de boom",v:"none",mat:0},{l:"Sporadisch — individuen experimenteren zelf",v:"basic",mat:2},{l:"Gestructureerd — AI zit in vaste werkprocessen",v:"some",mat:4},{l:"Strategisch — AI is onderdeel van onze bedrijfsaanpak",v:"integrated",mat:6},{l:"Vooruitlopend — wij innoveren actief met AI",v:"leading",mat:9}]
  },
  { id:"concerns", n:12, Icon:HelpCircle, section:"AI Ervaring",
    q:"Wat is jouw grootste praktische zorg rondom AI in teams?", type:"multi",
    opts:[{l:"Team-weerstand of angst voor verandering",v:"resistance",ms:[10]},{l:"Data privacy en beveiliging",v:"privacy",ms:[10]},{l:"Kosten versus ROI onzekerheid",v:"roi",ms:[7]},{l:"Leercurve is te steil",v:"learning",ms:[1,2]},{l:"AI maakt fouten of hallucineert",v:"errors",ms:[2]},{l:"Angst voor baanverlies",v:"jobs",ms:[10]},{l:"Integratie met huidige systemen",v:"integration",ms:[6]},{l:"Gebrek aan duidelijke use cases",v:"usecases",ms:[1]}]
  },
  { id:"format", n:13, Icon:Calendar, section:"Jouw voorkeur",
    q:"Welk format past het beste bij jullie situatie?", type:"single",
    opts:[
      {l:"AI Workshop",    v:"workshop",    sub:"1 dag — teamdag, kickoff of introductie"},
      {l:"AI Werkplaats",  v:"werkplaats",  sub:"2 dagen — strategie-sessie of verdieping"},
      {l:"AI Doorbraak",   v:"doorbraak",   sub:"4 dagen — intensief als blok of gespreid"},
      {l:"AI Leerpad",     v:"leerpad",     sub:"6 weken — 1 dag per week, duurzame opbouw"},
      {l:"Help me kiezen", v:"unsure",      sub:"Ik vertel jullie de situatie, jullie adviseren"},
    ]
  },
  { id:"budget", n:14, Icon:Euro, section:"Jouw voorkeur",
    q:"Wat is het globale budget voor AI-training?", type:"single",
    opts:[{l:"Onder €5.000",v:"xs"},{l:"€5.000 – €15.000",v:"sm"},{l:"€15.000 – €30.000",v:"md"},{l:"€30.000 – €50.000",v:"lg"},{l:"Nog niet bepaald",v:"unsure"}]
  },
];

/* ─── SCORING ────────────────────────────────────────────────────────── */
function calcResults(answers) {
  const scores={};
  for(let i=1;i<=10;i++) scores[i]=0;
  QUESTIONS.forEach(q=>{
    const ans=answers[q.id];
    if(!ans) return;
    const process=opt=>{if(opt.ms)opt.ms.forEach(m=>{scores[m]=(scores[m]||0)+2;});};
    if(Array.isArray(ans))ans.forEach(v=>{const o=q.opts.find(x=>x.v===v);if(o)process(o);});
    else{const o=q.opts.find(x=>x.v===ans);if(o)process(o);}
  });
  let mat=0;
  const usageOpt=QUESTIONS.find(q=>q.id==="aiusage").opts.find(o=>o.v===answers.aiusage);
  if(usageOpt?.mat)mat+=usageOpt.mat;
  (answers.tools||[]).forEach(v=>{const o=QUESTIONS.find(q=>q.id==="tools").opts.find(x=>x.v===v);if(o?.mat)mat+=o.mat;});
  const tVals=answers.training||[];
  const tBest=QUESTIONS.find(q=>q.id==="training").opts.filter(o=>tVals.includes(o.v)).reduce((a,o)=>Math.max(a,o.mat||0),0);
  mat=Math.min(15,mat+tBest);
  let primary,secondary;
  if(mat<=3){primary="foundations";secondary="praktijk";}
  else if(mat<=7){primary="praktijk";secondary="verdieping";}
  else if(mat<=11){primary="verdieping";secondary="voorop";}
  else{primary="voorop";secondary="verdieping";}
  const fmt=answers.format;
  if(fmt==="workshop")primary="foundations";
  else if(fmt==="werkplaats")primary=mat<=5?"foundations":"praktijk";
  else if(fmt==="doorbraak")primary=mat<=7?"praktijk":"verdieping";
  else if(fmt==="leerpad")primary=mat<=5?"praktijk":"verdieping";
  if(secondary===primary)secondary=primary==="foundations"?"praktijk":"foundations";
  const matLabel=mat<=3?"Starter":mat<=6?"Beginner":mat<=9?"Gevorderd":mat<=12?"Expert":"Innovator";
  const tsMap={"solo":"Alleen ik","tiny":"2-5 mensen","small":"6-10 mensen","medium":"11-15 mensen","large":"15+ mensen"};
  const chosenFormat=FORMATS[answers.format||"unsure"];
  return{primary,secondary,primaryName:PROGRAMS[primary].name,matLabel,
    teamSizeLabel:tsMap[answers.teamsize]||"–",
    formatLabel:chosenFormat.label,formatSublabel:chosenFormat.sublabel,
    FormatIcon:chosenFormat.Icon,formatColor:chosenFormat.color,mat};
}

/* ─── LOGO ───────────────────────────────────────────────────────────── */
function Logo({size=32}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <polygon points="20,2 30,13 20,13" fill="#CC1E6D"/>
        <polygon points="20,27 30,27 20,38" fill="#00A1DA"/>
        <polygon points="2,20 13,10 13,30" fill="#93C942"/>
        <polygon points="27,10 38,20 27,30" fill="#00A1DA" opacity="0.65"/>
        <polygon points="13,13 27,13 27,27 13,27" fill="#00A1DA"/>
      </svg>
      <span style={{fontFamily:T.heading,fontWeight:800,fontSize:size*0.58,color:C.blue,letterSpacing:"-0.02em"}}>Digidactics</span>
    </div>
  );
}

/* ─── D5 LEGEND ──────────────────────────────────────────────────────── */
function D5Legend(){
  const phases=[
    {k:"discover",Icon:Eye,      label:"Diagnose"},
    {k:"decide",  Icon:MousePointer,label:"Decide"},
    {k:"deploy",  Icon:Play,     label:"Ontdek"},
    {k:"scale",   Icon:TrendingUp,label:"Versnel"},
    {k:"govern",  Icon:Shield,   label:"Govern"},
  ];
  return(
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
      {phases.map(p=>{
        const d=D5[p.k];
        return(
          <div key={p.k} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:99,background:d.bg,border:`1px solid ${d.border}`,fontSize:11,fontWeight:700,fontFamily:T.body,color:d.color}}>
            <p.Icon size={10} strokeWidth={2}/>{d.label}
          </div>
        );
      })}
    </div>
  );
}

/* ─── MODULE PILL ────────────────────────────────────────────────────── */
function ModulePill({modId}){
  const m=MODULES[modId];
  const d=D5[m.phase];
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,fontWeight:600,fontFamily:T.body,padding:"4px 10px",borderRadius:99,background:d.bg,color:d.color,border:`1px solid ${d.border}`,marginRight:6,marginBottom:6}}>
      <m.Icon size={11} strokeWidth={2}/>{m.name}
    </span>
  );
}

/* ─── PROGRESS ───────────────────────────────────────────────────────── */
function Progress({step,total}){
  const pct=Math.round(((step+1)/total)*100);
  return(
    <div style={{marginBottom:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:11,color:C.muted,fontWeight:600,fontFamily:T.body,textTransform:"uppercase",letterSpacing:"0.08em"}}>{QUESTIONS[step]?.section}</span>
        <span style={{fontSize:12,color:C.blue,fontWeight:700,fontFamily:T.body}}>{step+1} / {total}</span>
      </div>
      <div style={{height:4,background:C.border,borderRadius:99,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.blue},${C.magenta})`,borderRadius:99,transition:"width 0.45s cubic-bezier(.4,0,.2,1)"}}/>
      </div>
    </div>
  );
}

/* ─── OPTION ─────────────────────────────────────────────────────────── */
function Opt({label,sub,selected,onClick,multi}){
  return(
    <button onClick={onClick} style={{width:"100%",textAlign:"left",padding:sub?"13px 16px":"11px 16px",marginBottom:6,background:selected?`${C.blue}0d`:C.white,border:selected?`1.5px solid ${C.blue}`:`1.5px solid ${C.border}`,borderRadius:9,cursor:"pointer",display:"flex",alignItems:"flex-start",gap:12,transition:"all 0.15s",fontFamily:T.body}}>
      <span style={{width:18,height:18,borderRadius:multi?4:99,flexShrink:0,marginTop:2,border:selected?`1.5px solid ${C.blue}`:`1.5px solid ${C.border}`,background:selected?C.blue:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
        {selected&&<Check size={10} color="#fff" strokeWidth={3}/>}
      </span>
      <div>
        <div style={{fontSize:14,color:selected?C.heading:C.body,fontWeight:selected?600:400,lineHeight:1.3}}>{label}</div>
        {sub&&<div style={{fontSize:12,color:C.muted,marginTop:3,lineHeight:1.3}}>{sub}</div>}
      </div>
    </button>
  );
}

function Lbl({children,style={}}){
  return <div style={{fontSize:10,color:C.muted,fontWeight:700,fontFamily:T.body,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,...style}}>{children}</div>;
}

/* ─── SPLASH ─────────────────────────────────────────────────────────── */
/* ─── SPLASH ─────────────────────────────────────────────────────────── */
/* v13: gebaseerd op screenshot-to-code output, geconverteerd naar inline styles */
/* ─── SPLASH ─────────────────────────────────────────────────────────── */
/* v14: best s2c variant — gekleurde card glow, gradient icon bg, 16px body text */
/* ─── SPLASH ─────────────────────────────────────────────────────────── */
/* v18: GPT v3 — verfijnde teksten, kleinere knop, betere lijnpositie */
function Splash({onStart}){
  const cards=[
    {
      Icon: Search,
      iconBg:"linear-gradient(135deg,rgba(206,227,255,0.75) 0%,rgba(186,214,255,0.65) 100%)",
      iconColor:"#2f6aa7",
      label:"Diagnose",
      sub:"Breng in kaart waar jouw team staat op het gebied van AI-vaardigheden",
      shadow:"0 18px 42px rgba(15,23,42,0.16)",
      borderColor:"rgba(15,23,42,0.14)",
    },
    {
      Icon: Rocket,
      iconBg:"linear-gradient(135deg,rgba(206,227,255,0.75) 0%,rgba(186,214,255,0.65) 100%)",
      iconColor:"#2f6aa7",
      label:"Ontdek",
      sub:"Verken welke AI-mogelijkheden direct inzetbaar zijn voor jouw team",
      shadow:"0 18px 42px rgba(15,23,42,0.16)",
      borderColor:"rgba(15,23,42,0.14)",
    },
    {
      Icon: BarChart3,
      iconBg:"linear-gradient(135deg,rgba(198,245,226,0.75) 0%,rgba(178,236,214,0.65) 100%)",
      iconColor:"#1f9f86",
      label:"Versnel",
      sub:"Krijg een persoonlijk leeradvies om gericht te groeien",
      shadow:"0 18px 42px rgba(15,23,42,0.16), 0 18px 46px rgba(31,159,134,0.18)",
      borderColor:"rgba(15,23,42,0.14)",
    },
  ];

  return(
    <div style={{
      minHeight:"100vh",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      background:
        "radial-gradient(1200px 600px at 50% 20%,rgba(220,235,255,0.35) 0%,rgba(255,255,255,0) 60%)," +
        "linear-gradient(180deg,#f8fbff 0%,#f3f8ff 55%,#f4fbf8 100%)",
      fontFamily:T.body,
      animation:"fadeUp 0.45s ease",
    }}>
      <div style={{
        width:"100%",
        maxWidth:1200,
        padding:"60px 32px 70px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        textAlign:"center",
      }}>

        {/* ── Title ── */}
        <h1 style={{
          fontFamily:T.heading,
          fontSize:"clamp(28px,3.5vw,44px)",
          fontWeight:800,
          color:"#0b1220",
          letterSpacing:"-0.03em",
          lineHeight:1.05,
          margin:"0 0 14px 0",
        }}>
          AI Skills Accelerator
        </h1>

        {/* ── Subtitle ── */}
        <p style={{
          fontFamily:T.body,
          fontSize:"clamp(16px,1.8vw,20px)",
          fontWeight:500,
          color:"#0b1220",
          opacity:0.80,
          margin:"0 0 64px 0",
          maxWidth:680,
        }}>
          Ontdek welk AI-traject past bij jouw team én ontvang een persoonlijk advies op maat.
        </p>

        {/* ── Cards + connector ── */}
        <div style={{
          position:"relative",
          width:"100%",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          marginBottom:56,
        }}>
          {/* Connector line */}
          <div style={{
            position:"absolute",
            top:"54%",
            left:"50%",
            transform:"translate(-50%,-50%)",
            width:"122%",
            height:8,
            borderRadius:9999,
            background:"linear-gradient(90deg,rgba(76,142,212,0.70) 0%,rgba(92,176,193,0.55) 55%,rgba(117,214,170,0.70) 100%)",
            boxShadow:"0 10px 26px rgba(130,180,220,0.16)",
            zIndex:1,
          }}/>

          {/* Cards */}
          <div style={{
            position:"relative",
            zIndex:2,
            display:"flex",
            justifyContent:"center",
            gap:48,
            flexWrap:"wrap",
          }}>
            {cards.map(c=>(
              <div key={c.label} style={{
                width:340,
                padding:"36px 26px 28px",
                borderRadius:20,
                border:`1px solid ${c.borderColor}`,
                boxShadow:c.shadow,
                background:"#ffffff",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center",
                position:"relative",
                zIndex:2,
              }}>
                {/* Icon */}
                <div style={{
                  width:60,
                  height:60,
                  borderRadius:16,
                  background:c.iconBg,
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  marginBottom:20,
                  flexShrink:0,
                }}>
                  <c.Icon size={28} color={c.iconColor} strokeWidth={2}/>
                </div>
                {/* Label */}
                <div style={{
                  fontFamily:T.heading,
                  fontSize:28,
                  fontWeight:800,
                  color:"#111827",
                  letterSpacing:"-0.01em",
                  marginBottom:10,
                }}>
                  {c.label}
                </div>
                {/* Description */}
                <div style={{
                  fontFamily:T.body,
                  fontSize:16,
                  fontWeight:500,
                  color:"#111827",
                  lineHeight:1.45,
                  maxWidth:280,
                  opacity:0.85,
                }}>
                  {c.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Button ── */}
        <button
          onClick={onStart}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 22px 48px rgba(47,106,167,0.42)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 14px 36px rgba(47,106,167,0.32)";}}
          style={{
            fontFamily:T.heading,
            fontSize:"clamp(16px,1.8vw,22px)",
            fontWeight:800,
            color:"#ffffff",
            background:"#2f6aa7",
            border:"none",
            borderRadius:18,
            padding:"18px 56px",
            cursor:"pointer",
            boxShadow:"0 14px 36px rgba(47,106,167,0.32)",
            marginBottom:24,
            transition:"transform 140ms ease, box-shadow 140ms ease",
            letterSpacing:"-0.01em",
          }}>
          Start jouw assessment
        </button>

        {/* ── Footer note ── */}
        <p style={{
          fontFamily:T.body,
          fontSize:16,
          fontWeight:500,
          color:"#5b6472",
          opacity:0.80,
        }}>
          Duurt slechts 3-4 minuten · Gratis · Geen account nodig
        </p>

      </div>
    </div>
  );
}

/* ─── QUESTION ───────────────────────────────────────────────────────── */
function Question({q,answers,setAnswers,onNext,onBack,step,total}){
  const cur=answers[q.id];
  const isMulti=q.type==="multi";
  const toggle=v=>{
    if(isMulti){const arr=cur||[];setAnswers(a=>({...a,[q.id]:arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]}));}
    else setAnswers(a=>({...a,[q.id]:v}));
  };
  const canNext=isMulti?(cur&&cur.length>0):!!cur;
  return(
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <Progress step={step} total={total}/>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
        <div style={{width:40,height:40,borderRadius:10,background:`${C.blue}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <q.Icon size={18} color={C.blue} strokeWidth={1.75}/>
        </div>
        <h2 style={{fontFamily:T.heading,fontSize:"clamp(16px,3vw,19px)",fontWeight:700,color:C.heading,lineHeight:1.3,flex:1}}>{q.q}</h2>
      </div>
      {isMulti&&<p style={{fontFamily:T.body,fontSize:11,color:C.muted,marginBottom:12,fontWeight:500}}>Meerdere antwoorden mogelijk</p>}
      <div style={{maxHeight:400,overflowY:"auto",paddingRight:4}}>
        {q.opts.map(o=><Opt key={o.v} label={o.l} sub={o.sub} selected={isMulti?(cur||[]).includes(o.v):cur===o.v} onClick={()=>toggle(o.v)} multi={isMulti}/>)}
      </div>
      <div style={{display:"flex",gap:10,marginTop:22}}>
        {step>0&&(
          <button onClick={onBack} style={{flex:1,padding:"12px 0",background:C.white,border:`1.5px solid ${C.border}`,borderRadius:99,color:C.body,fontSize:14,cursor:"pointer",fontFamily:T.body,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            <ArrowLeft size={14}/> Terug
          </button>
        )}
        <button onClick={()=>canNext&&onNext()} disabled={!canNext} style={{flex:3,padding:"13px 0",background:canNext?C.blue:C.divider,border:"none",borderRadius:99,color:canNext?"#fff":C.muted,fontSize:14,fontWeight:600,cursor:canNext?"pointer":"not-allowed",fontFamily:T.body,transition:"all 0.2s",boxShadow:canNext?`0 4px 16px ${C.blue}35`:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          {step===total-1?"Bekijk mijn advies":"Volgende"}<ChevronRight size={15}/>
        </button>
      </div>
    </div>
  );
}

/* ─── LOADING ────────────────────────────────────────────────────────── */
function Loading(){
  const [idx,setIdx]=useState(0);
  const msgs=["Profiel analyseren…","D5-fases koppelen…","Programma samenstellen…","Advies klaarstomen…"];
  useEffect(()=>{const t=setInterval(()=>setIdx(i=>(i+1)%msgs.length),650);return()=>clearInterval(t);},[]);
  return(
    <div style={{textAlign:"center",padding:"70px 0"}}>
      <div style={{position:"relative",width:60,height:60,margin:"0 auto 24px"}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`3px solid ${C.border}`,borderTop:`3px solid ${C.blue}`,animation:"spin 0.9s linear infinite"}}/>
        <div style={{position:"absolute",inset:9,borderRadius:"50%",border:`2px solid transparent`,borderTop:`2px solid ${C.magenta}`,animation:"spin 1.3s linear infinite reverse"}}/>
      </div>
      <p style={{fontFamily:T.body,color:C.body,fontSize:15,fontWeight:600}}>{msgs[idx]}</p>
    </div>
  );
}

/* ─── PROGRAM CARD ───────────────────────────────────────────────────── */
function ProgramCard({prog,highlight,formatLabel,formatSublabel}){
  const p=PROGRAMS[prog];
  const duurText=formatSublabel?`${formatLabel} · ${formatSublabel}`:"Op maat";
  return(
    <div style={{background:C.white,border:highlight?`1.5px solid ${C.blue}`:`1.5px solid ${C.border}`,borderRadius:14,padding:"22px 20px",marginBottom:14,boxShadow:highlight?C.shadowMd:C.shadow,position:"relative",overflow:"hidden"}}>
      {highlight&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.blue},${C.magenta})`}}/>}
      <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:18}}>
        <div style={{width:48,height:48,borderRadius:12,background:p.gradient,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <p.Icon size={22} color="#fff" strokeWidth={1.75}/>
        </div>
        <div style={{flex:1}}>
          {highlight&&<div style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,color:C.blue,fontFamily:T.body,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}><Star size={10} fill={C.blue}/> Beste match</div>}
          <div style={{fontFamily:T.heading,fontWeight:700,fontSize:16,color:C.heading,marginBottom:3}}>{p.name}</div>
          <div style={{fontFamily:T.body,fontSize:13,color:C.muted,lineHeight:1.5}}>{p.tagline}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div>
          <Lbl>Inbegrepen</Lbl>
          {p.includes.map(it=>(
            <div key={it} style={{display:"flex",gap:8,marginBottom:7,alignItems:"flex-start"}}>
              <CheckCircle2 size={13} color={C.green} strokeWidth={2} style={{marginTop:2,flexShrink:0}}/>
              <span style={{fontFamily:T.body,fontSize:12,color:C.body,lineHeight:1.45}}>{it}</span>
            </div>
          ))}
        </div>
        <div>
          <Lbl>Format</Lbl>
          <div style={{fontFamily:T.body,fontSize:13,fontWeight:700,color:C.heading,marginBottom:14}}>{duurText}</div>
          <Lbl>Ideaal voor</Lbl>
          <div style={{fontFamily:T.body,fontSize:12,fontWeight:600,color:C.heading,lineHeight:1.45}}>{p.idealFor}</div>
        </div>
      </div>
      {/* Module pills only — no D5 phase legend */}
      <div style={{display:"flex",flexWrap:"wrap",marginBottom:18}}>
        {p.modules.map(m=><ModulePill key={m} modId={m}/>)}
      </div>
      <div style={{display:"flex",gap:10}}>
        <button style={{flex:2,padding:"11px 0",background:C.blue,border:"none",borderRadius:99,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:T.body,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          Meer informatie <ChevronRight size={14}/>
        </button>
        <button style={{flex:1,padding:"11px 0",background:"transparent",border:`1.5px solid ${C.border}`,borderRadius:99,color:C.body,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:T.body}}>
          Gesprek plannen
        </button>
      </div>
    </div>
  );
}

/* ─── DOWNLOAD FORM ──────────────────────────────────────────────────── */
function DownloadForm({res,answers,onClose}){
  const [form,setForm]=useState({name:"",email:"",company:"",phone:"",extra:""});
  const [status,setStatus]=useState("idle");
  const [err,setErr]=useState("");
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const submit=async()=>{
    if(!form.name.trim()){setErr("Vul je naam in.");return;}
    if(!form.email.includes("@")){setErr("Vul een geldig e-mailadres in.");return;}
    setErr("");setStatus("loading");
    try{await fetch("/api/subscribe",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:form.email,name:form.name,org:form.company,phone:form.phone,extra:form.extra,niveau:res.matLabel,programma:res.primaryName,team:res.teamSizeLabel,format:res.formatLabel})});}catch(e){}
    setStatus("done");
  };
  if(status==="done") return(
    <div style={{textAlign:"center",padding:"32px 0",animation:"fadeUp 0.3s"}}>
      <CheckCircle2 size={48} color={C.green} strokeWidth={1.5} style={{margin:"0 auto 16px",display:"block"}}/>
      <h3 style={{fontFamily:T.heading,fontWeight:700,color:C.heading,marginBottom:8,fontSize:20}}>Bedankt, {form.name.split(" ")[0]}!</h3>
      <p style={{fontFamily:T.body,fontSize:14,color:C.body,lineHeight:1.65,marginBottom:24}}>Je persoonlijke AI Roadmap is onderweg naar<br/><strong>{form.email}</strong>.<br/>We nemen binnen 1 werkdag contact op.</p>
      <button onClick={onClose} style={{padding:"12px 32px",background:C.blue,border:"none",borderRadius:99,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:T.body}}>Terug naar resultaten</button>
    </div>
  );
  return(
    <div style={{animation:"fadeUp 0.3s"}}>
      <h3 style={{fontFamily:T.heading,fontWeight:700,color:C.heading,fontSize:18,marginBottom:4}}>Ontvang jouw advies op maat</h3>
      <p style={{fontFamily:T.body,fontSize:13,color:C.muted,marginBottom:22,lineHeight:1.55}}>Vul je gegevens in — we nemen binnen 24 uur contact op.</p>
      <div style={{display:"flex",gap:10,marginBottom:22,flexWrap:"wrap"}}>
        {[{Icon:Mail,bg:`${C.blue}12`,color:C.blue,label:"info@digidactics.nl"},{Icon:Phone,bg:`${C.magenta}10`,color:C.magenta,label:"+31 (0)6 ..."}].map(item=>(
          <div key={item.label} style={{display:"flex",alignItems:"center",gap:10,background:C.bgSoft,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",flex:"1 1 160px"}}>
            <div style={{width:32,height:32,borderRadius:8,background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><item.Icon size={15} color={item.color} strokeWidth={1.75}/></div>
            <span style={{fontFamily:T.body,fontSize:13,color:C.body}}>{item.label}</span>
          </div>
        ))}
      </div>
      {[{label:"Volledige naam *",key:"name",ph:"Jan de Vries",type:"text"},{label:"E-mailadres *",key:"email",ph:"jan@bedrijf.nl",type:"email"},{label:"Bedrijfsnaam",key:"company",ph:"Jouw organisatie",type:"text"},{label:"Telefoonnummer",key:"phone",ph:"+31 6 12345678",type:"tel"}].map(f=>(
        <div key={f.key} style={{marginBottom:12}}>
          <label style={{fontFamily:T.body,fontSize:12,color:C.body,fontWeight:600,display:"block",marginBottom:5}}>{f.label}</label>
          <input type={f.type} value={form[f.key]} onChange={set(f.key)} placeholder={f.ph} style={{width:"100%",padding:"11px 14px",border:`1.5px solid ${C.border}`,borderRadius:9,fontSize:14,fontFamily:T.body,color:C.heading,outline:"none",boxSizing:"border-box",background:C.bgSoft}}/>
        </div>
      ))}
      <div style={{marginBottom:18}}>
        <label style={{fontFamily:T.body,fontSize:12,color:C.body,fontWeight:600,display:"block",marginBottom:5}}>Toelichting of specifieke wensen</label>
        <textarea value={form.extra} onChange={set("extra")} placeholder="Beschrijf jullie situatie, sector of specifieke leerwensen…" rows={3} style={{width:"100%",padding:"11px 14px",border:`1.5px solid ${C.border}`,borderRadius:9,fontSize:13,fontFamily:T.body,color:C.heading,outline:"none",boxSizing:"border-box",background:C.bgSoft,resize:"vertical"}}/>
      </div>
      {err&&<p style={{fontFamily:T.body,color:"#dc2626",fontSize:12,marginBottom:10,fontWeight:600}}>{err}</p>}
      <button onClick={submit} disabled={status==="loading"} style={{width:"100%",padding:"14px",background:status==="loading"?C.muted:C.blue,border:"none",borderRadius:99,color:"#fff",fontSize:15,fontWeight:600,cursor:status==="loading"?"wait":"pointer",fontFamily:T.body,boxShadow:`0 4px 16px ${C.blue}35`,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        {status==="loading"?"Versturen…":"Verstuur aanvraag"}{status!=="loading"&&<ChevronRight size={16}/>}
      </button>
      <p style={{fontFamily:T.body,fontSize:11,color:C.muted,textAlign:"center",marginTop:10}}>Je gegevens worden vertrouwelijk behandeld (AVG-conform).</p>
    </div>
  );
}

/* ─── RESULTS ────────────────────────────────────────────────────────── */
function Results({res,answers,onReset}){
  const [showForm,setShowForm]=useState(false);
  if(showForm) return(
    <div style={{animation:"fadeUp 0.3s"}}>
      <button onClick={()=>setShowForm(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontFamily:T.body,fontSize:13,fontWeight:600,marginBottom:22,padding:0,display:"flex",alignItems:"center",gap:6}}>
        <ArrowLeft size={14}/> Terug naar resultaten
      </button>
      <DownloadForm res={res} answers={answers} onClose={()=>setShowForm(false)}/>
    </div>
  );
  return(
    <div style={{animation:"fadeUp 0.4s ease"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{marginBottom:20}}><Logo size={30}/></div>
        <div style={{width:48,height:48,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.green})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",boxShadow:`0 4px 20px ${C.blue}30`}}>
          <CheckCircle2 size={24} color="#fff" strokeWidth={1.75}/>
        </div>
        <h2 style={{fontFamily:T.heading,fontSize:"clamp(18px,4vw,24px)",fontWeight:800,color:C.heading,marginBottom:8,letterSpacing:"-0.01em"}}>Jouw Persoonlijk AI Advies</h2>
        <p style={{fontFamily:T.body,fontSize:14,color:C.body,maxWidth:380,margin:"0 auto",lineHeight:1.65}}>Op basis van jouw antwoorden zijn dit de best passende AISA-trajecten voor jouw team.</p>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:26,flexWrap:"wrap"}}>
        {[
          {label:"AI-niveau",  val:res.matLabel,       color:C.blue,        Icon:Bot},
          {label:"Teamgrootte",val:res.teamSizeLabel,  color:C.blueGrey,    Icon:Users},
          {label:"Format",     val:`${res.formatLabel} · ${res.formatSublabel}`,color:res.formatColor,Icon:res.FormatIcon},
        ].map(c=>(
          <div key={c.label} style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"11px 14px",flex:"1 1 100px",boxShadow:C.shadow,borderTop:`2.5px solid ${c.color}`}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}>
              <c.Icon size={11} color={c.color} strokeWidth={2}/>
              <Lbl style={{marginBottom:0}}>{c.label}</Lbl>
            </div>
            <div style={{fontFamily:T.body,fontSize:12,fontWeight:700,color:C.heading}}>{c.val}</div>
          </div>
        ))}
      </div>
      <Lbl>Aanbevolen trajecten</Lbl>
      <ProgramCard prog={res.primary} highlight={true} formatLabel={res.formatLabel} formatSublabel={res.formatSublabel}/>
      <ProgramCard prog={res.secondary} highlight={false} formatLabel={res.formatLabel} formatSublabel={res.formatSublabel}/>
      <div style={{background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,borderRadius:14,padding:"26px 22px",textAlign:"center",marginTop:8}}>
        <h3 style={{fontFamily:T.heading,fontSize:18,fontWeight:700,color:"#fff",marginBottom:8}}>Klaar om te beginnen?</h3>
        <p style={{fontFamily:T.body,fontSize:13,color:"rgba(255,255,255,0.85)",marginBottom:22,lineHeight:1.65}}>Plan een gratis kennismakingsgesprek of download jouw persoonlijke AI-advies.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button style={{padding:"12px 22px",background:"#fff",border:"none",borderRadius:99,color:C.blue,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:T.body,display:"flex",alignItems:"center",gap:7}}>
            <Calendar size={15}/> Gratis gesprek plannen
          </button>
          <button onClick={()=>setShowForm(true)} style={{padding:"12px 22px",background:"transparent",border:"1.5px solid rgba(255,255,255,0.5)",borderRadius:99,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:T.body,display:"flex",alignItems:"center",gap:7}}>
            <Download size={15}/> Download advies
          </button>
        </div>
      </div>
      <button onClick={onReset} style={{marginTop:14,width:"100%",padding:"10px",background:"transparent",border:`1px solid ${C.border}`,borderRadius:99,color:C.muted,fontSize:12,cursor:"pointer",fontFamily:T.body,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
        <RotateCcw size={12}/> Opnieuw beginnen
      </button>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────── */
export default function App(){
  const [screen,setScreen]=useState("splash");
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [results,setResults]=useState(null);
  const next=()=>{
    if(step<QUESTIONS.length-1){setStep(s=>s+1);window.scrollTo({top:0,behavior:"smooth"});}
    else{setScreen("loading");setTimeout(()=>{setResults(calcResults(answers));setScreen("results");},2200);}
  };
  const back=()=>step>0&&setStep(s=>s-1);
  const reset=()=>{setScreen("splash");setStep(0);setAnswers({});setResults(null);};
  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#EEF2F7;font-family:'Inter',sans-serif;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        button{transition:all 0.18s}
        button:hover:not(:disabled){opacity:0.87;transform:translateY(-1px)}
        button:active:not(:disabled){transform:translateY(0)!important;opacity:1}
        input:focus,textarea:focus{border-color:#00A1DA!important;box-shadow:0 0 0 3px rgba(0,161,218,0.12)}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#E1E1E1;border-radius:99px}
      `}</style>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:screen==="splash"?"transparent":"#EEF2F7",padding:screen==="splash"?"0":"36px 16px"}}>
        {screen==="splash" ? (
          <Splash onStart={()=>setScreen("quiz")}/>
        ) : (
          <div style={{width:"100%",maxWidth:560,margin:"0 auto",padding:"0 16px"}}>
            <div style={{background:C.white,borderRadius:20,padding:"36px 30px",boxShadow:"0 4px 40px rgba(0,0,0,0.07)"}}>
              {screen==="quiz"    && <Question q={QUESTIONS[step]} answers={answers} setAnswers={setAnswers} onNext={next} onBack={back} step={step} total={QUESTIONS.length}/>}
              {screen==="loading" && <Loading/>}
              {screen==="results" && results && <Results res={results} answers={answers} onReset={reset}/>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
