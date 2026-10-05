/* Contenido de la app: retos, frases, trampas del pensamiento y lecciones.
   Todo es genérico (nada personal). Las etapas y lecciones siguientes se escriben más adelante, paso a paso. */
'use strict';

/* Etapas de retos. Las siguientes (más allá de la 2) se construyen juntos, a su ritmo. */
const RETOS_BASE = [
  { id:'r-respirar', etapa:0, titulo:'Pararte a respirar antes de una situación que te cuesta', descripcion:'Unos segundos antes de entrar, sin más objetivo que notar el cuerpo.' },
  { id:'r-hablarte-bien', etapa:0, titulo:'Hablarte como hablarías a un amigo', descripcion:'La próxima vez que algo te salga mal, prueba a decirte lo que le dirías a otra persona en tu lugar.' },
  { id:'r-postura', etapa:0, titulo:'Caminar un trayecto corto con la cabeza alta', descripcion:'Sin buscar nada más, solo notar cómo cambia el cuerpo.' },

  { id:'r-contacto-visual', etapa:1, titulo:'Mantener el contacto visual 2-3 segundos al cruzarte con alguien', descripcion:'No hace falta decir nada.' },
  { id:'r-gracias', etapa:1, titulo:'Decir «gracias» mirando a los ojos a quien te atiende', descripcion:'En una tienda, en el bus, donde sea.' },
  { id:'r-saludar-tu', etapa:1, titulo:'Ser tú quien saluda primero a alguien conocido', descripcion:'Un vecino, un compañero, quien sea.' },
  { id:'r-preguntar', etapa:1, titulo:'Preguntar algo sencillo a un desconocido', descripcion:'La hora, una dirección, algo pequeño.' },

  { id:'r-conversacion-corta', etapa:2, titulo:'Aguantar 1-2 minutos hablando con un conocido', descripcion:'De lo que sea, sin buscar que sea interesante.' },
  { id:'r-pregunta-seguimiento', etapa:2, titulo:'Hacer una pregunta de seguimiento', descripcion:'Cuando alguien te cuente algo, pregunta un poco más sobre eso.' },
  { id:'r-grupo', etapa:2, titulo:'Decir algo una vez en una conversación de grupo', descripcion:'Una vez basta.' }
];
const ETAPAS = ['Contigo mismo', 'Con cualquiera, sin objetivo', 'Mantener una conversación corta'];

/* Una frase por día. Tono: amable, nada de «tú puedes con todo». */
const FRASES = [
  'No tienes que sentirte preparado para dar un paso pequeño.',
  'El miedo de antes casi siempre es más grande que lo que pasa después.',
  'Ir despacio también es avanzar.',
  'Un día malo no borra lo que ya has hecho.',
  'Los demás están mucho más pendientes de sí mismos que de ti.',
  'No hace falta que salga bien. Basta con que lo intentes.',
  'Puedes estar nervioso y hacerlo igual. Las dos cosas a la vez.',
  'Háblate como le hablarías a un amigo que lo está pasando mal.',
  'Descansar no es rendirse.',
  'Lo que hoy cuesta mucho, dentro de un tiempo costará un poco menos.',
  'Que algo te dé vergüenza no quiere decir que lo hayas hecho mal.',
  'No eres tus pensamientos. Son solo pensamientos.',
  'Notar la ansiedad no es un fallo: es tu cuerpo intentando cuidarte.',
  'Cada vez que no te escondes, el miedo aprende algo.',
  'Hoy no hace falta hacer nada grande.',
  'Puedes empezar de nuevo las veces que haga falta.',
  'Equivocarte en una conversación es lo más normal del mundo. Le pasa a todos.',
  'Lo que sientes tiene sentido, aunque no te guste.',
  'Mirarte con cariño también se practica.',
  'No compites con nadie. Solo con quien eras ayer, y ni eso.'
];

/* Trampas del pensamiento (para el registro de pensamientos). */
const TRAMPAS = [
  ['mente', 'Leer la mente', 'Dar por hecho lo que piensa otro: «seguro que piensa que soy raro».'],
  ['futuro', 'Adivinar el futuro', 'Dar por hecho cómo va a salir: «me voy a quedar en blanco».'],
  ['todo', 'Todo o nada', 'O perfecto o un desastre, sin término medio.'],
  ['etiqueta', 'Ponerte etiquetas', 'De un fallo, sacar quién eres: «soy un desastre».'],
  ['filtro', 'Solo lo malo', 'Quedarte con lo que salió mal y olvidar lo demás.'],
  ['catastrofe', 'Catastrofizar', 'Imaginar lo peor y darlo por probable.'],
  ['debo', 'Los «debería»', 'Exigirte normas rígidas: «debería ser más gracioso».']
];

/* Lecciones. Cada una son tarjetas cortas. Las de «próximamente» se escriben más adelante, con calma. */
const LECCIONES = [
  { id:'l-ansiedad', icono:'🌊', titulo:'La ansiedad social, en el momento', sub:'Qué te pasa por dentro y por qué no es peligroso', tarjetas:[
    ['Lo que notas', 'Corazón rápido, calor en la cara, manos que sudan, la mente en blanco. Es el cuerpo preparándose para un peligro. El sistema es antiguo y no distingue un león de una conversación con alguien nuevo.'],
    ['Sube, llega arriba y baja', 'La ansiedad funciona como una ola: sube, llega a un pico y baja sola, aunque no hagas nada. Si te quedas en la situación, suele bajar en unos minutos. Si te vas en el pico, el cerebro aprende que irse fue lo que te salvó.'],
    ['Por qué evitar lo mantiene', 'Evitar alivia en el momento, pero el miedo no aprende nada nuevo. Cada vez que te quedas, aunque sea un poco y aunque lo pases mal, el miedo tiene la oportunidad de aprender que no pasó lo terrible.'],
    ['Se te nota menos de lo que crees', 'Se ha estudiado mucho: tendemos a pensar que los demás notan nuestros nervios muchísimo más de lo que los notan en realidad. Tú sientes todo desde dentro; ellos solo ven una parte pequeña.'],
    ['Las «muletas»', 'Mirar el móvil, no levantar la vista, ensayar la frase en la cabeza, hablar muy bajo… Ayudan a aguantar, pero también impiden comprobar que podrías sin ellas. No hace falta quitarlas todas de golpe: una cada vez.'],
    ['Qué hacer en el momento', 'Suelta el aire despacio, más largo de lo que lo coges. Pon la atención fuera: en lo que dice la otra persona, en lo que ves. Y recuerda que no tiene que salir bien: con estar ya es suficiente.']
  ]},
  { id:'l-calma', icono:'🫁', titulo:'Calmar el cuerpo', sub:'Tres cosas que funcionan en cualquier sitio', tarjetas:[
    ['Soltar más largo que coger', 'Coge aire por la nariz contando 4 y suéltalo por la boca contando 6, como si soplaras una vela sin apagarla. Echar el aire más largo es lo que le dice al cuerpo que puede frenar. Con 5 o 6 respiraciones se nota.'],
    ['Aterrizar con los sentidos', 'Nombra por dentro 5 cosas que ves, 4 que puedes tocar, 3 que oyes, 2 que hueles y 1 que saboreas. Saca la atención de la cabeza y la pone en el sitio en el que estás.'],
    ['Soltar los hombros', 'Sube los hombros hacia las orejas, aguanta 3 segundos y déjalos caer de golpe. Afloja la mandíbula. La tensión del cuerpo y la de la mente van juntas: aflojar una ayuda a aflojar la otra.'],
    ['Cuándo usarlas', 'Antes de entrar en algún sitio, en el baño, en el bus, o mientras hablas (la de soltar aire se puede hacer sin que nadie lo note). No son para que la ansiedad desaparezca: son para que puedas quedarte aunque esté.']
  ]},
  { id:'l-pensamientos', icono:'🧠', titulo:'Pensamientos que engañan', sub:'Cuando tu cabeza te cuenta cosas que no son verdad', tarjetas:[
    ['Un pensamiento no es un hecho', 'Que pienses «van a pensar que soy raro» no quiere decir que lo vayan a pensar. La cabeza produce pensamientos todo el rato, y con ansiedad tiende a producir los más negativos.'],
    ['Las trampas más típicas', 'Leer la mente («seguro que le aburro»), adivinar el futuro («me voy a quedar en blanco»), todo o nada («si no soy gracioso, soy un desastre») y ponerse etiquetas («soy raro»). Ponerles nombre ya les quita fuerza.'],
    ['La pregunta del amigo', '¿Qué le dirías a un amigo que pensara eso de sí mismo? Casi siempre somos mucho más justos con los demás que con nosotros. Esa respuesta suele estar más cerca de la verdad.'],
    ['Probar en vez de discutir', 'No hace falta convencerte de que el pensamiento es falso. Puedes comprobarlo: haces el reto, y miras qué pasó de verdad. Por eso los retos te preguntan lo que temías y lo que pasó.']
  ]}
];
const PROXIMAMENTE = [
  ['👀', 'Comunicación y lenguaje no verbal'],
  ['💬', 'Cómo funciona la atracción, de forma realista'],
  ['🌱', 'Educación sexual básica']
];

/* Guía de situaciones, explicadas desde cero. Se escribe por bloques, paso a paso: solo el bloque 1 está escrito. */
const GUIA = [
  { bloque:'Conversar, con cualquiera', items:[
    { id:'g-empezar', titulo:'Empezar una conversación',
      pasa:'Te bloqueas porque buscas la frase perfecta, algo ingenioso o interesante. Esa frase no existe. Casi todas las conversaciones empiezan con algo banal, y no pasa nada.',
      hacer:['Comenta algo que estáis compartiendo en ese momento: el sitio, lo que pasa, lo que estáis haciendo.'],
      ejemplos:['«Madre mía, qué cola hay hoy».', '«¿Sabes si esto es para el bus de las nueve?».', '«¿Qué tal el finde?» (con alguien que ya conoces un poco).'],
      cierre:'Lo que dices importa poco. Lo que importa es el tono: tranquilo y sin esperar nada a cambio.',
      sale:'Si te contestan con un «sí» seco y ya está, no es por ti: puede que tenga prisa o que esté en su mundo. Has hecho el intento, y eso era el reto.',
      practica:'Hacer un comentario sobre el sitio a alguien con quien coincida' },
    { id:'g-blanco', titulo:'Cuando te quedas en blanco',
      pasa:'Hay un silencio y sientes que es culpa tuya y que se nota muchísimo. En realidad la otra persona suele notarlo mucho menos, y muchas veces también está buscando qué decir.',
      hacer:['Vuelve a algo que ya se dijo: «Antes has dicho que estuviste en Valencia, ¿qué tal?». Es lo más fácil y funciona casi siempre.', 'Pregunta un poco más sobre lo último que te contaron: «¿Y eso cómo fue?».', 'Di lo que pasa, con naturalidad: «Me he quedado en blanco, jaja». Casi siempre quita tensión y la otra persona sigue.', 'Un silencio corto no es un desastre. Tres o cuatro segundos se hacen eternos por dentro y desde fuera apenas se notan.'],
      ejemplos:[], cierre:'',
      sale:'Si la conversación se apaga, no has fallado: a veces simplemente se acaba. Si quieres cerrarla tú, mira la siguiente: «Terminar una conversación».',
      practica:'Volver una vez a algo que se dijo antes en una conversación' },
    { id:'g-terminar', titulo:'Terminar una conversación sin que sea raro',
      pasa:'No sabes cómo salir, así que o alargas la conversación sin ganas o te vas de golpe. Saber salir también quita miedo a entrar: si sabes que puedes irte cuando quieras, empezar cuesta menos.',
      hacer:['Una frase de cierre y una despedida, nada más.'],
      ejemplos:['«Bueno, te dejo, que tengo que ir a comprar. ¡Hasta luego!».', '«Me alegro de verte. Nos vemos por aquí».', 'Si te ha gustado hablar: «Me ha gustado hablar contigo». Es sencillo y deja buen sabor.'],
      cierre:'No hace falta una excusa elaborada. Con «bueno, me voy» en tono amable basta.',
      sale:'Si ha quedado un poco brusco, la otra persona lo olvida en un minuto. De verdad.',
      practica:'Cerrar yo una conversación corta en vez de esperar a que la cierre el otro' }
  ]},
  { bloque:'Cuando alguien te gusta', items:[] },
  { bloque:'Dar un paso', items:[] },
  { bloque:'Lo que venga después', items:[] }
];
