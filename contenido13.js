/* Contenido ampliado 12: conversaciones difíciles, más situaciones de noche y citas más allá de la primera. */
'use strict';
const S13 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

GUIA.push(
  { bloque:'Conversaciones difíciles', items:[
    S13('g-decir-no', 'Decir que no a algo que no te apetece', 'Te piden un plan, un favor o algo y no quieres, pero te cuesta decirlo.', [
      'Un «no» claro y amable basta: «Gracias, pero hoy no me apetece».',
      'No hace falta dar una excusa larga. Cuanto más explicas, más parece que dudas.',
      'Si quieres, ofrece una alternativa: «Otro día sí».',
      'Decir que no te enseña que puedes y mejora tu autoestima.'
    ], 'Quien te quiere bien entiende un «no».', 'Decir un «no» amable esta semana'),
    S13('g-perdon', 'Pedir perdón cuando te has equivocado', 'Metes la pata y no sabes cómo disculparte.', [
      'Hazlo pronto y sin dramatizar: «Perdona, me pasé».',
      'Di qué hiciste concretamente, sin excusas.',
      'Pregunta si hay algo que pueda arreglar.',
      'Y después, no te castigues. Aprender y seguir.'
    ], 'Pedir perdón bien es una de las cosas más maduras.', 'Pedir perdón con una frase corta y concreta'),
    S13('g-sentimientos', 'Hablar de lo que sientes', 'Te cuesta poner en palabras lo que te pasa por dentro.', [
      'Empieza por lo sencillo: «Hoy me siento un poco nervioso».',
      'Usa «me siento» en vez de «tú haces».',
      'No hace falta contarlo todo: lo justo para que te entiendan.',
      'Escribirlo antes en el diario ayuda a ordenarlo.'
    ], 'Cada vez que lo dices, cuesta menos.', 'Contar a alguien de confianza cómo me siento hoy'),
    S13('g-critica', 'Recibes una crítica', 'Alguien te dice algo que no te gusta y te quedas rumiando.', [
      'Respira y escucha entera. No te defiendas en el primer segundo.',
      'Pregunta: «¿Puedes darme un ejemplo?». Te ayuda a entenderla.',
      'Separa lo útil de lo injusto. Quédate con lo que sirve.',
      'Agradece si fue con buena intención.'
    ], 'Una crítica es información, no un veredicto.', 'Contestar «gracias, lo pienso» a una crítica'),
    S13('g-conflicto-amigo', 'Discutes con un amigo', 'Hay un malentendido o una discusión con alguien cercano.', [
      'Deja pasar un poco de tiempo antes de hablar, si estás alterado.',
      'Dile cómo te sentiste: «Me sentó mal que…».',
      'Escucha su versión sin interrumpir.',
      'Busca un acuerdo, no un ganador.'
    ], 'Una amistad que se repara aguanta más que una que nunca discute.', 'Escribir cómo me sentí antes de hablar'),
    S13('g-malentendido', 'Un mensaje se malinterpreta', 'Escribes algo y lo toman mal.', [
      'Aclara pronto: «Creo que no me expliqué bien. Lo que quería decir es…».',
      'Si es importante, mejor una llamada o hablarlo en persona.',
      'No te pongas a la defensiva.',
      'Los mensajes pierden tono: usa emojis o frases más cálidas.'
    ], 'Pasa a todos. Se arregla con una frase.', 'Aclarar un malentendido con un mensaje sereno'),
    S13('g-celos-ella', 'Ella siente celos', 'Ella se pone celosa de una amiga o de un plan.', [
      'Escucha sin burlarte ni minimizar.',
      'Tranquilízala sin renunciar a tu vida: «Me importas y no pasa nada raro».',
      'Pregunta qué necesita para sentirse segura.',
      'Si es muy frecuente y limita tu vida, habladlo con calma.'
    ], 'Los celos hablan de inseguridad, no de maldad.', 'Responder a una inquietud con calma y claridad'),
    S13('g-mentira', 'Descubres que te ha mentido', 'Te enteras de que no fue sincera en algo.', [
      'Respira antes de reaccionar. Mira qué es exactamente.',
      'Habla en calma: «Me enteré de esto y me gustaría entenderlo».',
      'Escucha y valora si es algo puntual o un patrón.',
      'La confianza se gana con hechos. Decide con calma.'
    ], 'No tienes que decidir en el momento.', 'Esperar un día antes de decidir tras un enfado'),
    S13('g-expectativas-distintas', 'Queréis cosas distintas', 'Tú buscas algo serio y ella algo más ligero (o al revés).', [
      'Habladlo pronto y sin dramas: «Yo busco esto, ¿y tú?».',
      'No cambies lo que buscas por miedo a perderla.',
      'Si no coincidís, mejor saberlo cuanto antes.',
      'Despedirse a tiempo evita sufrir más.'
    ], 'Quien busca lo mismo que tú existe.', 'Tener clara mi respuesta a «¿qué buscas?»'),
    S13('g-contar-ansiedad', 'Contarle que tienes ansiedad', 'Quieres sincerarte pero no sabes cuándo ni cómo.', [
      'No hace falta contarlo en la primera cita. Cuando haya confianza.',
      'Hazlo simple: «A veces me pongo nervioso en situaciones sociales».',
      'Cuenta también lo que has avanzado y cómo te cuidas.',
      'Quien te quiere te entenderá y valorará tu sinceridad.'
    ], 'Es más común de lo que parece. Casi todos tienen algo.', 'Pensar cómo lo diría con mis palabras'),
    S13('g-hablar-terapia', 'Hablar de que vas a terapia', 'No sabes si decirlo o cómo lo van a tomar.', [
      'Ir a terapia es señal de madurez y cuidado.',
      'Puedes decirlo con naturalidad: «Voy a terapia y me ayuda mucho».',
      'No hace falta dar detalles.',
      'Si alguien lo juzga, esa persona no es para ti.'
    ], 'Cada vez más gente va. No estás solo.', 'Decirlo con naturalidad cuando salga'),
    S13('g-medicacion', 'Hablar de que tomas medicación', 'Dudas si decirlo y cómo.', [
      'Es información personal: decides tú cuándo y a quién.',
      'Cuando haya confianza, basta con: «Tomo algo que me ayuda con la ansiedad».',
      'Con alcohol, consulta a tu médico y sé honesto contigo.',
      'No tiene nada de vergonzoso. Es cuidarte.'
    ], 'Cuidarte es una fortaleza.', 'Preguntar a mi médico cómo combinar medicación y alcohol')
  ]},
  { bloque:'Más situaciones de noche', items:[
    S13('g-cola-disco', 'En la cola de una discoteca', 'Hay que esperar y tienes a mucha gente alrededor.', [
      'La cola es un buen momento para hablar: no hay música, hay tiempo.',
      'Comenta algo: «Qué cola, ¿eh?» o «¿Sabéis si hoy es buena la sesión?».',
      'Con tus amigos, no os encerréis: abrid el círculo.',
      'Si te sientes incómodo, respira y escucha la música de dentro.'
    ], 'Las colas unen a la gente. Aprovéchalas.', 'Hablar con alguien de la cola'),
    S13('g-barra', 'Pedir en la barra', 'Hay mucha gente y no sabes cómo hacerte ver.', [
      'Colócate donde te vean y haz contacto visual con el camarero.',
      'Ten claro qué quieres pedir antes de llegar.',
      'Si estás al lado de alguien, puedes preguntar: «¿Te pido algo?».',
      'Sé amable: el trato al camarero habla mucho de ti.'
    ], 'La barra es el mejor sitio para hablar con quien tienes al lado.', 'Preguntar «¿qué estás tomando?» a quien tenga al lado en la barra'),
    S13('g-brindis', 'Un brindis o una ronda', 'Todos levantan la copa y no sabes qué decir.', [
      'Un «¡Salud!» y mirar a los ojos es suficiente.',
      'Si te toca decir algo, algo corto y sincero: «Por esta noche».',
      'No hace falta ser gracioso. Con calma vale.',
      'Choca con todos los que tengas cerca, mirando a cada uno.'
    ], 'Los brindis unen: es un momento fácil.', 'Brindar mirando a los ojos'),
    S13('g-juegos-beber', 'Juegos de beber', 'Alguien propone un juego y tú no quieres beber mucho.', [
      'Puedes decir que no: «Yo me quedo mirando» o «Juego con agua».',
      'Nadie debería presionarte a beber más de lo que quieres.',
      'Si participas, ponte un límite antes.',
      'Los que de verdad quieren pasarlo bien respetan tu decisión.'
    ], 'Decidir por ti es de lo más atractivo.', 'Decir «yo con agua» sin dar explicaciones'),
    S13('g-karaoke', 'Karaoke o un juego en grupo', 'Te da vergüenza cantar o participar.', [
      'La gracia del karaoke no es cantar bien, es disfrutar.',
      'Elige una canción conocida y deja que el grupo te acompañe.',
      'Si no quieres, anima a los demás: también cuenta.',
      'Reírte de ti mismo da una imagen muy buena.'
    ], 'Quien se atreve, aunque sea mal, se gana al grupo.', 'Cantar una canción en el karaoke aunque salga mal'),
    S13('g-bailar-solo', 'Bailar sin saber', 'Te da vergüenza bailar delante de gente.', [
      'Nadie mira tanto como crees: están concentrados en sí mismos.',
      'Empieza con un movimiento sencillo al ritmo, sin florituras.',
      'Si estás con amigos, baila con ellos primero.',
      'Disfruta de la música: eso se nota.'
    ], 'Bailar mal con ganas es mejor que no bailar por miedo.', 'Bailar una canción entera en una fiesta'),
    S13('g-musica-no', 'La música no te gusta', 'Eres melómano y el sitio pone cosas que no te van.', [
      'No te amargues: puedes salir a tomar el aire o charlar fuera.',
      'Proponer otro sitio cuando tus amigos quieran es normal.',
      'La música que no te gusta puede ser una conversación: «¿Y qué sueles escuchar tú?».',
      'Elige tú algún plan con música de la tuya.'
    ], 'Tu criterio musical es un punto fuerte: úsalo.', 'Proponer un plan con música que me guste'),
    S13('g-conocido', 'Te encuentras con un conocido', 'Alguien que conoces de lejos aparece y te saluda.', [
      'Sonríe, saluda y pregunta cómo está.',
      'Preséntalo a tus amigos: te hace parecer sociable.',
      'No te sientas obligado a quedarte mucho rato.',
      'Un conocido puede ser una puerta a conocer a más gente.'
    ], 'Cada saludo cuenta como práctica.', 'Saludar a un conocido con ganas'),
    S13('g-grupo-cerrado', 'Un grupo cerrado que no te deja entrar', 'Intentas unirte y no te hacen hueco.', [
      'No fuerces. Si es cerrado, prueba con otro grupo.',
      'Un grupo abierto se nota: giran el cuerpo, hacen sitio, sonríen.',
      'No es contra ti. Muchos grupos están en su momento.',
      'Mejor uno o dos que un grupo grande.'
    ], 'Hay muchos grupos abiertos esperando. Vale la pena probar.', 'Buscar el siguiente grupo abierto'),
    S13('g-llegar-solo', 'Llegar solo a una fiesta', 'Entras y no ves a nadie conocido.', [
      'Busca al anfitrión o a alguien que conozcas aunque sea de vista.',
      'Ve a la bebida o a la comida: es un buen sitio para conocer a gente.',
      'Pregunta a alguien: «¿De qué conoces al anfitrión?».',
      'Si te agobia, sal un momento y vuelve.'
    ], 'La primera media hora es la peor. Después mejora.', 'Quedarme al menos 30 minutos en una fiesta nueva'),
    S13('g-pesado', 'Alguien se pone pesado contigo', 'Insiste en hablarte o te acorrala y no sabes cómo cortar.', [
      'Sé claro y amable: «Voy a ir con mis amigos, ¡pásalo bien!».',
      'Si insiste, ve a un sitio con más gente o pide ayuda a un amigo o al personal del local.',
      'No hace falta que seas simpático hasta el final. Tu comodidad primero.',
      'Si te incomoda de verdad, avisa al local.'
    ], 'Tienes derecho a irte de una conversación.', 'Practicar la frase «voy con mis amigos, ¡pásalo bien!»'),
    S13('g-presion-consumir', 'Te ofrecen algo que no quieres tomar', 'Alguien te ofrece drogas u otra cosa y te sientes presionado.', [
      'Un «no, gracias» claro, con una sonrisa, es suficiente.',
      'No tienes que dar explicaciones. «Yo no» es completo.',
      'Si insisten, acércate a tus amigos o cambia de sitio.',
      'Cuida tu vaso y no tomes nada que no hayas visto preparar.'
    ], 'Quien te presiona no te respeta. Lo bueno es que tú sí lo haces.', 'Practicar «no, gracias» con una sonrisa'),
    S13('g-vaso', 'Cuidar tu bebida', 'Dejas el vaso en una mesa o lo pierdes de vista.', [
      'No lo dejes sin vigilar ni aceptes bebidas de desconocidos.',
      'Si lo dejas, pide otro: mejor eso que arriesgarte.',
      'Cuida de tus amigos también: avísalos si ves algo raro.',
      'Si alguien se siente mal de repente, avisa a seguridad o a emergencias.'
    ], 'Cuidar de ti y de los tuyos es de los mejores hábitos.', 'Acostumbrarme a no perder de vista mi vaso'),
    S13('g-ex-fiesta', 'Ves a tu ex en una fiesta', 'Aparece de repente y te descoloca.', [
      'Respira. No tienes que hacer nada especial.',
      'Si te apetece, saluda con calma. Si no, evítalo sin culpa.',
      'No bebas para aguantarlo.',
      'Si te remueve, apártate un rato y habla con alguien.'
    ], 'Verla no borra lo avanzado.', 'Saludar con tranquilidad o evitar sin culpa'),
    S13('g-taxi', 'Volver a casa de noche con alguien', 'Compartís taxi o camino y no sabes cómo despedirte.', [
      'Hablad de cómo vais a volver antes: con quién y por dónde.',
      'Acompáñala hasta que llegue o espera a que te escriba.',
      'Despídete con cariño: «Me lo he pasado genial. Escríbeme cuando llegues».',
      'No te invites a su casa. Si ella lo propone, respóndele con calma y claridad.'
    ], 'Cuidar de que llegue bien dice mucho de ti.', 'Pedir que me escriba cuando llegue a casa')
  ]},
  { bloque:'Citas y relación: más allá de la primera vez', items:[
    S13('g-cena-casa', 'Cocinar para ella en casa', 'Le propones una cena en tu casa y te entran dudas.', [
      'Elige algo sencillo que te salga bien. Mejor eso que algo complicado.',
      'Prepara la casa: limpia, buena música y luz agradable.',
      'No des por hecho nada más. Una cena es una cena.',
      'Si surge, se habla y se decide entre los dos.'
    ], 'Una cena bien hecha, aunque sea sencilla, impresiona mucho.', 'Practicar una receta sencilla que me salga bien'),
    S13('g-escapada', 'Una escapada de fin de semana', 'Os planteáis un viaje juntos y no sabes si es pronto.', [
      'Habladlo con claridad: dónde dormís y qué esperáis.',
      'Mejor al principio algo corto y cercano.',
      'Dejad espacio para el descanso y para cada uno.',
      'Si hay dudas, esperad un poco más.'
    ], 'Viajar juntos enseña mucho de cómo sois.', 'Proponer un día de excursión antes de un fin de semana'),
    S13('g-regalo', 'Un regalo o un detalle', 'Quieres sorprenderla pero no sabes qué.', [
      'Lo mejor es algo pequeño que demuestre que la escuchas: un disco, un libro, una flor.',
      'No hace falta gastar mucho. Importa el detalle.',
      'Una nota escrita a mano suma mucho.',
      'Evita algo muy caro al principio: puede incomodar.'
    ], 'Los mejores regalos son los que muestran atención.', 'Apuntar cosas que menciona para futuros detalles'),
    S13('g-cumple-ella', 'Su cumpleaños', 'Se acerca y quieres hacerlo bien.', [
      'Pregunta con tiempo cómo le gustaría celebrarlo.',
      'Un detalle personal y un buen plan cuentan más que algo grande.',
      'Escríbele pronto el día de su cumpleaños.',
      'Si hay amigos, preséntate con calma y sin acaparar.'
    ], 'No tiene que ser perfecto. Tiene que ser pensado.', 'Preguntar qué plan le apetece'),
    S13('g-cine', 'Una cita en el cine', 'No sabes si es buena idea porque no se habla.', [
      'Para una primera cita no es lo mejor: no hay conversación. Mejor para la segunda o tercera.',
      'Elige una película que os guste a los dos y comentad después.',
      'Planea algo antes o después para charlar.',
      'Evita pelis demasiado largas o pesadas.'
    ], 'El cine es mejor con confianza.', 'Proponer un plan antes o después de la película'),
    S13('g-museo', 'Una cita en un museo o una exposición', 'Quieres un plan diferente.', [
      'Es un plan muy bueno: hay temas de conversación a cada paso.',
      'Pregunta qué le gusta y qué no. Comparte tus impresiones.',
      'No te alargues demasiado: dos horas es suficiente.',
      'Termina con un café para charlar.'
    ], 'Los museos dan mucho tema y poca presión.', 'Proponer una exposición que me guste'),
    S13('g-conc-cita', 'Ir a un concierto juntos', 'Es un plan genial para un melómano.', [
      'Elige un grupo que le guste o un concierto pequeño.',
      'Llegad con tiempo para charlar antes.',
      'Si no puede haber conversación durante, hacedlo en el tiempo entre canciones.',
      'Después, tomad algo y comentad lo mejor.'
    ], 'Compartir música une muchísimo.', 'Proponer un concierto pequeño'),
    S13('g-gym-cita', 'Hacer ejercicio juntos', 'Quieres un plan activo.', [
      'Una caminata, escalada o clase de baile son más divertidos que un gimnasio.',
      'Es un plan que rompe el hielo sin presión.',
      'Adapta al nivel de los dos y evita competir.',
      'Después, un refresco o un desayuno para charlar.'
    ], 'Lo físico y lo divertido van muy bien juntos.', 'Proponer una excursión o una clase')
  ]}
);
