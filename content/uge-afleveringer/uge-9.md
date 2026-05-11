---
title: "9. Projektoplæg: The Solution"
toc: true
weight: 9
date: 2026-05-11
---

**Afleveret:** Søndag den 11. maj 2026

## Opgave

Skriv et indlæg om det projekt du vil kaste dig over og dine overvejelser om brug af teknologier og scope.

## Mit svar

### Projektet: "The Solution"

Efter besøget hos E.G. stod det klart, at deres primære bruger — Johan — bruger uforholdsmæssigt meget tid på at oprette og vedligeholde Trello-boards manuelt. Hvert bryllup og sommerhus kræver sit eget board, oprettet fra en template, med oplysninger indtastet flere steder. Det er dobbeltarbejde, og det giver risiko for dobbeltbooking.

Projektet går ud på at bygge en samlet applikation — **"The Solution"** — der gør denne proces enkel og central.

### Problemet

Johan mangler ét fælles sted for den indledende bookingproces. I dag indtaster han alle oplysninger manuelt og navigerer mellem flere boards og systemer. Logikken er spredt, og der er ingen automatisk check for konflikter på tværs af booking-typer.

### Løsningen

En applikation hvor man indtaster oplysninger om en ny booking — bryllup eller sommerhusudlejning — og applikationen opretter automatisk de relevante Trello-boards ud fra en template. Løsningen snakker direkte med Trello via API'et.

**Alpha — MVP:**
- Formular til at indtaste bookingoplysninger
- Automatisk oprettelse af Trello-boards (bryllup og sommerhus) fra template
- Én samlet indgang frem for flere manuelle trin

**Beta — udvidelser:**
- Datokontrol: tjek om valgt dato allerede er booket (bryllup eller sommerhus)
- Dobbeltbooking-advarsel
- Bryllupper har prioritet over sommerhusudlejning

### Afgrænsning

Vi bygger **ikke** et kundevendt system og bruger **ikke** databaser — al logik går gennem Trello. Fokus er på Johans interne arbejdsflow.

### AI-integration

Vi bruger AI til selve udviklingen via spec-driven development med Claude Code. På sigt er planen at integrere AI i selve applikationen, så den kan gennemlæse filer og udtrække oplysninger automatisk — fx en mail med gæsteantal og overnatningsoplysninger — og udfylde formularen ud fra det.

### Næste skridt

- Udarbejde user stories og opsætte issues/kanban
- Fastlægge coding standards og systemprompt til Claude
- Beslutte teknologier til projektet
