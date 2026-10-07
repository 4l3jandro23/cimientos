/* Datos de las herramientas: vista de ella en el simulador, entrenador de preguntas, revisor de mensajes,
   «cómo me ven», plan de 8 semanas y planes de Barcelona. */
'use strict';

/* Lo que ella podría estar pensando en cada escena (no lo sabes: son posibilidades) */
const SIM_ELLA = {
  'cola': ['«Me ha mirado, a ver si dice algo.»', '«Qué nervios este concierto, me aburro en la cola.»', '«Me suena de algo… o no.»'],
  'amigo-chica': ['«Mi amiga ya está hablando con su amigo, qué corte quedarme aquí.»', '«Ojalá él diga algo, yo no sé qué decir.»', '«Parece majo, pero callado.»'],
  'mensaje': ['«De verdad esta semana no puedo, espero que no piense que paso.»', '«Me cae bien, pero no sé si me apetece quedar.»', '«Si propone otro día concreto, voy.»'],
  'cita-soltero': ['«Lo pregunto porque me parece majo y me extraña.»', '«No sé de qué hablar, saco esto.»', '«Quiero saber si arrastra algo.»'],
  'toque': ['«Me cae genial, estoy a gusto.»', '«Toco a todo el mundo cuando me río.»', '«A ver si él hace algo.»'],
  'le-gusta-otro': ['«Confío en él, por eso se lo cuento.»', '«Nunca me he planteado nada con él.»', '«A veces me pregunto si él siente algo.»'],
  'rambla': ['«Si dice que sí, llevo otro cliente al local.»', '«Mejor no insistir con este, se ha dado cuenta.»', '«Un turista fácil.»'],
  'no-contacto': ['«Ha sido simpático, pero no siento nada.»', '«Tengo novio y no sabía cómo decirlo.»', '«Qué corte decir que no, espero que no se lo tome mal.»'],
  'broma-pesada': ['«Qué pesado su amigo, pobre.»', '«Me hace gracia, pero me fijo en cómo reacciona él.»', '«Me da igual lo que digan, me cae bien.»'],
  'tres-de-la-manana': ['(Está dormida. No hay nada que leer en el silencio.)', '«Mañana le contesto, ahora estoy de fiesta.»', '«Si escribe a estas horas, ¿habrá bebido?»'],
  'cuerpo-nervios': ['«Le gusto y está nervioso, qué mono.»', '«¿Será por mí?» (ella también tiene inseguridades)', '«No pasa nada, estamos a gusto igual.»'],
  'amigas': ['«Espero que mis amigas lo hagan sentir cómodo.»', '«Mis amigas son así al principio, luego se abren.»', '«Me fijo en cómo lleva esto.»']
};

/* Estilo genérico para las escenas que crea él */
const SIM_GEN = {
  acerca:['Sabes enseguida si hay algo.', 'Te expones y puede salir un no.', 'Alguien con iniciativa.'],
  pregunta:['La otra persona habla y se siente escuchada.', 'Si solo preguntas, ella no sabe nada de ti.', 'Curioso y atento.'],
  humor:['Quitas peso y creas complicidad.', 'Puede esconder lo que de verdad sientes.', 'Divertido, algo difícil de leer.'],
  sincero:['Claridad y cercanía.', 'Te muestras vulnerable.', 'Honesto y seguro.'],
  espera:['No arriesgas nada.', 'Si la señal no llega, te quedas con la duda.', 'Tranquilo o distante.'],
  evita:['Alivio inmediato.', 'El miedo se mantiene y te quedas con la duda.', 'Cerrado o desinteresado.'],
  agrada:['Cuidas el ambiente.', 'Dejas de lado lo que tú quieres.', 'Amable, algo pasivo.']
};

/* Entrenador de preguntas: temas detectados por palabras clave */
const PREG_TEMAS = [
  { k:/viaj|vacacion|escapad|vuelo|país|ciudad|interrail|mochila/i, n:'un viaje', h:['¿Cuánto tiempo estuviste?', '¿Qué fue lo que más te sorprendió?'], e:['¿Cómo te sentiste al volver?', '¿Hubo algún momento que te marcara?'], c:['¿Adónde irías después?', 'Si volvieras, ¿qué harías distinto?'] },
  { k:/trabaj|curro|oficina|jefe|empresa|proyecto|turno/i, n:'su trabajo', h:['¿A qué te dedicas exactamente?', '¿Cuánto llevas ahí?'], e:['¿Qué es lo que más te gusta de lo que haces?', '¿Cómo llevas ese ritmo?'], c:['Si pudieras cambiar algo de tu trabajo, ¿qué sería?', '¿Es lo que querías hacer de pequeña?'] },
  { k:/mud|piso|compart|barrio|alquil|vivo en|vivir en/i, n:'una mudanza o su casa', h:['¿Desde cuándo vives ahí?', '¿Con quién vives?'], e:['¿Cómo te sientes en el barrio?', '¿Te costó adaptarte?'], c:['¿Qué sitio del barrio me recomendarías?', '¿Qué es lo que más echas de menos de donde vivías antes?'] },
  { k:/músic|concierto|grupo|canción|disco|festival|cantante|spotify/i, n:'música', h:['¿Qué estás escuchando últimamente?', '¿Cuál fue el último concierto al que fuiste?'], e:['¿Qué canción te pone de buen humor?', '¿Hay algún disco que te recuerde a una época?'], c:['¿A quién te gustaría ver en directo?', '¿Qué me recomendarías para descubrir?'] },
  { k:/herman|madre|padre|famil|abuel|prim/i, n:'su familia', h:['¿Tienes hermanos?', '¿Viven cerca?'], e:['¿Os lleváis bien?', '¿Con quién te pareces más?'], c:['¿Qué tradición familiar te gusta?', '¿Qué te dirían ellos de ti?'] },
  { k:/estudi|carrera|máster|universidad|examen|oposicion|curso/i, n:'sus estudios', h:['¿Qué estudias o estudiaste?', '¿Cuánto te queda?'], e:['¿Te gusta o lo haces por obligación?', '¿Cómo lo llevas?'], c:['¿Qué te gustaría hacer con eso?', '¿Qué te llevó a elegirlo?'] },
  { k:/gimnas|correr|deport|fútbol|pádel|yoga|escalad|nadar|entren/i, n:'deporte', h:['¿Cuánto llevas haciéndolo?', '¿Cuántas veces a la semana?'], e:['¿Qué te aporta?', '¿Te despeja la cabeza?'], c:['¿Algún reto que tengas en mente?', '¿Me lo recomendarías para empezar?'] },
  { k:/comid|cocin|restaurante|cena|receta|vermut|bar /i, n:'comida', h:['¿Cuál es tu sitio favorito?', '¿Cocinas tú?'], e:['¿Qué plato te recuerda a casa?', '¿Qué comida te pone de buen humor?'], c:['¿Qué sitio me recomendarías en Barcelona?', '¿Qué receta te sale mejor?'] },
  { k:/perro|gato|mascota/i, n:'su mascota', h:['¿Cómo se llama?', '¿Cuánto tiempo lleva contigo?'], e:['¿Qué es lo que más te gusta de él?', '¿Cómo es su carácter?'], c:['¿Tienes alguna foto?', '¿Qué es lo más gracioso que ha hecho?'] },
  { k:/serie|peli|libro|leer|netflix|película/i, n:'series, pelis o libros', h:['¿Cuál estás viendo o leyendo ahora?', '¿De qué va?'], e:['¿Qué te engancha de eso?', '¿Te ha hecho sentir algo especial?'], c:['¿Cuál me recomendarías?', '¿Cuál es tu favorita de siempre?'] },
  { k:/cansad|estrés|agobi|liad|semana dura|harta|no paro/i, n:'cansancio o estrés', h:['¿Qué ha pasado esta semana?', '¿Es por trabajo o por otra cosa?'], e:['¿Cómo lo estás llevando?', '¿Qué te ayuda a desconectar?'], c:['¿Qué harías si tuvieras un día libre mañana?', '¿Qué te apetece hacer para descansar?'] },
  { k:/ex |ruptura|lo dejé|lo dejamos|separ|relación/i, n:'una relación', h:['¿Hace mucho?', '¿Cómo fue?'], e:['¿Cómo te sientes ahora?', '¿Qué has aprendido?'], c:['¿Qué buscas ahora?', '¿Qué valoras más en alguien?'] },
  { k:/ilusión|me encanta|me flipa|me apasiona|me gusta mucho|sueño|quiero/i, n:'algo que le ilusiona', h:['¿Desde cuándo te gusta?', '¿Cómo empezaste?'], e:['¿Qué sientes cuando lo haces?', '¿Por qué crees que te gusta tanto?'], c:['¿Hasta dónde te gustaría llegar con eso?', '¿Qué es lo siguiente que quieres probar?'] }
];
const PREG_GEN = { h:['¿Y cómo fue?', '¿Cuándo fue eso?'], e:['¿Y cómo te sentiste?', '¿Qué fue lo mejor?'], c:['¿Y ahora qué?', '¿Lo volverías a hacer?'] };

/* «Cómo me ven»: preguntas para tres personas de confianza */
const VEN_PREGUNTAS = [
  '¿Qué tres palabras usarías para describirme?',
  '¿Qué es lo mejor de mí cuando estoy cómodo?',
  '¿Qué hago que hace que la gente se sienta a gusto?',
  '¿En qué crees que me freno o me corto?',
  '¿Qué te sorprendió de mí cuando me conociste mejor?'
];

/* Plan de 8 semanas: cada semana un foco, guías, una escena del simulador y un reto */
const PLAN8 = [
  { t:'Nervios bajo control', foco:'Que los nervios no decidan por ti.', docs:['d-x-nervios', 'd-x-sesgos', 'd-a-gilbert'], esc:'tres-de-la-manana', reto:'Usa el suspiro fisiológico antes de un plan y dite «estoy emocionado».', exp:'«Si me pongo nervioso, se va a notar mucho.»' },
  { t:'Conversación que fluye', foco:'Preguntas de seguimiento, espejo y etiqueta.', docs:['d-x-preguntas', 'd-a-voss', 'd-a-informacion-gratuita'], esc:'amigo-chica', reto:'En tres conversaciones, haz al menos una pregunta de seguimiento y un espejo.', exp:'«Me voy a quedar en blanco y será incómodo.»' },
  { t:'Presencia y mirada', foco:'Estar en la conversación y no en tu cabeza.', docs:['d-a-cabane', 'd-x-mirada', 'd-a-schafer'], esc:'amigas', reto:'Saluda a tres personas con flash de cejas y sonrisa.', exp:'«Si miro a los ojos, me sentiré incómodo y lo notarán.»' },
  { t:'Leer señales con datos', foco:'Pruebas pequeñas en vez de adivinar.', docs:['d-x-senales', 'd-a-moore', 'd-microgestos'], esc:'toque', reto:'Haz una propuesta pequeña («¿un café?») y mira la respuesta, no los gestos.', exp:'«Si propongo algo, me dirá que no.»' },
  { t:'Contacto y cercanía', foco:'Kino paso a paso, siempre leyendo la respuesta.', docs:['d-kino', 'd-a-intimidad-morris', 'd-a-tipos-toque'], esc:'cola', reto:'En una conversación con buen rollo, un toque breve en el brazo al reír. Mira cómo responde.', exp:'«Si toco a alguien, le molestará.»' },
  { t:'Proponer y quedar', foco:'Pasar de hablar a hacer planes concretos.', docs:['d-cortejo', 'd-x-dificil', 'd-planes-cita'], esc:'mensaje', reto:'Propón un plan concreto (día, sitio y hora) a alguien.', exp:'«Si propongo un plan, quedaré como un pesado.»' },
  { t:'Rechazo y límites', foco:'Que un no deje de dar tanto miedo.', docs:['d-miedo-rechazo', 'd-x-rechazo-sens', 'd-a-verguenza'], esc:'no-contacto', reto:'Haz un ejercicio de ataque a la vergüenza y pide algo con riesgo de un no.', exp:'«Un no me hundirá toda la noche.»' },
  { t:'Intimidad sin examen', foco:'Quitar frenos y presión.', docs:['d-a-frenos', 'd-a-suficiente', 'd-a-sensate'], esc:'cuerpo-nervios', reto:'Escribe tus tres condiciones para estar a gusto en la intimidad.', exp:'«Si estoy con alguien, mi cuerpo me fallará.»' }
];

/* Planes de Barcelona por tipo (no por locales concretos, para que no se queden viejos) */
const PLANES_BCN = [
  { t:'Vermut de domingo en un barrio con mercado', con:['cita', 'amigos', 'solo'], m:['dia'], p:1, e:'tranquilo', z:'Sant Antoni, Gràcia o Poble-sec', d:'«¿Te apetece un vermut el domingo a mediodía?»', q:'¿Cuál es tu plan de domingo ideal?' },
  { t:'Paseo con vistas al atardecer', con:['cita', 'amigos'], m:['tarde'], p:1, e:'tranquilo', z:'Búnkers del Carmel, Montjuïc o el Turó de la Rovira', d:'«¿Vemos el atardecer desde arriba el jueves?»', q:'¿Cuál es tu rincón favorito de la ciudad?' },
  { t:'Concierto pequeño en una sala', con:['cita', 'amigos', 'solo', 'conocer'], m:['noche'], p:2, e:'activo', z:'Gràcia, Poble-sec, Raval o Poblenou', d:'«Toca un grupo que te va a gustar el viernes, ¿te vienes?»', q:'¿Qué concierto te ha marcado?' },
  { t:'Exposición o museo con café después', con:['cita', 'solo'], m:['dia', 'tarde'], p:1, e:'tranquilo', z:'Montjuïc, el Born o el Raval', d:'«Hay una exposición que me apetece ver, ¿vamos y tomamos algo luego?»', q:'¿Qué te ha llamado más la atención?' },
  { t:'Ruta corta por la montaña', con:['cita', 'amigos', 'conocer'], m:['dia'], p:1, e:'activo', z:'Collserola o la Carretera de les Aigües', d:'«¿Te apetece una ruta suave el sábado por la mañana?»', q:'¿Qué haces para desconectar?' },
  { t:'Taller de una tarde (cerámica, cocina, fotografía)', con:['cita', 'solo', 'conocer'], m:['tarde'], p:2, e:'activo', z:'Gràcia, Sant Antoni o Poblenou', d:'«He visto un taller de cerámica, ¿te animas?»', q:'¿Qué te gustaría aprender a hacer?' },
  { t:'Intercambio de idiomas', con:['solo', 'conocer'], m:['tarde', 'noche'], p:1, e:'tranquilo', z:'Centro, Gràcia o Eixample', d:'(Plan para ir solo y conocer gente.)', q:'¿Cómo has llegado a Barcelona?' },
  { t:'Bar de juegos de mesa', con:['cita', 'amigos', 'conocer'], m:['tarde', 'noche'], p:1, e:'tranquilo', z:'Gràcia o Eixample', d:'«¿Te apetece una partida a algo y unas cañas?»', q:'¿Eres de las que se pican cuando pierden?' },
  { t:'Mercadillo o mercado de segunda mano', con:['cita', 'amigos', 'solo'], m:['dia'], p:1, e:'tranquilo', z:'Poblenou, Sant Antoni o el Born', d:'«¿Damos una vuelta por el mercadillo y buscamos algo raro?»', q:'¿Qué es lo más raro que has comprado?' },
  { t:'Bici o paseo por la playa y chiringuito', con:['cita', 'amigos'], m:['dia', 'tarde'], p:1, e:'activo', z:'Poblenou, Bogatell o Barceloneta', d:'«¿Paseamos por la playa y tomamos algo?»', q:'¿Eres más de playa o de montaña?' },
  { t:'Cine en versión original y comentarla', con:['cita', 'amigos', 'solo'], m:['tarde', 'noche'], p:1, e:'tranquilo', z:'Gràcia o Eixample', d:'«Estrenan una peli que me apetece, ¿vamos y luego la comentamos?»', q:'¿Qué peli te ha cambiado algo?' },
  { t:'Grupo de running o de senderismo', con:['solo', 'conocer'], m:['dia'], p:1, e:'activo', z:'Ciutadella, Montjuïc o Collserola', d:'(Plan para ir solo, repetir y conocer gente.)', q:'¿Cuánto lleváis corriendo juntos?' },
  { t:'Clase de baile de iniciación', con:['solo', 'conocer', 'cita'], m:['noche'], p:1, e:'activo', z:'Gràcia, Eixample o Sants', d:'«¿Probamos una clase de salsa o swing?»', q:'¿Habías bailado antes?' },
  { t:'Fiesta de barrio o verbena', con:['amigos', 'conocer'], m:['noche'], p:1, e:'activo', z:'Gràcia (agosto), Sants, Poble-sec', d:'«Son las fiestas de Gràcia, ¿nos vemos allí?»', q:'¿Cuál es la calle mejor decorada que has visto?' },
  { t:'Picnic en un parque', con:['cita', 'amigos'], m:['dia', 'tarde'], p:1, e:'tranquilo', z:'Ciutadella, Turó Park o jardines de Montjuïc', d:'«¿Hacemos un picnic el sábado? Yo llevo algo.»', q:'¿Qué llevarías a un picnic perfecto?' },
  { t:'Escapada de un día en tren', con:['cita', 'amigos'], m:['dia'], p:2, e:'activo', z:'Sitges, Girona, Tarragona o Montserrat', d:'«¿Una escapada a Sitges el domingo?»', q:'¿Cuál es tu escapada favorita cerca de aquí?' },
  { t:'Café en una librería o cafetería tranquila', con:['cita', 'solo'], m:['dia', 'tarde'], p:1, e:'tranquilo', z:'Gràcia, Sant Antoni o el Born', d:'«¿Un café tranquilo esta semana?»', q:'¿Qué estás leyendo?' },
  { t:'Charla o encuentro de tecnología o IA', con:['solo', 'conocer'], m:['tarde'], p:1, e:'tranquilo', z:'22@ (Poblenou) o centros culturales', d:'(Plan para ir solo, con un tema en común con la gente.)', q:'¿En qué estás trabajando ahora?' },
  { t:'Bar con música en directo', con:['cita', 'amigos', 'solo'], m:['noche'], p:1, e:'tranquilo', z:'Gràcia, Born o Raval', d:'«Hay música en directo el jueves, ¿te apetece?»', q:'¿Qué música te gusta en directo?' },
  { t:'Cena para cocinar juntos', con:['cita', 'amigos'], m:['noche'], p:1, e:'tranquilo', z:'En casa', d:'«¿Cocinamos algo juntos el viernes?»', q:'¿Cuál es tu plato estrella?' }
];

/* Rehacer «Tips rápidos» con todos los tips cargados */
(() => {
  const d = DOCS.find(x => x.id === 'd-tips');
  if (d) d.secciones = [...new Set(TIPS.map(t => t[0]))].map(c => [c, TIPS.filter(t => t[0] === c).map(t => t[1])]);
})();
