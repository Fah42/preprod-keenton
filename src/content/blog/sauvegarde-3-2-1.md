---
title: "Sauvegarde 3-2-1 : construire un véritable plan de reprise"
description: "Copies externalisées, immutabilité, RPO, RTO et tests : passer de la sauvegarde à une capacité de reprise vérifiée."
date: "2026-01-15"
author: "Keenton"
category: "Hébergement & Cloud"
expertise: "hebergement-cloud"
tags: ["Sauvegarde", "PRA", "Ransomware"]
readTime: 4
draft: false
---

"Oui, on a des sauvegardes." C'est probablement la phrase la plus rassurante, et la plus trompeuse, de l'informatique d'entreprise.

Parce qu'avoir des sauvegardes ne garantit rien.

Ce qui compte, c'est de pouvoir restaurer : des copies accessibles après un sinistre, cohérentes, et remontées dans un délai connu, pas découvert le jour J. La règle 3-2-1 fournit une base simple pour y arriver. À condition, et c'est là que beaucoup s'arrêtent en chemin, de la compléter par des tests réguliers et des responsabilités claires.

Chez Keenton, on voit régulièrement des sauvegardes qui tournent depuis des années sans qu'une seule restauration complète ait jamais été tentée. Voilà comment éviter d'en arriver là.

---

## 🗄️ Trois copies, deux supports, un site distinct

La règle tient en trois chiffres : **trois copies** de vos données, sur **deux supports différents**, dont **une copie externalisée** sur un site distinct.

Pourquoi cette organisation ? Parce qu'elle couvre les scénarios qui arrivent vraiment : la panne matérielle, le sinistre sur le site principal (incendie, dégât des eaux, vol), et l'erreur qui se propage silencieusement de la production vers les copies.

La copie externalisée, en particulier, joue un rôle qu'on sous-estime tant qu'on n'en a pas eu besoin : elle évite qu'un même événement physique emporte simultanément la production et l'ensemble des sauvegardes. Un NAS de sauvegarde posé dans la même baie que les serveurs qu'il protège, c'est une copie de plus, pas une protection de plus.

---

## 🔒 Ajouter une copie immuable

C'est le complément devenu indispensable à la règle historique, et la raison est simple : les opérateurs de rançongiciels connaissent le 3-2-1 aussi bien que vous.

Leur mode opératoire est rodé. **Avant de chiffrer la production, ils cherchent à supprimer ou chiffrer les sauvegardes.** Une copie accessible en écriture depuis le réseau compromis reste vulnérable, même externalisée, même sur un support différent. Si l'attaquant a volé des identifiants privilégiés, il a aussi les clés de votre console de sauvegarde.

La parade : une **rétention immuable** (la copie ne peut être ni modifiée ni supprimée pendant une durée définie) ou une **copie déconnectée** du réseau. Dans les deux cas, le résultat est le même : même avec des identifiants d'administration volés, l'attaquant ne peut pas toucher à cette copie.

C'est elle qui fera la différence entre un incident sérieux et une entreprise à l'arrêt.

---

## 🎯 Définir le RPO et le RTO avec le métier

Deux acronymes, deux questions très concrètes à poser, et pas seulement à l'équipe IT.

**Le RPO** (Recovery Point Objective) : quelle quantité de données l'activité peut-elle accepter de perdre ? Une heure de commandes ? Une journée de production ? La réponse n'est pas la même pour l'ERP et pour le serveur de fichiers du service communication.

**Le RTO** (Recovery Time Objective) : combien de temps l'activité peut-elle rester interrompue ? Là encore, la réponse varie selon les services.

Pourquoi impliquer le métier ? Parce que ces objectifs ne sont pas des paramètres techniques : ils influencent directement l'architecture, la fréquence des copies et le budget nécessaire. Un RPO d'une heure et un RPO d'une journée, ce sont deux infrastructures différentes, et deux factures différentes. Autant que la décision soit prise par ceux qui portent le risque.

---

## 🧪 Tester les restaurations

C'est le point où la théorie et la pratique divergent le plus souvent.

Un travail de sauvegarde marqué "réussi" dans la console prouve une chose : que la copie s'est terminée. Il ne prouve pas que l'application redémarrera. Base incohérente, dépendance oubliée, configuration manquante : on ne le découvre qu'en restaurant vraiment.

Concrètement, les restaurations doivent être **planifiées**, à plusieurs niveaux : du fichier isolé jusqu'au service complet. Et surtout **chronométrées**. C'est le seul moyen de vérifier que le RTO annoncé au métier correspond à une capacité réelle, et pas à une estimation optimiste faite un jour de réunion.

Restaurer un service complet un mardi tranquille, c'est un exercice. Le faire pour la première fois pendant une crise, c'est un pari.

---

## 📋 Documenter le plan de reprise

Dernière brique, souvent la moins glamour, souvent la plus décisive : le PRA, le plan de reprise d'activité.

Il répond à des questions simples, qu'il vaut mieux trancher à froid :

- **Qui déclenche** la procédure, et sur quels critères ?
- **Dans quel ordre** les services reviennent-ils ? (Tout ne peut pas redémarrer en même temps, et tout n'a pas la même priorité.)
- **Où redémarrent-ils** : sur site, sur une infrastructure de secours, chez un hébergeur ?
- **Comment les équipes communiquent-elles**, surtout si la messagerie fait partie des services touchés ?

Un conseil tiré de l'expérience : un document court, tenu à jour et exercé régulièrement rend infiniment plus service qu'une procédure exhaustive de quatre-vingts pages que personne n'a jamais déroulée.

---

## 📦 Ce qu'on en retient

La sauvegarde est un moyen. La reprise est l'objectif. Entre les deux, il y a l'immutabilité, des objectifs définis avec le métier, des tests chronométrés et un plan que les équipes connaissent.

Alors la bonne question à poser à votre équipe, ou à votre prestataire, n'est pas "avons-nous des sauvegardes ?".

C'est : "quand avons-nous restauré pour la dernière fois, et en combien de temps ?".
