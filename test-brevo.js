const API_KEY = "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"; // tijdelijk voor test

fetch("https://api.brevo.com/v3/contacts", {
  method: "POST",
  headers: {
    "api-key": API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "test@digidactics.nl",
    firstName: "Test",
    listIds: [3], // jouw list ID
    updateEnabled: true
  })
})
.then(r => r.json())
.then(data => console.log("✅ Resultaat:", JSON.stringify(data, null, 2)))
.catch(err => console.error("❌ Error:", err));