# Planning Fundamentals

Planning Fundamentals is an educational reference for understanding the federal water-resources planning process and the analytical reasoning behind plan formulation. It combines structured process guidance, searchable concepts, glossary material, practical examples, source references, and knowledge checks. Historical planning manuals are learning resources rather than a substitute for current controlling policy.

**At a glance:** An interactive reference and learning lab for federal water-resources planning and USACE plan formulation, including the six-step planning process, reference materials, and knowledge checks.

---

# Planning Fundamentals — Reference & Learning Lab

A lightweight, standalone learning and reference application for federal water resources planning and USACE plan formulation.

## Run locally
Open `index.html` in a modern browser. No build process, dependencies, server, or API keys are required.

## Publish on GitHub Pages
In repository **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, and save. Once deployment completes, the app will be available at the Pages URL shown in settings.

## Features
- Responsive, accessible dark interface with straightforward navigation
- Six-step planning process overview
- Searchable knowledge library with practical takeaways
- Definitions and quick-reference glossary
- Interactive knowledge checks with browser-local progress
- Links to official guidance for verification

## Reference documents
The repository contains three historical Institute for Water Resources publications: `Planning_Manual.pdf` (1996), `Planning_Primer.pdf` (1997), and `Planning_Manual_Part_II.pdf` (2017). Version 2.0 adds source-grounded concept lessons, applied scenarios, and a source atlas with printed-page pointers. These materials are educational, not current controlling policy; verify applicable current guidance before professional use.

## Future content integration
Add source documents to the repository (for example, under `references/`) and expand or revise the topic library to reflect them. Do not commit nonpublic, controlled, sensitive, or restricted documents to a public repository.

## Architecture
Single self-contained `index.html` with inline CSS and vanilla JavaScript. All content is static; the only local persistence is quiz completion in browser localStorage.

## Version
4.0 — adds a searchable cross-manual reference explorer with 51 curated chapter and section entries, related-source navigation, local bookmarks, and local study notes. The index searches metadata and summaries rather than full PDF text.\n\n3.0 — adds an interactive six-step process explorer and an illustrative alternatives comparison lab with adjustable priorities, performance scores, and uncertainty sensitivity. Both modules link to printed-page references in the historical IWR publications.

The comparison scores are fictional instructional values, not official USACE calculations, evaluation accounts, or plan-selection guidance.


## Version 6.0
Five original applied planning cases with option-by-option feedback, historical IWR source references, locally saved attempts, and optional written reflections. Version 5.0 also includes the six-unit Guided Study course. These are educational exercises and do not replace current USACE policy or study-specific review.


## Version 7.0 — usability update
Grouped navigation into Start, Explore, Reference, and Practice & Help. Added a compact mobile navigation menu and a simplified home dashboard with direct access to major learning modules and local progress summaries. Existing modules and localStorage keys remain unchanged. The JavaScript files are still separate and should be consolidated in a later refactor after browser regression testing.


## Automated checks (v8)
A dependency-free Node smoke test in `tests/smoke.cjs` runs via `.github/workflows/smoke.yml` on pushes, pull requests, and manual dispatch. It verifies JavaScript parsing, linked scripts, navigation declarations, and required PDFs. This is static validation, not end-to-end browser testing; interactive behavior and mobile usability still require a browser regression pass.
