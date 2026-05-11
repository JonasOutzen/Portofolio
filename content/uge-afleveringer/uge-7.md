---
title: "7. Spec-Driven Development"
toc: true
weight: 7
date: 2026-05-11
---

**Afleveret:** Søndag den 11. maj 2026

## Opgave

Skriv et indlæg om hvad spec-driven development er, og hvordan du kunne forestille dig at bruge specs og logs sammen med kodeagenter til udvikling af applikationer.

## Mit svar

### Hvad er spec-driven development?

Spec-driven development er en tilgang, hvor man skriver en detaljeret **specifikation** af systemet, *inden* man begynder at kode. Specifikationen beskriver hvad applikationen skal gøre, hvordan den skal opbygges, og hvilke afgrænsninger der gælder.

Det er ikke en ny idé — men den er blevet særligt relevant i en verden, hvor AI-kodeagenter kan generere store mængder kode meget hurtigt. Problemet med at lade en agent kode uden en klar spec er det, man kalder *vibecoding*: man prompter løs, koden ser ud til at virke, men den er inkonsistent, svær at vedligeholde og løser måske ikke det rigtige problem.

### Specs som Markdown-filer

Min tilgang er at skrive specs som lange, strukturerede Markdown-filer og gemme dem i projektet. En typisk spec indeholder:

- **Formål** — hvad skal applikationen løse, og for hvem?
- **Funktionskrav** — hvad skal systemet konkret kunne?
- **Arkitektur og tech stack** — hvilke teknologier bruges, og hvordan hænger de sammen?
- **Afgrænsninger** — hvad er *ikke* i scope (mindst ligeså vigtigt som hvad der er)?
- **Edge cases** — særlige situationer der skal håndteres

Fordelen er, at man tvinges til at tænke løsningen igennem, inden agenten sættes i gang. Man opdager hurtigt, om man egentlig ved, hvad man vil have bygget — og agenten får en klar ramme at arbejde inden for i stedet for at skulle gætte sig til hensigten.

### Logs som feedback-loop

Logs er specens modstykke: mens specen beskriver *hvad der skal ske*, registrerer logs *hvad der faktisk sker*. Brugt rigtigt er de et kraftfuldt redskab i kombination med en kodeagent.

Forestil dig dette workflow:

1. Agenten genererer kode ud fra specen
2. Applikationen køres og producerer logs
3. Logs føres tilbage til agenten som kontekst
4. Agenten identificerer afvigelser fra specen og retter dem

Det giver en iterativ proces, hvor agenten ikke bare skriver kode, men også *validerer* den mod den oprindelige intention. Fejl og uventede tilstande i logs bliver til konkret feedback, som agenten kan handle på — i stedet for at fejl kun opdages, når en udvikler manuelt kigger på outputtet.

### Processen samlet

1. **Skriv spec i en `.md`-fil** — definer scope, krav og afgrænsninger præcist
2. **Giv agenten specen som kontekst** — ikke bare en løs instruktion, men hele dokumentet
3. **Kør applikationen og indsaml logs** — hvad sker der rent faktisk?
4. **Før logs tilbage til agenten** — lad den sammenligne med specen og iterere
5. **Opdatér specen løbende** — efterhånden som kravene afklares

Denne tilgang betyder, at AI-agenten fungerer som en kompetent udviklingspartner frem for en black box. Specs og logs er den lim, der holder intentionen og implementationen sammen.
