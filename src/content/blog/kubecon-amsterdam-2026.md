---
title: "Amsterdam, mars 2026 : bienvenue dans le monde d'après"
description: "Retour de KubeCon Amsterdam 2026 : GitOps à l'ère des agents IA, FluxCD Agent Skills, MCP, la plateforme Sylva d'Orange et les 10 ans de Cilium."
date: "2026-07-16"
author: "Keenton"
category: "Plateformes DevOps"
expertise: "devops"
tags: ["KubeCon", "GitOps", "FluxCD", "Cilium", "Agents IA"]
readTime: 7
draft: false
---

Il y a des conférences où l'on vient chercher des réponses. Et il y en a d'autres où l'on repart avec davantage de questions que prévu, mais les bonnes.

La KubeCon était clairement de la deuxième catégorie.

Pendant trois jours, la crème de l'écosystème cloud-native s'est retrouvée dans les halls du RAI d'Amsterdam pour parler Kubernetes, GitOps, sécurité réseau et surtout, inévitablement, intelligence artificielle. Si vous aviez un euro pour chaque fois que le mot "agent" a été prononcé dans un couloir ou sur une scène, vous repartiriez avec de quoi financer un cluster GPU décent.

Chez Keenton, on était là. Voilà ce qu'on en retient.

---

## 🤖 L'IA partout, mais pas n'importe comment

Le mot d'ordre de cette édition était clair avant même d'avoir assisté au premier talk : l'IA s'est installée dans toutes les conversations. Sur les stands des grands groupes, dans les couloirs, dans les slides, impossible d'y échapper.

Mais ce qui était frappant, ce n'était pas tant l'omniprésence que la maturité avec laquelle les intervenants l'abordaient. Fini le temps des POCs qui brillent et des promesses de disruption totale. Les talks les plus intéressants étaient ceux qui se posaient la vraie question : comment fait-on fonctionner tout ça en production, de manière fiable, sans se retrouver à gérer une catastrophe à 2h du matin ?

---

## 🎤 Vibe coding vs plateforme de production : le grand écart

Le talk de Stefan Prodan (ControlPlane), mainteneur de FluxCD, donnait le ton dès le début. Son titre : *"Vibe Coding Meets GitOps"*. Son message : le vibe coding est réel, les développeurs vont effectivement shipper bien plus de code bien plus vite avec l'aide des agents. Et c'est précisément votre problème, vous, les ingénieurs plateforme.

L'idée de "produire un million de lignes de code par mois" comme KPI de productivité développeur a provoqué quelques rires dans la salle, le genre de rires un peu nerveux qu'on fait quand quelque chose est à la fois absurde et inévitablement vrai. Si les développeurs 10x leur cadence de production grâce aux agents, les ingénieurs plateforme doivent faire de même sous peine de se retrouver à gérer une masse de changements que personne n'a ni relue ni validée.

Sa proposition : GitOps n'est pas mort avec l'avènement des agents, il devient au contraire l'interface privilégiée entre les agents et la production. Git comme source de vérité, mais aussi comme mémoire persistante des incidents et des résolutions. L'agent ouvre une pull request, FluxCD réconcilie, et si un incident similaire survient plus tard, le contexte est déjà là. C'est le principe de "dark factory" appliqué à l'infrastructure : le cluster tourne, les agents veillent, les humains n'interviennent que sur les décisions critiques.

Il a présenté les FluxCD Agent Skills, des compétences officielles développées par les mainteneurs, packagées comme des artefacts OCI signés avec Cosign. On peut les installer dans Claude Code, demander à l'agent d'auditer un dépôt Flux, et obtenir en retour une analyse structurée des problèmes de sécurité, des mauvaises pratiques, des ressources mal configurées. Avec une amélioration mesurée de 99 % sur les audits de sécurité par rapport à un agent sans skill. Et une anecdote qui mérite d'être gardée : générer le rapport HTML de l'analyse coûte davantage en tokens que l'analyse elle-même. L'HTML, c'est dur.

---

## 🧭 Le platform engineer, nouveau chef d'orchestre de l'IA

William Rizzo (Mirantis) a prolongé cette réflexion dans un talk complémentaire sur les MCP et le GitOps conversationnel avec Flux. Sa prémisse : les développeurs ont leurs outils IA, Copilot, Cursor, Claude. Les ingénieurs plateforme, eux, ont surtout des outils qui font planter les clusters si on les confie à un agent mal configuré.

La réponse qu'il propose : le context anchoring. Un agent ne peut être déterministe que si son contexte est soigneusement borné. Le MCP Flux, développé par les mainteneurs du projet, expose des outils qui connaissent intimement les ressources Flux : pas Kubernetes en général, mais Flux spécifiquement, avec ses CRDs, sa documentation, ses garde-fous. Quand l'agent veut modifier une ressource gérée par Flux via kubectl, le MCP l'en informe et le redirige vers une approche déclarative via Git. Le garde-fou n'est pas un firewall, c'est un guide.

La démo en live avec Claude était convaincante : diagnostic de HelmRelease en échec, root cause analysis automatique, et, plus inattendu, génération d'un document d'onboarding pour un nouveau membre d'équipe, construit directement depuis l'état réel du cluster, avec une connaissance intime de la façon dont Flux est utilisé *dans ce contexte précis*, pas dans un contexte générique. Un cas d'usage auquel peu de gens avaient pensé, et qui pourtant fait sens immédiatement.

---

## 🟠 Orange et Sylva : quand le télco rencontre FluxCD

Un des talks les plus "terrain" de ces trois jours venait des équipes d'Orange, qui présentaient Sylva, une plateforme Kubernetes-as-a-Service open source sous l'égide de la Linux Foundation, conçue pour les cas d'usage télco (5G, Open RAN, edge) mais adoptée aussi par des équipes IT internes.

Le sujet du talk : comment FluxCD et son mécanisme de `dependsOn` leur a permis de passer d'un déploiement chaotique (des dizaines de boucles de réconciliation en parallèle, des CrashLoopBackOff partout, une impossibilité de distinguer "ça converge encore" de "c'est bloqué") à des déploiements prédictibles et reproductibles, une propriété critique quand on déploie la même plateforme des dizaines de fois dans des affiliates Orange à travers le monde.

Le détail technique le plus élégant : la gestion des mises à jour ordonnées via une "root dependency", une ressource artificielle créée à chaque release, dont toutes les customisations dépendent, et qui force le contrôleur à ne commencer la mise à jour qu'une fois que toutes les ressources sont bien à jour. Pas glamour, mais redoutablement efficace. Et bientôt remplaçable grâce aux nouvelles `ready expressions` de FluxCD 2.x.

Un retour d'expérience sans fioritures, sur une plateforme en production réelle. Le genre de talk dont on sort avec des idées concrètes dans les poches.

---

## 🐝 Cilium fête ses 10 ans, et l'IA n'a rien changé à ses fondamentaux

Sur le stand Cilium, l'ambiance était différente des couloirs habituels de KubeCon. Isovalent avait mis le paquet avec The World of Cilium : une carte interactive façon jeu de rôle (Network Island, Mesh Island, Operations Island, Runtime Security Island), reliée à leur plateforme d'apprentissage. Chaque lab validé fait avancer le joueur sur la carte. Simple, efficace, et franchement bien trouvé pour attirer les curieux et les faire rester.

L'interview du mainteneur Bill Mulligan résumait bien l'esprit du projet à 10 ans : Cilium a été fondé pour résoudre le problème du networking basé sur l'identité à l'échelle. En 2026, avec l'explosion des agents IA dans les clusters, la question est exactement la même, juste appliquée à de nouveaux types d'entités. *"At the end of the day, AI is just another workload"*, une phrase qui, dans la bouche d'un mainteneur de CNI, sonne presque comme une déclaration de paix.

La version 1.19 de Cilium intègre désormais Ztunnel d'Istio Ambient pour le mTLS natif. Un flag de plus à activer pour cocher la case "chiffrement pod-à-pod" sans déployer un service mesh complet. Le networking qui devient boring, et c'est exactement ce qu'on voulait.

---

## 📦 Ce qu'on ramène à Paris

KubeCon Amsterdam 2026 confirme une tendance qu'on observe depuis plusieurs mois dans notre propre pratique : les outils IA ne remplacent pas l'expertise d'infrastructure, ils l'amplifient, pour le meilleur et pour le pire.

Les talks GitOps/MCP résonnent directement avec ce qu'on construit chez Keenton. Les FluxCD Agent Skills, les patterns de context anchoring, l'idée d'utiliser Git comme mémoire persistante pour les agents : ce sont des directions que nous explorons activement dans notre propre stack interne, et que nous intégrons dans notre réflexion autour de [Gero, notre offre d'infrastructure IA souveraine](/blog/gero-ia-souveraine).

Ce qui est rassurant : l'écosystème cloud-native ne s'emballe pas. Il intègre l'IA avec la même rigueur qu'il a mise à industrialiser les conteneurs, puis Kubernetes. Garde-fous, déterminisme, observabilité, reproductibilité : les mêmes exigences, appliquées à un nouveau type de workload.

Amsterdam 2026 : une édition qui ne révolutionne pas, mais qui structure. Et parfois, c'est exactement ce dont on a besoin.
