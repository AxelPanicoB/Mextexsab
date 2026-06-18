// Información editorial por aplicación/línea, rescatada de la antigua página
// de Aplicaciones. Se muestra en el catálogo cuando el filtro coincide.
const APP_INSIGHTS = {
  'Quesos': {
    icon: 'fa-cheese',
    headline: 'Textura, rendimiento y estabilidad',
    objective: 'Maximizar el rendimiento y garantizar la textura, estabilidad y vida de anaquel del producto final.',
    description: 'Sistemas funcionales que reducen el desuerado, mejoran la estructura y aumentan el rendimiento en quesos frescos (panela, ranchero, morral), análogos y pizzeros.',
    benefits: [
      { icon: 'fa-solid fa-droplet-slash', title: 'Menor desuerado', desc: 'Reduce la sinéresis y pérdida de suero durante el proceso y almacenamiento.' },
      { icon: 'fa-solid fa-star', title: 'Mejor textura', desc: 'Estructura firme y homogénea, mejor corte y presentación final del producto.' },
      { icon: 'fa-solid fa-calendar-check', title: 'Mayor vida útil', desc: 'Estabilidad microbiológica y fisicoquímica extendida en anaquel.' },
    ],
  },
  'Cremas': {
    icon: 'fa-jar',
    headline: 'Cuerpo, cremosidad y brillo',
    objective: 'Aportar cuerpo, cremosidad y estabilidad en cremas ácidas, aderezos y productos untables de alto contenido de agua.',
    description: 'Estabilizantes, espesantes y saborizantes para cremas ácidas, natillas, aderezos y untables con textura uniforme y perfil de sabor auténtico.',
    benefits: [
      { icon: 'fa-solid fa-droplet', title: 'Cremosidad', desc: 'Cuerpo y brillo uniformes sin sabor graso residual.' },
      { icon: 'fa-solid fa-layer-group', title: 'Estabilidad', desc: 'Textura consistente durante toda la vida de anaquel.' },
      { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Sabor auténtico', desc: 'Perfiles lácteos fieles disponibles en polvo y líquido.' },
    ],
  },
  'Yogurt': {
    icon: 'fa-bottle-droplet',
    headline: 'Consistencia y estabilidad en yogures',
    objective: 'Evitar la sinéresis, aportar cuerpo y garantizar estabilidad durante toda la vida de anaquel del producto.',
    description: 'Sistemas funcionales que previenen la sinéresis, aportan viscosidad y estabilizan sólidos en yogures batidos, bebibles, concentrados y fórmulas UHT.',
    benefits: [
      { icon: 'fa-solid fa-layer-group', title: 'Sin sinéresis', desc: 'Eliminación de la separación de suero durante el almacenamiento.' },
      { icon: 'fa-solid fa-glass-water', title: 'Cuerpo y viscosidad', desc: 'Textura fluida y consistente, ideal para bebibles y batidos.' },
      { icon: 'fa-solid fa-fire-flame-curved', title: 'Estabilidad térmica', desc: 'Resistencia a tratamientos UHT y HTST sin precipitación de proteínas.' },
    ],
  },
  'Bebidas': {
    icon: 'fa-mug-hot',
    headline: 'Bebidas lácteas estables y con cuerpo',
    objective: 'Desarrollar viscosidad inmediata y estabilizar sólidos en suspensión sin afectar el perfil de sabor.',
    description: 'Saborizantes y sistemas funcionales para bebidas lácteas, leches saborizadas, sueros y concentrados con estabilidad en anaquel y buena dispersión.',
    benefits: [
      { icon: 'fa-solid fa-glass-water', title: 'Viscosidad inmediata', desc: 'Cuerpo y suspensión de sólidos sin grumos ni precipitación.' },
      { icon: 'fa-solid fa-fire-flame-curved', title: 'Resistencia UHT', desc: 'Previene precipitación de proteínas bajo tratamiento térmico severo.' },
      { icon: 'fa-solid fa-droplet', title: 'Perfil limpio', desc: 'Estabilidad sin alterar el sabor del producto final.' },
    ],
  },
  'Helados': {
    icon: 'fa-ice-cream',
    headline: 'Textura perfecta y resistencia al derretimiento',
    objective: 'Controlar la cristalización, mejorar el overrun y garantizar estabilidad en toda la cadena de frío.',
    description: 'Formulaciones que optimizan la textura, retención de aire y resistencia a cambios de temperatura en helados, cremas montadas y postres congelados.',
    benefits: [
      { icon: 'fa-solid fa-snowflake', title: 'Control de cristales', desc: 'Cristales de hielo más pequeños para textura suave y homogénea.' },
      { icon: 'fa-solid fa-wind', title: 'Mayor overrun', desc: 'Incorporación óptima de aire para mejor rendimiento y textura cremosa.' },
      { icon: 'fa-solid fa-temperature-low', title: 'Estabilidad en frío', desc: 'Resistencia al choque térmico y ciclos de congelación-descongelación.' },
    ],
  },
  'Postres': {
    icon: 'fa-cake-candles',
    headline: 'Postres lácteos con textura y sabor',
    objective: 'Lograr texturas cremosas y estables en flanes, natillas, cajetas y postres lácteos artesanales e industriales.',
    description: 'Saborizantes y espesantes para postres lácteos con cuerpo uniforme, perfiles de sabor intensos y estabilidad en refrigeración.',
    benefits: [
      { icon: 'fa-solid fa-star', title: 'Textura cremosa', desc: 'Cuerpo uniforme y estable en frío y a temperatura ambiente.' },
      { icon: 'fa-solid fa-droplet', title: 'Sabores intensos', desc: 'Perfiles auténticos de vainilla, cajeta, frutas y más.' },
      { icon: 'fa-solid fa-calendar-check', title: 'Vida de anaquel', desc: 'Estabilidad fisicoquímica durante el almacenamiento.' },
    ],
  },
  'Tortillas': {
    icon: 'fa-bread-slice',
    headline: 'Suavidad y vida de anaquel en tortillas',
    objective: 'Mejorar la flexibilidad, suavidad y conservación de tortillas y derivados de la masa.',
    description: 'Auxiliares de proceso y conservadores que extienden la vida útil y mantienen la textura suave y flexible de la tortilla.',
    benefits: [
      { icon: 'fa-solid fa-hand-holding-heart', title: 'Suavidad', desc: 'Textura flexible que no se quiebra al doblar.' },
      { icon: 'fa-solid fa-shield-halved', title: 'Conservación', desc: 'Control de moho y mayor vida de anaquel.' },
      { icon: 'fa-solid fa-gears', title: 'Proceso estable', desc: 'Comportamiento consistente en línea de producción.' },
    ],
  },
  'Colorantes': {
    icon: 'fa-palette',
    headline: 'Color natural, uniforme y estable en proceso',
    objective: 'Lograr tonalidades uniformes y estables que resistan el proceso térmico y mantengan su intensidad durante la vida de anaquel.',
    description: 'Colorantes naturales de achiote (bixina/norbixina) y suspensiones estabilizadas de alta resistencia a pasteurización, tratamiento térmico y variaciones de pH.',
    benefits: [
      { icon: 'fa-solid fa-circle-half-stroke', title: 'Tono uniforme', desc: 'Distribución homogénea del color en toda la masa del producto.' },
      { icon: 'fa-solid fa-fire', title: 'Resistencia térmica', desc: 'Color estable bajo pasteurización, HTST y otros tratamientos térmicos.' },
      { icon: 'fa-solid fa-leaf', title: 'Origen natural', desc: 'Basados en achiote (bixina / norbixina) para uso alimentario seguro.' },
    ],
  },
  'Auxiliares de proceso': {
    icon: 'fa-gear',
    headline: 'Optimización funcional del proceso productivo',
    objective: 'Mejorar la eficiencia del proceso, estabilizar el pH y extender la vida de anaquel del producto terminado.',
    description: 'Aditivos funcionales para controlar la emulsificación, regular el pH y mejorar la conservación en todo tipo de productos lácteos.',
    benefits: [
      { icon: 'fa-solid fa-arrows-spin', title: 'Mejor emulsificación', desc: 'Distribución uniforme de grasas y estabilidad de emulsión en el producto.' },
      { icon: 'fa-solid fa-flask', title: 'Control de pH', desc: 'Regulación del pH para mayor estabilidad y seguridad microbiológica.' },
      { icon: 'fa-solid fa-shield-halved', title: 'Mayor vida útil', desc: 'Conservación natural que extiende la vida de anaquel sin alterar el sabor.' },
    ],
  },
  'Texturizantes y Estabilizantes': {
    icon: 'fa-layer-group',
    headline: 'Estructura y estabilidad para cada matriz',
    objective: 'Dar cuerpo, controlar la sinéresis y estabilizar emulsiones en productos lácteos y alimentarios.',
    description: 'Gomas, carrageninas y sistemas estabilizantes que construyen la textura ideal para quesos, yogures, helados, bebidas y postres.',
    benefits: [
      { icon: 'fa-solid fa-layer-group', title: 'Cuerpo y estructura', desc: 'Texturas firmes o cremosas según la necesidad de tu producto.' },
      { icon: 'fa-solid fa-droplet-slash', title: 'Control de agua', desc: 'Menos sinéresis y desuerado en proceso y anaquel.' },
      { icon: 'fa-solid fa-gears', title: 'Fácil proceso', desc: 'Hidratación y dispersión confiables en línea de producción.' },
    ],
  },
  'Saborizantes': {
    icon: 'fa-droplet',
    headline: 'Perfiles de sabor auténticos e intensos',
    objective: 'Aportar sabores lácteos fieles, estables y consistentes lote a lote.',
    description: 'Saborizantes líquidos y en polvo para quesos, cremas, bebidas y postres con perfiles intensos desarrollados en nuestro laboratorio.',
    benefits: [
      { icon: 'fa-solid fa-droplet', title: 'Perfiles fieles', desc: 'Sabores auténticos de queso, crema, vainilla, frutas y especialidades.' },
      { icon: 'fa-solid fa-fire-flame-curved', title: 'Estables en proceso', desc: 'Resisten pasteurización y tratamiento térmico sin degradarse.' },
      { icon: 'fa-solid fa-scale-balanced', title: 'Fácil dosificación', desc: 'Consistencia lote a lote con dosificación sencilla.' },
    ],
  },
  'Saborizantes en polvo': {
    icon: 'fa-cubes-stacked',
    headline: 'Sabor en polvo: fácil manejo y dosificación',
    objective: 'Ofrecer perfiles de sabor intensos en presentación seca, de fácil almacenamiento, manejo y dosificación.',
    description: 'Saborizantes en polvo para quesos análogos (gouda, manchego, cheddar), cremas, bebidas y aplicaciones especiales.',
    benefits: [
      { icon: 'fa-solid fa-cubes-stacked', title: 'Fácil manejo', desc: 'Presentación seca de fácil almacenamiento y dosificación precisa.' },
      { icon: 'fa-solid fa-droplet', title: 'Perfiles intensos', desc: 'Gran variedad de tipos de queso y sabores especiales.' },
      { icon: 'fa-solid fa-calendar-check', title: 'Larga vida útil', desc: 'Mayor estabilidad de almacén que las presentaciones líquidas.' },
    ],
  },
};

export default APP_INSIGHTS;
