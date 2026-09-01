import React from 'react';
import { FileText, Shield, Users, CreditCard, AlertCircle, AlertTriangle, Scale } from 'lucide-react';
import '../styles/pages/terms-of-service.css';

/*
 * ⚠️ MODÈLE À FAIRE RELIRE PAR UN JURISTE avant mise en ligne.
 * Rédigé pour un site édité et exploité en France (droit français + RGPD).
 * Les mentions entre [crochets] doivent être complétées (raison sociale, SIRET,
 * adresse, hébergeur, coordonnées…).
 */

const TermsOfService = () => {
  return (
    <div className="terms-page" dir="ltr">

      <main className="terms-content">
        <div className="container">
          {/* Hero Section */}
          <section className="terms-hero">
            <div className="hero-icon-wrapper">
              <FileText className="hero-icon" size={48} />
            </div>
            <h1 className="terms-title">Conditions Générales d&apos;Utilisation</h1>
            <p className="terms-subtitle">
              Conditions d&apos;utilisation de la plateforme AllSherut — à lire attentivement avant toute utilisation du service.
            </p>
            <div className="last-updated">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </div>
          </section>

          {/* Section 0: Mentions légales */}
          <section className="terms-section">
            <div className="section-number">0</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                Mentions légales
              </h2>
              <ul className="terms-list">
                <li><strong>Éditeur :</strong> [Raison sociale], [forme juridique] au capital de [montant] €, immatriculée au RCS de [ville] sous le numéro [SIRET/RCS].</li>
                <li><strong>Siège social :</strong> [adresse complète].</li>
                <li><strong>Directeur de la publication :</strong> [nom].</li>
                <li><strong>Contact :</strong> legal@allsherut.com — [téléphone].</li>
                <li><strong>Hébergeur :</strong> [nom de l&apos;hébergeur], [adresse], [téléphone].</li>
                <li><strong>Numéro de TVA intracommunautaire :</strong> [FR…].</li>
              </ul>
            </div>
          </section>

          {/* Section 1: Service Definition */}
          <section className="terms-section">
            <div className="section-number">1</div>
            <div className="section-content">
              <h2 className="section-title">
                <Shield size={24} />
                Définition du service
              </h2>
              <p className="section-text">
                AllSherut est une plateforme numérique de mise en relation entre des clients et des prestataires de services indépendants dans différents domaines.
              </p>

              <h3 className="subsection-title">Types de services proposés sur la plateforme :</h3>
              <ul className="terms-list">
                <li><strong>Baby-sitting</strong> — garde d&apos;enfants</li>
                <li><strong>Ménage</strong> — entretien du domicile</li>
                <li><strong>Jardinage</strong> — création et entretien de jardins</li>
                <li><strong>Garde d&apos;animaux</strong> — soin et garde d&apos;animaux de compagnie</li>
                <li><strong>Soutien scolaire</strong> — cours particuliers et accompagnement</li>
                <li><strong>Aide aux personnes âgées</strong> — accompagnement et assistance</li>
                <li><strong>Blanchisserie et repassage</strong> — services de lavage professionnels</li>
                <li><strong>Gestion locative</strong> — gestionnaires expérimentés pour propriétaires ne résidant pas à proximité du bien</li>
                <li>… et l&apos;ensemble des autres catégories de services répertoriées sur le site.</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>Important :</strong> AllSherut agit uniquement comme intermédiaire de mise en relation. Nous n&apos;employons pas les prestataires et ne sommes pas responsables des prestations réalisées.
                </div>
              </div>

              <h3 className="subsection-title">Distinction entre catégories d&apos;utilisateurs :</h3>
              <ul className="terms-list">
                <li><strong>Clients</strong> — accès libre et gratuit à l&apos;ensemble des services</li>
                <li><strong>Prestataires</strong> — abonnement mensuel requis à l&apos;issue d&apos;une période d&apos;essai de 30 jours</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Registration and Accounts */}
          <section className="terms-section">
            <div className="section-number">2</div>
            <div className="section-content">
              <h2 className="section-title">
                <Users size={24} />
                Inscription et comptes utilisateurs
              </h2>

              <h3 className="subsection-title">Conditions de création d&apos;un compte :</h3>
              <ul className="terms-list">
                <li>L&apos;utilisation de la plateforme est réservée aux personnes de 16 ans et plus.</li>
                <li>Les mineurs doivent disposer de l&apos;autorisation de leur représentant légal ; toute activité rémunérée d&apos;un mineur reste soumise aux dispositions du Code du travail.</li>
                <li>Fournir des informations exactes, à jour et complètes lors de l&apos;inscription.</li>
                <li>Disposer d&apos;une adresse e-mail valide pour la vérification du compte.</li>
                <li>Assumer l&apos;entière responsabilité de la confidentialité de ses identifiants (mot de passe).</li>
              </ul>

              <h3 className="subsection-title">Sécurité du compte :</h3>
              <ul className="terms-list">
                <li>L&apos;utilisateur est seul responsable de toute activité effectuée depuis son compte.</li>
                <li>Il doit informer AllSherut sans délai en cas de soupçon d&apos;utilisation non autorisée.</li>
                <li>Les identifiants ne doivent pas être partagés avec des tiers.</li>
              </ul>

              <h3 className="subsection-title">Droit de suspension et de résiliation des comptes :</h3>
              <p className="section-text">
                AllSherut se réserve le droit de suspendre ou de résilier un compte dans les cas suivants :
              </p>
              <ul className="terms-list">
                <li>Violation des présentes conditions d&apos;utilisation</li>
                <li>Activité suspecte ou préjudiciable</li>
                <li>Communication d&apos;informations fausses ou trompeuses</li>
                <li>Fraude ou tentative de fraude</li>
                <li>Atteinte aux autres utilisateurs</li>
              </ul>
            </div>
          </section>

          {/* Section 3: For Providers */}
          <section className="terms-section">
            <div className="section-number">3</div>
            <div className="section-content">
              <h2 className="section-title">
                <CreditCard size={24} />
                Conditions applicables aux prestataires
              </h2>

              <h3 className="subsection-title">Structure de l&apos;abonnement :</h3>
              <div className="highlight-box">
                <ul className="terms-list">
                  <li><strong>Premier mois</strong> — période d&apos;essai gratuite et sans engagement</li>
                  <li><strong>À partir du deuxième mois</strong> — abonnement mensuel</li>
                  <li>L&apos;abonnement peut être résilié à tout moment</li>
                  <li>La résiliation prend effet au terme de la période déjà réglée</li>
                </ul>
              </div>

              <div className="warning-box">
                <AlertTriangle size={20} />
                <div>
                  <strong>Politique de la période d&apos;essai gratuite</strong>
                  <ul className="terms-list" style={{ marginTop: '0.5rem' }}>
                    <li>La période d&apos;essai gratuite est accordée <strong>une seule fois</strong> par adresse e-mail et par numéro de téléphone.</li>
                    <li>Une nouvelle inscription avec la même adresse e-mail ou le même numéro ne donne pas droit à une nouvelle période d&apos;essai.</li>
                    <li>Cette règle vise à prévenir les abus et à garantir l&apos;équité entre prestataires.</li>
                    <li>Même après suppression du compte, un enregistrement (chiffré) est conservé aux seules fins de prévention de la fraude.</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">Obligations des prestataires :</h3>
              <ul className="terms-list">
                <li><strong>Exactitude des informations</strong> — fournir des informations professionnelles exactes et à jour</li>
                <li><strong>Qualifications et autorisations</strong> — détenir l&apos;ensemble des diplômes, agréments et assurances requis pour l&apos;activité exercée</li>
                <li><strong>Disponibilité</strong> — tenir à jour ses disponibilités et zones d&apos;intervention</li>
                <li><strong>Réactivité</strong> — répondre de manière professionnelle et courtoise aux demandes</li>
                <li><strong>Qualité</strong> — fournir une prestation d&apos;un niveau professionnel</li>
              </ul>

              <h3 className="subsection-title">Résiliation et remboursements :</h3>
              <ul className="terms-list">
                <li>Résiliation dans les 14 jours suivant la souscription d&apos;un nouvel abonnement : remboursement intégral.</li>
                <li>Résiliation après la période d&apos;essai : le compte reste actif jusqu&apos;au terme de la période déjà réglée.</li>
                <li>Aucun remboursement au prorata d&apos;une période d&apos;abonnement entamée.</li>
                <li>L&apos;abonnement annuel, consenti à tarif réduit, n&apos;ouvre pas droit à un remboursement au prorata.</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>À noter :</strong> la résiliation n&apos;entraîne pas la suppression immédiate du compte. Celui-ci reste actif jusqu&apos;au terme de la période réglée, puis est supprimé automatiquement.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: For Clients */}
          <section className="terms-section">
            <div className="section-number">4</div>
            <div className="section-content">
              <h2 className="section-title">
                <Users size={24} />
                Conditions applicables aux clients
              </h2>

              <h3 className="subsection-title">Utilisation gratuite :</h3>
              <p className="section-text">
                Les clients bénéficient d&apos;un accès illimité et gratuit à l&apos;ensemble des services de la plateforme.
              </p>

              <h3 className="subsection-title">Recherche et prise de contact :</h3>
              <ul className="terms-list">
                <li>Recherche libre parmi l&apos;ensemble des prestataires</li>
                <li>Accès aux informations publiées par les prestataires</li>
                <li>Prise de contact directe avec les prestataires</li>
                <li>Aucune limite au nombre de demandes</li>
              </ul>

              <h3 className="subsection-title">Interdictions :</h3>
              <ul className="terms-list">
                <li><strong>Usage abusif</strong> — sollicitations harcelantes ou hors sujet</li>
                <li><strong>Spam</strong> — envoi de messages en masse ou publicitaires</li>
                <li><strong>Collecte de données</strong> — extraction automatisée de données (scraping)</li>
                <li><strong>Usurpation</strong> — création de profils falsifiés</li>
              </ul>

              <div className="warning-box">
                <AlertCircle size={20} />
                <div>
                  <strong>Avertissement :</strong> tout usage abusif de la plateforme peut entraîner le blocage immédiat du compte, sans préavis.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Review System */}
          <section className="terms-section">
            <div className="section-number">5</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                Système d&apos;avis et de notation
              </h2>

              <h3 className="subsection-title">Processus de publication d&apos;un avis :</h3>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>Rédaction de l&apos;avis</strong>
                    <p>Le client rédige son appréciation de la prestation reçue.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>Vérification de l&apos;e-mail</strong>
                    <p>Envoi d&apos;un code de vérification à 6 chiffres par e-mail.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>Publication immédiate</strong>
                    <p>L&apos;avis est publié dès la vérification de l&apos;e-mail.</p>
                  </div>
                </div>
              </div>

              <h3 className="subsection-title">Règles de publication des avis :</h3>
              <ul className="terms-list">
                <li><strong>Vérification obligatoire</strong> — chaque avis requiert la vérification de l&apos;e-mail par un code à 6 chiffres.</li>
                <li><strong>Publication immédiate</strong> — les avis sont publiés immédiatement après vérification.</li>
                <li><strong>Un avis par prestataire</strong> — chaque adresse e-mail ne peut publier qu&apos;un seul avis par prestataire.</li>
                <li><strong>Validité du code</strong> — 15 minutes.</li>
              </ul>

              <h3 className="subsection-title">Interdictions dans le système d&apos;avis :</h3>
              <ul className="terms-list">
                <li>Publier des avis faux ou trompeurs</li>
                <li>Avis rédigés par le prestataire lui-même ou pour son compte</li>
                <li>Propos injurieux, menaçants ou grossiers</li>
                <li>Publication de données personnelles d&apos;un prestataire</li>
                <li>Avis sans lien avec la prestation fournie</li>
              </ul>

              <h3 className="subsection-title">Droit de réponse des prestataires :</h3>
              <p className="section-text">
                Les prestataires peuvent répondre aux avis publiés à leur sujet :
              </p>
              <ul className="terms-list">
                <li>Une réponse par avis</li>
                <li>Sans limite de délai pour répondre</li>
                <li>La réponse s&apos;affiche sous l&apos;avis</li>
                <li>Aucune modification possible après publication de la réponse</li>
              </ul>

              <h3 className="subsection-title">Lutte contre le spam :</h3>
              <ul className="terms-list">
                <li>Une adresse e-mail ne peut publier qu&apos;un avis par prestataire.</li>
                <li>Les codes de vérification sont valables 15 minutes.</li>
                <li>Suppression automatique des codes expirés.</li>
                <li>Détection et blocage des comportements suspects.</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Payments */}
          <section className="terms-section">
            <div className="section-number">6</div>
            <div className="section-content">
              <h2 className="section-title">
                <CreditCard size={24} />
                Paiements et abonnements
              </h2>

              <h3 className="subsection-title">Système de paiement :</h3>
              <p className="section-text">
                Les paiements sont traités par un prestataire de paiement agréé et sécurisé. AllSherut ne conserve aucune donnée de carte bancaire des utilisateurs.
              </p>

              <h3 className="subsection-title">Types d&apos;abonnement :</h3>
              <div className="pricing-info">
                <div className="pricing-plan">
                  <h4>Abonnement mensuel</h4>
                  <ul>
                    <li>Paiement mensuel</li>
                    <li>Résiliable à tout moment</li>
                    <li>Prélèvement automatique en début de mois</li>
                  </ul>
                </div>
                <div className="pricing-plan">
                  <h4>Abonnement annuel</h4>
                  <ul>
                    <li>Paiement unique pour l&apos;année</li>
                    <li>Réduction significative par rapport au mensuel</li>
                    <li>Prélèvement automatique au terme de l&apos;année</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">Reconduction automatique :</h3>
              <ul className="terms-list">
                <li>Les abonnements sont reconduits automatiquement au terme de chaque période.</li>
                <li>Envoi d&apos;e-mails de rappel 7 et 3 jours avant la fin de la période d&apos;essai.</li>
                <li>Alerte en cas d&apos;échec de paiement.</li>
                <li>La reconduction automatique peut être désactivée à tout moment depuis le tableau de bord.</li>
                <li>Conformément à la réglementation, la reconduction fait l&apos;objet d&apos;une information préalable et peut être refusée sans frais.</li>
              </ul>

              <h3 className="subsection-title">Remboursements :</h3>
              <ul className="terms-list">
                <li><strong>Période d&apos;essai</strong> — aucun prélèvement, aucun remboursement nécessaire.</li>
                <li><strong>14 premiers jours</strong> — remboursement intégral en cas de résiliation.</li>
                <li><strong>Après 14 jours</strong> — pas de remboursement, mais le service se poursuit jusqu&apos;au terme de la période réglée.</li>
                <li><strong>Abonnement annuel</strong> — pas de remboursement au prorata, le service se poursuit jusqu&apos;au terme de l&apos;année.</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>À savoir :</strong> la résiliation n&apos;entraîne pas de suppression immédiate. Vous pouvez continuer à utiliser tous les services jusqu&apos;au terme de la période réglée, puis le compte est supprimé automatiquement.
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Liability */}
          <section className="terms-section">
            <div className="section-number">7</div>
            <div className="section-content">
              <h2 className="section-title">
                <Shield size={24} />
                Responsabilité et limitation de responsabilité
              </h2>

              <h3 className="subsection-title">Rôle de la plateforme :</h3>
              <div className="highlight-box important">
                <p>
                  <strong>AllSherut agit uniquement comme plateforme de mise en relation.</strong> Nous fournissons un outil de mise en contact entre clients et prestataires indépendants, mais <strong>nous ne les employons pas, ne les rémunérons pas et ne sommes pas responsables de leurs actes ou de leurs omissions</strong>.
                </p>
              </div>

              <h3 className="subsection-title">Déclaration d&apos;absence de responsabilité :</h3>
              <div className="warning-box critical">
                <AlertTriangle size={24} />
                <div>
                  <p><strong>Point essentiel :</strong></p>
                  <p>
                    Dans les limites autorisées par la loi, AllSherut <strong>n&apos;est pas responsable</strong> des dommages, préjudices, pertes ou incidents causés par les prestataires ou en lien avec leurs prestations, notamment :
                  </p>
                  <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-6)' }}>
                    <li>atteintes aux personnes, agressions, ou tout dommage corporel</li>
                    <li>vols, cambriolages ou dommages aux biens</li>
                    <li>négligence, manquement ou mauvaise exécution de la prestation</li>
                    <li>actes délictueux ou comportement inapproprié</li>
                    <li>préjudices moraux, émotionnels ou psychologiques</li>
                    <li>atteintes à la santé</li>
                    <li>perte ou détérioration d&apos;objets de valeur</li>
                    <li>toute conséquence directe ou indirecte de la prestation fournie</li>
                  </ul>
                  <p style={{ marginTop: 'var(--space-4)', fontWeight: '700' }}>
                    Toute relation contractuelle, responsabilité et action en justice relèvent exclusivement du client et du prestataire. AllSherut n&apos;est pas partie à la prestation.
                  </p>
                </div>
              </div>

              <h3 className="subsection-title">Statut des prestataires :</h3>
              <div className="info-box">
                <FileText size={20} />
                <div>
                  <strong>Précision importante :</strong> les prestataires inscrits sur la plateforme sont des <strong>travailleurs indépendants</strong> et non des salariés d&apos;AllSherut. Aucun lien de subordination n&apos;existe entre eux et l&apos;éditeur. AllSherut ne&nbsp;:
                  <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-6)' }}>
                    <li>verse aucune rémunération, cotisation sociale ou impôt pour les prestataires</li>
                    <li>ne fournit ni formation, ni encadrement, ni supervision de leur travail</li>
                    <li>ne fixe ni horaires, ni méthodes, ni exigences de résultat</li>
                    <li>ne fournit ni matériel, ni outils, ni consommables</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">Absence de garantie sur les prestations :</h3>
              <ul className="terms-list">
                <li>AllSherut <strong>ne vérifie pas</strong> les qualifications, autorisations ou antécédents des prestataires.</li>
                <li>AllSherut <strong>ne contrôle pas</strong> leur identité ni leur adresse.</li>
                <li>AllSherut <strong>ne supervise pas</strong> l&apos;exécution des prestations.</li>
                <li>AllSherut <strong>ne garantit ni</strong> la qualité, ni la sécurité, ni le professionnalisme.</li>
                <li>AllSherut <strong>n&apos;est pas responsable</strong> de la validité des assurances de responsabilité professionnelle des prestataires.</li>
              </ul>

              <h3 className="subsection-title">Relation contractuelle :</h3>
              <p className="section-text">
                <strong>Tout accord d&apos;exécution d&apos;une prestation est conclu directement entre le client et le prestataire.</strong> AllSherut n&apos;est pas partie à ce contrat, ne garantit pas son exécution et n&apos;assume aucune responsabilité quant à ses résultats. Le client et le prestataire sont seuls responsables de tout accord, condition de paiement ou engagement conclu entre eux.
              </p>

              <h3 className="subsection-title">Plafond de responsabilité :</h3>
              <div className="highlight-box important">
                <p><strong>Si la responsabilité d&apos;AllSherut venait à être engagée par une décision de justice :</strong></p>
                <ul style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-6)' }}>
                  <li>elle serait limitée au montant réglé au titre de l&apos;abonnement au cours des 12 derniers mois (pour les clients : 0 €) ;</li>
                  <li>aucune indemnisation ne serait due au titre des dommages indirects, consécutifs, punitifs ou spéciaux ;</li>
                  <li>aucune indemnisation ne serait due au titre d&apos;une perte de bénéfices, de données, d&apos;opportunités commerciales ou d&apos;un préjudice moral ;</li>
                  <li>ces limitations ne s&apos;appliquent pas en cas de faute lourde, de dol, de dommage corporel ou dans les autres cas où la loi les prohibe.</li>
                </ul>
              </div>

              <h3 className="subsection-title">Recommandations de sécurité :</h3>
              <div className="warning-box">
                <Shield size={20} />
                <div>
                  <strong>Nous recommandons vivement de :</strong>
                  <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-6)' }}>
                    <li>vérifier vous-même les références des prestataires avant de faire appel à eux ;</li>
                    <li>demander une pièce d&apos;identité et vérifier les coordonnées lors du premier rendez-vous ;</li>
                    <li>vérifier des avis réels de clients précédents (y compris hors plateforme) ;</li>
                    <li>exiger une attestation d&apos;assurance de responsabilité professionnelle en cours de validité ;</li>
                    <li>ne pas laisser seuls des enfants ou des personnes vulnérables avec un prestataire dont la fiabilité n&apos;est pas établie ;</li>
                    <li>signaler à la police ou à la gendarmerie tout soupçon d&apos;activité délictueuse ;</li>
                    <li>formaliser par écrit l&apos;accord conclu avec le prestataire ;</li>
                    <li>ne pas remettre de clés ni donner accès au domicile en votre absence.</li>
                  </ul>
                  <p style={{ marginTop: 'var(--space-4)', fontWeight: '700', color: '#92400e' }}>
                    Votre sécurité et celle de vos proches relèvent de votre seule responsabilité.
                  </p>
                </div>
              </div>

              <h3 className="subsection-title">Signalement d&apos;un incident :</h3>
              <p className="section-text">
                En cas d&apos;incident, d&apos;accident ou de préjudice lié à une prestation :
              </p>
              <ol className="terms-list">
                <li><strong>Contactez immédiatement la police ou la gendarmerie</strong> en cas d&apos;infraction ou de préjudice grave.</li>
                <li><strong>Conservez les preuves</strong> (photos, messages, documents).</li>
                <li><strong>Signalez-le à AllSherut</strong> par e-mail : incidents@allsherut.com</li>
                <li><strong>Consultez un avocat</strong> pour un conseil juridique.</li>
              </ol>
              <p className="section-text">
                <strong>À noter :</strong> un signalement à AllSherut ne vaut pas reconnaissance de responsabilité. Nous pouvons retirer un prestataire de la plateforme ; il s&apos;agit d&apos;une mesure administrative qui n&apos;emporte aucune reconnaissance de responsabilité.
              </p>

              <h3 className="subsection-title">Nos droits :</h3>
              <ul className="terms-list">
                <li>AllSherut se réserve le droit de refuser toute demande ou réclamation.</li>
                <li>Nous pouvons retirer des utilisateurs de la plateforme sans préavis.</li>
                <li>Nous ne sommes pas tenus de procéder à des vérifications d&apos;antécédents ou d&apos;identité.</li>
                <li>Les informations de la plateforme sont fournies « en l&apos;état », sans garantie.</li>
              </ul>

              <div className="warning-box critical" style={{ marginTop: 'var(--space-8)' }}>
                <AlertTriangle size={24} />
                <div>
                  <p style={{ fontSize: 'var(--text-lg)', fontWeight: '700', marginBottom: 'var(--space-3)' }}>
                    Avertissement important :
                  </p>
                  <p>
                    L&apos;utilisation de la plateforme vaut <strong>acceptation expresse</strong> des conditions de responsabilité ci-dessus. <strong>Si vous n&apos;êtes pas d&apos;accord</strong>, n&apos;utilisez pas le service.
                  </p>
                  <p style={{ marginTop: 'var(--space-3)' }}>
                    <strong>Rappel :</strong> AllSherut n&apos;est qu&apos;une plateforme de mise en relation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Intellectual Property */}
          <section className="terms-section">
            <div className="section-number">8</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                Propriété intellectuelle
              </h2>

              <h3 className="subsection-title">Droits d&apos;AllSherut :</h3>
              <ul className="terms-list">
                <li>L&apos;ensemble des droits sur la plateforme, son design, son code et son contenu appartiennent à AllSherut.</li>
                <li>Le nom, le logo et la marque sont protégés.</li>
                <li>Il est interdit de copier, reproduire ou diffuser des éléments de la plateforme sans autorisation.</li>
                <li>Il est interdit d&apos;utiliser le nom ou le logo d&apos;AllSherut à des fins commerciales.</li>
              </ul>

              <h3 className="subsection-title">Droits des utilisateurs :</h3>
              <ul className="terms-list">
                <li>Les utilisateurs conservent leurs droits sur les contenus qu&apos;ils publient (photos, descriptions).</li>
                <li>Les utilisateurs concèdent à AllSherut une licence d&apos;utilisation de ces contenus pour le fonctionnement du service.</li>
                <li>Cette licence inclut le droit d&apos;afficher, de diffuser et d&apos;adapter les contenus pour les besoins de la plateforme.</li>
                <li>Les utilisateurs déclarent détenir les droits nécessaires sur les contenus qu&apos;ils publient.</li>
              </ul>

              <h3 className="subsection-title">Atteintes à la propriété intellectuelle :</h3>
              <p className="section-text">
                Si vous estimez qu&apos;un contenu de la plateforme porte atteinte à vos droits, contactez-nous sans délai. Nous examinerons toute réclamation et agirons en conséquence.
              </p>
            </div>
          </section>

          {/* Section 9: Termination */}
          <section className="terms-section">
            <div className="section-number">9</div>
            <div className="section-content">
              <h2 className="section-title">
                <AlertCircle size={24} />
                Résiliation et suppression de compte
              </h2>

              <h3 className="subsection-title">Résiliation à l&apos;initiative de l&apos;utilisateur :</h3>
              <p className="section-text">
                Les utilisateurs peuvent résilier leur compte à tout moment depuis leur tableau de bord.
              </p>

              <h3 className="subsection-title">Résiliation d&apos;abonnement — processus :</h3>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>Demande de résiliation</strong>
                    <p>Le prestataire résilie son abonnement depuis la page de gestion.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>Période transitoire</strong>
                    <p>Le compte reste actif jusqu&apos;au terme de la période réglée.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>Suppression automatique</strong>
                    <p>Le compte est supprimé automatiquement au terme de l&apos;abonnement.</p>
                  </div>
                </div>
              </div>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>Avantage :</strong> ce processus vous permet de résilier sans perdre l&apos;accès immédiatement. Vous pouvez continuer à recevoir des demandes et à gérer votre profil jusqu&apos;au terme de la période réglée.
                </div>
              </div>

              <h3 className="subsection-title">Annulation de la demande de suppression :</h3>
              <p className="section-text">
                Si vous avez résilié votre abonnement et demandé la suppression du compte, vous pouvez annuler cette demande à tout moment avant la date de suppression prévue et reprendre l&apos;abonnement.
              </p>

              <h3 className="subsection-title">Suppression immédiate :</h3>
              <p className="section-text">
                Les clients et les prestataires en période d&apos;essai peuvent supprimer leur compte immédiatement depuis leur tableau de bord.
              </p>

              <h3 className="subsection-title">Résiliation à l&apos;initiative d&apos;AllSherut :</h3>
              <p className="section-text">
                AllSherut peut suspendre ou résilier un compte en cas de :
              </p>
              <ul className="terms-list">
                <li>violation des conditions d&apos;utilisation</li>
                <li>activité illicite ou préjudiciable</li>
                <li>défaut de paiement</li>
                <li>communication d&apos;informations fausses</li>
                <li>tentative d&apos;atteinte au système ou aux autres utilisateurs</li>
              </ul>

              <h3 className="subsection-title">Conséquences de la résiliation :</h3>
              <ul className="terms-list">
                <li>Perte de l&apos;accès à l&apos;ensemble des services et des données</li>
                <li>Suppression du profil, des contenus et des avis associés</li>
                <li>Aucune restauration des données après suppression</li>
                <li>Aucun remboursement des périodes d&apos;abonnement non utilisées</li>
              </ul>
            </div>
          </section>

          {/* Section 10: Applicable Law */}
          <section className="terms-section">
            <div className="section-number">10</div>
            <div className="section-content">
              <h2 className="section-title">
                <Scale size={24} />
                Droit applicable et juridiction
              </h2>

              <h3 className="subsection-title">Droit applicable :</h3>
              <p className="section-text">
                Les présentes conditions sont régies par le droit français.
              </p>

              <h3 className="subsection-title">Juridiction compétente :</h3>
              <p className="section-text">
                À défaut de résolution amiable, tout litige relatif aux présentes conditions ou à l&apos;utilisation du service sera porté devant les juridictions françaises compétentes. Pour les consommateurs, les règles de compétence prévues par le Code de la consommation et le Code de procédure civile s&apos;appliquent.
              </p>

              <h3 className="subsection-title">Médiation de la consommation :</h3>
              <p className="section-text">
                Conformément à l&apos;article L.612-1 du Code de la consommation, le consommateur peut recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d&apos;un litige : [nom et coordonnées du médiateur]. Une plateforme européenne de règlement en ligne des litiges est également disponible : https://ec.europa.eu/consumers/odr.
              </p>

              <h3 className="subsection-title">Langue du document :</h3>
              <p className="section-text">
                La version française fait foi. Toute traduction est fournie à titre de commodité uniquement.
              </p>

              <h3 className="subsection-title">Modification des conditions :</h3>
              <ul className="terms-list">
                <li>AllSherut se réserve le droit de modifier les présentes conditions à tout moment.</li>
                <li>Les modifications substantielles sont notifiées aux utilisateurs par e-mail.</li>
                <li>La poursuite de l&apos;utilisation du service après modification vaut acceptation des conditions mises à jour.</li>
                <li>La date de dernière mise à jour figure en tête du document.</li>
              </ul>

              <h3 className="subsection-title">Divisibilité :</h3>
              <p className="section-text">
                Si une stipulation des présentes conditions était jugée nulle ou inapplicable par une juridiction, les autres stipulations conserveraient leur plein effet.
              </p>
            </div>
          </section>

          {/* Section 11: Fair Use */}
          <section className="terms-section">
            <div className="section-number">11</div>
            <div className="section-content">
              <h2 className="section-title">
                <Shield size={24} />
                Usage loyal et engagements de l&apos;utilisateur
              </h2>
              <p className="section-text">
                L&apos;utilisateur s&apos;engage à utiliser la plateforme AllSherut de manière licite, loyale et raisonnable. Il s&apos;interdit toute action susceptible de porter atteinte au système, aux autres utilisateurs ou à la sécurité du site.
              </p>

              <h3 className="subsection-title">Sont strictement interdits :</h3>
              <ul className="terms-list">
                <li>l&apos;intrusion dans le code du site ou le contournement des mesures de sécurité ;</li>
                <li>l&apos;utilisation de logiciels ou de robots pour collecter des données ;</li>
                <li>la transmission d&apos;informations ou de contenus portant atteinte aux droits d&apos;auteur, à la vie privée ou à toute disposition légale.</li>
              </ul>

              <p className="section-text">
                AllSherut se réserve le droit de bloquer ou de supprimer les utilisateurs agissant en violation de ces règles.
              </p>
            </div>
          </section>

          {/* Section 12: Force Majeure */}
          <section className="terms-section">
            <div className="section-number">12</div>
            <div className="section-content">
              <h2 className="section-title">
                <AlertTriangle size={24} />
                Force majeure
              </h2>
              <p className="section-text">
                AllSherut ne saurait être tenue responsable d&apos;un retard, d&apos;une défaillance ou d&apos;une impossibilité de fournir les services résultant de circonstances échappant à son contrôle, notamment :
              </p>

              <ul className="terms-list">
                <li>catastrophes naturelles</li>
                <li>guerres</li>
                <li>épidémies</li>
                <li>grèves</li>
                <li>défaillances de réseau, de serveurs ou de logiciels</li>
                <li>cyberattaques</li>
                <li>tout autre événement constitutif de force majeure</li>
              </ul>

              <p className="section-text">
                Dans ces cas, l&apos;éditeur pourra suspendre ou interrompre temporairement le service, sans obligation d&apos;indemnisation.
              </p>
            </div>
          </section>

          {/* Section 13: User Content */}
          <section className="terms-section">
            <div className="section-number">13</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                Contenus des utilisateurs
              </h2>
              <p className="section-text">
                Toute information, photo, avis ou autre contenu publié par l&apos;utilisateur relève de sa seule responsabilité. L&apos;utilisateur déclare détenir les droits sur les contenus publiés et garantit qu&apos;ils ne portent pas atteinte aux droits d&apos;auteur ou à la vie privée de tiers.
              </p>

              <h3 className="subsection-title">AllSherut peut retirer, modifier ou bloquer un contenu s&apos;il apparaît :</h3>
              <ul className="terms-list">
                <li>faux, injurieux ou incitatif à la haine ;</li>
                <li>contrefaisant des droits d&apos;auteur ou des marques ;</li>
                <li>diffamatoire ou contenant des données personnelles de tiers.</li>
              </ul>

              <p className="section-text">
                L&apos;éditeur n&apos;est pas tenu d&apos;informer l&apos;utilisateur avant le retrait d&apos;un contenu manifestement illicite.
              </p>
            </div>
          </section>

          {/* Section 14: Emails and Notifications */}
          <section className="terms-section">
            <div className="section-number">14</div>
            <div className="section-content">
              <h2 className="section-title">
                <AlertCircle size={24} />
                Communications, mises à jour et notifications
              </h2>
              <p className="section-text">
                Lors de l&apos;inscription, l&apos;utilisateur accepte de recevoir les messages système, mises à jour et notifications liés à son activité sur le site. AllSherut peut également envoyer des informations sur les évolutions ou nouveautés du service.
              </p>

              <h3 className="subsection-title">Désinscription :</h3>
              <p className="section-text">
                L&apos;utilisateur peut à tout moment se désinscrire des communications non essentielles via le lien de désinscription ou par demande écrite. Les messages de service essentiels sont envoyés même en cas de désinscription des communications générales.
              </p>
            </div>
          </section>

          {/* Section 15: External Links */}
          <section className="terms-section">
            <div className="section-number">15</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                Liens externes
              </h2>
              <p className="section-text">
                Le site peut contenir des liens vers des sites tiers. AllSherut n&apos;est pas responsable du contenu, de la fiabilité, de la sécurité ou de la licéité de ces sites. La présence d&apos;un lien ne constitue ni une recommandation, ni une approbation, ni une garantie.
              </p>

              <div className="warning-box">
                <AlertCircle size={20} />
                <div>
                  <strong>À noter :</strong> la navigation sur des sites externes se fait sous la seule responsabilité de l&apos;utilisateur.
                </div>
              </div>
            </div>
          </section>

          {/* Section 16: Privacy Policy */}
          <section className="terms-section">
            <div className="section-number">16</div>
            <div className="section-content">
              <h2 className="section-title">
                <Shield size={24} />
                Politique de confidentialité
              </h2>
              <p className="section-text">
                La politique de confidentialité d&apos;AllSherut fait partie intégrante des présentes conditions. En utilisant le site, l&apos;utilisateur reconnaît avoir lu et compris la politique de confidentialité et en accepter les termes.
              </p>
            </div>
          </section>

          {/* Section 17: Digital Notices */}
          <section className="terms-section">
            <div className="section-number">17</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                Notifications et consentements électroniques
              </h2>
              <p className="section-text">
                Toute action, notification ou acceptation effectuée via le site, l&apos;e-mail ou la plateforme est considérée comme une notification écrite. L&apos;envoi d&apos;e-mails ou la validation de formulaires sur AllSherut constitue une preuve du consentement éclairé de l&apos;utilisateur.
              </p>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>À savoir :</strong> les notifications envoyées par AllSherut à l&apos;adresse e-mail communiquée lors de l&apos;inscription sont réputées reçues dans un délai de 72 heures à compter de leur envoi.
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="terms-section contact-section">
            <div className="section-content">
              <h2 className="section-title">
                <AlertCircle size={24} />
                Nous contacter
              </h2>
              <p className="section-text">
                Pour toute question, précision ou signalement d&apos;une violation des conditions d&apos;utilisation :
              </p>
              <div className="contact-info">
                <p><strong>E-mail :</strong> legal@allsherut.com</p>
                <p><strong>Téléphone :</strong> [numéro]</p>
                <p><strong>Adresse :</strong> [adresse du siège]</p>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="terms-footer-note">
            <p>
              <strong>À noter :</strong> les présentes conditions constituent un contrat juridiquement contraignant. Merci de les lire attentivement.
              La poursuite de l&apos;utilisation de la plateforme vaut acceptation expresse de l&apos;ensemble des conditions ci-dessus.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
