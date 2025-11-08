// script.js — JFLS-20 multilingual + Google Sheets submission
// Save as UTF-8 and include alongside index.html
// IMPORTANT: replace GOOGLE_SCRIPT_URL with your deployed Apps Script web app URL

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // <-- replace me

// Domains: [ English, Gujarati, Hindi ]
const domains = {
  "Mastication": [
    ["Chewing tough food (e.g., meat)", "કઠિન ખોરાક (જેમ કે મટન) ચવામાં કેટલી મુશ્કેલી થાય છે?", "कठोर भोजन (जैसे मांस) चबाने में कितनी कठिनाई होती है?"],
    ["Chewing hard items (like raw vegetables)", "કાચા શાકભાજી જેવા કઠિન વસ્તુઓ ચવામાં કેટલી મુશ્કેલી થાય છે?", "कच्ची सब्ज़ियाँ जैसी कठोर चीज़ें चबाने में कितनी कठिनाई होती है?"],
    ["Chewing chicken or cooked meat", "સામાન્ય રીતે બનાવેલું ચિકન કે મટન ચવામાં કેટલી મુશ્કેલી છે?", "पका हुआ चिकन या मांस चबाने में कितनी कठिनाई होती है?"],
    ["Chewing crispy foods (crackers/toast)", "ક્રિસ્પી વસ્તુઓ (જેમ કે ખાખરા કે ટોસ્ટ) ચવામાં કેટલી મુશ્કેલી છે?", "करारी/टोस्ट जैसी कुरकुरी चीज़ें चबाने में कितनी कठिनाई होती है?"],
    ["Chewing soft food (like rice or dal)", "નરમ ખોરાક (જેમ કે રાંધેલું ભાત કે દાળ) ચવામાં કેટલી મુશ્કેલી થાય છે?", "चावल या दाल जैसी नरम चीज़ें चबाने में कितनी कठिनाई होती है?"],
    ["Eating mashed or pureed food", "મસેલેલું અથવા પ્યુરી કરેલું ખોરાક ખાવામાં કેટલી મુશ્કેલી છે?", "मसला हुआ या प्यूरी किया हुआ भोजन खाने में कितनी कठिनाई होती है?"],
    ["Opening mouth wide enough to bite", "કંઈક કાટવા માટે મોઢું પૂરતું ખોલવામાં કેટલી મુશ્કેલી થાય છે?", "काटने/कौर लेने के लिए मुंह पर्याप्त चौड़ा खोलने में कितनी कठिनाई होती है?"],
    ["Eating sandwich or burger", "સેન્ડવિચ કે બર્ગર ખાવામાં કેટલી મુશ્કેલી છે?", "सैंडविच या बर्गर खाने में कितनी कठिनाई होती है?"],
    ["Biting an apple or similar fruit", "સફરજન જેવા ફળ કાટવા/ચાવી રાખવા માં કેટલી મુશ્કેલી થાય છે?", "सेब जैसे फल काटने/काटकर खाने में कितनी कठिनाई होती है?"],
    ["Eating dry food like toast or khakhra", "સૂકા ખોરાક (ટોસ્ટ કે ખાખરા) ખાવામાં કેટલી મુશ્કેલી છે?", "टॉस्ट या खाखरा जैसे सूखा भोजन खाने में कितनी कठिनाई होती है?"]
  ],
  "Jaw Mobility": [
    ["Opening mouth wide", "મોઢું પહોળું ખોલવામાં કેટલી મુશ્કેલી થાય છે?", "मुँह को पूरी तरह खोलने में कितनी कठिनाई होती है?"],
    ["Yawning", "બગાસું લેતા દુખાવો થાય છે કે અવરોધ થાય છે?", "बगासु (जम्हाई) लेते समय दर्द या रुकावट होती है क्या?"],
    ["Smiling", "પૂરતું હસવામાં કેટલી મુશ્કેલી થાય છે?", "मुस्कुराने में कितनी कठिनाई होती है?"],
    ["Pain while using a straw to sip beverages", "સ્ટ્રોનો ઉપયોગ કરીને પીણાં પીતી વખતે દુખાવો થાય છે?", "स्ट्रॉ से पेय पीते समय दर्द होता है?"],
    ["Speaking loudly", "મોટેથી બોલવામાં કેટલી મુશ્કેલી થાય છે?", "ज़ोर से बोलने में कितनी कठिनाई होती है?"]
  ],
  "Verbal/Emotional Expression": [
    ["Talking for a long time", "લાંબા સમય સુધી વાત કરવી મુશ્કેલ લાગે છે?", "लंबे समय तक बात करने में कितनी कठिनाई होती है?"],
    ["Laughing", "હસવાથી ચહેરામાં દુખાવો થાય છે?", "हँसने/हँसते समय दर्द होता है क्या?"],
    ["Singing or raising voice", "ગીત ગાવા કે મોટેથી બોલવામાં કેટલી મુશ્કેલી થાય છે?", "गाना गाने या आवाज़ ऊँची करने में कितनी कठिनाई होती है?"],
    ["Expressing emotions like anger or joy", "ગુસ્સો કે આનંદ જેવી ભાવનાઓ દર્શાવવા માં કેટલી મુશ્કેલી થાય છે?", "गुस्सा या खुशी जैसी भावनाएँ व्यक्त करने (चेहरे पर) में कितनी कठिनाई होती है?"],
    ["Facial movement while talking", "વાત કરતી વખતે ચહેરાના હલનચલનમાં કેટલી મુશ્કેલી હોય છે?", "बात करते समय चेहरे की हरकतों में कितनी कठिनाई होती है?"]
  ]
};

// State
const formContainer = document.getElementById("formContainer");
let questionIndex = 0;
let currentLanguage = 'en';

// Render language switcher
function renderLanguageSwitcher() {
  const switcher = document.getElementById('languageSwitch');
  switcher.innerHTML = `
    <button class="lang-btn active" data-lang="en">English</button>
    <button class="lang-btn" data-lang="gu">ગુજરાતી</button>
    <button class="lang-btn" data-lang="hi">हिन्दी</button>
  `;
  switcher.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switcher.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLanguage = btn.getAttribute('data-lang') || 'en';
      refreshQuestions();
    });
  });
}

// Helper to pick label by current language
function pickLabel(qArr) {
  const map = { en: 0, gu: 1, hi: 2 };
  const idx = map[currentLanguage] ?? 0;
  return qArr[idx] || qArr[0] || '';
}

// Render questions
function refreshQuestions() {
  if (!formContainer) return;
  formContainer.innerHTML = '';
  questionIndex = 0;

  for (const [domain, questions] of Object.entries(domains)) {
    const domainDiv = document.createElement('div');
    domainDiv.style.marginBottom = '18px';
    domainDiv.innerHTML = `<h2 style="margin-bottom:8px; font-weight:700; color:#1f2937">${domain}</h2>`;

    questions.forEach(qArr => {
      const qDiv = document.createElement('div');
      qDiv.style.marginBottom = '10px';

      const primary = pickLabel(qArr);
      // secondary language shown beneath (if available)
      const secondaryIdx = currentLanguage === 'en' ? 1 : (currentLanguage === 'gu' ? 0 : 1);
      const secondary = qArr[secondaryIdx] || '';

      qDiv.innerHTML = `<label style="font-weight:600">${primary}</label>${secondary ? `<div style="color:#6b7280; font-size:0.95rem; margin-top:4px">${secondary}</div>` : ''}`;

      // slider
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.name = `q${questionIndex}`;
      slider.min = 0;
      slider.max = 10;
      slider.value = 0;
      slider.step = 1;
      slider.style.width = '70%';
      slider.style.marginTop = '6px';
      slider.style.verticalAlign = 'middle';

      const valSpan = document.createElement('span');
      valSpan.textContent = '0';
      valSpan.style.marginLeft = '10px';
      valSpan.style.fontWeight = '700';

      slider.addEventListener('input', () => {
        valSpan.textContent = slider.value;
      });

      qDiv.appendChild(slider);
      qDiv.appendChild(valSpan);

      domainDiv.appendChild(qDiv);
      questionIndex++;
    });

    formContainer.appendChild(domainDiv);
  }

  // reset results box
  const resultsEl = document.getElementById("results");
  if (resultsEl) resultsEl.innerHTML = '<em>Total score will appear here after calculation.</em>';
}

// Wire evalTime radio "Other" visibility
function wireEvalTime() {
  document.querySelectorAll('input[name="evalTime"]').forEach(r => {
    r.addEventListener('change', (e) => {
      const other = document.getElementById('otherEvalTime');
      if (!other) return;
      if (e.target.value === 'Other') {
        other.classList.remove('hidden');
      } else {
        other.classList.add('hidden');
        other.value = '';
      }
    });
  });
}

// Collect responses as object { q0: value, ... }
function collectResponses() {
  const form = document.forms["jflsForm"];
  const responses = {};
  for (let i = 0; i < questionIndex; i++) {
    const el = form.elements[`q${i}`];
    responses[`q${i}`] = el ? parseInt(el.value || '0', 10) : 0;
  }
  return responses;
}

// Calculate score, show it, and POST to Google Script
async function calculateAndSave() {
  const form = document.forms["jflsForm"];
  if (!form) {
    showCustomMessageBox('Form not found.');
    return;
  }

  const responses = collectResponses();
  const totalScore = Object.values(responses).reduce((s, x) => s + (parseInt(x,10)||0), 0);
  const maxScore = questionIndex * 10;

  const resultsEl = document.getElementById("results");
  if (resultsEl) {
    resultsEl.innerHTML = `<strong>Total JFLS-20 Score:</strong> <div style="font-size:22px; font-weight:800">${totalScore}</div> / ${maxScore}`;
    resultsEl.scrollIntoView({ behavior: 'smooth' });
  }

  // Prepare payload
  const payload = {
    patientName: form.elements['patientName'] ? form.elements['patientName'].value : '',
    age: form.elements['age'] ? form.elements['age'].value : '',
    gender: form.elements['gender'] ? form.elements['gender'].value : '',
    examDate: form.elements['examDate'] ? form.elements['examDate'].value : '',
    evaluationTime: (() => {
      const radios = document.querySelectorAll('input[name="evalTime"]');
      let v = '';
      radios.forEach(r => { if (r.checked) v = r.value; });
      if (v === 'Other') v = form.elements['otherEvalTime'] ? form.elements['otherEvalTime'].value : 'Other';
      return v || 'Not specified';
    })(),
    languageShown: currentLanguage,
    totalScore,
    maxScore,
    responses,
    timestamp: new Date().toISOString()
  };

  // Send to Google Apps Script
  try {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('https://script.google.com/macros/s/AKfycbwMVkxx4yRpSCDYQDF-LzW2NL3l5vu716oH8_T8zhIdGYLojdi0FHZnYPTeF8oteaFLRw/exec')) {
      showCustomMessageBox('Google Script URL not configured in script.js. Please paste your Apps Script web app URL into GOOGLE_SCRIPT_URL variable.');
      return;
    }

    const resp = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (data && data.status === 'success') {
      showCustomMessageBox('Saved to Google Sheet ✅ (row ' + (data.row || '?') + ')');
    } else {
      showCustomMessageBox('Save to Google Sheet failed: ' + (data && data.message ? data.message : 'unknown error'));
    }
  } catch (err) {
    console.error('Save error', err);
    showCustomMessageBox('Error saving to Google Sheet: ' + err.message);
  }
}

// PDF download (keeps compact)
function downloadPdf() {
  if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
    showCustomMessageBox('PDF library (jsPDF) not loaded.');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p','mm','a4');
  const form = document.forms["jflsForm"];
  const patient = form.elements['patientName'] ? form.elements['patientName'].value : 'N/A';
  let y = 16;
  doc.setFontSize(16);
  doc.text('JFLS-20 Assessment', doc.internal.pageSize.getWidth()/2, y, null, null, 'center');
  y += 8;
  doc.setFontSize(9);
  doc.text(`Patient: ${patient}`, 14, y);
  const dateVal = form.elements['examDate'] ? form.elements['examDate'].value : '';
  doc.text(`Date: ${dateVal || 'N/A'}`, 110, y);
  y += 8;
  // Questions short list (English)
  let qNo = 1;
  for (const [domain, questions] of Object.entries(domains)) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(domain, 14, y);
    y += 6;
    doc.setFont('helvetica','normal');
    doc.setFontSize(9);
    for (const qArr of questions) {
      const qText = `${qNo}. ${qArr[0]}`;
      const el = form.elements[`q${qNo-1}`];
      const ans = el ? el.value : '0';
      const split = doc.splitTextToSize(qText, doc.internal.pageSize.getWidth() - 80);
      doc.text(split, 16, y);
      doc.setFont('helvetica','bold');
      doc.text(String(ans), doc.internal.pageSize.getWidth() - 30, y, null, null, 'right');
      doc.setFont('helvetica','normal');
      y += (split.length * 5) + 2;
      qNo++;
      if (y > doc.internal.pageSize.getHeight() - 30) {
        doc.addPage();
        y = 16;
      }
    }
    y += 4;
  }

  const resultsEl = document.getElementById('results');
  if (resultsEl && resultsEl.innerText.trim()) {
    doc.setFontSize(11);
    doc.setFont('helvetica','bold');
    doc.text(resultsEl.innerText.replace(/\n/g,' '), doc.internal.pageSize.getWidth()/2, doc.internal.pageSize.getHeight()-20, null, null, 'center');
  }

  doc.save(`JFLS20_${(patient || 'patient').replace(/[^a-z0-9_\-]/gi,'_')}.pdf`);
}

// Nice message box
function showCustomMessageBox(msg) {
  const existing = document.querySelector('.message-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'message-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:9999;';
  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;padding:18px;border-radius:10px;max-width:90%;width:420px;text-align:center;';
  const p = document.createElement('p'); p.textContent = msg; p.style.marginBottom='14px';
  const btn = document.createElement('button'); btn.textContent = 'OK'; btn.style.cssText='padding:8px 14px;border-radius:8px;background:#1d4ed8;color:#fff;border:none;';
  btn.addEventListener('click', ()=> overlay.remove());
  box.appendChild(p); box.appendChild(btn); overlay.appendChild(box); document.body.appendChild(overlay);
}

// Reset form handler
function resetForm() {
  document.getElementById('jflsForm').reset();
  refreshQuestions();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderLanguageSwitcher();
  refreshQuestions();
  wireEvalTime();
  const calcBtn = document.getElementById('calculateBtn');
  if (calcBtn) calcBtn.addEventListener('click', calculateAndSave);
  const pdfBtn = document.getElementById('downloadPdfButton');
  if (pdfBtn) pdfBtn.addEventListener('click', downloadPdf);
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) resetBtn.addEventListener('click', resetForm);
});
