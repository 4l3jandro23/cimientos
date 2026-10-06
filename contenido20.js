/* Contenido ampliado 19: autoestima y su origen, ira, bondad con límites, narcisismo, visibilidad, propósito, amor y atracción. */
'use strict';
const S20 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

DOCS.push(
  { id:'d-autoestima-infancia', grupo:'yo', icono:'🌱', titulo:'La autoestima nace en la infancia… y se puede cambiar', sub:'Por qué no estás «jodido»', secciones:[
    ['Lo que es verdad', ['La infancia deja huella: cómo te hablaron, cuánto te validaron, si te compararon o te criticaron, si te sentiste visto. Eso moldea la voz con la que te hablas hoy.', 'Por eso muchas personas amables y capaces se sienten «no suficientes» sin saber por qué.']],
    ['Lo que también es verdad', ['No es una condena. El cerebro y las creencias siguen cambiando toda la vida. Lo que se aprendió, se puede reaprender.', 'Hay un concepto que se llama «apego seguro ganado»: personas que no lo tuvieron de pequeñas lo construyen de adultas con experiencias nuevas, relaciones sanas y terapia.', 'Tú ya lo estás haciendo: tu último año socializando mejor y ir a terapia es exactamente cómo se cambia.']],
    ['Cómo se reconstruye', ['Experiencias nuevas: cada vez que haces algo que temías y sobrevives, tu cerebro actualiza el dato.', 'Relaciones que te traten bien: amigos y personas que te respeten corrigen la voz interna.', 'Terapia: ayuda a ver de dónde viene cada creencia y a cambiarla.', 'Acciones, no solo pensamientos: lo que haces cambia lo que crees de ti.']],
    ['Tres hábitos diarios', ['Hablarte como le hablarías a un amigo.', 'Apuntar cada noche una cosa que hiciste bien.', 'Hacer una cosa pequeña que te dé miedo cada semana.']],
    ['Señales de que avanzas', ['Te recuperas antes de un mal día.', 'Dices que no con menos culpa.', 'Te animas a proponer.', 'Ya no necesitas tanta aprobación.']],
    ['Para llevar a terapia', ['Preguntas útiles: ¿qué frases me decían de pequeño? ¿Qué creo de mí por eso? ¿Qué evidencia tengo hoy que lo contradice?']]
  ]},
  { id:'d-pilares-autoestima', grupo:'yo', icono:'🏛️', titulo:'Seis pilares de una autoestima sana', sub:'Qué trabajar, uno a uno', secciones:[
    ['1. Vivir con atención', ['Estar presente, ver la realidad y no solo tus miedos.']],
    ['2. Aceptarte', ['Reconocer lo que eres, incluidas tus partes que no te gustan, sin castigarte.']],
    ['3. Responsabilidad', ['Asumir que tu vida depende en buena parte de ti. Te da poder para cambiar.']],
    ['4. Afirmarte', ['Decir lo que piensas y quieres con respeto. Poner límites.']],
    ['5. Propósito', ['Tener metas pequeñas y grandes que te importen. Avanzar da autoestima.']],
    ['6. Integridad', ['Que lo que dices, piensas y haces coincida. Cumplir tus promesas contigo mismo.']],
    ['Cómo usarlo', ['Pon una nota del 1 al 10 a cada pilar y elige uno para trabajar este mes con una acción concreta.']]
  ]},
  { id:'d-limite-elegante', grupo:'calle', icono:'🛑', titulo:'Cómo poner un límite con elegancia', sub:'No es egoísmo, es salud mental', secciones:[
    ['Qué es', ['Un límite es decir hasta dónde llegas, no obligar al otro. Es cuidar lo tuyo.']],
    ['Pasos', ['Elige el momento y mantén la calma.', 'Dilo con una frase clara: «Eso no me viene bien», «Prefiero que no me hables así».', 'Di lo que sí puedes hacer.', 'Si insisten, repite y, si hace falta, haz una consecuencia: te vas, cortas la conversación.']],
    ['Sin culpa', ['Sentir culpa al principio es normal: es un músculo nuevo. No significa que lo estés haciendo mal.']],
    ['Cuando es muy grave', ['Si hay insultos, amenazas o abuso, aléjate y pide ayuda. No hay que justificarse.']]
  ]},
  { id:'d-conflictivas', grupo:'calle', icono:'⚡', titulo:'Personas conflictivas y manipuladoras: cómo protegerte', sub:'Identificarlas y cuidar tu paz', secciones:[
    ['Señales', ['Siempre hay drama a su alrededor y la culpa es de otros.', 'Te hacen sentir mal después de hablar con ellas.', 'No aceptan un no y castigan con silencio o enfado.', 'Cambian de versión según les convenga.']],
    ['Cómo protegerte', ['Reduce el contacto o la información personal que compartes.', 'No entres en discusiones sin fin: «Veo que opinamos distinto».', 'Mantén tus límites y repítelos con calma.', 'Apóyate en gente de confianza.']],
    ['No te toca arreglarlo', ['No eres responsable de cambiar a nadie. Tu papel es cuidarte.']]
  ]},
  { id:'d-narcisismo', grupo:'calle', icono:'🪞', titulo:'Narcisismo: señales de alerta', sub:'Frases y actitudes que deben ponerte en guardia', secciones:[
    ['Señales', ['Necesita admiración constante y se siente superior.', 'Poca empatía: tus problemas «le aburren» o los minimiza.', 'Al principio es muy encantador y luego te devalúa.', 'Nunca pide perdón de verdad y se hace la víctima.', 'Te hace dudar de ti.']],
    ['Frases típicas', ['«Estás exagerando».', '«Sin mí no serías nadie».', '«Eso nunca lo dije».', '«Eres demasiado sensible».']],
    ['Cómo actuar', ['No lo etiquetes ni lo diagnostiques: fíjate en los hechos y en cómo te sientes.', 'Pon límites claros y mantén el contacto mínimo.', 'No intentes demostrarle nada. Cuídate y busca apoyo.']]
  ]},
  { id:'d-bondad', grupo:'yo', icono:'💛', titulo:'Bondad buena y bondad mala', sub:'No te conviertas en víctima de tu propia bondad', secciones:[
    ['La bondad buena', ['Ayudas porque quieres, sin esperar que te lo devuelvan de golpe, y sabes decir que no.']],
    ['La bondad mala', ['Ayudas por miedo a que te rechacen, para que te quieran o para evitar conflictos. Acaba en resentimiento.']],
    ['Cómo distinguirla', ['¿Lo hago por gusto o por miedo? ¿Me siento bien después o agotado y enfadado?']],
    ['Cómo equilibrar', ['Añade límites a tu amabilidad.', 'Da a quien da.', 'Cuida de ti primero: no puedes dar lo que no tienes.']]
  ]},
  { id:'d-ira', grupo:'yo', icono:'🌋', titulo:'La ira: cómo manejarla sin que te arruine', sub:'Entenderla y soltarla', secciones:[
    ['Qué es', ['La ira avisa de que algo importante está en juego (un límite, una injusticia). No es mala; lo problemático es lo que haces con ella.']],
    ['En el momento', ['Para seis segundos y respira. Sal de la situación si hace falta.', 'No escribas ni mandes nada enfadado.', 'Mueve el cuerpo: andar rápido, estirar.']],
    ['Después', ['Pregúntate qué hay debajo: miedo, dolor, cansancio.', 'Expresa lo que necesitas con calma: «Me sentó mal esto. Me gustaría que…».']],
    ['A largo plazo', ['Duerme, haz ejercicio y trabaja el estrés.', 'Si te desborda con frecuencia, habla con tu psicóloga.']]
  ]},
  { id:'d-visibilidad', grupo:'carisma', icono:'🔦', titulo:'Destacar sin presumir', sub:'El error silencioso de ser invisible', secciones:[
    ['Por qué importa', ['Si nadie sabe lo que haces o piensas, no te ven. Ser invisible no es humildad: es perder oportunidades.']],
    ['Cómo hacerte visible con naturalidad', ['Cuenta lo que haces con ilusión y sin exagerar: «Estoy aprendiendo esto y me encanta».', 'Comparte lo que te interesa y pregunta por lo suyo.', 'Habla en las reuniones o planes, aunque sea una frase corta.', 'Acepta cumplidos con «gracias».']],
    ['Humildad real', ['Reconocer a los demás, usar «nosotros» y compartir mérito te hace destacar mejor que presumir.']]
  ]},
  { id:'d-carisma-entrena', grupo:'carisma', icono:'🔥', titulo:'El carisma se entrena', sub:'Presencia, calidez y seguridad', secciones:[
    ['Los tres ingredientes', ['Presencia: estar de verdad con quien tienes delante.', 'Calidez: mostrar interés y buena voluntad.', 'Seguridad: hablar con calma y sin necesidad de aprobación.']],
    ['Ejercicios sencillos', ['Una conversación al día con presencia total: sin móvil.', 'Un cumplido sincero al día.', 'Grabarte hablando y mejorar un detalle cada vez.']],
    ['Sin fingir', ['El carisma real viene de ser tú con atención al otro. Fingir se nota y cansa.']]
  ]},
  { id:'d-proposito', grupo:'yo', icono:'🧭', titulo:'Tu propósito en 15 minutos', sub:'Un ejercicio sencillo (estilo ikigai)', secciones:[
    ['Cuatro preguntas', ['¿Qué te gusta hacer?', '¿En qué eres bueno?', '¿Qué necesita el mundo que tú podrías aportar?', '¿Por qué podrían pagarte?']],
    ['Cómo hacerlo', ['Escribe cinco respuestas por pregunta. Busca lo que se repite o se cruza.', 'No busques «el propósito de tu vida»: busca el siguiente paso con sentido.']],
    ['Para ti', ['Piensa en tus aficiones (música, IA, planes en Barcelona, viajar) y busca dónde se cruzan con lo que haces y con lo que te dan.']]
  ]},
  { id:'d-test-vida', grupo:'yo', icono:'🎛️', titulo:'Detecta qué falla en tu vida en 5 minutos', sub:'La rueda de la vida', secciones:[
    ['Cómo se hace', ['Puntúa del 1 al 10 estas áreas: salud, descanso, amigos, pareja o ligar, trabajo, dinero, ocio, crecimiento personal.', 'Mira cuáles están más bajas y cuáles más altas.']],
    ['Qué hacer', ['Elige una o dos áreas bajas y una acción pequeña para cada una este mes.', 'Repite el test cada tres meses y compara.']],
    ['Importante', ['No es un examen. Es un mapa para saber dónde poner energía.']]
  ]},
  { id:'d-felicidad', grupo:'yo', icono:'☀️', titulo:'Cinco hábitos que mejoran el ánimo', sub:'Respaldados por la investigación', secciones:[
    ['Los cinco', ['Dormir bien y a horas regulares.', 'Moverte de forma regular.', 'Relaciones: tiempo de calidad con amigos y familia.', 'Gratitud: apuntar tres cosas buenas al día.', 'Naturaleza y luz solar cada día.']],
    ['Extras', ['Ayudar a alguien de vez en cuando.', 'Limitar noticias y redes.', 'Tener algo que te ilusione en el calendario.']],
    ['Cómo empezar', ['Elige uno y hazlo una semana. Luego añade otro.']]
  ]},
  { id:'d-enamorarse', grupo:'ligar', icono:'💞', titulo:'Qué pasa al enamorarse y después', sub:'La ciencia, sin humo', secciones:[
    ['La fase de enamoramiento', ['Al principio hay mucha ilusión y obsesión por la otra persona (dopamina). Es intensa pero no dura para siempre.']],
    ['Después', ['Llega una fase más tranquila y profunda: el apego, la confianza y el compañerismo. No es «menos amor»: es otro tipo.']],
    ['Lo que mantiene una relación', ['Comunicación, respeto, humor, tiempo compartido y capacidad de resolver problemas.']],
    ['Mitos', ['Las feromonas humanas no están demostradas como «imán». El cuerpo influye, pero no decide solo.', 'El amor se construye con decisiones diarias.']]
  ]},
  { id:'d-toxicas', grupo:'calle', icono:'🔁', titulo:'Por qué a veces buscamos personas que nos hacen daño', sub:'Entenderlo para cambiarlo', secciones:[
    ['Qué pasa', ['Lo conocido nos resulta «seguro» aunque duela. Si de pequeños aprendimos que el cariño es incierto, de mayores podemos buscar lo mismo.']],
    ['El refuerzo intermitente', ['Cuando alguien da cariño a veces y a veces no, nos engancha más. Por eso lo bueno de vez en cuando atrapa.']],
    ['Cómo romper el patrón', ['Fíjate en tus patrones: ¿qué tienen en común las personas que me hacen daño?', 'Prueba a darte tiempo con personas «aburridas» y estables: al principio parece falta de chispa y es calma.', 'Trabájalo en terapia: es de lo que mejor funciona.']]
  ]}
);

GUIA.push(
  { bloque:'Tú y tu cabeza: más a fondo', items:[
    S20('g-infancia', 'Sientes que tu autoestima viene de la infancia', 'Piensas que si te criaron así, ya no hay remedio.', [
      'La infancia influye, pero no decide. El cerebro cambia toda la vida.',
      'Los hábitos de cada día (cómo te hablas, lo que haces) la reconstruyen poco a poco.',
      'Rodéate de personas que te traten bien y trabaja en terapia lo que arrastras.',
      'Fíjate en lo que ya has cambiado: eso es la prueba.'
    ], 'No estás roto. Estás aprendiendo cosas que no te enseñaron a tiempo.', 'Apuntar tres cosas que he cambiado en el último año'),
    S20('g-ira', 'Te enfadas y luego te arrepientes', 'Notas la rabia y a veces dices o haces cosas que no quieres.', [
      'Para seis segundos y respira.',
      'Sal de la situación si hace falta.',
      'No mandes mensajes enfadado.',
      'Cuando pase, pregunta qué había debajo: miedo, dolor o cansancio.'
    ], 'La ira se educa con práctica.', 'Respirar seis segundos antes de contestar cuando me enfado'),
    S20('g-narcisista', 'Alguien cercano te hace sentir pequeño', 'Te desprecia, te corrige todo y se hace la víctima.', [
      'Fíjate en los hechos: ¿cómo te sientes después de verle?',
      'Pon límites claros y reduce el contacto.',
      'No intentes cambiarle ni demostrarle nada.',
      'Habla con alguien de confianza y con tu psicóloga.'
    ], 'Cuidar tu paz no es egoísmo.', 'Decidir un límite concreto con esa persona'),
    S20('g-bondad-mala', 'Ayudas siempre y acabas resentido', 'Dices que sí a todo y luego te enfadas contigo.', [
      'Pregúntate: ¿lo hago por gusto o por miedo a que me dejen?',
      'Prueba a decir «hoy no puedo» una vez.',
      'Da a quien da.',
      'La bondad con límites dura más.'
    ], 'No te conviertas en víctima de tu propia bondad.', 'Decir «hoy no puedo» una vez a la semana'),
    S20('g-invisible', 'Sientes que pasas desapercibido', 'En el trabajo y en los planes, nadie nota lo que haces.', [
      'Cuenta lo que haces con ilusión y sin exagerar.',
      'Aporta una frase en cada reunión o plan.',
      'Acepta cumplidos con un «gracias».',
      'Habla de tus ideas, no solo de las de otros.'
    ], 'Ser visible no es presumir.', 'Aportar una idea en la próxima reunión'),
    S20('g-sin-proposito', 'No sabes qué quieres hacer con tu vida', 'Notas rutina y falta de dirección.', [
      'Haz la rueda de la vida y elige una o dos áreas.',
      'Responde a las cuatro preguntas del propósito.',
      'Prueba cosas pequeñas nuevas cada mes.',
      'No busques «el propósito»: busca el siguiente paso.'
    ], 'La dirección se descubre andando.', 'Hacer la rueda de la vida esta semana'),
    S20('g-toxicas', 'Te atraen personas que luego te hacen daño', 'Ves un patrón en quien eliges.', [
      'Apunta qué tienen en común.',
      'Date tiempo con personas estables aunque al principio parezcan «sin chispa».',
      'Pregunta en terapia por tus patrones de apego.',
      'Aprende a ver los hechos repetidos.'
    ], 'Reconocer el patrón es el primer paso para cambiarlo.', 'Escribir mis patrones en el diario'),
    S20('g-pasion-baja', 'La ilusión del principio baja', 'Llevas unos meses y ya no es tan intenso.', [
      'Es normal: el enamoramiento baja y llega algo más profundo.',
      'Mira si hay confianza, respeto y ganas de estar.',
      'Habladlo con calma.',
      'No confundas intensidad con amor.'
    ], 'El amor se construye con decisiones diarias.', 'Preguntarme qué valoro de esa relación'),
    S20('g-limite-elegante', 'Quieres poner un límite sin que sea un drama', 'Te cuesta decir hasta aquí a alguien.', [
      'Elige el momento y mantén la calma.',
      'Dilo claro: «Eso no me viene bien».',
      'Di lo que sí puedes hacer.',
      'Si insisten, repite con calma.'
    ], 'La culpa inicial es normal y baja con la práctica.', 'Practicar un límite pequeño hoy'),
    S20('g-hacer-test', 'Sientes que algo falla pero no sabes qué', 'Estás incómodo con tu vida y no ves por dónde empezar.', [
      'Puntúa del 1 al 10 salud, amigos, ligar, trabajo, dinero, ocio y crecimiento.',
      'Elige la más baja y una acción pequeña.',
      'Repite el test cada tres meses.',
      'Habla con tu psicóloga de las áreas más bajas.'
    ], 'Es un mapa, no un examen.', 'Hacer el test de las áreas de mi vida'),
    S20('g-felicidad', 'Quieres estar mejor de ánimo con hábitos sencillos', 'No sabes por dónde empezar.', [
      'Elige un hábito: dormir, moverte, quedar con alguien o apuntar gratitud.',
      'Hazlo una semana antes de añadir otro.',
      'Sal a la luz natural cada día.',
      'Limita noticias y redes cuando te sientan mal.'
    ], 'Pequeños hábitos cambian mucho a las pocas semanas.', 'Empezar un solo hábito esta semana')
  ]}
);

TIPS.push(
  ['Autoestima', 'La infancia deja huella, pero no es una condena: lo aprendido se puede reaprender.'],
  ['Autoestima', 'Cada cosa que haces y temías actualiza lo que tu cerebro cree de ti.'],
  ['Autoestima', 'Rodéate de personas que te traten bien: corrigen la voz interna.'],
  ['Autoestima', 'Apunta cada noche algo que hiciste bien. Es un entrenamiento, no un lujo.'],
  ['Autoestima', 'Tu último año de mejora es la prueba de que puedes cambiar.'],
  ['Autoestima', 'Terapia: no es para gente «rota», es para aprender a tratarte mejor.'],
  ['Límites', 'Poner un límite no es egoísmo: es salud mental.'],
  ['Límites', 'La culpa al decir que no es un músculo nuevo: baja con la práctica.'],
  ['Límites', 'Di lo que sí puedes hacer y no solo lo que no.'],
  ['Límites', 'Un límite sin consecuencia es una petición. Decide qué harás si no se respeta.'],
  ['Calle', 'Las personas conflictivas se reconocen por cómo te sientes después de hablar con ellas.'],
  ['Calle', 'No tienes que arreglar a nadie. Tu papel es cuidarte.'],
  ['Calle', 'Frases como «estás exagerando» cada vez que expresas algo, son una señal.'],
  ['Calle', 'Lo conocido nos parece seguro aunque duela: por eso repetimos patrones.'],
  ['Calle', 'Si alguien da cariño a veces y a veces no, engancha. No es amor: es refuerzo intermitente.'],
  ['Cabeza', 'La ira avisa de que algo importa. Lo que cuenta es lo que haces con ella.'],
  ['Cabeza', 'Seis segundos de pausa y una respiración cambian muchas respuestas.'],
  ['Cabeza', 'No mandes nada enfadado. Escríbelo y envíalo mañana (o no).'],
  ['Cabeza', 'No busques «el propósito de tu vida»: busca el siguiente paso con sentido.'],
  ['Cabeza', 'La rueda de la vida es un mapa: te dice dónde poner energía.'],
  ['Presencia', 'Destacar sin presumir: cuenta lo que haces con ilusión y pregunta por lo de los demás.'],
  ['Presencia', 'El carisma es presencia, calidez y seguridad. Se entrena.'],
  ['Presencia', 'Ser invisible no es humildad: es perder oportunidades.'],
  ['Bienestar', 'Dormir, moverte, quedar con alguien, gratitud y luz natural: los cinco hábitos que más suben el ánimo.'],
  ['Bienestar', 'Elige un hábito y hazlo una semana antes de añadir otro.'],
  ['Pareja temprana', 'El enamoramiento intenso baja con el tiempo y se transforma en algo más profundo.'],
  ['Pareja temprana', 'El amor se construye con decisiones diarias, no solo con química.'],
  ['Pareja temprana', 'Las feromonas humanas no están demostradas como «imán». Cuenta más cómo os tratáis.']
);

QUIZ.push(
  { p:'Piensas: «Mi autoestima viene de mi infancia, así que no tiene arreglo».', o:[['Es un punto de partida, no una condena: lo que hago hoy lo cambia.', 1, 'El cerebro y las creencias cambian toda la vida.'], ['Tienes razón: no hay nada que hacer.', 0, 'Eso es una trampa del pensamiento.'], ['Pasas del tema.', 0, 'Evitarlo lo mantiene.']] },
  { p:'Te enfadas mucho con un mensaje de alguien y quieres contestarle ya.', o:[['Respiras seis segundos y contestas mañana, si hace falta.', 1, 'La pausa evita arrepentimientos.'], ['Contestas rápido para desahogarte.', 0, 'Puede empeorarlo.'], ['Escribes un mensaje larguísimo.', 0, 'Mejor esperar.']] },
  { p:'Ayudas siempre a un amigo, pero cuando tú lo necesitas no está.', o:[['Le dices con calma cómo te sientes y ves qué hace.', 1, 'Pones límites y miras la reciprocidad.'], ['Sigues ayudando sin decir nada.', 0, 'Acaba en resentimiento.'], ['Te enfadas y no le hablas.', 0, 'Mejor hablar con calma.']] },
  { p:'En el trabajo nadie sabe lo que haces y te sientes invisible.', o:[['Cuentas lo que haces con ilusión y aportas una idea en las reuniones.', 1, 'Visibilidad sin presumir.'], ['Esperas a que alguien lo note.', 0, 'Puede que nunca pase.'], ['Presumes de todo lo que haces.', 0, 'Mejor naturalidad.']] }
);

/* Rehacer «Tips rápidos» con todos los tips cargados */
(() => {
  const d = DOCS.find(x => x.id === 'd-tips');
  if (d) d.secciones = [...new Set(TIPS.map(t => t[0]))].map(c => [c, TIPS.filter(t => t[0] === c).map(t => t[1])]);
})();
