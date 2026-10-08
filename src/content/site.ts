export const HERO = {
  headline: 'SE VOCÊ NÃO VOTOU NO PRIMEIRO TURNO DAS ELEIÇÕES, VOCÊ AINDA PODE FAZER A DIFERENÇA!',
  cta: 'SAIBA MAIS',
} as const;

export interface TimelineMilestone { year: string; title: string; description: string }

export const PESO = {
  title: 'O PESO DO SEU VOTO',
  history: [
    'Historicamente no Brasil, o direito ao voto para todos ainda é uma conquista recente, que só foi plenamente alcançada na **Constituição Federal de 1988**, com a redemocratização do país no pós-ditadura.',
    'Antes disso, passamos por várias mudanças no que diz respeito ao direito ao voto censitário, as eleições indiretas, a ditadura e, por fim o voto universal (para todos os cidadãos maiores de 18 anos) com a redemocratização do país e a Constituição Federal de 1988.',
    'Ou seja, pessoas do sexo feminino, de ascendência indígena, africana, cigana, de religião matriz-africana ou pobre, não poderiam votar 60 anos atrás, muito menos á 100 ou 200 anos atrás.',
  ],
  closing: 'Se você se identificou com algum desses grupos que foi citado, o peso da sua escolha hoje é ainda maior.',
} as const;

// Note in a code comment: the timeline years are standard historical anchors that support the original prose (censitário, indiretas, ditadura, 1988); they add no claim beyond it.
export const TIMELINE: readonly TimelineMilestone[] = [
  { year: '1824', title: 'Voto censitário', description: 'O direito ao voto era restrito por renda: só votava quem tinha posses.' },
  { year: '1932', title: 'Voto feminino', description: 'O Código Eleitoral garantiu o voto às mulheres.' },
  { year: '1964', title: 'Ditadura e voto indireto', description: 'Eleições indiretas e supressão de direitos durante o regime militar.' },
  { year: '1988', title: 'Voto universal', description: 'A Constituição Cidadã consagra o voto para todos os maiores de 18 anos.' },
] as const;

export const REFLITA = {
  anchor: 'QUANDO VOCÊ NÃO ESCOLHE, ALGUÉM ESCOLHE POR VOCÊ.',
  body: [
    'Votar não é apenas cumprir uma obrigação ou escolher um nome nas urnas; é definir quem vai tomar as decisões sobre a sua rotina, o seu bolso, a sua saúde e o futuro da sua comunidade.',
    'Quando você se abstém de votar, o seu silêncio não anula a eleição. Ele apenas transfere o seu poder de escolha para os outros. O resultado vai impactar a sua vida da mesma forma, quer você tenha participado ou não.',
    'Não deixe que decidam o seu amanhã por você. **Pesquise, questione, avalie e faça a sua voz ser ouvida.** O seu voto é a sua principal ferramenta de mudança.',
  ],
} as const;

export const CHAMADA = {
  lines: ['SEU VOTO FAZ A DIFERENÇA.', 'JUNTOS SOMOS MAIS FORTES.', 'NO DIA 25 VÁ ÁS URNAS E EXERÇA ESSE DIREITO.'],
  hashtags: ['#ELENÃO', '#OFILHOTAMBÉMNÃO', '#FASCISTASNÃOPASSARÃO'],
  bloco: 'MEU BRASIL VERDE E AMARELO',
} as const;

export const APRESENTACAO = {
  title: 'APRESENTAÇÃO',
  body: `Quem nós somos?
         O Movimento Onça Pintada surge na onda de movimentos à favor da
campanha de Luís Inácio Lula da Silva (PT) para a presidência, no segundo turno
das eleições de 2026. Ele nasce no calor da luta democrática, na urgência da luta
antifascista e anti-imperialista, impulsionado pela união e pela força necessária para
vencer o segundo turno das eleições. Mas a nossa caminhada não vai parar nas
urnas — na verdade, é onde ela vai começar.
          Não somos um movimento passageiro. Somos uma rede viva de ação social,
cultura e consciência política. Atuamos onde o povo mais precisa, promovendo a
dignidade e a cidadania por meio de iniciativas concretas, com ações sociais,
doações, promoção da cultura e incentivo à educação.
          A onça-pintada, um símbolo da fauna amazônica nacional, mas também de
força, coragem, presença, resistência e proteção do nosso território. Ela surge aqui
como o nosso símbolo de luta. Inspirados por essa força, transformaremos a
mobilização eleitoral em mobilização permanente, a transformação política se faz no
debate, mas se consolida na prática diária da solidariedade e da ocupação dos
espaços públicos. Nossa luta é pelos jovens, pelos estudantes, pelas mulheres,
pelas crianças, pelos imigrantes, pela população preta e indígena, pela comunidade
LGBTQIAPN+, é pelo povo!

          Acreditamos que um Brasil justo e igualitário se constrói com garra, presença
e organização popular. O Movimento Onça Pintada seguirá de pé, com os pés no
chão e o olhar no futuro, mostrando que a nossa maior vitória é a transformação
contínua da vida do nosso povo. Junte-se a nós. Nossa força é coletiva, nossa
luta é diária.

          Faça parte desse movimento, vá às ruas, vá às urnas. A nossa organização
é a base da mudança, o nosso voto é a nossa arma mais forte. Juntos somos mais
fortes!

               #ELENÃO #OFILHOTAMBÉMNÃO #JUVENTUDEANTIFASCISTA
     #MOVIMENTOSOCIAL #LUTACOLETIVA #MOVIMENTOONÇAPINTADA`,
} as const;

export const SOBRE_CORRUPCAO = {
  title: 'SOBRE A CORRUPÇÃO',
  body: `O escândalo do Banco Master, do banqueiro Daniel Vorcaro ganhou imensa
repercussão nacional, sendo tratado por autoridades e figuras públicas como um dos
maiores casos de fraude e rombo econômico da história recente do país. O que
pouca gente sabe é que a Polícia Federal investiga o senador e candidato à
Presidência, Flávio Bolsonaro (PL) por suspeitas de corrupção, lavagem de dinheiro
e evasão de divisas ligadas a negociações financeiras com Daniel Vorcaro, o
ex-dono do Banco Master.

      Foram divulgadas mensagens e áudios que indicam que Flávio negociou e
pediu recursos (cerca de US$ 24 milhões estimados) a Vorcaro para financiar Dark
Horse, uma cinebiografia sobre o ex-presidente Jair Bolsonaro. A PF também apura
um financiamento de R$ 3,1 milhões concedido pelo Banco de Brasília (BRB) a
Flávio Bolsonaro em 2021 para a compra de uma mansão em Brasília, o que vem
sendo investigado devido às relações entre a diretoria do BRB e o Banco Master.
Diversas mensagens foram recuperadas pela investigação, e mostram trocas
frequentes de contato e tratamento de proximidade entre Flávio e Vorcaro, que foi
preso no final de 2025 no âmbito da Operação Compliance Zero.

      Outras pessoas ligadas ao partido do candidato à presidência, o Partido
Liberal (PL), também são citadas nas investigações do esquema, como Nikolas
Ferreira (PL), Tarcísio de Freitas (Republicanos) e ACM Neto (Republicanos). Outros
escândalos, como a participação em festas sigilosas e orgias na boate Madame
Satã, com a participação de diversas prostitutas também estão sendo apuradas.

      Além disso, o senador Flávio Bolsonaro também atuou como advogado de
defesa de um policial militar acusado de efetuar disparos de fuzil que atingiram e
mataram a menina Ana Clara Gomes Machado, de 5 anos, em Niterói (RJ), em
2020, o que gerou acusações e críticas políticas. Flávio foi o autor de um pedido
perante o Superior Tribunal de Justiça (STJ) para que o caso não fosse à juri
popular, o que causou um atraso no andamento do caso, que segue em aberto e
com julgamento marcado para 2027.
       Eleger candidatos envolvidos em esquemas de corrupção enfraquece a
democracia. O voto é um instrumento de controle social: por meio dela, a população
aprova ou rejeita as condutas de seus líderes. Um país mais justo e ético se constrói
com votos éticos. Exija honestidade de quem pede o seu voto.

       Não acredite em quem diz que “bandido bom é bandido morto” enquanto é
investigado pela PF; não acredite em quem acusa outros de corrupção enquanto é
acusado de corrupção; não acredite em quem defende uma moral que não pratica;
não vote em quem se esconde atrás de “valores cristãos” que não pratica; não
acredite no Flávio Bolsonaro e seus comparsas.

       No dia 25, leve seu título, documento com foto e sua consciência. Seu voto
faz a diferença!

         #ELENÃO #OFILHOTAMBÉMNÃO #FASCISTASNÃOPASSARÃO`,
} as const;

export const SOBRE_VOTO_FEMININO = {
  title: 'SOBRE O DIREITO AO VOTO FEMININO',
  body: `Se você é mulher e votou no Flávio Bolsonaro (PL) no primeiro turno,
essa pode ter sido a última vez que você exerceu esse direito.
       A história da conquista do voto feminino no Brasil é recente. Faz apenas 94
anos que nós mulheres temos o direito de exercer a democracia através do voto. A
conquista desse direito foi marcada por mais de 50 anos de mobilização social e
embates políticos. Milhares de mulheres como Bertha Lutz, Maria Lacerda de Moura
e Almerinda Farias Gama foram às ruas lutar pelo voto. Esse direito foi garantido
nacionalmente em 24 de fevereiro de 1932 através do Decreto nº 21.076, que
instituiu o primeiro Código Eleitoral do país.
       E agora, a extrema direita quer tirar esse direito de você, mulher.
       Várias figuras políticas como Eduarda Camponiano (PL), Índia Armelau (PL),
Bia Kicis (PL), e até mesmo influenciadoras digitais como Pietra Bertolazzi e
Fernanda Guardian, se posicionaram contra o nosso direito de votar. Entre os
homens esse número é bem maior. Muitas dessas pessoas já foram eleitas e estão
nas câmaras estaduais, federais e até mesmo no senado, mas nós ainda podemos
virar o jogo, ainda podemos lutar pela garantia desse direito.
       Por isso, não podemos continuar elegendo pessoas de um partido que diz ser
contra o voto feminino; não podemos eleger pessoas que fechem os olhos para esse
tipo de dicurso; não podemos continuar dando espaço digital para influenciadores e
influenciadoras misóginos e redpill; não podemos continuar ouvindo frases como
“estatisticamente, as mulheres votam muito mal”; não podemos eleger um
vice-presidente acusado de estupro; não podemos eleger o filho de um homem que
disse que “deu uma fraquejada” quando foi pai de uma menina, ou que disse que
“não estupraria você porque você não merece para uma repórter; não podemos
eleger um homem que não respeita a própria esposa; não podemos correr o risco de
perder esse direito; NÃO PODEMOS ELEGER FLÁVIO BOLSONARO COMO
PRESIDENTE.
       O bolsonarismo e seus apoiadores não vão nos calar, não vão nos acuar e
não vão nos vencer. Juntas somos mais fortes. No dia 25 exerça seu direito e não
escolha quem não te escolhe.
             #ELENÃO #OFILHOTAMBÉMNÃO #FASCISTASNÃOPASSARÃO`,
} as const;

export const FOOTER = {
  question: 'QUEM VOCÊ ESTÁ DEIXANDO DECIDIR POR VOCÊ?',
  copyright: '© 2026 Movimento Onça Pintada. Todos os direitos reservados.',
} as const;
