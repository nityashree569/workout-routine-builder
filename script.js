const muscleSelect = document.getElementById('muscle-group');
const workoutSelect = document.getElementById('workout');
const workoutOptions = document.getElementById('workout-options');
const routineList = document.getElementById('routine-list');
const addBtn = document.getElementById('add-btn');

const workouts = {
  chest: ['Bench Press','Incline-Dumbell press', 'Decline-Pree', 'Chest Fly','Pec-Dec Fly'],
  legs: ['Squats','Leg-press','Leg-Extension', 'Lunges', 'Hamstrings'],
  back: ['Pull-ups','Barbell-rowing', 'Deadlift', 'Lat Pulldown','T-bar'],
  arms: ['Bicep Curls','Tricep-Pushdown', 'Tricep Dips','Pitcher-Curls', 'Hammer Curls','Tricep-Kickbacks']
};

muscleSelect.addEventListener('change', () => {
  const group = muscleSelect.value;
  if (group && workouts[group]) {
    workoutSelect.innerHTML = workouts[group].map(w => `<option>${w}</option>`).join('');
    workoutOptions.classList.remove('hidden');
  } else {
    workoutOptions.classList.add('hidden');
  }
});

addBtn.addEventListener('click', () => {
  const muscle = muscleSelect.value;
  const workout = workoutSelect.value;
  const sets = document.getElementById('sets').value;
  const reps = document.getElementById('reps').value;
  const day = document.getElementById('day').value;

  if (workout && sets && reps && day) {
    const item = document.createElement('li');
    item.textContent = `${day}: ${workout} - ${sets} sets x ${reps} reps`;
    routineList.appendChild(item);

    saveToLocalStorage(item.textContent);
  }
});

function saveToLocalStorage(entry) {
  const old = JSON.parse(localStorage.getItem('routine') || '[]');
  old.push(entry);
  localStorage.setItem('routine', JSON.stringify(old));
}

function loadRoutine() {
  const data = JSON.parse(localStorage.getItem('routine') || '[]');
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    routineList.appendChild(li);
  });
}

window.onload = loadRoutine;
