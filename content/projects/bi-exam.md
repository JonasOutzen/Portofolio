---
title: "BI & Machine Learning Exam"
toc: true
weight: 4
---

Et Business Intelligence-eksamensprojekt, der undersøger hvordan kampforhold og statistik påvirker resultatet af fodboldkampe ved hjælp af statistisk analyse og machine learning.

## GitHub

[Se repositoriet](https://github.com/JonasOutzen/BI-exam)

## Projektbeskrivelse

Projektet undersøger, om kampstatistik og miljømæssige forhold korrelerer med at vinde fodboldkampe eller score mål. Ved hjælp af BI-teknikker og machine learning udforsker vi mønstre i strukturerede kampdata for at teste en række hypoteser om vejr, bold besiddelse, afleveringsnøjagtighed, disciplin og hjemmebanefordel.

Projektet følger det fulde BI-workflow: problemformulering, dataforberedelse, modellering og præsentation af resultater.

## Forskningsspørgsmål

- Påvirker vejret, hvordan fodboldkampe spilles?
- Hvilke kampstatistikker korrelerer stærkest med at vinde?
- Har hjemmebanefordel en markant indvirkning på kampresultater?
- Er disciplinære handlinger (kort og frispark) relateret til kampresultater?

## Testede hypoteser

- Der scores flere mål og gives flere kort i kampe i regnvejr sammenlignet med tørt vejr
- Højere afleveringsnøjagtighed og boldbesiddelse fører til flere mål og sejre
- Hold vinder flere kampe hjemme og modtager færre frispark
- Hjørnespark, frispark og kort korrelerer med kampresultater

## Data

Datasættet indeholder per-kamp-statistik såsom mål, boldbesiddelse, afleveringsnøjagtighed, frispark, gule/røde kort, straffespark, hjørnespark, skud på mål samt valgfri vejrdata.

## Machine learning modeller

- Logistic Regression
- Decision Trees
- Random Forest
- Klassifikationsmodeller til forudsigelse af kampresultater

Modeller blev evalueret med accuracy, precision, recall og confusion matrices.

## Tech stack

- Python
- Pandas
- NumPy
- Matplotlib / Seaborn
- Scikit-learn
- Jupyter Notebook

## Team

- Jonas Outzen
- Marcus Forsberg
- Asger Storgaard
- Frederik Bastiansen
