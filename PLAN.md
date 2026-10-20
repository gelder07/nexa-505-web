# Plan de mejoras · Nexa505

Creado: 20 de octubre de 2026

## Fase 0: Decidir el estilo (tú)

**Estilo elegido:** Shelf, https://www.savetoshelf.com/#waitlist (estilo "El producto en acción")

**Secciones de otros sitios** (enlace · qué sección · para qué en Nexa505):
- [x] Typewave, https://typewave.blendmodes.com/ · sección "Normally it takes hours. With Typewave, it only takes seconds!" · pasos numerados: a la izquierda el número, un título corto y una explicación; a la derecha, la pantalla del sistema haciendo ese paso sobre un fondo de color. Para Nexa505: mostrar paso a paso lo que hace el sistema de inventario (buscar un producto, ver existencias y ubicación, registrar una entrada, ver el reporte) con pantallas reales. Captura: `.taste-skill/refs/typewave-pasos.png`
- [x] Plastic, https://myplastic.app/ · bloque de app móvil · a la izquierda, un panel gris con el celular mostrando la app real (con la pantalla en movimiento); a la derecha, un título grande y un párrafo que explica qué hace. Para Nexa505: cada vez que se muestre una app móvil (Contollo, Wellpro en el celular, futuras apps). Captura: `.taste-skill/refs/plastic-app.png`
- [x] Locker Land, https://www.lockerland.com.au/ · carrusel de tarjetas · tarjetas un poco giradas, cada una de un color, con un dibujo grande y su nombre en una etiqueta; se deslizan de lado. Para Nexa505: carrusel de servicios (inventario, webs, landing, automatizaciones, apps, IA, mantenimiento), cada tarjeta con su color y un dibujo o pantalla del servicio, que lleva a su caso o a WhatsApp. Adaptación: sin la cuadrícula de fondo, giros suaves y colores del estilo principal para que no choque con lo sobrio de Shelf. Captura: `.taste-skill/refs/lockerland-carrusel.png`
- [ ] _siguiente sección_

- [x] Revisar los ejemplos de arriba.
- [x] Elegir uno: rediseño con el estilo de Shelf.
- [x] Claude arma el mapa de la página principal con las secciones de referencia.
- [x] Aprobar o ajustar el mapa (abajo). Construido el 20 de octubre de 2026.

## Mapa de la página principal

Regla: Shelf manda en colores, letra, espacios y botones. Las secciones de Typewave, Plastic y Locker Land conservan su forma, pero se visten con ese estilo. Ninguna sección se parece a la de al lado.

| # | Sección | Referencia | Qué muestra |
|---|---|---|---|
| 1 | Barra superior | Shelf | Nexa505 · Servicios, Casos, Precios, Preguntas · botón "Escríbenos por WhatsApp". |
| 2 | Primera pantalla | Shelf (vista de la app) | Título corto, una frase de qué hacemos y el botón de WhatsApp. Debajo, grande, el sistema de inventario funcionando: el visitante escribe un producto ("cemento") y ve cuántos hay y en qué estante están. Es la parte interactiva de la página. |
| 3 | El problema | Shelf ("You save all over the place") | "Tu negocio está regado por todos lados": Excel, cuaderno, WhatsApp, fotos de facturas, la memoria del encargado. Luego "Ahora en un solo lugar", con las frases que ya tiene la web (cada una arma su mensaje de WhatsApp). |
| 4 | Servicios | Locker Land (carrusel) | 7 tarjetas que se deslizan: inventario, webs, landing, automatizaciones, apps, IA y mantenimiento. Cada una con su color, un dibujo o pantalla, y precio desde. Llevan a su caso o a WhatsApp. |
| 5 | Inventario paso a paso | Typewave | A la izquierda, el paso y su explicación; a la derecha, la pantalla haciendo ese paso. 1) Buscas un producto. 2) Ves existencias y estante. 3) Registras una entrada. 4) Ves el reporte del día. Cambia al bajar. |
| 6 | Apps móviles | Plastic | Dos bloques alternados: Contollo (espacios en 3D) y Wellpro en el celular. Celular con la app moviéndose, y al lado título y párrafo. |
| 7 | Casos | Shelf ("Your last saves") | Las webs e IA: Cargo Trans, Wellpro, plataforma de IA para medicina, distribuidora. Pantalla, nombre, rubro y una línea de resultado. Enlace a "Ver todos los casos". |
| 8 | Testimonios **[EJEMPLO]** | Shelf | Las 3 frases ficticias de la fase 1, grandes y sin tarjetas. |
| 9 | Cómo trabajamos | Shelf ("Save it where you found it") | Conversamos 15 minutos → propuesta con precio cerrado → pagas 50% y entregamos por fases → 50% al entregar y te capacitamos. |
| 10 | Precios y plazos | Lista tipo menú (la actual) + cotizador | Cada servicio con su precio y plazo **[EJEMPLO]**. Cotizador: marcas servicios, ves el rango y se abre WhatsApp con el mensaje armado. |
| 11 | Preguntas frecuentes | Shelf ("Before you ask") | ¿Dependo de ustedes? · ¿Cuánto tarda? · ¿Cómo se paga? (50/50) · ¿Fuera de Nicaragua? · ¿Y si no sé qué necesito? · ¿Cuánto cuesta el mantenimiento? (según alcance). |
| 12 | Sobre Nexa505 | Shelf | Un párrafo: una sola persona de principio a fin, desde Nicaragua (+505), 6 años. Experiencia previa en GBM, Compañía Licorera y LAFISE (aclarando que no son clientes). Tecnologías en una línea. |
| 13 | Cierre | Shelf ("Join the waitlist") | "Cuéntanos qué te hace perder tiempo hoy" con el mensaje de WhatsApp listo para enviar. |
| 14 | Pie | Shelf | Nexa505 grande, enlaces, WhatsApp, © 2026. Sin correo hasta tener dominio. |

Fuera del mapa: las fotos de madera, cemento y pulpería (no hay fotos propias; las pantallas hacen ese trabajo) y las cifras sueltas (+6, +8, +10), que pasan a la sección 12.

Orden de construcción: primero la sección 2 como maqueta para fijar colores y letra; con eso aprobado, el resto.

## Fase 1: Lo que hay que conseguir (tú)

Lo marcado **[EJEMPLO]** es provisional: va en la web nueva para ver el diseño completo, pero hay que cambiarlo antes de publicar.

### Imprescindible
- [x] Precio del mantenimiento mensual: varía. En la web dirá "Según alcance".
- [x] Plazos por servicio **[EJEMPLO]**, para cambiar luego:
  - Landing page: 1 a 2 semanas
  - Web autoadministrable: 3 a 4 semanas
  - Automatizaciones: 1 a 3 semanas
  - Sistema de inventario: 6 a 8 semanas
  - App móvil: 8 a 12 semanas
  - Inteligencia artificial: según alcance
- [x] Forma de pago: 50% al inicio y 50% al entregar.
- [ ] Correo con dominio propio: aún no hay dominio. Mientras tanto, el contacto es solo WhatsApp y no se muestra ningún correo.
- [x] Tu foto: no habrá. La confianza la dan las pantallas reales, los casos y el trato directo por WhatsApp.

### Muy recomendado
- [ ] 2 o 3 testimonios reales con nombre, cargo, empresa y permiso escrito. Mientras tanto, **[EJEMPLO]** con personas y empresas ficticias (nunca a nombre de un cliente real):
  - "Antes contábamos el cemento a mano cada vez que alguien preguntaba. Ahora lo vemos en el celular en dos segundos." · María López, administradora, Ferretería El Pilar **[EJEMPLO]**
  - "Cambiamos precios y fotos nosotros mismos, sin esperar a nadie." · Carlos Ruiz, gerente, Distribuidora Ruiz **[EJEMPLO]**
  - "Siempre supe a quién escribirle. La misma persona hizo todo, de principio a fin." · Ana Morales, dueña, Óptica Morales **[EJEMPLO]**
- [ ] Grabaciones de pantalla de 10 a 20 segundos: el inventario buscando un producto, Contollo en 3D y la IA respondiendo. Mientras tanto, **[EJEMPLO]**: Claude anima en código las pantallas que ya existen (`assets/img/ui-*.jpg` y las de los casos), sin videos de productos ajenos.
- [ ] Logo de Nexa505: aún no hay. Mientras tanto, el nombre escrito con la tipografía de la web.
- [ ] Logos de clientes, con su permiso.

### Opcional
- [ ] Enlaces de redes (Instagram, Facebook, LinkedIn).
- [ ] Fotos de clientes usando los sistemas, como la bodega de la distribuidora.
- [ ] El origen de la cifra "+60% de eficiencia". Sin una fuente clara, no se usa.

## Fase 2: Arreglos a la web actual (Claude)

- [x] Llenar la primera pantalla en computadora: ahora la ocupa la demo del inventario.
- [x] Escribir las cifras igual: "+6", "+8", "+10".
- [x] Agregar la imagen de vista previa (`assets/og.png`). Falta poner la dirección completa cuando haya dominio: WhatsApp no lee rutas relativas.
- [ ] Quitar los avisos "[PENDIENTE]" cuando lleguen los datos de la fase 1. Hecho para plazos, pago, mantenimiento y correo; quedan los de las páginas de casos (capturas, resultados, frases de clientes).
- [x] Cotizador rápido: el cliente elige servicios, ve el rango de precio y se abre WhatsApp con el mensaje ya escrito.

## Fase 3: Meter los recursos (Claude, cuando lleguen)

- [x] Crear una sección de testimonios (con los **[EJEMPLO]**, marcados en amarillo).
- [ ] Usar las grabaciones como video en bucle en el inicio y en cada caso. Mientras tanto, las pantallas están animadas en código.
- [ ] Mostrar los logos de clientes en lugar de los nombres en texto.
- [x] Cambiar las fotos de madera y cemento: salieron del sitio; las pantallas hacen ese trabajo.
- [x] Revisar las 7 páginas: el inicio, el listado de casos y los 5 casos.

## Fase 4: Rediseño, si se elige un estilo nuevo (Claude)

- [x] Rehacer la página con el estilo elegido y el mismo contenido.
- [x] Aplicarlo también a las páginas de casos.
- [x] Revisarla en computadora, tablet y celular.

## Fase 5: Publicar (juntos)

- [ ] Dominio y hosting: definir dónde se publica.
- [ ] Revisión final de enlaces, WhatsApp y celular.
- [ ] Publicar.

**Bloquea todo lo demás:** el estilo de la fase 0 y los datos imprescindibles de la fase 1. La fase 2 se puede empezar ya.
