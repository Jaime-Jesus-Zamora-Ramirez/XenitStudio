// Game portfolio data for XENIT STUDIO

export interface GameProject {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  status: string;
  image: string;
  platforms: string[];
  year: string;
  engine: string;
  tagline: string;
  synopsis: string;
  features: string[];
  techSpecs: {
    label: string;
    value: string;
  }[];
  wishlistCount: string;
}

export const GAMES_DATA: GameProject[] = [
  {
    id: 'aetheria-fractured-sky',
    title: 'AETHERIA',
    subtitle: 'FRACTURED SKY',
    genre: 'Sci-Fi Action RPG',
    status: 'BETA CERRADA Q4 2026',
    image: '/src/assets/images/xenit_game_scifi_rpg_1790184636677.jpg',
    platforms: ['Steam', 'PlayStation 5', 'Xbox Series X'],
    year: '2026',
    engine: 'Unreal Engine 5.5',
    tagline: 'Desafía las leyes de la gravedad en un mundo fragmentado al borde del colapso.',
    synopsis:
      'Ambientado en el exo-planeta Aetheria tras la rotura de sus anillos tectónicos, tomas el mando de una de las últimas unidades Vanguard. Experimenta combate vertical tridimensional, exploración sin costuras entre tierra y estratosfera, y una historia forjada por decisiones con consecuencias irreversibles.',
    features: [
      'Combate Cinematográfico con fluidez reactiva a 60 FPS estables',
      'Mundo abierto sin pantallas de carga con tecnología Nanite & Virtual Shadow Maps',
      'Clima dinámico hiperrealista con tormentas gravitacionales procedurales',
      'Banda sonora orquestal electro-acústica con audio espacial 3D',
    ],
    techSpecs: [
      { label: 'Motor', value: 'Unreal Engine 5.5' },
      { label: 'Resolución', value: 'Hasta 4K UHD con DLSS 3.7 & FSR 3' },
      { label: 'Audio', value: 'Dolby Atmos & Spatial Binaural' },
      { label: 'Soporte', value: 'DualSense Haptics & Ultra-wide 21:9 / 32:9' },
    ],
    wishlistCount: '48,200+',
  },
  {
    id: 'void-pulse',
    title: 'VOID PULSE',
    subtitle: 'NEON PROTOCOL',
    genre: 'Cyberpunk Fast-Paced Roguelike',
    status: 'EARLY ACCESS Q2 2026',
    image: '/src/assets/images/xenit_game_cyberpunk_1790184646446.jpg',
    platforms: ['Steam', 'Steam Deck', 'Consolas'],
    year: '2026',
    engine: 'Custom High-Speed C++',
    tagline: 'Sincroniza tus latidos al ritmo de la katana en la megaciudad sumergida.',
    synopsis:
      'En las entrañas de una metrópolis controlada por redes neuronales sintéticas, cada paso es una decisión mortal. Un roguelike de acción vertiginosa con combate rítmico, más de 200 modificaciones cibernéticas y bandas sonoras reactivas por los mejores productores de synthwave y dark techno.',
    features: [
      'Respuesta de control ultra-baja latencia optimizada para 120+ FPS',
      'Generación modular de niveles que recompensa la maestría del dash y parry',
      'Árbol de aumentos neuro-cibernéticos con sinergias radicales en cada partida',
      'Totalmente verificado para Steam Deck y juego portátil nativo',
    ],
    techSpecs: [
      { label: 'Motor', value: 'Proprietary Low-Latency Engine' },
      { label: 'Tasa de refresco', value: 'Soporte nativo hasta 240Hz' },
      { label: 'Compatibilidad', value: 'Steam Deck Verified al 100%' },
      { label: 'Controles', value: 'Mapeo completo de teclado y mandos de torneo' },
    ],
    wishlistCount: '82,400+',
  },
  {
    id: 'project-zenith',
    title: 'PROJECT ZENITH',
    subtitle: 'THE APEX MONOLITH',
    genre: 'Cosmic Mystery & Spatial Adventure',
    status: 'PROYECTO INSIGNIA · EN DESARROLLO',
    image: '/src/assets/images/xenit_game_zenith_1790184656423.jpg',
    platforms: ['Next-Gen PC', 'PlayStation 5 Pro', 'Xbox Series X'],
    year: '2027',
    engine: 'Unreal Engine 5.5 + Ray Tracing',
    tagline: 'El rayo que conecta el origen con el infinito.',
    synopsis:
      'La obra que encarna la identidad y filosofía de XENIT STUDIO. Una experiencia contemplativa, monumental y sobrecogedora sobre monolitos ancestrales capaces de curvar el espacio-tiempo mediante haces de luz coherente. Un viaje donde la soledad cósmica y los misterios matemáticos revelan el destino de civilizaciones extintas.',
    features: [
      'Iluminación fotorealista Lumen completa con trazado de rayos por hardware',
      'Puzzles espaciales y ópticos basados en refracción de rayos luminosos',
      'Diseño sonoro orgánico grabado en localizaciones extremas y cámaras anecoicas',
      'Experiencia inmersiva sin interfaz intrusiva (Minimal Diegetic UI)',
    ],
    techSpecs: [
      { label: 'Motor', value: 'Unreal Engine 5.5 Custom Build' },
      { label: 'Física', value: 'Chaos Physics & Óptica Cuántica Simulada' },
      { label: 'HDR', value: 'Calibración para monitores OLED y DCI-P3' },
      { label: 'Dirección', value: 'Equipo Principal de XENIT' },
    ],
    wishlistCount: '29,100+',
  },
];
