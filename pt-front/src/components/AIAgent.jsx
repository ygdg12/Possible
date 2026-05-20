import { useState, useEffect, useRef, useCallback } from "react";

const Svg = ({ d, size = 18, strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const ICONS = {
  sparkles: ["M12 3l1.2 3.6L17 7.8l-3.6 1.2L12 12.6 10.6 9l-3.6-1.2L10.8 6.6 12 3z","M5 14l.8 2.4L8 17.2l-2.4.8L5 20.4 3.6 18l-2.4-.8L3.2 16.4 5 14z"],
  x: ["M18 6L6 18","M6 6l12 12"],
  send: ["M22 2L11 13","M22 2L15 22 11 13 2 9l20-7z"],
  user: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  chevronDown: "M6 9l6 6 6-6",
};

const KB = [
  { patterns:["hello","hi","hey","greet","selam","salaam","good morning","good afternoon"], responses:["Hello! 👋 Welcome to Possible Technology. I'm your AI assistant. How can I help you today?","Hi there! I'm here to help with any questions about our services, ERP packages, or anything else."] },
  { patterns:["erp","enterprise resource planning","erp package","erp software","management system","business system"], responses:["We offer a complete range of **ERP packages** for Ethiopian businesses:\n\n• **Starter ERP** — Finance & Inventory for small businesses\n• **Business ERP** — Finance, HR, CRM & Inventory (most popular)\n• **Enterprise ERP** — Full suite with all modules + customization\n• **Custom ERP** — Built from scratch for unique requirements\n\nScroll to our ERP Packages section or ask about a specific package!"] },
  { patterns:["starter erp","small business erp","basic erp"], responses:["The **Starter ERP** is perfect for small businesses:\n\n✓ Financial Management & invoicing\n✓ Inventory & Stock Control\n✓ Basic Dashboard & Analytics\n✓ Local support & training\n✓ Cloud or on-premise deployment\n\nWant to request a demo or speak to our team?"] },
  { patterns:["business erp","mid size","medium business","popular erp"], responses:["The **Business ERP** is our most popular package:\n\n✓ All Starter features\n✓ HR & Payroll Management\n✓ Customer Relationship Management (CRM)\n✓ Sales & Purchase Order Management\n✓ Advanced Reporting & BI\n✓ Multi-user & role-based access\n\nShall I connect you with our team?"] },
  { patterns:["enterprise erp","full suite","enterprise package","large business"], responses:["The **Enterprise ERP** is our flagship solution:\n\n✓ All Business ERP features\n✓ Manufacturing & Production Module\n✓ Supply Chain & Logistics\n✓ Project Management\n✓ Multi-branch & Multi-currency\n✓ Advanced customization & APIs\n✓ Dedicated support team\n\nWould you like to schedule a consultation?"] },
  { patterns:["custom erp","bespoke","custom build","unique requirement","tailor"], responses:["Our **Custom ERP** is for organizations with unique requirements:\n\n✓ Full business analysis\n✓ Solution designed around your workflows\n✓ Integration with existing systems\n✓ Complete documentation & training\n✓ Long-term maintenance & upgrades\n\nEvery project starts with a free consultation. Want to book one?"] },
  { patterns:["cloud","aws","azure","cloud hosting","cloud computing"], responses:["Our **Cloud Services** include:\n\n• Cloud migration & strategy\n• Infrastructure setup (AWS, Azure, private cloud)\n• Ongoing cloud management\n• Disaster recovery & backup\n• 99.9% uptime SLA\n\nWant to learn more?"] },
  { patterns:["security","cyber","cybersecurity","protect","firewall","data protection"], responses:["Our **Cyber Security** services:\n\n• Vulnerability assessments & pen testing\n• 24/7 threat monitoring\n• Firewall & endpoint protection\n• Employee security training\n• Incident response & recovery\n\nShall I connect you with our security team?"] },
  { patterns:["web","website","app","application","develop","build","mobile app","software"], responses:["Our **Web & App Development** team builds:\n\n• Custom websites & web apps\n• Mobile apps (iOS & Android)\n• E-commerce platforms\n• API development & integrations\n• Tech: React, TypeScript, Python, Node.js\n\nWant to discuss your project?"] },
  { patterns:["data","analytics","dashboard","report","insight","business intelligence"], responses:["Our **Data Analytics** service:\n\n• Custom dashboards & real-time reporting\n• Business Intelligence (BI) setup\n• Data warehousing & ETL pipelines\n• Predictive analytics & forecasting\n\nWould you like to see examples?"] },
  { patterns:["it support","helpdesk","support","managed service","maintenance"], responses:["Our **IT Support & Managed Services**:\n\n• 24/7 helpdesk & remote support\n• On-site support in Addis Ababa\n• Network setup & management\n• Hardware procurement & maintenance\n• Proactive system monitoring\n\nShall I get someone to reach out?"] },
  { patterns:["consulting","consult","strategy","digital transformation","roadmap"], responses:["Our **IT Consulting** helps you make the right technology decisions:\n\n• Digital transformation strategy\n• Technology roadmap planning\n• IT audits & assessments\n• Budget optimization\n\nWe've helped 50+ businesses modernize. Want a free consultation?"] },
  { patterns:["price","cost","pricing","how much","fee","quote","budget"], responses:["Our pricing is tailored to each client's needs — there's no one-size-fits-all.\n\n• **ERP Packages** — Request a custom quote based on modules & users\n• **Development Projects** — Scoped after a free discovery call\n• **Managed Services** — Monthly retainer based on requirements\n\nNo hidden fees, ever. Want to request a quote?"] },
  { patterns:["contact","reach","call","email","phone","talk","get in touch"], responses:["You can reach us at:\n\n📧 **Email:** info@possibletechplc.com\n📞 **Phone:** +251 94 656 5344\n📍 **Office:** Yobek Commercial Center, Sengatera, Addis Ababa\n🕐 **Hours:** Mon–Fri, 9am–6pm\n\nOr use the Contact form on this page!"] },
  { patterns:["location","address","where","office","addis","sengatera"], responses:["We're at **Yobek Commercial Center, Sengatera, Addis Ababa, Ethiopia** 📍\n\nOpen Monday–Friday, 9am–6pm. Call +251 94 656 5344 to schedule a visit."] },
  { patterns:["about","who are you","possible technology","company","history","founded"], responses:["**Possible Technology** is an Addis Ababa-based IT company founded in 2009. We believe technology should work *for* you.\n\nOur 20+ engineer team delivers:\n• Custom software & ERP systems\n• Cloud, security & infrastructure\n• IT consulting & managed services\n\n100% built in Ethiopia, serving businesses across Africa. How can we help?"] },
  { patterns:["thank","thanks","appreciate","great","awesome","perfect","helpful"], responses:["You're welcome! 😊 Anything else I can help with?","Happy to help! Feel free to ask anytime or reach us at info@possibletechplc.com."] },
  { patterns:["bye","goodbye","see you","done","that's all"], responses:["Thanks for chatting! Have a great day! 👋","Goodbye! We're always here if you need us."] },
];

const SUGGESTIONS = ["Tell me about ERP packages","What services do you offer?","How do I contact you?","Cloud services info","Cyber security help"];

function getResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.patterns.some((p) => lower.includes(p))) {
      return entry.responses[Math.floor(Math.random() * entry.responses.length)];
    }
  }
  return "Great question! Our team would be best placed to give you a detailed answer.\n\n📧 **Email:** info@possibletechplc.com\n📞 **Phone:** +251 94 656 5344\n\nOr fill the Contact form on this page. Would you like to know about our services or ERP packages?";
}

function renderText(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2,-2)}</strong>
      : part
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`ai-bubble-row${isUser ? " ai-bubble-row--user" : " ai-bubble-row--bot"}`}>
      {!isUser && <div className="ai-avatar ai-avatar--bot"><Svg d={ICONS.sparkles} size={13} strokeWidth={1.8} /></div>}
      <div className={`ai-bubble${isUser ? " ai-bubble--user" : " ai-bubble--bot"}`}>
        {msg.text.split("\n").map((line, i, arr) => (
          <span key={i}>{renderText(line)}{i < arr.length - 1 && <br />}</span>
        ))}
      </div>
      {isUser && <div className="ai-avatar ai-avatar--user"><Svg d={ICONS.user} size={13} strokeWidth={1.8} /></div>}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="ai-bubble-row ai-bubble-row--bot">
      <div className="ai-avatar ai-avatar--bot"><Svg d={ICONS.sparkles} size={13} strokeWidth={1.8} /></div>
      <div className="ai-bubble ai-bubble--bot ai-bubble--typing">
        <span className="ai-typing-dot" /><span className="ai-typing-dot" /><span className="ai-typing-dot" />
      </div>
    </div>
  );
}

export default function AIAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ id:1, role:"bot", text:"Hi! I'm Possible Tech's AI assistant. I can help you explore our services, ERP packages, pricing, and more. What would you like to know?" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => endRef.current?.scrollIntoView({ behavior:"smooth" }), 80);
      setTimeout(() => inputRef.current?.focus(), 200);
      setHasNew(false);
    }
  }, [open, messages]);

  const sendMessage = useCallback(async (text) => {
    const t = text.trim();
    if (!t || typing) return;
    setInput("");
    
    // Add user message
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, role: "user", text: t }]);
    setTyping(true);

    try {
      // Map prior messages to backend history expectations
      const history = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.text
      }));

      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: t,
          history: history
        })
      });

      if (!response.ok) {
        throw new Error("Server responded with error status");
      }

      const data = await response.json();
      const reply = data.reply;

      setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: reply }]);
    } catch (err) {
      console.warn("AI Agent backend error, falling back to offline KB:", err);
      // Premium offline fallback to ensure the UI is 100% resilient
      const localReply = getResponse(t);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: localReply }]);
    } finally {
      setTyping(false);
      if (!open) setHasNew(true);
    }
  }, [typing, open, messages]);

  return (
    <>
      <div className={`ai-panel${open ? " ai-panel--open" : ""}`} role="dialog" aria-label="AI Assistant">
        <div className="ai-panel-header">
          <div className="ai-panel-header-left">
            <div className="ai-panel-avatar"><Svg d={ICONS.sparkles} size={15} strokeWidth={2} /></div>
            <div>
              <div className="ai-panel-title">Possible AI</div>
              <div className="ai-panel-subtitle"><span className="ai-status-dot" />Online · replies instantly</div>
            </div>
          </div>
          <button type="button" className="ai-close-btn" onClick={() => setOpen(false)} aria-label="Close">
            <Svg d={ICONS.x} size={16} strokeWidth={2} />
          </button>
        </div>
        <div className="ai-messages">
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
          {typing && <TypingIndicator />}
          <div ref={endRef} />
        </div>
        {messages.length <= 1 && !typing && (
          <div className="ai-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} type="button" className="ai-suggestion-chip" onClick={() => sendMessage(s)}>{s}</button>
            ))}
          </div>
        )}
        <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="ai-input-row">
          <input ref={inputRef} id="ai-chat-input" className="ai-input" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }}}
            placeholder="Ask me anything…" autoComplete="off" disabled={typing} />
          <button type="submit" className="ai-send-btn" disabled={!input.trim() || typing} aria-label="Send">
            <Svg d={ICONS.send} size={16} strokeWidth={2} />
          </button>
        </form>
      </div>

      <button id="ai-agent-trigger" type="button"
        className={`ai-fab${open ? " ai-fab--active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}>
        {open
          ? <Svg d={ICONS.chevronDown} size={22} strokeWidth={2.2} />
          : <><Svg d={ICONS.sparkles} size={20} strokeWidth={1.8} />{hasNew && <span className="ai-fab-badge" />}</>}
        {!open && <span className="ai-fab-label">Ask AI</span>}
      </button>
    </>
  );
}
