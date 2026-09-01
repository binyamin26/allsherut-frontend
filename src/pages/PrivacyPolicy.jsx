import React from 'react';
import { Shield, Lock, Database, Eye, Mail, Globe, UserCheck, Clock, AlertCircle } from 'lucide-react';
import '../styles/pages/privacy-policy.css';

/*
 * ⚠️ MODÈLE À FAIRE RELIRE PAR UN JURISTE / DPO avant mise en ligne.
 * Rédigé pour un site édité et exploité en France : RGPD (règlement UE 2016/679)
 * + loi n° 78-17 « Informatique et Libertés ». Les mentions entre [crochets]
 * doivent être complétées (identité du responsable de traitement, DPO, hébergeur,
 * prestataire de paiement effectivement utilisé, etc.).
 */

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page" dir="ltr">

      <main className="privacy-content">
        <div className="container">
          {/* Hero Section */}
          <section className="privacy-hero">
            <div className="hero-icon-wrapper">
              <Shield className="hero-icon" size={48} />
            </div>
            <h1 className="privacy-title">Politique de confidentialité</h1>
            <p className="privacy-subtitle">
              Nous nous engageons à protéger votre vie privée. Ce document décrit comment nous collectons, utilisons et protégeons vos données personnelles, conformément au RGPD.
            </p>
            <div className="last-updated">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </div>
          </section>

          {/* Section 0: Responsable de traitement */}
          <section className="privacy-section">
            <div className="section-number">0</div>
            <div className="section-content">
              <h2 className="section-title">
                <UserCheck size={24} />
                Responsable du traitement
              </h2>
              <p className="section-text">
                Le responsable du traitement des données personnelles collectées via la plateforme AllSherut est :
              </p>
              <ul className="privacy-list">
                <li><strong>[Raison sociale]</strong>, [forme juridique], immatriculée sous le numéro [SIRET/RCS].</li>
                <li><strong>Siège social :</strong> [adresse complète].</li>
                <li><strong>Contact données personnelles :</strong> privacy@allsherut.com</li>
                <li><strong>Délégué à la protection des données (DPO) :</strong> dpo@allsherut.com — [adresse postale si applicable].</li>
              </ul>
            </div>
          </section>

          {/* Section 1: Data Collection */}
          <section className="privacy-section">
            <div className="section-number">1</div>
            <div className="section-content">
              <h2 className="section-title">
                <Database size={24} />
                Quelles données nous collectons
              </h2>

              <p className="section-text">
                Nous collectons différentes catégories de données selon le type d&apos;utilisateur et l&apos;usage de la plateforme.
              </p>

              <h3 className="subsection-title">Données collectées auprès des clients :</h3>
              <div className="data-category">
                <ul className="privacy-list">
                  <li><strong>Identité :</strong> nom complet, adresse e-mail.</li>
                  <li><strong>Historique de recherche :</strong> services recherchés, localisations consultées.</li>
                  <li><strong>Avis publiés :</strong> contenu des avis, notes et date de publication.</li>
                  <li><strong>Données d&apos;usage :</strong> pages consultées, durée et fréquence d&apos;utilisation.</li>
                </ul>
              </div>

              <h3 className="subsection-title">Données collectées auprès des prestataires :</h3>
              <div className="data-category highlight">
                <ul className="privacy-list">
                  <li><strong>Identité complète :</strong> nom, prénom, adresse e-mail, numéro de téléphone.</li>
                  <li><strong>Données professionnelles :</strong> description des services, tarifs, expérience.</li>
                  <li><strong>Justificatifs :</strong> diplômes, agréments, attestations (le cas échéant).</li>
                  <li><strong>Zones d&apos;intervention :</strong> communes, départements, périmètre d&apos;activité.</li>
                  <li><strong>Photos :</strong> photo de profil, photos de réalisations.</li>
                  <li><strong>Données de facturation :</strong> informations de paiement de l&apos;abonnement (traitées par un prestataire de paiement agréé).</li>
                  <li><strong>Statistiques :</strong> nombre de vues du profil, nombre de contacts, notes.</li>
                </ul>
              </div>

              <h3 className="subsection-title">Données techniques collectées automatiquement :</h3>
              <ul className="privacy-list">
                <li>adresse IP</li>
                <li>type de navigateur et système d&apos;exploitation</li>
                <li>dates d&apos;accès et pages consultées</li>
                <li>cookies et données de session</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Data Usage + legal bases */}
          <section className="privacy-section">
            <div className="section-number">2</div>
            <div className="section-content">
              <h2 className="section-title">
                <Eye size={24} />
                Comment nous utilisons vos données et sur quelle base légale
              </h2>

              <p className="section-text">
                Les données collectées sont utilisées uniquement aux fins suivantes :
              </p>

              <div className="usage-grid">
                <div className="usage-card">
                  <div className="usage-icon">
                    <UserCheck size={28} />
                  </div>
                  <h4>Fonctionnement du service</h4>
                  <ul>
                    <li>création et gestion des comptes</li>
                    <li>mise en relation clients / prestataires</li>
                    <li>affichage des profils et informations</li>
                    <li>traitement des avis et des notes</li>
                  </ul>
                  <p className="small-text">Base légale : exécution du contrat (art. 6.1.b RGPD).</p>
                </div>

                <div className="usage-card">
                  <div className="usage-icon">
                    <Mail size={28} />
                  </div>
                  <h4>Communication</h4>
                  <ul>
                    <li>envoi de codes de vérification par e-mail</li>
                    <li>notification de nouvelles demandes</li>
                    <li>informations sur les abonnements et paiements</li>
                    <li>support et service client</li>
                  </ul>
                  <p className="small-text">Base légale : exécution du contrat ; consentement pour les communications non essentielles.</p>
                </div>

                <div className="usage-card">
                  <div className="usage-icon">
                    <Database size={28} />
                  </div>
                  <h4>Amélioration du service</h4>
                  <ul>
                    <li>analyse des usages</li>
                    <li>amélioration de l&apos;expérience</li>
                    <li>développement de fonctionnalités</li>
                    <li>prévention des abus et de la fraude</li>
                  </ul>
                  <p className="small-text">Base légale : intérêt légitime (art. 6.1.f RGPD).</p>
                </div>

                <div className="usage-card">
                  <div className="usage-icon">
                    <Globe size={28} />
                  </div>
                  <h4>Statistiques</h4>
                  <ul>
                    <li>analyses générales d&apos;usage</li>
                    <li>rapports anonymisés</li>
                    <li>indicateurs de performance</li>
                    <li>tendances du marché</li>
                  </ul>
                  <p className="small-text">Base légale : intérêt légitime ; consentement pour les cookies de mesure d&apos;audience non exemptés.</p>
                </div>
              </div>

              <p className="section-text">
                Certaines données sont également conservées au titre d&apos;<strong>obligations légales</strong> (comptabilité, facturation, lutte contre la fraude) — base légale : art. 6.1.c RGPD.
              </p>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>Notre engagement :</strong> nous ne vendons jamais vos données personnelles à des tiers à des fins de prospection.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Email Verification for Reviews */}
          <section className="privacy-section">
            <div className="section-number">3</div>
            <div className="section-content">
              <h2 className="section-title">
                <Mail size={24} />
                Vérification de l&apos;e-mail pour les avis
              </h2>

              <p className="section-text">
                Dans le cadre du système d&apos;avis, une vérification de l&apos;adresse e-mail est requise avant toute publication. Fonctionnement :
              </p>

              <div className="process-timeline">
                <div className="timeline-item">
                  <div className="timeline-marker">1</div>
                  <div className="timeline-content">
                    <h4>Rédaction de l&apos;avis</h4>
                    <p>L&apos;utilisateur rédige un avis et saisit une adresse e-mail.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker">2</div>
                  <div className="timeline-content">
                    <h4>Code de vérification</h4>
                    <p>Le système envoie un code à 6 chiffres à l&apos;adresse e-mail.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker">3</div>
                  <div className="timeline-content">
                    <h4>Vérification</h4>
                    <p>L&apos;utilisateur saisit le code sous 15 minutes.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker">4</div>
                  <div className="timeline-content">
                    <h4>Publication</h4>
                    <p>L&apos;avis est publié dès la vérification réussie.</p>
                  </div>
                </div>
              </div>

              <h3 className="subsection-title">Sécurité des codes de vérification :</h3>
              <ul className="privacy-list">
                <li><strong>Validité limitée :</strong> 15 minutes.</li>
                <li><strong>Stockage sécurisé :</strong> les codes sont chiffrés en base.</li>
                <li><strong>Usage unique :</strong> chaque code ne peut servir qu&apos;une fois.</li>
                <li><strong>Suppression automatique :</strong> les codes expirés sont supprimés automatiquement.</li>
                <li><strong>Limitation :</strong> une adresse e-mail ne peut publier qu&apos;un avis par prestataire.</li>
              </ul>

              <div className="security-box">
                <Lock size={20} />
                <div>
                  <strong>Sécurité de l&apos;e-mail :</strong> les adresses e-mail utilisées pour la vérification ne sont ni vendues ni partagées. Elles servent uniquement à la vérification de l&apos;avis.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Data Sharing */}
          <section className="privacy-section">
            <div className="section-number">4</div>
            <div className="section-content">
              <h2 className="section-title">
                <Globe size={24} />
                Partage des données avec des tiers
              </h2>

              <h3 className="subsection-title">Informations publiques des prestataires :</h3>
              <p className="section-text">
                Les informations suivantes d&apos;un prestataire sont <strong>publiques</strong> et accessibles à tous les visiteurs du site :
              </p>
              <ul className="privacy-list highlight">
                <li>nom complet</li>
                <li>photo de profil</li>
                <li>description des services et tarifs</li>
                <li>zones d&apos;intervention</li>
                <li>avis et notes</li>
                <li>numéro de téléphone (optionnel, au choix du prestataire)</li>
              </ul>

              <div className="warning-box">
                <AlertCircle size={20} />
                <div>
                  <strong>À noter :</strong> prestataires — toute information publiée sur votre profil sera visible de tous les visiteurs. Ne publiez pas d&apos;informations sensibles que vous ne souhaitez pas rendre publiques.
                </div>
              </div>

              <h3 className="subsection-title">Sous-traitants et destinataires :</h3>
              <p className="section-text">
                Nous partageons des données limitées avec les prestataires techniques suivants, en qualité de sous-traitants au sens du RGPD (encadrés par un contrat conforme à l&apos;art. 28) :
              </p>

              <div className="partner-box">
                <h4>Prestataire de paiement — traitement des paiements</h4>
                <p>
                  Les paiements des abonnements prestataires sont traités par un prestataire de paiement agréé.
                  <strong> Nous ne conservons aucune donnée de carte bancaire </strong> — l&apos;ensemble des données de paiement est géré directement par ce prestataire, conforme à la norme PCI DSS.
                </p>
                <p className="small-text">Données transmises : nom, adresse e-mail, montant.</p>
              </div>

              <ul className="privacy-list">
                <li><strong>Hébergeur :</strong> [nom], pour l&apos;hébergement de l&apos;infrastructure (données stockées dans l&apos;Union européenne).</li>
                <li><strong>Prestataire d&apos;e-mailing transactionnel :</strong> [nom], pour l&apos;envoi des e-mails du service.</li>
                <li><strong>Outil de mesure d&apos;audience :</strong> [nom] (soumis à consentement lorsqu&apos;il n&apos;est pas exempté).</li>
              </ul>

              <h3 className="subsection-title">Obligations légales :</h3>
              <p className="section-text">
                Nous pouvons être amenés à divulguer des données personnelles :
              </p>
              <ul className="privacy-list">
                <li>sur réquisition judiciaire ou demande légale d&apos;une autorité compétente ;</li>
                <li>pour défendre les droits d&apos;AllSherut ;</li>
                <li>pour prévenir une activité illicite ou frauduleuse ;</li>
                <li>pour protéger la sécurité des autres utilisateurs.</li>
              </ul>

              <div className="commitment-box">
                <Shield size={24} />
                <div>
                  <h4>Notre engagement</h4>
                  <p>Nous <strong>ne vendons jamais</strong> vos données personnelles à des sociétés de marketing, des annonceurs ou d&apos;autres tiers à des fins lucratives.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Security */}
          <section className="privacy-section">
            <div className="section-number">5</div>
            <div className="section-content">
              <h2 className="section-title">
                <Lock size={24} />
                Sécurité des données
              </h2>

              <p className="section-text">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
              </p>

              <div className="security-features">
                <div className="security-feature">
                  <div className="feature-icon">
                    <Lock size={32} />
                  </div>
                  <h4>Chiffrement des mots de passe</h4>
                  <p>Les mots de passe sont hachés via l&apos;algorithme bcrypt. Nous ne pouvons pas voir votre mot de passe.</p>
                </div>

                <div className="security-feature">
                  <div className="feature-icon">
                    <Shield size={32} />
                  </div>
                  <h4>HTTPS</h4>
                  <p>Toutes les communications entre votre navigateur et nos serveurs sont chiffrées via HTTPS (certificats SSL/TLS).</p>
                </div>

                <div className="security-feature">
                  <div className="feature-icon">
                    <Clock size={32} />
                  </div>
                  <h4>Jetons JWT</h4>
                  <p>L&apos;authentification repose sur des jetons JWT à durée de validité limitée et renouvellement sécurisé.</p>
                </div>

                <div className="security-feature">
                  <div className="feature-icon">
                    <Database size={32} />
                  </div>
                  <h4>Protection des bases de données</h4>
                  <p>Nos bases sont protégées par des pare-feu, des sauvegardes régulières et des contrôles d&apos;accès stricts.</p>
                </div>
              </div>

              <h3 className="subsection-title">Protection contre les attaques :</h3>
              <ul className="privacy-list">
                <li><strong>Limitation de débit :</strong> limitation du nombre de requêtes (protection anti-DDoS).</li>
                <li><strong>Protection CSRF :</strong> prévention des attaques Cross-Site Request Forgery.</li>
                <li><strong>Injection SQL :</strong> requêtes préparées.</li>
                <li><strong>Protection XSS :</strong> filtrage des contenus pour empêcher l&apos;injection de code.</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>Important :</strong> malgré ces mesures, aucun système n&apos;est totalement inviolable. Utilisez des mots de passe forts et uniques et ne les partagez pas. En cas de violation de données susceptible d&apos;engendrer un risque élevé pour vos droits, nous vous en informerons et notifierons la CNIL conformément aux art. 33 et 34 du RGPD.
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Cookies */}
          <section className="privacy-section">
            <div className="section-number">6</div>
            <div className="section-content">
              <h2 className="section-title">
                <Database size={24} />
                Cookies et traceurs
              </h2>

              <h3 className="subsection-title">Types de cookies utilisés :</h3>

              <div className="cookies-grid">
                <div className="cookie-type essential">
                  <h4>🔐 Cookies strictement nécessaires</h4>
                  <p className="type-label">Requis au fonctionnement</p>
                  <ul>
                    <li>authentification (jetons JWT)</li>
                    <li>gestion de session</li>
                    <li>préférences de sécurité</li>
                  </ul>
                  <p className="small-text">Non désactivables — nécessaires au fonctionnement du site (exemptés de consentement).</p>
                </div>

                <div className="cookie-type functional">
                  <h4>⚙️ Cookies fonctionnels</h4>
                  <p className="type-label">Améliorent l&apos;expérience</p>
                  <ul>
                    <li>mémorisation des préférences</li>
                    <li>langue de l&apos;interface</li>
                    <li>préférences d&apos;affichage</li>
                  </ul>
                  <p className="small-text">Désactivables — impact sur le confort d&apos;utilisation.</p>
                </div>

                <div className="cookie-type analytics">
                  <h4>📊 Cookies de mesure d&apos;audience</h4>
                  <p className="type-label">Mesure de performance</p>
                  <ul>
                    <li>analyse de la navigation</li>
                    <li>mesure de performance des pages</li>
                    <li>amélioration de l&apos;expérience</li>
                  </ul>
                  <p className="small-text">Soumis à votre consentement (sauf configuration exemptée par la CNIL).</p>
                </div>
              </div>

              <h3 className="subsection-title">Gestion des cookies :</h3>
              <p className="section-text">
                Vous pouvez gérer vos préférences via le bandeau cookies du site et via les réglages de votre navigateur. Le blocage de certains cookies peut affecter le fonctionnement du site.
              </p>

              <div className="browser-guide">
                <h4>Gérer les cookies dans les navigateurs courants :</h4>
                <ul className="privacy-list">
                  <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                  <li><strong>Firefox :</strong> Paramètres → Vie privée et sécurité → Cookies</li>
                  <li><strong>Safari :</strong> Préférences → Confidentialité</li>
                  <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: User Rights (GDPR) */}
          <section className="privacy-section">
            <div className="section-number">7</div>
            <div className="section-content">
              <h2 className="section-title">
                <UserCheck size={24} />
                Vos droits
              </h2>

              <p className="section-text">
                Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits suivants :
              </p>

              <div className="rights-grid">
                <div className="right-card">
                  <div className="right-icon">👁️</div>
                  <h4>Droit d&apos;accès</h4>
                  <p>Savoir quelles données personnelles nous détenons et en obtenir une copie.</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">✏️</div>
                  <h4>Droit de rectification</h4>
                  <p>Corriger des données inexactes ou incomplètes.</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">🗑️</div>
                  <h4>Droit à l&apos;effacement</h4>
                  <p>Demander la suppression de vos données (« droit à l&apos;oubli »).</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">📦</div>
                  <h4>Droit à la portabilité</h4>
                  <p>Recevoir vos données dans un format structuré et lisible par machine.</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">⛔</div>
                  <h4>Droit d&apos;opposition</h4>
                  <p>Vous opposer au traitement de vos données dans certains cas.</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">⏸️</div>
                  <h4>Droit à la limitation</h4>
                  <p>Demander la limitation du traitement de vos données sous certaines conditions.</p>
                </div>
              </div>

              <p className="section-text">
                Vous pouvez également retirer votre consentement à tout moment (pour les traitements fondés sur le consentement) et définir des directives relatives au sort de vos données après votre décès.
              </p>

              <h3 className="subsection-title">Comment exercer vos droits :</h3>
              <p className="section-text">
                Adressez votre demande par e-mail à <strong>privacy@allsherut.com</strong> (ou dpo@allsherut.com). Une pièce d&apos;identité pourra être demandée en cas de doute raisonnable sur votre identité.
              </p>
              <p className="section-text">
                Nous répondons dans un délai d&apos;un mois à compter de la réception de la demande (prolongeable de deux mois en cas de complexité).
              </p>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>Réclamation :</strong> si vous estimez que le traitement de vos données n&apos;est pas conforme, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — www.cnil.fr).
                </div>
              </div>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>À noter :</strong> dans certains cas, nous ne pourrons pas effacer l&apos;intégralité de vos données (obligation légale de conservation, avis publics que vous avez publiés, etc.).
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Data Retention */}
          <section className="privacy-section">
            <div className="section-number">8</div>
            <div className="section-content">
              <h2 className="section-title">
                <Clock size={24} />
                Durées de conservation
              </h2>

              <h3 className="subsection-title">Durées appliquées :</h3>

              <div className="retention-table">
                <div className="retention-row header">
                  <div>Type de données</div>
                  <div>Durée de conservation</div>
                  <div>Motif</div>
                </div>

                <div className="retention-row">
                  <div><strong>Compte actif</strong></div>
                  <div>Tant que le compte est actif</div>
                  <div>Exécution du service</div>
                </div>

                <div className="retention-row">
                  <div><strong>Avis publiés</strong></div>
                  <div>Sans limite (tant que le prestataire est référencé)</div>
                  <div>Transparence publique / intérêt légitime</div>
                </div>

                <div className="retention-row">
                  <div><strong>Historique de facturation</strong></div>
                  <div>10 ans</div>
                  <div>Obligations comptables et fiscales</div>
                </div>

                <div className="retention-row">
                  <div><strong>Codes de vérification e-mail</strong></div>
                  <div>15 minutes</div>
                  <div>Sécurité, suppression automatique</div>
                </div>

                <div className="retention-row">
                  <div><strong>Journaux techniques (logs)</strong></div>
                  <div>Jusqu&apos;à 12 mois</div>
                  <div>Sécurité et support</div>
                </div>

                <div className="retention-row">
                  <div><strong>Comptes résiliés</strong></div>
                  <div>30 jours (délai de grâce)</div>
                  <div>Possibilité de restauration</div>
                </div>

                <div className="retention-row">
                  <div><strong>Enregistrement anti-fraude (essai)</strong></div>
                  <div>Jusqu&apos;à 24 mois</div>
                  <div>Prévention des abus (données chiffrées)</div>
                </div>
              </div>

              <h3 className="subsection-title">Après la suppression du compte :</h3>
              <ul className="privacy-list">
                <li><strong>Données personnelles :</strong> supprimées sans possibilité de restauration (sauf obligation légale).</li>
                <li><strong>Avis :</strong> supprimés des serveurs.</li>
                <li><strong>Photos :</strong> supprimées des serveurs.</li>
                <li><strong>Historique de facturation :</strong> conservé uniquement aux fins légales et comptables.</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>À savoir :</strong> nous ne conservons les données que pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées, ou telle qu&apos;imposée par la loi.
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Hosting & transfers */}
          <section className="privacy-section">
            <div className="section-number">9</div>
            <div className="section-content">
              <h2 className="section-title">
                <Globe size={24} />
                Hébergement et transferts de données
              </h2>

              <h3 className="subsection-title">Localisation des serveurs :</h3>
              <p className="section-text">
                Nos serveurs et sauvegardes sont situés dans l&apos;Union européenne. Nous privilégions des prestataires dont l&apos;infrastructure est hébergée dans l&apos;UE et qui respectent le RGPD.
              </p>

              <h3 className="subsection-title">Sous-traitants :</h3>
              <div className="service-box">
                <h4>Prestataire de paiement</h4>
                <p>
                  Prestataire de paiement agréé, conforme à la norme internationale de sécurité PCI DSS.
                </p>
                <p>
                  L&apos;ensemble des données de paiement est géré directement par ce prestataire. Nous ne stockons aucune donnée de carte bancaire sur nos serveurs.
                </p>
              </div>

              <h3 className="subsection-title">Transferts hors UE :</h3>
              <p className="section-text">
                Si un sous-traitant devait traiter des données en dehors de l&apos;Espace économique européen, ce transfert serait encadré par des garanties appropriées au sens du RGPD (décision d&apos;adéquation ou clauses contractuelles types de la Commission européenne). La liste à jour des sous-traitants et des pays concernés peut être obtenue auprès de dpo@allsherut.com.
              </p>

              <h3 className="subsection-title">Mesures de protection :</h3>
              <ul className="privacy-list">
                <li>conformité PCI DSS pour les paiements ;</li>
                <li>conformité au RGPD et à la loi « Informatique et Libertés » ;</li>
                <li>transferts chiffrés (SSL/HTTPS) ;</li>
                <li>contrats de sous-traitance conformes à l&apos;article 28 du RGPD.</li>
              </ul>
            </div>
          </section>

          {/* Section 10: Contact */}
          <section className="privacy-section">
            <div className="section-number">10</div>
            <div className="section-content">
              <h2 className="section-title">
                <Mail size={24} />
                Nous contacter
              </h2>

              <p className="section-text">
                Pour toute question, demande ou signalement relatif à la protection des données :
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <Mail size={28} />
                  </div>
                  <div className="method-content">
                    <h4>E-mail</h4>
                    <p><strong>Données personnelles / RGPD :</strong> privacy@allsherut.com</p>
                    <p><strong>Support général :</strong> support@allsherut.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <UserCheck size={28} />
                  </div>
                  <div className="method-content">
                    <h4>Délégué à la protection des données</h4>
                    <p>Vous pouvez contacter directement notre DPO : dpo@allsherut.com</p>
                  </div>
                </div>
              </div>

              <div className="response-time">
                <Clock size={20} />
                <p>Nous nous engageons à répondre à toute demande dans un délai d&apos;<strong>un mois</strong> à compter de sa réception.</p>
              </div>
            </div>
          </section>

          {/* Section 11: Policy Changes */}
          <section className="privacy-section">
            <div className="section-number">11</div>
            <div className="section-content">
              <h2 className="section-title">
                <AlertCircle size={24} />
                Modifications de la politique
              </h2>

              <p className="section-text">
                Nous pouvons mettre à jour cette politique de confidentialité pour refléter des évolutions du service ou des obligations légales.
              </p>

              <h3 className="subsection-title">Comment vous êtes informé :</h3>
              <ul className="privacy-list">
                <li><strong>Modifications mineures :</strong> mise à jour de la date en tête du document.</li>
                <li><strong>Modifications substantielles :</strong> e-mail à l&apos;ensemble des utilisateurs inscrits.</li>
                <li><strong>Modifications majeures :</strong> bandeau visible sur le site et, le cas échéant, recueil du consentement.</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>Recommandation :</strong> consultez cette page régulièrement pour rester informé des évolutions.
                </div>
              </div>

              <h3 className="subsection-title">Poursuite de l&apos;utilisation :</h3>
              <p className="section-text">
                La poursuite de l&apos;utilisation du service après mise à jour de la politique vaut acceptation des termes modifiés.
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <div className="privacy-footer-note">
            <Shield size={32} />
            <h3>Notre engagement</h3>
            <p>
              Nous considérons la protection de votre vie privée comme une priorité et nous nous engageons à la garantir par l&apos;ensemble des moyens techniques et organisationnels à notre disposition.
            </p>
            <p className="small-text">
              Document mis à jour le : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default PrivacyPolicy;
