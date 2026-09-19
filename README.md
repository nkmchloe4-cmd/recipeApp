# Recipe App

En responsiv React-app för att bläddra, lägga till, redigera och ta bort recept. Frontend kopplas mot ett eget ASP.NET WebAPI-backend för all datalagring och filuppladdning.

## Teknik
- React (Vite)
- JavaScript

## Förutsättningar

Du behöver ha Node.js installerat. Kontrollera med:

```bash
node --version
```

**VIKTIGT:** Backend-repot (`RecipeApi`) måste klonas och köras samtidigt som denna app, annars fungerar inte receptlistan, tillägg, redigering eller borttagning. Se backend-repots README för instruktioner. Starta backend FÖRE frontend.

## Starta frontend

1. Klona detta repo:

```bash
git clone <repo-url>
```

2. Navigera till repots rotmapp:

```bash
cd recipeApp
```

3. Installera beroenden:

```bash
npm install
```

4. Starta utvecklingsservern:

```bash
npm run dev
```

Terminalen visar en adressen: `http://localhost:5173`. Öppna den i webbläsaren.

Om appen visar ett felmeddelande om att recept inte kan hämtas, kontrollera att backend-API:et (`RecipeApi`) är igång på `http://localhost:5205`.

## Struktur

* `src/components/` – återanvändbara komponenter (RecipeCard, RecipeDetails, AddRecipeForm)
* `src/utils/` – hjälpfunktion för att bygga korrekta bild-URL:er från backend
* `src/App.jsx` – huvudkomponenten, hanterar state och växling mellan vyer

## Funktioner

- Lista alla recept, hämtade från eget API
- Lägga till nytt recept, inklusive bilduppladdning
- Redigera befintligt recept via förifyllt formulär
- Ta bort recept, med bekräftelsedialog innan borttagning genomförs
- Tydliga felmeddelanden om ett API-anrop misslyckas (t.ex. om backend inte körs)
- Responsiv layout, testad på mobil, surfplatta och desktop


## Status

Klart: lista, lägg till, redigera och ta bort recept fungerar mot eget API. Filuppladdning fungerar och bilder visas korrekt. Responsiv layout testad på flera skärmstorlekar.