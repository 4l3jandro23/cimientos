/* Contenido ampliado 4: más situaciones, más tips y el juego «¿Qué harías?». */
'use strict';
const S5 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

GUIA.push(
  { bloque:'Redes y llamadas', items:[
    S5('g-historia', 'Responder a una historia de Instagram', 'Ella sube una historia y te apetece escribirle, pero no sabes si queda raro.', ['Responder a una historia es de las formas más naturales de empezar a hablar.', 'Comenta algo concreto: «¡Qué buena pinta! ¿Dónde es?», «Ese sitio me encanta».', 'Si contesta con ganas, sigue; si contesta corto, déjalo ahí.'], 'Si no contesta, no pasa nada: subió la historia para todo el mundo.', 'Responder a una historia de alguien con una pregunta'),
    S5('g-likes', 'Te da «me gusta» a cosas', 'Te da «me gusta» a historias o fotos y no sabes si significa algo.', ['Puede ser interés o simple simpatía. Es una pista pequeña.', 'Si te apetece, aprovecha para escribirle algo de lo que ha visto.'], 'Un «me gusta» no es una declaración: no le des más peso del que tiene.', 'Escribir a alguien que interactúa con mis historias'),
    S5('g-ig-despues', 'Escribirle por Instagram después de conocerla', 'Os habéis seguido tras conoceros y no sabes cómo empezar.', ['Recuerda dónde os conocisteis: «¡Hola! Soy ___, el de la clase de ayer. ¿Qué tal acabó el día?».', 'Si hablasteis de algo concreto, úsalo: «Te paso el sitio del que te hablé».'], 'Si no contesta, no insistas. Ya diste el paso.', 'Escribir a alguien que conocí hace poco'),
    S5('g-muere', 'La conversación de la app se apaga', 'Hablabais bien y de repente cada vez contesta menos.', ['Propón quedar: muchas veces la conversación muere porque se alarga demasiado.', 'Si no responde a eso, déjalo estar.'], 'En las apps esto pasa muchísimo. No es personal.', 'Proponer quedar antes de que una conversación se apague'),
    S5('g-llamada', 'Una llamada o videollamada', 'Te propone hablar por teléfono o por vídeo y te agobia.', ['Es una buena señal: quiere conocerte mejor.', 'Ten a mano un par de temas y algo de beber.', 'Con 15-20 minutos basta. Terminar pronto y bien es mejor que alargarlo.', 'Si te bloqueas: «Estoy un poco nervioso, se me da mejor en persona, jaja».'], 'Si fue raro, en persona suele ser más fácil.', 'Llamar a un amigo en vez de escribirle'),
    S5('g-unmatch', 'Te deshace el match o te deja de seguir', 'Un día ves que ya no está la conversación o que te ha dejado de seguir.', ['Duele un momento, pero es su decisión y no hace falta saber por qué.', 'No le escribas por otra vía para preguntar.'], 'Es algo muy habitual en las apps. Sigue con lo tuyo.', 'Dejar ir algo sin pedir explicaciones')
  ]},
  { bloque:'Momentos incómodos', items:[
    S5('g-ridiculo', 'Haces el ridículo', 'Tropiezas, se te cae algo, dices una palabra mal… delante de ella.', ['Ríete tú primero: «Bueno, mi entrada triunfal». Desactiva cualquier momento raro.', 'No te disculpes mil veces: sigue como si nada.'], 'Estos momentos acercan más de lo que alejan.', 'Reírme de un despiste mío'),
    S5('g-cartera', 'Te has olvidado la cartera', 'Llega la cuenta y no tienes cómo pagar.', ['Dilo con naturalidad y humor: «Qué vergüenza, me he dejado la cartera. ¿Te hago un Bizum ahora mismo?».', 'Paga en cuanto puedas y no lo conviertas en drama.'], 'Le pasa a todo el mundo alguna vez.', 'Llevar siempre el móvil con la app del banco'),
    S5('g-traba', 'Se te traba la lengua', 'Te sale una frase rara, te equivocas de palabra o tartamudeas.', ['Para, sonríe y repítelo despacio: «Lo diré otra vez, que me ha salido fatal».', 'Respira soltando el aire antes de seguir.'], 'La otra persona lo olvida en segundos.', 'Hablar más despacio en mi próxima conversación'),
    S5('g-borde', 'Alguien del grupo es borde contigo', 'Hay una persona que te contesta mal o se ríe de ti.', ['No entres al trapo. Responde con calma o con humor ligero.', 'Habla con el resto del grupo.', 'Si se repite y te molesta, puedes decirlo con calma: «Oye, eso no me ha hecho gracia».'], 'Que alguien sea borde dice más de esa persona que de ti.', 'Responder con calma a un comentario que me molesta'),
    S5('g-ex-de-ella', 'Os encontráis a su ex', 'Estáis juntos y aparece su ex o alguien con quien estuvo.', ['Saluda con educación si te lo presenta y no hagas preguntas incómodas.', 'Si luego quiere hablar de ello, escucha. Si no, no insistas.'], 'Tu tranquilidad en ese momento dice mucho de ti.', 'Mantener la calma en una situación inesperada'),
    S5('g-chiste', 'Haces una broma y nadie se ríe', 'Sueltas un chiste y hay silencio.', ['Sonríe y sigue: «Vale, ese no era para hoy».', 'Reírte de tu propio chiste fallido suele funcionar mejor que el chiste.'], 'Hasta los más graciosos fallan bromas todos los días.', 'Hacer una broma aunque pueda no salir bien')
  ]},
  { bloque:'Fiesta y noche', items:[
    S5('g-bailar', 'Te invita a bailar o te sacan a bailar', 'Alguien te dice de bailar y tú no sabes.', ['Di que sí y avisa con humor: «Te aviso de que bailo fatal».', 'Sigue el ritmo con pasos pequeños, sonríe y fíjate en ella.', 'Nadie va a juzgar tu baile: se fijarán en si te lo pasas bien.'], 'Si fue un desastre, será una anécdota divertida.', 'Bailar un rato aunque me dé vergüenza'),
    S5('g-presion-amigos', 'Tus amigos te empujan a ir a hablarle', 'Tus amigos te animan a acercarte a una chica y te sientes presionado.', ['Puedes ir si te apetece; si no, no hace falta hacerlo por ellos.', 'Si vas, que sea por ti y con naturalidad, no para demostrar nada.', 'Diles con calma: «Gracias, pero lo haré cuando me salga».'], 'Ir o no ir es tu decisión.', 'Decir que no a una presión de grupo con calma'),
    S5('g-borracha', 'Ella ha bebido mucho', 'Habláis y ves que ella va muy bebida, aunque parezca interesada.', ['No es momento de nada más que una conversación amable.', 'Con mucho alcohol no hay consentimiento válido. Nada físico.', 'Si está mal, asegúrate de que está con sus amigas o de que llega bien a casa.', 'Si te interesa, pídele el contacto otro día, sobria.'], 'Cuidar a alguien en ese momento dice muchísimo de ti.', 'Fijarme en cómo está la otra persona antes de nada'),
    S5('g-solo-disco', 'Te quedas solo en la discoteca', 'Tus amigos se van o se pierden y te quedas solo.', ['Escríbeles para encontraros.', 'Ve a la barra o a una zona más tranquila.', 'Si te sientes incómodo, puedes irte a casa: no pasa nada.'], 'Estar solo un rato en una fiesta es más normal de lo que parece.', 'Quedarme diez minutos a gusto aunque esté solo'),
    S5('g-volver', 'Volver a casa al final de la noche', 'Os habéis gustado y llega el momento de irse.', ['Si vivís cerca, puedes ofrecer acompañarla: «¿Quieres que vayamos juntos?». Acepta si dice que no.', 'Pídele el contacto si no lo tienes.', 'Despídete con algo claro: «Me lo he pasado genial contigo».'], 'Al día siguiente escribe con naturalidad.', 'Despedirme diciendo algo bonito'),
    S5('g-resaca', 'Al día siguiente, con vergüenza', 'Te levantas pensando en algo que dijiste o hiciste anoche.', ['Casi nadie se acuerda de lo que tú recuerdas con tanto detalle.', 'Si de verdad hiciste algo mal, un mensaje corto y sincero: «Perdona por lo de ayer, me pasé».', 'Descansa, bebe agua y no te juzgues.'], 'La «vergüenza de resaca» es muy común y pasa sola.', 'Escribir en el diario lo que salió bien de la noche')
  ]},
  { bloque:'Amistades', items:[
    S5('g-amigos-adulto', 'Hacer amigos nuevos siendo adulto', 'Ya no estás en el instituto y hacer amigos parece imposible.', ['Hace falta repetición: ver a la misma gente muchas veces (una actividad semanal).', 'Sé tú quien propone: «¿Os apetece tomar algo después?».', 'Cuando alguien te cae bien, pide el contacto como harías con una chica: «¿Te paso mi número para la próxima?».'], 'Hacer un amigo de verdad lleva meses. Es normal.', 'Proponer un plan a alguien que conozco poco'),
    S5('g-recuperar', 'Recuperar a un amigo de antes', 'Hace tiempo que no hablas con alguien que te importaba.', ['Un mensaje sencillo: «¡Hola! Me he acordado de ti. ¿Qué tal te va?».', 'Si responde con ganas, propón un café.'], 'Mucha gente se alegra de que la busquen, aunque haya pasado tiempo.', 'Escribir a alguien con quien perdí el contacto'),
    S5('g-siempre-yo', 'Siempre eres tú quien propone', 'Sientes que si no propones tú, no quedáis nunca.', ['A mucha gente le cuesta tomar la iniciativa: no siempre es desinterés.', 'Si te pesa, díselo con cariño: «Me encantaría que algún día propusieras tú».', 'Fíjate en si cuando propones dicen que sí con ganas: eso es lo que cuenta.'], 'Ser quien une al grupo es un valor.', 'Proponer un plan esta semana'),
    S5('g-fuera', 'Sientes que te dejan fuera de un grupo', 'Ves planes a los que no te invitan o te sientes de más.', ['Antes de sacar conclusiones, pregunta: «¿Hacéis algo este finde? Me apunto».', 'Busca a una o dos personas del grupo con las que tengas más trato.', 'Si se repite, quizá ese grupo no es para ti, y está bien buscar otro.'], 'No encajar en un grupo no significa no encajar en ninguno.', 'Apuntarme yo a un plan sin esperar a que me inviten')
  ]}
);

TIPS.push(
  ['Primeras impresiones', 'Los primeros segundos: sonrisa, mirada y saludo claro. Lo demás viene después.'],
  ['Primeras impresiones', 'Saluda tú primero: transmite seguridad y calidez a la vez.'],
  ['Primeras impresiones', 'Un apretón de manos firme pero sin apretar, mirando a la cara.'],
  ['Primeras impresiones', 'Llegar a tiempo es la primera muestra de respeto.'],
  ['Escuchar', 'Escuchar bien es no interrumpir y no pensar en tu respuesta mientras habla.'],
  ['Escuchar', 'Resume de vez en cuando lo que te cuenta: «O sea, que al final te fuiste sola». Demuestra que atiendes.'],
  ['Escuchar', 'Pregunta por cómo se sintió, no solo por lo que pasó.'],
  ['Escuchar', 'Si te cuenta un problema, pregunta si quiere un consejo o solo contarlo.'],
  ['Escuchar', 'Deja que termine las frases aunque sepas cómo acaban.'],
  ['Humor', 'No hace falta ser gracioso: con reírte de verdad de lo que te hace gracia ya conectas.'],
  ['Humor', 'El humor que mejor funciona es el de la situación que estáis viviendo.'],
  ['Humor', 'Exagerar algo cotidiano suele hacer gracia: «Esta cola es más larga que mi semana».'],
  ['Humor', 'Nunca bromas sobre el físico de nadie.'],
  ['Fiesta', 'Ve con alguien la primera vez a un sitio nuevo.'],
  ['Fiesta', 'Alterna cada copa con un vaso de agua.'],
  ['Fiesta', 'Las conversaciones de fiesta son cortas: no esperes profundidad.'],
  ['Fiesta', 'Pedir el Instagram es lo normal de noche; mejor quedar de día después.'],
  ['Fiesta', 'Si estás agobiado, sal cinco minutos a la calle.'],
  ['Fiesta', 'Ten claro cómo vuelves a casa antes de salir.'],
  ['Redes', 'Responder a una historia es una forma muy natural de empezar a hablar.'],
  ['Redes', 'Tu Instagram es tu escaparate: unas fotos tuyas haciendo cosas que te gustan ayudan.'],
  ['Redes', 'No juzgues a nadie (ni a ti) por las redes: es la mejor versión de cada uno.'],
  ['Redes', 'Si no contestan un mensaje, no mires si está en línea: te hace daño.'],
  ['Amistad', 'Los amigos se hacen viéndose a menudo: apúntate a algo semanal.'],
  ['Amistad', 'Proponer planes te convierte en alguien a quien la gente quiere cerca.'],
  ['Amistad', 'Acordarte de los cumpleaños y escribir ese día cuida mucho las amistades.'],
  ['Amistad', 'Los amigos de tus amigos son la forma más fácil de conocer gente nueva.'],
  ['Ansiedad', 'La ansiedad sube, llega a un pico y baja. Quédate y verás cómo baja.'],
  ['Ansiedad', 'Antes de un plan, sal a caminar diez minutos.'],
  ['Ansiedad', 'Menos café los días de plan: sube los nervios.'],
  ['Ansiedad', 'Apunta tu miedo de antes y el de después. Con los datos, el miedo pierde fuerza.'],
  ['Ansiedad', 'Lleva en el móvil tu «Carta para ti» para leerla antes de entrar.'],
  ['Ansiedad', 'Si te bloqueas, haz una pregunta: pone el foco en la otra persona.'],
  ['Ansiedad', 'Evitar alivia hoy y pesa mañana. Hazlo pequeño, pero hazlo.'],
  ['Seguridad', 'Di lo que quieres en positivo: «Me apetece ir a…» en vez de «¿no te importaría…?».'],
  ['Seguridad', 'No hace falta justificar todas tus decisiones.'],
  ['Seguridad', 'Pedir perdón está bien cuando toca, no por existir.'],
  ['Seguridad', 'Decir «no lo sé» con calma también da seguridad.'],
  ['Seguridad', 'Mantén tus planes aunque alguien te guste: tu vida sigue siendo tuya.'],
  ['Ligar', 'Mejor diez conversaciones normales que esperar la conversación perfecta.'],
  ['Ligar', 'Si alguien te gusta, búscala para hablar: el interés se nota en buscar a alguien.'],
  ['Ligar', 'Un cumplido sincero y concreto, una vez, vale más que muchos.'],
  ['Ligar', 'Las mejores citas son las que tú también disfrutarías solo: elige planes que te gusten.'],
  ['Ligar', 'No hables de tus ex en las primeras citas.'],
  ['Ligar', 'No preguntes «¿por qué no?» cuando alguien te dice que no.'],
  ['Citas', 'Pregunta por sus planes de futuro con ilusión: «¿Qué te hace ilusión este año?».'],
  ['Citas', 'Si la cita va bien, dilo durante la cita, no solo después.'],
  ['Citas', 'Ofrece compartir algo de comer: crea cercanía.'],
  ['Citas', 'Si no sabes elegir sitio, pregunta qué le apetece y propón dos opciones.'],
  ['Mensajes', 'El día de la cita, un mensaje corto antes: «¡Nos vemos a las 7!».'],
  ['Mensajes', 'Usa emojis con moderación: uno o dos, no diez.'],
  ['Mensajes', 'Si no se te ocurre nada, pregunta por algo que te contó.'],
  ['Cabeza', 'El objetivo no es no tener miedo: es que el miedo no decida por ti.'],
  ['Cabeza', 'Piensa en ti dentro de un año mirando atrás: ¿qué te gustaría haber intentado?'],
  ['Cabeza', 'No eres el único que lo pasa mal: mucha gente lo disimula.'],
  ['Cabeza', 'Tu valor no sube ni baja con cada respuesta de alguien.'],
  ['Cabeza', 'Avanzar es irregular: habrá semanas mejores y peores.'],
  ['Vida', 'Ten un objetivo propio que te ilusione, aparte de ligar.'],
  ['Vida', 'Duerme y come bien: es la base de todo lo demás.'],
  ['Vida', 'Sal a la calle aunque sea solo: los sitios con gente se vuelven familiares.']
);

/* ---------- «¿Qué harías?»: elige la mejor respuesta ---------- */
const QUIZ = [
  { p:'Le propones quedar y te contesta: «Esta semana estoy liada». No propone otro día.', o:[['Le escribes al día siguiente para insistir.', 0, 'Insistir enseguida presiona.'], ['«¡Sin problema! Si te apetece otro día, me dices.» Y lo dejas en su mano.', 1, 'Le das una salida fácil y dejas la puerta abierta.'], ['No contestas y te enfadas.', 0, 'No hay nada que reprochar: tiene derecho a no poder o no querer.']] },
  { p:'En una cita se hace un silencio largo.', o:[['Miras el móvil.', 0, 'Rompe la conexión del todo.'], ['Vuelves a algo que dijo antes: «Antes has dicho que…».', 1, 'Es lo más fácil y casi siempre funciona.'], ['Te disculpas por ser aburrido.', 0, 'No lo eres, y ponerte por debajo no ayuda.']] },
  { p:'Ella te toca el brazo al reírse.', o:[['Le das un beso en ese mismo momento.', 0, 'Un toque no es un permiso. Primero, ver más señales y preguntar.'], ['Sonríes y sigues con naturalidad. Te fijas en si hay más señales.', 1, 'Es buena señal, pero una sola no dice todo.'], ['Te apartas del susto.', 0, 'Puede parecer rechazo.']] },
  { p:'Quieres darle un beso al final de la cita y no estás seguro.', o:[['Lo intentas por sorpresa.', 0, 'Sin saber si quiere, puedes incomodarla.'], ['Le preguntas: «¿Te puedo dar un beso?».', 1, 'Es respetuoso y claro. Solo vale un sí claro.'], ['No haces nada y te vas a casa dándole vueltas.', 0, 'No es grave, pero preguntar es mejor que quedarte con la duda.']] },
  { p:'Te deja en visto un día entero.', o:[['Le mandas tres mensajes más.', 0, 'Presiona y suele alejar.'], ['Esperas. Si en unos días no contesta, un mensaje ligero y ya.', 1, 'Respetas su ritmo sin desaparecer.'], ['Le escribes enfadado.', 0, 'No ayuda nada y no hay motivo.']] },
  { p:'Te pregunta: «¿Has tenido muchas relaciones?».', o:[['Te inventas alguna historia.', 0, 'Mentir se acaba notando y te pone tensión.'], ['«No muchas, la verdad. ¿Y tú?». Tranquilo y sin justificarte.', 1, 'La verdad sencilla basta. No es un examen.'], ['Cambias de tema bruscamente.', 0, 'Se nota y queda más raro.']] },
  { p:'Estás en una fiesta y no conoces a nadie.', o:[['Te vas a los diez minutos.', 0, 'Te pierdes la oportunidad de que baje la ansiedad.'], ['Te acercas a la zona de bebidas y hablas con alguien que esté solo.', 1, 'Es donde más fácil se habla y quien está solo suele agradecerlo.'], ['Te quedas con el móvil en una esquina toda la noche.', 0, 'Te aísla más.']] },
  { p:'Ella dice algo con lo que no estás de acuerdo.', o:[['Le das la razón para no estropearlo.', 0, 'Tener opinión propia atrae más.'], ['«Yo lo veo un poco distinto. ¿Por qué lo piensas?».', 1, 'Opinas con respeto y muestras curiosidad.'], ['Le explicas por qué está equivocada.', 0, 'Suena a discusión y a imponer.']] },
  { p:'Te dice: «Me caes genial, pero te veo como amigo».', o:[['Intentas convencerla de que lo piense mejor.', 0, 'Presiona y estropea la amistad.'], ['«Vale, gracias por decírmelo». Y decides con calma si puedes ser su amigo.', 1, 'Respetas su decisión y cuidas de ti.'], ['Le dejas de hablar al momento sin decir nada.', 0, 'Puedes tomar distancia, pero mejor con educación.']] },
  { p:'Tus amigos te empujan a ir a hablarle a una chica y no te apetece.', o:[['Vas por no quedar mal.', 0, 'Ir por presión suele salir forzado.'], ['«Gracias, pero lo haré cuando me salga.» Y vas si de verdad te apetece.', 1, 'La decisión es tuya.'], ['Te enfadas con tus amigos.', 0, 'Lo hacen con buena intención.']] },
  { p:'Te bloqueas por la ansiedad en mitad de una cita.', o:[['Te vas sin decir nada.', 0, 'Deja a la otra persona confundida.'], ['Vas al baño, respiras soltando el aire largo y vuelves con una pregunta.', 1, 'Te das un respiro y vuelves a poner el foco fuera.'], ['Pides tres copas seguidas.', 0, 'Alivia un rato, pero empeora todo después.']] },
  { p:'Una chica de tu clase de baile te cae muy bien y hay buen rollo desde hace semanas.', o:[['Esperas a que ella dé el paso.', 0, 'Puede que nunca pase: muchas también esperan.'], ['Le propones tomar algo después de clase, los dos o con más gente.', 1, 'Es un paso natural y fácil de responder.'], ['Le escribes una carta larga declarándote.', 0, 'Demasiado de golpe: mejor paso a paso.']] }
];
