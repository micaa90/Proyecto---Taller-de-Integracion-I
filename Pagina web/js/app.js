/* Sistema de Gestión — Minimercado Jorge
   Prototipo funcional. Los datos viven en memoria: al recargar vuelve al estado inicial. */

/* ============================================================
   1. DATOS
   ============================================================ */
const hoy = new Date();
const diaMs = 86400000;
const enDias = (n) => new Date(hoy.getTime() + n * diaMs);

const proveedores = [
  { id: 1, nombre: 'Distribuidora Centro', rubro: 'Almacén', contacto: '351 455-2210' },
  { id: 2, nombre: 'Frigorífico San Martín', rubro: 'Carnicería', contacto: '351 488-7734' },
  { id: 3, nombre: 'Química del Sur', rubro: 'Limpieza', contacto: '351 471-9088' },
  { id: 4, nombre: 'Andina Bebidas', rubro: 'Bebidas', contacto: '351 460-3312' }
];

let productos = [
  { id: 1, cod: '7790580103149', marca: 'Matarazzo', nombre: 'Fideos spaghetti 500 g', rubro: 'Almacén', stock: 24, min: 10, costo: 1200, margen: 35, vto: enDias(420), prov: 1 },
  { id: 2, cod: '7790070410283', marca: 'Natura', nombre: 'Aceite de girasol 900 ml', rubro: 'Almacén', stock: 12, min: 8, costo: 2800, margen: 30, vto: enDias(310), prov: 1 },
  { id: 3, cod: '7792200000129', marca: 'Playadito', nombre: 'Yerba mate 1 kg', rubro: 'Almacén', stock: 18, min: 8, costo: 4500, margen: 28, vto: enDias(500), prov: 1 },
  { id: 4, cod: '7790387015201', marca: 'Ledesma', nombre: 'Azúcar 1 kg', rubro: 'Almacén', stock: 30, min: 12, costo: 1500, margen: 32, vto: enDias(260), prov: 1 },
  { id: 5, cod: '7791337001108', marca: 'La Serenísima', nombre: 'Leche entera 1 L', rubro: 'Almacén', stock: 20, min: 15, costo: 1300, margen: 25, vto: enDias(6), prov: 1 },
  { id: 6, cod: '7791337889012', marca: 'Ser', nombre: 'Yogur bebible 190 g', rubro: 'Almacén', stock: 9, min: 12, costo: 900, margen: 30, vto: enDias(2), prov: 1 },
  { id: 7, cod: '2000000000017', marca: 'Carnicería', nombre: 'Carne picada común (kg)', rubro: 'Carnicería', stock: 8, min: 5, costo: 6200, margen: 25, vto: enDias(3), prov: 2 },
  { id: 8, cod: '2000000000024', marca: 'Carnicería', nombre: 'Milanesa de nalga (kg)', rubro: 'Carnicería', stock: 6, min: 4, costo: 11500, margen: 22, vto: enDias(4), prov: 2 },
  { id: 9, cod: '2000000000031', marca: 'Carnicería', nombre: 'Asado de tira (kg)', rubro: 'Carnicería', stock: 11, min: 5, costo: 9800, margen: 24, vto: enDias(5), prov: 2 },
  { id: 10, cod: '7790250016304', marca: 'Ayudín', nombre: 'Lavandina 1 L', rubro: 'Limpieza', stock: 22, min: 10, costo: 1100, margen: 40, vto: null, prov: 3 },
  { id: 11, cod: '7506339343212', marca: 'Magistral', nombre: 'Detergente 500 ml', rubro: 'Limpieza', stock: 15, min: 10, costo: 1800, margen: 38, vto: null, prov: 3 },
  { id: 12, cod: '7791290792845', marca: 'Skip', nombre: 'Jabón en polvo 800 g', rubro: 'Limpieza', stock: 7, min: 10, costo: 5200, margen: 30, vto: null, prov: 3 },
  { id: 13, cod: '7790895000997', marca: 'Coca-Cola', nombre: 'Gaseosa 2,25 L', rubro: 'Bebidas', stock: 28, min: 12, costo: 2600, margen: 30, vto: enDias(180), prov: 4 },
  { id: 14, cod: '7790040000346', marca: 'Bimbo', nombre: 'Pan lactal 390 g', rubro: 'Almacén', stock: 5, min: 8, costo: 2200, margen: 28, vto: enDias(1), prov: 1 }
];

const instituciones = [
  { id: 1, nombre: 'Colegio San José', saldo: 0 },
  { id: 2, nombre: 'Colegio Belgrano', saldo: 185400 },
  { id: 3, nombre: 'Resto La Esquina', saldo: 0 },
  { id: 4, nombre: 'Bar Don Pepe', saldo: 92400 }
];

let pedidos = [
  { id: 101, inst: 1, estado: 'borrador', fecha: hoy, items: [ { p: 5, c: 24 }, { p: 14, c: 10 }, { p: 4, c: 6 } ] },
  { id: 102, inst: 3, estado: 'borrador', fecha: hoy, items: [ { p: 7, c: 5 }, { p: 9, c: 4 } ] },
  { id: 100, inst: 2, estado: 'entregado', fecha: enDias(-1), items: [ { p: 1, c: 30 }, { p: 13, c: 24 } ] }
];

let boletas = [
  { id: 1, nro: '0001-00041877', prov: 1, fecha: enDias(-9), total: 184500, estado: 'Pendiente' },
  { id: 2, nro: '0002-00011203', prov: 2, fecha: enDias(-6), total: 496000, estado: 'Pagada' },
  { id: 3, nro: '0003-00007744', prov: 3, fecha: enDias(-3), total: 72800, estado: 'Pendiente' },
  { id: 4, nro: '0001-00041902', prov: 1, fecha: enDias(-2), total: 39400, estado: 'Anulada' }
];

let movimientos = [
  { hora: '08:42', concepto: 'Venta mostrador #1041', medio: 'Efectivo', monto: 12480, tipo: 'ingreso' },
  { hora: '09:15', concepto: 'Venta mostrador #1042', medio: 'Transferencia', monto: 23150, tipo: 'ingreso' },
  { hora: '10:03', concepto: 'Venta mostrador #1043', medio: 'Efectivo', monto: 7320, tipo: 'ingreso' },
  { hora: '10:51', concepto: 'Venta mostrador #1044', medio: 'QR', monto: 18900, tipo: 'ingreso' },
  { hora: '11:27', concepto: 'Pago a Frigorífico San Martín', medio: 'Efectivo', monto: 145000, tipo: 'egreso' }
];

let ventasHist = [
  { p: 5, c: 42 }, { p: 1, c: 31 }, { p: 13, c: 28 }, { p: 7, c: 24 },
  { p: 14, c: 22 }, { p: 3, c: 19 }, { p: 10, c: 17 }, { p: 8, c: 14 },
  { p: 4, c: 12 }, { p: 11, c: 9 }
];

let demandas = [
  { nombre: 'Pañales Pampers G', fecha: hoy },
  { nombre: 'Queso cremoso en horma', fecha: hoy },
  { nombre: 'Levadura fresca', fecha: enDias(-1) }
];

let etiquetas = [];
let devoluciones = [];
let nroVenta = 1045;
let nroBoleta = 5;
const claves = { admin: '1234', empleado: '1234' };
let perfilElegido = 'admin';
let perfil = 'admin';

/* ============================================================
   2. UTILIDADES
   ============================================================ */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const plata = (n) => new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0
}).format(Math.round(n || 0));

const fecha = (d) => d ? new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(d) : '—';
const diasPara = (d) => d ? Math.ceil((d - hoy) / diaMs) : null;
const precio = (p) => Math.round(p.costo * (1 + p.margen / 100));
const prod = (id) => productos.find((p) => p.id === id);
const prov = (id) => proveedores.find((p) => p.id === id);
const inst = (id) => instituciones.find((i) => i.id === id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ahora = () => new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(new Date());

function toast(titulo, texto, tipo) {
  const d = document.createElement('div');
  d.className = 'toast ' + (tipo || '');
  d.innerHTML = '<b>' + esc(titulo) + '</b>' + esc(texto || '');
  $('#toasts').appendChild(d);
  setTimeout(() => d.remove(), 5200);
}

function modal(titulo, cuerpoHTML, botones) {
  $('#modalTitulo').textContent = titulo;
  $('#modalCuerpo').innerHTML = cuerpoHTML;
  const pie = $('#modalPie');
  pie.innerHTML = '';
  (botones || [{ txt: 'Cerrar', clase: 'sec' }]).forEach((b) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'btn ' + (b.clase || '');
    el.textContent = b.txt;
    el.onclick = () => { if (!b.fn || b.fn() !== false) cerrarModal(); };
    pie.appendChild(el);
  });
  $('#velo').hidden = false;
}
const cerrarModal = () => { $('#velo').hidden = true; };
$('#velo').addEventListener('click', (e) => { if (e.target.id === 'velo') cerrarModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });

function estadoVto(p) {
  const d = diasPara(p.vto);
  if (d === null) return { chip: '<span class="chip ne">Sin vencimiento</span>', orden: 999, d: 999 };
  if (d <= 2) return { chip: '<span class="chip cr"><i class="punto"></i>Crítico · ' + d + ' d</span>', orden: 0, d };
  if (d <= 7) return { chip: '<span class="chip at"><i class="punto"></i>Por vencer · ' + d + ' d</span>', orden: 1, d };
  return { chip: '<span class="chip ok"><i class="punto"></i>En fecha</span>', orden: 2, d };
}

/* ============================================================
   3. NAVEGACIÓN Y PERFILES
   ============================================================ */
const titulos = {
  panel: ['Panel del día', 'Resumen de la jornada y avisos que requieren atención'],
  mostrador: ['Venta en mostrador', 'Carga de artículos, cobro con varios medios y emisión del comprobante'],
  institucionales: ['Pedidos institucionales', 'Borradores, entregas y cuentas corrientes de colegios y restaurantes'],
  caja: ['Caja', 'Egresos a proveedores y cierre diario'],
  inventario: ['Inventario', 'Catálogo de productos, márgenes y recepción de media res'],
  proveedores: ['Proveedores y boletas', 'Carga de boletas de compra y reposición de mercadería'],
  reportes: ['Reportes', 'Rendimiento de productos y rentabilidad por rubro']
};

function irA(v) {
  $$('.vista').forEach((s) => { s.hidden = s.id !== 'v-' + v; });
  $$('#nav button').forEach((b) => b.setAttribute('aria-current', String(b.dataset.vista === v)));
  $('#tituloVista').textContent = titulos[v][0];
  $('#subVista').textContent = titulos[v][1];
  if (v === 'panel') pintarPanel();
  if (v === 'inventario') pintarInventario();
  if (v === 'institucionales') pintarInstitucionales();
  if (v === 'caja') pintarCaja();
  if (v === 'proveedores') pintarProveedores();
  if (v === 'reportes') pintarReportes();
  window.scrollTo(0, 0);
}
$('#nav').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-vista]');
  if (b) irA(b.dataset.vista);
});

function aplicarPerfil() {
  const admin = perfil === 'admin';
  $('#pfAdmin').setAttribute('aria-pressed', String(admin));
  $('#pfEmpleado').setAttribute('aria-pressed', String(!admin));
  $$('[data-admin]').forEach((el) => { el.hidden = !admin; });
  if (!admin) {
    const act = $$('#nav button').find((b) => b.getAttribute('aria-current') === 'true');
    if (act && act.hidden) irA('mostrador');
  }
  pintarInventario();
}
$('#pfAdmin').onclick = () => { perfil = 'admin'; aplicarPerfil(); toast('Perfil Administrador', 'Acceso completo al sistema.', 'ok'); };
$('#pfEmpleado').onclick = () => {
  perfil = 'empleado'; aplicarPerfil();
  toast('Perfil Empleado', 'Quedan bloqueados el alta de productos, los costos y los márgenes.', 'at');
};

/* ============================================================
   4. PANEL
   ============================================================ */
function pintarPanel() {
  const ingresos = movimientos.filter((m) => m.tipo === 'ingreso').reduce((a, m) => a + m.monto, 0);
  const egresos = movimientos.filter((m) => m.tipo === 'egreso').reduce((a, m) => a + m.monto, 0);
  const porVencer = productos.filter((p) => { const d = diasPara(p.vto); return d !== null && d <= 7; });
  const deuda = instituciones.reduce((a, i) => a + i.saldo, 0);

  $('#cifras').innerHTML = [
    ['bi', 'Ingresos del día', plata(ingresos), movimientos.filter((m) => m.tipo === 'ingreso').length + ' operaciones'],
    ['', 'Egresos a proveedores', plata(egresos), 'salidas de caja'],
    ['ac', 'Próximos a vencer', porVencer.length, 'productos en los próximos 7 días'],
    ['pe', 'Deuda institucional', plata(deuda), instituciones.filter((i) => i.saldo > 0).length + ' cuentas con saldo']
  ].map(([c, et, val, pie]) =>
    '<div class="cifra ' + c + '"><div class="et">' + et + '</div><div class="val">' + val + '</div><div class="pie">' + pie + '</div></div>'
  ).join('');

  const orden = productos.filter((p) => p.vto).sort((a, b) => a.vto - b.vto).slice(0, 6);
  $('#nVence').textContent = porVencer.length + ' requieren atención';
  $('#tbVence').innerHTML = orden.map((p) => {
    const e = estadoVto(p);
    return '<tr><td><b>' + esc(p.nombre) + '</b><br><span style="color:var(--ink-soft);font-size:11.5px">' + esc(p.marca) + '</span></td>' +
      '<td class="num">' + p.stock + '</td><td class="num">' + fecha(p.vto) + '</td><td>' + e.chip + '</td></tr>';
  }).join('');

  pintarEtiquetas();

  const bajos = productos.filter((p) => p.stock < p.min);
  $('#nStock').textContent = bajos.length + ' productos';
  $('#tbStock').innerHTML = bajos.length ? bajos.map((p) =>
    '<tr><td><b>' + esc(p.nombre) + '</b></td><td>' + esc(prov(p.prov).nombre) + '</td>' +
    '<td class="num"><span class="chip cr">' + p.stock + '</span></td><td class="num">' + p.min + '</td></tr>'
  ).join('') : '<tr><td colspan="4" class="vacio">Todo el stock está por encima del mínimo.</td></tr>';

  $('#boxDemanda').innerHTML = demandas.length
    ? '<div class="tabla-env"><table><tbody>' + demandas.map((d) =>
        '<tr><td><b>' + esc(d.nombre) + '</b></td><td class="num">' + fecha(d.fecha) + '</td></tr>').join('') + '</tbody></table></div>'
    : '<div class="vacio">Todavía no se registraron pedidos sin stock.</div>';
}

function pintarEtiquetas() {
  $('#nEtiq').textContent = etiquetas.length ? etiquetas.length + ' pendientes' : '';
  $('#boxEtiq').innerHTML = etiquetas.length
    ? '<div class="tabla-env"><table><thead><tr><th>Producto</th><th class="num">Precio anterior</th><th class="num">Precio nuevo</th><th></th></tr></thead><tbody>' +
      etiquetas.map((e, i) =>
        '<tr><td><b>' + esc(e.nombre) + '</b></td><td class="num">' + plata(e.antes) + '</td>' +
        '<td class="num"><b>' + plata(e.ahora) + '</b></td>' +
        '<td><button type="button" class="btn sec chico" data-etiq="' + i + '">Ya la cambié</button></td></tr>').join('') +
      '</tbody></table></div>'
    : '<div class="vacio">No hay etiquetas pendientes. Aparecen acá cuando una boleta de proveedor sube un costo.</div>';
}
$('#boxEtiq').addEventListener('click', (e) => {
  const b = e.target.closest('[data-etiq]');
  if (!b) return;
  etiquetas.splice(Number(b.dataset.etiq), 1);
  pintarEtiquetas(); pintarPanel();
});

/* ============================================================
   5. MOSTRADOR
   ============================================================ */
let carrito = [];
let pagos = [{ medio: 'Efectivo', monto: 0 }];

function totalCarrito() { return carrito.reduce((a, l) => a + l.cant * l.precio, 0); }

function pintarSugerencias() {
  const q = $('#busca').value.trim().toLowerCase();
  const lista = q
    ? productos.filter((p) => (p.nombre + ' ' + p.marca + ' ' + p.cod).toLowerCase().includes(q)).slice(0, 7)
    : productos.slice(0, 6);
  $('#sugerencias').innerHTML = lista.length ? lista.map((p) =>
    '<button type="button" class="sug" data-add="' + p.id + '">' +
    '<span class="n"><b>' + esc(p.nombre) + '</b><span>' + esc(p.marca) + ' · ' + p.cod + ' · stock ' + p.stock + '</span></span>' +
    '<span class="p">' + plata(precio(p)) + '</span></button>').join('')
    : '<div class="vacio">Sin resultados. Si el cliente lo pidió y no hay, registralo con “No hay stock”.</div>';
}
$('#busca').addEventListener('input', pintarSugerencias);
$('#sugerencias').addEventListener('click', (e) => {
  const b = e.target.closest('[data-add]');
  if (b) agregar(Number(b.dataset.add));
});

function agregar(id) {
  const p = prod(id);
  const linea = carrito.find((l) => l.id === id);
  if (p.stock <= (linea ? linea.cant : 0)) { toast('Sin stock suficiente', p.nombre + ' tiene ' + p.stock + ' unidades.', 'cr'); return; }
  if (linea) linea.cant++;
  else carrito.push({ id, nombre: p.nombre, precio: precio(p), cant: 1 });
  pintarCarrito();
}

function pintarCarrito() {
  $('#tbCarrito').innerHTML = carrito.length ? carrito.map((l, i) =>
    '<tr><td><b>' + esc(l.nombre) + '</b></td>' +
    '<td class="num"><input type="number" min="1" value="' + l.cant + '" data-cant="' + i + '" style="width:62px;text-align:right" aria-label="Cantidad"></td>' +
    '<td class="num">' + plata(l.precio) + '</td>' +
    '<td class="num"><b>' + plata(l.cant * l.precio) + '</b></td>' +
    '<td><button type="button" class="btn sec chico" data-quitar="' + i + '">Quitar</button></td></tr>').join('')
    : '<tr><td colspan="5" class="vacio">Escaneá o buscá un artículo para empezar la venta.</td></tr>';
  $('#totalVenta').textContent = plata(totalCarrito());
  pintarPagos();
}
$('#tbCarrito').addEventListener('click', (e) => {
  const b = e.target.closest('[data-quitar]');
  if (!b) return;
  carrito.splice(Number(b.dataset.quitar), 1);
  pintarCarrito();
});

$('#tbCarrito').addEventListener('input', (e) => {
  const c = e.target.dataset.cant;
  if (c === undefined) return;
  const linea = carrito[Number(c)];
  const nueva = Math.max(1, Number(e.target.value) || 1);
  const disp = prod(linea.id).stock;
  if (nueva > disp) {
    toast('Sin stock suficiente', prod(linea.id).nombre + ' tiene ' + disp + ' unidades disponibles.', 'cr');
    linea.cant = disp;
  } else {
    linea.cant = nueva;
  }
  pintarCarrito();
});

function pintarPagos() {
  const medios = ['Efectivo', 'Transferencia', 'QR', 'Débito'];
  $('#pagos').innerHTML = pagos.map((pg, i) =>
    '<div class="pagos-lin">' +
    '<select data-medio="' + i + '" aria-label="Medio de pago">' +
    medios.map((m) => '<option' + (m === pg.medio ? ' selected' : '') + '>' + m + '</option>').join('') + '</select>' +
    '<input type="number" min="0" step="10" data-monto="' + i + '" value="' + (pg.monto || '') + '" placeholder="0" aria-label="Monto">' +
    (pagos.length > 1 ? '<button type="button" class="btn sec chico" data-delpago="' + i + '">×</button>' : '') +
    '</div>').join('');

  const total = totalCarrito();
  const puesto = pagos.reduce((a, p) => a + (Number(p.monto) || 0), 0);
  const resta = Math.round(total - puesto);
  const r = $('#restante');
  if (resta > 0) { r.style.background = 'var(--accent-soft)'; r.style.color = 'var(--accent)'; r.innerHTML = '<span>Falta cubrir</span><span>' + plata(resta) + '</span>'; }
  else if (resta < 0) { r.style.background = 'var(--brand-soft)'; r.style.color = 'var(--brand)'; r.innerHTML = '<span>Vuelto a entregar</span><span>' + plata(-resta) + '</span>'; }
  else { r.style.background = 'var(--ok-soft)'; r.style.color = 'var(--ok)'; r.innerHTML = '<span>Cubierto</span><span>' + plata(total) + '</span>'; }
  $('#btnCobrar').disabled = !(total > 0 && resta <= 0);
}
$('#pagos').addEventListener('input', (e) => {
  const m = e.target.dataset.monto, s = e.target.dataset.medio;
  if (m !== undefined) { pagos[Number(m)].monto = Number(e.target.value) || 0; pintarPagos(); }
  if (s !== undefined) { pagos[Number(s)].medio = e.target.value; }
});
$('#pagos').addEventListener('click', (e) => {
  const b = e.target.closest('[data-delpago]');
  if (!b) return;
  pagos.splice(Number(b.dataset.delpago), 1);
  pintarPagos();
});
$('#btnAddPago').onclick = () => {
  const resta = Math.round(totalCarrito() - pagos.reduce((a, p) => a + (Number(p.monto) || 0), 0));
  pagos.push({ medio: 'Transferencia', monto: resta > 0 ? resta : 0 });
  pintarPagos();
};

$('#btnCobrar').onclick = () => {
  const total = totalCarrito();
  carrito.forEach((l) => {
    const p = prod(l.id); p.stock -= l.cant;
    const h = ventasHist.find((v) => v.p === l.id);
    if (h) h.c += l.cant; else ventasHist.push({ p: l.id, c: l.cant });
  });
  pagos.filter((p) => p.monto > 0).forEach((p) => {
    movimientos.push({ hora: ahora(), concepto: 'Venta mostrador #' + nroVenta, medio: p.medio, monto: Number(p.monto), tipo: 'ingreso' });
  });
  const vuelto = Math.round(pagos.reduce((a, p) => a + (Number(p.monto) || 0), 0) - total);
  const tipo = $('#comprobante').value;
  const lineas = carrito.map((l) => '  ' + String(l.cant).padStart(2) + ' x ' + l.nombre.slice(0, 26).padEnd(27) + plata(l.cant * l.precio).padStart(11)).join('\n');
  $('#ticket').textContent =
    '      MINIMERCADO JORGE\n      27 de Abril 980 - Cordoba\n' +
    '--------------------------------------\n' +
    (tipo === 'A' ? '  FACTURA A' : '  TICKET FISCAL B') + '   N: ' + nroVenta + '\n' +
    '  ' + fecha(hoy) + '  ' + ahora() + '\n' +
    '--------------------------------------\n' + lineas + '\n' +
    '--------------------------------------\n' +
    '  TOTAL'.padEnd(29) + plata(total).padStart(11) + '\n\n' +
    pagos.filter((p) => p.monto > 0).map((p) => '  ' + p.medio.padEnd(27) + plata(p.monto).padStart(11)).join('\n') +
    (vuelto > 0 ? '\n  ' + 'VUELTO'.padEnd(27) + plata(vuelto).padStart(11) : '') +
    '\n--------------------------------------\n        Gracias por su compra';
  $('#cardTicket').hidden = false;
  toast('Venta registrada', 'Comprobante ' + (tipo === 'A' ? 'A' : 'B') + ' N.º ' + nroVenta + ' por ' + plata(total) + '.' +
    (vuelto > 0 ? ' Vuelto: ' + plata(vuelto) + '.' : ''), 'ok');
  nroVenta++;
  carrito = []; pagos = [{ medio: 'Efectivo', monto: 0 }];
  pintarCarrito(); pintarSugerencias();
};

$('#btnCancelarVenta').onclick = () => {
  carrito = []; pagos = [{ medio: 'Efectivo', monto: 0 }];
  $('#cardTicket').hidden = true;
  pintarCarrito();
};

$('#btnFallaCobro').onclick = () => {
  if (!carrito.length) { toast('No hay venta en curso', 'Cargá artículos antes de probar el cobro.', 'cr'); return; }
  const medio = pagos.find((p) => Number(p.monto) > 0);
  toast('Cobro rechazado', 'El pago con ' + (medio ? medio.medio : 'el medio elegido') +
    ' fue rechazado. Reintentá o elegí otro método; el stock no se descontó.', 'cr');
  pagos.forEach((p) => { p.monto = 0; });
  pintarPagos();
};

$('#btnCancelarBoleta').onclick = () => {
  $$('[data-bcant]').forEach((i) => { i.value = 0; });
  $('#blNro').value = '';
  $('#salidaBoleta').innerHTML = '';
  pintarBoleta();
  toast('Carga cancelada', 'No se registró la boleta y no se modificaron costos ni stock.', 'at');
};

$('#btnDemanda').onclick = () => {
  modal('Registrar demanda insatisfecha',
    '<p style="margin-top:0;color:var(--ink-soft);font-size:13px">Anotá el producto que el cliente pidió y no había en stock.</p>' +
    '<div class="campo"><label for="dmNombre">Producto solicitado</label><input type="text" id="dmNombre" placeholder="Ej.: Queso rallado 100 g"></div>',
    [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Registrar', fn: () => {
      const n = $('#dmNombre').value.trim();
      if (!n) { toast('Falta el producto', 'Escribí qué pidió el cliente.', 'cr'); return false; }
      demandas.unshift({ nombre: n, fecha: hoy });
      toast('Demanda registrada', n + ' quedó anotado para evaluar su incorporación.', 'ok');
    } }]);
  setTimeout(() => $('#dmNombre') && $('#dmNombre').focus(), 60);
};

/* ============================================================
   6. INSTITUCIONALES
   ============================================================ */
function totalPedido(ped) { return ped.items.reduce((a, it) => a + it.c * precio(prod(it.p)), 0); }

function pintarInstitucionales() {
  const borr = pedidos.filter((p) => p.estado === 'borrador');
  $('#boxBorradores').innerHTML = borr.length ? borr.map((ped) =>
    '<div class="cuerpo" style="border-bottom:1px solid var(--line)">' +
    '<div style="display:flex;align-items:center;gap:9px;margin-bottom:9px;flex-wrap:wrap">' +
    '<b>' + esc(inst(ped.inst).nombre) + '</b><span class="chip at">Borrador</span>' +
    '<span style="margin-left:auto;font-family:var(--f-mono);font-weight:600">' + plata(totalPedido(ped)) + '</span></div>' +
    '<div class="tabla-env"><table><tbody>' + ped.items.map((it, i) =>
      '<tr><td>' + esc(prod(it.p).nombre) + '</td><td class="num">' + it.c + ' u.</td>' +
      '<td class="num">' + plata(it.c * precio(prod(it.p))) + '</td>' +
      '<td><button type="button" class="btn sec chico" data-rechazo="' + ped.id + '|' + i + '">Rechazó</button></td></tr>').join('') +
    '</tbody></table></div>' +
    '<div class="acciones" style="margin-top:10px"><button type="button" class="btn chico" data-entregar="' + ped.id + '">Confirmar entrega</button></div></div>'
  ).join('') : '<div class="vacio">No hay pedidos en borrador.</div>';

  $('#tbCtaCte').innerHTML = instituciones.map((i) =>
    '<tr><td><b>' + esc(i.nombre) + '</b></td>' +
    '<td class="num">' + (i.saldo > 0 ? '<b>' + plata(i.saldo) + '</b>' : '<span class="chip ok">Al día</span>') + '</td>' +
    '<td>' + (i.saldo > 0 ? '<button type="button" class="btn sec chico" data-cobrar="' + i.id + '">Cobrar deuda</button>' : '') + '</td></tr>').join('');

  const ent = pedidos.filter((p) => p.estado === 'entregado');
  $('#tbEntregados').innerHTML = ent.length ? ent.map((p) =>
    '<tr><td class="num">#' + p.id + '</td><td>' + esc(inst(p.inst).nombre) + '</td><td class="num">' + fecha(p.fecha) + '</td>' +
    '<td class="num">' + p.items.length + '</td><td class="num"><b>' + plata(totalPedido(p)) + '</b></td></tr>').join('')
    : '<tr><td colspan="5" class="vacio">Todavía no se entregó ningún pedido.</td></tr>';
}

$('#v-institucionales').addEventListener('click', (e) => {
  const ent = e.target.closest('[data-entregar]');
  const rec = e.target.closest('[data-rechazo]');
  const cob = e.target.closest('[data-cobrar]');

  if (rec) {
    const [pid, idx] = rec.dataset.rechazo.split('|').map(Number);
    const ped = pedidos.find((p) => p.id === pid);
    const it = ped.items[idx];
    const nom = prod(it.p).nombre;
    ped.items.splice(idx, 1);
    if (!ped.items.length) pedidos = pedidos.filter((p) => p.id !== pid);
    toast('Rechazo registrado', nom + ' se quitó del pedido antes de facturar.', 'at');
    pintarInstitucionales();
  }

  if (ent) {
    const ped = pedidos.find((p) => p.id === Number(ent.dataset.entregar));
    const falta = ped.items.find((it) => prod(it.p).stock < it.c);
    if (falta) { toast('Stock insuficiente', 'No alcanza el stock de ' + prod(falta.p).nombre + '.', 'cr'); return; }
    const tot = totalPedido(ped);
    ped.items.forEach((it) => { prod(it.p).stock -= it.c; });
    ped.estado = 'entregado'; ped.fecha = hoy;
    inst(ped.inst).saldo += tot;
    toast('Entrega confirmada', 'Se descontó el stock y se cargaron ' + plata(tot) + ' a la cuenta de ' + inst(ped.inst).nombre + '.', 'ok');
    pintarInstitucionales();
  }

  if (cob) {
    const i = inst(Number(cob.dataset.cobrar));
    modal('Cobrar deuda — ' + i.nombre,
      '<div class="aviso ne" style="margin-bottom:14px">La deuda se cancela por el monto total exacto. El sistema no acepta pagos parciales ni entregas a cuenta.</div>' +
      '<div style="display:flex;justify-content:space-between;padding:10px 12px;background:var(--surface-2);border-radius:7px;margin-bottom:14px">' +
      '<span style="font-weight:600">Saldo adeudado</span><b style="font-family:var(--f-mono)">' + plata(i.saldo) + '</b></div>' +
      '<div class="campo"><label for="cbMonto">Monto que entrega</label><input type="number" id="cbMonto" min="0" step="100" value="' + i.saldo + '"></div>',
      [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Registrar cobro', fn: () => {
        const m = Number($('#cbMonto').value);
        if (m !== i.saldo) {
          toast('Cobro rechazado', 'Debe ser exactamente ' + plata(i.saldo) + '. No se aceptan pagos parciales.', 'cr');
          return false;
        }
        movimientos.push({ hora: ahora(), concepto: 'Cobro cuenta corriente · ' + i.nombre, medio: 'Transferencia', monto: m, tipo: 'ingreso' });
        i.saldo = 0;
        toast('Deuda cancelada', i.nombre + ' quedó al día.', 'ok');
        pintarInstitucionales();
      } }]);
  }
});

$('#btnNuevoPedido').onclick = () => {
  modal('Crear pedido borrador',
    '<div class="aviso ne" style="margin-bottom:14px">Mientras el pedido está en borrador no se descuenta stock ni se factura.</div>' +
    '<div class="campo"><label for="npInst">Institución</label><select id="npInst">' +
    instituciones.map((i) => '<option value="' + i.id + '">' + esc(i.nombre) + '</option>').join('') + '</select></div>' +
    '<div class="campo"><label for="npProd">Producto</label><select id="npProd">' +
    productos.map((p) => '<option value="' + p.id + '">' + esc(p.nombre) + '</option>').join('') + '</select></div>' +
    '<div class="campo"><label for="npCant">Cantidad</label><input type="number" id="npCant" min="1" value="10"></div>',
    [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Crear borrador', fn: () => {
      const id = Math.max(...pedidos.map((p) => p.id)) + 1;
      pedidos.unshift({ id, inst: Number($('#npInst').value), estado: 'borrador', fecha: hoy,
        items: [{ p: Number($('#npProd').value), c: Number($('#npCant').value) || 1 }] });
      toast('Borrador creado', 'Pedido #' + id + '. El stock no se modificó.', 'ok');
      pintarInstitucionales();
    } }]);
};

/* ============================================================
   7. CAJA
   ============================================================ */
function pintarCaja() {
  $('#tbCaja').innerHTML = movimientos.map((m) =>
    '<tr><td class="num">' + m.hora + '</td><td>' + esc(m.concepto) + '</td>' +
    '<td><span class="chip ne">' + m.medio + '</span></td>' +
    '<td class="num" style="color:' + (m.tipo === 'egreso' ? 'var(--danger)' : 'var(--ok)') + '"><b>' +
    (m.tipo === 'egreso' ? '− ' : '+ ') + plata(m.monto) + '</b></td></tr>').join('');

  $('#egProv').innerHTML = proveedores.map((p) => '<option value="' + p.id + '">' + esc(p.nombre) + '</option>').join('');

  const porMedio = {};
  movimientos.filter((m) => m.tipo === 'ingreso').forEach((m) => { porMedio[m.medio] = (porMedio[m.medio] || 0) + m.monto; });
  const egresos = movimientos.filter((m) => m.tipo === 'egreso').reduce((a, m) => a + m.monto, 0);
  $('#resumenCaja').innerHTML =
    '<div class="tabla-env"><table><tbody>' +
    Object.entries(porMedio).map(([k, v]) => '<tr><td>Ingresos · ' + k + '</td><td class="num">' + plata(v) + '</td></tr>').join('') +
    '<tr><td>Egresos a proveedores</td><td class="num" style="color:var(--danger)">−' + plata(egresos) + '</td></tr>' +
    '</tbody></table></div>';
}

$('#btnEgreso').onclick = () => {
  const m = Number($('#egMonto').value);
  if (!m || m <= 0) { toast('Monto inválido', 'Ingresá cuánto se retira de la caja.', 'cr'); return; }
  movimientos.push({ hora: ahora(), concepto: 'Pago a ' + prov(Number($('#egProv').value)).nombre, medio: 'Efectivo', monto: m, tipo: 'egreso' });
  $('#egMonto').value = '';
  toast('Egreso registrado', plata(m) + ' salieron de la caja.', 'ok');
  pintarCaja();
};

$('#btnCierre').onclick = () => {
  const efEsperado = movimientos.filter((m) => m.medio === 'Efectivo')
    .reduce((a, m) => a + (m.tipo === 'ingreso' ? m.monto : -m.monto), 0);
  const contado = Number($('#efectivoFisico').value);
  if (!contado && contado !== 0) { toast('Falta el conteo', 'Ingresá el efectivo físico contado.', 'cr'); return; }
  const dif = contado - efEsperado;
  const ok = Math.abs(dif) < 1;
  $('#salidaCierre').innerHTML =
    '<div class="aviso ' + (ok ? 'ok' : 'cr') + '" style="margin-top:14px"><div>' +
    '<b>' + (ok ? 'Caja cuadrada' : 'Diferencia de ' + plata(Math.abs(dif))) + '</b>' +
    'Efectivo esperado ' + plata(efEsperado) + ' · contado ' + plata(contado) +
    (ok ? '.' : '. ' + (dif > 0 ? 'Hay un sobrante.' : 'Falta dinero en la caja.')) +
    '</div></div>';
  $('#confirmaCierre').hidden = false;
  $('#reporteCierre').innerHTML = '';
  cierrePendiente = { efEsperado: efEsperado, contado: contado, dif: dif, ok: ok };
  toast(ok ? 'Cierre sin diferencias' : 'Cierre con diferencia', 'Revisá el resultado y confirmá el cierre.', ok ? 'ok' : 'cr');
};

let cierrePendiente = null;

$('#btnConfirmarCierre').onclick = () => {
  if (!cierrePendiente) return;
  const c = cierrePendiente;
  const porMedio = {};
  movimientos.filter((m) => m.tipo === 'ingreso').forEach((m) => { porMedio[m.medio] = (porMedio[m.medio] || 0) + m.monto; });
  const egresos = movimientos.filter((m) => m.tipo === 'egreso').reduce((a, m) => a + m.monto, 0);
  const totalIng = Object.values(porMedio).reduce((a, v) => a + v, 0);
  $('#reporteCierre').innerHTML =
    '<div class="tarjeta" style="margin-top:14px"><h2>Reporte de cierre — ' + fecha(hoy) + '</h2>' +
    '<div class="tabla-env"><table><tbody>' +
    Object.entries(porMedio).map(([k, v]) => '<tr><td>Ingresos · ' + k + '</td><td class="num">' + plata(v) + '</td></tr>').join('') +
    '<tr><td><b>Total de ingresos</b></td><td class="num"><b>' + plata(totalIng) + '</b></td></tr>' +
    '<tr><td>Egresos a proveedores</td><td class="num" style="color:var(--danger)">−' + plata(egresos) + '</td></tr>' +
    '<tr><td>Efectivo esperado en caja</td><td class="num">' + plata(c.efEsperado) + '</td></tr>' +
    '<tr><td>Efectivo físico contado</td><td class="num">' + plata(c.contado) + '</td></tr>' +
    '<tr><td><b>Diferencia</b></td><td class="num"><b style="color:' + (c.ok ? 'var(--ok)' : 'var(--danger)') + '">' +
    (c.dif === 0 ? plata(0) : (c.dif > 0 ? '+' : '−') + plata(Math.abs(c.dif))) + '</b></td></tr>' +
    '</tbody></table></div></div>';
  $('#confirmaCierre').hidden = true;
  cierrePendiente = null;
  toast('Caja cerrada', 'Se generó el reporte con los totales y las diferencias.', 'ok');
};

$('#btnNoConfirmarCierre').onclick = () => {
  $('#confirmaCierre').hidden = true;
  $('#salidaCierre').innerHTML = '';
  $('#reporteCierre').innerHTML = '';
  cierrePendiente = null;
  toast('Cierre no confirmado', 'La caja queda abierta y no se generó el reporte.', 'at');
};

/* ============================================================
   8. INVENTARIO
   ============================================================ */
function pintarInventario() {
  const q = ($('#filtroInv') ? $('#filtroInv').value : '').trim().toLowerCase();
  const r = $('#filtroRubro') ? $('#filtroRubro').value : '';
  const admin = perfil === 'admin';
  const lista = productos.filter((p) =>
    (!q || (p.nombre + ' ' + p.marca + ' ' + p.cod).toLowerCase().includes(q)) && (!r || p.rubro === r));

  $('#notaInv').textContent = lista.length + ' de ' + productos.length + ' productos' + (admin ? '' : ' · solo consulta');
  $('#tbInv').innerHTML = lista.length ? lista.map((p) => {
    const e = estadoVto(p);
    const bajo = p.stock < p.min;
    return '<tr><td class="num" style="font-size:11.5px;color:var(--ink-soft)">' + p.cod + '</td>' +
      '<td><b>' + esc(p.nombre) + '</b><br><span style="color:var(--ink-soft);font-size:11.5px">' + esc(p.marca) + '</span></td>' +
      '<td><span class="chip ma">' + p.rubro + '</span></td>' +
      '<td class="num">' + (bajo ? '<span class="chip cr">' + p.stock + '</span>' : p.stock) + '</td>' +
      '<td class="num">' + (admin ? plata(p.costo) : '—') + '</td>' +
      '<td class="num">' + (admin ? p.margen + ' %' : '—') + '</td>' +
      '<td class="num"><b>' + plata(precio(p)) + '</b></td>' +
      '<td>' + e.chip + '</td>' +
      '<td>' + (admin ? '<button type="button" class="btn sec chico" data-margen="' + p.id + '">Margen</button>' : '') + '</td></tr>';
  }).join('') : '<tr><td colspan="9" class="vacio">Ningún producto coincide con la búsqueda.</td></tr>';
}
['#filtroInv', '#filtroRubro'].forEach((s) => $(s).addEventListener('input', pintarInventario));

$('#tbInv').addEventListener('click', (e) => {
  const b = e.target.closest('[data-margen]');
  if (!b) return;
  const p = prod(Number(b.dataset.margen));
  modal('Porcentaje de ganancia — ' + p.nombre,
    '<div class="aviso ne" style="margin-bottom:14px">El margen se fija por producto, no por rubro.</div>' +
    '<div class="fila"><div><label for="mgCosto">Costo</label><input type="number" id="mgCosto" value="' + p.costo + '" disabled></div>' +
    '<div><label for="mgMargen">Margen (%)</label><input type="number" id="mgMargen" value="' + p.margen + '" min="0" step="1"></div></div>' +
    '<div id="mgPrev" style="margin-top:12px;display:flex;justify-content:space-between;padding:11px 13px;background:var(--brand-soft);border-radius:7px">' +
    '<span style="font-weight:600">Precio de venta</span><b style="font-family:var(--f-mono)">' + plata(precio(p)) + '</b></div>',
    [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Guardar', fn: () => {
      p.margen = Number($('#mgMargen').value) || 0;
      toast('Margen actualizado', p.nombre + ' pasa a ' + plata(precio(p)) + '.', 'ok');
      pintarInventario();
    } }]);
  $('#mgMargen').addEventListener('input', () => {
    const nuevo = Math.round(p.costo * (1 + (Number($('#mgMargen').value) || 0) / 100));
    $('#mgPrev').innerHTML = '<span style="font-weight:600">Precio de venta</span><b style="font-family:var(--f-mono)">' + plata(nuevo) + '</b>';
  });
});

$('#btnNuevoProd').onclick = () => {
  modal('Registrar producto',
    '<div class="fila"><div><label for="apMarca">Marca</label><input type="text" id="apMarca" placeholder="Ej.: Arcor"></div>' +
    '<div><label for="apNombre">Nombre descriptivo</label><input type="text" id="apNombre" placeholder="Ej.: Mermelada de durazno 454 g"></div></div>' +
    '<div class="fila"><div><label for="apRubro">Rubro</label><select id="apRubro"><option>Almacén</option><option>Carnicería</option><option>Limpieza</option><option>Bebidas</option></select></div>' +
    '<div><label for="apCod">Código de barras</label><input type="text" id="apCod" placeholder="7790000000000"></div></div>' +
    '<div class="fila"><div><label for="apCosto">Costo</label><input type="number" id="apCosto" min="0" step="10" placeholder="0"></div>' +
    '<div><label for="apMargen">Margen (%)</label><input type="number" id="apMargen" min="0" step="1" value="30"></div>' +
    '<div><label for="apStock">Stock inicial</label><input type="number" id="apStock" min="0" value="0"></div></div>' +
    '<div class="campo"><label for="apVto">Fecha de vencimiento</label><input type="date" id="apVto"></div>',
    [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Registrar', fn: () => {
      const marca = $('#apMarca').value.trim(), nombre = $('#apNombre').value.trim();
      const cod = $('#apCod').value.trim(), costo = Number($('#apCosto').value);
      if (!marca || !nombre || !cod || !costo) { toast('Faltan datos', 'Marca, nombre, código de barras y costo son obligatorios.', 'cr'); return false; }
      const v = $('#apVto').value;
      productos.push({ id: Math.max(...productos.map((p) => p.id)) + 1, cod, marca, nombre,
        rubro: $('#apRubro').value, stock: Number($('#apStock').value) || 0, min: 5,
        costo, margen: Number($('#apMargen').value) || 0, vto: v ? new Date(v + 'T12:00:00') : null,
        prov: proveedores.find((pr) => pr.rubro === $('#apRubro').value) ? proveedores.find((pr) => pr.rubro === $('#apRubro').value).id : 1 });
      toast('Producto registrado', nombre + ' se agregó al catálogo.', 'ok');
      pintarInventario();
    } }]);
};

$('#btnMediaRes').onclick = () => {
  const peso = Number($('#mrPeso').value), costo = Number($('#mrCosto').value), merma = Number($('#mrMerma').value);
  if (!peso || !costo || merma >= peso) { toast('Datos inválidos', 'Revisá el peso, el costo y la merma.', 'cr'); return; }
  const util = peso - merma;
  const costoKg = costo / util;
  const pctMerma = (merma / peso) * 100;
  $('#salidaMediaRes').innerHTML =
    '<div class="rejilla cols-3" style="margin-top:14px">' +
    '<div class="cifra"><div class="et">Kilos útiles</div><div class="val">' + util.toFixed(1) + '</div><div class="pie">de ' + peso + ' kg comprados</div></div>' +
    '<div class="cifra ac"><div class="et">Merma</div><div class="val">' + pctMerma.toFixed(1) + ' %</div><div class="pie">grasa y hueso descartado</div></div>' +
    '<div class="cifra bi"><div class="et">Costo real por kilo</div><div class="val">' + plata(costoKg) + '</div><div class="pie">contra ' + plata(costo / peso) + ' sin descontar merma</div></div>' +
    '</div>' +
    '<div class="aviso at" style="margin-top:12px"><div><b>Precio mínimo de venta sugerido</b>' +
    'Con un margen del 25 %, los cortes deberían venderse a ' + plata(costoKg * 1.25) + ' por kilo para mantener la rentabilidad.</div></div>';
};

/* ============================================================
   9. PROVEEDORES Y BOLETAS
   ============================================================ */
function pintarProveedores() {
  $('#tbProv').innerHTML = proveedores.map((p) => {
    const usados = productos.filter((x) => x.prov === p.id).length;
    return '<tr><td><b>' + esc(p.nombre) + '</b></td><td><span class="chip ma">' + p.rubro + '</span></td>' +
      '<td class="num">' + usados + '</td>' +
      '<td class="num" style="font-size:12px">' + p.contacto + '</td>' +
      '<td style="white-space:nowrap"><button type="button" class="btn sec chico" data-editprov="' + p.id + '">Editar</button> ' +
      '<button type="button" class="btn sec chico" data-delprov="' + p.id + '">Eliminar</button></td></tr>';
  }).join('');

  pintarBoletas();

  $('#blProv').innerHTML = proveedores.map((p) => '<option value="' + p.id + '">' + esc(p.nombre) + '</option>').join('');
  if (!$('#blFecha').value) $('#blFecha').valueAsDate = hoy;
  pintarBoleta();

  const sug = productos.filter((p) => p.stock < p.min)
    .map((p) => ({ p, falta: Math.max(p.min * 2 - p.stock, p.min) }));
  $('#boxReposicion').innerHTML = sug.length
    ? '<div class="tabla-env"><table><thead><tr><th>Producto</th><th>Proveedor</th><th class="num">Stock</th><th class="num">Pedir</th></tr></thead><tbody>' +
      sug.map((s) => '<tr><td><b>' + esc(s.p.nombre) + '</b></td><td>' + esc(prov(s.p.prov).nombre) + '</td>' +
        '<td class="num"><span class="chip cr">' + s.p.stock + '</span></td><td class="num"><b>' + s.falta + ' u.</b></td></tr>').join('') +
      '</tbody></table></div>'
    : '<div class="vacio">No hace falta reponer: todo el stock está por encima del mínimo.</div>';
}

function pintarBoletas() {
  const chip = { Pendiente: 'at', Pagada: 'ok', Anulada: 'cr' };
  $('#tbBoletas').innerHTML = boletas.length ? boletas.slice().reverse().map((b) =>
    '<tr><td class="num" style="font-size:12px">' + b.nro + '</td>' +
    '<td><b>' + esc(prov(b.prov).nombre) + '</b></td>' +
    '<td class="num">' + fecha(b.fecha) + '</td>' +
    '<td class="num"><b>' + plata(b.total) + '</b></td>' +
    '<td><span class="chip ' + chip[b.estado] + '"><i class="punto"></i>' + b.estado + '</span></td>' +
    '<td style="white-space:nowrap">' + (b.estado === 'Pendiente'
      ? '<button type="button" class="btn sec chico" data-saldar="' + b.id + '">Saldar</button> ' +
        '<button type="button" class="btn sec chico" data-anular="' + b.id + '">Anular</button>'
      : '<span style="color:var(--ink-soft);font-size:11.5px">sin acciones</span>') + '</td></tr>').join('')
    : '<tr><td colspan="6" class="vacio">Todavía no se registró ninguna boleta.</td></tr>';
}

$('#tbBoletas').addEventListener('click', (e) => {
  const sal = e.target.closest('[data-saldar]');
  const anu = e.target.closest('[data-anular]');
  if (sal) {
    const b = boletas.find((x) => x.id === Number(sal.dataset.saldar));
    modal('Saldar boleta ' + b.nro,
      '<p style="margin-top:0;color:var(--ink-soft);font-size:13px">Se registra el pago al proveedor y la boleta pasa al estado <b>Pagada</b>.</p>' +
      '<div style="display:flex;justify-content:space-between;padding:10px 12px;background:var(--surface-2);border-radius:7px;margin-bottom:14px">' +
      '<span style="font-weight:600">' + esc(prov(b.prov).nombre) + '</span><b style="font-family:var(--f-mono)">' + plata(b.total) + '</b></div>' +
      '<div class="campo"><label for="sbMedio">Medio de pago</label><select id="sbMedio"><option>Efectivo</option><option>Transferencia</option></select></div>',
      [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Registrar pago', fn: () => {
        const medio = $('#sbMedio').value;
        b.estado = 'Pagada';
        if (medio === 'Efectivo') {
          movimientos.push({ hora: ahora(), concepto: 'Pago boleta ' + b.nro + ' · ' + prov(b.prov).nombre, medio: 'Efectivo', monto: b.total, tipo: 'egreso' });
        }
        toast('Boleta saldada', b.nro + ' quedó en estado Pagada.', 'ok');
        pintarBoletas(); pintarPanel();
      } }]);
  }
  if (anu) {
    const b = boletas.find((x) => x.id === Number(anu.dataset.anular));
    modal('Anular boleta ' + b.nro,
      '<div class="aviso cr"><div><b>La boleta pasa al estado Anulada</b>Solo se puede anular una boleta que todavía está pendiente. La operación no se puede deshacer.</div></div>',
      [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Anular boleta', clase: 'pe', fn: () => {
        b.estado = 'Anulada';
        toast('Boleta anulada', b.nro + ' quedó anulada.', 'at');
        pintarBoletas();
      } }]);
  }
});

function pintarBoleta() {
  const pid = Number($('#blProv').value);
  const items = productos.filter((p) => p.prov === pid);
  $('#tbBoleta').innerHTML = items.length ? items.map((p) =>
    '<tr><td><b>' + esc(p.nombre) + '</b></td>' +
    '<td class="num"><input type="number" min="0" value="0" step="1" data-bcant="' + p.id + '" style="width:80px;text-align:right"></td>' +
    '<td class="num">' + plata(p.costo) + '</td>' +
    '<td class="num"><input type="number" min="0" value="' + p.costo + '" step="10" data-bcosto="' + p.id + '" style="width:110px;text-align:right"></td></tr>').join('')
    : '<tr><td colspan="4" class="vacio">Este proveedor no tiene productos vinculados.</td></tr>';
}
$('#blProv').addEventListener('change', pintarBoleta);

$('#btnConfirmarBoleta').onclick = () => {
  const cants = $$('[data-bcant]').filter((i) => Number(i.value) > 0);
  if (!cants.length) { toast('Boleta vacía', 'Cargá al menos un producto con cantidad.', 'cr'); return; }
  const cambios = [];
  let totalBoleta = 0;
  cants.forEach((inp) => {
    const p = prod(Number(inp.dataset.bcant));
    const cant = Number(inp.value);
    const nuevoCosto = Number($('[data-bcosto="' + p.id + '"]').value);
    const precioAntes = precio(p);
    p.stock += cant;
    totalBoleta += cant * nuevoCosto;
    if (nuevoCosto > p.costo) {
      p.costo = nuevoCosto;
      const precioAhora = precio(p);
      cambios.push({ nombre: p.nombre, antes: precioAntes, ahora: precioAhora });
      etiquetas.push({ nombre: p.nombre, antes: precioAntes, ahora: precioAhora });
    } else { p.costo = nuevoCosto; }
  });
  const nroComp = $('#blNro').value.trim() || ('0001-' + String(40000 + nroBoleta).padStart(8, '0'));
  boletas.push({ id: nroBoleta++, nro: nroComp, prov: Number($('#blProv').value),
    fecha: $('#blFecha').valueAsDate || hoy, total: totalBoleta, estado: 'Pendiente' });

  $('#salidaBoleta').innerHTML =
    '<div class="aviso ok" style="margin-top:14px"><div><b>Boleta registrada por ' + plata(totalBoleta) + ' en estado Pendiente</b>' +
    'Se actualizó el stock de ' + cants.length + ' producto(s).</div></div>' +
    (cambios.length
      ? '<div class="aviso at" style="margin-top:10px"><div><b>Hay que cambiar ' + cambios.length + ' etiqueta(s) de góndola</b>' +
        cambios.map((c) => c.nombre + ': ' + plata(c.antes) + ' → ' + plata(c.ahora)).join('<br>') + '</div></div>'
      : '');
  toast('Boleta confirmada', cambios.length ? cambios.length + ' precio(s) se recalcularon solos.' : 'Stock actualizado sin cambios de precio.', cambios.length ? 'at' : 'ok');
  $$('[data-bcant]').forEach((i) => { i.value = 0; });
  pintarBoleta(); pintarProveedores();
};

$('#btnDevolucion').onclick = () => {
  const pid = Number($('#blProv').value);
  const items = productos.filter((p) => p.prov === pid);
  if (!items.length) { toast('Sin productos', 'Este proveedor no tiene productos vinculados.', 'cr'); return; }
  modal('Registrar devolución a ' + prov(pid).nombre,
    '<p style="margin-top:0;color:var(--ink-soft);font-size:13px">Mercadería fallada o vencida. Se emite una nota de crédito.</p>' +
    '<div class="campo"><label for="dvProd">Producto</label><select id="dvProd">' +
    items.map((p) => '<option value="' + p.id + '">' + esc(p.nombre) + '</option>').join('') + '</select></div>' +
    '<div class="fila"><div><label for="dvCant">Cantidad</label><input type="number" id="dvCant" min="1" value="1"></div>' +
    '<div><label for="dvMotivo">Motivo</label><select id="dvMotivo"><option>Vencida</option><option>Fallada</option><option>Mal estado</option></select></div></div>',
    [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Emitir nota de crédito', fn: () => {
      const p = prod(Number($('#dvProd').value));
      const c = Number($('#dvCant').value) || 1;
      if (p.stock < c) { toast('Stock insuficiente', 'Solo hay ' + p.stock + ' unidades de ' + p.nombre + '.', 'cr'); return false; }
      p.stock -= c;
      const monto = c * p.costo;
      devoluciones.push({ prod: p.nombre, cant: c, monto });
      toast('Nota de crédito emitida', c + ' u. de ' + p.nombre + ' por ' + plata(monto) + '.', 'ok');
      pintarProveedores();
    } }]);
};

/* ============================================================
   10. REPORTES
   ============================================================ */
function pintarReportes() {
  const orden = ventasHist.slice().sort((a, b) => b.c - a.c).slice(0, 8);
  const max = orden[0] ? orden[0].c : 1;
  $('#boxRanking').innerHTML = '<div class="cuerpo">' + orden.map((v, i) => {
    const p = prod(v.p);
    if (!p) return '';
    const pct = (v.c / max) * 100;
    return '<div style="margin-bottom:11px">' +
      '<div style="display:flex;gap:8px;font-size:12.8px;margin-bottom:4px">' +
      '<span style="color:var(--ink-soft);font-family:var(--f-mono);width:18px">' + (i + 1) + '</span>' +
      '<b style="flex:1;min-width:0">' + esc(p.nombre) + '</b>' +
      '<span style="font-family:var(--f-mono)">' + v.c + ' u.</span></div>' +
      '<div style="height:7px;background:var(--surface-2);border-radius:4px;overflow:hidden">' +
      '<div style="height:100%;width:' + pct.toFixed(1) + '%;background:var(--brand-2);border-radius:4px"></div></div></div>';
  }).join('') + '</div>';

  const rubros = {};
  productos.forEach((p) => {
    if (!rubros[p.rubro]) rubros[p.rubro] = { n: 0, margen: 0, valor: 0 };
    rubros[p.rubro].n++;
    rubros[p.rubro].margen += p.margen;
    rubros[p.rubro].valor += p.stock * precio(p);
  });
  $('#boxRubros').innerHTML = '<div class="tabla-env"><table><thead><tr><th>Rubro</th><th class="num">Productos</th><th class="num">Margen prom.</th><th class="num">Valor en stock</th></tr></thead><tbody>' +
    Object.entries(rubros).map(([k, v]) =>
      '<tr><td><span class="chip ma">' + k + '</span></td><td class="num">' + v.n + '</td>' +
      '<td class="num">' + (v.margen / v.n).toFixed(1) + ' %</td>' +
      '<td class="num"><b>' + plata(v.valor) + '</b></td></tr>').join('') +
    '</tbody></table></div>';
}

/* ============================================================
   11. ARRANQUE
   ============================================================ */

/* ---------- CU Gestionar Proveedor ---------- */
function formProveedor(p) {
  const esNuevo = !p;
  modal(esNuevo ? 'Registrar proveedor' : 'Editar proveedor',
    '<div class="campo"><label for="pvNombre">Nombre</label><input type="text" id="pvNombre" value="' + (p ? esc(p.nombre) : '') + '" placeholder="Ej.: Distribuidora Norte"></div>' +
    '<div class="fila"><div><label for="pvRubro">Rubro</label><select id="pvRubro">' +
    ['Almacén', 'Carnicería', 'Limpieza', 'Bebidas'].map((r) => '<option' + (p && p.rubro === r ? ' selected' : '') + '>' + r + '</option>').join('') + '</select></div>' +
    '<div><label for="pvContacto">Teléfono</label><input type="text" id="pvContacto" value="' + (p ? p.contacto : '') + '" placeholder="351 000-0000"></div></div>',
    [{ txt: 'Cancelar', clase: 'sec' }, { txt: esNuevo ? 'Registrar' : 'Guardar', fn: () => {
      const n = $('#pvNombre').value.trim();
      if (!n) { toast('Falta el nombre', 'El proveedor necesita un nombre.', 'cr'); return false; }
      if (esNuevo) {
        proveedores.push({ id: Math.max.apply(null, proveedores.map((x) => x.id)) + 1, nombre: n,
          rubro: $('#pvRubro').value, contacto: $('#pvContacto').value.trim() || '—' });
        toast('Proveedor registrado', n + ' se agregó al catálogo.', 'ok');
      } else {
        p.nombre = n; p.rubro = $('#pvRubro').value; p.contacto = $('#pvContacto').value.trim() || '—';
        toast('Proveedor actualizado', n + ' quedó modificado.', 'ok');
      }
      pintarProveedores();
    } }]);
}
$('#btnNuevoProv').onclick = () => formProveedor(null);
$('#tbProv').addEventListener('click', (e) => {
  const ed = e.target.closest('[data-editprov]');
  const el = e.target.closest('[data-delprov]');
  if (ed) formProveedor(prov(Number(ed.dataset.editprov)));
  if (el) {
    const p = prov(Number(el.dataset.delprov));
    const usados = productos.filter((x) => x.prov === p.id).length;
    if (usados) {
      modal('No se puede eliminar',
        '<div class="aviso cr"><div><b>' + esc(p.nombre) + ' tiene ' + usados + ' producto(s) vinculado(s)</b>' +
        'Cada producto debe tener un proveedor fijo, así que primero hay que reasignar esos productos a otro proveedor.</div></div>');
      return;
    }
    modal('Eliminar proveedor',
      '<p style="margin-top:0">¿Eliminar a <b>' + esc(p.nombre) + '</b> del catálogo de proveedores?</p>',
      [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Eliminar', clase: 'pe', fn: () => {
        proveedores.splice(proveedores.indexOf(p), 1);
        toast('Proveedor eliminado', p.nombre + ' salió del catálogo.', 'at');
        pintarProveedores();
      } }]);
  }
});

/* ---------- CU Gestionar Institución ---------- */
$('#btnNuevaInst').onclick = () => {
  modal('Registrar institución',
    '<p style="margin-top:0;color:var(--ink-soft);font-size:13px">Los clientes institucionales pagan el mismo precio minorista y operan con cuenta corriente.</p>' +
    '<div class="campo"><label for="inNombre">Nombre</label><input type="text" id="inNombre" placeholder="Ej.: Colegio Belgrano"></div>',
    [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Registrar', fn: () => {
      const n = $('#inNombre').value.trim();
      if (!n) { toast('Falta el nombre', 'La institución necesita un nombre.', 'cr'); return false; }
      instituciones.push({ id: Math.max.apply(null, instituciones.map((x) => x.id)) + 1, nombre: n, saldo: 0 });
      toast('Institución registrada', n + ' se agregó con saldo en cero.', 'ok');
      pintarInstitucionales();
    } }]);
};

/* ---------- CU Iniciar Sesión y CU Modificar Contraseña ---------- */
function elegirUsuario(cual) {
  perfilElegido = cual;
  $('#uAdmin').setAttribute('aria-pressed', String(cual === 'admin'));
  $('#uEmpleado').setAttribute('aria-pressed', String(cual === 'empleado'));
  $('#errorAcceso').innerHTML = '';
  $('#clave').focus();
}
$('#uAdmin').onclick = () => elegirUsuario('admin');
$('#uEmpleado').onclick = () => elegirUsuario('empleado');

function ingresar() {
  if ($('#clave').value !== claves[perfilElegido]) {
    $('#errorAcceso').innerHTML = '<div class="aviso cr" style="margin-bottom:12px"><div><b>Contraseña incorrecta</b>Revisá la contraseña e intentá de nuevo.</div></div>';
    $('#clave').value = ''; $('#clave').focus();
    return;
  }
  perfil = perfilElegido;
  $('#acceso').hidden = true;
  $('#app').hidden = false;
  aplicarPerfil();
  irA(perfil === 'admin' ? 'panel' : 'mostrador');
  toast('Sesión iniciada', perfil === 'admin' ? 'Jorge Gregoris · Administrador.' : 'Cajero · perfil Empleado.', 'ok');
}
$('#btnIngresar').onclick = ingresar;
$('#clave').addEventListener('keydown', (e) => { if (e.key === 'Enter') ingresar(); });

$('#btnSalir').onclick = () => {
  $('#app').hidden = true;
  $('#acceso').hidden = false;
  $('#clave').value = '';
  $('#errorAcceso').innerHTML = '';
};

$('#btnCambiarClave').onclick = () => {
  modal('Modificar contraseña',
    '<p style="margin-top:0;color:var(--ink-soft);font-size:13px">Cambiá la contraseña del perfil <b>' +
    (perfilElegido === 'admin' ? 'Administrador' : 'Empleado') + '</b>.</p>' +
    '<div class="campo"><label for="ccActual">Contraseña actual</label><input type="password" id="ccActual"></div>' +
    '<div class="campo"><label for="ccNueva">Contraseña nueva</label><input type="password" id="ccNueva"></div>' +
    '<div class="campo"><label for="ccRepetir">Repetir la nueva</label><input type="password" id="ccRepetir"></div>',
    [{ txt: 'Cancelar', clase: 'sec' }, { txt: 'Guardar', fn: () => {
      if ($('#ccActual').value !== claves[perfilElegido]) { toast('Contraseña incorrecta', 'La contraseña actual no coincide.', 'cr'); return false; }
      const n = $('#ccNueva').value;
      if (n.length < 4) { toast('Contraseña muy corta', 'Tiene que tener al menos 4 caracteres.', 'cr'); return false; }
      if (n !== $('#ccRepetir').value) { toast('No coinciden', 'La nueva contraseña y su repetición son distintas.', 'cr'); return false; }
      claves[perfilElegido] = n;
      toast('Contraseña modificada', 'Ya podés iniciar sesión con la nueva.', 'ok');
    } }]);
};

aplicarPerfil();
pintarPanel();
pintarSugerencias();
pintarCarrito();
elegirUsuario('admin');
