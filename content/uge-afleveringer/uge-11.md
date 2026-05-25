---
title: "11. Fremdrift på projekt — del 2"
toc: true
weight: 11
date: 2026-05-25
---

**Afleveret:** Søndag den 25. maj 2026

## Opgave

Skriv et indlæg på din portfolio om dit projekt og de erfaringer du gør dig.

## Mit svar

### Forbindelsen til Trello sidder nu

Siden del 1 har vi løst det største tekniske problem: vi kan nu oprette både nye boards *og* subbords direkte fra applikationen. Det krævede en opgradering til Trello Premium — ikke fordi board-oprettelse i sig selv kræver premium, men fordi gratisplanen begrænser det samlede antal boards til 10. Det er alt for lidt, når hvert arrangement får sit eget board.

Vi har også løst en del problemer med at *opdatere* allerede eksisterende boards og lister. Det lød ligetil, men Trello's API håndterer opdateringer anderledes end oprettelse, og det tog et par runder at få styr på.

### Et færdigt udkast

Vi har nu et produkt der virker end-to-end. Fra vores webapp kan Johan oprette:

- **Bryllupper**
- **Sommerhusbooking**
- **Konferencer**
- **Andre private arrangementer**

Hvert arrangement opretter automatisk de relevante Trello-boards med den rigtige struktur. Applikationen samler altså alt det, Johan tidligere oprettede manuelt på tværs af Trello, ét sted.

### Deployeret på Vercel

Applikationen er live på Vercel:

- **Web app:** [engestofte-admin.vercel.app](https://engestofte-admin.vercel.app/)
- **Kode:** [github.com/JonasOutzen/TheSolution-Calendar-System](https://github.com/JonasOutzen/TheSolution-Calendar-System)

### Hvad vi har lært

Det mest overraskende ved dette projekt har været, hvor meget API-begrænsninger og abonnementsmodeller kan påvirke en løsnings scope. Vi antog, at Trello's gratisplan var tilstrækkelig, men stødte hurtigt på board-grænsen på 10 — noget vi aldrig ville have opdaget uden at teste det i praksis. Det er en erfaring vi tager med: tjek altid begrænsningerne på de services du bygger på, inden du designer arkitekturen.