/**
 * Base de données exhaustive : 10 profils complets, suggestions IA et lettres de motivation
 */
const CV_DATA = {
  // 10 Profils métiers complets prêts à l'emploi
  profiles: {
    dev_fullstack: {
      personal: {
        firstName: "Thomas",
        lastName: "Martin",
        jobTitle: "Développeur Web Full Stack Senior",
        email: "thomas.martin@example.fr",
        phone: "+33 6 12 34 56 78",
        city: "Paris, France",
        website: "https://thomasmartin.dev",
        linkedin: "linkedin.com/in/thomas-martin-dev",
        github: "github.com/thomasmartin",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Développeur Full Stack passionné avec plus de 6 ans d'expérience dans la conception d'architectures web robustes et évolutives (React, Node.js, TypeScript, Cloud AWS). Spécialiste de l'optimisation des performances applicatives et du leadership technique dans des environnements agiles.",
      experiences: [
        {
          id: "exp-1",
          role: "Lead Développeur Full Stack",
          company: "TechNova Solutions",
          city: "Paris",
          startDate: "2022-01",
          endDate: "",
          current: true,
          description: "• Direction technique d'une équipe de 7 développeurs sur une plateforme SaaS traitant plus de 500k requêtes/jour.\n• Migration réussie d'un monolithe vers une architecture microservices (Node.js/Docker/AWS ECS), diminuant les temps de réponse de 45%.\n• Mise en œuvre des pipelines CI/CD (GitHub Actions) réduisant le temps de déploiement de 3h à 12 minutes.\n• Mentorat régulier des développeurs juniors et animation des revues de code hebdomadaires."
        },
        {
          id: "exp-2",
          role: "Développeur Front-End & API",
          company: "Nexus Digital Agency",
          city: "Lyon",
          startDate: "2019-09",
          endDate: "2021-12",
          current: false,
          description: "• Conception et développement d'applications web réactives sous Next.js, React et Tailwind CSS.\n• Collaboration étroite avec les équipes UI/UX pour refondre le tunnel d'achat (+28% de taux de conversion).\n• Intégration d'APIs REST et GraphQL sécurisées avec authentification JWT et passerelles Stripe."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Master en Ingénierie Informatique & Logicielle",
          school: "Université Paris-Saclay",
          city: "Paris",
          startDate: "2017",
          endDate: "2019",
          details: "Mention Très Bien. Spécialisation architectures distribuées et sécurité logicielle."
        },
        {
          id: "edu-2",
          degree: "Licence Informatique Générale",
          school: "Université de Lyon I",
          city: "Lyon",
          startDate: "2014",
          endDate: "2017",
          details: "Algorithmique avancée, structures de données, programmation C/Java."
        }
      ],
      skills: [
        { name: "JavaScript / TypeScript", level: 95 },
        { name: "React.js / Next.js", level: 90 },
        { name: "Node.js / Express", level: 88 },
        { name: "PostgreSQL & MongoDB", level: 85 },
        { name: "Docker & AWS", level: 80 },
        { name: "CI/CD & Git", level: 90 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Courant / Professionnel (C1)" },
        { name: "Espagnol", level: "Intermédiaire (B1)" }
      ],
      interests: ["Open Source", "Domotique & IoT", "Semi-marathon", "Photographie argentique"]
    },

    marketing: {
      personal: {
        firstName: "Sarah",
        lastName: "Benali",
        jobTitle: "Responsable Marketing Digital & Growth",
        email: "sarah.benali@email.fr",
        phone: "+33 6 45 67 89 10",
        city: "Bordeaux, France",
        website: "https://sarahgrowth.com",
        linkedin: "linkedin.com/in/sarah-benali-marketing",
        github: "",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Stratège en Marketing Digital avec 5 ans d'expérience dans l'acquisition multicanale, l'Inbound Marketing et le Growth Hacking pour startups et scale-ups. Reconnue pour sa capacité à transformer les données analytiques en campagnes génératrices de ROI (+140% de leads qualifiés générés en 18 mois).",
      experiences: [
        {
          id: "exp-1",
          role: "Growth Marketing Manager",
          company: "FinScale Europe",
          city: "Bordeaux",
          startDate: "2022-03",
          endDate: "",
          current: true,
          description: "• Définition et exécution de la stratégie d'acquisition multicanale (SEO, Google Ads, LinkedIn Ads) avec un budget annuel de 350k€.\n• Augmentation du trafic organique de +165% en 12 mois grâce à une refonte complète du cluster sémantique et du blog.\n• Optimisation du taux de conversion (CRO) sur les landing pages de 2.4% à 5.8% via des tests A/B rigoureux."
        },
        {
          id: "exp-2",
          role: "Chargée de Communication & Content",
          company: "EcoBrand France",
          city: "Toulouse",
          startDate: "2020-02",
          endDate: "2022-02",
          current: false,
          description: "• Animation des réseaux sociaux (croissance de la communauté de 12k à 65k abonnés sur Instagram et LinkedIn).\n• Lancement de la newsletter hebdomadaire avec un taux d'ouverture moyen de 42% (moyenne secteur : 21%).\n• Coordination de partenariats d'influence et organisation de webinaires B2B générant plus de 1 200 leads."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Master en Stratégie Digitale & E-Business",
          school: "KEDGE Business School",
          city: "Bordeaux",
          startDate: "2018",
          endDate: "2020",
          details: "Major de promotion. Mémoire : 'L'intelligence artificielle au service du lead nurturing B2B'."
        }
      ],
      skills: [
        { name: "SEO & SEA (Google Ads)", level: 92 },
        { name: "Google Analytics 4 & Looker", level: 90 },
        { name: "HubSpot & Automation", level: 88 },
        { name: "Copywriting & Storytelling", level: 85 },
        { name: "A/B Testing & CRO", level: 82 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Bilingue (TOEIC 970/990)" },
        { name: "Allemand", level: "Opérationnel (B2)" }
      ],
      interests: ["Podcast Marketing", "Randonnée alpine", "Cuisine du monde", "Bénévolat associatif"]
    },

    data_analyst: {
      personal: {
        firstName: "Maxime",
        lastName: "Leroux",
        jobTitle: "Data Analyst & Business Intelligence",
        email: "maxime.leroux@data.fr",
        phone: "+33 7 89 01 23 45",
        city: "Nantes, France",
        website: "",
        linkedin: "linkedin.com/in/maxime-leroux-data",
        github: "github.com/maxime-data",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Data Analyst rigoureux combinant de solides compétences statistiques, une maîtrise experte de SQL, Python et Power BI. Passionné par la transformation de données brutes complexes en tableaux de bord décisionnels clairs et directement actionnables par les directions métier.",
      experiences: [
        {
          id: "exp-1",
          role: "Data Analyst Senior",
          company: "Retail Analytics Corp",
          city: "Nantes",
          startDate: "2021-06",
          endDate: "",
          current: true,
          description: "• Conception et déploiement de 15+ dashboards Power BI interactifs utilisés quotidiennement par 120 directeurs de magasins.\n• Automatisation des pipelines ETL via Python et dbt, réduisant le temps de génération des rapports hebdomadaires de 8 heures à 15 minutes.\n• Analyse prédictive du churn client permettant une baisse de 14% de l'attrition grâce à des plans d'action ciblés."
        },
        {
          id: "exp-2",
          role: "Analyste BI Junior",
          company: "Banque Ouest Finance",
          city: "Rennes",
          startDate: "2019-10",
          endDate: "2021-05",
          current: false,
          description: "• Extraction et nettoyage de grands volumes de données transactionnelles sous PostgreSQL et Snowflake.\n• Réalisation d'études statistiques ad-hoc pour la conformité réglementaire et la direction des risques.\n• Documentation complète du dictionnaire de données d'entreprise."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Master en Économétrie & Statistiques Appliquées",
          school: "Université de Rennes 1",
          city: "Rennes",
          startDate: "2017",
          endDate: "2019",
          details: "Modélisation économétrique, Machine Learning appliqué, analyse de séries temporelles."
        }
      ],
      skills: [
        { name: "SQL Avancé (Postgres, BigQuery)", level: 95 },
        { name: "Power BI & Tableau Software", level: 92 },
        { name: "Python (Pandas, Scikit-Learn)", level: 85 },
        { name: "Modélisation ETL & dbt", level: 82 },
        { name: "Excel Avancé & DAX", level: 90 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Professionnel (C1)" }
      ],
      interests: ["Échecs (Classé Elo 1750)", "Cyclisme de route", "Veille Tech & IA"]
    },

    chef_projet: {
      personal: {
        firstName: "Alexandre",
        lastName: "Dupont",
        jobTitle: "Chef de Projet Digital & Scrum Master",
        email: "alexandre.dupont@projet.fr",
        phone: "+33 6 88 99 00 11",
        city: "Lille, France",
        website: "",
        linkedin: "linkedin.com/in/alexandre-dupont-pm",
        github: "",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Chef de Projet certifié PSM II et PMP avec 7 ans d'expérience dans le pilotage de programmes digitaux d'envergure. Expert de la méthodologie Agile Scrum, garant du respect des délais, des budgets et de l'alignement stratégique entre équipes techniques et comités de direction.",
      experiences: [
        {
          id: "exp-1",
          role: "Senior Project Manager / Scrum Master",
          company: "InnoGroup Digital",
          city: "Lille",
          startDate: "2021-04",
          endDate: "",
          current: true,
          description: "• Pilotage d'un portefeuille de 4 projets web et mobiles avec un budget global de 850k€ et une équipe de 14 personnes.\n• Animation des cérémonies Agiles (Sprint Planning, Daily, Rétrospectives) améliorant la vélocité de sprint de +30% en 6 mois.\n• Reporting hebdomadaire auprès du ComEx et gestion rigoureuse des risques opérationnels."
        },
        {
          id: "exp-2",
          role: "Chef de Projet Web & E-commerce",
          company: "WebAgency Pro",
          city: "Paris",
          startDate: "2018-09",
          endDate: "2021-03",
          current: false,
          description: "• Cadrage des besoins clients, rédaction des cahiers des charges et spécifications fonctionnelles détaillées.\n• Coordination des équipes de design, développement et recette qualité (QA) sur plus de 12 sites e-commerce livrés dans les délais."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Master Management de Projets & SI",
          school: "IAE Lille",
          city: "Lille",
          startDate: "2016",
          endDate: "2018",
          details: "Certifications obtenues : Professional Scrum Master (PSM I & II), Prince2 Foundation."
        }
      ],
      skills: [
        { name: "Méthodologie Agile & Scrum", level: 95 },
        { name: "Jira / Confluence / Notion", level: 92 },
        { name: "Gestion budgétaire & P&L", level: 85 },
        { name: "Spécifications & User Stories", level: 90 },
        { name: "Communication Comité de Direction", level: 90 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Courant professionnel (C1)" }
      ],
      interests: ["Pratique du squash", "Menuiserie amateur", "Gestion de budget associatif"]
    },

    ux_ui: {
      personal: {
        firstName: "Camille",
        lastName: "Vasseur",
        jobTitle: "Product Designer UX / UI Senior",
        email: "camille.vasseur@design.fr",
        phone: "+33 6 77 88 99 00",
        city: "Paris, France",
        website: "https://camille-design.io",
        linkedin: "linkedin.com/in/camille-vasseur-ux",
        github: "",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Product Designer avec 6 ans d'expérience dans la création d'expériences numériques intuitives et engageantes pour applications B2B et B2C. Experte en recherche utilisateur, design systems évolutifs sur Figma et prototypage haute fidélité axé sur la conversion et l'accessibilité RGAA.",
      experiences: [
        {
          id: "exp-1",
          role: "Lead UX/UI Designer",
          company: "FinTech Pulse",
          city: "Paris",
          startDate: "2022-01",
          endDate: "",
          current: true,
          description: "• Création et maintenance du Design System multi-plateformes utilisé par 30 développeurs et designers.\n• Conduite de 45 tests utilisateurs qualitatifs et entretiens de recherche, augmentant la satisfaction (CSAT) de 3.6/5 à 4.7/5.\n• Refonte complète du parcours d'onboarding mobile réduisant le taux de drop-off de 40%."
        },
        {
          id: "exp-2",
          role: "UX Researcher & Designer",
          company: "Studio Digital Créatif",
          city: "Nantes",
          startDate: "2019-06",
          endDate: "2021-12",
          current: false,
          description: "• Conception d'interfaces web réactives, wireframes et prototypes interactifs sous Figma et Protopie.\n• Animation d'ateliers de co-conception (Design Thinking, Crazy Eights) avec les clients grands comptes."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Master Design d'Interaction & Stratégie UX",
          school: "École de Design Nantes Atlantique",
          city: "Nantes",
          startDate: "2017",
          endDate: "2019",
          details: "Diplôme certifié niveau 7. Mention Très Bien."
        }
      ],
      skills: [
        { name: "Figma & Design Systems", level: 98 },
        { name: "User Research & Usability Testing", level: 92 },
        { name: "Prototypage & Wireframing", level: 94 },
        { name: "Normes Accessibilité (RGAA/WCAG)", level: 85 },
        { name: "Notions HTML/CSS/Tailwind", level: 78 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Courant (C1)" }
      ],
      interests: ["Typographie suisse", "Céramique contemporaine", "Photographie urbaine"]
    },

    commercial: {
      personal: {
        firstName: "Julien",
        lastName: "Moreau",
        jobTitle: "Ingénieur Commercial B2B & Key Account Manager",
        email: "julien.moreau@sales.fr",
        phone: "+33 6 33 44 55 66",
        city: "Lyon, France",
        website: "",
        linkedin: "linkedin.com/in/julien-moreau-sales",
        github: "",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Commercial B2B dynamique et fin négociateur, cumulant 8 années de succès dans la vente de solutions logicielles et de services complexes auprès de comptes du CAC 40. Habitué aux cycles de vente longs, à la prospection ciblée et au closing de contrats à forte valeur ajoutée.",
      experiences: [
        {
          id: "exp-1",
          role: "Key Account Manager (Grands Comptes)",
          company: "CloudSecure France",
          city: "Lyon",
          startDate: "2021-02",
          endDate: "",
          current: true,
          description: "• Gestion et développement d'un portefeuille de 22 comptes stratégiques (chiffre d'affaires annuel généré : 2.4M€).\n• Dépassement systématique des quotas commerciaux annuels (125% en 2024, 118% en 2025).\n• Négociation de contrats cadres pluriannuels auprès de directeurs des achats et directeurs généraux."
        },
        {
          id: "exp-2",
          role: "Ingénieur d'Affaires B2B",
          company: "IT Services Partner",
          city: "Marseille",
          startDate: "2018-03",
          endDate: "2021-01",
          current: false,
          description: "• Prospection outbound ciblée (cold calling, social selling LinkedIn) générant 40+ opportunités qualifiées par trimestre.\n• Réponses aux appels d'offres publics et privés, soutenances orales et closing commercial."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Master en Négociation Commerciale Internationale",
          school: "emlyon business school",
          city: "Lyon",
          startDate: "2016",
          endDate: "2018",
          details: "Spécialisation vente de solutions complexes et grands comptes."
        }
      ],
      skills: [
        { name: "Négociation Grands Comptes B2B", level: 96 },
        { name: "Prospection & Social Selling", level: 92 },
        { name: "Salesforce & HubSpot CRM", level: 90 },
        { name: "Gestion de pipeline & Closing", level: 94 },
        { name: "Méthodologie MEDDIC", level: 88 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Négociation professionnelle (C1)" },
        { name: "Italien", level: "Intermédiaire (B1)" }
      ],
      interests: ["Voile côtière (Permis hauturier)", "Course d'endurance", "Œnologie"]
    },

    comptable: {
      personal: {
        firstName: "Émilie",
        lastName: "Garnier",
        jobTitle: "Responsable Comptable & Contrôle de Gestion",
        email: "emilie.garnier@finance.fr",
        phone: "+33 6 60 70 80 90",
        city: "Strasbourg, France",
        website: "",
        linkedin: "linkedin.com/in/emilie-garnier-compta",
        github: "",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Responsable Comptable rigoureuse et polyvalente (diplômée DSCG) avec 7 ans d'expérience en cabinet d'expertise comptable et en entreprise. Reconnue pour sa maîtrise des clôtures fiscales, de la gestion de trésorerie prévisionnelle et de la fiabilisation des processus financiers.",
      experiences: [
        {
          id: "exp-1",
          role: "Responsable Comptable Unique",
          company: "Groupe Industriel Est",
          city: "Strasbourg",
          startDate: "2021-09",
          endDate: "",
          current: true,
          description: "• Supervision de la comptabilité générale, clients, fournisseurs et paie pour 3 entités juridiques (CA total : 18M€).\n• Établissement des liasses fiscales annuelles, bilans et déclarations TVA sans aucune pénalité de retard.\n• Mise en place d'un tableau de bord de trésorerie dynamique hebdomadaire réduisant les délais de paiement clients de 55 à 38 jours."
        },
        {
          id: "exp-2",
          role: "Collaboratrice Comptable Confirmée",
          company: "Cabinet Conseil Audit & Associés",
          city: "Metz",
          startDate: "2018-10",
          endDate: "2021-08",
          current: false,
          description: "• Gestion autonome d'un portefeuille de 35 dossiers TPE/PME (BIC, BNC, IS).\n• Clôtures annuelles, révision des comptes et conseil régulier aux dirigeants d'entreprise."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Diplôme Supérieur de Comptabilité et Gestion (DSCG)",
          school: "Université de Strasbourg",
          city: "Strasbourg",
          startDate: "2016",
          endDate: "2018",
          details: "Spécialisation droit fiscal, finance d'entreprise et contrôle de gestion."
        }
      ],
      skills: [
        { name: "Comptabilité Générale & Fiscalité", level: 98 },
        { name: "Logiciels Sage / Cegid / SAP", level: 92 },
        { name: "Excel Avancé (TCD, Macros VBA)", level: 94 },
        { name: "Gestion de Trésorerie & BFR", level: 90 },
        { name: "Audit & Révision des comptes", level: 88 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Allemand", level: "Professionnel (B2)" },
        { name: "Anglais", level: "Technique / Comptable (B2)" }
      ],
      interests: ["Randonnée dans les Vosges", "Jardinage bio", "Lecture d'essais économiques"]
    },

    etudiant: {
      personal: {
        firstName: "Léa",
        lastName: "Bernard",
        jobTitle: "Étudiante Master 2 - Recherche Stage Fin d'Études",
        email: "lea.bernard@etudiant.fr",
        phone: "+33 6 11 22 33 44",
        city: "Strasbourg, France",
        website: "",
        linkedin: "linkedin.com/in/lea-bernard-rh",
        github: "",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Étudiante dynamique et rigoureuse en Master 2 Management des Ressources Humaines. Forte d'une première expérience réussie en alternance dans le recrutement et la gestion des talents, je recherche un stage de fin d'études de 6 mois pour contribuer activement à vos projets RH.",
      experiences: [
        {
          id: "exp-1",
          role: "Chargée de Recrutement (Alternance)",
          company: "Cabinet TalentSearch",
          city: "Strasbourg",
          startDate: "2025-09",
          endDate: "2026-09",
          current: false,
          description: "• Sourcing actif et pré-qualification téléphonique de plus de 150 profils cadres et ingénieurs.\n• Rédaction et diffusion d'offres d'emploi sur LinkedIn Recruiter, Indeed et Welcome to the Jungle.\n• Participation à 40+ entretiens d'embauche physiques et rédaction des comptes-rendus d'évaluation."
        },
        {
          id: "exp-2",
          role: "Assistante RH (Stage)",
          company: "Groupe Alsace Industrie",
          city: "Colmar",
          startDate: "2024-05",
          endDate: "2024-08",
          current: false,
          description: "• Gestion administrative du personnel : contrats, avenants, dossiers mutuelle et suivi des visites médicales.\n• Contribution à l'organisation du plan de développement des compétences pour 250 collaborateurs."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Master 2 Management RH & RSE",
          school: "EM Strasbourg Business School",
          city: "Strasbourg",
          startDate: "2025",
          endDate: "2027",
          details: "Droit du travail, Gestion prévisionnelle des emplois et compétences (GPEC), Marque employeur."
        },
        {
          id: "edu-2",
          degree: "Licence Économie et Gestion",
          school: "Université de Strasbourg",
          city: "Strasbourg",
          startDate: "2022",
          endDate: "2025",
          details: "Mention Assez Bien. Gestion d'entreprise, ressources humaines, sociologie des organisations."
        }
      ],
      skills: [
        { name: "Sourcing & Conduite d'entretiens", level: 85 },
        { name: "Outils ATS & LinkedIn Recruiter", level: 82 },
        { name: "Droit social & Gestion admin RH", level: 80 },
        { name: "Pack Office (Excel, PowerPoint)", level: 88 },
        { name: "Communication interpersonnelle", level: 90 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Intermédiaire supérieur (B2)" },
        { name: "Allemand", level: "Bon niveau scolaire (B1)" }
      ],
      interests: ["Bénévolat associatif", "Théâtre d'improvisation", "Course à pied (10km)"]
    },

    juriste: {
      personal: {
        firstName: "Antoine",
        lastName: "Rousseau",
        jobTitle: "Juriste d'Affaires & Droit des Contrats",
        email: "antoine.rousseau@droit.fr",
        phone: "+33 6 20 30 40 50",
        city: "Paris, France",
        website: "",
        linkedin: "linkedin.com/in/antoine-rousseau-juriste",
        github: "",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Juriste d'Entreprise spécialisé en droit des affaires et contrats commerciaux internationaux, cumulant 6 ans d'expérience en environnement corporate. Expert dans la sécurisation juridique des opérations commerciales, la conformité RGPD et la gestion des précontentieux.",
      experiences: [
        {
          id: "exp-1",
          role: "Juriste Contrats & Compliance",
          company: "Global Tech Services",
          city: "Paris",
          startDate: "2022-04",
          endDate: "",
          current: true,
          description: "• Rédaction, négociation et validation de plus de 180 contrats commerciaux complexes (SaaS, licences, partenariats).\n• Mise en conformité RGPD de l'ensemble des filiales européennes et tenue des registres de traitement des données.\n• Résolution amiable de 95% des litiges précontentieux clients et fournisseurs sans recours aux tribunaux."
        },
        {
          id: "exp-2",
          role: "Juriste d'Affaires Junior",
          company: "Cabinet d'Avocats Conseil",
          city: "Versailles",
          startDate: "2019-10",
          endDate: "2022-03",
          current: false,
          description: "• Veille réglementaire et rédaction de mémorandums juridiques en droit des sociétés et droit commercial.\n• Audit juridique (due diligence) dans le cadre d'opérations d'acquisition et de levées de fonds."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Master 2 Droit des Affaires & Fiscalité",
          school: "Université Panthéon-Assas (Paris II)",
          city: "Paris",
          startDate: "2018",
          endDate: "2019",
          details: "Major de promotion. Spécialisation négociation contractuelle internationale."
        }
      ],
      skills: [
        { name: "Négociation & Rédaction de Contrats", level: 96 },
        { name: "Conformité & RGPD", level: 92 },
        { name: "Droit des Sociétés & M&A", level: 88 },
        { name: "Gestion des Contentieux", level: 85 },
        { name: "Anglais Juridique des Affaires", level: 94 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Bilingue juridique (C2)" }
      ],
      interests: ["Pratique du tennis en club", "Histoire contemporaine", "Écriture d'articles de vulgarisation juridique"]
    },

    sante: {
      personal: {
        firstName: "Claire",
        lastName: "Fontaine",
        jobTitle: "Infirmière Diplômée d'État (IDE)",
        email: "claire.fontaine@sante.fr",
        phone: "+33 6 90 80 70 60",
        city: "Marseille, France",
        website: "",
        linkedin: "",
        github: "",
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
        showPhoto: true
      },
      summary: "Infirmière Diplômée d'État avec 5 ans d'expérience en service d'urgences et réanimation hospitalière. Reconnue pour son grand sang-froid en situation d'urgence vitale, sa maîtrise technique rigoureuse des soins et une empathie constante auprès des patients et de leurs familles.",
      experiences: [
        {
          id: "exp-1",
          role: "Infirmière en Service d'Urgences",
          company: "Centre Hospitalier Universitaire",
          city: "Marseille",
          startDate: "2021-08",
          endDate: "",
          current: true,
          description: "• Accueil, tri et prise en charge globale des urgences médicales et chirurgicales (flux de 80 à 120 patients/jour).\n• Réalisation des soins techniques d'urgence : poses de voies veineuses périphériques, perfusions, bilans sanguins, ECG.\n• Gestion de l'angoisse des patients et communication bienveillante avec les proches en salle d'attente."
        },
        {
          id: "exp-2",
          role: "Infirmière en Chirurgie Ambulatoire",
          company: "Clinique Méditerranéenne",
          city: "Aix-en-Provence",
          startDate: "2019-11",
          endDate: "2021-07",
          current: false,
          description: "• Préparation préopératoire des patients et surveillance post-interventionnelle en salle de réveil.\n• Éducation thérapeutique du patient pour le retour à domicile et administration rigoureuse des thérapeutiques."
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Diplôme d'État d'Infirmier (IDE)",
          school: "IFSI La Blancarde",
          city: "Marseille",
          startDate: "2016",
          endDate: "2019",
          details: "Attestation de Formation aux Gestes et Soins d'Urgence de niveau 2 (AFGSU 2) à jour."
        }
      ],
      skills: [
        { name: "Soins d'Urgence & Gestes Critiques", level: 96 },
        { name: "Pharmacologie & Administration", level: 92 },
        { name: "Gestion du Stress & Réactivité", level: 95 },
        { name: "Travail d'Équipe Pluridisciplinaire", level: 94 },
        { name: "Protocoles d'Hygiène & Asepsie", level: 98 }
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Médical de base (B1)" }
      ],
      interests: ["Bénévolat Croix-Rouge", "Natation sportive", "Yoga & Méditation"]
    }
  },

  // Modèles de lettres de motivation assorties en 1 clic
  coverLetters: {
    candidature_spontanee: {
      recipient: "Direction des Ressources Humaines\nEntreprise Cible\n75008 Paris",
      subject: "Candidature spontanée pour le poste de [Titre du Poste]",
      body: `Madame, Monsieur,\n\nActuellement en veille active sur les opportunités stimulantes de mon secteur, je me permets de vous soumettre ma candidature spontanée afin d'intégrer vos équipes en tant que [Titre du Poste].\n\nFort d'un parcours riche et diversifié, j'ai développé une solide expertise dans la gestion de projets complexes, l'optimisation des performances et la collaboration au sein d'équipes pluridisciplinaires. Votre entreprise se distingue par son dynamisme et son engagement vers l'excellence, des valeurs qui résonnent pleinement avec mon éthique professionnelle.\n\nRejoindre votre structure représenterait pour moi l'opportunité de mettre à votre service ma proactivité, ma rigueur technique et ma volonté constante de générer des résultats concrets et mesurables.\n\nJe serais ravi de vous rencontrer lors d'un entretien pour échanger plus en détail sur la manière dont mes compétences peuvent contribuer au succès de vos futurs projets.\n\nDans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`
    },
    reponse_offre: {
      recipient: "Service Recrutement & Talents\nSociété Partenaire\n69002 Lyon",
      subject: "Candidature au poste de [Titre du Poste] - Réf : 2026-REC",
      body: `Madame, Monsieur,\n\nC'est avec un vif intérêt que j'ai pris connaissance de votre offre d'emploi concernant le poste de [Titre du Poste]. Mon profil et mes réalisations passées correspondent précisément aux exigences et aux défis mentionnés dans votre annonce.\n\nAu cours de mes précédentes missions, j'ai eu l'opportunité de mener à bien des chantiers d'envergure, en développant des solutions pragmatiques et en surmontant les défis opérationnels avec succès. Mon approche axée sur les données, la clarté de communication et le dépassement des objectifs me permet d'être immédiatement opérationnel au sein de votre organisation.\n\nParticulièrement enthousiaste à l'idée de contribuer à vos ambitions de croissance, je me tiens à votre entière disposition pour convenir d'un rendez-vous.\n\nJe vous remercie pour l'attention portée à ma candidature et vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.`
    },
    stage_alternance: {
      recipient: "Responsable des Relations Écoles & Stages\nGroupe Innovation\n33000 Bordeaux",
      subject: "Candidature pour un stage de fin d'études / alternance en tant que [Titre du Poste]",
      body: `Madame, Monsieur,\n\nActuellement en formation supérieure et désireux de confronter mes connaissances théoriques aux réalités stimulantes du terrain, je recherche une opportunité professionnalisante d'une durée de 6 mois pour mettre mon énergie et mes compétences au service de vos équipes.\n\nDoté d'une grande curiosité intellectuelle, d'une excellente capacité d'adaptation et d'une rigueur acquise au fil de mes premiers projets, je souhaite m'investir pleinement dans vos missions et participer activement à la réussite de votre département.\n\nIntégrer vos équipes constituerait un tremplin déterminant dans mon parcours et je suis convaincu que mon dynamisme saura faire la différence.\n\nEn espérant pouvoir vous convaincre de vive voix de ma motivation, je vous prie d'agréer, Madame, Monsieur, mes respectueuses salutations.`
    }
  },

  // Suggestions automatiques de résumés par secteur et par ton
  smartSummaries: {
    tech: [
      "Développeur passionné et rigoureux, spécialisé dans les technologies web modernes. Capable de concevoir des architectures robustes et d'optimiser l'expérience utilisateur tout en respectant les standards de propreté du code.",
      "Ingénieur logiciel axé sur les résultats, avec une solide expertise en développement backend, cloud et intégration continue. Fort esprit d'équipe et appétence pour la résolution de défis techniques complexes.",
      "Architecte technique reconnu pour sa vision stratégique et sa capacité à guider les équipes vers l'excellence opérationnelle et la livraison continue de valeur."
    ],
    marketing: [
      "Professionnel du marketing axé sur la performance et l'analyse de données, expert dans le déploiement de campagnes multicanales à fort retour sur investissement.",
      "Expert en stratégie de contenu et marque employeur, combinant créativité éditoriale et maîtrise des outils d'acquisition pour démultiplier la visibilité et l'engagement client.",
      "Growth marketer alliant vision stratégique, tests A/B rapides et automatisation pour stimuler l'acquisition et la rétention d'utilisateurs."
    ],
    management: [
      "Manager fédérateur et orienté objectifs, possédant une expérience éprouvée dans la direction d'équipes pluridisciplinaires et la livraison de projets stratégiques dans les délais.",
      "Leader agile passionné par l'amélioration continue, l'optimisation des flux de travail et l'alignement des parties prenantes autour d'objectifs ambitieux.",
      "Directeur d'équipe doté d'une forte vision business, sachant transformer les défis organisationnels en leviers d'efficacité et de rentabilité."
    ],
    finance: [
      "Professionnel rigoureux des chiffres et de la gestion financière, expert dans l'optimisation des clôtures, la fiabilisation du reporting et le pilotage de la trésorerie.",
      "Contrôleur financier alliant rigueur comptable et vision stratégique d'aide à la décision pour la direction générale."
    ],
    etudiant: [
      "Étudiant motivé et curieux, désireux de mettre en pratique des connaissances académiques solides et d'apporter un regard neuf et dynamique au sein d'une entreprise innovante.",
      "Jeune diplômé doté d'un excellent esprit d'analyse et d'une grande adaptabilité, prêt à s'investir pleinement dans des missions stimulantes et formatrices.",
      "Profil polyvalent et proactif en recherche d'une opportunité professionnalisante pour développer ses compétences terrain et créer de la valeur."
    ]
  },

  // Puces de missions prêtes à l'emploi avec verbes d'action et métriques
  bulletPoints: {
    tech: [
      "Conception et déploiement d'une API RESTful sécurisée traitant plus de 100k requêtes journalières.",
      "Optimisation du temps de chargement de l'application de 45% grâce au lazy-loading et à la mise en cache Redis.",
      "Mise en place d'une suite de tests automatisés (Jest, Cypress) augmentant la couverture de code de 35% à 88%.",
      "Refonte de l'interface utilisateur en collaboration étroite avec les designers pour une conformité WCAG RGAA.",
      "Migration d'infrastructures physiques vers le cloud AWS avec conteneurisation Docker et orchestration Kubernetes."
    ],
    management: [
      "Supervision et accompagnement au quotidien d'une équipe pluridisciplinaire de 8 collaborateurs.",
      "Gestion d'un budget annuel de 450k€ en maintenant une stricte conformité financière et sans dépassement.",
      "Pilotage de comités de pilotage mensuels et présentation des KPIs d'avancement au comité exécutif.",
      "Réduction du délai de livraison des projets de 25% grâce à l'implémentation de la méthodologie Agile Scrum.",
      "Négociation et contractualisation avec 12 prestataires externes et éditeurs de logiciels."
    ],
    marketing: [
      "Augmentation du trafic web organique de +85% en 9 mois grâce à une stratégie SEO ciblée.",
      "Gestion de campagnes Google Ads et Social Ads avec un budget mensuel de 25k€ (ROAS moyen de 4.2).",
      "Création et automatisation de scénarios de lead nurturing par email générant +30% de prises de rendez-vous.",
      "Refonte complète de l'identité visuelle de la marque et coordination du lancement produit auprès de 50 médias.",
      "Analyse mensuelle des performances via Google Analytics 4 et présentation de recommandations au marketing comex."
    ],
    vente: [
      "Dépassement des objectifs de chiffre d'affaires annuel de 118% (1.2M€ générés sur l'exercice).",
      "Prospection active et qualification de plus de 200 comptes stratégiques grands comptes (B2B).",
      "Négociation de contrats cadres pluriannuels à haute valeur ajoutée avec des directions des achats.",
      "Amélioration du taux de conversion des propositions commerciales de 22% à 34%.",
      "Fidélisation d'un portefeuille de 45 clients clés avec un taux de rétention de 96%."
    ],
    finance: [
      "Clôture des comptes mensuels en J+4 au lieu de J+8 grâce à l'automatisation des écritures bancaires.",
      "Élaboration du budget prévisionnel annuel de 12M€ et suivi mensuel des écarts d'exploitation.",
      "Optimisation du Besoin en Fonds de Roulement (BFR) permettant un gain de trésorerie de 180k€.",
      "Supervision de l'audit fiscal et social annuel sans aucune réserve de la part des commissaires aux comptes."
    ]
  }
};
