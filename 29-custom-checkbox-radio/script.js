const form = document.getElementById('custom-form');
const skillsList = document.getElementById('skills-list');
const levelSelected = document.getElementById('level-selected');

form.addEventListener('change', () => {
    // Skills (Checkboxes)
    const checkedSkills = Array.from(form.querySelectorAll('input[name="skills"]:checked'))
        .map(input => input.value);
    
    skillsList.textContent = checkedSkills.length > 0 ? checkedSkills.join(', ') : 'Belum ada';

    // Level (Radio)
    const selectedLevel = form.querySelector('input[name="level"]:checked');
    levelSelected.textContent = selectedLevel ? selectedLevel.value : 'Belum dipilih';
});
