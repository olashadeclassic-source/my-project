# Deployment Guide

This guide walks through deploying Roli to Vercel, including environment setup, CLI usage, and common troubleshooting.

## Prerequisites

- A Vercel account
- The project pushed to GitHub, GitLab, or Bitbucket
- A Gemini API key from https://aistudio.google.com/app/apikey

## Environment Variables

Configure the following environment variable in Vercel (Project Settings → Environment Variables):

| Name | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes | Google AI Studio API key used for chat completions |

## Deploy with the Vercel UI

1. Log in to Vercel and click **New Project**.
2. Import the repository that contains this app.
3. Confirm the build settings (Vercel detects Next.js automatically).
4. Add the `GEMINI_API_KEY` environment variable.
5. Click **Deploy**.

## Deploy with the Vercel CLI

1. Install the CLI and authenticate:
   ```bash
   npm i -g vercel
   vercel login
   ```
2. From the project root, run:
   ```bash
   vercel
   ```
3. Follow the prompts to link the project and set the `GEMINI_API_KEY` environment variable.
4. For production deployments, run:
   ```bash
   vercel --prod
   ```

## Post-Deployment Verification

- Open the deployed URL and start a new chat.
- Ensure streaming responses work end-to-end.
- Test web search and file upload workflows.

## Troubleshooting

### Streaming Responses Timeout

The `vercel.json` file sets `maxDuration` for the chat and search API routes. If you still see timeouts:

- Confirm the `vercel.json` file is present at the repository root.
- Check the function logs in Vercel for duration warnings.
- Reduce the amount of context sent to the model or split the request.

### Missing Environment Variables

If API calls fail with authentication errors:

- Verify `GEMINI_API_KEY` is set for the correct environment (Production/Preview/Development).
- Trigger a new deployment after updating variables.

### Rate Limiting

This app does not include authentication or rate limiting. If you see abuse in production:

- Add Vercel middleware for basic protection.
- Introduce authentication or request throttling in the API routes.

## Custom Domains

1. In Vercel, open the project settings and choose **Domains**.
2. Add your domain and follow Vercel’s DNS instructions.
3. Wait for DNS propagation and confirm the domain shows as verified.
