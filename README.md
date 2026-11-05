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

## Reference-document status
At the time v1 was created, the connected repository appeared empty and no supplied reference documents were accessible. This first release is an introductory educational synthesis, **not** an official USACE product or policy interpretation. Review current federal planning guidance and the applicable project authority before relying on content in professional decisions.

## Future content integration
Add source documents to the repository (for example, under `references/`) and expand or revise the topic library to reflect them. Do not commit nonpublic, controlled, sensitive, or restricted documents to a public repository.

## Architecture
Single self-contained `index.html` with inline CSS and vanilla JavaScript. All content is static; the only local persistence is quiz completion in browser localStorage.

## Version
1.0
