/* Contenido ampliado 6: la situación del amigo que liga fácil, más juegos y frases para «Voy a salir ya». */
'use strict';
const S7 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

GUIA.push({ bloque:'Comparaciones y noches que se repiten', items:[
  S7('g-amigo-liga', 'Sales con un amigo que liga muy fácil y tú no', 'Él se lanza sin pensar y le sale. Tú no haces nada, la noche acaba igual que siempre y vuelves a casa con la autoestima por los suelos.', [
    'No sois iguales y no tienes que funcionar como él. Hay gente impulsiva a la que le sale sin pensar; tú piensas más, y eso tiene otras ventajas (conversación, escucha, planes).',
    'Cambia el objetivo de la noche: no es «ligar», es hacer UNA cosa pequeña. Por ejemplo, hablar con una persona nueva o quedarte en una conversación que empiece tu amigo.',
    'Úsalo de puente: cuando él empiece a hablar con un grupo, únete y habla tú también con alguien de ese grupo. Lo más difícil (empezar) ya lo ha hecho él.',
    'Díselo antes de salir: «Hoy quiero hablar con alguien. Si conoces a un grupo, preséntamelo». A los amigos les suele gustar ayudar.',
    'Antes de entrar, usa «Voy a salir ya»: objetivo, tus frases y una respiración.',
    'Al volver, apunta lo que hiciste, no lo que no pasó: «Hablé con dos personas» es una victoria.'
  ], 'Si la noche acaba igual, no es «nada cambia»: cada noche que lo intentas un poco, cambia algo dentro aunque no se vea. Y la fiesta no es el único sitio: tus puntos fuertes brillan más en sitios más tranquilos.', 'Hacer UNA cosa pequeña la próxima vez que salga con amigos', [
    ['Por qué no funciona compararte', ['Ves sus éxitos desde fuera y tus dudas desde dentro: la comparación nunca es justa.', 'Lo que a él le sale por impulso a ti te sale por práctica. Es más lento, pero luego es más tuyo.', 'Muchos que ligan fácil de fiesta no saben mantener una conversación o una relación. Cada uno tiene su terreno.']],
    ['Si la fiesta no es tu sitio', ['Las discotecas premian el impulso y el ruido. Tú conectas mejor hablando: conciertos pequeños, bares tranquilos, actividades, intercambios, planes.', 'Puedes seguir saliendo de fiesta por pasarlo bien con tus amigos, sin que sea «la prueba» de si ligas o no.']]
  ]),
  S7('g-noche-igual', 'Otra noche en la que no ha pasado nada', 'Vuelves a casa sintiendo que has perdido otra oportunidad y que siempre te pasa lo mismo.', [
    'Para un momento y mira qué sí hiciste: ¿saliste?, ¿hablaste con alguien?, ¿te quedaste aunque te costara? Apúntalo en el diario.',
    'No hagas balance de madrugada: el cansancio y el alcohol hacen que todo parezca peor.',
    'Decide UNA cosa pequeña para la próxima vez, no diez.',
    'Si se repite mucho, llévalo a terapia: el patrón «salgo, no hago nada, me hundo» se puede trabajar.'
  ], 'Que una noche no salga no dice nada de tu futuro.', 'Apuntar al volver de una noche tres cosas que sí hice')
]});

/* Más juegos con el mismo formato que «¿Qué harías?» */
const QUIZ_SENALES = [
  { p:'Te mira, aparta la vista y vuelve a mirarte varias veces mientras hablas con otros.', o:[['Probablemente le llamas la atención.', 1, 'Mirar, apartar y volver a mirar, varias veces, suele indicar interés.'], ['Seguro que le caes mal.', 0, 'No hay nada que apunte a eso.'], ['No significa nada nunca.', 0, 'Una mirada suelta no, pero repetida sí es una pista.']] },
  { p:'Te contesta siempre con una o dos palabras y nunca te pregunta nada.', o:[['Le interesas muchísimo, es tímida.', 0, 'Puede ser timidez, pero si nunca pregunta, lo más probable es poco interés.'], ['Probablemente no tiene mucho interés ahora mismo.', 1, 'Respuestas cortas y sin preguntas, de forma repetida, suelen indicar poco interés.'], ['Tienes que escribirle más para que se anime.', 0, 'Insistir no suele cambiar nada.']] },
  { p:'Mientras habláis, tiene los pies y el cuerpo girados hacia la salida.', o:[['Puede que quiera irse o terminar la conversación.', 1, 'El cuerpo y los pies hacia otro sitio suelen indicar ganas de irse.'], ['Le gustas mucho.', 0, 'Eso no lo indica.'], ['Tienes que hablar más rápido para retenerla.', 0, 'Mejor cerrar con amabilidad.']] },
  { p:'Se acuerda de algo que le contaste hace una semana y te pregunta por ello.', o:[['Es buena señal: le importó lo que le contaste.', 1, 'Acordarse de detalles es una muestra clara de interés (como mínimo, de aprecio).'], ['Tiene buena memoria, sin más.', 0, 'Puede ser, pero sumado a otras cosas es buena señal.'], ['Quiere algo de ti.', 0, 'No hay motivo para pensarlo.']] },
  { p:'Es muy simpática contigo… y con todo el mundo.', o:[['Le gustas, seguro.', 0, 'La simpatía general no es interés concreto.'], ['Es simpática. Fíjate en si te busca a ti en concreto.', 1, 'La clave es si tú recibes algo distinto: te busca, te pregunta, propone.'], ['Es falsa.', 0, 'Ser simpática con todos es una virtud.']] },
  { p:'Le propones un plan y dice: «¡Me encantaría! El sábado no puedo, ¿el domingo?».', o:[['Te está dando largas.', 0, 'Al contrario: propone otro día.'], ['Buena señal: tiene ganas.', 1, 'Proponer una alternativa es una de las señales más claras de interés.'], ['Le da igual.', 0, 'Si le diera igual, no propondría otro día.']] },
  { p:'Se ríe mucho de tus bromas, aunque no sean tan graciosas, y se acerca al hablar.', o:[['Probablemente está a gusto contigo y puede haber interés.', 1, 'Reírse mucho y acercarse son dos pistas que juntas suman.'], ['Se ríe de ti.', 0, 'No hay nada que lo indique.'], ['Ya te ha dado permiso para besarla.', 0, 'Las señales no son permiso: para eso se pregunta.']] },
  { p:'Mira el móvil a menudo mientras habláis y contesta distraída.', o:[['Está interesadísima.', 0, 'Más bien al contrario.'], ['Puede estar ocupada o con poco interés. Cierra con amabilidad o pregúntale si va todo bien.', 1, 'No es un drama: a veces la gente tiene la cabeza en otra cosa.'], ['Tienes que quitarle el móvil.', 0, 'No.']] }
];
const QUIZ_FRASES = [
  { p:'Quieres empezar a hablar con alguien en la cola de un concierto.', o:[['«¿Les has visto antes en directo?»', 1, 'Pregunta sobre algo que compartís: fácil y natural.'], ['«Eres la chica más guapa de aquí.»', 0, 'Demasiado directo para empezar: puede incomodar.'], ['No decir nada y esperar a que te hable ella.', 0, 'Puede que nunca pase.']] },
  { p:'Quieres pedirle el contacto después de una buena conversación.', o:[['«Dame tu número.»', 0, 'Suena a orden.'], ['«Me ha gustado mucho hablar contigo. ¿Te importa si te pido el Instagram?»', 1, 'Dices lo que sientes y le dejas fácil decir que no.'], ['«¿Tienes novio?»', 0, 'Pone presión y no es lo que quieres saber ahora.']] },
  { p:'Quieres proponerle una cita.', o:[['«A ver si un día quedamos.»', 0, 'Demasiado vago: es fácil que no pase nunca.'], ['«¿Te apetece tomar algo el jueves por la tarde?»', 1, 'Concreto y fácil de contestar.'], ['«¿Cuándo tienes libre? Me adapto a todo.»', 0, 'Le pasas todo el trabajo a ella.']] },
  { p:'Te dice que no a un plan.', o:[['«Vale, sin problema.»', 1, 'Respetuoso y deja buena imagen.'], ['«¿Por qué no?»', 0, 'Pide explicaciones y presiona.'], ['«Pues tú te lo pierdes.»', 0, 'Resentido e innecesario.']] },
  { p:'Quieres hacerle un cumplido.', o:[['«Qué buen gusto tienes para la música.»', 1, 'Concreto y sobre algo que ella ha elegido.'], ['«Tienes un cuerpazo.»', 0, 'Centrado en el cuerpo y sin confianza: incomoda.'], ['«Eres perfecta.»', 0, 'Demasiado general y exagerado.']] },
  { p:'Se hace un silencio en la cita.', o:[['«Antes me has dicho que viajaste a Lisboa. ¿Qué tal fue?»', 1, 'Vuelves a algo que dijo: lo más fácil.'], ['«Perdona, soy muy aburrido.»', 0, 'Te pones por debajo sin motivo.'], ['«¿Y qué más?»', 0, 'No da pie a nada concreto.']] },
  { p:'Quieres despedirte de una cita que ha ido muy bien.', o:[['«Bueno, ya hablamos.»', 0, 'Frío y poco claro.'], ['«Me lo he pasado genial. Me apetece mucho repetir.»', 1, 'Claro, cálido y sin presión.'], ['«¿Entonces te gusto o no?»', 0, 'Pone mucha presión.']] },
  { p:'Te pregunta por tu experiencia con otras chicas.', o:[['«No he tenido muchas relaciones, la verdad. ¿Y tú?»', 1, 'Sincero, tranquilo y devuelves la pregunta.'], ['«Uf, muchísimas, ni me acuerdo.»', 0, 'Mentir no ayuda y se nota.'], ['«Prefiero no hablar de eso» con cara seria.', 0, 'Puedes no contarlo, pero mejor con una sonrisa.']] }
];
const FRASES_SALIR = ['¿Y tú de qué conoces a ___?', '¿Qué tal la noche? ¿Conocéis el sitio?', 'Me ha gustado hablar contigo. ¿Te paso mi Instagram?'];
const OBJETIVOS_SALIR = ['Hablar con una persona nueva', 'Saludar yo primero', 'Unirme a una conversación', 'Quedarme mi tiempo mínimo', 'Pedir un contacto', 'Hacer una pregunta de seguimiento'];
