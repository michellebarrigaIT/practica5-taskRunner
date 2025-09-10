function initCounter() {
  const btn = document.getElementById('click-btn');
  const counterEl = document.getElementById('counter');

  let count = Number(localStorage.getItem('clickCount') || 0);
  counterEl.textContent = count;

  const update = () => {
    counterEl.textContent = count;
    localStorage.setItem('clickCount', count);
  };

  btn.addEventListener('click', () => {
    count += 1;
    update();
  });
}

document.addEventListener('DOMContentLoaded', initCounter);
