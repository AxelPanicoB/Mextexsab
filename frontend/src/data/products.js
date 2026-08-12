const BASE = import.meta.env.BASE_URL;

const products = [

  // ── AUXILIARES DE PROCESO ─────────────────────────────────
  {
    id: 'aux-01',
    name: 'Agente amortiguador de acidez para lácteos',
    category: 'Auxiliares de proceso',
    functional: 'Auxiliar',
    applications: ['Quesos', 'Cremas'],
    image: `${BASE}img/Productos/Auxiliares de proceso/conservador natural láctico.png`,
    summary: 'Conservador natural en presentación líquida.',
    tags: ['conservador', 'acidez', 'natural'],
    highlights: ['Estabiliza pH', 'Limita propagación de lactobacilos', 'Origen natural'],
    metrics: [
      { label: 'Estabilidad de pH', level: 5 },
      { label: 'Vida de anaquel', level: 4 },
      { label: 'Naturalidad', level: 5 }
    ]
  },
  {
    id: 'aux-02',
    name: 'Emulsificante concentrado para lácteos',
    category: 'Auxiliares de proceso',
    functional: 'Auxiliar',
    applications: ['Quesos', 'Cremas', 'Bebidas'],
    image: `${BASE}img/Productos/Auxiliares de proceso/Emulsificante destilado concentrado.jpg`,
    summary: '',
    tags: ['emulsificante', 'textura', 'concentrado'],
    highlights: ['Sabor neutro, no altera sabor del lácteo', 'Más del 90% de concentración', 'Dosificación menor y costo mejorado'],
    metrics: [
      { label: 'Emulsificación', level: 5 },
      { label: 'Textura', level: 4 },
      { label: 'Concentración activa', level: 5 }
    ]
  },

  // ── TEXTURIZANTES Y ESTABILIZANTES ────────────────────────
  {
    id: 'tex-01',
    name: 'Retenedor de humedad para quesos frescos',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Texturizante',
    applications: ['Quesos'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Retenedores de Humedad.jpg`,
    summary: 'Mejora el rendimiento en quesos frescos tipo Panela, Ranchero, Morral, Canasto y otros frescos.',
    tags: ['quesos', 'humedad', 'textura'],
    highlights: ['Reduce desuerado y sin impartir sabor.', 'Mejora rendimiento y vida de anaquel.', 'Mejora costo de formulación general.'],
    metrics: [
      { label: 'Retención de humedad', level: 4 },
      { label: 'Anti-sinéresis', level: 5 },
      { label: 'Rendimiento', level: 4 }
    ]
  },
  {
    id: 'tex-02',
    name: 'Sistema de texturización de queso pizzero análogo',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Texturizante',
    applications: ['Quesos'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Texturizanteafirmante.jpg`,
    summary: 'Forma un gel termo-resistente para quesos pizzeros análogos.',
    tags: ['quesos', 'pizza', 'análogo'],
    highlights: ['Reduce pérdida de agua evitando el requemado.', 'Evita que se haga demasiado fluido el queso en el horno y se salga de la pizza.', 'Mejora la firmeza del queso y facilita el cubicado.'],
    metrics: [
      { label: 'Fundido uniforme', level: 5 },
      { label: 'Termorresistencia', level: 4 },
      { label: 'Elasticidad de gel', level: 4 }
    ]
  },
  {
    id: 'tex-03',
    name: 'Sistema estabilizante para cremas naturales y análogas',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Estabilizante',
    applications: ['Cremas'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para cremas.jpg`,
    summary: '',
    tags: ['cremas', 'espesante', 'estabilizante'],
    highlights: ['Evita sinéresis', 'Con o sin homogeneizado', 'Para cremas naturales y análogas'],
    metrics: [
      { label: 'Anti-sinéresis', level: 5 },
      { label: 'Estabilidad térmica', level: 4 },
      { label: 'Viscosidad', level: 4 }
    ]
  },
  {
    id: 'tex-04',
    name: 'Sistema de estabilización para yogurt batido y bebible',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Estabilizante',
    applications: ['Yogurt'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para Yogurt.jpg`,
    summary: '',
    tags: ['yogurt', 'texturizante', 'estabilizante'],
    highlights: ['Viscosidad fluida a cuchareable según dosis', 'Consistencia en almacenamiento', 'Evita sinéresis'],
    metrics: [
      { label: 'Estabilidad en almac.', level: 5 },
      { label: 'Anti-sinéresis', level: 5 },
      { label: 'Cremosidad', level: 4 }
    ]
  },
  {
    id: 'tex-05',
    name: 'Sistemas texturizantes para queso tipo Cheddar para Nachos',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Estabilizante',
    applications: ['Quesos'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para Queso Cheddar.png`,
    summary: '',
    tags: ['quesos', 'cheddar', 'nachos'],
    highlights: ['Versión caliente se mantiene fluido hasta verter', 'Versión fría se mantiene fija', 'Fácil dosificación'],
    metrics: [
      { label: 'Viscosidad', level: 4 },
      { label: 'Fundido uniforme', level: 5 },
      { label: 'Estabilidad térmica', level: 3 }
    ]
  },
  {
    id: 'tex-06',
    name: 'Sistema de retención de humedad para tortillas de anaquel',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Texturizante',
    applications: ['Tortillas'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/etenedores de Humedad para tortillas de anaquel.jpg`,
    summary: '',
    tags: ['tortillas', 'humedad', 'anaquel'],
    highlights: ['Mantiene suavidad y frescura', 'Permite recalentamiento sin perder flexibilidad', 'Extiende vida útil evitando resecado'],
    metrics: [
      { label: 'Retención de humedad', level: 5 },
      { label: 'Vida de anaquel', level: 4 },
      { label: 'Suavidad', level: 4 }
    ]
  },
  {
    id: 'tex-07',
    name: 'Sistema gelificante para postres lácteos, flanes, mousses, natillas y budines',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Gelificante',
    applications: ['Postres'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Gelificantesestabilizantes.jpg`,
    summary: '',
    tags: ['gelificante', 'postres', 'flanes'],
    highlights: ['Gelificación uniforme y estable', 'Opciones con o sin temperaturas altas', 'Consistencia ajustable según dosis'],
    metrics: [
      { label: 'Gelificación', level: 5 },
      { label: 'Cremosidad', level: 4 },
      { label: 'Estabilidad de gel', level: 5 }
    ]
  },
  {
    id: 'tex-08',
    name: 'Sistema estabilizante y aireante para helados y nieves',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Estabilizante',
    applications: ['Helados'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizanteemulsificante.jpg`,
    summary: '',
    tags: ['helados', 'paletas', 'congelados'],
    highlights: ['Previene cristalización y sinéresis', 'Mantiene aireado y palatabilidad', 'Para helados, nieves, paletas y bolis'],
    metrics: [
      { label: 'Anti-cristalización', level: 5 },
      { label: 'Anti-sinéresis', level: 4 },
      { label: 'Cremosidad', level: 5 }
    ]
  },
  {
    id: 'tex-09',
    name: 'Sistema estabilizante para leches formuladas UHT y HTST',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Estabilizante',
    applications: ['Bebidas'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizante  espesante para leches.png`,
    summary: '',
    tags: ['leche', 'UHT', 'HTST'],
    highlights: ['Aporta cuerpo', 'Evita precipitación de proteínas', 'Compatible con UHT/HTST'],
    metrics: [
      { label: 'Estabilidad proteica', level: 5 },
      { label: 'Suspensión', level: 4 },
      { label: 'Viscosidad', level: 3 }
    ]
  },
  {
    id: 'tex-10',
    name: 'Sistema texturizante para bebidas lácteas con pulpa',
    category: 'Texturizantes y Estabilizantes',
    functional: 'Estabilizante',
    applications: ['Bebidas'],
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para bebidas.jpeg`,
    summary: '',
    tags: ['bebidas', 'suspensión', 'instantáneas'],
    highlights: ['Con sólidos o pulpa', 'Preparadas o instantáneas', 'Mejora sensación en boca'],
    metrics: [
      { label: 'Suspensión de partículas', level: 4 },
      { label: 'Viscosidad', level: 4 },
      { label: 'Sensación en boca', level: 5 }
    ]
  },

  // ── COLORANTES ────────────────────────────────────────────
  {
    id: 'col-01',
    name: 'Colorante blanco estable en suspensión para lácteos',
    category: 'Colorantes',
    functional: 'Colorante',
    applications: ['Quesos', 'Cremas', 'Bebidas'],
    image: `${BASE}img/Productos/Colorantes/Dioxido-de-titanio.png`,
    summary: '',
    tags: ['colorante', 'blanco', 'lácteos'],
    highlights: ['Suspensión acuosa segura para operador', 'Estable en proceso térmico', 'Fácil manejo y dosificación'],
    metrics: [
      { label: 'Cobertura cromática', level: 5 },
      { label: 'Estabilidad térmica', level: 5 },
      { label: 'Uniformidad', level: 5 }
    ]
  },
  {
    id: 'col-02',
    name: 'Colorante natural Annatto liposoluble e hidrosoluble para quesos y cremas',
    category: 'Colorantes',
    functional: 'Colorante',
    applications: ['Quesos', 'Cremas'],
    image: `${BASE}img/Productos/Colorantes/Rojo_Annatto_liposoluble.png`,
    summary: '',
    tags: ['colorante', 'natural', 'annatto'],
    highlights: ['Versión liposoluble en aceite vegetal', 'Versión hidrosoluble disponible', 'Tonos amarillo a anaranjado-rojo'],
    metrics: [
      { label: 'Intensidad de color', level: 4 },
      { label: 'Estabilidad', level: 4 },
      { label: 'Naturalidad', level: 5 }
    ]
  },

  // ── SABORIZANTES ──────────────────────────────────────────
  {
    id: 'sab-01',
    name: 'Perfiles de sabor para cremas ácidas, dulces y especiales',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Cremas'],
    image: `${BASE}img/Productos/Saborizantes/cremas/crema.jpeg`,
    summary: '',
    tags: ['cremas', 'sabores', 'aromas'],
    highlights: ['Aromas y sabores para cremas ácidas, dulces y especiales', 'Disponibles en polvo y líquido', 'Fácil dosificación'],
    flavors: ['Crema Ácida', 'Crema Dulce', 'Crema para café'],
    metrics: [
      { label: 'Intensidad aromática', level: 4 },
      { label: 'Fidelidad de perfil', level: 5 },
      { label: 'Estabilidad', level: 4 }
    ]
  },
  {
    id: 'sab-02',
    name: 'Perfiles de sabor mantequilla para margarinas y cremas',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Cremas'],
    image: `${BASE}img/Productos/Saborizantes/mantequilla/Mantequilla.jpeg`,
    summary: '',
    tags: ['mantequilla', 'sabores', 'margarinas'],
    highlights: ['Más de 10 perfiles de mantequilla', 'Desde económicos hasta sofisticados', 'Disponibles en polvo y líquido'],
    flavors: ['Mantequilla Industrial', 'Mantequilla de Mesa', 'Mantequilla Holandesa'],
    metrics: [
      { label: 'Intensidad aromática', level: 5 },
      { label: 'Fidelidad de perfil', level: 5 },
      { label: 'Estabilidad térmica', level: 4 }
    ]
  },
  {
    id: 'sab-03',
    name: 'Perfiles de sabor lácteo para bebidas, postres, quesos y cremas',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Bebidas', 'Postres'],
    image: `${BASE}img/Productos/Saborizantes/leches/leche.png`,
    summary: '',
    tags: ['leche', 'sabores', 'bebidas'],
    highlights: ['Varios perfiles de sabor leche', 'Leche fresca, condensada, bronca', 'Redondean sabor final único'],
    flavors: ['Leche Fresca', 'Leche Bronca', 'Leche Condensada'],
    metrics: [
      { label: 'Intensidad aromática', level: 4 },
      { label: 'Fidelidad de perfil', level: 5 },
      { label: 'Solubilidad', level: 4 }
    ]
  },
  {
    id: 'sab-04',
    name: 'Perfiles aromáticos para helados, nieves y paletas',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Helados'],
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/helados.png`,
    summary: '',
    tags: ['helados', 'sabores', 'paletas'],
    highlights: ['Estables en frío', 'Sabor para mezcclaya base económico', 'Gran variedad frutales tradicionales e innovadores'],
    flavors: ['Chocolate', 'Vainilla', 'Mango', 'Durazno', 'Piña-Coco', 'Plátano', 'Nuez', 'Fresa', 'Manzana', 'Uva'],
    metrics: [
      { label: 'Intensidad aromática', level: 5 },
      { label: 'Estabilidad en frío', level: 5 },
      { label: 'Variedad de perfiles', level: 5 }
    ]
  },
  {
    id: 'sab-05',
    name: 'Perfiles de sabor para yogurt natural y frutado',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Yogurt'],
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.png`,
    summary: '',
    tags: ['yogurt', 'sabores', 'frutas'],
    highlights: ['Estables en almacenamiento y consistentes', 'Lote tras lote confiable', 'Costo de formulación económica'],
    flavors: ['Yogurt Natural', 'Vainilla', 'Mango', 'Durazno', 'Piña-Coco', 'Plátano', 'Nuez', 'Manzana', 'Fresa'],
    metrics: [
      { label: 'Intensidad aromática', level: 4 },
      { label: 'Fidelidad de perfil', level: 4 },
      { label: 'Estabilidad', level: 4 }
    ]
  },
  {
    id: 'sab-06',
    name: 'Perfiles de sabor cajeta y dulce de leche',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Postres'],
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/cajeta.png`,
    summary: '',
    tags: ['cajeta', 'dulces', 'sabores'],
    highlights: ['Cajeta de cabra auténtica', 'Cajeta económica', 'Aplicables a bajas dosis'],
    flavors: ['Cajeta de Cabra', 'Leche Condensada'],
    metrics: [
      { label: 'Intensidad aromática', level: 5 },
      { label: 'Fidelidad de perfil', level: 5 },
      { label: 'Estabilidad térmica', level: 4 }
    ]
  },
  {
    id: 'sab-07',
    name: 'Perfiles de sabor para natillas y postres de cuchareo',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Postres'],
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/natilla.jpg`,
    summary: '',
    tags: ['natilla', 'postres', 'sabores'],
    highlights: ['Perfil suave y cremoso', 'Para postres fríos o preparados', 'Fácil integración a bajas dosis'],
    flavors: ['Chocolate', 'Vainilla'],
    metrics: [
      { label: 'Intensidad aromática', level: 4 },
      { label: 'Suavidad de perfil', level: 4 },
      { label: 'Integración', level: 4 }
    ]
  },
  {
    id: 'sab-08',
    name: 'Perfiles aromáticos para bebidas lácteas y acuosas',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Bebidas'],
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/mango.jpeg`,
    summary: '',
    tags: ['bebidas', 'sabores', 'frutas'],
    highlights: ['Con sólidos o pulpa, preparadas o instantáneas', 'Mejora suspensión y sensación en boca', 'Proporciona cuerpo'],
    flavors: ['Chocolate', 'Vainilla', 'Mango', 'Durazno', 'Piña-Coco', 'Plátano', 'Nuez', 'Fresa', 'Manzana', 'Uva'],
    metrics: [
      { label: 'Intensidad aromática', level: 5 },
      { label: 'Estabilidad', level: 4 },
      { label: 'Variedad de perfiles', level: 5 }
    ]
  },
  {
    id: 'sab-09',
    name: 'Perfiles de sabor en polvo para quesos análogos, semi-análogos y naturales',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Quesos'],
    image: `${BASE}img/Productos/Saborizantes/quesos/polvo/quesos.png`,
    summary: '',
    tags: ['quesos', 'polvo', 'sabores'],
    highlights: ['Muy concentrados a bajas dosis', 'Amplia variedad de quesos', '12 meses sin refrigeración'],
    flavors: ['Leche Fresca', 'Crema Ácida', 'Gouda', 'Manchego', 'Romano', 'Cheddar', 'Queso Crema', 'Adobera'],
    metrics: [
      { label: 'Intensidad aromática', level: 4 },
      { label: 'Fidelidad de perfil', level: 5 },
      { label: 'Dosificación', level: 5 }
    ]
  },
  {
    id: 'sab-10',
    name: 'Perfiles de sabor líquidos para quesos análogos y naturales',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Quesos'],
    image: `${BASE}img/Productos/Saborizantes/quesos/Liquidos/quesos.png`,
    summary: '',
    tags: ['quesos', 'líquido', 'sabores'],
    highlights: ['Perfiles auténticos y precisos', 'Alta concentración a dosis bajas', 'Perfil consistente lote tras lote'],
    flavors: ['Leche Fresca', 'Gouda', 'Manchego', 'Romano', 'Cheddar', 'Queso Crema', 'Provolone / Ahumado', 'Queso Azul / Blue Cheese', 'Panela / Ranchero', 'Cotija', 'Maduro', 'Canasto', 'Asadero', 'Mozzarella', 'Parmesano', 'Oaxaca Ácido', 'Oaxaca Suave', 'Queso de Cabra', 'Chihuahua'],
    metrics: [
      { label: 'Intensidad aromática', level: 5 },
      { label: 'Fidelidad de perfil', level: 5 },
      { label: 'Variedad de perfiles', level: 5 }
    ]
  },
  {
    id: 'sab-11',
    name: 'Perfiles de sabor especiales para aplicaciones únicas',
    category: 'Saborizantes',
    functional: 'Saborizante',
    applications: ['Quesos', 'Bebidas', 'Postres'],
    image: `${BASE}img/Productos/Saborizantes/otros/otros.png`,
    summary: '',
    tags: ['sabores', 'especiales', 'diferenciados'],
    highlights: ['Sabores únicos para diferenciación', 'Disponibles en polvo y líquido', 'Alta concentración a bajas dosis'],
    flavors: ['Humo', 'Pollo', 'Huevo', 'Chamoy', 'Cheddar', 'Jerez', 'Miel'],
    metrics: [
      { label: 'Intensidad aromática', level: 4 },
      { label: 'Diferenciación', level: 5 },
      { label: 'Versatilidad', level: 4 }
    ]
  }

];

export default products;

