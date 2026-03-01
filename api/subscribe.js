/**
 * Vercel Serverless Function: /api/subscribe.js
 *
 * Ontvangt lead-data van de AISA funnel en:
 *  1. Voegt het contact toe aan Brevo (lijst #3 = AISA Funnel Leads)
 *  2. Stuurt een transactionele welkomstmail via Brevo template
 *
 * Stel deze environment variables in via Vercel Dashboard
 * → Settings → Environment Variables:
 *
 *   BREVO_API_KEY     = 
 *   BREVO_LIST_ID     = 3
 *   BREVO_TEMPLATE_ID = 0   (jouw template ID uit Brevo)
 */

export default async function handler(req, res) {

  // Alleen POST accepteren
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, org, phone, extra, niveau, programma, team } = req.body;

  // Validatie
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Ongeldig e-mailadres" });
  }

 const API_KEY     = process.env.BREVO_API_KEY;
  const LIST_ID     = parseInt(process.env.BREVO_LIST_ID || "3");
  const TEMPLATE_ID = parseInt(process.env.BREVO_TEMPLATE_ID || "0");

  const headers = {
    "accept":       "application/json",
    "content-type": "application/json",
    "api-key":      API_KEY,
  };

  try {

    // ── STAP 1: Contact aanmaken / updaten in Brevo ──────────────────
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [LIST_ID],
        attributes: {
          FIRSTNAME:    name.split(" ")[0] || name,
          LASTNAME:     name.split(" ").slice(1).join(" ") || "",
          COMPANY:      org    || "",
          SMS:          phone  || "",
          AISA_NIVEAU:  niveau    || "",
          AISA_PRIMAIR: programma || "",
          AISA_TEAM:    team      || "",
          AISA_NOTITIE: extra     || "",
        },
      }),
    });

    if (!contactRes.ok && contactRes.status !== 204) {
      const err = await contactRes.json();
      console.error("Brevo contact fout:", err);
    }

    // ── STAP 2: Welkomstmail sturen via template ──────────────────────
    if (TEMPLATE_ID > 0) {
      const mailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers,
        body: JSON.stringify({
          templateId: TEMPLATE_ID,
          to: [{ email, name }],
          params: {
            NAAM:    name,
            NIVEAU:  niveau    || "–",
            PRIMAIR: programma || "–",
            TEAM:    team      || "–",
            NOTITIE: extra     || "",
          },
          replyTo: {
            email: "rink@digidactics.nl",
            name:  "Rink – Digidactics",
          },
        }),
      });

      if (!mailRes.ok) {
        const err = await mailRes.json();
        console.error("Brevo mail fout:", err);
      }
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("Subscribe fout:", error);
    return res.status(500).json({ error: "Server fout" });
  }
}
