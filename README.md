## How to run

```bash
npm install
npm run dev
```
Use [http://localhost:3000](http://localhost:3000)

## How to check errors

```bash
npm run build
npm run lint
```

## File structure

##### Components
1. Large components like layouts are put into`/app` use brackets for folder names`(..)`
2. Smaller and more global components go to `/components` folder
3. Only put global components that are often used into `/components` folder
##### Mobile components
1. Components that are "Mobile-only" marked as `.mobile.tsx`
