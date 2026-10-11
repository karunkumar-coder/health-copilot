const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const stageSelect = document.getElementById('stage');
const goalSelect = document.getElementById('goal');
const output = document.getElementById('copilotOutput');
const generateBtn = document.getElementById('generateBtn');
const sampleBtn = document.getElementById('sampleBtn');

const emergencySymptoms = [
  'chest pain',
  'severe shortness of breath',
  'sudden confusion',
  'fainting',
  'severe bleeding',
  'sudden weakness on one side',
  'high fever with confusion'
];

function ageGroupText(age, stage) {
  if (stage === 'child') return 'for children and teens';
  if (stage === 'senior') return 'for older adults';
  if (stage === 'caregiver') return 'for caregivers and family support';
  return 'for adults';
}

function getTips(stage, goal, age) {
  const common = [
    'Drink water regularly throughout the day.',
    'Aim for a consistent sleep routine with enough rest.',
    'Take short movement breaks and stay active in a safe, comfortable way.'
  ];

  if (stage === 'child') {
    return {
      title: 'Healthy habits for children and teens',
      tips: [
        'Encourage balanced meals with fruit, vegetables, protein, and whole grains.',
        'Limit screen time and support outdoor activity or play.',
        'Ensure enough sleep, especially before school or study time.',
        'Create a calm routine and encourage open talking when stress or mood changes happen.'
      ]
    };
  }

  if (stage === 'senior') {
    return {
      title: 'Supportive daily care for seniors',
      tips: [
        'Use hydration reminders because thirst can be reduced with age.',
        'Choose a gentle exercise routine such as walking, stretching, or chair mobility work.',
        'Keep medicines organized and review them regularly with a healthcare provider.',
        'Staying connected with family and community helps emotional well-being.'
      ]
    };
  }

  if (stage === 'caregiver') {
    return {
      title: 'Caregiver guidance',
      tips: [
        'Track medication, meals, hydration, and sleep with a simple daily checklist.',
        'Watch for changes in mood, energy, or appetite and report concerns early.',
        'Take regular breaks so you can provide calm, consistent care.',
        'Keep emergency contacts and a care plan in an easy-to-access place.'
      ]
    };
  }

  return {
    title: 'Healthy recommendations for adults',
    tips: [
      'Try to eat balanced meals and avoid long periods without food or water.',
      'Build a realistic exercise routine such as walking, stretching, or strength work.',
      'Keep a regular sleep schedule and pay attention to stress levels.',
      'Protect your mental health by taking breaks, staying connected, and, when needed, seeking support.'
    ]
  };
}

function buildResponse() {
  const name = nameInput.value.trim() || 'friend';
  const age = Number(ageInput.value) || 30;
  const stage = stageSelect.value;
  const goal = goalSelect.value;

  const stageAdvice = getTips(stage, goal, age);
  const goalText = {
    energy: 'Support energy with regular meals, hydration, and sleep.',
    sleep: 'Aim for a consistent bedtime and reduce screen use before sleep.',
    movement: 'Choose safe movement that matches comfort and ability.',
    nutrition: 'Focus on balanced meals and enough fluid intake each day.',
    mental: 'Prioritize calm routines, social connection, and stress reduction.',
    medication: 'Follow the prescribed schedule and consult a clinician if timing or side effects change.'
  }[goal];

  const safetyMessage = emergencySymptoms.some((symptom) => {
    return goalText.toLowerCase().includes(symptom) || age > 60;
  })
    ? '<div class="warning">If there is sudden chest pain, severe breathing problems, confusion, fainting, or a major injury, seek urgent medical care or emergency help immediately.</div>'
    : '';

  const generated = `
    <h3>Health guidance for ${name}</h3>
    <p>${name} is ${age} years old and this support is tailored ${ageGroupText(age, stage)}.</p>
    <p><strong>Current focus:</strong> ${goalText}</p>
    <h3>${stageAdvice.title}</h3>
    <ul>
      ${stageAdvice.tips.map((tip) => `<li>${tip}</li>`).join('')}
    </ul>
    <p><strong>Daily reminder:</strong> Small consistent habits matter more than perfection.</p>
    ${safetyMessage}
  `;

  output.innerHTML = generated;
}

function loadSample() {
  nameInput.value = 'Asha';
  ageInput.value = 68;
  stageSelect.value = 'senior';
  goalSelect.value = 'nutrition';
  buildResponse();
}

generateBtn.addEventListener('click', buildResponse);
sampleBtn.addEventListener('click', loadSample);

loadSample();
