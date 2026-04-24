---
title: "Gang 6 – Model Context Protocol (MCP)"
weight: 6
---

**Gang:** 6 (27/4)

**Tema:** Model Context Protocol (MCP)

**Indhold:** Introduktion til MCP og hvordan AI-værktøjer som Codex og Claude kan kalde brugerdefineret kode som tools. Vi bygger en simpel MCP-server og kobler den til Claude CLI.

## Hvad vi gjorde

Vi lærte, hvad Model Context Protocol er, og hvad det giver mulighed for: at udvide en LLM med adgang til egne funktioner og datakilde via en standardiseret protokol. Vi byggede en Java-baseret MCP-server, der eksponerer et `add_numbers`-tool. Herefter koblet vi serveren til Codex og Claude CLI og testede, at vi kunne kalde funktionen via naturligt sprog.

Vi diskuterede:
- Hvad MCP er, og hvorfor det er nyttigt
- Forskellen på at bruge en chatbot og at bruge en tool-baseret agent
- Muligheder og udfordringer ved MCP i AI-drevet udvikling

## Output / portfolio

- En Java-baseret MCP-server med et eksponeret `add_numbers`-tool
- Dokumentation af implementeringen
- Personlig refleksion over oplevelsen med at koble serveren til Codex og Claude CLI

## Ressourcer

- MCP Introduction (Toolbox)
- MCP Tutorial (Toolbox)
