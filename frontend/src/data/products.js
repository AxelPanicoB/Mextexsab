const BASE = import.meta.env.BASE_URL;

const products = [

  // ── AUXILIARES DE PROCESO ─────────────────────────────────
  {
    id: 'aux-01',
    name: 'Agente amortiguador de acidez',
    category: 'Auxiliares de proceso',
    functional: 'Auxiliar',
    applications: ['Quesos', 'Cremas'],
    image: `${BASE}img/Productos/Auxiliares de proceso/conservador natural láctico.webp`,
    summary: 'Conservador natural en presentación líquida. Estabiliza pH y\nprolonga vida de anaquel en lácteos y dulces suaves.',
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
    image: `${BASE}img/Productos/Auxiliares de proceso/Emulsificante destilado concentrado.webp`,
    summary: '',
    tags: ['emulsificante', 'textura', 'concentrado'],
    highlights: ['Sabor neutro, no altera el sabor del producto lácteo', 'Más del 90% de concentración', 'Dosis menor, costo de formulación mejorado'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Retenedores de Humedad.webp`,
    summary: 'Reduce el desuerado y mejora el rendimiento en quesos frescos tipo\nPanela, Ranchero, Morral, Canasto y otros frescos.',
    tags: ['quesos', 'humedad', 'textura'],
    highlights: ['Reduce desuerado sin impartir sabor', 'Mejora rendimiento y vida de anaquel', 'Mejora costo de formulación general'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Texturizanteafirmante.webp`,
    summary: 'Forma un gel termo-resistente para quesos pizzeros análogos.',
    tags: ['quesos', 'pizza', 'análogo'],
    highlights: ['Reduce pérdida de agua evitando el requemado', 'Evita que se haga demasiado fluido el queso en el horno y se salga de la pizza', 'Mejora la firmeza del queso y facilita el cubicado'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para cremas.webp`,
    summary: 'Para cremas naturales, análogas o semi-análogas, con o sin homogeneizado.',
    tags: ['cremas', 'espesante', 'estabilizante'],
    highlights: ['Da cuerpo (viscosidad) desde fluida hasta cuchareable dependiendo de la dosis', 'Evita sinéresis y mantiene consistencia'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para Yogurt.webp`,
    summary: 'Texturizante para yogurt natural, análogo o semi-análogo.',
    tags: ['yogurt', 'texturizante', 'estabilizante'],
    highlights: ['Da cuerpo (viscosidad) desde fluido y bebible hasta\ncuchareable dependiendo de la dosis', 'Consistencia en almacenamiento', 'Evita sinéresis'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para Queso Cheddar.webp`,
    summary: 'Un texturizante para queso cheddar fundido caliente, se mantiene\nfluido hasta que se vierte sobre los totopos y entonces se mantiene fijo.',
    tags: ['quesos', 'cheddar', 'nachos'],
    highlights: ['Otro texturizante para queso Cheddar para Nachos manejado en frío,\nle da cuerpo y viscosidad según dosis aplicada, evitando sinéresis'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/etenedores de Humedad para tortillas de anaquel.webp`,
    summary: 'Para tortillas de anaquel embolsadas.',
    tags: ['tortillas', 'humedad', 'anaquel'],
    highlights: ['Mantiene suavidad y frescura durante toda la vida útil del producto', 'Permite recalentar la tortilla sin perder flexibilidad', 'Extiende vida útil evitando resequedad y resquebrajamiento'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Gelificantesestabilizantes.webp`,
    summary: '',
    tags: ['gelificante', 'postres', 'flanes'],
    highlights: ['Gelificación uniforme y estable', 'Opciones para gelificación con o sin alcanzar temperaturas altas', 'Consistencia más firme o menos, según dosis aplicada'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizanteemulsificante.webp`,
    summary: '',
    tags: ['helados', 'paletas', 'congelados'],
    highlights: ['Proporciona cuerpo y previene cristalización y sinéresis en helados,\nnieves, paletas y bolis congelados', 'Ayuda a mantener aireado y palatabilidad'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizante  espesante para leches.webp`,
    summary: '',
    tags: ['leche', 'UHT', 'HTST'],
    highlights: ['Aporta cuerpo y evita precipitación de proteínas en proceso', 'Compatible con UHT/HTST'],
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
    image: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para bebidas.webp`,
    summary: 'Para bebidas con sólidos o pulpa, preparadas o instantáneas.',
    tags: ['bebidas', 'suspensión', 'instantáneas'],
    highlights: ['Mejora suspensión de sólidos', 'Mejora sensación en boca', 'Proporciona cuerpo, y viscosidad según dosis'],
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
    image: `${BASE}img/Productos/Colorantes/Dioxido-de-titanio.webp`,
    summary: 'Suspensión estable de dióxido de titanio para productos lácteos.',
    tags: ['colorante', 'blanco', 'lácteos'],
    highlights: ['Resiste pasteurización sin decoloración', 'Estable en proceso térmico', 'Fácil manejo y dosificación al ser un producto suspensión acuosa', 'Más seguro para el operador, evita riesgos respiratorios'],
    metrics: [
      { label: 'Cobertura cromática', level: 5 },
      { label: 'Estabilidad térmica', level: 5 },
      { label: 'Uniformidad', level: 5 }
    ]
  },
  {
    id: 'col-02',
    name: 'Colorante natural Annatto liposoluble e hidrosoluble para quesos, cremas, mantequillas, bebidas, etc.',
    category: 'Colorantes',
    functional: 'Colorante',
    applications: ['Quesos', 'Cremas'],
    image: `${BASE}img/Productos/Colorantes/Rojo_Annatto_liposoluble.webp`,
    summary: '',
    tags: ['colorante', 'natural', 'annatto'],
    highlights: ['Versión liposoluble del Colorante natural Annatto en aceite vegetal', 'También ofrecemos versión hidrosoluble del mismo colorante', 'Tonos de amarillo a anaranjado-rojo para lácteos, cárnicos y confitería'],
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
    image: `${BASE}img/Productos/Saborizantes/cremas/crema.webp`,
    summary: '',
    tags: ['cremas', 'sabores', 'aromas'],
    highlights: ['Aromas y sabores para cremas ácidas, dulces, pasteleras y especiales', 'Disponibles en polvo y líquido con fácil dosificación'],
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
    image: `${BASE}img/Productos/Saborizantes/mantequilla/Mantequilla.webp`,
    summary: 'Saborizantes de mantequilla para margarinas, cremas y productos horneados.\nMás de 10 perfiles de donde escoger, desde los más económicos hasta los más sofisticados.',
    tags: ['mantequilla', 'sabores', 'margarinas'],
    highlights: ['Disponibles en polvo y líquido', 'Fácil dosificación'],
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
    applications: ['Bebidas', 'Postres', 'Quesos', 'Cremas'],
    image: `${BASE}img/Productos/Saborizantes/leches/leche.webp`,
    summary: 'Sabores de leche para bebidas, postres y productos lácteos.',
    tags: ['leche', 'sabores', 'bebidas'],
    highlights: ['Varios perfiles de sabor leche, desde leche fresca, leche condensada, hasta leche bronca', 'Permiten redondear sabor final de un producto lácteo para darle una nota única que distinga de la competencia'],
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
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/helados.webp`,
    summary: 'Amplia gama de sabores estables en frío para helados, nieves y paletas industriales.',
    tags: ['helados', 'sabores', 'paletas'],
    highlights: ['Sabor para mezclaya base de helado agradable y económico', 'Gran variedad de sabores frutales, tanto tradicionales como innovadores'],
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
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.webp`,
    summary: 'Sabores para yogurts naturales y semi-análogos, frutados y especiales.',
    tags: ['yogurt', 'sabores', 'frutas'],
    highlights: ['Estables en almacenamiento y consistentes lote tras lote', 'Costo de formulación económica'],
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
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/cajeta.webp`,
    summary: 'Sabores de cajeta y leche condensada para dulces y postres.',
    tags: ['cajeta', 'dulces', 'sabores'],
    highlights: ['Sabores de auténtica cajeta de cabra y otro de cajeta económica', 'Aplicables a bajas dosis'],
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
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/natilla.webp`,
    summary: 'Perfil suave y cremoso con fácil integración al proceso.',
    tags: ['natilla', 'postres', 'sabores'],
    highlights: ['Para postres fríos o preparados tras calentamiento', 'Fácil integración', 'Aplicables a bajas dosis'],
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
    image: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/mango.webp`,
    summary: 'Sabores para bebidas lácteas ó acuosas.',
    tags: ['bebidas', 'sabores', 'frutas'],
    highlights: ['Con sólidos o pulpa', 'Estables en frío y con gran variedad de perfiles'],
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
    image: `${BASE}img/Productos/Saborizantes/quesos/polvo/quesos.webp`,
    summary: 'Saborizantes en polvo para quesos tipos gouda, manchego, cheddar,\npanela, crema, parmesano, Oaxaca, etc., y la más amplia variedad de perfiles.',
    tags: ['quesos', 'polvo', 'sabores'],
    highlights: ['Disponibles en polvo para aplicación sencilla', 'Amplia variedad de tipos de queso', 'Sabores muy concentrados para aplicación a bajas dosis, reduciendo costos de formulación', 'Vida de anaquel de 12 meses sin requerir refrigeración', 'Perfil de sabor estable, no cambia entre cada lote ni en la vida útil'],
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
    image: `${BASE}img/Productos/Saborizantes/quesos/Liquidos/quesos.webp`,
    summary: 'Saborizantes líquidos en todas las variedades de queso.\nIdeal para análogos o semi-análogos con perfiles auténticos y precisos.',
    tags: ['quesos', 'líquido', 'sabores'],
    highlights: ['Presentación líquida', 'Gran variedad de perfiles de quesos mexicanos o internacionales', 'Alta concentración para aplicación a dosis bajas, reduciendo el costo de formulación', 'Larga vida de anaquel en su envase original cerrado y\na temperaturas de almacén sin requerir refrigeración', 'Perfil de sabor consistente a lo largo de la vida de anaquel, y lote tras lote'],
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
    applications: ['Otros productos alimenticios'],
    image: `${BASE}img/Productos/Saborizantes/otros/otros.webp`,
    summary: 'Sabores especiales y únicos para productos diferenciados: humo, chamoy, jerez, miel y más.',
    tags: ['sabores', 'especiales', 'diferenciados'],
    highlights: ['Sabores únicos y diferenciados', 'Disponibles en polvo y líquido con alta concentración para\naplicación a bajas dosis economizando costo de formulación'],
    flavors: ['Humo', 'Pollo', 'Huevo', 'Chamoy', 'Cheddar', 'Jerez', 'Miel'],
    metrics: [
      { label: 'Intensidad aromática', level: 4 },
      { label: 'Diferenciación', level: 5 },
      { label: 'Versatilidad', level: 4 }
    ]
  }

];

export default products;

