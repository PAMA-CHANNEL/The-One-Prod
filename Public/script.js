// Traductions pour les textes statiques
const translations = {
  en: {
    logoText: "THE ONE PROD",
    categoriesBtn: "Categories",
    modalTitle: "Check Out All Amazing Software Categories For",
    catAndroid: "Android Apps",
    catEbooks: "E‑Books",
    catMacos: "MacOS",
    catWindows: "Windows",
    catVideo: "Video Courses",
    catPcGames: "PC Games",
    catAndroidGames: "Android Games",
    primaryCategories: "Primary Categories",
    subCategories: "Sub Categories",
    filterAll: "All",
    filterNewItem: "New Item",
    filterRecentUpdate: "Recent Update",
    rating: "Rating",
    download: "Download",
    selectedCategory: "Selected Category",
    viewAll: "View All",
    footerDownloadSoftware: "Download Software",
    footerSupportCenter: "Support Center",
    footerCompanyInfo: "Company Info",
    footerDownloadOS: "Download Operating Systems",
    footerCommonIssues: "Common Issues",
    footerPartners: "Partners",
    terms: "Terms",
    cookiesPolicy: "Cookies Policy",
    privacyPolicy: "Privacy Policy",
    footerCredit: "© 2025 TheOnePRO. All rights reserved."
  },
  fr: {
    logoText: "THE ONE PROD",
    categoriesBtn: "Catégories",
    modalTitle: "Découvrez tous les logiciels incroyables pour",
    catAndroid: "Applications Android",
    catEbooks: "E‑Books",
    catMacos: "MacOS",
    catWindows: "Windows",
    catVideo: "Cours Vidéo",
    catPcGames: "Jeux PC",
    catAndroidGames: "Jeux Android",
    primaryCategories: "Catégories Principales",
    subCategories: "Sous‑Catégories",
    filterAll: "Tout",
    filterNewItem: "Nouveautés",
    filterRecentUpdate: "Récents",
    rating: "Note",
    download: "Téléchargement",
    selectedCategory: "Catégorie Sélectionnée",
    viewAll: "Voir Tout",
    footerDownloadSoftware: "Télécharger des Logiciels",
    footerSupportCenter: "Centre d'Assistance",
    footerCompanyInfo: "Infos Entreprise",
    footerDownloadOS: "Télécharger des Systèmes d'Exploitation",
    footerCommonIssues: "Problèmes Courants",
    footerPartners: "Partenaires",
    terms: "Conditions",
    cookiesPolicy: "Politique de Cookies",
    privacyPolicy: "Politique de Confidentialité",
    footerCredit: "© 2025 TheOnePRO. Tous droits réservés."
  }
};

// Appliquer la langue sur tous les éléments munis de data-key
function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Appliquer la langue par défaut
  const languageSelector = document.getElementById('languageSelector');
  setLanguage(languageSelector.value);
  languageSelector.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });

  // Animation du logo
  gsap.from(".logo-text", { duration: 1.5, opacity: 0, y: -50, ease: "back.out(1.7)" });

  // Mode sombre
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', toggleDarkMode);
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // Gestion de la modale Categories
  const categoriesBtn = document.getElementById('categoriesBtn');
  const categoriesModal = document.getElementById('categoriesModal');
  const closeModal = document.getElementById('closeModal');
  categoriesBtn.addEventListener('click', () => {
    categoriesModal.style.display = 'block';
    gsap.fromTo('.modal-content', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
  });
  closeModal.addEventListener('click', () => {
    gsap.to('.modal-content', { y: -50, opacity: 0, duration: 0.5, onComplete: () => {
      categoriesModal.style.display = 'none';
    }});
  });
  window.addEventListener('click', (e) => {
    if (e.target === categoriesModal) {
      gsap.to('.modal-content', { y: -50, opacity: 0, duration: 0.5, onComplete: () => {
        categoriesModal.style.display = 'none';
      }});
    }
  });

  // Mise à jour du titre de la modale lors de la sélection d'une catégorie
  document.querySelectorAll('.cat-option').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-cat');
      const lang = languageSelector.value;
      const modalTitle = document.getElementById('modalTitle');
      modalTitle.textContent = `${translations[lang].modalTitle} ${button.textContent.trim()}`;
      populateCategoryDetails(category);
      // Mise à jour du main
      document.getElementById('selectedCategoryTitle').textContent = button.textContent.trim();
      populateSubCategories(category);
      loadCategoryItems(category);
    });
  });

  // Gestion du clic sur Primary Categories
  document.querySelectorAll('#primaryCategories li').forEach(item => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-cat');
      document.getElementById('selectedCategoryTitle').textContent = item.textContent.trim();
      // Marquer l'élément sélectionné
      document.querySelectorAll('#primaryCategories li').forEach(li => li.classList.remove('selected'));
      item.classList.add('selected');
      populateSubCategories(category);
      loadCategoryItems(category);
    });
  });

  // Gestion des filtres
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filterType = btn.getAttribute("data-key") || btn.textContent.trim();
      applyFilter(filterType);
    });
  });
  document.querySelectorAll('.dropdown-content button').forEach(btn => {
    btn.addEventListener('click', () => {
      const filterType = btn.getAttribute("data-filter");
      applyFilter(filterType);
    });
  });

  // Bouton "View All" : affiche la section contenant Primary & Sub Categories
  const viewAllBtn = document.getElementById('viewAllBtn');
  viewAllBtn.addEventListener('click', () => {
    const container = document.getElementById('categoriesContainer');
    container.style.display = 'flex';
  });

  // --- ADMIN LOGIN ET UPLOAD MUSIC ---

  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const closeAdminLogin = document.getElementById('closeAdminLogin');
  adminLoginBtn.addEventListener('click', () => {
    adminLoginModal.style.display = 'block';
    gsap.fromTo('#adminLoginModal .modal-content', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
  });
  closeAdminLogin.addEventListener('click', () => {
    gsap.to('#adminLoginModal .modal-content', { y: -50, opacity: 0, duration: 0.5, onComplete: () => {
      adminLoginModal.style.display = 'none';
    }});
  });
  window.addEventListener('click', (e) => {
    if (e.target === adminLoginModal) {
      gsap.to('#adminLoginModal .modal-content', { y: -50, opacity: 0, duration: 0.5, onComplete: () => {
        adminLoginModal.style.display = 'none';
      }});
    }
  });

  // Traitement du formulaire admin login
  const adminLoginForm = document.getElementById('adminLoginForm');
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    // Identifiants d'exemple (à adapter en production)
    if(username === "admin" && password === "password123"){
      localStorage.setItem("adminLogged", "true");
      adminLoginModal.style.display = 'none';
      adminLoginBtn.style.display = 'none';
      document.getElementById('uploadMusicBtn').style.display = 'inline-block';
      showNotification("Admin connected");
    } else {
      showNotification("Invalid credentials");
    }
  });

  // Gestion de l'upload music
  const uploadMusicBtn = document.getElementById('uploadMusicBtn');
  const musicUploadModal = document.getElementById('musicUploadModal');
  const closeMusicUpload = document.getElementById('closeMusicUpload');
  uploadMusicBtn.addEventListener('click', () => {
    musicUploadModal.style.display = 'block';
    gsap.fromTo('#musicUploadModal .modal-content', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
  });
  closeMusicUpload.addEventListener('click', () => {
    gsap.to('#musicUploadModal .modal-content', { y: -50, opacity: 0, duration: 0.5, onComplete: () => {
      musicUploadModal.style.display = 'none';
    }});
  });
  window.addEventListener('click', (e) => {
    if (e.target === musicUploadModal) {
      gsap.to('#musicUploadModal .modal-content', { y: -50, opacity: 0, duration: 0.5, onComplete: () => {
        musicUploadModal.style.display = 'none';
      }});
    }
  });
  
  const musicUploadForm = document.getElementById('musicUploadForm');
  musicUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Ici, vous pourriez envoyer les données à votre serveur pour approbation
    showNotification("Music submitted for approval");
    musicUploadModal.style.display = 'none';
    musicUploadForm.reset();
  });
});

// Mode sombre
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

// Filtrage fictif (à adapter)
function applyFilter(filterType) {
  console.log("Filtre appliqué :", filterType);
  const itemsContainer = document.getElementById('itemsContainer');
  itemsContainer.innerHTML = `<p style="text-align:center;">Filtered by: ${filterType}</p>`;
}

// Recherche fictive
function filterResults() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const files = ['Software 1', 'Game 1', 'Android App 1', 'eBook 1', 'Music 1', 'Movie 1'];
  const filtered = files.filter(file => file.toLowerCase().includes(query));
  console.log("Search results:", filtered);
}

// Affichage d'une notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 5000);
}

// Remplit le contenu de la modale pour une catégorie
function populateCategoryDetails(category) {
  const detailsContainer = document.getElementById('categoryDetails');
  detailsContainer.innerHTML = '';
  const categoryData = {
    'android-apps': {
      primary: 'Android Apps',
      sub: ['Apps', 'Tools & Utilities', 'Productivity', 'News & Weather', 'Fitness & Health', 'Antivirus & Security', 'Wireless & Network Tools', 'Educational', 'Audio & Music', 'Photography & Design', 'Entertainment', 'Maps & GPS', 'Communication', 'Video Editor', 'Mobile Browsers']
    },
    'ebooks': {
      primary: 'E‑Books',
      sub: ['Art & Photography', 'Business & Investing', 'Computers & Technology', 'Crafts & Hobbies', 'Educational & Learning', 'Food & Drink', 'Health & Wellness', 'History', 'Literature & Fiction', 'Magazine']
    },
    'macos': {
      primary: 'MacOS',
      sub: ['Audio & Music', 'Backup & Restore', 'Data Recovery', 'Developer Tools', 'Download Managers', 'Educational & Business', 'Engineering & Simulation', 'Graphics Editors', 'Mobile Phone Utilities', 'Multimedia Tools', 'Office & PDF', 'Tools & Utilities', 'Video Editors', 'Web & Programming']
    },
    'windows': {
      primary: 'Windows',
      sub: ['Antivirus & Security', 'Audio & Music', 'Backup & Recovery', 'Data Recovery', 'Desktop Enhancement', 'Developer Tools', 'Download Managers', 'Drivers Firmware', 'Educational & Business', 'Engineering & Simulation', 'File Compression', 'Gaming Tools', 'Graphics & Design', 'Hard Disk Tools', 'Internet Utilities', 'Mobile Phone Utilities', 'Multimedia', 'Network & WiFi', 'Office & PDF', 'Operating System', 'Tools & Utilities', 'Video Editors', 'Web Programming', 'Web Browsers']
    },
    'video-courses': {
      primary: 'Video Courses',
      sub: ['IT Software', 'Teaching & Academics', 'Developer', 'Business', 'Lifestyle', 'Design', 'Personal Development', 'Health & Fitness', 'Office Productivity', 'Marketing', 'Photo & Film']
    },
    'pc-games': {
      primary: 'PC Games',
      sub: ['Action', 'Adventure', 'Casual', 'Indie', 'Racing', 'RPG', 'Simulation', 'Sports', 'Strategy']
    },
    'android-games': {
      primary: 'Android Games',
      sub: ['Action', 'Adventure', 'Casual', 'Indie', 'Racing', 'Role Playing', 'Sports', 'Strategy', 'Card', 'Simulation', 'Arcade', 'Puzzle', 'Board', 'Music', 'Educational']
    }
  };

  if (categoryData[category]) {
    const data = categoryData[category];
    const primaryEl = document.createElement('h3');
    primaryEl.textContent = data.primary;
    detailsContainer.appendChild(primaryEl);
    const subList = document.createElement('ul');
    data.sub.forEach(subItem => {
      const li = document.createElement('li');
      li.textContent = subItem;
      subList.appendChild(li);
    });
    detailsContainer.appendChild(subList);
  }
}

// Remplit les sous-catégories (avec cases à cocher et animations)
function populateSubCategories(category) {
  const subCatContainer = document.getElementById('subCategories');
  subCatContainer.innerHTML = '';
  const categoryData = {
    'android-apps': ['Apps', 'Tools & Utilities', 'Productivity', 'News & Weather', 'Fitness & Health', 'Antivirus & Security', 'Wireless & Network Tools', 'Educational', 'Audio & Music', 'Photography & Design', 'Entertainment', 'Maps & GPS', 'Communication', 'Video Editor', 'Mobile Browsers'],
    'ebooks': ['Art & Photography', 'Business & Investing', 'Computers & Technology', 'Crafts & Hobbies', 'Educational & Learning', 'Food & Drink', 'Health & Wellness', 'History', 'Literature & Fiction', 'Magazine'],
    'macos': ['Audio & Music', 'Backup & Restore', 'Data Recovery', 'Developer Tools', 'Download Managers', 'Educational & Business', 'Engineering & Simulation', 'Graphics Editors', 'Mobile Phone Utilities', 'Multimedia Tools', 'Office & PDF', 'Tools & Utilities', 'Video Editors', 'Web & Programming'],
    'windows': ['Antivirus & Security', 'Audio & Music', 'Backup & Recovery', 'Data Recovery', 'Desktop Enhancement', 'Developer Tools', 'Download Managers', 'Drivers Firmware', 'Educational & Business', 'Engineering & Simulation', 'File Compression', 'Gaming Tools', 'Graphics & Design', 'Hard Disk Tools', 'Internet Utilities', 'Mobile Phone Utilities', 'Multimedia', 'Network & WiFi', 'Office & PDF', 'Operating System', 'Tools & Utilities', 'Video Editors', 'Web Programming', 'Web Browsers'],
    'video-courses': ['IT Software', 'Teaching & Academics', 'Developer', 'Business', 'Lifestyle', 'Design', 'Personal Development', 'Health & Fitness', 'Office Productivity', 'Marketing', 'Photo & Film'],
    'pc-games': ['Action', 'Adventure', 'Casual', 'Indie', 'Racing', 'RPG', 'Simulation', 'Sports', 'Strategy'],
    'android-games': ['Action', 'Adventure', 'Casual', 'Indie', 'Racing', 'Role Playing', 'Sports', 'Strategy', 'Card', 'Simulation', 'Arcade', 'Puzzle', 'Board', 'Music', 'Educational']
  };

  if (categoryData[category]) {
    categoryData[category].forEach((sub, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<label class="sub-category-item">
          <input type="checkbox" id="sub-${category}-${index}">
          <i class="fas fa-check-square"></i>
          <span>${sub}</span>
        </label>`;
      subCatContainer.appendChild(li);
      gsap.from(li, { opacity: 0, duration: 0.4, delay: index * 0.1 });
    });
  }
}

// Charge des items dans la partie droite
function loadCategoryItems(category) {
  const itemsContainer = document.getElementById('itemsContainer');
  itemsContainer.innerHTML = '';
  for (let i = 1; i <= 4; i++) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    let iconHTML = category === 'windows' ? '<i class="ion-logo-windows"></i>' : '<i class="fas fa-box"></i>';
    itemDiv.innerHTML = `${iconHTML}<p>${category} Item ${i}</p>`;
    gsap.from(itemDiv, { opacity: 0, scale: 0.8, duration: 0.3 });
    itemsContainer.appendChild(itemDiv);
  }
}

// Charge tous les items (exemple)
function loadAllItems() {
  const itemsContainer = document.getElementById('itemsContainer');
  itemsContainer.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    let iconHTML = '<i class="fas fa-box-open"></i>';
    itemDiv.innerHTML = `${iconHTML}<p>All Items: Item ${i}</p>`;
    gsap.from(itemDiv, { opacity: 0, y: 20, duration: 0.3 });
    itemsContainer.appendChild(itemDiv);
  }
}
