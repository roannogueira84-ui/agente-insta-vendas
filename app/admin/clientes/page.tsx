[10:13:46.523] Running build in Washington, D.C., USA (East) – iad1
[10:13:46.523] Build machine configuration: 2 cores, 8 GB
[10:13:46.541] Cloning github.com/roannogueira84-ui/agente-insta-vendas (Branch: main, Commit: ad2addc)
[10:13:46.665] Previous build caches not available
[10:13:46.827] Cloning completed: 285.000ms
[10:13:47.378] Running "vercel build"
[10:13:47.763] Vercel CLI 47.0.4
[10:13:48.081] Running "install" command: `npm install --legacy-peer-deps`...
[10:14:20.212] npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
[10:14:20.261] npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
[10:14:20.643] npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
[10:14:21.663] npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
[10:14:21.861] npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
[10:14:24.158] npm warn deprecated eslint@8.57.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.
[10:14:35.381] 
[10:14:35.382] added 464 packages, and audited 465 packages in 47s
[10:14:35.382] 
[10:14:35.383] 161 packages are looking for funding
[10:14:35.383]   run `npm fund` for details
[10:14:35.436] 
[10:14:35.436] 5 vulnerabilities (2 low, 2 moderate, 1 high)
[10:14:35.437] 
[10:14:35.437] To address all issues, run:
[10:14:35.437]   npm audit fix --force
[10:14:35.437] 
[10:14:35.437] Run `npm audit` for details.
[10:14:35.478] Detected Next.js version: 14.2.28
[10:14:35.485] Running "npm run build"
[10:14:35.785] 
[10:14:35.785] > build
[10:14:35.786] > prisma generate --schema prisma/schema.prisma && next build
[10:14:35.786] 
[10:14:36.400] Prisma schema loaded from prisma/schema.prisma
[10:14:36.510] Warning: You did not specify an output path for your `generator` in schema.prisma. This behavior is deprecated and will no longer be supported in Prisma 7.0.0. To learn more visit https://pris.ly/cli/output-path
[10:14:36.616] 
[10:14:36.617] ✔ Generated Prisma Client (v6.7.0) to ./node_modules/@prisma/client in 37ms
[10:14:36.617] 
[10:14:36.617] Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
[10:14:36.617] 
[10:14:36.617] Tip: Want to turn off tips and other hints? https://pris.ly/tip-4-nohints
[10:14:36.617] 
[10:14:37.280] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[10:14:37.281] This information is used to shape Next.js' roadmap and prioritize features.
[10:14:37.281] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[10:14:37.282] https://nextjs.org/telemetry
[10:14:37.282] 
[10:14:37.336]   ▲ Next.js 14.2.28
[10:14:37.337]   - Experiments (use with caution):
[10:14:37.337]     · outputFileTracingRoot
[10:14:37.337] 
[10:14:37.406]    Creating an optimized production build ...
[10:14:46.028] Failed to compile.
[10:14:46.028] 
[10:14:46.028] ./app/admin/clientes/page.tsx
[10:14:46.028] Error: 
[10:14:46.028]   [31mx[0m Expected ',', got ':'
[10:14:46.028]    ,-[[36;1;4m/vercel/path0/app/admin/clientes/page.tsx[0m:1:1]
[10:14:46.028]  [2m1[0m | [10:09:14.704] Running build in Washington, D.C., USA (East) – iad1
[10:14:46.028]    : [31;1m   ^[0m
[10:14:46.028]  [2m2[0m | [10:09:14.719] Build machine configuration: 2 cores, 8 GB
[10:14:46.028]  [2m3[0m | [10:09:14.786] Cloning github.com/roannogueira84-ui/agente-insta-vendas (Branch: main, Commit: c8197c2)
[10:14:46.028]  [2m4[0m | [10:09:15.111] Previous build caches not available
[10:14:46.028]    `----
[10:14:46.028] 
[10:14:46.028] Caused by:
[10:14:46.028]     Syntax Error
[10:14:46.028] 
[10:14:46.029] Import trace for requested module:
[10:14:46.029] ./app/admin/clientes/page.tsx
[10:14:46.029] 
[10:14:46.044] 
[10:14:46.044] > Build failed because of webpack errors
[10:14:46.074] Error: Command "npm run build" exited with 1
