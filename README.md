# CV Website

This project generates a static website from the markdown content in the `content/` directory.

## Structure

- `content/`: Contains the markdown files and assets for the CV.
- `layout/`: Contains design references.
- `web/`: The source code for the website generator (React + Vite).
- `docs/`: The generated static website (HTML/CSS/JS).

## How to Rebuild

To update the website after changing content in `content/`:

1. Open a terminal.
2. Navigate to the `web` directory:
   ```bash
   cd web
   ```
3. Run the build command:
   ```bash
   npm run build
   ```

This will:
1. Scan the `content/` directory.
2. Generate a `content.json` file.
3. Copy images to the build assets.
4. Compile the React application.
5. Output the final files to `docs/`.

## Development

To run the website locally for development:

```bash
cd web
npm run dev
```
