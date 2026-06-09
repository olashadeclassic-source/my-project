# Client Delivery Materials

This directory contains resources for the Client Delivery Lead to manage new projects and onboard authors.

## Contents

- `INTAKE_FORM.md`: The questionnaire to send to new clients. Copy this content into an email or a shared document for the client to fill out.
- `CLIENT_PROJECT_TEMPLATE/`: A skeleton directory structure for new client pages.

## How to Start a New Client Project

1. **Intake**: Send the `INTAKE_FORM.md` to the client.
2. **Setup**: Once the form is returned and images are received:
   - Create a new branch: `git checkout -b client/{client-name}`
   - Copy the template: `cp -r delivery/CLIENT_PROJECT_TEMPLATE/ clients/{client-name}/`
3. **Customization**:
   - Place the client's images in `clients/{client-name}/images/`.
   - Update `clients/{client-name}/index.html` with the content from the intake form. Look for `<!-- CUSTOMIZE: ... -->` comments.
   - Adjust `clients/{client-name}/style.css` if minor design tweaks are needed (e.g., matching the book's color scheme).
4. **Testing**: Open `index.html` in a browser to verify responsiveness and links.
5. **Deployment**: Push the branch and create a PR. Once merged, follow the deployment process (Netlify/Vercel).

## Template Updates

The `CLIENT_PROJECT_TEMPLATE` is currently a placeholder. When the Design Lead finishes the official `starter` and `premium` templates in the `templates/` directory, those should be used as the basis for new client projects.
