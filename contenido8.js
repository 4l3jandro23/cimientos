/* «Estoy fuera ahora»: ayuda en el momento, en cualquier sitio, aunque hayas bebido (si estás estable).
   Frases cortas: se lee con ruido, con prisa y con alguna copa. */
'use strict';

const AHORA_SITIOS = [
  ['fiesta', '🎶', 'De fiesta o en una discoteca', 'Aquí las conversaciones son cortas. Los mejores sitios para hablar: la barra, la cola, la puerta o la zona de fumadores.'],
  ['bar', '🍻', 'En un bar o una terraza', 'La barra es el mejor sitio para hablar con gente nueva. Comentar lo que pide alguien es muy fácil.'],
  ['casa', '🏠', 'En casa de alguien', 'En las fiestas en casa, la cocina es donde más se habla. Ofrecerte a ayudar con algo es una forma fácil de entrar.'],
  ['cena', '🍽️', 'En una cena o comida', 'Habla con quien tengas al lado y enfrente. Preguntar por lo que han pedido siempre funciona.'],
  ['concierto', '🎤', 'En un concierto', 'Entre canciones y en la cola de la barra se habla fácil. El tema ya está dado: la música.'],
  ['otro', '📍', 'En otro sitio', 'Busca dónde se junta la gente (la comida, la bebida, la entrada) y ponte ahí.']
];

const AHORA_COSAS = [
  { id:'inseguro', i:'😟', n:'Me siento inseguro', haz:[
      'Es normal: casi todo el mundo se siente así en algún momento de la noche, aunque no se note.',
      'Suelta el aire largo dos veces. Hombros abajo.',
      'Pon la atención fuera: mira a la gente, escucha lo que se habla.',
      'No tienes que brillar. Con estar y escuchar ya cuentas.',
      'Acércate a tus amigos un momento: son tu ancla.'],
    dilo:['«¿Qué tal la noche?»', '«¿Qué estáis tomando?»'], una:'Haz una pregunta a alguien de tu grupo.' },
  { id:'solo', i:'🧍', n:'Estoy solo y no sé con quién hablar', haz:[
      'Estar solo un rato es normal. Nadie te está mirando tanto como crees.',
      'Ve a la barra o a una zona de paso: es donde más se habla.',
      'Busca a alguien que también esté solo, o un grupo pequeño y abierto (no un círculo cerrado).',
      'Escribe a tu gente para encontraros.',
      'Si no te apetece nada, también puedes irte. No pasa nada.'],
    dilo:['«Perdona, ¿sabes si…?»', '«¿Y vosotros de qué conocéis a ___?»'], una:'Di una frase a una persona. Solo una.' },
  { id:'amigo-chica', i:'👀', n:'Mi amigo está con una chica y me he quedado solo', haz:[
      'Es una buena noticia para él, no una mala noticia para ti. Su noche no dice nada de la tuya.',
      'Dales espacio: no te quedes plantado cerca mirando.',
      'Escríbele: «Todo bien, estoy en la barra. Avísame cuando quieras». Así os coordináis sin agobiar.',
      'Si te la presenta, saluda con una sonrisa, un par de frases, y luego déjales.',
      'Haz algo tuyo: ve a la barra, habla con alguien o con sus amigas si están abiertas a hablar.',
      'Si te apetece irte, avísale y vete tranquilo. Es una opción perfecta.',
      'Si te comparas: él tiene su forma y tú la tuya. Hoy no es un examen.'],
    dilo:['A él: «Todo bien, estoy por aquí. Avísame»', 'A sus amigas, si están abiertas: «Hola, soy amigo de ___. ¿Qué tal la noche?»'], una:'Escríbele dónde estás y haz algo para ti: barra, hablar con alguien o irte.' },
  { id:'blanco', i:'😶', n:'Estoy hablando con alguien y me quedo en blanco', haz:[
      'Vuelve a algo que dijo antes: «Antes has dicho que…».',
      'Pregunta más sobre lo último: «¿Y eso cómo fue?».',
      'Comenta algo del sitio: la música, la gente, lo que estáis tomando.',
      'O dilo con humor: «Me he quedado en blanco, jaja».',
      'Un silencio corto es normal. No pasa nada.'],
    dilo:['«¿Y eso cómo fue?»', '«¿Vienes mucho por aquí?»'], una:'Haz una pregunta sobre lo último que ha dicho.' },
  { id:'gusta', i:'💘', n:'Me gusta alguien que está aquí', haz:[
      'Respira: que te guste alguien es buena señal, no una emergencia.',
      'Fíjate en si está accesible (no en plena conversación cerrada con sus amigas).',
      'Acércate con algo sencillo del sitio o preséntate. Objetivo: una conversación corta. Nada más.',
      'Si contesta corto, «¡Encantado!» y vuelves con los tuyos. Has ganado igual: lo has hecho.',
      'Con alcohol: nada de insistir ni de contacto físico. Si os entendéis, pide su Instagram y escribe otro día.'],
    dilo:['«Hola, te he visto antes y me apetecía saludarte. Soy ___.»', '«¿Qué tal la noche? ¿Conocéis el sitio?»'], una:'Salúdala. Y si no es el momento, sonríele cuando crucéis la mirada.' },
  { id:'compara', i:'🔁', n:'Me estoy comparando con otros', haz:[
      'Ves su mejor momento desde fuera y tus nervios desde dentro. No es una comparación justa.',
      'Cada uno tiene su terreno. El tuyo es conversar y conectar.',
      'Vuelve a tu objetivo pequeño de la noche (el de «Voy a salir ya»).',
      'Haz algo ahora en vez de mirar a los demás.'],
    dilo:[], una:'Haz tu objetivo pequeño de hoy.' },
  { id:'grupo', i:'👥', n:'Estoy en el grupo pero me siento fuera', haz:[
      'Escuchar y reaccionar (asentir, reírte) ya cuenta como participar.',
      'Engancha una pregunta a lo que dice alguien: «¿Y al final qué pasó?».',
      'Habla con una sola persona: la que tengas al lado.',
      'Si el grupo se divide, únete a la conversación más pequeña.'],
    dilo:['«¿Y al final qué pasó?»', 'A quien tengas al lado: «¿Tú qué tal la semana?»'], una:'Haz una pregunta a quien tengas al lado.' },
  { id:'irme', i:'🚪', n:'Quiero irme', haz:[
      'Mírate un segundo: ¿es cansancio o miedo?',
      'Si es miedo, quédate 15 minutos más y vuelve a mirar.',
      'Si es cansancio o no te lo pasas bien, irte está bien.',
      'Despídete de alguien y avisa a tu amigo.',
      'Al llegar a casa, apunta una cosa que hiciste bien.'],
    dilo:['«Me voy ya, que mañana madrugo. ¡Me lo he pasado bien!»'], una:'Decide: 15 minutos más o me voy, sin culpa.' },
  { id:'bebido', i:'🍸', n:'He bebido bastante (pero estoy bien)', haz:[
      'Pide agua ahora, y a partir de aquí una de cada dos.',
      'Nada de decisiones importantes ni de mensajes de los que te puedas arrepentir.',
      'Con alcohol se leen peor las señales: ve más despacio y pregunta.',
      'Ten claro cómo vuelves a casa.',
      'Si notas que te viene el bajón, abre el modo bajón.'],
    dilo:[], una:'Pide un vaso de agua.' }
];
