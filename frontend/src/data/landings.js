// Páginas por tema (landing pages) para posicionamiento en Google.
// Cada una responde a una búsqueda concreta ("saborizantes para quesos", "estabilizantes para yogurt"...)
// con su propia URL, título, descripción y texto. Los productos salen del catálogo (data/products.js),
// así que si cambia una ficha, la página se actualiza sola.
//
// Para agregar una página nueva: añade un objeto aquí. La ruta, el SEO (RouteSeo) y el sitemap
// se arman a partir de esta lista (el sitemap.xml de /public se actualiza a mano).
//
//  slug        → URL: /{slug}
//  title       → <title> (≈60 caracteres)
//  description → meta description (≈155 caracteres)
//  h1          → [texto normal, texto en verde]
//  ids | app | category → qué productos muestra (ids respeta el orden dado)
//  flavorFrom  → ids de productos cuyos sabores se listan como chips (opcional)

const LANDINGS = [
  {
    slug: 'saborizantes-para-quesos',
    title: 'Saborizantes para Quesos en Polvo y Líquidos – Metexsab',
    description:
      'Saborizantes para quesos análogos, semi-análogos y naturales: gouda, manchego, cheddar, oaxaca, panela y más, en polvo y líquido. Solicita muestras gratis.',
    eyebrow: 'Saborizantes',
    h1: ['Saborizantes para', 'quesos'],
    lead: 'Perfiles de sabor en polvo y líquidos para quesos análogos, semi-análogos y naturales.',
    introTitle: 'Saborizantes de queso para tu formulación',
    intro: [
      'Metexsab ofrece saborizantes para quesos en presentación polvo y líquida, desarrollados para quesos análogos, semi-análogos y naturales. Cubrimos quesos mexicanos como Oaxaca, panela, cotija o asadero, y variedades internacionales como gouda, manchego, parmesano, cheddar o mozzarella.',
      'Son concentrados que se aplican a dosis bajas, lo que ayuda a reducir el costo de formulación. Su perfil de sabor se mantiene estable durante la vida de anaquel y de un lote a otro, y no requieren refrigeración en su envase cerrado.',
    ],
    benefits: [
      'Polvo o líquido: eliges la presentación que mejor se integra a tu proceso',
      'Alta concentración para aplicar a dosis bajas',
      'Perfil de sabor estable lote tras lote y durante la vida de anaquel',
      'Almacenamiento sin refrigeración en envase cerrado',
    ],
    flavorsTitle: 'Perfiles de queso disponibles',
    flavorFrom: ['sab-10', 'sab-09'],
    productsTitle: 'Saborizantes para quesos',
    ids: ['sab-10', 'sab-09', 'sab-03'],
    catalog: '/productos?tab=quesos',
    related: ['texturizantes-para-quesos', 'colorantes-para-lacteos', 'aditivos-para-cremas'],
  },
  {
    slug: 'texturizantes-para-quesos',
    title: 'Texturizantes y Estabilizantes para Quesos – Metexsab',
    description:
      'Texturizantes para quesos frescos, pizzeros análogos y cheddar para nachos. Reducen el desuerado y mejoran el rendimiento y la consistencia. Muestras gratuitas.',
    eyebrow: 'Textura y consistencia',
    h1: ['Texturizantes y estabilizantes para', 'quesos'],
    lead: 'Sistemas funcionales que reducen el desuerado y mejoran el rendimiento en quesos frescos, análogos y pizzeros.',
    introTitle: 'Textura y rendimiento en tus quesos',
    intro: [
      'Nuestros sistemas texturizantes para quesos atienden tres necesidades frecuentes: retener humedad en quesos frescos tipo panela, ranchero, morral o canasto; dar firmeza y resistencia al calor a quesos pizzeros análogos; y controlar la viscosidad del queso tipo cheddar para nachos.',
      'Además de los texturizantes, ofrecemos un emulsificante concentrado para lácteos y un agente amortiguador de acidez que complementan la formulación.',
    ],
    benefits: [
      'Reducen el desuerado en quesos frescos sin impartir sabor',
      'Mejoran el rendimiento y la vida de anaquel',
      'Gel termorresistente para queso pizzero análogo',
      'Queso cheddar para nachos: opciones para manejo en caliente o en frío',
    ],
    productsTitle: 'Texturizantes y auxiliares para quesos',
    ids: ['tex-01', 'tex-02', 'tex-05', 'aux-02', 'aux-01'],
    catalog: '/productos?tab=quesos',
    related: ['saborizantes-para-quesos', 'colorantes-para-lacteos', 'aditivos-para-cremas'],
  },
  {
    slug: 'aditivos-para-cremas',
    title: 'Aditivos para Cremas: Estabilizantes y Saborizantes – Metexsab',
    description:
      'Estabilizantes, sabores de crema ácida, dulce y mantequilla, colorantes y auxiliares para cremas naturales, análogas y semi-análogas. Solicita muestras gratis.',
    eyebrow: 'Cremas',
    h1: ['Aditivos para', 'cremas'],
    lead: 'Estabilizantes, perfiles de sabor y colorantes para cremas naturales, análogas y semi-análogas.',
    introTitle: 'Cuerpo, sabor y color para tus cremas',
    intro: [
      'Para cremas naturales, análogas o semi-análogas, con o sin homogeneizado, contamos con un sistema estabilizante que da cuerpo —desde una crema fluida hasta una cuchareable, según la dosis— y evita la sinéresis.',
      'En sabor ofrecemos perfiles de crema ácida, dulce y para café, además de sabores de mantequilla y de leche. También hay colorantes y auxiliares de proceso para completar la formulación.',
    ],
    benefits: [
      'Cuerpo ajustable por dosis: de fluida a cuchareable',
      'Evita sinéresis y mantiene la consistencia',
      'Sabores en polvo y líquido de fácil dosificación',
      'Colorantes y auxiliares de la misma línea',
    ],
    flavorsTitle: 'Perfiles de crema disponibles',
    flavorFrom: ['sab-01', 'sab-02'],
    productsTitle: 'Soluciones para cremas',
    app: 'Cremas',
    catalog: '/productos?tab=cremas',
    related: ['saborizantes-para-quesos', 'aditivos-para-yogurt', 'colorantes-para-lacteos'],
  },
  {
    slug: 'aditivos-para-yogurt',
    title: 'Estabilizantes y Saborizantes para Yogurt – Metexsab',
    description:
      'Estabilizantes para yogurt batido y bebible y perfiles de sabor natural y frutado. Dan cuerpo, evitan la sinéresis y mantienen la consistencia. Muestras gratuitas.',
    eyebrow: 'Yogurt',
    h1: ['Estabilizantes y saborizantes para', 'yogurt'],
    lead: 'Cuerpo, consistencia y sabor para yogurt natural, análogo, semi-análogo y frutado.',
    introTitle: 'Consistencia y sabor en tu yogurt',
    intro: [
      'Nuestro sistema de estabilización para yogurt batido y bebible da cuerpo —desde un yogurt fluido y bebible hasta uno cuchareable, según la dosis—, mantiene la consistencia durante el almacenamiento y evita la sinéresis.',
      'Para el sabor, los perfiles para yogurt natural y frutado son estables en almacenamiento y consistentes lote tras lote, con un costo de formulación económico.',
    ],
    benefits: [
      'Viscosidad ajustable: de bebible a cuchareable',
      'Evita la sinéresis',
      'Sabores estables durante el almacenamiento',
      'Consistencia lote tras lote',
    ],
    flavorsTitle: 'Sabores disponibles para yogurt',
    flavorFrom: ['sab-05'],
    productsTitle: 'Soluciones para yogurt',
    app: 'Yogurt',
    catalog: '/productos?tab=yogurt',
    related: ['aditivos-para-bebidas-lacteas', 'aditivos-para-helados', 'aditivos-para-cremas'],
  },
  {
    slug: 'aditivos-para-helados',
    title: 'Estabilizantes y Saborizantes para Helados y Nieves – Metexsab',
    description:
      'Estabilizante y aireante para helados, nieves, paletas y bolis, y sabores frutales y tradicionales estables en frío. Previenen la cristalización. Muestras gratis.',
    eyebrow: 'Helados',
    h1: ['Estabilizantes y saborizantes para', 'helados'],
    lead: 'Cuerpo, cremosidad y sabor para helados, nieves, paletas y bolis congelados.',
    introTitle: 'Cremosidad y sabor en tus helados y nieves',
    intro: [
      'El sistema estabilizante y aireante proporciona cuerpo y previene la cristalización y la sinéresis en helados, nieves, paletas y bolis congelados, además de ayudar a mantener el producto aireado y agradable al paladar.',
      'Los perfiles aromáticos para helados son estables en frío e incluyen sabores tradicionales y frutales, además de un sabor para mezcla base de helado agradable y económico.',
    ],
    benefits: [
      'Previene la cristalización y la sinéresis',
      'Ayuda a mantener el producto aireado',
      'Sabores estables en frío',
      'Gran variedad de sabores frutales, tradicionales e innovadores',
    ],
    flavorsTitle: 'Sabores disponibles para helados',
    flavorFrom: ['sab-04'],
    productsTitle: 'Soluciones para helados',
    app: 'Helados',
    catalog: '/productos?tab=helados',
    related: ['aditivos-para-postres-lacteos', 'aditivos-para-yogurt', 'aditivos-para-bebidas-lacteas'],
  },
  {
    slug: 'aditivos-para-bebidas-lacteas',
    title: 'Estabilizantes y Saborizantes para Bebidas Lácteas – Metexsab',
    description:
      'Estabilizantes para leches formuladas UHT/HTST y bebidas con pulpa, saborizantes lácteos y frutales, emulsificantes y colorantes. Solicita muestras gratuitas.',
    eyebrow: 'Bebidas',
    h1: ['Aditivos para', 'bebidas lácteas'],
    lead: 'Estabilidad, suspensión y sabor para leches formuladas, bebidas con pulpa y bebidas instantáneas.',
    introTitle: 'Estabilidad y sabor en tus bebidas',
    intro: [
      'Para leches formuladas con proceso UHT o HTST contamos con un sistema estabilizante que aporta cuerpo y evita la precipitación de proteínas durante el proceso. Para bebidas con sólidos o pulpa, preparadas o instantáneas, un texturizante mejora la suspensión de sólidos y la sensación en boca.',
      'Completan la línea los saborizantes para bebidas lácteas y acuosas, los perfiles de sabor lácteo (leche fresca, condensada o bronca), un emulsificante concentrado y un colorante blanco estable.',
    ],
    benefits: [
      'Compatible con procesos UHT y HTST',
      'Evita la precipitación de proteínas en proceso',
      'Mejora la suspensión de sólidos y la sensación en boca',
      'Sabores estables en frío y gran variedad de perfiles',
    ],
    flavorsTitle: 'Sabores disponibles para bebidas',
    flavorFrom: ['sab-08'],
    productsTitle: 'Soluciones para bebidas',
    app: 'Bebidas',
    catalog: '/productos?tab=bebidas',
    related: ['aditivos-para-yogurt', 'aditivos-para-helados', 'colorantes-para-lacteos'],
  },
  {
    slug: 'aditivos-para-postres-lacteos',
    title: 'Gelificantes y Saborizantes para Postres Lácteos – Metexsab',
    description:
      'Gelificantes para flanes, mousses, natillas y budines, y sabores de cajeta, dulce de leche, chocolate y vainilla. Gelificación uniforme y estable. Muestras gratis.',
    eyebrow: 'Postres',
    h1: ['Gelificantes y saborizantes para', 'postres lácteos'],
    lead: 'Gelificación uniforme y sabores auténticos para flanes, mousses, natillas, budines y dulces de leche.',
    introTitle: 'Textura y sabor en tus postres',
    intro: [
      'El sistema gelificante para postres lácteos ofrece una gelificación uniforme y estable, con opciones que gelifican con o sin alcanzar temperaturas altas, y una consistencia más firme o más suave según la dosis aplicada.',
      'En sabores hay perfiles de cajeta de cabra y leche condensada, y perfiles suaves y cremosos para natillas y postres de cuchareo, que se aplican a dosis bajas y se integran fácilmente al proceso.',
    ],
    benefits: [
      'Gel uniforme y estable',
      'Firmeza ajustable según la dosis',
      'Opciones con o sin temperaturas altas de proceso',
      'Sabores que se aplican a dosis bajas',
    ],
    flavorsTitle: 'Sabores disponibles para postres',
    flavorFrom: ['sab-06', 'sab-07'],
    productsTitle: 'Soluciones para postres',
    app: 'Postres',
    catalog: '/productos?tab=postres',
    related: ['aditivos-para-helados', 'aditivos-para-yogurt', 'aditivos-para-cremas'],
  },
  {
    slug: 'aditivos-para-tortillas',
    title: 'Retenedor de Humedad para Tortillas de Anaquel – Metexsab',
    description:
      'Sistema de retención de humedad para tortillas de anaquel embolsadas: mantiene suavidad y frescura, permite recalentar y evita la resequedad. Muestras gratis.',
    eyebrow: 'Tortillas',
    h1: ['Retenedor de humedad para', 'tortillas'],
    lead: 'Suavidad y frescura durante toda la vida útil de tus tortillas de anaquel.',
    introTitle: 'Tortillas suaves durante toda su vida útil',
    intro: [
      'Nuestro sistema de retención de humedad está pensado para tortillas de anaquel embolsadas: mantiene la suavidad y la frescura durante toda la vida útil del producto y extiende esa vida útil al evitar la resequedad y el resquebrajamiento.',
      'También permite recalentar la tortilla sin que pierda flexibilidad.',
    ],
    benefits: [
      'Mantiene suavidad y frescura',
      'Permite recalentar sin perder flexibilidad',
      'Evita resequedad y resquebrajamiento',
      'Extiende la vida útil del producto',
    ],
    productsTitle: 'Soluciones para tortillas',
    app: 'Tortillas',
    catalog: '/productos?tab=tortillas',
    related: ['texturizantes-para-quesos', 'aditivos-para-postres-lacteos', 'aditivos-para-cremas'],
  },
  {
    slug: 'colorantes-para-lacteos',
    title: 'Colorantes para Quesos y Lácteos: Annatto y Blanco – Metexsab',
    description:
      'Colorante natural Annatto liposoluble e hidrosoluble y colorante blanco en suspensión para quesos, cremas, mantequillas y bebidas. Solicita muestras gratuitas.',
    eyebrow: 'Colorantes',
    h1: ['Colorantes para', 'quesos y lácteos'],
    lead: 'Colorante natural Annatto y colorante blanco estable para quesos, cremas, mantequillas y bebidas.',
    introTitle: 'Color estable para tus productos lácteos',
    intro: [
      'El colorante natural Annatto está disponible en versión liposoluble (en aceite vegetal) e hidrosoluble, con tonos de amarillo a anaranjado-rojo para lácteos, cárnicos y confitería.',
      'Para lograr un blanco uniforme, ofrecemos un colorante blanco en suspensión acuosa que resiste la pasteurización sin decoloración, es estable en proceso térmico y se dosifica con facilidad. Además, es más seguro para el operador, ya que evita riesgos respiratorios.',
    ],
    benefits: [
      'Annatto natural en versión liposoluble e hidrosoluble',
      'Tonos de amarillo a anaranjado-rojo',
      'Blanco estable que resiste la pasteurización',
      'Fácil dosificación en suspensión acuosa',
    ],
    productsTitle: 'Colorantes para lácteos',
    category: 'Colorantes',
    catalog: '/productos?tab=colorantes',
    related: ['saborizantes-para-quesos', 'aditivos-para-cremas', 'aditivos-para-bebidas-lacteas'],
  },
];

export default LANDINGS;
