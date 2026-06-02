/* ============================================
   FRAGRANCE CONSULTATION APP
   Chanel Qui Es-Tu?
   ============================================ */

/**
 * Fragrance Database
 * Structured object containing all fragrance information
 */
const fragranceDatabase = {
    'pour-elle': {
        visionary: {
            name: 'Chanel N°5 L\'Eau',
            profile: 'The Visionary',
            description: 'A timeless expression of feminine power. This luminous composition captures the essence of modernity while honoring iconic heritage. A fragrance for those who lead with vision and purpose.',
            notes: ['Neroli', 'Peony', 'Sandalwood', 'Vanilla'],
            image: './images/chanel-no5-leau.jpg',
            url: 'https://www.chanel.com/en_US/fragrance/p/chanel-no-5-leau/'
        },
        emancipated: {
            name: 'Coco Mademoiselle',
            profile: 'The Emancipated',
            description: 'Elegant and confident, this fragrance celebrates independence and freedom. A sophisticated blend that refuses convention, embodying the spirit of the modern woman who writes her own rules.',
            notes: ['Orange', 'Jasmine', 'Patchouli', 'Amber'],
            image: './images/coco-mademoiselle.jpg',
            url: 'https://www.chanel.com/en_US/fragrance/p/coco-mademoiselle-eau-de-parfum/'
        },
        creative: {
            name: 'Gabrielle Chanel Essence',
            profile: 'The Creative',
            description: 'An olfactory manifesto of creative expression. This vibrant composition celebrates originality and artistic spirit. For those whose imagination knows no limits, a fragrance that captures boundless energy.',
            notes: ['Aldehydes', 'Hyacinth', 'Gardenia', 'Sandalwood'],
            image: './images/gabrielle-essence.jpg',
            url: 'https://www.chanel.com/en_US/fragrance/p/gabrielle-chanel-essence/'
        },
        authentic: {
            name: 'Chance Eau Tendre',
            profile: 'The Authentic',
            description: 'Effortless elegance in a bottle. This tender fragrance celebrates authenticity and natural grace. A gentle composition that reveals your true essence with quiet confidence and timeless appeal.',
            notes: ['Pink Pepper', 'Jasmine', 'Amber Patchouli'],
            image: './images/chance-eau-tendre.jpg',
            url: 'https://www.chanel.com/en_US/fragrance/p/chance-eau-tendre/'
        }
    },
    'pour-lui': {
        visionary: {
            name: 'Bleu de Chanel Parfum',
            profile: 'The Visionary',
            description: 'A bold declaration of masculine vision. This sophisticated composition merges tradition with innovation, capturing the essence of forward-thinking elegance. A fragrance for the modern man of vision.',
            notes: ['Citron', 'Ginger', 'Sandalwood', 'Amber'],
            image: './images/bleu-parfum.jpg',
            url: 'https://www.chanel.com/en_US/fragrance/p/bleu-de-chanel-parfum/'
        },
        emancipated: {
            name: 'Allure Homme',
            profile: 'The Emancipated',
            description: 'Dynamic and liberated, this fragrance celebrates the modern man who refuses limitations. Fresh and powerful, it embodies freedom of expression and fearless individuality.',
            notes: ['Mandarin', 'Vetiver', 'Cedarwood', 'Musk'],
            image: './images/allure-homme-sport.jpg',
            url: 'https://www.chanel.com/en_US/fragrance/p/allure-homme/'
        },
        creative: {
            name: 'Bleu de Chanel Eau de Parfum',
            profile: 'The Creative',
            description: 'An artistic interpretation of masculine elegance. This creative composition blends classic sophistication with modern sensibility. For the man who expresses himself through originality and style.',
            notes: ['Lemon', 'Mint', 'Sandalwood', 'Ambroxan'],
            image: './images/bleu-edp.jpg',
            url: 'https://www.chanel.com/en_US/fragrance/p/bleu-de-chanel-eau-de-parfum/'
        },
        authentic: {
            name: 'Platinum Égoïste',
            profile: 'The Authentic',
            description: 'Pure and genuine, this fragrance captures true masculinity without pretense. A timeless composition of refined simplicity, reflecting the authentic man who remains true to himself.',
            notes: ['Bergamot', 'Lavender', 'Vanilla', 'Musk'],
            image: './images/platinum-egoiste.jpg',
            url: 'https://www.chanel.com/en_US/fragrance/p/platinum-egoiste/'
        }
    }
};

/**
 * Profile Mapping
 * Maps numerical answers to profile types
 */
const profileMapping = {
    question3: {
        1: 'visionary',
        2: 'emancipated',
        3: 'creative',
        4: 'authentic'
    },
    question4: {
        1: 'visionary',
        2: 'emancipated',
        3: 'creative',
        4: 'authentic'
    },
    question5: {
        1: 'creative',
        2: 'visionary',
        3: 'emancipated',
        4: 'authentic'
    },
    question6: {
        1: 'visionary',
        2: 'authentic',
        3: 'emancipated',
        4: 'creative'
    }
};

/**
 * Scoring Weights
 * Determines which questions have the most influence
 */
const scoringWeights = {
    question3: 0.70,
    question4: 0.10,
    question5: 0.10,
    question6: 0.10
};

/**
 * Application State
 * Maintains user's journey and selections
 */
const appState = {
    currentScreen: 1,
    totalScreens: 7,
    answers: {
        1: null,  // pour-elle or pour-lui
        3: null,  // essence
        4: null,  // energy
        5: null,  // inspiration
        6: null   // aesthetic
    },
    selectedProfile: null,
    selectedFragrance: null
};

/**
 * Initialize App
 * Sets up event listeners and initial state
 */
function initializeApp() {
    setupEventListeners();
    updateProgressBar();
}

/**
 * Setup Event Listeners
 * Attaches click handlers to interactive elements
 */
function setupEventListeners() {
    // Option cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', handleOptionSelect);
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleOptionSelect.call(card, e);
            }
        });
    });

    // Next button
    const nextButton = document.querySelector('[data-action="next-screen"]');
    if (nextButton) {
        nextButton.addEventListener('click', () => navigateToScreen(2));
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Handle Option Selection
 * Records user's choice and advances to next screen
 */
function handleOptionSelect(event) {
    const card = event.currentTarget;
    const question = card.dataset.question;
    const answer = card.dataset.answer;

    // Validate selection
    if (!question || answer === undefined) {
        return;
    }

    // Record answer
    appState.answers[question] = answer;

    // Visual feedback
    updateSelectedState(card, question);

    // Auto-advance after brief delay for smooth transition
    setTimeout(() => {
        navigateToScreen(appState.currentScreen + 1);
    }, 400);
}

/**
 * Update Selected State
 * Provides visual feedback for selected options
 */
function updateSelectedState(selectedCard, question) {
    // Remove previous selection in this question group
    document.querySelectorAll(`.option-card[data-question="${question}"]`).forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to current card
    selectedCard.classList.add('selected');
}

/**
 * Navigate to Screen
 * Transitions between consultation screens with dissolve effect
 */
function navigateToScreen(screenNumber) {
    // Validate screen number
    if (screenNumber < 1 || screenNumber > appState.totalScreens) {
        return;
    }

    // Get current and new screens
    const currentScreen = document.querySelector('.screen.active');
    const newScreen = document.querySelector(`.screen-${screenNumber}`);

    if (!newScreen) {
        return;
    }

    // Fade out current screen
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }

    // Wait for fade-out to complete, then fade in new screen
    setTimeout(() => {
        // Update state
        appState.currentScreen = screenNumber;

        // Show new screen with dissolve effect
        newScreen.classList.add('active');

        // Special handling for recommendation screen
        if (screenNumber === 7) {
            displayRecommendation();
        }

        // Update progress bar
        updateProgressBar();

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
}

/**
 * Update Progress Bar
 * Visual indicator of consultation progress
 */
function updateProgressBar() {
    const progress = (appState.currentScreen / appState.totalScreens) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

/**
 * Calculate Dominant Profile
 * Uses weighted scoring to determine best match
 */
function calculateDominantProfile() {
    // Initialize score counters
    const scores = {
        visionary: 0,
        emancipated: 0,
        creative: 0,
        authentic: 0
    };

    // Score Question 3 (70% weight)
    const answer3 = appState.answers[3];
    const profile3 = profileMapping.question3[answer3];
    scores[profile3] += scoringWeights.question3;

    // Score Question 4 (10% weight)
    const answer4 = appState.answers[4];
    const profile4 = profileMapping.question4[answer4];
    scores[profile4] += scoringWeights.question4;

    // Score Question 5 (10% weight)
    const answer5 = appState.answers[5];
    const profile5 = profileMapping.question5[answer5];
    scores[profile5] += scoringWeights.question5;

    // Score Question 6 (10% weight)
    const answer6 = appState.answers[6];
    const profile6 = profileMapping.question6[answer6];
    scores[profile6] += scoringWeights.question6;

    // Find profile with highest score
    let dominantProfile = 'authentic';
    let maxScore = 0;

    for (const [profile, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            dominantProfile = profile;
        }
    }

    return dominantProfile;
}

/**
 * Display Recommendation
 * Renders the final fragrance recommendation
 */
function displayRecommendation() {
    // Calculate profile
    const profile = calculateDominantProfile();
    appState.selectedProfile = profile;

    // Get gender choice
    const gender = appState.answers[1];

    // Get fragrance from database
    const fragrance = fragranceDatabase[`pour-${gender}`][profile];
    appState.selectedFragrance = fragrance;

    // Populate recommendation elements
    const fragranceImage = document.getElementById('fragrance-image');
    const fragranceName = document.getElementById('fragrance-name');
    const fragranceProfile = document.getElementById('fragrance-profile');
    const fragranceDescription = document.getElementById('fragrance-description');
    const fragranceNotes = document.getElementById('fragrance-notes');
    const fragranceLink = document.getElementById('fragrance-link');

    if (fragranceImage) {
        fragranceImage.src = fragrance.image;
        fragranceImage.alt = fragrance.name;
    }

    if (fragranceName) {
        fragranceName.textContent = fragrance.name;
    }

    if (fragranceProfile) {
        fragranceProfile.textContent = fragrance.profile;
    }

    if (fragranceDescription) {
        fragranceDescription.textContent = fragrance.description;
    }

    if (fragranceNotes) {
        fragranceNotes.innerHTML = `
            <span class="fragrance-notes-label">Key Notes</span>
            <div class="fragrance-notes-list">
                ${fragrance.notes.map(note => `<span class="note">${note}</span>`).join('')}
            </div>
        `;
    }

    if (fragranceLink) {
        fragranceLink.href = fragrance.url;
        fragranceLink.setAttribute('target', '_blank');
        fragranceLink.setAttribute('rel', 'noopener noreferrer');
    }
}

/**
 * Handle Keyboard Navigation
 * Allows users to navigate with arrow keys
 */
function handleKeyboardNavigation(event) {
    // Skip if in input or textarea
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }

    // Escape to go back
    if (event.key === 'Escape' && appState.currentScreen > 1) {
        navigateToScreen(appState.currentScreen - 1);
    }
}

/**
 * Accessibility Enhancement
 * Set proper ARIA attributes
 */
function enhanceAccessibility() {
    document.querySelectorAll('.option-card').forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.setAttribute('role', 'button');
    });
}

/**
 * Initialize on DOM Ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    enhanceAccessibility();

    // Log initialization
    console.log('Chanel Qui Es-Tu? Consultation Experience Initialized');
});

/**
 * Error Handling
 * Gracefully handle runtime errors
 */
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});

/**
 * Unload Handler
 * Clean up when user leaves
 */
window.addEventListener('beforeunload', () => {
    // Save state to localStorage for persistence
    localStorage.setItem('chanelConsultationState', JSON.stringify(appState));
});
