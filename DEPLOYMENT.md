# Deployment Instructions for GitHub Pages

## Quick Setup

1. **Push to GitHub**: Push this repository to GitHub with the name "LetsmakeAndreaSing"

2. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll down to "Pages" section
   - Select "GitHub Actions" as the source
   - The workflow will automatically deploy when you push to main branch

3. **Build Command**: The GitHub Action will run `npm run build` to create the static files

## Manual Deployment Steps

If you prefer manual deployment:

1. **Clone/Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Claudio y gornkonski meta-learning app"
   git branch -M main
   git remote add origin https://github.com/shinedark/LetsmakeAndreaSing.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Repository Settings → Pages
   - Source: "GitHub Actions"
   - The included workflow will handle deployment

3. **Access Your Site**:
   - Your app will be available at: `https://shinedark.github.io/LetsmakeAndreaSing/`

## Notes

- The app runs entirely in the browser using TensorFlow.js
- No server is needed for the meta-learning functionality
- All ML computations happen client-side
- The build process creates optimized static files in `dist/public/`

## Troubleshooting

- Ensure the repository name matches the expected path in the base URL
- Check that GitHub Actions are enabled in your repository
- Verify the build completes successfully in the Actions tab