export const companyQuestions = [
  {
    key: 'size',
    label: 'Effectif',
    help: "Le nombre de personnes qui utilisent votre système d’information nous aide à estimer les besoins en postes, licences et accompagnement.",
    options: [
      { value: '1-9', label: '1 à 9 personnes' },
      { value: '10-49', label: '10 à 49 personnes' },
      { value: '50-249', label: '50 à 249 personnes' },
      { value: '250+', label: '250 personnes et plus' },
    ],
  },
  {
    key: 'sites',
    label: 'Nombre de sites',
    help: 'Comptez les bureaux, agences ou locaux à relier et à administrer, sans inclure les collaborateurs en télétravail.',
    options: [
      { value: '1', label: 'Un site unique' },
      { value: '2-5', label: '2 à 5 sites' },
      { value: '5+', label: 'Plus de 5 sites' },
    ],
  },
  {
    key: 'sector',
    label: "Secteur d'activité",
    help: 'Votre secteur peut impliquer des contraintes particulières de sécurité, de disponibilité ou de conformité.',
    options: [
      { value: 'services', label: 'Services' },
      { value: 'industrie', label: 'Industrie' },
      { value: 'sante', label: 'Santé' },
      { value: 'finance', label: 'Finance' },
      { value: 'public', label: 'Secteur public' },
      { value: 'autre', label: 'Autre' },
    ],
  },
];

export const services = [
  { slug: 'informatique-entreprise', label: 'Réseau & connectivité', description: 'Wi-Fi, réseau, téléphonie et interconnexion de sites.', icon: 'layers' },
  { slug: 'hebergement-cloud', label: 'Hébergement & Cloud', description: 'Cloud privé, public ou hybride, VM et hébergement managé.', icon: 'cloud' },
  { slug: 'backup-pra', label: 'Sauvegarde & PRA', description: "Copies externalisées et plan de reprise d'activité testé.", icon: 'cloud-download' },
  { slug: 'microsoft-365', label: 'Microsoft 365', description: 'Teams, Outlook, SharePoint, OneDrive, Intune et Entra ID.', icon: 'mail' },
  { slug: 'devops', label: 'Plateformes DevOps', description: 'CI/CD, Kubernetes, GitOps et infrastructure as code.', icon: 'infinity' },
  { slug: 'automatisation-ia', label: 'Automatisation & IA', description: 'Workflows, intégrations, agents IA et applications métier.', icon: 'brain' },
];

export const securityLevels = [
  { value: 'none', label: 'À définir', description: 'Un expert évalue avec vous les protections nécessaires.' },
  { value: 'essential', label: 'Essentiel', description: 'EDR, MFA et socle de durcissement.' },
  { value: 'reinforced', label: 'Renforcé', description: 'XDR, revues régulières et gouvernance des identités.' },
  { value: 'complete', label: 'Intégral', description: "Surveillance avancée, tests d'intrusion et continuité d'activité." },
];

export const supervisionLevels = [
  { value: 'none', label: 'À définir', description: "Le niveau de service sera précisé lors de l'échange." },
  { value: 'business-hours', label: 'Veille heures ouvrées', description: 'Supervision et support du lundi au vendredi.' },
  { value: '24-7', label: 'Veille 24/7', description: 'Supervision permanente et dispositif d’astreinte.' },
];

export function optionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? '';
}
