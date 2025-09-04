[10:58:25.939] Running build in Washington, D.C., USA (East) – iad1
[10:58:25.940] Build machine configuration: 2 cores, 8 GB
[10:58:25.956] Cloning github.com/roannogueira84-ui/agente-insta-vendas (Branch: main, Commit: ae21ca1)
[10:58:26.416] Skipping build cache, deployment was triggered without cache.
[10:58:26.749] Cloning completed: 793.000ms
[10:58:27.053] Running "vercel build"
[10:58:27.441] Vercel CLI 46.1.0
[10:58:27.766] Running "install" command: `npm install --legacy-peer-deps`...
[10:59:03.172] npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
[10:59:03.218] npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
[10:59:03.627] npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
[10:59:04.448] npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
[10:59:04.682] npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
[10:59:07.042] npm warn deprecated eslint@8.57.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.
[10:59:18.657] 
[10:59:18.658] added 464 packages, and audited 465 packages in 50s
[10:59:18.665] 
[10:59:18.665] 161 packages are looking for funding
[10:59:18.666]   run `npm fund` for details
[10:59:18.715] 
[10:59:18.715] 5 vulnerabilities (2 low, 2 moderate, 1 high)
[10:59:18.715] 
[10:59:18.715] To address all issues, run:
[10:59:18.715]   npm audit fix --force
[10:59:18.715] 
[10:59:18.715] Run `npm audit` for details.
[10:59:18.776] Detected Next.js version: 14.2.28
[10:59:18.783] Running "npm run build"
[10:59:19.325] 
[10:59:19.325] > build
[10:59:19.325] > prisma generate --schema prisma/schema.prisma && next build
[10:59:19.325] 
[10:59:19.946] Prisma schema loaded from prisma/schema.prisma
[10:59:20.058] Warning: You did not specify an output path for your `generator` in schema.prisma. This behavior is deprecated and will no longer be supported in Prisma 7.0.0. To learn more visit https://pris.ly/cli/output-path
[10:59:20.165] 
[10:59:20.166] ✔ Generated Prisma Client (v6.7.0) to ./node_modules/@prisma/client in 38ms
[10:59:20.166] 
[10:59:20.166] Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
[10:59:20.166] 
[10:59:20.166] Tip: Curious about the SQL queries Prisma ORM generates? Optimize helps you enhance your visibility: https://pris.ly/tip-2-optimize
[10:59:20.170] 
[10:59:20.797] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[10:59:20.798] This information is used to shape Next.js' roadmap and prioritize features.
[10:59:20.798] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[10:59:20.798] https://nextjs.org/telemetry
[10:59:20.798] 
[10:59:20.858]   ▲ Next.js 14.2.28
[10:59:20.858]   - Experiments (use with caution):
[10:59:20.858]     · outputFileTracingRoot
[10:59:20.858] 
[10:59:20.913]    Creating an optimized production build ...
[10:59:41.999]  ✓ Compiled successfully
[10:59:42.000]    Skipping linting
[10:59:42.000]    Checking validity of types ...
[10:59:42.242] 
[10:59:42.242]    We detected TypeScript in your project and reconfigured your tsconfig.json file for you. Strict-mode is set to false by default.
[10:59:42.242]    The following suggested values were added to your tsconfig.json. These values can be changed to fit your project's needs:
[10:59:42.242] 
[10:59:42.242]    	- plugins was updated to add { name: 'next' }
[10:59:42.243] 
[10:59:48.922] Failed to compile.
[10:59:48.923] 
[10:59:48.924] ./app/admin/clientes/page.tsx:27:19
[10:59:48.924] Type error: Type '{ products: true; orders: true; }' is not assignable to type 'UserCountOutputTypeSelect<DefaultArgs>'.
[10:59:48.924]   Object literal may only specify known properties, and 'products' does not exist in type 'UserCountOutputTypeSelect<DefaultArgs>'.
[10:59:48.924] 
[10:59:48.924] [0m [90m 25 |[39m     include[33m:[39m {[0m
[10:59:48.924] [0m [90m 26 |[39m       _count[33m:[39m {[0m
[10:59:48.924] [0m[31m[1m>[22m[39m[90m 27 |[39m         select[33m:[39m { products[33m:[39m [36mtrue[39m[33m,[39m orders[33m:[39m [36mtrue[39m }[33m,[39m[0m
[10:59:48.925] [0m [90m    |[39m                   [31m[1m^[22m[39m[0m
[10:59:48.925] [0m [90m 28 |[39m       }[33m,[39m[0m
[10:59:48.925] [0m [90m 29 |[39m       orders[33m:[39m {[0m
[10:59:48.925] [0m [90m 30 |[39m         select[33m:[39m { total[33m:[39m [36mtrue[39m[33m,[39m createdAt[33m:[39m [36mtrue[39m }[33m,[39m[0m
[10:59:48.943] Next.js build worker exited with code: 1 and signal: null
[10:59:48.964] Error: Command "npm run build" exited with 1
