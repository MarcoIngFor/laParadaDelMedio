// Catálogo de productos
export const productos = []

// Cada fila contiene: nombre, precio y nombre del archivo de imagen.
function agregarGrupo(categoria, carpeta, datos) {
  datos.forEach(([nombre, precio, archivo]) => {
    const id = productos.length + 1

    productos.push({
      id,
      codigo: 'WEB' + String(id).padStart(3, '0'),
      nombre,
      descripcion: '',
      precio,
      stock: 20,
      stockCritico: 5,
      categoria,
      imagen: `/img/Productos/${carpeta}/${archivo}.png`,
    })
  })
}

// ABARROTES
agregarGrupo('abarrotes', 'Abarrotes', [
  ['Arroz Miraflores', 1690, 'arroz'],
  ['Fideos Carozzi Nº5', 1090, 'spaghetti'],
  ['Harina Selecta', 890, 'harina'],
  ['Azúcar Iansa', 1190, 'azucar'],
  ['Aceite Natura', 1690, 'aceite'],
  ['Lentejas', 990, 'lentejas'],
  ['Atún', 1390, 'atun'],
  ['Salsa de Tomate', 890, 'salsa-tomate'],
  ['Café', 3490, 'cafe'],
  ['Té', 1290, 'te'],
  ['Sal', 590, 'sal'],
  ['Cereal', 1890, 'cereal'],
])

// BEBIDAS
agregarGrupo('bebidas', 'Bebidas', [
  ['Bilz y Pap', 1490, 'bilzpap'],
  ['Coca-Cola 3 Litros', 2690, 'cocacola'],
  ['Coca-Cola Zero 3 Litros', 2690, 'cocazero'],
  ['Fanta Naranja 3 Litros', 2490, 'fanta'],
  ['Andina Ginger Ale', 1490, 'gingerale'],
  ['Monster Energy', 1990, 'monster'],
  ['Néctar Watts Durazno', 1890, 'nectar'],
  ['Nestea Limón', 1890, 'nestea'],
  ['Red Bull 250 ml', 1690, 'redbull'],
  ['Sprite 3 Litros', 2490, 'sprite'],
  ['Agua Vital 1,6 Litros', 1190, 'vital'],
  ['Jugo Watts 200 ml', 490, 'jugo_watts'],
])

// SNACKS
agregarGrupo('snacks', 'snacks', [
  ['Cheetos Torciditos', 1290, 'cheetos'],
  ['Chococosta Costa', 990, 'chococosta'],
  ['Doritos Queso', 1690, 'doritos'],
  ['Maní Jumbo Salado', 890, 'jumbo_mani'],
  ['Kit Kat', 690, 'kitkat'],
  ["Papas Lay's Clásicas", 1490, 'lays'],
  ["M&M's Maní", 1690, 'mms'],
  ['Galletas Prince', 890, 'prince'],
  ['Pringles Original', 1890, 'pringles'],
  ['Galletas Ritz', 990, 'ritz'],
  ['Snickers', 790, 'snickers'],
  ['Trululu Ositos', 690, 'trululu'],
])

// LÁCTEOS
agregarGrupo('lacteos', 'Lacteos', [
  ['Leche Soprole Entera 1 Litro', 1190, 'leche_soprole'],
  ['Yoghurt Soprole Frutilla 165 g', 690, 'yoghurt_soprole'],
  ['Mantequilla Soprole 250 g', 3290, 'mantequilla_soprole'],
  ['Queso Gauda Colun 250 g', 2190, 'queso_gauda'],
  ['Loncoleche Protein Chocolate 1 Litro', 2630, 'loncoleche_protein'],
  ['Yoghurt Griego Nestlé 140 g', 1000, 'yoghurt_griego'],
  ['Crema de Leche Colun 200 ml', 1690, 'crema_leche'],
  ['Leche Condensada Nestlé 397 g', 1690, 'leche_condensada'],
  ['Queso Mozzarella Colun 200 g', 2190, 'queso_mozzarella'],
  ['Queso Fresco Colun 250 g', 1390, 'queso_fresco'],
  ['Leche Cultivada Soprole 1 Litro', 1490, 'leche_cultivada'],
  ['Queso Crema Colun 150 g', 1190, 'queso_crema'],
])

// BEBÉ
agregarGrupo('bebe', 'bebe', [
  ['Pañales Babysec Ultra Talla G 20 unidades', 6290, 'panales_babysec_ultra'],
  ['Fórmula NAN 3 Optipro 800 g', 14990, 'nan_3_optipro'],
  ["Champú Johnson's Dulces Sueños 200 ml", 2690, 'shampoo_johnsons'],
  ["Loción Johnson's Hidratación Intensa 200 ml", 2590, 'locion_johnsons'],
  ['Toallitas Húmedas Huggies All Over Clean 80 unidades', 1890, 'toallitas_huggies'],
  ['Fórmula NAN 4 Optipro 800 g', 14990, 'nan_4_optipro'],
  ['Papilla Gerber Natural Manzana Plátano 113 g', 990, 'papilla_gerber'],
  ['Pañales Huggies Supreme Care Talla M 22 unidades', 6490, 'panales_huggies'],
  ['Cereal Cerelac Trigo Miel Leche 200 g', 2290, 'cereal_cerelac'],
  ['Pañales Babysec Premium Talla XG 16 unidades', 6790, 'panales_babysec_premium'],
  ['Pañales Cotidian Plus Talla G 20 unidades', 6490, 'panales_cotidian'],
  ['Chupete Avent Clásico 6-18 meses', 2790, 'chupete_avent'],
])

// LIMPIEZA
agregarGrupo('limpieza', 'limpieza', [
  ['Detergente Drive Limón 800 g', 1490, 'detergente_drive'],
  ['Detergente Rinso Floral 800 g', 1690, 'detergente_rinso'],
  ['Suavizante Arom Lavanda 900 ml', 1690, 'suavizante_arom'],
  ['Lavalozas Quix Limón 750 ml', 1290, 'lavalozas_quix_limon'],
  ['Lavalozas Quix Glicerina 750 ml', 1290, 'lavalozas_quix_glicerina'],
  ['Lavalozas Quix Antigrasa 750 ml', 1290, 'lavalozas_quix_antigrasa'],
  ['Cloro Clorinda Tradicional 900 ml', 1190, 'cloro_clorinda_tradicional'],
  ['Cloro Clorinda Lavanda 900 ml', 1190, 'cloro_clorinda_lavanda'],
  ['Clorox Baño 750 ml', 1690, 'clorox_bano'],
  ['Limpiapisos Fuzol Aroma Mar 900 ml', 1490, 'limpiapisos_fuzol_mar'],
  ['Limpiapisos Fuzol Lavanda 900 ml', 1490, 'limpiapisos_fuzol_lavanda'],
  ['Cif Baño Ultrarrápido 450 ml', 2190, 'cif_bano'],
  ['Cif Crema Original 750 ml', 2390, 'cif_crema'],
  ['Limpiavidrios Excell 500 ml', 1290, 'limpiavidrios_excell'],
  ['Esponjas Virginia Multiuso 5 unidades', 890, 'esponjas_virginia'],
  ['Nova Clásica 2 rollos', 1490, 'nova_clasica'],
  ['Papel Higiénico Confort 4 rollos', 1690, 'papel_higienico_confort'],
  ['Bolsas de Basura Virutex 10 unidades', 990, 'bolsas_basura_virutex'],
])