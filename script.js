// ==========================================
// 1. SETUP / SURVEY LOGIC
// ==========================================
const surveyScreen = document.getElementById('boring-survey-screen');
const jokeScreen = document.getElementById('joke-screen');
const introScreen = document.getElementById('intro-screen');

const nextBtn = document.getElementById('survey-next-btn');
const submitBtn = document.getElementById('survey-submit-btn');

let currentStep = 1;
let uploadedImagesData = [];
let selectedLanguages = [];

const languageDictionary = {
    es: "Feliz Cumpleaños y Te amo!",
    de: "Alles Gute zum Geburtstag, Ich liebe dich!",
    ko: "Saeng-il chukahae, Saranghae!",
    ja: "Tanjoubi omedetou, Aishiteru!",
    it: "Buon compleanno, Ti amo!",
    fr: "Joyeux anniversaire, Je t'aime!"
};

// Base languages
let loveTranslations = [
    "Happy Birthday, I love you!",
    "Maligayang Kaarawan, Mahal kita!"
];

// Validation for all 12 steps
function validateStep() {
    document.querySelectorAll('.error-msg').forEach(msg => msg.style.display = 'none');

    if (currentStep === 1) {
        const checked = document.querySelectorAll('#lang-checkboxes input[type="checkbox"]:checked');
        if (checked.length !== 3) {
            document.getElementById('step1-error').style.display = 'block';
            return false;
        }
        selectedLanguages = Array.from(checked).map(cb => cb.value);
        return true;
    } 
    else if (currentStep === 2) {
        const text = document.getElementById('q-pricing').value.trim();
        if (text === '') {
            document.getElementById('step2-error').style.display = 'block';
            return false;
        }
        return true;
    } 
    else if (currentStep === 3) {
        const text = document.getElementById('q-quality').value.trim();
        if (text === '') {
            document.getElementById('step3-error').style.display = 'block';
            return false;
        }
        return true;
    } 
    else if (currentStep === 4) {
        const checkedRadio = document.querySelector('input[name="water-pressure"]:checked');
        if (!checkedRadio) {
            document.getElementById('step4-error').style.display = 'block';
            return false;
        }
        return true;
    } 
    else if (currentStep === 5) {
        const text = document.getElementById('q-service').value.trim();
        if (text === '') {
            document.getElementById('step5-error').style.display = 'block';
            return false;
        }
        return true;
    } 
    // UPDATED RADIO VALIDATIONS START HERE
    else if (currentStep === 6) {
        const checkedRadio = document.querySelector('input[name="water-disappear"]:checked');
        if (!checkedRadio) {
            document.getElementById('step6-error').style.display = 'block';
            return false;
        }
        return true;
    }
    else if (currentStep === 7) {
        const checkedRadio = document.querySelector('input[name="water-smell"]:checked');
        if (!checkedRadio) {
            document.getElementById('step7-error').style.display = 'block';
            return false;
        }
        return true;
    }
    else if (currentStep === 8) {
        const checkedRadio = document.querySelector('input[name="water-color"]:checked');
        if (!checkedRadio) {
            document.getElementById('step8-error').style.display = 'block';
            return false;
        }
        return true;
    }
    else if (currentStep === 9) {
        const checkedRadio = document.querySelector('input[name="water-action"]:checked');
        if (!checkedRadio) {
            document.getElementById('step9-error').style.display = 'block';
            return false;
        }
        return true;
    }
    // UPDATED RADIO VALIDATIONS END HERE
    else if (currentStep === 10) {
        const checkedRadio = document.querySelector('input[name="worth-money"]:checked');
        if (!checkedRadio) {
            document.getElementById('step10-error').style.display = 'block';
            return false;
        }
        return true;
    }
    else if (currentStep === 11) {
        const text = document.getElementById('q-recommend').value.trim();
        if (text === '') {
            document.getElementById('step11-error').style.display = 'block';
            return false;
        }
        return true;
    } 
    else if (currentStep === 12) {
        if (uploadedImagesData.length !== 5) {
            document.getElementById('step12-error').style.display = 'block';
            return false;
        }
        return true;
    }
}

// Next Button Click
nextBtn.addEventListener('click', () => {
    if (validateStep()) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`step-${currentStep}`).classList.add('active');
        
        if (currentStep === 12) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        }
    }
});

// File Upload Handler
document.getElementById('pic-upload').addEventListener('change', (e) => {
    const files = e.target.files;
    uploadedImagesData = []; 
    
    const status = document.getElementById('pic-status');
    status.innerText = `${files.length} / 5 files selected`;
    
    if (files.length === 5) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedImagesData.push(event.target.result);
            };
            reader.readAsDataURL(file);
        });
    }
});

// Submit Survey Click
submitBtn.addEventListener('click', () => {
    if (validateStep()) {
        selectedLanguages.forEach(langCode => {
            loveTranslations.push(languageDictionary[langCode]);
        });

        const bgMusic = document.getElementById('bgMusic');
        bgMusic.play().then(() => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }).catch(e => console.log("Audio unlock failed: ", e));

        surveyScreen.classList.add('hidden');
        jokeScreen.classList.remove('hidden');
        
        setTimeout(() => {
            jokeScreen.style.opacity = '0'; 
            setTimeout(() => jokeScreen.classList.add('hidden'), 500);

            introScreen.classList.remove('hidden');
            
            bgMusic.play().catch(e => console.log("Audio block: ", e));

            setTimeout(playIntro, 800);
            
        }, 750); 
    }
});


// ==========================================
// 2. CINEMATIC INTRO LOGIC
// ==========================================
const introText = document.getElementById('intro-text');
let currentTranslation = 0;

function playIntro() {
    if (currentTranslation < loveTranslations.length) {
        introText.innerText = loveTranslations[currentTranslation];
        introText.classList.add('visible');
        
        setTimeout(() => {
            introText.classList.remove('visible');
            currentTranslation++;
            setTimeout(playIntro, 500); 
        }, 2500); 
    } else {
        setTimeout(() => {
            introScreen.classList.add('hidden');
            
            setInterval(createFloatingPic, 1500);
            createFloatingPic();
            
            setInterval(createFloatingEmoji, 800);
            createFloatingEmoji();
            
        }, 500);
    }
}


// ==========================================
// 3. GIFT / ENVELOPE LOGIC
// ==========================================
const envelopeWrapper = document.getElementById('envelope-wrapper');
const envelope = document.getElementById('envelope');
const particlesContainer = document.getElementById('particles-container');
const picsContainer = document.getElementById('floating-pics-container');
const emojisContainer = document.getElementById('floating-emojis-container');

function createFloatingPic() {
    if(uploadedImagesData.length === 0) return; 

    const pic = document.createElement('div');
    pic.classList.add('floating-pic');
    
    const randomImg = uploadedImagesData[Math.floor(Math.random() * uploadedImagesData.length)];
    pic.style.backgroundImage = `url('${randomImg}')`;
    pic.style.left = (Math.random() * 90) + 'vw';
    
    const duration = (Math.random() * 4) + 6; 
    pic.style.animationDuration = duration + 's';
    const size = Math.floor(Math.random() * 50) + 60; 
    pic.style.width = size + 'px';
    pic.style.height = size + 'px';
    
    picsContainer.appendChild(pic);
    setTimeout(() => { pic.remove(); }, duration * 1000);
}

const bgEmojisList = ['💖', '✨', '🌸', '🌷', '💌', '⭐', '🐻', '☁️'];

function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('floating-bg-emoji');
    emoji.innerText = bgEmojisList[Math.floor(Math.random() * bgEmojisList.length)];
    emoji.style.left = (Math.random() * 95) + 'vw';
    
    const duration = (Math.random() * 5) + 8; 
    emoji.style.animationDuration = duration + 's';
    const size = Math.floor(Math.random() * 20) + 20; 
    emoji.style.fontSize = size + 'px';
    
    emojisContainer.appendChild(emoji);
    setTimeout(() => { emoji.remove(); }, duration * 1000);
}

const pages = document.querySelectorAll('.book-page');
const bookPrevBtn = document.getElementById('prevBtn');
const bookNextBtn = document.getElementById('nextBtn');
let currentBookPage = 0;
let isOpen = false;

function explodeEmojis() {
    const blastEmojis = ['💖', '✨', '🌸', '🌷', '💌', '⭐'];
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.classList.add('emoji-particle');
        particle.innerText = blastEmojis[Math.floor(Math.random() * blastEmojis.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 250 + Math.random() * 300; 
        const rotation = (Math.random() * 360) + 'deg';
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';
        
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.setProperty('--rot', rotation);
        
        particlesContainer.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 1000);
    }
}

envelope.addEventListener('click', (e) => {
    if (e.target.closest('.controls')) return;
    if (!isOpen) {
        envelopeWrapper.classList.add('open');
        explodeEmojis();
        isOpen = true;
    }
});

function updateBookButtons() {
    if (currentBookPage === 0) bookPrevBtn.classList.add('hidden');
    else bookPrevBtn.classList.remove('hidden');

    if (currentBookPage === pages.length - 1) bookNextBtn.classList.add('hidden');
    else bookNextBtn.classList.remove('hidden');
}

bookNextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (currentBookPage < pages.length - 1) {
        pages[currentBookPage].classList.add('flipped');
        currentBookPage++;
        updateBookButtons();
    }
});

bookPrevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentBookPage > 0) {
        currentBookPage--;
        pages[currentBookPage].classList.remove('flipped');
        updateBookButtons();
    }
});
