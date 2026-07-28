---
title: "Supervision pfSense avec agent Zabbix intégré"
description: "Bien que pfSense soit une base FreeBSD il existe des particularités notables qu’il est possible de récupérer avec Zabbix. Nous avons d’abord la table d’états (State Table) qui nous renseigne sur le nombre de connexions ouvertes et le nombre"
date: "2017-05-05"
author: "Mathieu Amory"
category: "Contribution"
expertise: "cybersecurite"
tags: ["Nos Tutoriels","Supervision","pfSense","Zabbix"]
image: "/images/blog/ancien-blog/supervision-zabbix-pfsense.jpg"
imageAlt: "Supervision pfSense avec agent Zabbix intégré"
readTime: 4
featured: false
draft: false
legacyUrl: "https://www.keenton.com/supervision-pfsense-avec-agent-zabbix-integre/"
---

Bien que pfSense soit une base FreeBSD il existe des particularités notables qu’il est possible de récupérer avec Zabbix. Nous avons d’abord la table d’états (*State Table*) qui nous renseigne sur le nombre de connexions ouvertes et le nombre maximal de connexions simultanées, il est intéressant de surveiller ces deux valeurs pour être alerté avant que le pfSense ne puisse plus accepter de nouvelles connexions (effet DDOS). Ensuite nous avons l’état du buffer mémoire utilisé par le réseau (*MBUF*), une unité `mbuf` correspond à un emplacement mémoire que va utiliser le pfSense pour stocker un paquet réseau qui le traverse. Celui-ci nous informe sur le nombre de `mbufs` maximal, utilisés, en cache, et total (utilisés+cache), si le nombre de `mbufs` total atteint le maximum, le système va paniquer et redémarrer, il est donc impératif de monitorer ces valeurs.

### Données systèmes (FreeBSD)

On récupère ici toutes les données relatives au système: processeur, mémoire, système de fichiers, interfaces réseaux, et autres données générales du système. Nous n’allons pas énumérer toutes les valeurs relatives à FreeBSD, nous utiliseront des éléments Zabbix généralistes qui sont quasiment identiques pour chaque système.

Il faut tout de même noter que nous avons étoffé le monitoring de la mémoire et redéfini la majorité des graphiques pour une meilleure visibilité.

[<img src="/images/blog/ancien-blog/supervision-zabbix-load-150x150.jpg" width="150" height="150" alt="keenton sauvegarde cloud installation" />](/images/blog/ancien-blog/supervision-zabbix-load.jpg)

[<img src="/images/blog/ancien-blog/supervision-zabbix-memory-150x150.jpg" width="150" height="150" alt="keenton supervision zabbix memory" />](/images/blog/ancien-blog/supervision-zabbix-memory.jpg)

[<img src="/images/blog/ancien-blog/supervision-zabbix-cpu-150x150.jpg" width="150" height="150" alt="keenton supervision zabbix cpu" />](/images/blog/ancien-blog/supervision-zabbix-cpu.jpg)

[<img src="/images/blog/ancien-blog/supervision-zabbix-network-150x150.jpg" width="150" height="150" alt="keenton supervision zabbix network" />](/images/blog/ancien-blog/supervision-zabbix-network.jpg)

### Données spécifiques à pfSense

On doit maintenant récupérer les autres valeurs intéressantes du pfSense. Pour commencer par la *State Table* nous pouvons jeter un coup d’oeil à ces deux fichiers: `/tmp/rules.limits` et `/tmp/pfctl_si_out`, à l’intérieur desquels nous allons trouver respectivement:

- **Max**: le nombre maximal de connexions simultanées (*« set limit states »*) du fichier `rules.limits`
- **Current**: le nombre de connexions ouvertes (*« current entries »*) du fichier `pfctl_si_out`

Pour récupérer les valeurs *MBUF* il faut utiliser la commande `netstat -m`, on peut lire à la ligne 2 dans la sortie de la commande (*« mbuf clusters in use »*), les valeurs:

- **Current**: nombre de `mbufs` utilisés
- **Cache**: nombre de `mbufs` en cache
- **Total**: somme des deux précédents
- **Max**: nombre de `mbufs` maximal que le pfSense peut utiliser

Maintenant que nous avons trouvé les données qui nous intéressent, il va falloir analyser ces différents blocs de texte pour en extraire chaque valeur à l’aide d’une commande bien placée.

[<img src="/images/blog/ancien-blog/supervision-zabbix-active-connections-150x150.jpg" width="150" height="150" alt="keenton supervision zabbix active connections" />](/images/blog/ancien-blog/supervision-zabbix-active-connections.jpg)

[<img src="/images/blog/ancien-blog/supervision-zabbix-network-memory-buffer-150x150.jpg" width="150" height="150" alt="keenton supervision zabbix network memory buffer" />](/images/blog/ancien-blog/supervision-zabbix-network-memory-buffer.jpg)

### Configuration Zabbix (Agent-Serveur-Template)

Le template Zabbix à importer se trouve sur nos dépôts publiques: [Template pfSense](https://code.keenton.com/Zabbix/template-pfsense)

Une fois l’hôte créé sur le serveur Zabbix et lié au template, il faut ensuite configurer l’agent Zabbix en définissant des *User Parameters* dans la configuration avancée sur pfSense:

```text
UserParameter=pfsense.states.max,grep "limit states" /tmp/rules.limits | cut -f4 -d ' '
UserParameter=pfsense.states.current,grep "current entries" /tmp/pfctl_si_out | tr -s ' ' | cut -f4 -d ' '
UserParameter=pfsense.mbuf.current,netstat -m | grep "mbuf clusters" | cut -f1 -d ' ' | cut -d '/' -f1
UserParameter=pfsense.mbuf.cache,netstat -m | grep "mbuf clusters" | cut -f1 -d ' ' | cut -d '/' -f2
UserParameter=pfsense.mbuf.max,netstat -m | grep "mbuf clusters" | cut -f1 -d ' ' | cut -d '/' -f4
```

Dans la configuration de l’Agent Zabbix (sur pfSense) il faudra certainement augmenter la valeur de *timeout* (réglée sur 3 secondes par défaut). En cas de soucis pour remonter les données sur le serveur Zabbix, on peut d’abord vérifier et augmenter le *timeout* qui est souvent la source de problème quand on utilise des commandes particulières dans les *User Parameter* Zabbix.

### Conclusion

Et voilà, les premières mesures devrait commencer à arriver sur le serveur Zabbix ! Il ne reste plus qu’à attendre que les interfaces réseaux soient découvertes (LDD), puis on pourra créer les screens qui nous intéresse.
