[10:09:14.704] Running build in Washington, D.C., USA (East) – iad1
[10:09:14.719] Build machine configuration: 2 cores, 8 GB
[10:09:14.786] Cloning github.com/roannogueira84-ui/agente-insta-vendas (Branch: main, Commit: c8197c2)
[10:09:15.111] Previous build caches not available
[10:09:15.683] Cloning completed: 896.000ms
[10:09:16.965] Running "vercel build"
[10:09:17.389] Vercel CLI 47.0.4
[10:09:17.703] Running "install" command: `npm install --legacy-peer-deps`...
[10:09:58.157] npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
[10:09:58.192] npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
[10:09:58.508] npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
[10:09:59.446] npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
[10:09:59.623] npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
[10:10:02.096] npm warn deprecated eslint@8.57.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.
[10:10:11.152] 
[10:10:11.153] added 464 packages, and audited 465 packages in 53s
[10:10:11.154] 
[10:10:11.154] 161 packages are looking for funding
[10:10:11.154]   run `npm fund` for details
[10:10:11.205] 
[10:10:11.206] 5 vulnerabilities (2 low, 2 moderate, 1 high)
[10:10:11.206] 
[10:10:11.206] To address all issues, run:
[10:10:11.207]   npm audit fix --force
[10:10:11.207] 
[10:10:11.207] Run `npm audit` for details.
[10:10:11.245] Detected Next.js version: 14.2.28
[10:10:11.252] Running "npm run build"
[10:10:12.478] 
[10:10:12.479] > build
[10:10:12.479] > prisma generate --schema prisma/schema.prisma && next build
[10:10:12.479] 
[10:10:13.330] Prisma schema loaded from prisma/schema.prisma
[10:10:13.439] Warning: You did not specify an output path for your `generator` in schema.prisma. This behavior is deprecated and will no longer be supported in Prisma 7.0.0. To learn more visit https://pris.ly/cli/output-path
[10:10:13.599] 
[10:10:13.599] ✔ Generated Prisma Client (v6.7.0) to ./node_modules/@prisma/client in 70ms
[10:10:13.600] 
[10:10:13.600] Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
[10:10:13.600] 
[10:10:13.600] Tip: Want real-time updates to your database without manual polling? Discover how with Pulse: https://pris.ly/tip-0-pulse
[10:10:13.600] 
[10:10:14.746] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[10:10:14.747] This information is used to shape Next.js' roadmap and prioritize features.
[10:10:14.748] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[10:10:14.748] https://nextjs.org/telemetry
[10:10:14.748] 
[10:10:14.897]   ▲ Next.js 14.2.28
[10:10:14.898]   - Experiments (use with caution):
[10:10:14.898]     · outputFileTracingRoot
[10:10:14.899] 
[10:10:14.970]    Creating an optimized production build ...
[10:10:23.815] Failed to compile.
[10:10:23.815] 
[10:10:23.815] ./app/admin/clientes/page.tsx
[10:10:23.815] Error: 
[10:10:23.816]   [31mx[0m Expected ',', got ':'
[10:10:23.816]    ,-[[36;1;4m/vercel/path0/app/admin/clientes/page.tsx[0m:1:1]
[10:10:23.816]  [2m1[0m | [10:58:25.939] Running build in Washington, D.C., USA (East) – iad1
[10:10:23.816]    : [31;1m   ^[0m
[10:10:23.816]  [2m2[0m | [10:58:25.940] Build machine configuration: 2 cores, 8 GB
[10:10:23.816]  [2m3[0m | [10:58:25.956] Cloning github.com/roannogueira84-ui/agente-insta-vendas (Branch: main, Commit: ae21ca1)
[10:10:23.816]  [2m4[0m | [10:58:26.416] Skipping build cache, deployment was triggered without cache.
[10:10:23.817]    `----
[10:10:23.817] 
[10:10:23.817] Caused by:
[10:10:23.817]     Syntax Error
[10:10:23.817] 
[10:10:23.817] Import trace for requested module:
[10:10:23.818] ./app/admin/clientes/page.tsx
[10:10:23.818] 
[10:10:23.829] 
[10:10:23.830] > Build failed because of webpack errors
[10:10:23.858] Error: Command "npm run build" exited with 1
