type Input = {
	name: string;
	extension: string;
	locale: string;
	text: string;
	contexts: string[];
}

const inputBuilder = (input: Input, modes?: string[]) => {
	if(!modes) {
		return [input];
	}

	return [
		{ ...input },
		...modes.map(modeName => ({
			...input,
			name: `${input.name}_${modeName}`
		}))
	]
}

const input = [
	...inputBuilder({
		name: "beach",
		extension: "jpg",
		locale: 'pt-BR',
		text: `Ideias geniais
		Bela estava de olho nos surfistas. Eles conseguiram domar as ondas! Certa hora, um deles passou do lado da menina, carregando uma prancha embaixo do braço.
		— Ei, você pode me ensinar a surfar? — perguntou Bela ao garoto.
		— Claro! Mas primeiro deve aprender a dar braçadas! — respondeu o menino.
		— O que são braçadas?
		— É como se estivesse remando com os braços... — explicou o surfista.
		O rapaz ensinou Bela a dar braçadas e a se equilibrar na prancha, enquanto seus amigos pegavam conchinhas.
		— Quero pegar ondas lá, no fundo! — sugeriu Bela.
		O surfista explicou que ela ainda era muito pequena e que deveria aprender mais coisas sobre surfe antes de nadar no fundo. A menina, então agradeceu ao surfista e voltou a brincar perto dos seus amigos.
		— Aprendi a surfar! Aprendi a surfar! — gritava Bela, bem animada.`,
		contexts: ["sea"]
	}, ['skew', 'shadow', 'reflex']),

	...inputBuilder({
		name: "car",
		extension: "jpg",
		locale: 'pt-BR',
		text: `— Podemos subir? — perguntou um galo dourado com a crista vermelha.
Anastácio disse que sim e subiram o galo, cinco galinhas e quinze pintinhos.
E continuaram andando.`,
		contexts: ["chicken"]
	}, ['shadow', 'reflex']),

	...inputBuilder({
		name: "mula",
		extension: "jpg",
		locale: 'pt-BR',
		text: `Ao ver aquela situação,
muito triste o jovem se sentiu.
Ele então encheu-se de coragem
E atrás de sua amada partiu.`,
		contexts: []
	}, ['skew', 'shadow', 'reflex']),

	...inputBuilder({
		name: "piraiaguara",
		extension: "jpg",
		locale: 'pt-BR',
		text: `Quando finalmente chegava na Baía de Guanabara, Piraiaguara estava
sempre sem fôlego. Nunca sabia se a causa era o cansaço ou a beleza daquelas
águas calmas, meio-lago, meio-mar.
As cidades ao seu redor ainda estavam acordando. De um lado, como estrelas
caídas nas margens do mar, as luzes iam-se apagando. Do outro, os vidros
dos prédios e das casas pegavam fogo, inundados pela aurora.`,
		contexts: []
	}, ['skew', 'shadow', 'reflex']),

	...inputBuilder({
		name: "plays",
		extension: "jpg",
		locale: 'pt-BR',
		text: `Outra coisa gostosa é, sem dúvida, sorvete!
Picolés refrescam
e têm sabores de abacaxi, goiaba, baunilha, chocolate.
Meu tio e seus colegas, então,
pintam um carrinho cheio deles.
O carrinho multicolorido
é em si mesmo bem divertido,
Todo feito em branco, vermelho e verde.
São as cores da bandeira da Itália,
país do grande artista Alfredo Volpi.`,
		contexts: []
	}, ['skew', 'shadow', 'reflex']),

	...inputBuilder({
		name: "sabia",
		extension: "jpg",
		locale: 'pt-BR',
		text: `Alexandre e Xerife não viam nenhum fantasma de verdade. De repente, a luz roxa da lanterna bateu de cheio num fantasma enorme:
— Xô, xô, xô... filhote de fantasma!
E o Sr. Fantasma, de olhos fixos no menino, puxou com força a lanterna:
— Esta lanterna é minha...
— Não, não, é minha. Deixe a lanterna! — gritava Alexandre.`,
		contexts: []
	}, ['skew', 'shadow']),

	...inputBuilder({
		name: "guide",
		extension: "jpg",
		locale: 'pt-BR',
		text: `
			— Então todos os seus ajudantes vão ficar parados aí sem fazer nada o dia todo?
			— Talvez, talvez...
			— Bem, se o senhor já se resignou a não fazer nada, o senhor na verdade não precisa que ele fique deitado aqui o tempo todo, não é?
			— O quê?
			— O senhor, na verdade — repetiu Ford, paciente —, não precisa que ele fique aqui.
			O Sr. Prosser pensou um pouco.
			— Bem, é, não exatamente... Precisar, não preciso, não... — disse Prosser, preocupado, por achar que ele, ou Ford, estava dizendo um absurdo.
			— Então o senhor podia perfeitamente fazer de conta que ele ainda está aqui, enquanto eu e ele damos um pulinho no bar, só por meia hora. O que o senhor achar?
			O Sr. Prosser achava aquilo perfeitamente insano.
			— Acho perfeitamente razoável... — disse, com um tom de voz tranquilizador, sem saber quem ele estava tentando tranquilizar.
			— E, se depois o senhor quiser dar uma escapulida pra tomar um chope — disse Ford —, a gente retribui o favor.
			— Muito obrigado — disse o Sr. Prosser, que não sabia mais como conduzir a situação —, muito obrigado, é muita bondade a sua... — Franziu o cenho, depois sorriu, depois tentou fazer as duas coisas ao mesmo tempo, não conseguiu, agarrou seu chapéu de pele e rodou-o no alto da cabeça nervosamente. Só podia char que havia ganhado a parada.
			— Então — prosseguiu Ford Prefect —, se o senhor tiver a bondade de vir até aqui e se deitar...
			— O quê? — exclamou o Sr. Prosser.
			— Ah, desculpe — disse Ford —, acho que não soube me exprimir muito bem. Alguém tem que ficar deitado na frente dos tratores, não é? Senhão eles vão demolir a casa do Sr. Dent.
			— O quê? — repetiu o Sr. Prosser.
			— É muito simples — disse Ford. — Meu cliente, o Sr. Dent, declara que está disposto a não mais ficar deitado aqui na lama com a condição: que o senhor o substitua em seu posto.
			— Que história é essa? — disse Arthur, mas Ford cutucou-o com o pé para que se calasse.
		`,
		contexts: []
	}, ['skew', 'shadow']),

	...inputBuilder({
		name: "immune",
		extension: "jpg",
		locale: 'en-US',
		text: `
			The Empires and Kindoms of the Immune System
			Imagine you were the grand architect of the immune system. Your job is to organize the defenses against millions of intruders that want to take it over. You get to build whatever defenses you like, although the accountants remind you that the body is on a tight energy budget, has no resources to spare, and they kindly ask you to not be wasteful.
			How would you approach this monumental task? What kinda of forces would you put at the front and which ones would you hold in reserve?
			How would you make sure that you could react strongly to a sudden invasion but also prevent your army from exhausting itself too quickly?
			How would you deal with the massive scope of the body and millions of different enemies you would have to account for?
			Luckly, your immune system has found many beautiful and elegant solutions for these problems.
			As we alluded to in the last chapter, the immune system is not singular thing but many different things.
			Hundreds of tiny organs and few bigger ones, a network of vessels and tissues, billions of cells with dozens of specializations and quintillions of free-floating proteins.
			All these parts form different and overlapping layers and systems, so it's helpful to imagine them as empires and kingdoms that, in unison, defend the continent that is your body.
			We can organize them into two very different realms that together represent the most powerful and ingenious principles
			
			So you have probably heard that you have white blood cells and they are your immune cells or something like that.
			Well, while this name has it's use in the right context, it just generally means "the cells of the immune system" and I don't think immunology has done itself a favor with this term.
			"White blood cells" descrives so many different cells that do so many different things that it is sort of useless if you want to understand what is really going on here.
			So you can forget "white blood cells" again because we are not going to use it.
		`,
		contexts: []
	}, ['skew', 'shadow']),

	...inputBuilder({
		name: "digital_giraffe_1",
		extension: "png",
		locale: 'en-US',
		text: `
			Once upon a time, there was a giraffe named Ginger.
			Ginger lived in Kenya, a country in Africa. Like all giraffes, Ginger had a long neck and long legs. Because shw was so tall, she was able to eat food from very tops of tress in the savannah. The savannah in Africa is an area with lots of grass and some trees.
			Sometimes, a savannah is called grasslands. The other animals like zebras and antelopes could not reach where Ginger could reach. But Ginger always found food. She loved the leaves and the new buds of the trees.
		`,
		contexts: ["savannah"]
	})
]

export default input;
