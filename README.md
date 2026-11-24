# Rajashekar & Swetha Wedding Invitation

A responsive React + Vite wedding invitation website based on the supplied invitation content.

## Run locally

1. Install Node.js (LTS).
2. Extract this project and open the folder in VS Code.
3. Open the VS Code terminal and run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually http://localhost:5173).

## Important customization

- **WhatsApp RSVP number:** edit `phoneNumber` near the top of `src/App.jsx`. Use country code + number, digits only. The supplied code had a placeholder number (`919876543210`).
- **Venue details and dates:** edit the `wedding` object near the top of `src/App.jsx`.
- **Gallery:** replace the sample Unsplash image URLs in `wedding.gallery` with the couple's own image URLs.
- **Map links:** verify both supplied Google Maps links before publishing.
- **Telugu text:** review names and family wording with the family before sharing publicly.

## Production build

```bash
npm run build
npm run preview
```

The production-ready website files are generated in `dist/`.

## Deploy to Vercel

Push the project to GitHub, import the repository in Vercel, keep the framework preset as Vite, and use the default build command `npm run build` and output directory `dist`.
