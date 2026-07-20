---
title: "5 signaux qu'une attaque approche votre système"
description: "Les indicateurs faibles à surveiller avant qu'une compromission ne devienne une crise."
date: "2026-03-14"
author: "Keenton"
category: "Cybersécurité"
expertise: "cybersecurite"
tags: ["Détection", "EDR", "Réponse à incident"]
readTime: 4
draft: false
---

Une attaque majeure ne sort pas de nulle part. Dans la plupart des cas, elle laisse des traces plusieurs jours avant son impact.

Le problème, c'est que ces traces sont discrètes.

Des signaux faibles, noyés dans le bruit du quotidien, invisibles quand les journaux sont dispersés sur dix systèmes différents ou que les alertes s'accumulent sans que personne ne les qualifie régulièrement. Pris isolément, chacun ressemble à une anomalie banale. Mis bout à bout, ils racontent une histoire qu'on préférerait lire avant le chiffrement, pas après.

Chez Keenton, on supervise des infrastructures au quotidien, et voilà les cinq signaux qu'on vous recommande de surveiller en priorité.

---

## 🔑 1. Des authentifications inhabituelles

C'est souvent le premier maillon de la chaîne, et le plus facile à rater.

Concrètement, qu'est-ce qu'on cherche ? Des **connexions nocturnes** pour un utilisateur qui travaille en journée. Des **adresses IP inconnues**. Des **échecs répétés suivis d'un succès**, la signature classique d'un mot de passe deviné ou forcé. Ou encore des **rafales de demandes MFA**, quand l'attaquant mise sur la lassitude de l'utilisateur pour qu'il finisse par valider.

Aucun de ces événements n'est suspect dans l'absolu. C'est le rapprochement avec les habitudes normales de l'utilisateur qui fait la détection. Et c'est là que le bât blesse : sans centralisation des journaux, cette comparaison est tout simplement impossible. On ne détecte pas une anomalie dans des logs qu'on ne lit pas.

---

## 🔍 2. De la reconnaissance sur le réseau interne

Une fois le premier accès obtenu, l'attaquant ne chiffre pas tout de suite. Il visite.

Il cherche les serveurs qui comptent, les partages de fichiers intéressants, les comptes à privilèges. Cette phase de repérage laisse des traces caractéristiques : des **scans internes**, de l'**énumération de l'annuaire**, des **accès à des ressources inhabituelles** pour le compte concerné.

La bonne nouvelle, c'est que ces comportements sont détectables. Un EDR correctement déployé les voit. La nuance importante : correctement **supervisé**, aussi. Un EDR dont personne ne regarde les alertes, c'est une caméra de surveillance sans écran au bout.

---

## 👤 3. Des privilèges sans changement tracé

L'ajout d'un compte à un groupe d'administration. La création d'un compte de service. Deux opérations parfaitement légitimes dans la vie d'un système d'information.

À une condition : qu'elles correspondent à une demande validée.

Une modification de privilèges sans ticket associé raconte l'une de ces deux histoires. Soit un **défaut de procédure**, quelqu'un a fait le changement sans le tracer, et c'est un problème de discipline à corriger. Soit une **tentative de persistance**, l'attaquant se crée des portes d'entrée durables pour revenir même si son accès initial est fermé.

Dans les deux cas, la réaction est la même : ça mérite une investigation, pas un haussement d'épaules.

---

## 💾 4. Des sauvegardes soudainement inaccessibles

Celui-ci est probablement le plus urgent des cinq.

Les opérateurs de ransomware connaissent leur métier : avant de chiffrer la production, ils cherchent à **neutraliser les restaurations**. Une victime qui peut restaurer ne paie pas.

Concrètement, trois événements doivent immédiatement attirer l'attention : la **suppression d'instantanés**, des **échecs de sauvegarde inexpliqués**, et des **connexions inhabituelles à la console de sauvegarde**. Le réflexe courant est de les traiter comme des incidents d'exploitation, un ticket parmi d'autres. C'est une erreur : ce sont des événements de sécurité, à qualifier comme tels et sans attendre.

Si vos sauvegardes se comportent bizarrement, posez-vous la question de qui a intérêt à ce qu'elles ne fonctionnent plus.

---

## 📤 5. Un trafic sortant sans justification

Dernier signal, et pas le moindre : ce qui sort de votre réseau.

Le scénario type : la **création d'archives volumineuses**, suivie d'un **transfert vers une destination inconnue**. C'est le schéma classique d'une exfiltration de données, l'étape qui précède souvent la demande de rançon, avec la menace de publication en prime.

Or beaucoup d'organisations concentrent toute leur surveillance sur ce qui entre : pare-feu, filtrage, détection d'intrusion. Surveiller uniquement le trafic entrant, c'est laisser de côté une partie essentielle du scénario d'attaque. L'attaquant qui est déjà à l'intérieur ne s'annonce plus à la porte : il sort par elle, avec vos données sous le bras.

---

## 🚨 Comment réagir ?

La règle qu'on applique, et qu'on vous recommande, tient en deux temps.

**Un signal isolé** : on vérifie, on documente, on classe. La plupart du temps, l'explication est légitime. Mais la trace écrite compte : c'est elle qui permettra la corrélation le jour où un deuxième signal apparaît.

**Plusieurs signaux corrélés** : on ne débat plus, on déclenche la procédure de réponse à incident.

Et le point le plus important de tout cet article tient en une phrase : les seuils et les responsabilités doivent être définis **à froid**. Qui qualifie ? Qui décide d'escalader ? À partir de quand isole-t-on une machine ? Si ces questions trouvent leurs réponses pendant la crise, elles seront improvisées, sous pression, par des gens fatigués.

Une attaque qui approche laisse des indices. Encore faut-il avoir décidé, avant, qui les regarde et ce qu'on en fait.
