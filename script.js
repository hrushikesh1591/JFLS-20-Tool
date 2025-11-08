// script.js
// JFLS-20 dynamic form renderer with English, Gujarati and Hindi labels
// Save as UTF-8 and include alongside your index.html

// Domains: [ English, Gujarati, Hindi ]
const domains = {
  "Mastication": [
    ["Chewing tough food (e.g., meat)", "કઠિન ખોરાક (જેમ કે મટન) ચાવવામાં કેટલી મુશ્કેલી થાય છે?", "कठोर भोजन (जैसे मांस) चबाने में कितनी कठिनााई होती है?"],
    ["Chewing hard items (like raw vegetables)", "કાચા શાકભાજી જેવા કઠિન વસ્તુઓ ચાવવામાં કેટલી મુશ્કેલી થાય છે?", "कच्ची सब्ज़ियाँ जैसी कठोर चीज़ें चबाने में कितनी कठिनाई होती है?"],
    ["Chewing chicken or cooked meat", "સામાન્ય રીતે બનાવેલું ચિકન કે મટન ચાવવામાં કેટલી મુશ્કેલી છે?", "पका हुआ चिकन या मांस चबाने में कितनी कठिनाई होती है?"],
    ["Chewing crispy foods (crackers/toast)", "ક્રિસ્પી વસ્તુઓ (જેમ કે ખાખરા કે ટોસ્ટ) ચાવવામાં કેટલી મુશ્કેલી છે?", "करारी/टोस्ट जैसी कुरकुरी चीज़ें चबाने में कितनी कठिनाई होती है?"],
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
    ["Expressing emotions like anger or joy", "ગુસ્સો કે આનંદ જેવી ભાવનાઓ દર્શાવવામાં કેટલી મુશ્કેલી થાય છે?", "गुस्सा या खुशी जैसी भावनाएँ व्यक्त करने (चेहरे पर) में कितनी कठिनाई होती है?"],
    ["Facial movement while talking", "વાત કરતી વખતે ચહેરાના હલનચલનમાં કેટલી મુશ્કેલી હોય છે?", "बात करते समय चेहरे की हरकतों में कितनी कठिनाई होती है?"]
  ]
};

// DOM references and state
const formContainer = document.getElementById("formContainer");
let questionIndex = 0;

// Initialize language from local storage, default to 'en'
let currentLanguage = localStorage.getItem('jflsLang') || 'en'; 

// Render language switcher if not present
function ensureLanguageSwitcher() {
  let switcher = document.querySelector('.language-switcher');
  if (!switcher) {
    switcher = document.createElement('div');
    switcher.className = 'language-switcher mb-4';
    if (formContainer && formContainer.parentNode) {
      formContainer.parentNode.insertBefore(switcher, formContainer);
    } else {
      document.body.insertBefore(switcher, document.body.firstChild);
    }
  }
  // create buttons
  switcher.innerHTML = `
    <div style="display:flex; gap:8px; margin-bottom:8px;">
      <button class="lang-btn" data-lang="en" style="padding:6px 10px; border-radius:6px; background:#1d4ed8; color:#fff; border:none;">English</button>
      <button class="lang-btn" data-lang="gu" style="padding:6px 10px; border-radius:6px; background:#e5e7eb; color:#111; border:none;">ગુજરાતી</button>
      <button class="lang-btn" data-lang="hi" style="padding:6px 10px; border-radius:6px; background:#e5e7eb; color:#111; border:none;">हिन्दी</button>
    </div>
  `;
  // attach listeners
  switcher.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = btn.getAttribute('data-lang') || 'en';
      setLanguage(lang);
    });
  });
  updateLangButtonStyles();
}

function updateLangButtonStyles() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLanguage) {
      btn.style.background = '#1d4ed8';
      btn.style.color = '#fff';
    } else {
      btn.style.background = '#e5e7eb';
      btn.style.color = '#111';
    }
  });
}

function setLanguage(lang) {
  currentLanguage = lang || 'en';
  localStorage.setItem('jflsLang', currentLanguage); // Save new language to local storage
  updateLangButtonStyles();
  refreshQuestions();
}

// Helper to pick label by current language (fallback to English)
function pickLabel(qArr) {
  // qArr is [en, gu, hi] or [en, gu]
  if (!Array.isArray(qArr)) return '';
  const langIndex = { en: 0, gu: 1, hi: 2 }[currentLanguage] ?? 0;
  return qArr[langIndex] || qArr[0] || '';
}

// Build the form UI (Now only shows one language)
function refreshQuestions() {
  if (!formContainer) {
    console.warn('formContainer element not found. Ensure an element with id="formContainer" exists in the DOM.');
    return;
  }
  formContainer.innerHTML = ''; // clear
  questionIndex = 0;

  for (const [domain, questions] of Object.entries(domains)) {
    const domainDiv = document.createElement("div");
    domainDiv.className = 'domain-block mb-6';
    domainDiv.innerHTML = `<h2 class="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">${domain}</h2>`;

    questions.forEach(qArr => {
      const qDiv = document.createElement("div");
      qDiv.className = "question py-3";

      const primary = pickLabel(qArr);
      
      qDiv.innerHTML = `<label class='question-label block text-md font-medium text-gray-800'>${primary}</label>`;

      const sliderContainer = document.createElement('div');
      sliderContainer.className = 'slider-container flex items-center gap-4 mt-2';

      const slider = document.createElement('input');
      slider.type = 'range';
      slider.name = `q${questionIndex}`;
      slider.min = '0';
      slider.max = '10';
      slider.value = '0';
      slider.step = '1';
      slider.className = 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer';

      const sliderValueDisplay = document.createElement('span');
      sliderValueDisplay.className = 'slider-value bg-blue-100 text-blue-800 font-semibold text-sm px-3 py-1 rounded-full w-12 text-center';
      sliderValueDisplay.textContent = slider.value;

      slider.addEventListener('input', () => {
        sliderValueDisplay.textContent = slider.value;
      });

      sliderContainer.appendChild(slider);
      sliderContainer.appendChild(sliderValueDisplay);
      qDiv.appendChild(sliderContainer);
      domainDiv.appendChild(qDiv);

      questionIndex++;
    });

    formContainer.appendChild(domainDiv);
  }

  // If results box exists, clear it
  const resultsEl = document.getElementById("results");
  if (resultsEl) resultsEl.innerHTML = '<em>Total score will appear here after calculation.</em>';
}

// Wire "Other" evalTime radios (if present in DOM)
function wireEvalTimeRadios() {
  document.querySelectorAll('input[name="evalTime"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
      const otherContainer = document.getElementById('otherEvalTimeContainer');
      if (!otherContainer) return;
      if (event.target.value === 'Other') {
        otherContainer.classList.remove('hidden');
      } else {
        otherContainer.classList.add('hidden');
        const otherField = document.getElementById('otherEvalTime');
        if (otherField) otherField.value = '';
      }
    });
  });
}

/**
 * Calculates the total score for all questions and shows it in #results.
 */
function calculateScores() {
  const form = document.forms["jflsForm"];
  if (!form) {
    showCustomMessageBox('Form not found. Ensure the form has name="jflsForm".');
    return;
  }

  const values = [];
  for (let i = 0; i < questionIndex; i++) {
    const el = form.elements[`q${i}`];
    if (!el) {
      console.error(`Slider not found: q${i}`);
      showCustomMessageBox('An internal error occurred while reading responses. Please refresh the page and try again.');
      return;
    }
    const v = parseInt(el.value, 10);
    values.push(isNaN(v) ? 0 : v);
  }

  const totalScore = values.reduce((s, x) => s + x, 0);
  const maxScore = questionIndex * 10;

  const resultsEl = document.getElementById("results");
  if (resultsEl) {
    resultsEl.innerHTML = `
      <strong class="block text-blue-700">Total JFLS-20 Score:</strong>
      <span class="text-4xl font-bold">${totalScore}</span> / ${maxScore}
    `;
    resultsEl.scrollIntoView({ behavior: 'smooth' });
  } else {
    // fallback: show alert
    showCustomMessageBox(`Total Score: ${totalScore} / ${maxScore}`);
  }
}

/**
 * Collects all form data and sends it to a Formspree endpoint using fetch.
 */
function submitData() {
  // ✅ FIX 1: Formspree URL has been added
  const endpoint = 'https://formspree.io/f/xyzlgebp'; 
  const form = document.forms["jflsForm"];
  
  if (!form) {
    showCustomMessageBox('Data submission failed: Form element not found.');
    return;
  }

  // 1. Collect Patient Info + Scores
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });

  // 2. Calculate Total Score (Good to save it)
  let totalScore = 0;
  for (let i = 0; i < questionIndex; i++) {
      const el = form.elements[`q${i}`];
      totalScore += parseInt(el.value, 10) || 0;
  }
  data['totalJFLS20Score'] = totalScore;
  
  // 3. Send the data to Formspree
  fetch(endpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (response.ok) {
          showCustomMessageBox('Data saved successfully! Check your Formspree dashboard.');
          // You can uncomment this line if you want to clear the form after submission:
          // form.reset(); 
      } else {
          response.json().then(errorData => {
            console.error("Submission error:", errorData);
            showCustomMessageBox('Submission failed. Server responded with an error. Please check the console (F12) for details.');
          });
      }
  })
  .catch(error => {
      console.error('Network Error:', error);
      showCustomMessageBox('A network error occurred. Check your internet connection.');
  });
}

/**
 * Generate and download PDF (uses jsPDF). Keeps content compact to try to fit a single page.
 */
function downloadPdf() {
  if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
    showCustomMessageBox("PDF generation library not loaded. Please ensure html includes jsPDF.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const form = document.forms["jflsForm"];
  if (!form) {
    showCustomMessageBox('Form not found. Ensure the form has name="jflsForm".');
    return;
  }

  // Patient info fields (best-effort)
  const patientName = (form.elements['patientName'] && form.elements['patientName'].value) || 'N/A';
  const age = (form.elements['age'] && form.elements['age'].value) || 'N/A';
  const gender = (form.elements['gender'] && form.elements['gender'].value) || 'N/A';
  let examDate = (form.elements['examDate'] && form.elements['examDate'].value) || '';
  if (examDate) {
    const d = new Date(examDate);
    if (!isNaN(d)) {
      examDate = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
    }
  } else {
    examDate = 'N/A';
  }
  let evalTime = (form.elements['evalTime'] && form.elements['evalTime'].value) || 'N/A';
  if (evalTime === 'Other' && form.elements['otherEvalTime']) {
    evalTime = form.elements['otherEvalTime'].value || 'Other (not specified)';
  }

  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text("JFLS-20 Assessment Report", doc.internal.pageSize.getWidth() / 2, 14, null, null, 'center');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  let y = 22;
  doc.text(`Patient: ${patientName}`, 14, y);
  doc.text(`Date: ${examDate}`, 110, y);
  y += 6;
  doc.text(`Age: ${age}`, 14, y);
  doc.text(`Gender: ${gender}`, 110, y);
  y += 6;
  doc.text(`Evaluation time: ${evalTime}`, 14, y);

  y += 6;
  doc.setLineWidth(0.3);
  doc.line(14, y, doc.internal.pageSize.getWidth() - 14, y);
  y += 6;

  // Questions and scores
  let qNum = 1;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const rightColX = pageWidth - 30;

  for (const [domain, questions] of Object.entries(domains)) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(domain, 14, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    for (const qArr of questions) {
      const qText = `${qNum}. ${qArr[0]}`; // use english short for PDF list; you may customize
      const el = form.elements[`q${qNum - 1}`];
      const ans = el ? (el.value || '0') : 'N/A';

      // Wrap question text if long
      const split = doc.splitTextToSize(qText, pageWidth - 70);
      doc.text(split, 16, y);
      // Score on right
      doc.setFont('helvetica', 'bold');
      doc.text(`${ans}`, rightColX, y, null, null, 'right');
      doc.setFont('helvetica', 'normal');

      y += (split.length * 5) + 2;
      qNum++;

      // New page if near bottom
      if (y > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }
    }
    y += 4;
  }

  // Total score
  const resultsEl = document.getElementById("results");
  if (resultsEl && resultsEl.innerText.trim()) {
    const totalText = resultsEl.innerText.replace(/\n/g, ' ');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    const finalY = Math.min(pageHeight - 20, Math.max(y + 6, pageHeight - 30));
    doc.text(totalText, pageWidth / 2, finalY, null, null, 'center');
  }

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text("Developed by Dr. Hrushikesh Gosai (OMFS)", pageWidth / 2, pageHeight - 10, null, null, 'center');

  const safeName = (patientName || 'patient').replace(/[^a-z0-9_\-]/gi, '_');
  doc.save(`JFLS20_Report_${safeName}.pdf`);
}

/**
 * Custom message box (nicer than alert)
 */
function showCustomMessageBox(message) {
  // Remove existing overlays
  const existing = document.querySelector('.message-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'message-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:9999;';

  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;padding:20px;border-radius:8px;max-width:90%;width:420px;box-shadow:0 8px 30px rgba(0,0,0,0.2);font-family:Inter, sans-serif;color:#111;';

  const p = document.createElement('p');
  p.textContent = message;
  p.style.cssText = 'margin-bottom:18px;font-size:1rem;line-height:1.4;';

  const btn = document.createElement('button');
  btn.textContent = 'OK';
  btn.style.cssText = 'padding:10px 18px;background:#1d4ed8;color:#fff;border:none;border-radius:6px;cursor:pointer;';
  btn.addEventListener('click', () => overlay.remove());

  box.appendChild(p);
  box.appendChild(btn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// Initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ensureLanguageSwitcher();
  refreshQuestions();
  wireEvalTimeRadios();

  // Wire action buttons using their IDs
  const calcBtn = document.getElementById('calculateBtn');
  if (calcBtn) calcBtn.addEventListener('click', calculateScores);
  
  const saveBtn = document.getElementById('saveDataBtn');
  if (saveBtn) saveBtn.addEventListener('click', submitData); 
  
  const downloadBtn = document.getElementById('downloadPdfButton');
  if (downloadBtn) downloadBtn.addEventListener('click', downloadPdf);
});
