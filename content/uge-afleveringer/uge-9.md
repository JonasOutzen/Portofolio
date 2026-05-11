---
title: "9. Projektoplæg: Trello-integration"
toc: true
weight: 9
date: 2026-05-11
---

**Afleveret:** Søndag den 11. maj 2026

## Opgave

Skriv et indlæg om det projekt du vil kaste dig over og dine overvejelser om brug af teknologier og scope.

## Mit svar

### Baggrunden for projektet

Under vores besøg hos E.G. opdagede vi, at de brugte **Trello** til at holde styr på opgaver og projekter. Det var ikke unormalt — problemet var, at de havde **mange boards spredt ud over flere steder**, og der var ingen konsistens i, hvordan de var opsat.

Når en ny opgave eller et nyt arrangement skulle håndteres, skulle man manuelt oprette det relevante board, tilføje de rigtige lister, invitere de rigtige folk og kopiere opsætningen fra et andet board. Det var tidskrævende og afhang af, at den rigtige person huskede at gøre det rigtigt.

### Projektidéen

Jeg vil bygge en applikation, der løser dette problem ved at **automatisere oprettelsen af Trello-boards**.

Idéen er enkel: brugeren udfylder en formular med de relevante oplysninger (fx navn på arrangement, ansvarlige, dato, type), og applikationen opretter automatisk de nødvendige Trello-boards — med de rigtige lister, labels og medlemmer — på de relevante workspaces.

### Scope

**Hvad applikationen skal kunne:**
- Tage imod brugerinput via en simpel formular
- Kommunikere med Trello API'et
- Oprette boards på foruddefinerede workspaces baseret på inputtet
- Tilføje standardlister og standardlabels til hvert board
- Invitere de relevante medlemmer automatisk

**Hvad applikationen ikke skal (i første version):**
- Erstatte Trello — den er et supplement
- Håndtere eksisterende boards
- Styre workflow inde i Trello

### Teknologiovervejelser

| Komponent | Valg | Begrundelse |
|---|---|---|
| Frontend | React + Vite | Hurtig opsætning, genkendeligt fra tidligere projekter |
| Backend | Java (Spring Boot) | Solid REST API, god Trello API-support |
| API | Trello REST API | Veldokumenteret, gratis adgang via API key + token |
| Hosting | GitHub Pages + Render | Gratis, allerede bekendt setup |

Trello har et veldokumenteret REST API med fuld adgang til at oprette og administrere boards, lister og members. Autentificering sker via API key og token direkte fra Trello-kontoen.

### Potentiel AI-integration

Applikationen kan på sigt udvides med AI til at:
- Foreslå en passende boardstruktur baseret på arrangementtypen
- Autogenerere beskrivelser til lister og kort

I første omgang holdes projektet simpelt og fokuseret på kernefunktionaliteten.

### Hvad projektet giver mig

- Erfaring med tredjepartsintegrationer via REST API
- Praktisk erfaring med at bygge noget, der løser et reelt behov
- Forståelse for, hvordan man scoper et projekt fornuftigt frem for at overkomplicere det
