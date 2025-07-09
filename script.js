// Define the domains and their respective questions in English and Gujarati
const domains = {
    "Mastication": [
        ["Chewing tough food", "કઠિન ખોરાક (જેમ કે મટન) ચાવવામાં કેટલી મુશ્કેલી થાય છે?"],
        ["Chewing hard items (like raw vegetables)", "કાચા શાકભાજી જેવા કઠિન વસ્તુઓ ચાવવામાં કેટલી મુશ્કેલી થાય છે?"],
        ["Chewing chicken or cooked meat", "સામાન્ય રીતે બનાવેલું ચિકન કે મટન ચાવવામાં કેટલી મુશ્કેલી છે?"],
        ["Chewing crispy foods (crackers/toast)", "ક્રિસ્પી વસ્તુઓ (જેમ કે ખાખરા કે ટોસ્ટ) ચાવવામાં કેટલી મુશ્કેલી છે?"],
        ["Chewing soft food (like rice or dal)", "નરમ ખોરાક (જેમ કે રાંધેલું ભાત કે દાળ) ચાવવામાં કેટલી મુશ્કેલી છે?"],
        ["Eating mashed or pureed food", "ખીર-મસhed જેવી ચાવવાની જરૂર ન હોય તેવા ખોરાકમાં કેટલી મુશ્કેલી છે?"],
        ["Opening mouth wide enough to bite", "કંઈક બાઇટ લેવા મોઢું પૂરતું ખોલવામાં કેટલી મુશ્કેલી થાય છે?"],
        ["Eating sandwich or burger", "સેન્ડવિચ કે બર્ગર ખાવામાં કેટલી મુશ્કેલી છે?"],
        ["Biting an apple or similar fruit", "સફરજન જેવા ફળ ચાવવામાં કેટલી મુશ્કેલી છે?"],
        ["Eating dry food like toast or khakhra", "સૂકા ખોરાક (ટોસ્ટ કે ખાખરા) ખાવામાં કેટલી મુશ્કેલી છે?"]
    ],
    "Jaw Mobility": [
        ["Opening mouth wide", "મોઢું પહોળું ખોલવામાં કેટલી મુશ્કેલી થાય છે?"],
        ["Yawning", "જમ્હાઈ લેતા દુખાવો થાય છે કે અવરોધ થાય છે?"],
        ["Smiling", "પૂરતું હસવામાં કેટલી મુશ્કેલી થાય છે?"],
        ["Pain while using a straw to sip beverages", "સ્ટ્રોનો ઉપયોગ કરીને પીણાં પીતી વખતે દુખાવો થાય છે?"],
        ["Speaking loudly", "મોટેથી બોલવામાં કેટલી મુશ્કેલી થાય છે?"]
    ],
    "Verbal/Emotional Expression": [
        ["Talking for a long time", "લાંબા સમય સુધી વાત કરવી મુશ્કેલ લાગે છે?"],
        ["Laughing", "હસવાથી ચહેરામાં દુખાવો થાય છે?"],
        ["Singing or raising voice", "ગીત ગાવા કે મોટેથી બોલવામાં કેટલી મુશ્keli થાય છે?"],
        ["Expressing emotions like anger or joy", "ગુસ્સો કે આનંદ જેવી ભાવનાઓ ચહેરા પર બતાવવામાં કેટલી મુશ્કેલી હોય છે?"],
        ["Facial movement while talking", "વાત કરતી વખતે ચહેરાના હલનચલનમાં કેટલી મુશ્કેલી હોય છે?"]
    ]
};

const formContainer = document.getElementById("formContainer");
let questionIndex = 0; // Initialize a counter for question IDs

// Loop through each domain and its questions to dynamically generate the form
for (const [domain, questions] of Object.entries(domains)) {
    const domainDiv = document.createElement("div");
    domainDiv.innerHTML = `<h2 class="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">${domain}</h2>`;

    questions.forEach(([qEn, qGu]) => {
        const qDiv = document.createElement("div");
        qDiv.className = "question py-3";
        qDiv.innerHTML = `<label class='question-label block text-md font-medium text-gray-800'>${qEn}<br><span class='text-gray-600 font-normal'>${qGu}</span></label>`;
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

// Handle "Other" radio button visibility
document.querySelectorAll('input[name="evalTime"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
        const otherContainer = document.getElementById('otherEvalTimeContainer');
        if (event.target.value === 'Other') {
            otherContainer.classList.remove('hidden');
        } else {
            otherContainer.classList.add('hidden');
            document.getElementById('otherEvalTime').value = ''; // Clear the input when "Other" is not selected
        }
    });
});

/**
 * Calculates the total score for all questions.
 */
function calculateScores() {
    const form = document.forms["jflsForm"];
    const values = [];
    for (let i = 0; i < questionIndex; i++) {
        const slider = form.elements[`q${i}`];
        if (slider) {
            values.push(parseInt(slider.value));
        } else {
            console.error(`Slider for q${i} not found.`);
            showCustomMessageBox("An internal error occurred. Please refresh the page.");
            return;
        }
    }
    const totalScore = values.reduce((sum, current) => sum + current, 0);
    const maxScore = questionIndex * 10;
    document.getElementById("results").innerHTML = `
        <strong class="block text-blue-700">Total JFLS-20 Score:</strong> 
        <span class="text-4xl font-bold">${totalScore}</span> / ${maxScore}
    `;
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}

/**
 * Generates and downloads a PDF report of the assessment results.
 * MODIFIED to fit all content onto a single page.
 */
function downloadPdf() {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        showCustomMessageBox("PDF generation library not loaded. Please ensure you have an internet connection.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const form = document.forms["jflsForm"];

    // --- Get Patient Info ---
    const patientName = form.elements['patientName'].value || 'N/A';
    const age = form.elements['age'].value || 'N/A';
    const gender = form.elements['gender'].value || 'N/A';
    let examDate = form.elements['examDate'].value;
    if (examDate) {
        // Format date to dd/mm/yyyy
        const date = new Date(examDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        examDate = `${day}/${month}/${year}`;
    } else {
        examDate = 'N/A';
    }
    let evalTime = form.elements['evalTime'].value || 'N/A';
    if (evalTime === 'Other') {
        evalTime = form.elements['otherEvalTime'].value || 'Other (Not specified)';
    }
    
    // --- PDF Header ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text("JFLS-20 Assessment Report", 105, 15, null, null, "center");

    // --- Add Patient Info to PDF ---
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
    
    // --- Draw a line separator ---
    y += 7;
    doc.setLineWidth(0.3);
    doc.line(15, y, 195, y);
    y += 7;


    // --- Add Assessment Questions to PDF ---
    let currentQuestionNum = 1;
    for (const [domain, questions] of Object.entries(domains)) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(domain, 15, y);
        y += 6;

        questions.forEach(([qEn, qGu]) => {
            const slider = form.elements[`q${currentQuestionNum - 1}`];
            const answer = slider ? slider.value : 'N/A';
            // Truncate long questions if necessary, though reducing font size helps
            const questionText = `${currentQuestionNum}. ${qEn}`;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text(questionText, 20, y, { maxWidth: 140 }); // Add maxWidth to wrap text
            
            doc.setFont('helvetica', 'bold');
            doc.text(`Score: ${answer}`, 185, y, null, null, "right");

            y += 8; // Reduced space for next question
            currentQuestionNum++;
        });
        y += 2; // Reduced extra space between domains
    }

    // --- Add Total Score to PDF ---
    const totalScoreText = document.getElementById("results").innerText;
    if (totalScoreText && !totalScoreText.includes("will appear here")) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        // Place score at the bottom of the page
        // Adjust this 'y' value to ensure it's always at the bottom, or just below the last question.
        // For a single page, we can estimate remaining space. A more robust solution might track y position and add new page if needed.
        const finalY = Math.max(y, doc.internal.pageSize.height - 25); // Ensure it's not too high up if content is short
        doc.text(totalScoreText.replace(/\s+/g, ' ').trim(), 105, finalY, null, null, "center");
    }
    
    // --- Add Footer to PDF ---
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text("Developed by Dr. Hrushikesh Gosai (OMFS)", 105, doc.internal.pageSize.height - 10, null, null, "center");


    doc.save(`JFLS-20_Report_${patientName.replace(/ /g, '_')}.pdf`);
}

/**
 * Shows a custom message box instead of the native alert.
 */
function showCustomMessageBox(message) {
    const overlay = document.createElement('div');
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
