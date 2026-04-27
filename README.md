# Jonas R. Outzen – Portfolio

Personlig portfolio bygget med [Hugo](https://gohugo.io/) og [Hextra](https://github.com/imfing/hextra)-temaet, deployet via GitHub Pages.

**Live:** [jonasoutzen.github.io/Portofolio](https://jonasoutzen.github.io/Portofolio/)

![Portfolio med chatbot](static/images/Chatbot%20eksempel.png)

---

## Indhold

- **Projekter** – udvalgte projekter fra studiet og fritiden
- **Kalender** – ugeoversigt over AIDA-kursets indhold
- **Uge-afleveringer** – ugentlige blogindlæg og opgavebesvarelser fra AIDA-kurset
- **Om mig** – kort præsentation
- **AI-chatbot** – indbygget chatbot der svarer på spørgsmål om portfolioens indhold

---

## AI-chatbot

Chatbotten bruger portfolioens eget indhold som vidensbase. Hver gang der pushes til `main`, kører et Node.js-script (`scripts/build-knowledge.mjs`) der samler alle markdown-filer til en `knowledge.json`. Denne fil serveres statisk via GitHub Pages.

Når en bruger stiller et spørgsmål, hentes `knowledge.json` og sendes som kontekst til OpenAI's API. API-nøglen injiceres ved build-tid via GitHub Actions secrets.

---

## Deployment

Sitet deployes automatisk til GitHub Pages via `.github/workflows/pages.yaml` ved hvert push til `main`. Workflowet:

1. Bygger `knowledge.json` med `node scripts/build-knowledge.mjs`
2. Injicerer OpenAI API-nøglen i `static/chatbot.js`
3. Bygger Hugo-sitet med `--minify`
4. Uploader og deployer til GitHub Pages

---

## Lokal udvikling

Kræver: [Hugo (extended)](https://gohugo.io/getting-started/installing/), [Go](https://golang.org/doc/install), [Node.js](https://nodejs.org/)

```bash
# Installer Hugo-moduler
hugo mod tidy

# Start lokal server
hugo server --disableFastRender -p 1313
```

### Opdater tema

```bash
hugo mod get -u
hugo mod tidy
```
