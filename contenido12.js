/* Contenido ampliado 11: primeros contactos, cuando ella da señales y tus inseguridades concretas. */
'use strict';
const S12 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

GUIA.push(
  { bloque:'Primeros contactos en la calle y en el día a día', items:[
    S12('g-mirada-cruzada', 'Os cruzáis la mirada desde lejos', 'Te mira, la miras, apartáis la vista y no sabes qué hacer.', [
      'Sonríe suave la próxima vez que os miréis. Una sonrisa pequeña basta.',
      'Si te devuelve la sonrisa, es una puerta abierta. No hace falta ir corriendo.',
      'Si estáis en un sitio donde se puede hablar, acércate con una frase simple: «Hola, he visto que nos hemos mirado y quería saludarte».',
      'Si no se dan las condiciones (prisas, ella acompañada), déjalo estar sin dramas.'
    ], 'Que no pase nada no significa nada malo. Ya has practicado a sonreír.', 'Sonreír a alguien que me mire, sin pensar en más'),
    S12('g-sonreir', 'Sonreír a desconocidos', 'Piensas que si sonríes parecerás raro.', [
      'Una sonrisa breve y tranquila rara vez molesta. Más bien suaviza.',
      'Empieza por gente sin presión: el camarero, una vecina, alguien en el ascensor.',
      'Que sea real: piensa en algo agradable y sale solo.',
      'No esperes respuesta. Sonríes por ti.'
    ], 'La mayoría de la gente sonríe de vuelta, y eso ya anima el día.', 'Sonreír a tres personas hoy'),
    S12('g-pregunta-excusa', 'Usar una pregunta como excusa para hablar', 'Quieres hablar con alguien y no sabes cómo empezar.', [
      'Las preguntas útiles de verdad funcionan: «¿Sabes si esta línea va a…?», «¿Esto es bueno?».',
      'Después de la respuesta, da las gracias y, si hay buen rollo, añade algo: «Eres de por aquí?».',
      'Si la conversación no continúa, despídete con amabilidad.',
      'Mejor una pregunta real que una frase ensayada.'
    ], 'Preguntar con naturalidad es de las mejores formas de empezar.', 'Hacer una pregunta real a un desconocido esta semana'),
    S12('g-fila', 'Hablar en una cola o en una espera', 'Estás en una cola (café, concierto, museo) con alguien al lado.', [
      'Comenta algo del momento: «Qué cola, ¿eh?» o «¿Sabes si vale la pena esperar?».',
      'Si responde con ganas, sigue; si responde corto, déjalo con una sonrisa.',
      'Las colas son perfectas: hay tiempo, tema y poca presión.',
      'No hace falta pedir nada. Con charlar un rato ya está bien.'
    ], 'Si no pasa nada, el tiempo se pasa más rápido de todos modos.', 'Hacer un comentario ligero en la próxima cola'),
    S12('g-perro', 'Alguien con un perro que te cae bien', 'Ves a alguien paseando a su perro y te apetece hablar.', [
      'Los perros abren conversación: «¡Qué bonito! ¿Cómo se llama?».',
      'Pregunta antes de acariciar: «¿Puedo saludarlo?».',
      'Si hay buen rollo, preguntas ligeras: edad, raza, rutina.',
      'No te alargues si la persona va con prisa.'
    ], 'Un perro es una excusa fácil y casi todo el mundo habla de él con gusto.', 'Preguntar por el nombre de un perro en la calle'),
    S12('g-libreria', 'En una librería, una tienda de discos o una exposición', 'Ves a alguien que mira lo mismo que tú.', [
      'Comenta algo concreto de lo que miráis: «Este disco es de los míos».',
      'Pregunta por su opinión: «¿Lo has escuchado/leído?».',
      'Los sitios con una afición compartida son de los mejores para conectar.',
      'Si hay buena conversación, propón seguir en otro sitio: «¿Tomamos un café?».'
    ], 'Compartir una afición es una puerta fácil a la conversación.', 'Hablar con alguien en una tienda de discos o libros'),
    S12('g-clase', 'En una clase, un curso o un taller', 'Todos están ahí para aprender y tú quieres conocer gente.', [
      'Llega un poco antes y saluda a quien tengas cerca.',
      'Pregunta en las pausas: «¿Qué te ha parecido?».',
      'Propón repasar o quedar tras la clase: «¿Tomamos algo después?».',
      'Si sientes que hay buen rollo, continúa poco a poco.'
    ], 'Quien repite cada semana ya te conoce: no hay prisa.', 'Quedarme a tomar algo tras una clase'),
    S12('g-voluntariado', 'En un voluntariado o una actividad con propósito', 'Conoces gente con valores parecidos a los tuyos.', [
      'Ofrécete a ayudar: es una excusa natural para conversar.',
      'Pregunta por qué están ahí y qué les motiva.',
      'Los grupos así suelen ser abiertos y amables.',
      'Con el tiempo, puedes proponer algo fuera de la actividad.'
    ], 'Es de los sitios donde más gente buena se conoce.', 'Buscar una actividad con propósito en mi barrio'),
    S12('g-transporte', 'En el metro, el tren o el bus', 'Ves a alguien interesante pero estáis en un sitio cerrado.', [
      'No es el mejor sitio para ligar: hay poca privacidad y poco tiempo.',
      'Si coincidís a menudo, un saludo con una sonrisa va construyendo algo.',
      'Si hay una conversación natural (un retraso, algo que pasa), participa sin forzar.',
      'No la sigas ni te pegues: respeta su espacio.'
    ], 'Mejor un saludo repetido que una conversación forzada.', 'Saludar a quien coincida conmigo en el mismo trayecto'),
    S12('g-cafe-trabajo', 'Trabajas en una cafetería o espacio compartido', 'Ves a gente a diario y no sabes cómo empezar.', [
      'Saluda siempre. Con el tiempo, un «hola» pasa a ser una conversación.',
      'Una frase ligera sobre lo que hacéis: «¿Qué tal el día?».',
      'Ofrece algo pequeño: «¿Quieres un café?» a alguien con quien ya has hablado.',
      'Respeta que están trabajando: no interrumpas si están concentrados.'
    ], 'La rutina compartida es una gran aliada.', 'Saludar siempre a la misma persona y dejar que crezca solo')
  ]},
  { bloque:'Cuando ella da señales o te dice algo', items:[
    S12('g-ella-sonrie', 'Ella te sonríe mucho', 'No sabes si es amabilidad o interés.', [
      'Una sonrisa sola no dice mucho. Mira si se repite y si va con otras señales (mirada, acercarse).',
      'Devuelve la sonrisa y habla con ella: es la mejor forma de saberlo.',
      'No saques conclusiones antes de hablar.',
      'Si hay buen rollo, sigue; si no, vale igual.'
    ], 'Hablar con alguien que sonríe es un paso fácil.', 'Responder a una sonrisa con un saludo'),
    S12('g-ella-escribe-primero', 'Ella te escribe primero', 'Te llega un mensaje suyo sin que hayas dicho nada.', [
      'Es buena señal: dio el paso. Responde con ganas y con algo más que una palabra.',
      'Devuelve una pregunta para seguir la conversación.',
      'No hace falta contestar al segundo, pero tampoco la dejes días.',
      'Si te apetece, propón un plan concreto pronto.'
    ], 'Que alguien dé el primer paso es una muy buena noticia.', 'Contestar con una frase y una pregunta'),
    S12('g-ella-pareja-pregunta', 'Te pregunta si tienes pareja', 'Te lo pregunta de repente y no sabes cómo reaccionar.', [
      'Es de las preguntas que más interés suele indicar, aunque no siempre.',
      'Contesta con naturalidad: «No, ahora no. ¿Y tú?».',
      'Si hay interés, devolverá la pregunta o propondrá algo.',
      'No te lances a asumir nada: disfruta de la conversación.'
    ], 'No hace falta decidir nada en el momento.', 'Tener preparada una respuesta tranquila'),
    S12('g-ella-toca', 'Te toca el brazo o el hombro al hablar', 'No sabes qué significa ni cómo responder.', [
      'Puede ser simple confianza o interés. Mira el conjunto.',
      'Si te sientes cómodo, sonríe y sigue. No te apartes de golpe.',
      'Si quieres devolver, un toque suave en el brazo en un momento natural.',
      'Si te incomoda, no pasa nada: puedes marcar tu espacio con amabilidad.'
    ], 'No es un permiso para nada más. Siempre hace falta que ambos queráis.', 'Fijarme en cuándo me toca y cuándo no'),
    S12('g-ella-invita', 'Te propone un plan', 'Te dice «¿te apetece que quedemos?» y te quedas helado.', [
      'Si te apetece, di que sí con claridad: «¡Me encantaría!».',
      'Concreta día y hora para que no se quede en el aire.',
      'Si necesitas pensar, dilo: «Déjame mirar mi agenda y te digo».',
      'Es normal tener nervios. Es una muy buena señal.'
    ], 'Que te proponga algo es un regalo. Disfrútalo.', 'Aceptar un plan con una frase clara'),
    S12('g-ella-habla-otro', 'Te cuenta que le gusta otro', 'Hay buen rollo y de pronto te habla de alguien que le gusta.', [
      'No te lo tomes como algo contra ti: puede que no vea la posibilidad contigo.',
      'Escucha con calma y sin dar consejos que te duelan.',
      'Si te sientes mal, date un poco de distancia sin dramas.',
      'Te ha dado información útil: así sabes dónde estás.'
    ], 'Es mejor saberlo pronto que esperar meses.', 'Agradecer su confianza y bajar un cambio'),
    S12('g-ella-no-lista', 'Te dice «no estoy preparada para algo ahora»', 'Hay conexión pero ella dice que ahora no.', [
      'Respétalo. No es un «no» a ti: es un «no» al momento.',
      'Pregunta si quiere seguir en contacto o que lo dejéis ahí.',
      'No presiones ni esperes en el aire. Sigue con tu vida.',
      'Si ella vuelve, se verá. Pero no esperes.'
    ], 'Respetar los tiempos ajenos habla muy bien de ti.', 'Responder con calma y seguir con mi vida'),
    S12('g-ella-liada', 'Te dice que está muy liada', 'Cada vez que propones, tiene mucho trabajo o planes.', [
      'Puede ser real o una forma de decir poco interés. Mira si propone ella.',
      'Una vez más: «Dime tú cuándo te viene bien».',
      'Si pasa semanas sin concretar, deja de insistir.',
      'No te lo tomes personal: la gente tiene vidas llenas.'
    ], 'Quien quiere verte, busca el hueco.', 'Dejar que ella proponga el siguiente plan'),
    S12('g-ella-agobio', 'Ella te dice que se agobia', 'Se siente presionada y se aleja.', [
      'No te defiendas ni te enfades. Escucha: «Vale, entiendo. Dime qué necesitas».',
      'Baja la frecuencia de mensajes y planes.',
      'Pregúntate con honestidad si te has pasado.',
      'Si ella decide parar, respétalo.'
    ], 'Aprender de esto te hace mejor para la siguiente.', 'Pensar en qué ritmo de contacto me parece sano'),
    S12('g-ella-pide-consejo', 'Te pide consejo sobre otro chico', 'Te cuenta cosas de alguien que le gusta y te pide opinión.', [
      'Suele indicar que te ve como amigo. Responde con sinceridad pero sin mentir.',
      'Si te duele, puedes decirle que prefieres no hablar de eso.',
      'No la sabotees ni hables mal de él.',
      'Valora si quieres seguir esa amistad con esa dinámica.'
    ], 'Cuidarte también es poner límites a lo que te cuesta.', 'Decir «prefiero no hablar de esto» si me duele')
  ]},
  { bloque:'Tus inseguridades concretas', items:[
    S12('g-pelo', 'Te da vergüenza tu pelo', 'Piensas que se fijan en tu pelo (cantidad, forma, cambios).', [
      'Casi nadie se fija tanto como tú. A la gente le llama más cómo te mueves, cómo hablas y cómo sonríes.',
      'Un buen corte hecho por un barbero de confianza cambia mucho.',
      'Si has hecho algo para mejorarlo, disfruta de ello: es cuidarte.',
      'Cuando te acompleje, recuerda que lo que se nota es la seguridad, no el pelo.'
    ], 'Cuidarte es una forma de quererte. Ya lo estás haciendo.', 'Ir al barbero con una idea clara de lo que me favorece'),
    S12('g-barriga', 'Te preocupa tu barriga', 'Tienes complejo por la barriga y evitas ciertas ropas o situaciones.', [
      'Casi todo el mundo tiene algo así. Importa menos de lo que crees.',
      'Ropa de tu talla (ni muy ajustada ni muy holgada) estiliza más que esconderte.',
      'Caminar, moverte y comer tranquilo mejora cuerpo y ánimo sin obsesiones.',
      'No te pierdas planes por esto: la playa, el baile y las cenas no dependen de ella.'
    ], 'Cuidarte por salud y bienestar, no por castigo, funciona mejor.', 'Dar un paseo diario de 20 minutos esta semana'),
    S12('g-altura', 'Te preocupa tu altura', 'Piensas que no es la «ideal».', [
      'La altura importa menos de lo que parece. La seguridad y la actitud pesan más.',
      'Ropa que te quede bien y buena postura ayudan.',
      'No te compares con modelos: casi nadie se parece a ellos.',
      'Mucha gente valora cómo la haces sentir, no cuánto mides.'
    ], 'Lo que más se nota es cuánto te gustas tú.', 'Mejorar mi postura al caminar'),
    S12('g-29', 'Sientes que a los 29 vas «tarde»', 'Miras a otros con pareja y piensas que ya es tarde.', [
      'No hay un reloj oficial. Cada persona tiene su ritmo.',
      'Llegar con más autoconocimiento suele dar relaciones mejores.',
      'En Barcelona hay muchísima gente soltera de tu edad y de más.',
      'Céntrate en lo que puedes hacer hoy, no en lo que «deberías» haber hecho.'
    ], 'Nunca es tarde. Y tu momento está llegando.', 'Recordar que cada cual tiene su ritmo'),
    S12('g-pocas-parejas', 'Has tenido pocas parejas', 'Te da vergüenza admitirlo.', [
      'No es un defecto: es tu historia. Lo importante es dónde quieres ir.',
      'Cuando salga el tema, sé sincero y sereno: «No he tenido muchas relaciones, pero sé lo que busco».',
      'La honestidad atrae más que aparentar.',
      'Aprender ahora te da una base más consciente.'
    ], 'Tu historia no te define. Lo que hagas desde hoy, sí.', 'Pensar una frase sincera y tranquila sobre mi historia'),
    S12('g-besar', 'Te preocupa no saber besar', 'Crees que lo harás mal y que se notará.', [
      'Se aprende besando. Nadie lo hace perfecto al principio.',
      'Empieza suave, sin prisa, y fíjate en cómo responde.',
      'Respeta su ritmo y sé flexible. Si algo no encaja, sonreíd y seguid.',
      'Un buen beso es atención, no técnica.'
    ], 'La torpeza de los primeros besos es parte del encanto.', 'Recordarme que se aprende con calma'),
    S12('g-voz', 'No te gusta tu voz', 'Te escuchas en un audio y te da vergüenza.', [
      'Todos nos oímos distinto por dentro. En grabaciones suena más extraño, pero a los demás les suena normal.',
      'Habla más despacio y con pausas: gana presencia.',
      'Cantar o leer en voz alta ayuda a soltarte.',
      'Tu voz es parte de ti y a la gente le suena familiar y agradable.'
    ], 'Acostumbrarte a oírte es parte del cambio.', 'Grabar un audio y escucharlo con calma'),
    S12('g-sonrisa', 'Te da corte tu sonrisa', 'No sonríes mucho porque no te gustan tus dientes.', [
      'Una sonrisa natural gusta más que una perfecta.',
      'Si algo te molesta de verdad, un dentista puede orientarte.',
      'Mientras tanto, sonríe con los ojos y con calma.',
      'Casi nadie se fija en los detalles que a ti te obsesionan.'
    ], 'Sonreír te hace parecer más cercano.', 'Sonreír una vez más al día de lo habitual'),
    S12('g-piel', 'Te acomplejan la piel o los granos', 'Sientes que se nota mucho.', [
      'Casi nadie lo mira como tú. Es un detalle que solo ves tú.',
      'Una rutina sencilla (limpiar, hidratar, protección solar) ayuda.',
      'Si te preocupa, un dermatólogo puede darte soluciones.',
      'Cuidarte la piel es cuidarte, no esconderte.'
    ], 'Mejorar un poco ayuda, y no es necesario sufrir hasta entonces.', 'Empezar una rutina de piel sencilla'),
    S12('g-timidez', 'La timidez te frena en el cuerpo', 'Te bloqueas, te pones rojo o te quedas rígido.', [
      'La timidez es normal y se puede suavizar con práctica.',
      'Respira, afloja los hombros y sonríe antes de hablar.',
      'Empieza por conversaciones cortas y de poca presión.',
      'Hablar con alguien de confianza antes de salir ayuda a calentar.'
    ], 'La timidez baja con cada intento, aunque no lo notes.', 'Hablar con alguien de confianza antes de un plan'),
    S12('g-sin-hobbies', 'Sientes que no tienes nada interesante que contar', 'Te parece que tu vida es poco emocionante.', [
      'Lo interesante no es lo extraordinario, sino cómo lo cuentas y cuánta ilusión pones.',
      'Haz una lista de lo que te gusta (música, planes, IA, viajar) y empieza por ahí.',
      'Prueba cosas nuevas: un curso, un concierto, un plan diferente. Así tienes qué contar.',
      'Preguntar bien es tan interesante como contar bien.'
    ], 'Siempre hay algo que contar. Lo difícil es creerlo.', 'Elegir una actividad nueva este mes'),
    S12('g-no-coche', 'No tienes coche o tu situación es sencilla', 'Piensas que tener cosas te daría más valor.', [
      'Lo que cuenta es cómo eres, no lo que tienes.',
      'En Barcelona mucha gente no tiene coche. Es lo más normal.',
      'Propón planes sencillos y cercanos: paseos, vermut, conciertos.',
      'Una persona que te valora por lo que posees no es la que quieres cerca.'
    ], 'La sencillez bien llevada es muy atractiva.', 'Proponer un plan sencillo y cercano')
  ]}
);
