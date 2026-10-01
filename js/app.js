// Mock Database for DocStudy - Real Algerian University Resources
let documents = [
  {
    id: 1,
    title: "Examen Génie Logiciel – Session Juin 2024",
    type: "Examen",
    module: "Génie Logiciel",
    university: "Badji Mokhtar",
    faculty: "Informatique",
    specialty: "Systèmes Informatiques",
    year: "L3",
    academicYear: "2023/2024",
    downloads: 342,
    rating: 4.8,
    status: "approved",
    contributor: "Amin Mahieddine",
    author: "Amin Mahieddine",
    points: 50,
    date: "2024-06-12",
    description: "Sujet de l'examen final de Génie Logiciel pour les étudiants de L3 Informatique. Contient des exercices d'UML et de design patterns."
  },
  {
    id: 2,
    title: "TD Réseaux de communication – Adressage IP & Sous-réseaux",
    type: "TD",
    module: "Réseaux",
    university: "USTHB",
    faculty: "Sciences",
    specialty: "Réseaux",
    year: "L2",
    academicYear: "2023/2024",
    downloads: 189,
    rating: 4.5,
    status: "approved",
    contributor: "Sara Benmoussa",
    author: "Sara Benmoussa",
    points: 50,
    date: "2024-06-11",
    description: "Série d'exercices sur l'adressage IP (IPv4, CIDR, Masque de sous-réseau) avec corrections détaillées."
  },
  {
    id: 3,
    title: "TP Chimie Organique – Synthèse de l'aspirine",
    type: "TP",
    module: "Chimie",
    university: "Constantine",
    faculty: "Sciences",
    specialty: "Chimie Appliquée",
    year: "L1",
    academicYear: "2023/2024",
    downloads: 98,
    rating: 4.2,
    status: "approved",
    contributor: "Karim Rahmouni",
    author: "Karim Rahmouni",
    points: 50,
    date: "2024-06-10",
    description: "Compte rendu complet du TP de chimie organique sur la synthèse de l'acide acétylsalicylique (aspirine) avec calcul de rendement."
  },
  {
    id: 4,
    title: "Cours Algorithmique et Structure de Données en C",
    type: "Cours",
    module: "Algorithmique",
    university: "Oran",
    faculty: "Informatique",
    specialty: "Génie Logiciel",
    year: "L1",
    academicYear: "2024/2025",
    downloads: 512,
    rating: 4.9,
    status: "approved",
    contributor: "Nawel Amrani",
    author: "Nawel Amrani",
    points: 50,
    date: "2024-06-08",
    description: "Support de cours détaillé sur les structures de données dynamiques (listes chaînées, piles, files, arbres binaires) avec exemples en C."
  },
  {
    id: 5,
    title: "Résumé d'Algèbre 2 – Espaces Vectoriels & Matrices",
    type: "Résumé",
    module: "Algèbre 2",
    university: "USTHB",
    faculty: "Sciences",
    specialty: "Mathématiques",
    year: "L1",
    academicYear: "2023/2024",
    downloads: 410,
    rating: 4.7,
    status: "approved",
    contributor: "Amin Mahieddine",
    author: "Amin Mahieddine",
    points: 50,
    date: "2024-06-05",
    description: "Fiche récapitulative complète d'algèbre linéaire contenant toutes les définitions clés, théorèmes et exemples résolus d'espaces vectoriels."
  },
  {
    id: 6,
    title: "PFE – Conception d'une Plateforme Universitaire Moderne",
    type: "PFE",
    module: "Projet Fin d'Études",
    university: "Badji Mokhtar",
    faculty: "Informatique",
    specialty: "Génie Logiciel",
    year: "M2",
    academicYear: "2023/2024",
    downloads: 145,
    rating: 4.6,
    status: "approved",
    contributor: "Amin Mahieddine",
    author: "Amin Mahieddine",
    points: 100,
    date: "2024-05-30",
    description: "Mémoire de fin d'études de Master 2 sur la conception et réalisation d'une plateforme d'apprentissage en ligne moderne."
  },
  {
    id: 7,
    title: "Cours Sécurité Informatique et Cryptographie SSL/TLS",
    type: "Cours",
    module: "Sécurité",
    university: "Badji Mokhtar",
    faculty: "Informatique",
    specialty: "Systèmes Informatiques",
    year: "L3",
    academicYear: "2024/2025",
    downloads: 12,
    rating: 4.8,
    status: "pending",
    contributor: "Amin Mahieddine",
    author: "Amin Mahieddine",
    points: 50,
    date: "2026-06-12",
    description: "Introduction à la cryptographie symétrique et asymétrique, protocoles SSL/TLS et vulnérabilités courantes."
  },
  {
    id: 8,
    title: "TD Analyse L2 – Séries Numériques & Intégrales",
    type: "TD",
    module: "Analyse",
    university: "USTHB",
    faculty: "Sciences",
    specialty: "Mathématiques",
    year: "L2",
    academicYear: "2024/2025",
    downloads: 8,
    rating: 4.5,
    status: "pending",
    contributor: "Youssef Khelil",
    author: "Youssef Khelil",
    points: 50,
    date: "2026-06-11",
    description: "Série d'exercices sur la convergence des séries numériques à termes positifs et des séries alternées."
  }
];

// ===== CRYPTOGRAPHIC HASH HELPER (SHA-256) =====
async function hashPassword(str) {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    try {
      const msgUint8 = new TextEncoder().encode(str + "_docstudy_salt_dz");
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    } catch (e) {
      console.warn("Crypto API fallback", e);
    }
  }
  // Deterministic fallback hash
  let hash = 5381;
  const salted = str + "_docstudy_salt_dz";
  for (let i = 0; i < salted.length; i++) {
    hash = ((hash << 5) + hash) + salted.charCodeAt(i);
    hash = hash & hash;
  }
  return "sha256_" + Math.abs(hash).toString(16);
}

// Student Accounts Database (with encrypted password hashes)
let defaultStudentsList = [
  {
    id: 1,
    firstname: "Amin",
    lastname: "Mahieddine",
    email: "amin.mahieddine@univ-annaba.dz",
    passwordHash: "default_hash",
    university: "Univ. Badji Mokhtar (Annaba)",
    specialty: "L3 Systèmes Informatiques",
    points: 1240,
    status: "active",
    uploadsCount: 4
  },
  {
    id: 2,
    firstname: "Sara",
    lastname: "Benmoussa",
    email: "sara.benmoussa@usthb.dz",
    passwordHash: "default_hash",
    university: "USTHB (Alger)",
    specialty: "L2 Réseaux & Télécoms",
    points: 850,
    status: "active",
    uploadsCount: 2
  },
  {
    id: 3,
    firstname: "Youssef",
    lastname: "Khelil",
    email: "youssef.khelil@univ-constantine.dz",
    passwordHash: "default_hash",
    university: "Univ. Constantine 2",
    specialty: "L2 Mathématiques",
    points: 420,
    status: "active",
    uploadsCount: 1
  },
  {
    id: 4,
    firstname: "Nawel",
    lastname: "Amrani",
    email: "nawel.amrani@univ-oran.dz",
    passwordHash: "default_hash",
    university: "Univ. Oran 1",
    specialty: "L1 Informatique",
    points: 620,
    status: "active",
    uploadsCount: 1
  }
];

let studentsList = defaultStudentsList;
let favorites = [1, 5];
let uploadedFile = null;

// LocalStorage helpers for persistence
function saveStateToStorage() {
  try {
    localStorage.setItem("docstudy_students", JSON.stringify(studentsList));
    localStorage.setItem("docstudy_docs", JSON.stringify(documents));
    localStorage.setItem("docstudy_favs", JSON.stringify(favorites));
    if (currentUser.isLoggedIn) {
      localStorage.setItem("docstudy_session", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("docstudy_session");
    }
  } catch (e) {
    console.warn("Storage save error", e);
  }
}

function loadStateFromStorage() {
  try {
    const savedStudents = localStorage.getItem("docstudy_students");
    if (savedStudents) studentsList = JSON.parse(savedStudents);

    const savedDocs = localStorage.getItem("docstudy_docs");
    if (savedDocs) documents = JSON.parse(savedDocs);

    const savedFavs = localStorage.getItem("docstudy_favs");
    if (savedFavs) favorites = JSON.parse(savedFavs);

    const savedSession = localStorage.getItem("docstudy_session");
    if (savedSession) {
      currentUser = JSON.parse(savedSession);
    }
  } catch (e) {
    console.warn("Storage load error", e);
  }
}

// Active User Session State
let currentUser = {
  isLoggedIn: false,
  role: "visitor",
  firstname: "",
  lastname: "",
  email: "",
  avatar: null,
  university: "",
  faculty: "",
  specialty: "",
  year: "",
  points: 0,
  uploadsCount: 0,
  downloadsCount: 0
};

// Router History Tracking
let viewHistory = ['home'];

function showView(viewId) {
  const views = document.querySelectorAll(".view");
  views.forEach(v => v.classList.remove("active"));
  
  const target = document.getElementById("view-" + viewId);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (viewHistory[viewHistory.length - 1] !== viewId) {
    viewHistory.push(viewId);
    if (viewHistory.length > 20) viewHistory.shift();
  }

  if (viewId === 'dashboard') {
    renderDashboard();
  } else if (viewId === 'admin') {
    renderAdmin();
  } else if (viewId === 'browse') {
    renderBrowseDocs();
  } else if (viewId === 'profile') {
    renderProfile();
  }
}

function goBack() {
  if (viewHistory.length > 1) {
    viewHistory.pop();
    const prev = viewHistory[viewHistory.length - 1];
    const views = document.querySelectorAll(".view");
    views.forEach(v => v.classList.remove("active"));
    const target = document.getElementById("view-" + prev);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } else {
    showView('home');
  }
}

function goToHome() {
  showView('home');
}

// Toast Notifications
function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  if (!toast || !toastMsg) return;

  toastMsg.innerText = msg;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.className = "toast";
  }, 3500);
}

// Header & Session Sync
function updateUserSessionUI() {
  const actionsContainer = document.getElementById("navbar-actions-container");
  if (!actionsContainer) return;

  if (currentUser.isLoggedIn) {
    if (currentUser.role === 'admin') {
      actionsContainer.innerHTML = `
        <button class="nav-btn-text" onclick="showView('admin')" style="font-weight:700;"><i class="ti ti-shield-lock"></i> Panneau Admin</button>
        <button class="btn btn-outline" style="padding: 5px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;" onclick="doLogout()"><i class="ti ti-logout"></i> Déconnexion</button>
      `;
    } else {
      actionsContainer.innerHTML = `
        <button class="nav-btn-text" onclick="showView('browse')"><i class="ti ti-compass"></i> Explorer</button>
        <button class="nav-btn-text" onclick="showView('upload')"><i class="ti ti-upload"></i> Déposer</button>
        <button class="nav-btn-text" onclick="showView('dashboard')"><i class="ti ti-bookmark"></i> Enregistrés</button>
        <div onclick="showView('profile')" style="display: flex; align-items: center; gap: 8px; padding: 4px 10px; border-radius: 20px; border: 1.5px solid var(--border); cursor: pointer; background: #FFFFFF; transition: all 0.2s;" title="Mon Compte">
          ${currentUser.avatar 
            ? `<img src="${currentUser.avatar}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--primary);">`
            : `<div style="width: 24px; height: 24px; border-radius: 50%; background: var(--gradient-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 10px;">
                ${currentUser.firstname ? currentUser.firstname.substring(0,2).toUpperCase() : 'ET'}
              </div>`
          }
          <span style="font-size: 12px; font-weight: 700; color: #0F172A;">${currentUser.firstname || 'Compte'}</span>
        </div>
        <button class="btn btn-outline" style="padding: 5px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px; color: var(--danger); border-color: #FECACA;" onclick="doLogout()" title="Se déconnecter"><i class="ti ti-logout"></i> Déconnexion</button>
      `;
    }
  } else {
    actionsContainer.innerHTML = `
      <button class="nav-btn-text" onclick="showView('browse')"><i class="ti ti-compass"></i> Explorer</button>
      <button class="nav-btn-text" onclick="showView('login-student')"><i class="ti ti-upload"></i> Déposer</button>
      <button class="btn btn-outline" onclick="showView('login-student')">Connexion</button>
      <button class="btn btn-primary" onclick="showView('register-student')">Créer un compte</button>
    `;
  }
}

// Admin credentials
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

// User Authentication Flow
async function doLogin() {
  const emailInput = document.getElementById("login-email-student");
  const emailVal = emailInput ? emailInput.value.trim() : "";
  const passwordInput = document.getElementById("login-password-student");
  const passVal = passwordInput ? passwordInput.value : "";

  if (!emailVal || !passVal) {
    showToast("Veuillez remplir votre email et mot de passe.", "error");
    return;
  }

  // 1. Admin Authentication Check
  if (emailVal.toLowerCase() === ADMIN_EMAIL && passVal === ADMIN_PASSWORD) {
    currentUser = {
      isLoggedIn: true,
      role: "admin",
      firstname: "Admin",
      lastname: "DocStudy",
      email: emailVal,
      university: "Administration Centrale",
      faculty: "Direction",
      specialty: "Gestionnaire",
      year: "Admin",
      points: 9999,
      uploadsCount: documents.length,
      downloadsCount: 0
    };

    saveStateToStorage();
    updateUserSessionUI();
    showView("admin");
    showToast("Connexion Admin réussie ! Bienvenue dans le panneau de contrôle.", "success");
    return;
  }

  // 2. Student Authentication Check
  const hashedInputPass = await hashPassword(passVal);
  const defaultHash123456 = await hashPassword("123456");

  const student = studentsList.find(s => s.email.toLowerCase() === emailVal.toLowerCase());
  
  if (!student) {
    showToast("Aucun compte trouvé avec cet email. Veuillez créer un compte.", "error");
    return;
  }

  if (student.status === "suspended") {
    showToast("Ce compte a été suspendu par l'administrateur.", "error");
    return;
  }

  // Verify password hash (supports newly created accounts and default pre-registered accounts)
  const isPasswordValid = (student.passwordHash && student.passwordHash !== "default_hash")
    ? (student.passwordHash === hashedInputPass)
    : (passVal === "123456" || student.passwordHash === hashedInputPass || student.passwordHash === defaultHash123456);

  if (!isPasswordValid) {
    showToast("Mot de passe incorrect.", "error");
    return;
  }

  currentUser = {
    isLoggedIn: true,
    role: "student",
    firstname: student.firstname,
    lastname: student.lastname,
    email: student.email,
    avatar: student.avatar || null,
    university: student.university || "USTHB (Alger)",
    faculty: student.faculty || "Faculté Universitaire",
    specialty: student.specialty || "Licence Informatique",
    year: student.year || "L3",
    points: student.points || 100,
    uploadsCount: student.uploadsCount || 0,
    downloadsCount: 0
  };

  saveStateToStorage();
  updateUserSessionUI();
  showView("home");
  showToast(`Bienvenue ${currentUser.firstname} ! Connexion réussie`, "success");
}

// Student Registration with SHA-256 Encryption
async function doRegister() {
  const fnVal = document.getElementById("register-firstname")?.value.trim();
  const lnVal = document.getElementById("register-lastname")?.value.trim();
  const emVal = document.getElementById("register-email")?.value.trim();
  const uniVal = document.getElementById("register-uni")?.value;
  const passVal = document.getElementById("register-password")?.value;

  if (!fnVal || !lnVal || !emVal || !uniVal || !passVal) {
    showToast("Veuillez remplir tous les champs obligatoires.", "error");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emVal)) {
    showToast("Veuillez saisir une adresse email valide.", "error");
    return;
  }

  if (passVal.length < 6) {
    showToast("Le mot de passe doit contenir au moins 6 caractères.", "error");
    return;
  }

  // Check if email already registered
  const existingStudent = studentsList.find(s => s.email.toLowerCase() === emVal.toLowerCase());
  if (existingStudent || emVal.toLowerCase() === ADMIN_EMAIL) {
    showToast("Cette adresse email est déjà utilisée. Veuillez vous connecter.", "error");
    return;
  }

  // Cryptographic Password Hashing (SHA-256)
  const encryptedPasswordHash = await hashPassword(passVal);

  const newStudent = {
    id: Date.now(),
    firstname: fnVal,
    lastname: lnVal,
    email: emVal,
    passwordHash: encryptedPasswordHash,
    university: uniVal,
    specialty: "Licence / Master",
    points: 100,
    status: "active",
    uploadsCount: 0
  };

  studentsList.unshift(newStudent);

  currentUser = {
    isLoggedIn: true,
    role: "student",
    firstname: fnVal,
    lastname: lnVal,
    email: emVal,
    university: uniVal,
    faculty: "Faculté des Sciences",
    specialty: "Licence / Master",
    year: "L1",
    points: 100,
    uploadsCount: 0,
    downloadsCount: 0
  };

  // Clear registration form inputs
  const inputs = ["register-firstname", "register-lastname", "register-email", "register-password"];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  saveStateToStorage();
  updateUserSessionUI();
  showView("home");
  showToast(`Compte créé et sécurisé avec succès ! Bienvenue ${fnVal}`, "success");
}

function doLogout() {
  currentUser = {
    isLoggedIn: false,
    role: "visitor",
    firstname: "",
    lastname: "",
    email: "",
    avatar: null,
    university: "",
    faculty: "",
    specialty: "",
    year: "",
    points: 0,
    uploadsCount: 0,
    downloadsCount: 0
  };
  
  saveStateToStorage();
  updateUserSessionUI();
  showView("home");
  showToast("Vous avez été déconnecté.", "info");
}

// Dynamic Document Card Builder (Scribd-style)
function createDocCardHTML(doc) {
  const isFav = favorites.includes(doc.id);
  const viewsCount = doc.downloads ? (doc.downloads * 3 + 45) : 61;
  const authorName = doc.author || doc.contributor || "Étudiant";

  return `
    <div class="scribd-card" onclick="previewDoc(${doc.id}, event)">
      <div class="thumb-box">
        <span class="pdf-badge">PDF</span>
        <div class="paper-sheet">
          <div class="paper-sheet-title">${doc.type}</div>
          <div style="margin-top: 8px;">
            <div class="paper-sheet-line" style="width: 100%;"></div>
            <div class="paper-sheet-line" style="width: 80%;"></div>
            <div class="paper-sheet-line" style="width: 60%;"></div>
            <div class="paper-sheet-line" style="width: 90%;"></div>
            <div class="paper-sheet-line" style="width: 45%;"></div>
          </div>
        </div>
      </div>
      
      <div class="scribd-card-title">${doc.title}</div>
      <div class="scribd-card-author">Ajouté par ${authorName}</div>
      
      <div class="scribd-card-footer">
        <span>${viewsCount} vues</span>
        <i class="ti ti-bookmark${isFav ? '-filled active' : ''} bookmark-icon" onclick="toggleFavorite(${doc.id}, event)"></i>
      </div>
    </div>
  `;
}

// Render dynamic content for Scribd sections
function renderHomeDocs() {
  const approved = documents.filter(d => d.status === "approved");
  
  const homeGrid = document.getElementById("home-docs-grid");
  if (homeGrid) {
    homeGrid.innerHTML = approved.slice(0, 6).map(createDocCardHTML).join("");
  }

  const recGrid = document.getElementById("recommended-docs-grid");
  if (recGrid) {
    recGrid.innerHTML = approved.slice(1, 7).map(createDocCardHTML).join("");
  }

  const trendGrid = document.getElementById("trending-docs-grid");
  if (trendGrid) {
    trendGrid.innerHTML = approved.slice(0, 6).reverse().map(createDocCardHTML).join("");
  }
}

// Render Browse Grid
function renderBrowseDocs() {
  const browseGrid = document.getElementById("browse-docs-grid");
  if (!browseGrid) return;

  const approved = documents.filter(d => d.status === "approved");
  browseGrid.innerHTML = approved.map(createDocCardHTML).join("");
}

// ===== FILE SIZE FORMATTER UTILITY =====
function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 o";
  const units = ["o", "Ko", "Mo", "Go"];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return size.toFixed(i === 0 ? 0 : 1) + " " + units[i];
}

// ===== STUDENT PDF UPLOAD FROM PC =====
let studentUploadedPdfFile = null;

function triggerStudentFileInput() {
  const input = document.getElementById("student-doc-file-input");
  if (input) input.click();
}

function handleStudentDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById("student-dropzone");
  if (dropzone) dropzone.classList.add("dragover");
}

function handleStudentDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById("student-dropzone");
  if (dropzone) dropzone.classList.remove("dragover");
}

function handleStudentDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById("student-dropzone");
  if (dropzone) dropzone.classList.remove("dragover");

  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    processStudentPdfFile(e.dataTransfer.files[0]);
  }
}

function handleStudentFileChange(e) {
  if (e.target && e.target.files && e.target.files.length > 0) {
    processStudentPdfFile(e.target.files[0]);
  }
}

function processStudentPdfFile(file) {
  if (!file) return;

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    showToast("Veuillez sélectionner un fichier au format PDF (.pdf).", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    studentUploadedPdfFile = {
      file: file,
      name: file.name,
      size: formatFileSize(file.size),
      dataUrl: evt.target.result,
      url: URL.createObjectURL(file)
    };

    const emptyZone = document.getElementById("student-dropzone-empty");
    const selectedZone = document.getElementById("student-dropzone-selected");
    const nameEl = document.getElementById("student-selected-filename");
    const sizeEl = document.getElementById("student-selected-filesize");

    if (emptyZone) emptyZone.style.display = "none";
    if (selectedZone) selectedZone.style.display = "flex";
    if (nameEl) nameEl.innerText = file.name;
    if (sizeEl) sizeEl.innerText = formatFileSize(file.size);

    const titleInput = document.getElementById("upload-title");
    if (titleInput && !titleInput.value.trim()) {
      let cleaned = file.name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ").trim();
      titleInput.value = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }

    showToast(`Fichier PDF "${file.name}" importé avec succès depuis votre PC !`, "success");
  };

  reader.readAsDataURL(file);
}

function removeStudentSelectedFile(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  studentUploadedPdfFile = null;
  const input = document.getElementById("student-doc-file-input");
  if (input) input.value = "";

  const emptyZone = document.getElementById("student-dropzone-empty");
  const selectedZone = document.getElementById("student-dropzone-selected");

  if (emptyZone) emptyZone.style.display = "flex";
  if (selectedZone) selectedZone.style.display = "none";
}

function submitUpload() {
  if (!currentUser.isLoggedIn) {
    showView("login-student");
    showToast("Veuillez vous connecter pour publier un document.", "info");
    return;
  }

  const titleInput = document.getElementById("upload-title");
  const moduleInput = document.getElementById("upload-module");
  const typeInput = document.getElementById("upload-type");
  const uniInput = document.getElementById("upload-uni");

  const title = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : (studentUploadedPdfFile ? studentUploadedPdfFile.name.replace(/\.pdf$/i, "") : "Document Universitaire");
  const module = (moduleInput && moduleInput.value.trim()) ? moduleInput.value.trim() : "Informatique";
  const type = typeInput ? typeInput.value : "PFE";
  const uni = uniInput ? uniInput.value : "USTHB (Alger)";

  const fileUrl = studentUploadedPdfFile ? (studentUploadedPdfFile.dataUrl || studentUploadedPdfFile.url) : "/dummy.pdf";
  const fileName = studentUploadedPdfFile ? studentUploadedPdfFile.name : `${title}.pdf`;
  const fileSize = studentUploadedPdfFile ? studentUploadedPdfFile.size : "3.2 Mo";

  const newDoc = {
    id: documents.length + 1,
    title: title,
    type: type,
    module: module,
    university: uni,
    year: "L3",
    academicYear: "2024-2025",
    downloads: 0,
    rating: 5,
    pages: 18,
    status: "pending", // Pending director approval
    contributor: `${currentUser.firstname} ${currentUser.lastname}`,
    author: `${currentUser.firstname} ${currentUser.lastname}`,
    points: 50,
    date: new Date().toISOString().split('T')[0],
    description: `Document universitaire (${type}) soumis par l'étudiant pour validation académique.`,
    fileUrl: fileUrl,
    fileName: fileName,
    fileSize: fileSize
  };

  documents.unshift(newDoc);
  saveStateToStorage();
  removeStudentSelectedFile();

  if (titleInput) titleInput.value = "";
  if (moduleInput) moduleInput.value = "";

  showToast('Demande de publication transmise à la Direction avec le fichier PDF ! <i class="ti ti-shield-lock"></i>', "success");
  showView("dashboard");
}

// Student Saved Dashboard
function renderDashboard() {
  const dashContainer = document.getElementById("dashboard-docs-list");
  if (!dashContainer) return;

  const favDocs = documents.filter(d => favorites.includes(d.id));
  const myDocs = documents.filter(d => d.contributor.includes(currentUser.firstname));
  const allSavedDocs = Array.from(new Set([...favDocs, ...myDocs]));

  if (allSavedDocs.length === 0) {
    dashContainer.innerHTML = `
      <div style="text-align: center; padding: 48px; color: var(--muted);">
        <i class="ti ti-bookmark" style="font-size: 40px; margin-bottom: 8px; display: block; color: var(--border);"></i>
        <h3 style="font-size: 15px; font-weight: 700; color: #0F172A;">Aucun document enregistré</h3>
        <p style="font-size: 12px; margin-top: 4px; margin-bottom: 16px;">Enregistrez des cours pour les lire plus tard ou déposez vos propres travaux.</p>
        <button class="btn btn-primary" onclick="showView('browse')">Explorer la bibliothèque</button>
      </div>
    `;
  } else {
    dashContainer.innerHTML = `
      <div class="scribd-grid">
        ${allSavedDocs.map(createDocCardHTML).join("")}
      </div>
    `;
  }
}

// Director Moderation & Student Accounts Management

// ===== ADMIN TAB SWITCHER =====
function switchAdminTab(tab) {
  ['pending', 'docs', 'add', 'students'].forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const panel = document.getElementById(`admin-tab-${t}`);
    if (btn) btn.classList.remove('active');
    if (panel) panel.style.display = 'none';
  });
  const activeBtn = document.getElementById(`tab-btn-${tab}`);
  const activePanel = document.getElementById(`admin-tab-${tab}`);
  if (activeBtn) activeBtn.classList.add('active');
  if (activePanel) activePanel.style.display = 'block';

  if (tab === 'docs') renderAdminAllDocs();
  if (tab === 'students') renderAdminStudents();
  if (tab === 'add') adminCancelEdit();
}

function renderAdmin() {
  const pendingContainer = document.getElementById("admin-pending-list");
  const pendingBadge = document.getElementById("director-pending-badge");
  const pending = documents.filter(d => d.status === "pending");

  if (pendingBadge) pendingBadge.innerText = pending.length;

  if (pendingContainer) {
    if (pending.length === 0) {
      pendingContainer.innerHTML = `
        <div style="text-align:center;padding:40px;color:var(--muted);">
          <div style="font-size:32px;margin-bottom:8px;"><i class="ti ti-check"></i></div>
          <p style="font-weight:700;color:#0F172A;">Aucune demande en attente.</p>
        </div>`;
    } else {
      pendingContainer.innerHTML = pending.map(doc => `
        <div class="admin-doc-row">
          <div class="admin-doc-row-info">
            <div class="admin-doc-row-title">${doc.title}</div>
            <div class="admin-doc-row-meta">${doc.type} &middot; ${doc.university} &middot; par <strong>${doc.contributor}</strong></div>
          </div>
          <div class="admin-doc-row-actions">
            <button class="btn btn-primary" style="padding:4px 12px;font-size:11px;" onclick="approveDoc(${doc.id})">Accepter</button>
            <button class="btn btn-outline" style="padding:4px 12px;font-size:11px;color:var(--danger);border-color:var(--danger);" onclick="rejectDoc(${doc.id})">Refuser</button>
          </div>
        </div>`).join("");
    }
  }
}

function approveDoc(id) {
  const doc = documents.find(d => d.id === id);
  if (!doc) return;
  doc.status = "approved";
  const uploader = studentsList.find(s => doc.contributor.includes(s.firstname));
  if (uploader) { uploader.points += 50; uploader.uploadsCount++; }
  showToast("Document accepté et publié !", "success");
  renderAdmin();
  renderHomeDocs();
}

function rejectDoc(id) {
  const docIndex = documents.findIndex(d => d.id === id);
  if (docIndex !== -1) documents[docIndex].status = "rejected";
  showToast("Demande refusée.", "info");
  renderAdmin();
}

// Admin: Render all docs table
function renderAdminAllDocs() {
  const container = document.getElementById("admin-all-docs-list");
  if (!container) return;
  if (documents.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:32px;color:var(--muted);">Aucun document.</div>`;
    return;
  }
  container.innerHTML = documents.map(doc => {
    const sc = doc.status === 'approved' ? '#16A34A' : doc.status === 'pending' ? '#D97706' : '#DC2626';
    const sb = doc.status === 'approved' ? '#DCFCE7' : doc.status === 'pending' ? '#FEF3C7' : '#FEE2E2';
    const sl = doc.status === 'approved' ? 'Publi\u00e9' : doc.status === 'pending' ? 'En attente' : 'Refus\u00e9';
    return `
      <div class="admin-doc-row">
        <div class="admin-doc-row-info">
          <div class="admin-doc-row-title">${doc.title}</div>
          <div class="admin-doc-row-meta">${doc.type} &middot; ${doc.university} &middot; ${doc.year} &middot; par <strong>${doc.contributor}</strong></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:${sb};color:${sc};">${sl}</span>
          <button class="btn btn-outline" style="padding:3px 10px;font-size:11px;" onclick="adminEditDoc(${doc.id})">Modifier</button>
          <button class="btn btn-outline" style="padding:3px 10px;font-size:11px;color:var(--danger);border-color:var(--danger);" onclick="adminDeleteDoc(${doc.id})">Supprimer</button>
        </div>
      </div>`;
  }).join("");
}

// Admin: Render students table
function renderAdminStudents() {
  const container = document.getElementById("admin-students-management-list");
  if (!container) return;
  container.innerHTML = studentsList.map(st => `
    <div class="admin-doc-row">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;border-radius:50%;background:#0F172A;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;">
          ${st.avatar 
            ? `<img src="${st.avatar}" alt="${st.firstname}" style="width:100%;height:100%;object-fit:cover;">` 
            : `${st.firstname.charAt(0)}${st.lastname.charAt(0)}`}
        </div>
        <div>
          <div style="font-weight:700;font-size:13px;color:#0F172A;">${st.firstname} ${st.lastname}</div>
          <div style="font-size:11px;color:var(--muted);">${st.email} &middot; ${st.university}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:12px;${st.status === 'active' ? 'background:#DCFCE7;color:#16A34A;' : 'background:#FEE2E2;color:#DC2626;'}">
          ${st.status === 'active' ? 'Actif' : 'Suspendu'}
        </span>
        ${st.status === 'active'
          ? `<button class="btn btn-outline" style="padding:3px 10px;font-size:11px;color:var(--danger);border-color:var(--danger);" onclick="toggleStudentStatus(${st.id},'suspended')">Suspendre</button>`
          : `<button class="btn btn-primary" style="padding:3px 10px;font-size:11px;" onclick="toggleStudentStatus(${st.id},'active')">R\u00e9activer</button>`}
      </div>
    </div>`).join("");
}

// ===== ADMIN PDF UPLOAD FROM PC =====
let adminUploadedPdfFile = null;

function triggerAdminFileInput() {
  const input = document.getElementById("admin-doc-file-input");
  if (input) input.click();
}

function handleAdminDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById("admin-dropzone");
  if (dropzone) dropzone.classList.add("dragover");
}

function handleAdminDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById("admin-dropzone");
  if (dropzone) dropzone.classList.remove("dragover");
}

function handleAdminDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById("admin-dropzone");
  if (dropzone) dropzone.classList.remove("dragover");

  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    processAdminPdfFile(e.dataTransfer.files[0]);
  }
}

function handleAdminFileChange(e) {
  if (e.target && e.target.files && e.target.files.length > 0) {
    processAdminPdfFile(e.target.files[0]);
  }
}

function processAdminPdfFile(file) {
  if (!file) return;

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    showToast("Veuillez sélectionner un fichier au format PDF (.pdf).", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    adminUploadedPdfFile = {
      file: file,
      name: file.name,
      size: formatFileSize(file.size),
      dataUrl: evt.target.result,
      url: URL.createObjectURL(file)
    };

    const emptyZone = document.getElementById("admin-dropzone-empty");
    const selectedZone = document.getElementById("admin-dropzone-selected");
    const nameEl = document.getElementById("admin-selected-filename");
    const sizeEl = document.getElementById("admin-selected-filesize");

    if (emptyZone) emptyZone.style.display = "none";
    if (selectedZone) selectedZone.style.display = "flex";
    if (nameEl) nameEl.innerText = file.name;
    if (sizeEl) sizeEl.innerText = formatFileSize(file.size);

    // Smart autofill Title if empty
    const titleInput = document.getElementById("admin-doc-title");
    if (titleInput && !titleInput.value.trim()) {
      let cleaned = file.name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ").trim();
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
      titleInput.value = cleaned;
    }

    // Smart autofill Category from filename
    const typeSelect = document.getElementById("admin-doc-type");
    if (typeSelect) {
      const lower = file.name.toLowerCase();
      if (lower.includes("exam")) typeSelect.value = "Examen";
      else if (lower.includes("td")) typeSelect.value = "TD";
      else if (lower.includes("tp")) typeSelect.value = "TP";
      else if (lower.includes("cours")) typeSelect.value = "Cours";
      else if (lower.includes("resum")) typeSelect.value = "Résumé";
      else if (lower.includes("pfe") || lower.includes("memoir")) typeSelect.value = "PFE";
    }

    showToast(`Fichier PDF "${file.name}" chargé depuis votre PC !`, "success");
  };

  reader.readAsDataURL(file);
}

function removeAdminSelectedFile(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  adminUploadedPdfFile = null;
  const input = document.getElementById("admin-doc-file-input");
  if (input) input.value = "";

  const emptyZone = document.getElementById("admin-dropzone-empty");
  const selectedZone = document.getElementById("admin-dropzone-selected");

  if (emptyZone) emptyZone.style.display = "flex";
  if (selectedZone) selectedZone.style.display = "none";
}

// Admin: Load doc into form for editing
function adminEditDoc(id) {
  const doc = documents.find(d => d.id === id);
  if (!doc) return;
  document.getElementById("admin-edit-doc-id").value = doc.id;
  document.getElementById("admin-doc-title").value = doc.title;
  document.getElementById("admin-doc-type").value = doc.type;
  document.getElementById("admin-doc-uni").value = doc.university;
  document.getElementById("admin-doc-module").value = doc.module;
  document.getElementById("admin-doc-year").value = doc.year;
  document.getElementById("admin-doc-desc").value = doc.description || "";
  document.getElementById("admin-form-title").innerText = "Modifier le Document";

  if (doc.fileUrl) {
    const emptyZone = document.getElementById("admin-dropzone-empty");
    const selectedZone = document.getElementById("admin-dropzone-selected");
    const nameEl = document.getElementById("admin-selected-filename");
    const sizeEl = document.getElementById("admin-selected-filesize");
    if (emptyZone) emptyZone.style.display = "none";
    if (selectedZone) selectedZone.style.display = "flex";
    if (nameEl) nameEl.innerText = doc.fileName || `${doc.title}.pdf`;
    if (sizeEl) sizeEl.innerText = doc.fileSize || "Fichier PDF lié";
  } else {
    removeAdminSelectedFile();
  }

  switchAdminTab('add');
}

// Admin: Save new or edited doc
function adminSaveDoc() {
  const editId = document.getElementById("admin-edit-doc-id").value;
  const title = document.getElementById("admin-doc-title").value.trim();
  const type = document.getElementById("admin-doc-type").value;
  const uni = document.getElementById("admin-doc-uni").value;
  const module = document.getElementById("admin-doc-module").value.trim();
  const year = document.getElementById("admin-doc-year").value;
  const desc = document.getElementById("admin-doc-desc").value.trim();

  if (!title || !module) {
    showToast("Le titre et le module sont obligatoires.", "error");
    return;
  }

  if (editId) {
    const doc = documents.find(d => d.id === parseInt(editId));
    if (doc) {
      doc.title = title;
      doc.type = type;
      doc.university = uni;
      doc.module = module;
      doc.year = year;
      doc.description = desc;
      if (adminUploadedPdfFile) {
        doc.fileUrl = adminUploadedPdfFile.dataUrl || adminUploadedPdfFile.url;
        doc.fileName = adminUploadedPdfFile.name;
        doc.fileSize = adminUploadedPdfFile.size;
      }
      saveStateToStorage();
      showToast("Document modifié avec succès !", "success");
    }
  } else {
    const fileUrl = adminUploadedPdfFile ? (adminUploadedPdfFile.dataUrl || adminUploadedPdfFile.url) : "/dummy.pdf";
    const fileName = adminUploadedPdfFile ? adminUploadedPdfFile.name : `${title}.pdf`;
    const fileSize = adminUploadedPdfFile ? adminUploadedPdfFile.size : "2.4 Mo";

    const newDoc = {
      id: Date.now(),
      title: title,
      type: type,
      university: uni,
      module: module,
      year: year,
      academicYear: "2024/2025",
      downloads: 0,
      rating: 0,
      pages: 18,
      status: "approved",
      contributor: "Admin DocStudy",
      author: "Admin DocStudy",
      points: 50,
      date: new Date().toISOString().split('T')[0],
      description: desc || `Document officiel de type ${type} pour le module ${module} (${year}) dispensé à l'université ${uni}.`,
      fileUrl: fileUrl,
      fileName: fileName,
      fileSize: fileSize
    };

    documents.unshift(newDoc);
    saveStateToStorage();
    showToast("Document PDF importé depuis votre PC et publié dans la bibliothèque !", "success");
  }

  adminCancelEdit();
  renderHomeDocs();
  renderAdminAllDocs();
  switchAdminTab('docs');
}

// Admin: Delete doc
function adminDeleteDoc(id) {
  const idx = documents.findIndex(d => d.id === id);
  if (idx === -1) return;
  const title = documents[idx].title;
  documents.splice(idx, 1);
  saveStateToStorage();
  showToast(`"${title}" supprimé.`, "info");
  renderAdminAllDocs();
  renderHomeDocs();
}

// Admin: Reset form
function adminCancelEdit() {
  ["admin-edit-doc-id","admin-doc-title","admin-doc-module","admin-doc-desc"].forEach(f => {
    const el = document.getElementById(f);
    if (el) el.value = "";
  });
  removeAdminSelectedFile();
  const ft = document.getElementById("admin-form-title");
  if (ft) ft.innerText = "Ajouter un Document PDF depuis votre PC";
}


function toggleStudentStatus(studentId, newStatus) {
  const student = studentsList.find(s => s.id === studentId);
  if (!student) return;

  student.status = newStatus;
  if (newStatus === 'suspended') {
    showToast(`Compte de ${student.firstname} ${student.lastname} suspendu.`, "info");
  } else {
    showToast(`Compte de ${student.firstname} ${student.lastname} réactivé !`, "success");
  }
  renderAdmin();
}

// Student Profile Sync & Edit
function renderProfile() {
  const fnInput = document.getElementById("profile-firstname-input");
  const lnInput = document.getElementById("profile-lastname-input");
  const emInput = document.getElementById("profile-email-input");
  const uniSelect = document.getElementById("profile-uni-select");
  const yearSelect = document.getElementById("profile-year-select");
  const specInput = document.getElementById("profile-specialty-input");

  const nameDisplay = document.getElementById("profile-full-name");
  const metaDisplay = document.getElementById("profile-meta-desc");
  const avatarContainer = document.getElementById("profile-avatar-container");
  const pointsBadge = document.getElementById("profile-points-count");
  const docsBadge = document.getElementById("profile-docs-count");
  const favsBadge = document.getElementById("profile-favs-count");
  const removePhotoBtn = document.getElementById("profile-remove-photo-btn");

  if (fnInput) fnInput.value = currentUser.firstname || "";
  if (lnInput) lnInput.value = currentUser.lastname || "";
  if (emInput) emInput.value = currentUser.email || "";
  if (uniSelect && currentUser.university) uniSelect.value = currentUser.university;
  if (yearSelect && currentUser.year) yearSelect.value = currentUser.year;
  if (specInput) specInput.value = currentUser.specialty || "";

  if (nameDisplay) nameDisplay.innerText = `${currentUser.firstname || 'Étudiant'} ${currentUser.lastname || ''}`;
  if (metaDisplay) metaDisplay.innerText = `${currentUser.university || 'Université Algérienne'} · ${currentUser.year || 'L3'} ${currentUser.specialty ? '· ' + currentUser.specialty : ''}`;

  if (pointsBadge) pointsBadge.innerText = (currentUser.points || 1240).toLocaleString();
  if (docsBadge) {
    const myDocs = documents.filter(d => currentUser.firstname && d.contributor && d.contributor.includes(currentUser.firstname));
    docsBadge.innerText = myDocs.length;
  }
  if (favsBadge) favsBadge.innerText = favorites.length;

  if (avatarContainer) {
    if (currentUser.avatar) {
      avatarContainer.innerHTML = `<img src="${currentUser.avatar}" alt="Photo de profil" class="profile-avatar-img">`;
      if (removePhotoBtn) removePhotoBtn.style.display = "inline-flex";
    } else {
      const initials = `${(currentUser.firstname || 'E').charAt(0)}${(currentUser.lastname || 'T').charAt(0)}`.toUpperCase();
      avatarContainer.innerHTML = `<span class="profile-avatar-initials">${initials}</span>`;
      if (removePhotoBtn) removePhotoBtn.style.display = "none";
    }
  }
}

// Student Personal Photo Upload
function handleStudentPhotoUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      const maxDim = 320;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.88);
      currentUser.avatar = compressedDataUrl;

      // Sync with studentsList
      const st = studentsList.find(s => s.email && s.email.toLowerCase() === (currentUser.email || '').toLowerCase());
      if (st) {
        st.avatar = compressedDataUrl;
      }

      saveStateToStorage();
      updateUserSessionUI();
      renderProfile();
      showToast("Photo de profil mise à jour avec succès !", "success");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeStudentPhoto() {
  currentUser.avatar = null;
  const st = studentsList.find(s => s.email && s.email.toLowerCase() === (currentUser.email || '').toLowerCase());
  if (st) {
    st.avatar = null;
  }
  const fileInput = document.getElementById("profile-photo-file-input");
  if (fileInput) fileInput.value = "";

  saveStateToStorage();
  updateUserSessionUI();
  renderProfile();
  showToast("Photo de profil retirée.", "info");
}

function saveProfile() {
  const fn = document.getElementById("profile-firstname-input")?.value.trim();
  const ln = document.getElementById("profile-lastname-input")?.value.trim();
  const em = document.getElementById("profile-email-input")?.value.trim();
  const uni = document.getElementById("profile-uni-select")?.value;
  const yr = document.getElementById("profile-year-select")?.value;
  const spec = document.getElementById("profile-specialty-input")?.value.trim();

  if (!fn || !ln || !em) {
    showToast("Veuillez renseigner votre prénom, nom et email.", "error");
    return;
  }

  currentUser.firstname = fn;
  currentUser.lastname = ln;
  currentUser.email = em;
  if (uni) currentUser.university = uni;
  if (yr) currentUser.year = yr;
  if (spec) currentUser.specialty = spec;

  // Sync with studentsList
  const st = studentsList.find(s => s.email && s.email.toLowerCase() === em.toLowerCase());
  if (st) {
    st.firstname = fn;
    st.lastname = ln;
    st.university = uni || st.university;
    st.specialty = spec || st.specialty;
    st.year = yr || st.year;
  }

  saveStateToStorage();
  updateUserSessionUI();
  renderProfile();
  showToast("Informations enregistrées avec succès !", "success");
}

// Google Auth Simulation & Direct Account Creation
function startGoogleAuth(mode = 'login') {
  const modal = document.getElementById("googleAuthModal");
  if (modal) modal.style.display = "flex";
}

function closeGoogleAuthModal() {
  const modal = document.getElementById("googleAuthModal");
  if (modal) modal.style.display = "none";
}

function loginWithGoogleAccount(firstname, lastname, email, university) {
  let student = studentsList.find(s => s.email.toLowerCase() === email.toLowerCase());

  if (!student) {
    // Automatically create student account with Google
    student = {
      id: Date.now(),
      firstname: firstname,
      lastname: lastname,
      email: email,
      passwordHash: "google_oauth_verified",
      university: university || "USTHB (Alger)",
      specialty: "Informatique / Sciences",
      year: "L3",
      points: 150,
      status: "active",
      uploadsCount: 0,
      provider: "google",
      avatar: null
    };
    studentsList.unshift(student);
  }

  currentUser = {
    isLoggedIn: true,
    role: "student",
    firstname: student.firstname,
    lastname: student.lastname,
    email: student.email,
    avatar: student.avatar || null,
    university: student.university || university || "USTHB (Alger)",
    faculty: student.faculty || "Faculté des Sciences",
    specialty: student.specialty || "Informatique",
    year: student.year || "L3",
    points: student.points || 150,
    uploadsCount: student.uploadsCount || 0,
    downloadsCount: 0,
    provider: "google"
  };

  saveStateToStorage();
  updateUserSessionUI();
  closeGoogleAuthModal();
  showView("home");
  showToast(`Bienvenue ${currentUser.firstname} ! Connexion Google réussie.`, "success");
}

function submitCustomGoogleAuth() {
  const fn = document.getElementById("google-custom-firstname")?.value.trim();
  const ln = document.getElementById("google-custom-lastname")?.value.trim();
  const em = document.getElementById("google-custom-email")?.value.trim();

  if (!em) {
    showToast("Veuillez saisir votre adresse email Google (@gmail.com).", "error");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(em)) {
    showToast("Adresse email invalide.", "error");
    return;
  }

  const firstname = fn || em.split("@")[0];
  const lastname = ln || "Google";
  loginWithGoogleAccount(firstname, lastname, em, "USTHB (Alger)");
}

// Favorite Toggle
function toggleFavorite(id, event) {
  if (event) event.stopPropagation();
  const idx = favorites.indexOf(id);
  if (idx > -1) {
    favorites.splice(idx, 1);
    showToast("Document retiré des favoris", "info");
  } else {
    favorites.push(id);
    showToast("Document enregistré dans vos favoris !", "success");
  }
  renderHomeDocs();
  renderBrowseDocs();
  renderDashboard();
}

// Quick Filter Helpers
function quickFilter(cat) {
  showView('browse');
  const buttons = document.querySelectorAll(".scribd-filter-bar .filter-btn");
  buttons.forEach(b => b.classList.remove("active"));
  renderBrowseDocs();
}

function filterCat(cat, element) {
  const buttons = document.querySelectorAll(".scribd-filter-bar .filter-btn");
  buttons.forEach(b => b.classList.remove("active"));
  if (element) element.classList.add("active");

  const browseGrid = document.getElementById("browse-docs-grid");
  if (!browseGrid) return;

  const filtered = cat === 'all'
    ? documents.filter(d => d.status === 'approved')
    : documents.filter(d => d.status === 'approved' && d.type === cat);

  browseGrid.innerHTML = filtered.map(createDocCardHTML).join("");
}

function liveSearch(q) {
  if (!q.trim()) return;
  const browseGrid = document.getElementById("browse-docs-grid");
  if (!browseGrid) return;

  const query = q.toLowerCase();
  const matched = documents.filter(d =>
    d.status === 'approved' && (
      d.title.toLowerCase().includes(query) ||
      d.module.toLowerCase().includes(query) ||
      d.university.toLowerCase().includes(query)
    )
  );

  showView('browse');
  browseGrid.innerHTML = matched.map(createDocCardHTML).join("");
}

function doSearch() {
  const input = document.getElementById("hero-search");
  if (input) liveSearch(input.value);
}

// Document Preview Modal
// ===== SCRIBD-STYLE DOCUMENT VIEWER CONTROLLER =====
let currentPreviewDocId = null;
let currentDocPage = 1;
let currentDocTotalPages = 18;
let currentDocZoom = 1.0;
let isPaperView = true;

function generateAcademicPaperHTML(doc) {
  const type = (doc.type || "Examen").toLowerCase();

  if (type.includes("exam")) {
    return `
      <div style="font-size: 11px; color: #475569; margin-bottom: 20px; padding: 10px 14px; background: #F8FAFC; border-left: 3px solid #0F172A; border-radius: 2px;">
        <strong>Consignes officielles de l'épreuve :</strong> L'usage des calculatrices non programmables est autorisé. Tout autre matériel ou document est strictement interdit. La notation prendra en compte la clarté et la rigueur du raisonnement.
      </div>

      <div class="scribd-exercise-card">
        <div class="scribd-exercise-title">
          <span>Exercice 1 : Modélisation Formelle & Conception UML</span>
          <span class="scribd-exercise-pts">6 points</span>
        </div>
        <p style="margin-bottom: 10px; font-size: 12.5px; color: #334155;">
          On considère la plateforme universitaire algérienne <em>DocStudy</em>. Le système doit gérer le cycle de vie complet des documents pédagogiques : soumission, contrôle de doublon SHA-256, modération et consultation.
        </p>
        <div class="scribd-question-item">
          <span class="scribd-question-num">1.</span>
          Établir le diagramme de cas d'utilisation (Use Case) modélisant le dépôt et la validation d'une ressource académique.
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">2.</span>
          Donner le diagramme de classes correspondant en précisant les cardinalités, attributs clés et relations de composition.
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">3.</span>
          Distinguer formellement l'agrégation de la composition dans ce modèle. Illustrer par un exemple tiré du sujet.
        </div>
      </div>

      <div class="scribd-exercise-card">
        <div class="scribd-exercise-title">
          <span>Exercice 2 : Patrons de Conception (Design Patterns)</span>
          <span class="scribd-exercise-pts">8 points</span>
        </div>
        <p style="margin-bottom: 10px; font-size: 12.5px; color: #334155;">
          Dans le cadre de l'architecture logicielle distribuée du service :
        </p>
        <div class="scribd-question-item">
          <span class="scribd-question-num">1.</span>
          Pourquoi le patron <strong>Singleton</strong> est-il approprié pour le pool de connexion vers la base de données ? Quelles précautions faut-il prendre dans un contexte multithread ?
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">2.</span>
          On souhaite notifier automatiquement les étudiants abonnés lorsqu'un nouveau document de leur module est approuvé. Proposer et schématiser le patron <strong>Observer</strong> adapté.
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">3.</span>
          Rédiger le code d'implémentation (Java, TypeScript ou C++) de l'interface <code>Observateur</code> et du sujet concret <code>ModuleSubject</code>.
        </div>
      </div>

      <div class="scribd-exercise-card" style="border-bottom: none;">
        <div class="scribd-exercise-title">
          <span>Exercice 3 : Assurance Qualité & Stratégie de Tests</span>
          <span class="scribd-exercise-pts">6 points</span>
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">1.</span>
          Définir la complexité cyclomatique de McCabe et expliquer comment elle détermine le nombre minimal de cas de tests unitaires indépendants.
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">2.</span>
          Concevoir un jeu de tests de robustesse (entrées valides, limites, corrompues) pour la fonction de hachage cryptographique SHA-256.
        </div>
      </div>
    `;
  } else if (type.includes("td") || type.includes("tp")) {
    return `
      <div style="font-size: 11px; color: #475569; margin-bottom: 20px; padding: 10px 14px; background: #F8FAFC; border-left: 3px solid #008361; border-radius: 2px;">
        <strong>Objectifs des travaux pratiques :</strong> Mettre en œuvre les algorithmes fondamentaux et consolider l'analyse méthodologique. Chaque manipulation donne lieu à un compte-rendu d'évaluation.
      </div>

      <div class="scribd-exercise-card">
        <div class="scribd-exercise-title">
          <span>Partie 1 : Analyse Théorique & Prérequis</span>
          <span class="scribd-exercise-pts">Travaux Pratiques</span>
        </div>
        <p style="margin-bottom: 10px; font-size: 12.5px; color: #334155;">
          ${doc.description || "Présentation synthétique du protocole expérimental et des variables d'état."}
        </p>
        <div class="scribd-question-item">
          <span class="scribd-question-num">1.</span>
          Poser les équations d'état ou les invariants de boucle associés au problème.
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">2.</span>
          Calculer analytiquement la complexité spatiale et temporelle dans le pire des cas.
        </div>
      </div>

      <div class="scribd-exercise-card" style="border-bottom: none;">
        <div class="scribd-exercise-title">
          <span>Partie 2 : Mise en Application & Résultats Expérimentaux</span>
          <span class="scribd-exercise-pts">Implémentation</span>
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">1.</span>
          Donner les structures de données optimales permettant de minimiser les temps d'accès.
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">2.</span>
          Interpréter les courbes de performance et commenter les écarts constatés avec le modèle théorique.
        </div>
      </div>
    `;
  } else {
    return `
      <div style="font-size: 11px; color: #475569; margin-bottom: 20px; padding: 10px 14px; background: #F8FAFC; border-left: 3px solid #0F172A; border-radius: 2px;">
        <strong>Support de cours universitaire certifié :</strong> Conforme au programme national LMD du Ministère de l'Enseignement Supérieur algérien.
      </div>

      <div class="scribd-exercise-card">
        <div class="scribd-exercise-title">
          <span>Chapitre 1 : Définitions et Théorèmes Fondamentaux</span>
          <span class="scribd-exercise-pts">Notions Clés</span>
        </div>
        <p style="margin-bottom: 12px; font-size: 13px; line-height: 1.7; color: #334155;">
          ${doc.description || "Ce chapitre introduit le cadre méthodologique et les notions structurales indispensables."}
        </p>
        <div class="scribd-question-item">
          <span class="scribd-question-num">§ 1.1</span>
          Définitions axiomatiques, propriétés élémentaires et conditions d'existence.
        </div>
        <div class="scribd-question-item">
          <span class="scribd-question-num">§ 1.2</span>
          Démonstration des lemmes structurants et exemples guidés de résolution.
        </div>
      </div>

      <div class="scribd-exercise-card" style="border-bottom: none;">
        <div class="scribd-exercise-title">
          <span>Chapitre 2 : Cas Pratiques & Synthèse Méthodologique</span>
          <span class="scribd-exercise-pts">Applications</span>
        </div>
        <p style="margin-bottom: 10px; font-size: 12.5px; color: #334155;">
          Exercices résolus type examen et fiches récapitulatives des formules fondamentales.
        </p>
      </div>
    `;
  }
}

function renderSimilarDocs(currentDoc) {
  const container = document.getElementById("preview-similar-docs");
  if (!container) return;

  const similar = documents.filter(d => d.id !== currentDoc.id && d.status === "approved");
  similar.sort((a, b) => {
    const aScore = (a.module === currentDoc.module ? 3 : 0) + (a.university === currentDoc.university ? 2 : 0) + (a.type === currentDoc.type ? 1 : 0);
    const bScore = (b.module === currentDoc.module ? 3 : 0) + (b.university === currentDoc.university ? 2 : 0) + (b.type === currentDoc.type ? 1 : 0);
    return bScore - aScore;
  });

  const topDocs = similar.slice(0, 6);

  container.innerHTML = topDocs.map(doc => `
    <div class="scribd-similar-card" onclick="previewDoc(${doc.id}, event)">
      <div class="scribd-similar-thumb">
        <span class="scribd-similar-badge">PDF</span>
        <i class="ti ti-file-text" style="color: #64748B; font-size: 18px; margin-top: 6px;"></i>
      </div>
      <div class="scribd-similar-info">
        <div class="scribd-similar-title">${doc.title}</div>
        <div class="scribd-similar-meta">
          <span>${doc.pages || 16} pages</span>
          <span>·</span>
          <span>${doc.university}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function previewDoc(id, event) {
  if (event) event.stopPropagation();
  const doc = documents.find(d => d.id === id);
  if (!doc) return;

  currentPreviewDocId = doc.id;
  currentDocPage = 1;
  currentDocTotalPages = doc.pages || 18;
  currentDocZoom = 1.0;

  // Detect if this document has a REAL uploaded PDF file (data URL from admin/student PC upload)
  const hasRealPdf = doc.fileUrl && doc.fileUrl.startsWith("data:");
  isPaperView = !hasRealPdf; // Show real PDF by default when available, else simulated paper

  const modal = document.getElementById("previewModal");
  if (!modal) return;

  // Header & Title
  const headerTitle = document.getElementById("preview-header-title");
  if (headerTitle) headerTitle.innerText = doc.title;

  const docTitle = document.getElementById("preview-doc-title");
  if (docTitle) docTitle.innerText = doc.title;

  // Metadata badges (strictly NO views, NO downloads, NO rating!)
  const typeBadge = document.getElementById("preview-doc-type-badge");
  if (typeBadge) typeBadge.innerText = doc.type.toUpperCase();

  const pagesBadge = document.getElementById("preview-pages-badge");
  if (pagesBadge) pagesBadge.innerText = `${currentDocTotalPages} pages`;

  const levelBadge = document.getElementById("preview-level-badge");
  if (levelBadge) levelBadge.innerText = doc.year || "L3";

  // Prominent Description (as requested by user!)
  const descEl = document.getElementById("preview-doc-description");
  if (descEl) {
    descEl.innerText = doc.description || "Ce document universitaire contient l'intégralité du sujet avec des explications méthodologiques, des exercices types et des repères conformes au programme national d'enseignement supérieur.";
  }

  // Contributor & academic card
  const contributorEl = document.getElementById("preview-contributor");
  if (contributorEl) contributorEl.innerText = doc.contributor || doc.author || "Étudiant";

  const dateEl = document.getElementById("preview-date");
  if (dateEl) dateEl.innerText = doc.date || "12 Juin 2024";

  const uniEl = document.getElementById("preview-detail-uni");
  if (uniEl) uniEl.innerText = doc.university;

  const specEl = document.getElementById("preview-detail-spec");
  if (specEl) specEl.innerText = `${doc.faculty || 'Faculté des Sciences'} · ${doc.specialty || 'Informatique'}`;

  const moduleEl = document.getElementById("preview-detail-module");
  if (moduleEl) moduleEl.innerText = `${doc.module} (${doc.year || 'L3'})`;

  // Central Realistic Paper
  const paperUni = document.getElementById("paper-uni-name");
  if (paperUni) paperUni.innerText = `UNIVERSITÉ ${doc.university.toUpperCase()}`;

  const paperFaculty = document.getElementById("paper-faculty-name");
  if (paperFaculty) paperFaculty.innerText = `FACULTÉ ${(doc.faculty || 'INFORMATIQUE').toUpperCase()}`;

  const paperYear = document.getElementById("paper-academic-year");
  if (paperYear) paperYear.innerText = doc.academicYear || "2023/2024";

  const paperTitle = document.getElementById("paper-main-title");
  if (paperTitle) paperTitle.innerText = doc.title.toUpperCase();

  const paperSubtitle = document.getElementById("paper-subtitle");
  if (paperSubtitle) paperSubtitle.innerText = `Filière ${doc.specialty || 'Informatique'} · Niveau ${doc.year || 'L3'} · Module : ${doc.module}`;

  const paperFooter = document.getElementById("paper-page-footer");
  if (paperFooter) paperFooter.innerText = `Page 1 sur ${currentDocTotalPages}`;

  const curPageBadge = document.getElementById("scribd-current-page");
  if (curPageBadge) curPageBadge.innerText = "1";

  const totPageBadge = document.getElementById("scribd-total-pages");
  if (totPageBadge) totPageBadge.innerText = `/ ${currentDocTotalPages}`;

  const paperBody = document.getElementById("scribd-paper-body");
  if (paperBody) paperBody.innerHTML = generateAcademicPaperHTML(doc);

  // Set raw PDF iframe source to the actual uploaded PDF (or default /dummy.pdf)
  const rawIframe = document.getElementById("pdf-viewer-iframe");
  if (rawIframe) {
    rawIframe.src = doc.fileUrl || "/dummy.pdf";
  }

  // Show correct view: real PDF or simulated paper
  const paperContainer = document.getElementById("scribd-paper-container");
  const rawWrap = document.getElementById("scribd-raw-pdf-wrap");
  const modeBtn = document.getElementById("paper-mode-toggle");

  if (hasRealPdf) {
    // Document has a real uploaded PDF → show it directly in the iframe
    if (paperContainer) {
      paperContainer.style.transform = "scale(1)";
      paperContainer.style.display = "none";
    }
    if (rawWrap) rawWrap.style.display = "block";
    if (modeBtn) modeBtn.innerHTML = '<i class="ti ti-eye"></i> <span style="font-size: 11px; margin-left: 4px;">Mode Aperçu</span>';
  } else {
    // No real PDF → show simulated academic paper view
    if (paperContainer) {
      paperContainer.style.transform = "scale(1)";
      paperContainer.style.display = "flex";
    }
    if (rawWrap) rawWrap.style.display = "none";
    if (modeBtn) modeBtn.innerHTML = '<i class="ti ti-file-text"></i> <span style="font-size: 11px; margin-left: 4px;">Mode Document</span>';
  }

  // Similar documents in right sidebar
  renderSimilarDocs(doc);

  // Show modal
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closePreviewModal() {
  const modal = document.getElementById("previewModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function changeDocPage(delta) {
  const newPage = currentDocPage + delta;
  if (newPage < 1 || newPage > currentDocTotalPages) return;
  currentDocPage = newPage;

  const curPageBadge = document.getElementById("scribd-current-page");
  if (curPageBadge) curPageBadge.innerText = currentDocPage;

  const paperFooter = document.getElementById("paper-page-footer");
  if (paperFooter) paperFooter.innerText = `Page ${currentDocPage} sur ${currentDocTotalPages}`;

  showToast(`Page ${currentDocPage} sur ${currentDocTotalPages}`, "info");
}

function zoomDoc(delta) {
  currentDocZoom = Math.min(Math.max(currentDocZoom + delta, 0.75), 1.35);
  const paper = document.getElementById("scribd-paper-container");
  if (paper) {
    paper.style.transform = `scale(${currentDocZoom})`;
    paper.style.transformOrigin = "top center";
  }
}

function togglePaperMode() {
  const paper = document.getElementById("scribd-paper-container");
  const rawWrap = document.getElementById("scribd-raw-pdf-wrap");
  const btn = document.getElementById("paper-mode-toggle");

  if (!paper || !rawWrap) return;

  isPaperView = !isPaperView;
  if (isPaperView) {
    paper.style.display = "flex";
    rawWrap.style.display = "none";
    if (btn) btn.innerHTML = '<i class="ti ti-file-text"></i> <span style="font-size: 11px; margin-left: 4px;">Mode Document</span>';
    showToast("Affichage en mode document numérisé", "info");
  } else {
    paper.style.display = "none";
    rawWrap.style.display = "block";
    if (btn) btn.innerHTML = '<i class="ti ti-eye"></i> <span style="font-size: 11px; margin-left: 4px;">Mode PDF Brut</span>';
    showToast("Affichage du fichier PDF réel importé", "info");
  }
}

function toggleFullscreen() {
  const elem = document.querySelector(".scribd-viewer-modal") || document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
}

function triggerShareFromPreview() {
  const url = window.location.href;
  navigator.clipboard?.writeText(url);
  showToast("Lien du document copié dans le presse-papiers !", "success");
}

function triggerReportFromPreview() {
  showToast("Signalement transmis à l'équipe de modération.", "info");
}

function toggleDocSearch() {
  const input = document.getElementById("hero-search");
  showToast("Recherche rapide activée. Tapez vos mots-clés.", "info");
}

function toggleToc() {
  showToast("Sommaire : 3 parties disponibles dans ce document.", "info");
}

function toggleThumbnails() {
  showToast("Vignettes : 18 pages indexées.", "info");
}

function triggerPrintFromPreview() {
  window.print();
}

function triggerDownloadFromPreview() {
  const doc = documents.find(d => d.id === currentPreviewDocId);
  const fileUrl = (doc && doc.fileUrl) ? doc.fileUrl : "/dummy.pdf";
  const downloadName = (doc && doc.fileName) ? doc.fileName : ((doc ? doc.title.replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, '_') : 'document') + ".pdf");

  showToast("Téléchargement du fichier PDF lancé...", "success");
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = downloadName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function triggerFavFromPreview() {
  if (currentPreviewDocId) {
    toggleFavorite(currentPreviewDocId);
    showToast("Document ajouté à vos favoris !", "success");
  }
}

function submitComment() {
  const input = document.getElementById("new-comment-text");
  if (!input || !input.value.trim()) return;

  const list = document.getElementById("preview-comments-list");
  if (list) {
    const item = document.createElement("div");
    item.style.fontSize = "12px";
    item.style.marginBottom = "8px";
    item.style.padding = "6px 8px";
    item.style.background = "#F9FAFB";
    item.style.borderRadius = "4px";
    item.innerHTML = `<strong>${currentUser.firstname || 'Étudiant'}:</strong> ${input.value.trim()}`;
    list.appendChild(item);
  }

  input.value = "";
  showToast("Commentaire publié !", "success");
}

// App Initialization
function initApp() {
  loadStateFromStorage();
  updateUserSessionUI();
  renderHomeDocs();
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

