const startDate = new Date('2023-10-21');
const timerElement = document.getElementById('timer');
const achievementList = document.getElementById('achievement-list');

// Elementos do pop-up
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupIcon = document.getElementById('popup-icon');
const popupDate = document.getElementById('popup-date');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

// Atualizar Cronômetro
function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timerElement.textContent = `${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

setInterval(updateTimer, 1000);

// Botão de resgatar achievement
const resgatarAchievementButton = document.getElementById('resgatar-achievement');

// Função para verificar se é o dia 21
function verificarDia() {
  const hoje = new Date();
  const dia = hoje.getDate();

  if (dia === 21) {
    // Exibe mensagem de sucesso
    popupTitle.textContent = "Parabéns!";
    popupIcon.src = "images/success-icon.png"; // Substitua pelo ícone desejado
    popupDate.textContent = `Achievement do dia 21 desbloqueado: ${hoje.toLocaleDateString('pt-BR')}`;
    popupMessage.textContent = "Você conseguiu o achievement deste mês. Continue acompanhando!";
  } else {
    // Exibe mensagem de espera
    popupTitle.textContent = "Aguarde";
    popupIcon.src = "images/wait-icon.png"; // Substitua pelo ícone desejado
    popupDate.textContent = `Hoje é ${hoje.toLocaleDateString('pt-BR')}`;
    popupMessage.textContent = "Você só pode resgatar achievements no dia 21. Volte depois!";
  }

  popup.classList.remove('hidden');
}

// Adicionar evento ao botão
resgatarAchievementButton.addEventListener('click', verificarDia);

// Renderizar Achievements
const totalAchievements = 50;
const achievementNames = [
  "21/10/2023", "21/11/2023", "21/12/2023", "21/01/2024",
  "21/02/2024", "21/03/2024", "21/04/2024", "21/05/2024",
  "21/06/2024", "21/07/2024", "21/08/2024", "21/09/2024",
  "21/10/2024", "21/11/2024", "21/12/2024"
];
const achievements = [];

for (let i = 0; i < totalAchievements; i++) {
  const achievement = {
    unlocked: i < achievementNames.length,
    date: new Date(startDate.getFullYear(), startDate.getMonth() + i, 21),
    icon: i < achievementNames.length ? `achievements/${i + 1}.png` : 'images/question.png',
    name: i < achievementNames.length ? achievementNames[i] : 'Locked'
  };
  achievements.push(achievement);
}

achievements.forEach((ach) => {
  const div = document.createElement('div');
  div.classList.add('achievement');
  if (!ach.unlocked) div.classList.add('locked');

  const img = document.createElement('img');
  img.src = ach.icon;

  const span = document.createElement('span');
  span.textContent = ach.name;

  div.appendChild(img);
  div.appendChild(span);
  achievementList.appendChild(div);
});

// Função para abrir o pop-up
function openPopup(achievement) {
  popupTitle.textContent = achievement.name;
  popupIcon.src = achievement.icon;
  popupDate.textContent = `Desbloqueado em: ${achievement.date.toLocaleDateString('pt-BR')}`;
  popupMessage.textContent = achievement.unlocked
    ? "Parabéns! Você desbloqueou este achievement."
    : "Este achievement ainda está bloqueado. Continue acompanhando!";

  popup.classList.remove('hidden');
}

// Evento para fechar o pop-up
popupClose.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Adicionar eventos aos achievements
document.addEventListener('DOMContentLoaded', () => {
  const achievementElements = document.querySelectorAll('.achievement');
  achievementElements.forEach((div, index) => {
    div.addEventListener('click', () => {
      openPopup(achievements[index]);
    });
  });
});
