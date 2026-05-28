# Hritik Godara | AI/ML Engineer Portfolio

The source code for my personal portfolio, built to host my machine learning projects, research, and technical resume. 

## The Setup

I recently rewrote the site to drop the standard tech portfolio aesthetic. The current version is heavily typographic, using a warm off-white and charcoal palette inspired by print editorials. 

I avoided heavy frontend frameworks. It's built entirely with vanilla HTML, CSS, and JavaScript. 
- Layouts use standard CSS Grid and Flexbox.
- Scroll animations run on `IntersectionObserver` for better performance without scroll jank.
- Typography pairs Archivo for bold display text with Inter for body copy.
- The light/dark theme toggle saves directly to `localStorage`.
- Icons are from [Lucide](https://lucide.dev/).

## Projects Featured

This portfolio highlights my work across deep learning, computer vision, and natural language processing. Some key projects included are:

- **AyurVision**: A medicinal plant identification system using Vision Transformers (99% validation accuracy).
- **Medical Image Analysis**: DenseNet121 pipelines for Chest X-ray, COVID-19, and Brain Tumor classification, with Grad-CAM for interpretability.
- **Legal AI NLP**: Summarizes Indian court judgments using FLAN-T5 and flags contract risk clauses with BERT.
- **RagGPT**: A grounded RAG pipeline for querying private documents using LangChain and FAISS.
- **AI Resume Builder**: Matches resumes to job descriptions using contextual embeddings.
- **Fraud Detection**: Transaction anomaly detection handling class imbalance via SMOTE and XGBoost.

## Running it locally

There's no build step or node modules to deal with. Clone the repo, start a basic web server, and you're good.

```bash
git clone https://github.com/HritikGodara/Portfolio.git
cd Portfolio
python -m http.server 8080
```

Then load `http://localhost:8080` in your browser.

## 🌐 Deployment

This portfolio is static (HTML/CSS/JS) and can be easily deployed to any free hosting service such as:
* [GitHub Pages](https://pages.github.com/)
* [Vercel](https://vercel.com/)
* [Netlify](https://netlify.com/)

Simply connect your repository to the service of your choice and push to the `main` branch.

## 📬 Contact

* **Email:** hritik.godara114@gmail.com
* **LinkedIn:** [Hritik Bishnoi](https://www.linkedin.com/in/hritikgbishnoi/)
* **GitHub:** [@HritikGodara](https://github.com/HritikGodara)

---
*Designed and built with ♥ and a lot of Python.*
