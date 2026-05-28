# Hritik Godara — Portfolio

Personal portfolio site. Built with vanilla HTML/CSS/JS, no frameworks.

Live: [portfolio-kohl-three-2h5stxjhct.vercel.app](https://portfolio-kohl-three-2h5stxjhct.vercel.app)

---

## What's in it

The site covers the usual portfolio sections — intro, skills, projects, certifications, experience, hackathons, and contact. A few things worth noting:

- Particle canvas background with mouse interaction, built on raw `<canvas>` API
- Scroll-reveal animations via Intersection Observers (no animation library)
- A mini accuracy chart in the About section
- Project cards with embedded visual previews (confusion matrices, accuracy rings)
- Fully responsive with a slide-in hamburger menu for mobile

Dark theme by default. Light mode toggle included.

---

## Projects covered

| Project | What it does |
|---|---|
| AyurVision | Vision Transformer classifying 40+ Indian medicinal plant species — 99% validation accuracy, deployed on Hugging Face Spaces |
| Medical Image Analysis | DenseNet121 pipelines for chest X-ray, COVID-19, and brain tumor MRI classification with Grad-CAM interpretability |
| Legal AI NLP | FLAN-T5 for summarizing Indian court judgments; BERT for flagging risky contract clauses |
| RagGPT | RAG pipeline over private documents — chunks, embeds via FAISS, retrieves, and generates cited answers |
| AI Resume Builder | Resume–JD matching using transformer embeddings and semantic alignment scoring |
| Fraud Detection | Ensemble ML for transaction anomaly detection with SMOTE for class imbalance |
| Flashcard Engine | Spaced repetition scheduler with automated deck generation and retention tracking |
| IDMP Clustering | PCA + K-Means + hierarchical clustering on medicinal plant image features |

---

## Stack

- HTML5, CSS3 (custom properties, Flexbox/Grid, keyframe animations)
- Vanilla JavaScript ES6+ (no framework)
- [Lucide Icons](https://lucide.dev/) for SVG icons

No build step. No bundler. Open the HTML file and it works.

---

## Run locally

```bash
git clone https://github.com/HritikGodara/Portfolio.git
cd Portfolio
python -m http.server 8080
```

Visit `http://localhost:8080`.

---

## Deploy

Static site. Works on GitHub Pages, Vercel, or Netlify — connect the repo, push to `main`, done.

---

## Contact

- Email: hritik.godara114@gmail.com
- LinkedIn: [hritikgbishnoi](https://www.linkedin.com/in/hritikgbishnoi/)
- GitHub: [@HritikGodara](https://github.com/HritikGodara)
