# Werkei MVP

A small static website for a Chemnitz cleaning-jobs pilot. It uses plain HTML, CSS and JavaScript: no npm, build step, framework or database is required.

## Before publishing

1. Open `app.js` and replace `hallo@werkei.de` with an inbox you monitor.
2. Replace the sample listings in `app.js` with real, authorized listings and accurate pay/details. The current locations, jobs and prices are demonstration data only.
3. Complete `legal.html` with the site's real operator and privacy details before sharing the site publicly.
4. The map is a schematic illustration, not a navigable street map. This avoids map API keys and external map tile requests.

## Put it on GitHub

1. Create a new empty GitHub repository.
2. Extract this ZIP on your computer.
3. Upload the files and `favicon.svg` from the extracted folder into the repository root. Do not upload the containing folder or ZIP file.
4. Commit the upload to the `main` branch.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import the GitHub repository.
2. Choose **Other** as the framework preset. Leave the build command and output directory empty/default.
3. Deploy. This site has no build step; Vercel serves `index.html` directly.

## MVP behavior and limits

- Visitors can browse example jobs, select a job from the schematic map, switch between German and English, and start an email enquiry.
- Email links require the visitor to have an email app configured.
- There is no account, online booking, payment, listing submission, photo upload, database or moderation workflow. For this pilot, update the listings in `app.js` yourself.
