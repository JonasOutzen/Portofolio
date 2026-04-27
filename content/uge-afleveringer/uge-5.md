---
title: "5. AI-dreven Applikation"
toc: true
weight: 5
date: 2025-04-27
---

**Afleveret:** Mandag den 27. april 2025

## Opgave

Skriv et indlæg på din portfolio om, hvordan du har lavet en AI-dreven applikation, som kalder et eksternt API med en LLM.

## Mit svar

Til denne opgave har jeg bygget **AI Vurderings-Tool** — en webapplikation, der bruger OpenAI's API til automatisk at vurdere praktikrapporter.

[Se projektet her](https://jonasoutzen.github.io/AI-Vurderings-Tool/)

### Hvordan det virker

Applikationen er opdelt i to dele:

**Frontend (React → GitHub Pages)**
Brugeren indsætter sin praktikrapport i en tekstboks og sender den af sted. Frontenden er en React-applikation hostet statisk på GitHub Pages.

**Backend (Java → Render)**
Rapporten sendes til en Java-backend deployet på Render. Backenden modtager teksten, formulerer et prompt og kalder OpenAI's API. Svaret — en struktureret vurdering med styrker, svagheder og en samlet bedømmelse — returneres til frontenden og vises til brugeren.

### Hvorfor en backend?

Ved at placere API-kaldet i Java-backenden undgår jeg at eksponere min OpenAI API-nøgle i browseren. Backenden fungerer som et sikkert mellemled, der holder nøglen skjult og styrer kommunikationen med OpenAI.

### Tech stack

- React (frontend)
- GitHub Pages (frontend hosting)
- Java (backend)
- Render (backend hosting)
- OpenAI API
