"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).initApp === "function") {
      (window as any).initApp();
    }
  }, []);

  return (
    <>
      <div id="toast" className="toast">
        <i className="ti ti-check" />
        <span id="toast-msg">Action réussie</span>
      </div>

      <header className="app-header">
        <div className="header-container">
          <div className="logo-scribd" onClick={() => window.location.href = "/"}>
            [DOCSTUDY]
          </div>

          <div className="header-search">
            <input
              type="text"
              id="hero-search"
              placeholder="Rechercher un mémoire, cours, examen, module (ex: Algorithmes, USTHB)..."
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (typeof window !== "undefined" && "liveSearch" in window) {
                  (window as any).liveSearch(target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && typeof window !== "undefined" && "doSearch" in window) {
                  (window as any).doSearch();
                }
              }}
            />
            <i
              className="ti ti-search"
              onClick={() => {
                if (typeof window !== "undefined" && "doSearch" in window) {
                  (window as any).doSearch();
                }
              }}
            />
          </div>

          <div className="header-right" id="navbar-actions-container" />
        </div>
      </header>

      <main className="main-layout">
        <div className="view active" id="view-home">
          <div className="scribd-filter-bar">
            <button className="filter-btn active" onClick={() => (window as any).quickFilter?.("all")}>Tous les documents</button>
            <button className="filter-btn" onClick={() => (window as any).quickFilter?.("Examen")}>Examens &amp; Corrigés</button>
            <button className="filter-btn" onClick={() => (window as any).quickFilter?.("Cours")}>Cours Universitaires</button>
            <button className="filter-btn" onClick={() => (window as any).quickFilter?.("TD")}>Fiches de TD</button>
            <button className="filter-btn" onClick={() => (window as any).quickFilter?.("TP")}>Comptes Rendus TP</button>
            <button className="filter-btn" onClick={() => (window as any).quickFilter?.("PFE")}>Mémoires &amp; PFE</button>
            <button className="filter-btn" onClick={() => (window as any).quickFilter?.("Résumé")}>Résumés &amp; Fiches</button>
          </div>

          <section>
            <h2 className="section-title-scribd">Mémoires &amp; Projets de Fin d&apos;Études (PFE)</h2>
            <div className="scribd-grid" id="home-docs-grid" />
          </section>

          <section>
            <h2 className="section-title-scribd">Documents récents recommandés</h2>
            <div className="scribd-grid" id="recommended-docs-grid" />
          </section>

          <section>
            <h2 className="section-title-scribd">Tendances dans les Universités Algériennes</h2>
            <div className="scribd-grid" id="trending-docs-grid" />
          </section>
        </div>

        <div className="view" id="view-browse">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h1 className="section-title-scribd" style={{ marginBottom: 0 }}>Explorer la bibliothèque</h1>
            <button className="btn btn-outline" onClick={() => (window as any).goBack?.()}>
              <i className="ti ti-arrow-left" /> Retour
            </button>
          </div>

          <div className="scribd-filter-bar" style={{ marginBottom: 24 }}>
            <button className="filter-btn active" onClick={(e) => (window as any).filterCat?.("all", e.currentTarget)}>Tous</button>
            <button className="filter-btn" onClick={(e) => (window as any).filterCat?.("Examen", e.currentTarget)}>Examens</button>
            <button className="filter-btn" onClick={(e) => (window as any).filterCat?.("TD", e.currentTarget)}>TD</button>
            <button className="filter-btn" onClick={(e) => (window as any).filterCat?.("TP", e.currentTarget)}>TP</button>
            <button className="filter-btn" onClick={(e) => (window as any).filterCat?.("Cours", e.currentTarget)}>Cours</button>
            <button className="filter-btn" onClick={(e) => (window as any).filterCat?.("Résumé", e.currentTarget)}>Résumés</button>
            <button className="filter-btn" onClick={(e) => (window as any).filterCat?.("PFE", e.currentTarget)}>PFE</button>
          </div>

          <div className="scribd-grid" id="browse-docs-grid" />
        </div>

        <div className="view" id="view-upload">
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div className="card">
              <h2 className="card-title">Soumettre un Document</h2>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Partagez vos mémoires, TDs et examens avec la communauté universitaire algérienne.</p>

              <div
                style={{ border: "2px dashed var(--border)", padding: 32, textAlign: "center", borderRadius: "var(--radius)", cursor: "pointer", marginBottom: 20, background: "#FAFAFA" }}
                onClick={() => (window as any).simulateUpload?.()}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}><i className="ti ti-file-text" /></div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }} id="upload-filename">Cliquez pour sélectionner un fichier PDF</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Fichier PDF jusqu&apos;à 50 Mo</div>
              </div>

              <div className="form-group">
                <label className="form-label">Titre du document</label>
                <input type="text" id="upload-title" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Catégorie</label>
                <select id="upload-type" className="form-select">
                  <option value="Examen">Examen</option>
                  <option value="TD">TD (Travaux Dirigés)</option>
                  <option value="TP">TP (Travaux Pratiques)</option>
                  <option value="Cours">Cours</option>
                  <option value="Résumé">Résumé</option>
                  <option value="PFE">PFE / Mémoire</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Université</label>
                <select id="upload-uni" className="form-select">
                  <option value="USTHB (Alger)">USTHB (Alger)</option>
                  <option value="Univ. Badji Mokhtar (Annaba)">Univ. Badji Mokhtar (Annaba)</option>
                  <option value="Univ. Constantine 2">Univ. Constantine 2</option>
                  <option value="Univ. Oran 1">Univ. Oran 1</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Module / Spécialité</label>
                <input type="text" id="upload-module" className="form-input" />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24 }}>
                <button className="btn btn-outline" onClick={() => (window as any).showView?.("home")}>Annuler</button>
                <button className="btn btn-primary" onClick={() => (window as any).submitUpload?.()}>Soumettre le document</button>
              </div>
            </div>
          </div>
        </div>

        <div className="view" id="view-login-student">
          <div style={{ maxWidth: 400, margin: "40px auto" }}>
            <div className="card">
              <h2 className="card-title" style={{ textAlign: "center" }}>Connexion</h2>
              <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginBottom: 20 }}>Accédez à votre espace et à vos documents enregistrés</p>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" id="login-email-student" className="form-input" onKeyDown={(e) => { if (e.key === "Enter" && typeof window !== "undefined" && "doLogin" in window) (window as any).doLogin(); }} />
              </div>
              <div className="form-group">
                <label className="form-label">Mot de passe</label>
                <input type="password" id="login-password-student" className="form-input" onKeyDown={(e) => { if (e.key === "Enter" && typeof window !== "undefined" && "doLogin" in window) (window as any).doLogin(); }} />
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => (window as any).doLogin?.()}>Se connecter</button>
              <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginTop: 16 }}>
                Pas encore de compte ? <span style={{ color: "var(--primary)", cursor: "pointer", fontWeight: 700 }} onClick={() => (window as any).showView?.("register-student")}>S&apos;inscrire</span>
              </p>
            </div>
          </div>
        </div>

        <div className="view" id="view-register-student">
          <div style={{ maxWidth: 440, margin: "40px auto" }}>
            <div className="card">
              <h2 className="card-title" style={{ textAlign: "center" }}>Créer un Compte</h2>
              <div className="form-group" style={{ marginTop: 20 }}>
                <label className="form-label">Prénom</label>
                <input type="text" id="register-firstname" className="form-input" onKeyDown={(e) => { if (e.key === "Enter" && typeof window !== "undefined" && "doRegister" in window) (window as any).doRegister(); }} />
              </div>
              <div className="form-group">
                <label className="form-label">Nom</label>
                <input type="text" id="register-lastname" className="form-input" onKeyDown={(e) => { if (e.key === "Enter" && typeof window !== "undefined" && "doRegister" in window) (window as any).doRegister(); }} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" id="register-email" className="form-input" onKeyDown={(e) => { if (e.key === "Enter" && typeof window !== "undefined" && "doRegister" in window) (window as any).doRegister(); }} />
              </div>
              <div className="form-group">
                <label className="form-label">Université</label>
                <select id="register-uni" className="form-select">
                  <option value="">-- Choisir une université --</option>
                  <option value="USTHB (Alger)">USTHB (Alger)</option>
                  <option value="Univ. Badji Mokhtar (Annaba)">Univ. Badji Mokhtar (Annaba)</option>
                  <option value="Univ. Constantine 2">Univ. Constantine 2</option>
                  <option value="Univ. Oran 1">Univ. Oran 1</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Mot de passe</label>
                <input type="password" id="register-password" className="form-input" onKeyDown={(e) => { if (e.key === "Enter" && typeof window !== "undefined" && "doRegister" in window) (window as any).doRegister(); }} />
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => (window as any).doRegister?.()}>Créer mon compte</button>
              <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginTop: 16 }}>
                Déjà un compte ? <span style={{ color: "var(--primary)", cursor: "pointer", fontWeight: 700 }} onClick={() => (window as any).showView?.("login-student")}>Se connecter</span>
              </p>
            </div>
          </div>
        </div>

        <div className="view" id="view-admin">
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 className="section-title-scribd" style={{ margin: 0 }}><i className="ti ti-shield-lock" /> Panneau Admin</h1>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Gérez tous les documents et les comptes étudiants.</p>
            </div>
            <button className="btn btn-outline" onClick={() => (window as any).doLogout?.()}><i className="ti ti-logout" /> Déconnexion</button>
          </div>

          <div style={{ display: "flex", gap: 4, borderBottom: "2px solid var(--border)", marginBottom: 24 }}>
            <button className="admin-tab active" id="tab-btn-pending" onClick={() => (window as any).switchAdminTab?.("pending")}>Demandes en attente <span id="director-pending-badge" style={{ fontSize: 10, background: "#FEF3C7", color: "#D97706", padding: "1px 6px", borderRadius: 10, marginLeft: 4 }}>0</span></button>
            <button className="admin-tab" id="tab-btn-docs" onClick={() => (window as any).switchAdminTab?.("docs")}>Tous les Documents</button>
            <button className="admin-tab" id="tab-btn-add" onClick={() => (window as any).switchAdminTab?.("add")}>+ Ajouter un Document</button>
            <button className="admin-tab" id="tab-btn-students" onClick={() => (window as any).switchAdminTab?.("students")}>Comptes Étudiants</button>
          </div>

          <div id="admin-tab-pending"><div id="admin-pending-list" /></div>
          <div id="admin-tab-docs" style={{ display: "none" }}><div id="admin-all-docs-list" /></div>
          <div id="admin-tab-add" style={{ display: "none" }}>
            <div className="card" style={{ maxWidth: 640 }}>
              <h3 className="card-title" id="admin-form-title">Ajouter un Nouveau Document</h3>
              <input type="hidden" id="admin-edit-doc-id" />
              <div className="form-group" style={{ marginTop: 16 }}>
                <label className="form-label">Titre</label>
                <input type="text" id="admin-doc-title" className="form-input" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <select id="admin-doc-type" className="form-select">
                    <option value="Examen">Examen</option>
                    <option value="TD">TD</option>
                    <option value="TP">TP</option>
                    <option value="Cours">Cours</option>
                    <option value="Résumé">Résumé</option>
                    <option value="PFE">PFE</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Université</label>
                  <input type="text" id="admin-doc-university" className="form-input" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Faculté</label>
                  <input type="text" id="admin-doc-faculty" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Spécialité</label>
                  <input type="text" id="admin-doc-specialty" className="form-input" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Module</label>
                  <input type="text" id="admin-doc-module" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Niveau</label>
                  <input type="text" id="admin-doc-year" className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea id="admin-doc-description" className="form-input" rows={4} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 18 }}>
                <button className="btn btn-outline" onClick={() => (window as any).showAdminTab?.("pending")}>Annuler</button>
                <button className="btn btn-primary" onClick={() => (window as any).saveAdminDocument?.()}>Enregistrer</button>
              </div>
            </div>
          </div>
          <div id="admin-tab-students" style={{ display: "none" }}><div id="admin-students-list" /></div>
        </div>
      </main>

      <script src="/js/app.js" defer />
    </>
  );
}
