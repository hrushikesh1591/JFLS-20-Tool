// Define the domains and their respective questions in English, Hindi, and Gujarati
const domains = {
    "Mastication": [
        { en: "Chewing tough food", hi: "सख्त भोजन चबाना", gu: "કઠિન ખોરાક (જેમ કે મટન) ચવામાં કેટલી મુશ્કેલી થાય છે?" },
        { en: "Chewing hard items (like raw vegetables)", hi: "कठोर चीजें चबाना (जैसे कच्ची सब्जियां)", gu: "કાચા શાકભાજી જેવા કઠિન વસ્તુઓ ચવામાં કેટલી મુશ્કેલી થાય છે?" },
        { en: "Chewing chicken or cooked meat", hi: "चिकन या पका हुआ मांस चबाना", gu: "સામાન્ય રીતે બનાવેલું ચિકન કે મટન ચવામાં કેટલી મુશ્કેલી છે?" },
        { en: "Chewing crispy foods (crackers/toast)", hi: "कुरकुरे खाद्य पदार्थ चबाना (क्रैकर्स/टोस्ट)", gu: "ક્રિસ્પી વસ્તુઓ (જેમ કે ખાખરા કે ટોસ્ટ) ચવામાં કેટલી મુશ્કેલી છે?" },
        { en: "Chewing soft food (like rice or dal)", hi: "नरम भोजन चबाना (जैसे चावल या दाल)", gu: "નરમ ખોરાક (જેમ કે રાંધેલું ભાત કે દાળ) ચવામાં કેટલી મુશ્કેલી છે?" },
        { en: "Eating mashed or pureed food", hi: "मैश किया हुआ या प्यूरी भोजन खाना", gu: "ખીર-મસhed જેવી ચાવવાની જરૂર ન હોય તેવા ખોરાકમાં કેટલી મુશ્કેલી છે?" },
        { en: "Opening mouth wide enough to bite", hi: "काटने के लिए मुंह काफी चौड़ा खोलना", gu: "કંઈક બાઇટ લેવા મોઢું પૂરતું ખોલવામાં કેટલી મુશ્કેલી થાય છે?" },
        { en: "Eating sandwich or burger", hi: "सैंडविच या बर्गर खाना", gu: "સેન્ડવિચ કે બર્ગર ખાવામાં કેટલી મુશ્કેલી છે?" },
        { en: "Biting an apple or similar fruit", hi: "सेब या इसी तरह के फल को काटना", gu: "સફરજન જેવા ફળ ચવામાં કેટલી મુશ્કેલી છે?" },
        { en: "Eating dry food like toast or khakhra", hi: "टोस्ट या खाखरा जैसा सूखा भोजन खाना", gu: "સૂકા ખોરાક (ટોસ્ટ કે ખાખરા) ખાવામાં કેટલી મુશ્કેલી છે?" }
    ],
    "Jaw Mobility": [
        { en: "Opening mouth wide", hi: "मुंह चौड़ा खोलना", gu: "મોઢું પહોળું ખોલવામાં કેટલી મુશ્કેલી થાય છે?" },
        { en: "Yawning", hi: "जम्हाई लेना", gu: "જમ્હાઈ લેતા દુખાવો થાય છે કે અવરોધ થાય છે?" },
        { en: "Smiling", hi: "मुस्कुराना", gu: "પૂરતું હસવામાં કેટલી મુશ્કેલી થાય છે?" },
        { en: "Pain while using a straw to sip beverages", hi: "पेय पदार्थ पीने के लिए स्ट्रॉ का उपयोग करते समय दर्द", gu: "સ્ટ્રોનો ઉપયોગ કરીને પીણાં પીતી વખતે દુખાવો થાય છે?" },
        { en: "Speaking loudly", hi: "जोर से बोलना", gu: "મોટેથી બોલવામાં કેટલી મુશ્કેલી થાય છે?" }
    ],
    "Verbal/Emotional Expression": [
        { en: "Talking for a long time", hi: "लंबे समय तक बात करना", gu: "લાંબા સમય સુધી વાત કરવી મુશ્કેલ લાગે છે?" },
        { en: "Laughing", hi: "हंसना", gu: "હસવાથી ચહેરામાં દુખાવો થાય છે?" },
        { en: "Singing or raising voice", hi: "गाना गाना या आवाज उठाना", gu: "ગીત ગાવા કે મોટેથી બોલવામાં કેટલી મુશ્કેલી થાય છે?" },
        { en: "Expressing emotions like anger or joy", hi: "क्रोध या खुशी जैसी भावनाओं को व्यक्त करना", gu: "ગુસ્સો કે આનંદ જેવી ભાવનાઓ ચહેરા પર બતાવવામાં કેટલી મુશ્કેલી હોય છે?" },
        { en: "Facial movement while talking", hi: "बात करते समय चेहरे का हिलना-डुलना", gu: "વાત કરતી વખતે ચહેરાના હલનચલનમાં કેટલી મુશ્કેલી હોય છે?" }
    ]
};

const formContainer = document.getElementById("formContainer");
let questionIndex = 0;
let currentLanguage = 'en'; // Default language

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update active language button styles
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-gray-300', 'text-gray-700');
    });
    
    // Set active button
    event.target.classList.remove('bg-gray-300', 'text-gray-700');
    event.target.classList.add('bg-blue-600', 'text-white');
    
    // Refresh questions with new language
    refreshQuestions();
}

// Function to refresh questions with current language
function refreshQuestions() {
    // Clear existing questions
    formContainer.innerHTML = '';
    questionIndex = 0;
    
    // Recreate questions with current language
    for (const [domain, questions] of Object.entries(domains)) {
        const domainDiv = document.createElement("div");
        domainDiv.innerHTML = `<h2 class="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">${domain}</h2>`;

        questions.forEach(questionData => {
            const qDiv = document.createElement("div");
            qDiv.className = "question py-3";
            
            // Use the current language text
            const questionText = questionData[currentLanguage];
            qDiv.innerHTML = `<label class='question-label block text-md font-medium text-gray-800'>${questionText}</label>`;
            
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
}

// Initialize the form with default language
refreshQuestions();

// Handle "Other" radio button visibility
document.querySelectorAll('input[name="evalTime"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
        const otherContainer = document.getElementById('otherEvalTimeContainer');
        if (event.target.value === 'Other') {
            otherContainer.classList.remove('hidden');
        } else {
            otherContainer.classList.add('hidden');
            document.getElementById('otherEvalTime').value = '';
        }
    });
});

/**
 * Gets the selected evaluation time
 */
function getEvaluationTime() {
    const selectedRadio = document.querySelector('input[name="evalTime"]:checked');
    if (selectedRadio) {
        if (selectedRadio.value === 'Other') {
            return document.getElementById('otherEvalTime').value || 'Other';
        }
        return selectedRadio.value;
    }
    return 'Not specified';
}

/**
 * Calculates domain scores
 */
function calculateDomainScores(responses) {
    const domainIndices = {
        "Mastication": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        "Jaw_Mobility": [10, 11, 12, 13, 14],
        "Verbal_Emotional_Expression": [15, 16, 17, 18, 19]
    };
    
    const domainScores = {};
    
    for (const [domain, indices] of Object.entries(domainIndices)) {
        const scores = indices.map(i => responses[`q${i}`] || 0);
        domainScores[domain] = {
            'total': scores.reduce((sum, current) => sum + current, 0),
            'average': scores.reduce((sum, current) => sum + current, 0) / scores.length,
            'max_possible': scores.length * 10
        };
    }
    
    return domainScores;
}

/**
 * Calculates the total score and saves to database
 */
async function calculateAndSaveScores() {
    const form = document.forms["jflsForm"];
    
    // Collect all responses
    const responses = {};
    for (let i = 0; i < questionIndex; i++) {
        const slider = form.elements[`q${i}`];
        if (slider) {
            responses[`q${i}`] = parseInt(slider.value);
        }
    }
    
    // Calculate total score
    const totalScore = Object.values(responses).reduce((sum, current) => sum + current, 0);
    const maxScore = questionIndex * 10;
    
    // Calculate domain scores
    const domainScores = calculateDomainScores(responses);
    
    // Display results
    document.getElementById("results").innerHTML = `
        <strong class="block text-blue-700">Total JFLS-20 Score:</strong> 
        <span class="text-4xl font-bold">${totalScore}</span> / ${maxScore}
    `;
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
    
    // Save to Google Sheets
    await saveToGoogleSheets(responses, totalScore, domainScores);
}

/**
 * Sends assessment data to Google Sheets via Apps Script
 */
async function saveToGoogleSheets(responses, totalScore, domainScores) {
    const form = document.forms["jflsForm"];
    
    const assessmentData = {
        patientName: form.elements['patientName'].value,
        age: form.elements['age'].value,
        gender: form.elements['gender'].value,
        examDate: form.elements['examDate'].value,
        evaluationTime: getEvaluationTime(),
        totalScore: totalScore,
        domainScores: domainScores,
        responses: responses
    };
    
    // Replace with your actual Google Apps Script URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKLZM1g6PmriJmXe_cMyF5lDcS1JUUwEM6jVlPNpk/exec';
    
    console.log("📤 Sending to Google Sheets:", assessmentData);
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assessmentData)
        });
        
        const result = await response.json();
        console.log("📥 Google Sheets response:", result);
        
        if (result.status === 'success') {
            console.log('✅ Assessment saved to Google Sheets! Row:', result.row);
            showCustomMessageBox('✅ Assessment saved to Google Sheets successfully!');
            return true;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('❌ Failed to save to Google Sheets:', error);
        
        // Fallback: Save to localStorage
        const saved = saveToLocalStorage(responses, totalScore, domainScores, {
            patientName: form.elements['patientName'].value,
            age: form.elements['age'].value,
            gender: form.elements['gender'].value,
            examDate: form.elements['examDate'].value,
            evaluationTime: getEvaluationTime()
        });
        
        if (saved) {
            showCustomMessageBox('✅ Assessment saved to browser storage (Google Sheets unavailable)');
        } else {
            showCustomMessageBox('❌ Failed to save assessment. Please check your connection.');
        }
        
        return saved;
    }
}

/**
 * Saves assessment data to browser localStorage as fallback
 */
function saveToLocalStorage(responses, totalScore, domainScores, formData) {
    try {
        const assessmentData = {
            ...formData,
            totalScore: totalScore,
            domainScores: domainScores,
            responses: responses,
            timestamp: new Date().toISOString(),
            savedLocally: true
        };
        
        // Get existing data or initialize empty array
        const existingData = JSON.parse(localStorage.getItem('jfls_assessments') || '[]');
        
        // Add new assessment
        existingData.push(assessmentData);
        
        // Save back to localStorage
        localStorage.setItem('jfls_assessments', JSON.stringify(existingData));
        
        console.log('✅ Assessment saved to browser storage');
        return true;
    } catch (error) {
        console.error('❌ Failed to save to browser storage:', error);
        return false;
    }
}

/**
 * Test Google Apps Script connection
 */
async function testGoogleScript() {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKLZM1g6PmriJmXe_cMyF5lDcS1JUUwEM6jVlPNpk/exec';
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const text = await response.text();
        console.log('Google Script test response:', text);
        
        try {
            const data = JSON.parse(text);
            showCustomMessageBox('✅ Google Script is working: ' + data.message);
        } catch (e) {
            showCustomMessageBox('⚠️ Google Script returned non-JSON. Check deployment permissions.');
        }
    } catch (error) {
        showCustomMessageBox('❌ Cannot reach Google Script: ' + error.message);
    }
}

/**
 * Generates and downloads a PDF report of the assessment results.
 */
function downloadPdf() {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        showCustomMessageBox("PDF generation library not loaded. Please ensure you have an internet connection.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const form = document.forms["jflsForm"];

    // Get Patient Info
    const patientName = form.elements['patientName'].value || 'N/A';
    const age = form.elements['age'].value || 'N/A';
    const gender = form.elements['gender'].value || 'N/A';
    let examDate = form.elements['examDate'].value;
    if (examDate) {
        const date = new Date(examDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        examDate = `${day}/${month}/${year}`;
    } else {
        examDate = 'N/A';
    }
    let evalTime = getEvaluationTime();
    
    // PDF Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text("JFLS-20 Assessment Report", 105, 15, null, null, "center");

    // Patient Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    let y = 25;
    doc.text(`Patient Name: ${patientName}`, 15, y);
    doc.text(`Date of Exam: ${examDate}`, 115, y);
    y += 6;
    doc.text(`Age: ${age}`, 15, y);
    doc.text(`Gender: ${gender}`, 115, y);
    y += 6;
    doc.text(`Evaluation Time Point: ${evalTime}`, 15, y);
    
    // Line separator
    y += 7;
    doc.setLineWidth(0.3);
    doc.line(15, y, 195, y);
    y += 7;

    // Assessment Questions
    let currentQuestionNum = 1;
    for (const [domain, questions] of Object.entries(domains)) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(domain, 15, y);
        y += 6;

        questions.forEach(questionData => {
            const slider = form.elements[`q${currentQuestionNum - 1}`];
            const answer = slider ? slider.value : 'N/A';
            const questionText = `${currentQuestionNum}. ${questionData.en}`; // Always use English in PDF
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text(questionText, 20, y, { maxWidth: 140 });
            
            doc.setFont('helvetica', 'bold');
            doc.text(`Score: ${answer}`, 185, y, null, null, "right");

            y += 8;
            currentQuestionNum++;
        });
        y += 2;
    }

    // Total Score
    const totalScoreText = document.getElementById("results").innerText;
    if (totalScoreText && !totalScoreText.includes("will appear here")) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        const finalY = Math.max(y, doc.internal.pageSize.height - 25);
        doc.text(totalScoreText.replace(/\s+/g, ' ').trim(), 105, finalY, null, null, "center");
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text("Developed by Dr. Hrushikesh Gosai (OMFS)", 105, doc.internal.pageSize.height - 10, null, null, "center");

    doc.save(`JFLS-20_Report_${patientName.replace(/ /g, '_')}.pdf`);
}

/**
 * Shows a custom message box instead of the native alert.
 */
function showCustomMessageBox(message) {
    // Remove existing message box if any
    const existingOverlay = document.querySelector('.message-overlay');
    if (existingOverlay) {
        document.body.removeChild(existingOverlay);
    }

    const overlay = document.createElement('div');
    overlay.className = 'message-overlay';
    overlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;`;
    
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); text-align: center; max-width: 90%; width: 400px; font-family: 'Inter', sans-serif; color: #333; position: relative; border-top: 5px solid #3b82f6;`;
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.style.cssText = `font-size: 1.1em; line-height: 1.5; margin-bottom: 20px;`;
    messageBox.appendChild(messageText);
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.style.cssText = `padding: 10px 25px; font-size: 1em; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; transition: background-color 0.2s ease;`;
    closeButton.onmouseover = () => closeButton.style.backgroundColor = '#2563eb';
    closeButton.onmouseout = () => closeButton.style.backgroundColor = '#3b82f6';
    closeButton.onclick = () => document.body.removeChild(overlay);
    
    messageBox.appendChild(closeButton);
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
}

// Add test button to check Google Script connection
document.addEventListener('DOMContentLoaded', function() {
    // Add test button if needed
    const testBtn = document.createElement('button');
    testBtn.textContent = 'Test Google Connection';
    testBtn.className = 'bg-green-600 text-white px-4 py-2 rounded-lg text-sm mt-4';
    testBtn.onclick = testGoogleScript;
    document.querySelector('.language-switcher').appendChild(testBtn);
});
