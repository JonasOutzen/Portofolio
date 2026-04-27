---
title: "3. RAG Workflow Automatisering"
toc: true
weight: 3
date: 2025-04-15
---

**Afleveret:** Onsdag den 15. april 2025

## Opgave

Skriv et indlæg på din portfolio og dokumenter, hvordan du har lavet et automatiseret workflow til opdatering af en RAG-bot på Dify, som altid afspejler indholdet på din portfolio.

## Mit svar

Jeg har bygget en simpel AI-chatbot, der kan svare på spørgsmål om mig og mine projekter.

### Hvordan det virker

Chatbotten bruger mit portfolioindhold som knowledge base — uden en traditionel database eller backend.

Hver gang jeg pusher til GitHub, kører et script, der samler alle mine markdown-filer til en `knowledge.json`. Den fil bliver serveret statisk via GitHub Pages og er altid opdateret med det seneste indhold fra portfolien.

Når en bruger stiller et spørgsmål, henter chatbotten `knowledge.json` og sender indholdet som kontekst direkte til OpenAI's API — fra browseren, uden backend.

<img src="/Portofolio/images/Chatbot eksempel.png" alt="Screenshot af chatbot på portfolien" style="max-width: 100%; border-radius: 8px; margin: 1rem 0;" />

<img src="/Portofolio/images/Api usage.png" alt="OpenAI API usage" style="max-width: 100%; border-radius: 8px; margin-bottom: 1rem;" />

### Automatiseringsflow

1. Push til GitHub
2. GitHub Actions kører build-script → genererer `knowledge.json`
3. `knowledge.json` deployes til GitHub Pages
4. Chatbotten henter filen live ved hvert spørgsmål og sender den som kontekst til OpenAI

På den måde afspejler chatbotten altid det aktuelle indhold på portfolien, uden at jeg manuelt skal opdatere noget.
