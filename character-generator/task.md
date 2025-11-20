# Character Generator - Plan de Développement

## Vue d'ensemble
Développement du générateur de personnages South Park en 3 phases progressives. Chaque phase est 100% fonctionnelle et testable visuellement avant de passer à la suivante.

---

## PHASE 1 - Fondations & Structure SVG (MVP)

### Objectif
Établir l'architecture SVG unifiée et produire des personnages simples mais fonctionnels avec variations minimales.

### Livrables
- ✓ Architecture SVG complète et cohérente
- ✓ Générateur de base fonctionnel
- ✓ 3-4 variations par élément principal
- ✓ Système de seed reproductible
- ✓ Page de démo HTML pour visualisation

### Tâches détaillées

#### 1.1 - Structure de base du projet
```
character-generator/
├── requirements.md              ✓ (existe)
├── task.md                      ✓ (ce fichier)
├── src/
│   ├── index.js                 # Point d'entrée, exports publics
│   ├── core/
│   │   └── generator.js         # Fonction generateCharacter()
│   ├── templates/
│   │   └── svgStructure.js      # Template SVG unifié
│   ├── parts/
│   │   ├── body.js              # Variations de corps
│   │   ├── head.js              # Variations de tête
│   │   ├── face.js              # Yeux et bouches
│   │   ├── hair.js              # Variations de cheveux
│   │   └── clothing.js          # Variations de vêtements
│   ├── data/
│   │   └── colors.js            # Palettes de couleurs
│   └── utils/
│       ├── svgBuilder.js        # Construction de SVG
│       └── seededRandom.js      # Générateur aléatoire avec seed
├── demo/
│   └── phase1-demo.html         # Page de test visuelle
└── examples/
    └── phase1/                  # Exemples de SVG générés
```

#### 1.2 - Template SVG unifié (`templates/svgStructure.js`)
**Mission**: Créer le template de base avec la structure fixe obligatoire

**Fonctionnalités**:
- Structure complète avec tous les groupes et IDs
- ViewBox: `0 0 200 300`
- Tous les éléments présents (même si vides)
- Fonction: `createSVGStructure()` retourne le template

**Structure exacte à implémenter**:
```xml
<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
  <g id="character" class="character-root">
    <g id="body" class="body">
      <ellipse id="body-shape" />
      <rect id="body-clothing" />
    </g>
    <g id="legs" class="legs">
      <line id="leg-left" />
      <line id="leg-right" />
      <ellipse id="foot-left" />
      <ellipse id="foot-right" />
    </g>
    <g id="head" class="head">
      <ellipse id="head-shape" />
    </g>
    <g id="face" class="face">
      <g id="eyes">
        <circle id="eye-left" />
        <circle id="eye-right" />
      </g>
      <path id="mouth" />
    </g>
    <g id="hair" class="hair">
      <path id="hair-shape" />
    </g>
    <g id="accessories" class="accessories">
      <g id="hat" />
      <g id="glasses" />
    </g>
  </g>
</svg>
```

#### 1.3 - Utilitaires de base

**`utils/svgBuilder.js`**:
```javascript
// Fonctions pour construire des éléments SVG
function createElement(tag, attributes, children)
function setAttributes(element, attrs)
function svgToString(svgObject)
```

**`utils/seededRandom.js`**:
```javascript
// Générateur pseudo-aléatoire avec seed
class SeededRandom {
  constructor(seed)
  next()           // Float 0-1
  nextInt(max)     // Int 0 to max-1
  choice(array)    // Pick random element
}
```

#### 1.4 - Palette de couleurs (`data/colors.js`)

**Couleurs de peau** (6 tons):
```javascript
const skinTones = [
  '#F5D7B3',  // Clair
  '#E8B996',  // Clair-moyen
  '#D4A574',  // Moyen
  '#B88556',  // Moyen-foncé
  '#8D5524',  // Foncé
  '#654321'   // Très foncé
];
```

**Couleurs de cheveux** (6 couleurs):
```javascript
const hairColors = [
  '#000000',  // Noir
  '#8B4513',  // Brun
  '#DAA520',  // Blond
  '#B22222',  // Roux
  '#808080',  // Gris
  '#FFFFFF'   // Blanc/blond platine
];
```

**Couleurs de vêtements** (8 couleurs vives):
```javascript
const clothingColors = [
  '#FF0000',  // Rouge
  '#0000FF',  // Bleu
  '#00FF00',  // Vert
  '#FFFF00',  // Jaune
  '#FF6600',  // Orange
  '#800080',  // Violet
  '#000000',  // Noir
  '#FFFFFF'   // Blanc
];
```

#### 1.5 - Variations d'éléments (Phase 1: 3-4 variations minimum)

**`parts/head.js`**:
```javascript
const headShapes = {
  round: {
    id: 'head-shape',
    element: 'ellipse',
    attrs: { cx: 100, cy: 80, rx: 45, ry: 50 }
  },
  oval: {
    id: 'head-shape',
    element: 'ellipse',
    attrs: { cx: 100, cy: 80, rx: 40, ry: 55 }
  },
  square: {
    id: 'head-shape',
    element: 'rect',
    attrs: { x: 55, y: 30, width: 90, height: 100, rx: 5 }
  }
};

function generateHead(shape, skinTone) {
  // Retourne le groupe <g id="head"> complet
}
```

**`parts/face.js`**:
```javascript
// Yeux - 3 variations
const eyeTypes = {
  normal: {
    left: { cx: 85, cy: 75, r: 3 },
    right: { cx: 115, cy: 75, r: 3 }
  },
  happy: {
    // Yeux en arc (path)
  },
  surprised: {
    // Yeux larges (r: 5)
  }
};

// Bouches - 4 variations
const mouthTypes = {
  neutral: { d: 'M85,95 Q100,95 115,95' },
  smile: { d: 'M85,95 Q100,105 115,95' },
  sad: { d: 'M85,100 Q100,90 115,100' },
  open: { d: 'M90,95 Q100,105 110,95 Q100,100 90,95' }
};

function generateFace(eyeType, mouthType) {
  // Retourne le groupe <g id="face"> complet
}
```

**`parts/hair.js`**:
```javascript
// Cheveux - 4 variations
const hairStyles = {
  short: {
    d: 'M60,45 Q70,30 80,35 Q90,25 100,25 Q110,25 120,35 Q130,30 140,45'
  },
  spiky: {
    d: 'M60,50 L65,25 L70,45 L80,20 L90,45 L100,15 L110,45 L120,20 L130,45 L135,25 L140,50'
  },
  long: {
    d: 'M60,45 Q70,30 100,30 Q130,30 140,45 L145,80 Q145,95 140,100 L130,105 L70,105 L60,100 Q55,95 55,80 Z'
  },
  bald: {
    d: ''  // Pas de cheveux, opacity: 0
  }
};

function generateHair(style, color) {
  // Retourne le groupe <g id="hair"> complet
}
```

**`parts/body.js`**:
```javascript
// Corps - Style South Park (forme haricot)
const bodyShape = {
  element: 'ellipse',
  attrs: { cx: 100, cy: 160, rx: 35, ry: 45 }
};

// Jambes - Simples lignes
const legs = {
  left: { x1: 90, y1: 200, x2: 85, y2: 240 },
  right: { x1: 110, y1: 200, x2: 115, y2: 240 }
};

// Pieds - Petits ovales noirs
const feet = {
  left: { cx: 85, cy: 245, rx: 8, ry: 4 },
  right: { cx: 115, cy: 245, rx: 8, ry: 4 }
};

function generateBody() {
  // Retourne les groupes <g id="body"> et <g id="legs"> complets
}
```

**`parts/clothing.js`**:
```javascript
// Vêtements - 3 styles simples de haut
const topStyles = {
  tshirt: {
    element: 'rect',
    attrs: { x: 70, y: 140, width: 60, height: 50, rx: 3 }
  },
  hoodie: {
    // Rectangle + petit rectangle pour capuche
  },
  vest: {
    // Forme en V
  }
};

function generateClothing(style, primaryColor) {
  // Retourne le rect dans <g id="body">
}
```

#### 1.6 - Générateur principal (`core/generator.js`)

**Fonction principale**:
```javascript
function generateCharacter(options = {}) {
  const {
    seed = null,
    gender = 'neutral',
    skinTone = null,
    random = true
  } = options;

  // 1. Initialiser le générateur aléatoire
  const rng = seed ? new SeededRandom(seed) : Math.random;

  // 2. Sélectionner les caractéristiques
  const config = {
    head: {
      shape: rng.choice(['round', 'oval', 'square']),
      skinTone: skinTone ?? rng.nextInt(skinTones.length)
    },
    face: {
      eyes: rng.choice(['normal', 'happy', 'surprised']),
      mouth: rng.choice(['neutral', 'smile', 'sad', 'open'])
    },
    hair: {
      style: rng.choice(['short', 'spiky', 'long', 'bald']),
      color: rng.choice(hairColors)
    },
    clothing: {
      top: {
        style: rng.choice(['tshirt', 'hoodie', 'vest']),
        color: rng.choice(clothingColors)
      }
    },
    accessories: {
      hat: null,    // Phase 2
      glasses: null  // Phase 2
    }
  };

  // 3. Construire le SVG
  const svg = buildSVG(config);

  // 4. Retourner l'objet character
  return {
    id: generateId(),
    seed: seed,
    config: config,
    svg: svgToString(svg),
    timestamp: Date.now()
  };
}
```

**Fonction de construction**:
```javascript
function buildSVG(config) {
  // 1. Créer la structure de base
  const structure = createSVGStructure();

  // 2. Remplir chaque groupe avec les bonnes valeurs
  fillBody(structure, config.clothing);
  fillLegs(structure);
  fillHead(structure, config.head);
  fillFace(structure, config.face);
  fillHair(structure, config.hair);

  return structure;
}
```

#### 1.7 - Point d'entrée (`index.js`)

```javascript
import { generateCharacter } from './core/generator.js';

export {
  generateCharacter,
  // Phase 2+:
  // customizeCharacter,
  // exportCharacter,
  // generateFromConfig
};

// Export par défaut
export default {
  generateCharacter
};
```

#### 1.8 - Page de démo (`demo/phase1-demo.html`)

**Contenu**:
- Interface simple HTML
- Bouton "Generate Random Character"
- Bouton "Generate with Seed" (input text pour le seed)
- Zone d'affichage du SVG (grand format)
- Affichage de la config JSON
- Grille de 9 personnages générés pour voir la variété

**Exemple de structure**:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Character Generator - Phase 1 Demo</title>
  <style>
    .character-display { width: 200px; height: 300px; }
    .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  </style>
</head>
<body>
  <h1>Phase 1 - Démo du Générateur</h1>

  <div class="controls">
    <button onclick="generateRandom()">Generate Random</button>
    <input id="seedInput" placeholder="Enter seed" />
    <button onclick="generateWithSeed()">Generate with Seed</button>
  </div>

  <div class="main-display">
    <div id="mainCharacter" class="character-display"></div>
    <pre id="configDisplay"></pre>
  </div>

  <h2>Gallery (9 personnages)</h2>
  <div id="gallery" class="gallery"></div>

  <script type="module" src="../src/index.js"></script>
  <script type="module">
    import { generateCharacter } from '../src/index.js';

    function generateRandom() {
      const char = generateCharacter();
      displayCharacter(char);
    }

    function generateWithSeed() {
      const seed = document.getElementById('seedInput').value;
      const char = generateCharacter({ seed });
      displayCharacter(char);
    }

    function displayCharacter(char) {
      document.getElementById('mainCharacter').innerHTML = char.svg;
      document.getElementById('configDisplay').textContent =
        JSON.stringify(char.config, null, 2);
    }

    // Génération initiale de la galerie
    function generateGallery() {
      const gallery = document.getElementById('gallery');
      for (let i = 0; i < 9; i++) {
        const char = generateCharacter({ seed: `demo-${i}` });
        const div = document.createElement('div');
        div.className = 'character-display';
        div.innerHTML = char.svg;
        gallery.appendChild(div);
      }
    }

    generateGallery();
  </script>
</body>
</html>
```

### Critères de succès Phase 1

**Vérifications visuelles**:
- [ ] Ouvrir `demo/phase1-demo.html` dans un navigateur
- [ ] Tous les personnages ont la même structure SVG (vérifier dans DevTools)
- [ ] Les IDs sont constants : `#head-shape`, `#eye-left`, `#mouth`, etc.
- [ ] Style South Park reconnaissable (contours noirs, formes simples)
- [ ] Bouton "Generate Random" produit des personnages différents
- [ ] Même seed produit toujours le même personnage
- [ ] La galerie montre 9 personnages variés
- [ ] SVG redimensionnable sans perte de qualité
- [ ] Aucune erreur console

**Caractéristiques techniques**:
- [ ] Structure SVG parfaitement cohérente sur tous les personnages
- [ ] Ordre des groupes identique : body → legs → head → face → hair → accessories
- [ ] Maximum 20-30 éléments SVG par personnage
- [ ] SVG valide (peut être copié/collé et fonctionne)

---

## PHASE 2 - Variété & Personnalisation

### Objectif
Augmenter drastiquement la variété des personnages et permettre la personnalisation après génération.

### Livrables
- ✓ 8-10 variations par élément (cheveux, yeux, bouches, vêtements)
- ✓ Système de customization
- ✓ Accessoires (lunettes, chapeaux)
- ✓ Export multi-formats (data-uri, JSON, React component)
- ✓ Interface interactive de personnalisation

### Tâches détaillées

#### 2.1 - Extension des variations

**Cheveux (`parts/hair.js`)** - Ajouter 6 styles supplémentaires:
```javascript
// Nouveaux styles (total: 10 styles)
const newHairStyles = {
  afro: { /* forme ronde volumineuse */ },
  ponytail: { /* cheveux attachés derrière */ },
  curly: { /* cheveux bouclés */ },
  mohawk: { /* crête centrale */ },
  pigtails: { /* deux couettes */ },
  bob: { /* coupe au carré */ }
};
```

**Couleurs cheveux** - Ajouter 6 couleurs fantaisie:
```javascript
const fantasyHairColors = [
  '#FF1493',  // Rose
  '#00CED1',  // Cyan
  '#9370DB',  // Violet clair
  '#32CD32',  // Vert
  '#FF4500',  // Orange vif
  '#FFD700'   // Or
];
```

**Yeux (`parts/face.js`)** - Ajouter 5 types:
```javascript
// Total: 8 types d'yeux
const newEyeTypes = {
  closed: { /* lignes horizontales */ },
  wink: { /* un oeil fermé, un ouvert */ },
  angry: { /* sourcils froncés */ },
  hearts: { /* yeux en forme de coeur */ },
  stars: { /* yeux étoilés */ }
};
```

**Bouches** - Ajouter 4 types:
```javascript
// Total: 8 types de bouches
const newMouthTypes = {
  laugh: { /* grande bouche ouverte avec langue */ },
  surprised: { /* O rond */ },
  smirk: { /* sourire en coin */ },
  tongue: { /* langue qui sort */ }
};
```

**Vêtements (`parts/clothing.js`)** - Ajouter 4 styles:
```javascript
// Total: 7 styles de hauts
const newTopStyles = {
  jacket: { /* veste avec col */ },
  sweater: { /* pull avec motif */ },
  polo: { /* polo avec col */ },
  dress: { /* robe simple */ }
};
```

**Couleurs vêtements secondaires**:
```javascript
// Pour détails (rayures, motifs, etc.)
function generateClothing(style, primaryColor, secondaryColor) {
  // Ajouter détails colorés selon le style
}
```

#### 2.2 - Accessoires (`parts/accessories.js`)

**Lunettes** - 4 styles:
```javascript
const glassesStyles = {
  round: {
    // Deux cercles avec pont
    elements: [
      { tag: 'circle', attrs: { cx: 85, cy: 75, r: 8, fill: 'none', stroke: '#000', strokeWidth: 2 } },
      { tag: 'circle', attrs: { cx: 115, cy: 75, r: 8, fill: 'none', stroke: '#000', strokeWidth: 2 } },
      { tag: 'line', attrs: { x1: 93, y1: 75, x2: 107, y2: 75, stroke: '#000', strokeWidth: 2 } }
    ]
  },
  square: { /* lunettes carrées */ },
  sunglasses: { /* verres noirs */ },
  nerd: { /* grosses lunettes épaisses */ }
};

function generateGlasses(style) {
  if (!style) return { id: 'glasses', elements: [] };
  // Retourne le groupe <g id="glasses"> rempli
}
```

**Chapeaux** - 6 styles:
```javascript
const hatStyles = {
  cap: {
    // Casquette avec visière
  },
  beanie: {
    // Bonnet simple
  },
  tophat: {
    // Haut-de-forme
  },
  baseball: {
    // Casquette de baseball
  },
  santa: {
    // Bonnet de Noël
  },
  crown: {
    // Couronne simple
  }
};

function generateHat(style, color) {
  if (!style) return { id: 'hat', elements: [] };
  // Retourne le groupe <g id="hat"> rempli
}
```

#### 2.3 - Système de personnalisation (`core/customizer.js`)

```javascript
/**
 * Modifie un personnage existant
 * @param {Object} character - Personnage à modifier
 * @param {Object} modifications - Modifications à appliquer
 * @returns {Object} - Nouveau personnage modifié
 */
function customizeCharacter(character, modifications) {
  // 1. Clone la config existante
  const newConfig = deepClone(character.config);

  // 2. Appliquer les modifications (merge profond)
  if (modifications.hair) {
    Object.assign(newConfig.hair, modifications.hair);
  }
  if (modifications.face) {
    Object.assign(newConfig.face, modifications.face);
  }
  if (modifications.clothing) {
    Object.assign(newConfig.clothing, modifications.clothing);
  }
  if (modifications.accessories) {
    Object.assign(newConfig.accessories, modifications.accessories);
  }

  // 3. Reconstruire le SVG
  const svg = buildSVG(newConfig);

  // 4. Retourner le nouveau personnage
  return {
    id: generateId(),
    seed: null,  // Plus de seed car personnalisé
    config: newConfig,
    svg: svgToString(svg),
    timestamp: Date.now()
  };
}
```

**Exemple d'utilisation**:
```javascript
const char = generateCharacter({ seed: 'user123' });

const customChar = customizeCharacter(char, {
  hair: { style: 'afro', color: '#FF1493' },
  accessories: {
    glasses: 'sunglasses',
    hat: 'cap'
  }
});
```

#### 2.4 - Export multi-formats (`core/exporter.js`)

```javascript
/**
 * Exporte un personnage dans différents formats
 * @param {Object} character - Personnage à exporter
 * @param {String} format - Format de sortie
 * @returns {String|Object} - Résultat selon le format
 */
function exportCharacter(character, format = 'svg-string') {
  switch (format) {
    case 'svg-string':
      return character.svg;

    case 'svg-data-uri':
      const encoded = encodeURIComponent(character.svg);
      return `data:image/svg+xml,${encoded}`;

    case 'json':
      return JSON.stringify({
        config: character.config,
        timestamp: character.timestamp
      }, null, 2);

    case 'react-component':
      return generateReactComponent(character);

    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

/**
 * Génère un composant React
 */
function generateReactComponent(character) {
  const svgContent = character.svg
    .replace(/xmlns="[^"]*"/g, '')
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=');

  return `
import React from 'react';

const Character = () => (
  ${svgContent}
);

export default Character;
`.trim();
}

/**
 * Regénère un personnage depuis sa config
 */
function generateFromConfig(config) {
  const svg = buildSVG(config);
  return {
    id: generateId(),
    seed: null,
    config: config,
    svg: svgToString(svg),
    timestamp: Date.now()
  };
}
```

#### 2.5 - Interface de personnalisation (`demo/phase2-customizer.html`)

**Fonctionnalités**:
- Affichage grand format du personnage
- Sélecteurs pour chaque caractéristique:
  - Forme de tête (radio buttons)
  - Couleur de peau (color picker ou palette)
  - Style de cheveux (dropdown)
  - Couleur de cheveux (color picker)
  - Type d'yeux (dropdown)
  - Type de bouche (dropdown)
  - Style de vêtements (dropdown)
  - Couleur de vêtements (color picker)
  - Lunettes (dropdown avec "aucune")
  - Chapeau (dropdown avec "aucun")
- Boutons d'export:
  - Download SVG
  - Copy Data URI
  - Copy JSON config
  - Copy React Component
- Bouton "Random" pour générer aléatoirement

**Structure HTML**:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Character Customizer - Phase 2</title>
  <style>
    .container {
      display: flex;
      gap: 40px;
      padding: 20px;
    }
    .preview {
      flex: 0 0 300px;
    }
    .controls {
      flex: 1;
      display: grid;
      gap: 15px;
    }
    .control-group {
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 5px;
    }
    .character-display {
      width: 300px;
      height: 450px;
      border: 2px solid #000;
      background: #f0f0f0;
    }
    .export-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>Character Customizer - Phase 2</h1>

  <div class="container">
    <div class="preview">
      <div id="characterDisplay" class="character-display"></div>
      <div class="export-buttons">
        <button onclick="downloadSVG()">Download SVG</button>
        <button onclick="copyDataURI()">Copy Data URI</button>
        <button onclick="copyJSON()">Copy JSON</button>
        <button onclick="copyReact()">Copy React</button>
      </div>
      <button onclick="randomize()" style="width: 100%; margin-top: 10px;">
        🎲 Randomize All
      </button>
    </div>

    <div class="controls">
      <div class="control-group">
        <h3>Head</h3>
        <label>Shape:</label>
        <select id="headShape" onchange="updateCharacter()">
          <option value="round">Round</option>
          <option value="oval">Oval</option>
          <option value="square">Square</option>
        </select>
        <label>Skin Tone:</label>
        <select id="skinTone" onchange="updateCharacter()">
          <option value="0">Light</option>
          <option value="1">Light-Medium</option>
          <option value="2">Medium</option>
          <option value="3">Medium-Dark</option>
          <option value="4">Dark</option>
          <option value="5">Very Dark</option>
        </select>
      </div>

      <div class="control-group">
        <h3>Hair</h3>
        <label>Style:</label>
        <select id="hairStyle" onchange="updateCharacter()">
          <option value="short">Short</option>
          <option value="spiky">Spiky</option>
          <option value="long">Long</option>
          <option value="bald">Bald</option>
          <option value="afro">Afro</option>
          <option value="ponytail">Ponytail</option>
          <option value="curly">Curly</option>
          <option value="mohawk">Mohawk</option>
          <option value="pigtails">Pigtails</option>
          <option value="bob">Bob</option>
        </select>
        <label>Color:</label>
        <input type="color" id="hairColor" onchange="updateCharacter()" />
      </div>

      <div class="control-group">
        <h3>Face</h3>
        <label>Eyes:</label>
        <select id="eyeType" onchange="updateCharacter()">
          <option value="normal">Normal</option>
          <option value="happy">Happy</option>
          <option value="surprised">Surprised</option>
          <option value="closed">Closed</option>
          <option value="wink">Wink</option>
          <option value="angry">Angry</option>
          <option value="hearts">Hearts</option>
          <option value="stars">Stars</option>
        </select>
        <label>Mouth:</label>
        <select id="mouthType" onchange="updateCharacter()">
          <option value="neutral">Neutral</option>
          <option value="smile">Smile</option>
          <option value="sad">Sad</option>
          <option value="open">Open</option>
          <option value="laugh">Laugh</option>
          <option value="surprised">Surprised</option>
          <option value="smirk">Smirk</option>
          <option value="tongue">Tongue Out</option>
        </select>
      </div>

      <div class="control-group">
        <h3>Clothing</h3>
        <label>Style:</label>
        <select id="clothingStyle" onchange="updateCharacter()">
          <option value="tshirt">T-Shirt</option>
          <option value="hoodie">Hoodie</option>
          <option value="vest">Vest</option>
          <option value="jacket">Jacket</option>
          <option value="sweater">Sweater</option>
          <option value="polo">Polo</option>
          <option value="dress">Dress</option>
        </select>
        <label>Color:</label>
        <input type="color" id="clothingColor" onchange="updateCharacter()" />
      </div>

      <div class="control-group">
        <h3>Accessories</h3>
        <label>Glasses:</label>
        <select id="glasses" onchange="updateCharacter()">
          <option value="">None</option>
          <option value="round">Round</option>
          <option value="square">Square</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="nerd">Nerd Glasses</option>
        </select>
        <label>Hat:</label>
        <select id="hat" onchange="updateCharacter()">
          <option value="">None</option>
          <option value="cap">Cap</option>
          <option value="beanie">Beanie</option>
          <option value="tophat">Top Hat</option>
          <option value="baseball">Baseball Cap</option>
          <option value="santa">Santa Hat</option>
          <option value="crown">Crown</option>
        </select>
      </div>
    </div>
  </div>

  <script type="module">
    import { generateCharacter, customizeCharacter, exportCharacter } from '../src/index.js';

    let currentCharacter = generateCharacter();
    displayCharacter();

    function updateCharacter() {
      const modifications = {
        head: {
          shape: document.getElementById('headShape').value,
          skinTone: parseInt(document.getElementById('skinTone').value)
        },
        hair: {
          style: document.getElementById('hairStyle').value,
          color: document.getElementById('hairColor').value
        },
        face: {
          eyes: document.getElementById('eyeType').value,
          mouth: document.getElementById('mouthType').value
        },
        clothing: {
          top: {
            style: document.getElementById('clothingStyle').value,
            color: document.getElementById('clothingColor').value
          }
        },
        accessories: {
          glasses: document.getElementById('glasses').value || null,
          hat: document.getElementById('hat').value || null
        }
      };

      currentCharacter = customizeCharacter(currentCharacter, modifications);
      displayCharacter();
    }

    function displayCharacter() {
      document.getElementById('characterDisplay').innerHTML = currentCharacter.svg;
      // Sync controls with current character
      syncControls();
    }

    function syncControls() {
      const config = currentCharacter.config;
      document.getElementById('headShape').value = config.head.shape;
      document.getElementById('skinTone').value = config.head.skinTone;
      document.getElementById('hairStyle').value = config.hair.style;
      document.getElementById('hairColor').value = config.hair.color;
      // etc...
    }

    function randomize() {
      currentCharacter = generateCharacter();
      displayCharacter();
    }

    window.updateCharacter = updateCharacter;
    window.randomize = randomize;
    window.downloadSVG = () => {
      const blob = new Blob([currentCharacter.svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `character-${Date.now()}.svg`;
      a.click();
    };
    window.copyDataURI = () => {
      const dataUri = exportCharacter(currentCharacter, 'svg-data-uri');
      navigator.clipboard.writeText(dataUri);
      alert('Data URI copied!');
    };
    window.copyJSON = () => {
      const json = exportCharacter(currentCharacter, 'json');
      navigator.clipboard.writeText(json);
      alert('JSON config copied!');
    };
    window.copyReact = () => {
      const react = exportCharacter(currentCharacter, 'react-component');
      navigator.clipboard.writeText(react);
      alert('React component copied!');
    };
  </script>
</body>
</html>
```

#### 2.6 - Mise à jour de `index.js`

```javascript
import { generateCharacter } from './core/generator.js';
import { customizeCharacter } from './core/customizer.js';
import { exportCharacter, generateFromConfig } from './core/exporter.js';

export {
  generateCharacter,
  customizeCharacter,
  exportCharacter,
  generateFromConfig
};

export default {
  generateCharacter,
  customizeCharacter,
  exportCharacter,
  generateFromConfig
};
```

### Critères de succès Phase 2

**Vérifications visuelles**:
- [ ] Ouvrir `demo/phase2-customizer.html`
- [ ] Changer chaque option et voir le personnage se mettre à jour
- [ ] Au moins 10 styles de cheveux disponibles
- [ ] Au moins 8 types d'yeux et 8 types de bouches
- [ ] Les accessoires (lunettes, chapeaux) s'affichent correctement
- [ ] Les accessoires peuvent être retirés (option "None")
- [ ] Bouton "Randomize" génère des personnages variés
- [ ] Tous les boutons d'export fonctionnent
- [ ] Download SVG télécharge un fichier valide
- [ ] Data URI fonctionne dans une balise `<img>`
- [ ] JSON config peut être utilisé pour régénérer le personnage
- [ ] React component est du JSX valide

**Caractéristiques techniques**:
- [ ] Structure SVG toujours identique malgré les variations
- [ ] Accessoires non utilisés ont un groupe vide ou opacity:0
- [ ] Performance fluide lors du changement d'options
- [ ] Cohérence des couleurs (pas de combinaisons horribles)

---

## PHASE 3 - Optimisation & Production

### Objectif
Optimiser les performances, préparer l'intégration React, et créer une démo finale type "Dancing Room".

### Livrables
- ✓ Optimisations performance (<50ms, <10KB)
- ✓ Génération batch efficace (20+ personnages)
- ✓ Composants React prêts pour l'intégration
- ✓ Démo finale type "galerie animée"
- ✓ Documentation API complète
- ✓ Package NPM-ready

### Tâches détaillées

#### 3.1 - Optimisations de performance

**Caching des templates**:
```javascript
// Cache des structures SVG pré-construites
const templateCache = new Map();

function getCachedTemplate(key) {
  if (!templateCache.has(key)) {
    templateCache.set(key, buildTemplate(key));
  }
  return templateCache.get(key);
}
```

**Optimisation de la construction SVG**:
```javascript
// Au lieu de construire string par string
// Utiliser un builder optimisé avec array join
class FastSVGBuilder {
  constructor() {
    this.parts = [];
  }

  add(element) {
    this.parts.push(element);
  }

  build() {
    return this.parts.join('');
  }
}
```

**Minification du SVG**:
```javascript
function minifySVG(svg) {
  return svg
    .replace(/\s+/g, ' ')           // Condenser les espaces
    .replace(/>\s+</g, '><')        // Supprimer espaces entre tags
    .replace(/\s*=\s*/g, '=')       // Supprimer espaces autour de =
    .replace(/"\s+/g, '"')          // Supprimer espaces après "
    .trim();
}
```

**Pool d'objets pour génération batch**:
```javascript
/**
 * Génère plusieurs personnages en batch (plus efficace)
 */
function generateCharacterBatch(count, options = {}) {
  const characters = [];
  const baseConfig = options.baseConfig || {};

  // Pré-allocation
  characters.length = count;

  for (let i = 0; i < count; i++) {
    const seed = options.seedPrefix ? `${options.seedPrefix}-${i}` : null;
    characters[i] = generateCharacter({
      ...options,
      seed
    });
  }

  return characters;
}
```

#### 3.2 - Composants React (`src/react/`)

**`CharacterDisplay.jsx`**:
```jsx
import React from 'react';

/**
 * Composant d'affichage simple d'un personnage
 */
export const CharacterDisplay = ({ character, size = 200, onClick }) => {
  return (
    <div
      className="character-display"
      style={{ width: size, height: size * 1.5 }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: character.svg }}
    />
  );
};
```

**`CharacterAvatar.jsx`**:
```jsx
import React, { useMemo } from 'react';
import { generateCharacter } from '../core/generator.js';

/**
 * Avatar généré automatiquement à partir d'un seed
 */
export const CharacterAvatar = ({
  userId,
  size = 50,
  onClick
}) => {
  const character = useMemo(() => {
    return generateCharacter({ seed: userId });
  }, [userId]);

  return (
    <CharacterDisplay
      character={character}
      size={size}
      onClick={onClick}
    />
  );
};
```

**`CharacterCustomizer.jsx`**:
```jsx
import React, { useState } from 'react';
import { generateCharacter, customizeCharacter } from '../index.js';

/**
 * Composant complet de personnalisation
 */
export const CharacterCustomizer = ({
  initialCharacter,
  onSave
}) => {
  const [character, setCharacter] = useState(
    initialCharacter || generateCharacter()
  );

  const handleModify = (modifications) => {
    const updated = customizeCharacter(character, modifications);
    setCharacter(updated);
  };

  return (
    <div className="character-customizer">
      <div className="preview">
        <CharacterDisplay character={character} size={300} />
      </div>
      <div className="controls">
        {/* Tous les contrôles de la phase 2 */}
      </div>
      <button onClick={() => onSave(character)}>
        Save Character
      </button>
    </div>
  );
};
```

**`DancingRoom.jsx`** - Composant de démo:
```jsx
import React, { useState, useEffect } from 'react';
import { generateCharacterBatch } from '../core/generator.js';

/**
 * Simulation de la Dancing Room avec plusieurs personnages
 */
export const DancingRoom = ({ count = 20 }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Générer les personnages au montage
    const chars = generateCharacterBatch(count, {
      seedPrefix: 'dancer'
    });
    setCharacters(chars);
  }, [count]);

  return (
    <div className="dancing-room">
      {characters.map((char, idx) => (
        <div
          key={idx}
          className="dancer"
          style={{
            // Positionnement aléatoire
            left: `${(idx % 5) * 20}%`,
            top: `${Math.floor(idx / 5) * 25}%`
          }}
        >
          <CharacterDisplay character={char} size={100} />
        </div>
      ))}
    </div>
  );
};
```

#### 3.3 - Hooks React utilitaires (`src/react/hooks.js`)

```javascript
import { useState, useCallback, useMemo } from 'react';
import { generateCharacter, customizeCharacter } from '../index.js';

/**
 * Hook pour gérer un personnage avec état
 */
export function useCharacter(initialOptions = {}) {
  const [character, setCharacter] = useState(() =>
    generateCharacter(initialOptions)
  );

  const regenerate = useCallback((options = {}) => {
    setCharacter(generateCharacter(options));
  }, []);

  const customize = useCallback((modifications) => {
    setCharacter(current => customizeCharacter(current, modifications));
  }, []);

  return {
    character,
    regenerate,
    customize
  };
}

/**
 * Hook pour générer un avatar à partir d'un userId
 */
export function useCharacterAvatar(userId) {
  return useMemo(() => {
    return generateCharacter({ seed: userId });
  }, [userId]);
}

/**
 * Hook pour générer plusieurs personnages
 */
export function useCharacterBatch(count, seedPrefix = 'batch') {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) =>
      generateCharacter({ seed: `${seedPrefix}-${i}` })
    );
  }, [count, seedPrefix]);
}
```

#### 3.4 - Démo finale (`demo/phase3-dancing-room.html`)

**Fonctionnalités**:
- Affichage de 20+ personnages simultanés
- Animation CSS simple (bounce, sway)
- Génération performante (mesure du temps)
- Contrôle du nombre de personnages (slider)
- Bouton "Regenerate All"
- Statistiques de performance
- Grid responsive

**Structure**:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Dancing Room Demo - Phase 3</title>
  <style>
    .dancing-room {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 20px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 80vh;
    }

    .dancer {
      animation: dance 2s ease-in-out infinite;
    }

    .dancer:nth-child(even) {
      animation-delay: 0.5s;
    }

    @keyframes dance {
      0%, 100% { transform: translateY(0) rotate(-2deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }

    .character-display {
      width: 100%;
      height: auto;
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
    }

    .controls {
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 100;
    }

    .stats {
      margin-top: 15px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="controls">
    <h3>Dancing Room Controls</h3>
    <label>
      Number of dancers: <span id="countDisplay">20</span>
      <input
        type="range"
        id="dancerCount"
        min="5"
        max="50"
        value="20"
        onchange="updateCount()"
      />
    </label>
    <button onclick="regenerateAll()">🔄 Regenerate All</button>

    <div class="stats">
      <div>Total dancers: <strong id="totalDancers">0</strong></div>
      <div>Generation time: <strong id="genTime">0</strong>ms</div>
      <div>Avg per character: <strong id="avgTime">0</strong>ms</div>
      <div>Total SVG size: <strong id="totalSize">0</strong>KB</div>
    </div>
  </div>

  <div id="dancingRoom" class="dancing-room"></div>

  <script type="module">
    import { generateCharacterBatch } from '../src/core/generator.js';

    let currentCount = 20;

    function renderDancers(count) {
      const room = document.getElementById('dancingRoom');
      room.innerHTML = '';

      // Mesure de performance
      const startTime = performance.now();

      const characters = generateCharacterBatch(count, {
        seedPrefix: 'dancer'
      });

      const endTime = performance.now();
      const generationTime = endTime - startTime;

      // Affichage
      characters.forEach(char => {
        const div = document.createElement('div');
        div.className = 'dancer';
        div.innerHTML = `<div class="character-display">${char.svg}</div>`;
        room.appendChild(div);
      });

      // Stats
      const totalSize = characters.reduce((sum, char) =>
        sum + new Blob([char.svg]).size, 0
      );

      document.getElementById('totalDancers').textContent = count;
      document.getElementById('genTime').textContent = generationTime.toFixed(2);
      document.getElementById('avgTime').textContent = (generationTime / count).toFixed(2);
      document.getElementById('totalSize').textContent = (totalSize / 1024).toFixed(2);

      // Vérifier les contraintes
      const avgTime = generationTime / count;
      if (avgTime > 50) {
        console.warn(`⚠️ Performance warning: ${avgTime.toFixed(2)}ms per character (target: <50ms)`);
      }
      if (totalSize / count > 10240) {
        console.warn(`⚠️ Size warning: ${(totalSize / count / 1024).toFixed(2)}KB per character (target: <10KB)`);
      }
    }

    function updateCount() {
      currentCount = parseInt(document.getElementById('dancerCount').value);
      document.getElementById('countDisplay').textContent = currentCount;
      renderDancers(currentCount);
    }

    function regenerateAll() {
      renderDancers(currentCount);
    }

    window.updateCount = updateCount;
    window.regenerateAll = regenerateAll;

    // Génération initiale
    renderDancers(currentCount);
  </script>
</body>
</html>
```

#### 3.5 - Documentation API (`docs/API.md`)

Créer une documentation complète avec:
- Installation et setup
- API reference pour chaque fonction
- Exemples d'utilisation
- Guide d'intégration React
- FAQ et troubleshooting

#### 3.6 - Package preparation

**`package.json`**:
```json
{
  "name": "@sunodj/character-generator",
  "version": "1.0.0",
  "description": "South Park style character generator for Sunodj Dancing Room",
  "main": "src/index.js",
  "module": "src/index.js",
  "type": "module",
  "exports": {
    ".": "./src/index.js",
    "./react": "./src/react/index.js"
  },
  "keywords": ["character", "avatar", "svg", "south-park", "generator"],
  "author": "Sunodj Team",
  "license": "MIT"
}
```

**`README.md`** du module:
```markdown
# Character Generator

South Park style character generator for Sunodj Dancing Room.

## Installation

\`\`\`bash
npm install @sunodj/character-generator
\`\`\`

## Quick Start

\`\`\`javascript
import { generateCharacter } from '@sunodj/character-generator';

const character = generateCharacter();
console.log(character.svg); // SVG string
\`\`\`

## React Integration

\`\`\`jsx
import { CharacterAvatar } from '@sunodj/character-generator/react';

function App() {
  return <CharacterAvatar userId="user123" size={100} />;
}
\`\`\`

## Documentation

See [API.md](./docs/API.md) for complete documentation.
```

### Critères de succès Phase 3

**Vérifications visuelles**:
- [ ] Ouvrir `demo/phase3-dancing-room.html`
- [ ] 20 personnages s'affichent correctement
- [ ] Animation CSS fonctionne (bounce)
- [ ] Slider change le nombre de personnages dynamiquement
- [ ] Bouton "Regenerate All" fonctionne
- [ ] Statistiques de performance affichées
- [ ] Grid responsive s'adapte à la taille de l'écran

**Vérifications de performance**:
- [ ] Génération de 20 personnages < 1000ms total (50ms par personnage)
- [ ] Chaque SVG < 10KB
- [ ] Pas de lag lors de la régénération
- [ ] Console sans warnings de performance

**Vérifications techniques**:
- [ ] Composants React fonctionnent (test dans app principale)
- [ ] Hooks React utilisables
- [ ] Package.json correct
- [ ] Documentation complète
- [ ] Tous les exports fonctionnels
- [ ] Module importable dans projet React

**Intégration finale**:
- [ ] Import dans l'app Sunodj principale fonctionne
- [ ] Peut générer des avatars utilisateurs
- [ ] Peut créer une Dancing Room avec 20+ personnages
- [ ] Performance acceptable en production

---

## Résumé des 3 Phases

### Phase 1 - Fondations (Temps estimé: Simple et rapide)
**Objectif**: Structure SVG solide + génération de base
**Livrable**: Générateur minimal fonctionnel avec 3-4 variations
**Test**: `demo/phase1-demo.html` - 9 personnages générés avec seed

### Phase 2 - Expansion (Temps estimé: Moyen)
**Objectif**: Variété maximale + personnalisation
**Livrable**: Interface de customization complète + 8-10 variations
**Test**: `demo/phase2-customizer.html` - Interface interactive

### Phase 3 - Production (Temps estimé: Moyen)
**Objectif**: Performance + intégration React
**Livrable**: Package prêt pour l'app + démo Dancing Room
**Test**: `demo/phase3-dancing-room.html` - 20+ personnages animés

---

## Notes Importantes

### Principes à respecter ABSOLUMENT

1. **Structure SVG unifiée**: Chaque personnage DOIT avoir exactement la même structure SVG, les mêmes IDs, le même ordre. C'est CRITIQUE pour les animations futures.

2. **Pas de compromis sur la cohérence**: Si un accessoire n'est pas utilisé, le groupe existe quand même (vide ou opacity:0). Jamais de structure conditionnelle.

3. **Style South Park**: Toujours des contours noirs épais (2-3px), formes simples, couleurs aplat sans dégradés.

4. **Performance**: Garder les SVG < 10KB et génération < 50ms par personnage.

5. **Testabilité visuelle**: Chaque phase doit produire une démo HTML immédiatement visualisable dans un navigateur.

### Commandes de test

```bash
# Phase 1
open character-generator/demo/phase1-demo.html

# Phase 2
open character-generator/demo/phase2-customizer.html

# Phase 3
open character-generator/demo/phase3-dancing-room.html
```

### Structure finale du projet

```
character-generator/
├── requirements.md
├── task.md
├── README.md
├── package.json
├── src/
│   ├── index.js
│   ├── core/
│   │   ├── generator.js
│   │   ├── customizer.js
│   │   └── exporter.js
│   ├── templates/
│   │   └── svgStructure.js
│   ├── parts/
│   │   ├── body.js
│   │   ├── head.js
│   │   ├── face.js
│   │   ├── hair.js
│   │   ├── clothing.js
│   │   └── accessories.js
│   ├── data/
│   │   └── colors.js
│   ├── utils/
│   │   ├── svgBuilder.js
│   │   └── seededRandom.js
│   └── react/
│       ├── index.js
│       ├── CharacterDisplay.jsx
│       ├── CharacterAvatar.jsx
│       ├── CharacterCustomizer.jsx
│       ├── DancingRoom.jsx
│       └── hooks.js
├── demo/
│   ├── phase1-demo.html
│   ├── phase2-customizer.html
│   └── phase3-dancing-room.html
├── docs/
│   └── API.md
└── examples/
    ├── phase1/
    ├── phase2/
    └── phase3/
```
