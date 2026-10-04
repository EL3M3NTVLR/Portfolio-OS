# Get AritraOS live (about 10 minutes)

1. Unzip this into your empty repo folder so `package.json` sits at the top level.
2. Copy your 8 companion images into `public/assets/03-companion/` named
   `companion-idle.png`, `-happy`, `-sad`, `-excited`, `-sleeping`, `-alert`, `-dragging`, `-celebrating` (.png or .webp).
3. Test locally: `npm install` then `npm run dev` and open the address it prints.
4. Check the build: `npm run build` (it must end with "Audit passed").
5. Push: `git add -A && git commit -m "AritraOS" && git push`.
6. Vercel: Import the repo, Framework Vite, defaults are fine. Attach `aritrabjee.vercel.app` to this project.
7. Set the repo to Private in GitHub, Settings, Danger Zone. Vercel still deploys it.
