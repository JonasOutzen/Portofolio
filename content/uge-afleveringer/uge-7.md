---
title: "7. Metode og AI-tilgang"
toc: true
weight: 7
date: 2026-05-11
---

**Afleveret:** Søndag den 11. maj 2026

## Opgave

Beskriv din tilgang og metode til at arbejde med AI-assisteret udvikling.

## Mit svar

### Forarbejde frem for vibecoding

Når man arbejder med AI-kodeagenter som Claude Code, er det fristende at kaste sig direkte ud i det og bare begynde at prompte løs — det man kalder *vibecoding*. Men erfaringen har hurtigt vist, at det sjældent fører til gode resultater. Koden kan nok se ud til at virke, men den er ofte inkonsistent, svær at vedligeholde og løser ikke altid det rigtige problem.

Min tilgang er i stedet at bruge tid på **forarbejde** inden jeg begynder at kode.

### Lange prompts i Markdown-filer

Konkret arbejder jeg med at skrive lange, strukturerede prompts og gemme dem i `.md`-filer. Disse filer fungerer som specifikationsdokumenter og beskriver:

- **Hvad** applikationen skal kunne
- **Hvordan** den skal opbygges (arkitektur, tech stack, mappestruktur)
- **Afgrænsninger** — hvad systemet *ikke* skal gøre
- **Edge cases** og særlige hensyn

Fordelen ved at have prompten i en separat fil er, at man tvinges til at tænke løsningen igennem, inden man sætter AI'en i gang. Man opdager hurtigt, om man egentlig ved, hvad man vil have lavet — og man undgår, at AI'en fortolker opgaven forkert fra start.

### Processen i praksis

1. **Problemformulering** — Start med at definere problemet klart. Hvad er behovet? Hvem er brugeren?
2. **Tekniske valg** — Beslut tech stack og arkitektur *før* kodegenerering starter.
3. **Skriv specifikation som prompt** — Gem den i en `.md`-fil. Jo mere præcis, jo bedre output.
4. **Iterér kontrolleret** — Brug AI'en til at skrive kode, men gennemgå og forstå hver ændring.
5. **Review** — Vurdér om resultatet matcher specifikationen, ikke bare om det "virker".

Denne metode betyder, at AI'en fungerer som en kompetent udviklingspartner frem for en black box, der spytter kode ud på måfå.
