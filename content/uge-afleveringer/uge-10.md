---
title: "10. Fremdrift på projekt — del 1"
toc: true
weight: 10
date: 2026-05-25
---

**Afleveret:** Søndag den 25. maj 2026

## Opgave

Skriv et indlæg på din portfolio om dit projekt og de erfaringer du gør dig.

## Mit svar

### Hvad vi har lavet

Vi har fået bygget en webapp der snakker med Trello via API'et. Det betyder, at brugeren kan udfylde en formular i vores applikation og oprette et issue direkte inde på Trello — uden at åbne Trello selv. Trello fungerer som vores database, og vi har ingen backend; al logik kører i frontenden og kommunikerer direkte med Trello's API.

Hele applikationen er udviklet med Claude Code som kodeagent, og vi har i høj grad lænet os op ad den spec-driven tilgang vi arbejdede med i uge 7.

### Hvad der ikke virker endnu

Vi er endnu ikke nået dertil, hvor appen kan oprette *nye* boards fra bunden. Det er kun muligt at oprette kort og lister under ét eksisterende board. Det er en begrænsning, der betyder, at Johan stadig selv skal oprette et nyt Trello-board, når der er en ny booking — applikationen tager det derfra.

### Udgangspunkt i virkelig data

Vi forsøgte at bruge de noter vi havde fra vores besøg hos E.G. om, hvordan gården afholder et bryllup, som grundlag for vores template-struktur. Det viste sig sværere end forventet, fordi vi ikke har alle de oplysninger vi mangler for at efterligne det faktiske flow præcist. Vi arbejder ud fra et bedste bud på strukturen og justerer efterhånden.

