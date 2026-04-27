---
title: "2. RAG Chatbot"
toc: true
weight: 2
date: 2025-04-13
---

**Afleveret:** Mandag den 13. april 2025

## Opgave

Skriv et indlæg på din portfolio og dokumenter, hvordan du har lavet en lille RAG chatbot.

## Mit svar

Jeg har bygget en RAG chatbot ved hjælp af **Dify AI**.

Frem for at opsætte et klassisk RAG-pipeline med embeddings og en vektordatabase, feedede jeg chatbotten med en knowledge base direkte i Dify. Jeg tilføjede relevante dokumenter som knowledge og skrev en systeminstruktion om, at botten **kun måtte svare baseret på denne knowledge** — ikke på sin generelle træning.

På den måde opnåede jeg RAG-princippet: at modellen henter og bruger specifik, kontrolleret viden frem for at hallucere frit, uden at skulle bygge hele infrastrukturen fra bunden.

### Hvad er RAG?

RAG (Retrieval-Augmented Generation) er en teknik, hvor en sprogmodel suppleres med et eksternt videnssystem. I stedet for kun at svare ud fra sin træning, henter modellen relevant indhold fra en dokumentbase og bruger det som kontekst, inden den genererer sit svar.
