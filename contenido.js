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

/* Guía de situaciones, explicadas desde cero. Se escribe por bloques, paso a paso: están escritos los 4 bloques. */
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
  { bloque:'Cuando alguien te gusta', items:[
    { id:'g-gusta', titulo:'Te gusta alguien: qué hacer con eso (y qué no)',
      pasa:'Te gusta una chica y la cabeza se dispara: te imaginas cosas y analizas cada gesto. O al revés: la evitas porque te pones nervioso cerca de ella. Las dos cosas son muy normales, sobre todo las primeras veces.',
      hacer:['Nada urgente. Que te guste alguien no te obliga a hacer nada ya. De momento basta con notarlo.', 'Trátala como a cualquiera con quien te apetece hablar: salúdala, pregúntale qué tal y escucha lo que cuenta. Con eso ya estás haciendo mucho.', 'No la evites. Si te escondes, no tiene forma de conocerte. Mejor un saludo con nervios que ningún saludo.', 'Que no sea tu único tema. Sigue con tu vida y tus planes. Eso te quita presión a ti y a ella.'],
      ejemplos:[], cierre:'',
      extra:[['Lo que no ayuda', ['Idealizarla: de momento conoces solo una parte pequeña de ella.', 'Pasarte horas analizando cada mensaje o cada mirada.', 'Intentar ser otra persona para gustarle.']]],
      sale:'Si te pones rojo o se te traba una frase, lo más probable es que lo vea como nervios normales. Le pasa a muchísima gente y no te descalifica.',
      practica:'Saludar a alguien que me guste igual que saludaría a cualquier otra persona' },
    { id:'g-senales', titulo:'Señales de interés: qué significan y qué no',
      pasa:'Buscas señales para saber si le gustas, y cualquier detalle te parece una prueba de que sí o de que no.',
      hacerTitulo:'La verdad',
      hacer:['Una señal sola dice muy poco. Lo que cuenta es un conjunto de cosas que se repite con el tiempo.'],
      ejemplos:[], cierre:'',
      extra:[
        ['Señales de que suele estar a gusto contigo', ['Te busca para hablar, o se acerca ella también.', 'Te pregunta cosas sobre ti y se acuerda de lo que le contaste.', 'La conversación fluye y no tiene prisa por irse.', 'Te contesta con ganas y a veces es ella quien escribe primero.']],
        ['Lo que no significa necesariamente interés', ['Que sea amable o simpática contigo. Puede serlo con todo el mundo, y eso está bien.', 'Una sonrisa o una mirada sueltas.', 'Que te conteste los mensajes.']],
        ['Y al revés', 'Que un día tarde en contestar o esté más seca no quiere decir que no le gustes: puede estar cansada u ocupada. Pero si se repite siempre que contesta corto, cambia de tema o se aparta, eso sí es una señal clara, y lo que toca es respetarla.'],
        ['Lo más importante', 'Las señales dan pistas, no certezas. La única forma de saberlo de verdad es dar un paso pequeño, que es justo el bloque 3. Mientras tanto, está bien no tenerlo claro.']
      ],
      sale:'Si interpretaste algo mal, no es un fallo: le pasa a todo el mundo, porque nadie lee la mente.',
      practica:'Fijarme en si la otra persona me pregunta cosas de vuelta (solo observar)' }
  ]},
  { bloque:'Dar un paso', items:[
    { id:'g-hablarle', titulo:'Hablar con alguien que te gusta como con cualquiera',
      pasa:'Con ella, de repente, todo pesa más. Sientes que cada frase cuenta, y eso te bloquea o hace que hables de forma rara.',
      hacer:['Usa lo del bloque 1. Comentar lo que compartís, preguntar y volver a algo que ha dicho funciona igual con ella que con cualquiera.', 'Interésate de verdad por lo que cuenta: qué le gusta, qué hace el finde, qué serie está viendo. La curiosidad sincera funciona muy bien, y además te quita la atención de ti mismo.', 'Cuenta también cosas tuyas, aunque sean pequeñas. Una conversación no es un interrogatorio.', 'Varias conversaciones cortas valen más que una larga perfecta. Cada saludo suma.'],
      ejemplos:[], cierre:'',
      extra:[['Lo que no ayuda', ['Llevar un guion preparado.', 'Intentar impresionarla.', 'Al principio, los cumplidos sobre su físico. Sin confianza pueden incomodar. Mejor algo sobre lo que ha hecho o dicho, como «qué bien lo has explicado».']]],
      sale:'Una conversación sosa no cierra ninguna puerta. Mañana habrá otra.',
      practica:'Hacerle una pregunta sobre algo que ella me haya contado' },
    { id:'g-numero', titulo:'Pedir el número o el Instagram',
      pasa:'Habéis hablado a gusto, te gustaría seguir en contacto y pedírselo te parece enorme, como declararte. No lo es: solo le estás pidiendo seguir hablando.',
      hacerTitulo:'Cuándo',
      hacer:['Cuando ya habéis hablado varias veces o la conversación ha ido bien, y mejor si hay un motivo natural: algo que mandarle o un plan del que habéis hablado.'],
      ejemplos:['«Oye, ¿me pasas tu Instagram? Así te mando lo del concierto que te dije».', '«¿Tienes WhatsApp? Te paso la receta».', '«Me ha gustado mucho hablar contigo. ¿Te importa si te pido el número?».'],
      cierre:'',
      extra:[
        ['Cómo', 'Con calma, directo y sin rodeos largos. Ponle fácil decir que no: si duda, dile «tranquila, no pasa nada» y sigue como si nada.'],
        ['Si dice que no o pone una excusa', 'Contesta «vale, sin problema» y sigue la conversación con normalidad, o despídete con amabilidad. Eso dice mucho de ti. No insistas ni le pidas explicaciones.']
      ],
      sale:'El reto era pedirlo, sea cual sea la respuesta.',
      practica:'Pedir el contacto a alguien con quien no me juego nada, para que la frase me salga sola' },
    { id:'g-quedar', titulo:'Proponer quedar',
      pasa:'Habláis o os escribís a gusto, pero no sabes cómo pasar a veros fuera, o te da miedo que sea «demasiado».',
      hacer:['Propón algo concreto y sencillo: un café, una cerveza, un paseo o una exposición. Para empezar está bien algo corto y de día, porque es menos presión para los dos.', 'Mejor si sale de algo que habéis hablado: «Dijiste que nunca habías ido a ese mirador. ¿Te apetece ir el sábado?».', 'Di un día o una franja. Algo concreto es más fácil de contestar que «a ver si un día…».'],
      ejemplos:['«¿Te apetece tomar un café esta semana? ¿El jueves por la tarde te va bien?».', '«Hay una exposición de fotografía que creo que te gustaría. ¿Vamos el sábado?».'],
      cierre:'',
      extra:[['Lo que puede contestar', ['Que sí: genial, quedad en la hora y el sitio.', '«Ese día no puedo, pero el viernes sí»: si propone otro día, es buena señal.', '«No puedo», sin proponer nada: puedes intentarlo otra vez con otro día. Si pasa lo mismo, mejor dejarlo ahí. Si a ella le apetece, ya lo propondrá.', 'Que no: contesta «vale, sin problema» y sigue tratándola con normalidad.']]],
      sale:'Proponer algo claro y aceptar la respuesta es justo lo que había que hacer, salga como salga.',
      practica:'Proponer un plan concreto, con día y hora, a un amigo o a un compañero' }
  ]},
  { bloque:'Lo que venga después', items:[
    { id:'g-no', titulo:'Si te dice que no',
      pasa:'Le pides el número o quedar y te dice que no, o pone una excusa. Duele, y la cabeza enseguida saca conclusiones: «es por mí», «nunca le voy a gustar a nadie».',
      hacerTitulo:'Lo que de verdad significa',
      hacer:['Un «no» solo dice que ahora, con esa persona, no encaja. No dice nada de lo que vales. Puede que tenga pareja, que no busque nada, que no esté en su momento o que simplemente no haya chispa. A todo el mundo le dicen que no muchas veces, también a la gente que parece que lo tiene fácil.'],
      ejemplos:[], cierre:'',
      extra:[
        ['Qué hacer en el momento', ['«Vale, sin problema», con una sonrisa, y seguir con normalidad o despedirte con amabilidad.', 'No insistir, no pedir explicaciones y no hacerte la víctima.', 'Si la vas a seguir viendo (en el trabajo o en el grupo de amigos), trátala igual que antes. Con eso la incomodidad se pasa enseguida para los dos.']],
        ['Qué hacer después', ['Es normal sentirte mal un rato o un par de días. No hace falta hacerse el fuerte.', 'Escríbelo en el diario como victoria, no como fracaso: has hecho algo que hace unos meses te parecía imposible.', 'Si la cabeza dice «nunca le voy a gustar a nadie», revísalo con «Revisar un pensamiento»: es la trampa de adivinar el futuro.', 'Si quieres, llévalo a terapia.']],
        ['Lo que no ayuda', ['Repasar mil veces lo que dijiste buscando el error. Muchas veces no hubo ninguno.', 'Decidir no volver a intentarlo nunca.']]
      ],
      sale:'Si te quedas mal unos días, es normal y pasa. Lo que cuenta es que lo intentaste.',
      practica:'Contestar «vale, sin problema» con calma la próxima vez que alguien me diga que no a algo pequeño' },
    { id:'g-despues-quedada', titulo:'Después de la primera quedada',
      pasa:'Habéis quedado una vez y no sabes qué toca ahora: si escribir, cuánto esperar, si le has gustado o qué significa cada cosa que hace.',
      hacer:['Si te ha gustado, díselo ese día o al siguiente, sin esperar a ver quién escribe primero: «Me lo pasé muy bien ayer. ¿Repetimos?».', 'Si contesta con ganas y propone fechas, genial. Para la segunda quedada puede estar bien un plan un poco más largo o distinto: dar un paseo, cenar, ir a algo que os guste a los dos.', 'Si contesta corto, tarda mucho o no concreta nada, es probable que no tenga el mismo interés. Puedes proponer una vez algo concreto. Si sigue igual, déjalo estar con elegancia.', 'Si eres tú quien no quiere repetir, díselo con amabilidad: «Me lo pasé bien, pero no siento que vaya a más. Te deseo lo mejor». Es mejor que desaparecer.'],
      ejemplos:[], cierre:'',
      extra:[['Ir poco a poco', ['No hay prisa por ponerle nombre a nada ni por que pase nada físico. Cada uno lleva su ritmo, y lo bueno es ir cómodos los dos.', 'Lo que dijimos del contacto físico sigue valiendo: solo vale un sí claro, y preguntar es respeto.']]],
      sale:'Si no sale como esperabas, has ganado experiencia. Cada quedada te enseña algo, aunque no acabe en nada.',
      practica:'Mandar un mensaje corto al día siguiente de cualquier plan, aunque sea con un amigo: «Me lo pasé bien ayer»' },
    { id:'g-mensajes', titulo:'Escribirse por mensajes',
      pasa:'Los mensajes dan mucha ansiedad: cuánto tardar en contestar, qué decir, si pones demasiados emojis o si ella tarda en responder. Se le dan demasiadas vueltas.',
      hacer:['Contesta cuando puedas y te apetezca. No hace falta esperar a propósito para parecer interesante: eso son juegos, y no ayudan.', 'Mensajes normales, como hablas. Pregunta por algo que te contó («¿Qué tal te fue el examen?») y comparte cosas tuyas: una foto de algo que te ha hecho gracia, una canción o un plan.', 'Más o menos al mismo ritmo que ella. Si ella escribe mensajes cortos, no le mandes testamentos. Si escribe con ganas, sigue la conversación.', 'Los mensajes sirven para quedar, no para sustituirlo. Si lleváis unos días escribiéndoos bien, propón veros.'],
      ejemplos:[], cierre:'',
      extra:[
        ['Lo que no ayuda', ['Mandar varios mensajes seguidos si no contesta. Con uno basta. Si no responde en unos días, no insistas.', 'Leer cada mensaje buscando significados ocultos, o enseñarle cada mensaje a todos tus amigos para que lo interpreten.', 'Discutir o hablar de cosas serias por mensaje. Eso mejor en persona.']],
        ['Si tarda en contestar', 'Puede estar trabajando, cansada o con su vida. No es una respuesta sobre ti. Sigue con lo tuyo.']
      ],
      sale:'Si mandaste algo y te arrepientes, no pasa nada: casi nadie le da tantas vueltas como tú.',
      practica:'Escribir yo primero a un amigo, sin motivo, preguntándole por algo que me contó' }
  ]}
];

/* «Tengo un plan»: qué saber antes de ir. Vale para cualquier plan, más lo propio de cada tipo. */
const PLAN_GENERAL = {
  antes: [
    'No tienes que brillar. Un objetivo realista: ir, hablar con una o dos personas y volver a casa sabiendo que fuiste. Con eso ya ha salido bien.',
    'Llévate tres temas comodín: algo que hayas hecho esta semana, algo que estés viendo o escuchando, y una pregunta que te salga fácil, como «¿qué tal la semana?» o «¿de qué conoces a…?».',
    'Ve descansado y habiendo comido. El hambre y el cansancio suben la ansiedad.',
    'Decide un mínimo, por ejemplo una hora, y a partir de ahí puedes irte sin dar explicaciones. Saber que tienes salida quita mucho miedo.',
    'Con el alcohol, una o dos copas como mucho. Beber más no quita la ansiedad: la retrasa y te deja peor al día siguiente. Si tomas medicación, pregúntale a tu médico por el alcohol.',
    'Justo antes, cinco respiraciones soltando el aire largo.'
  ],
  despues: [
    'Apúntalo aquí: qué temías y qué pasó. Aunque saliera regular, ir ya es la victoria.',
    'No repases cada frase que dijiste. Quédate con una cosa que salió bien y otra que quieras probar la próxima vez.',
    'Es normal estar agotado al día siguiente. La ansiedad cansa mucho, así que descansa sin culpa.'
  ],
  check: ['He comido algo', 'Sé cuánto rato me quedo como mínimo', 'Llevo mis tres temas comodín', 'He hecho cinco respiraciones']
};
const PLAN_TIPOS = [
  { id:'fiesta', icono:'🎶', titulo:'Salir de fiesta', secciones:[
    ['Lo que es', 'Mucho ruido, mucha gente y poco espacio para conversaciones largas. En una discoteca casi nadie habla de nada profundo, y es normal sentirse un poco fuera al principio.'],
    ['Qué hacer', ['Si puedes, ve con alguien, y al principio quédate cerca de tu grupo.', 'Las conversaciones son cortas y sencillas: «¿de qué conoces a…?» o un comentario sobre la música. Si no oyes, acércate un poco y pide que te lo repita; le pasa a todo el mundo.', 'Para bailar basta con moverte un poco al ritmo. Nadie se fija tanto como crees.', 'Si te apetece hablar con una chica: fíjate en que esté accesible, no en plena conversación con sus amigas. Salúdala y comenta algo. Si contesta corto o se gira, dile «vale» y vete con naturalidad: no ha pasado nada.']],
    ['Qué no hacer', ['Insistir.', 'Tocar a alguien sin confianza: ni la cintura ni el brazo.', 'Beber para atreverte.']],
    ['Si te agobias', 'Sal a la puerta cinco minutos y respira. Luego vuelve o vete a casa; las dos cosas están bien.']
  ]},
  { id:'grupo', icono:'👥', titulo:'Una quedada en grupo', secciones:[
    ['Qué hacer', ['Al llegar, saluda a quien conozcas y deja que te presente, o preséntate tú: «Hola, soy ___, amigo de ___».', 'Repite el nombre al saludar, por ejemplo «encantado, Laura». Así se te queda.', '«¿Y tú de qué conoces a ___?» funciona siempre.', 'En grupo no hace falta hablar mucho. Escucha, ríete cuando algo te haga gracia y aporta algo de vez en cuando. Con una intervención ya cuenta.', 'Si te quedas solo un momento, acércate a un grupito de dos o tres personas y escucha. Cuando haya hueco, haz una pregunta.']],
    ['Qué no hacer', ['Estar con el móvil todo el rato, porque te aísla.', 'Compararte con el más gracioso del grupo.']],
    ['Si te agobias', 'Sal un momento: al baño, a la calle, a por algo de beber. Respira y vuelve cuando quieras. Nadie lo va a notar.']
  ]},
  { id:'cita', icono:'☕', titulo:'Primera cita (Tinder u otra app)', secciones:[
    ['Antes', ['Habla un poco por la app, pero no durante semanas. A los pocos días, propón quedar.', 'Elige un sitio público y tranquilo donde se pueda hablar: un café o unas cañas. Para una primera vez, una hora es perfecto.', 'Mira bien cómo llegar y llega cinco minutos antes.', 'Prepara tres o cuatro preguntas sobre cosas de su perfil.', 'Es normal que en persona sea un poco distinta a las fotos, igual que tú para ella.']],
    ['Durante', ['Al saludar, dos besos o lo que salga. Si dudas, sigue lo que haga ella.', 'Interésate por ella y cuenta también cosas tuyas.', 'Puedes decir que estás nervioso: «Te confieso que estoy un poco nervioso». Suele caer bien y relaja a los dos.', 'No es una entrevista ni un examen: solo se trata de ver si estáis a gusto.', 'La cuenta: lo más sencillo es pagar a medias, o «esta la pago yo y la próxima tú». Sin darle más vueltas.']],
    ['El contacto físico', ['En la primera cita no tiene por qué pasar nada, y está perfecto así.', 'Si te apetece darle un beso, fíjate en si ella está cerca, cómoda y busca el contacto. Si dudas, pregúntaselo: «¿Te puedo dar un beso?». Preguntar no es cortarse: es respeto.', 'Solo vale un sí claro. Si duda o dice que no, contesta «vale» y sigue con normalidad.']],
    ['Seguridad para los dos', 'Un sitio público, cada uno vuelve a casa como quiera, y si te quedas más tranquilo, avisa a alguien de dónde estás.'],
    ['Después', ['Si te ha gustado, escríbele ese día o al siguiente: «Me lo pasé muy bien, ¿repetimos?».', 'Si no contesta o no quiere repetir, se respeta.', 'Si eres tú quien no quiere repetir, díselo con amabilidad. No desaparezcas sin más.']]
  ]},
  { id:'amigos', icono:'🤝', titulo:'Conocer a una chica a través de amigos', secciones:[
    ['Qué hacer', ['La ventaja: ya hay algo de confianza y tenéis temas en común, empezando por los amigos que compartís.', 'Trátala como a cualquiera del grupo, y habla también con los demás.', 'Si os entendéis, seguir en contacto sale solo: «Agrégame a Instagram y te paso lo de…».']],
    ['Qué no hacer', ['Si ella no muestra interés, no crear un ambiente incómodo en el grupo: se respeta y ya.', 'Pedirles a tus amigos que hagan de intermediarios.']]
  ]},
  { id:'otro', icono:'✨', titulo:'Otro plan', secciones:[
    ['Qué hacer', ['Piensa qué es lo que más te preocupa de este plan y mira si alguna situación de la guía lo cubre.', 'Ponte un objetivo pequeño y concreto: saludar a alguien, hacer una pregunta, quedarte una hora.']]
  ]}
];
