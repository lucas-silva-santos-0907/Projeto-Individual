# Plano de implementação do quiz de personalidade

Requisito oriundo de `docs/quiz-especificacao.md`: refatorar `public/dashboard/quiz.html` para transformar o quiz atual de erros e acertos em um quiz de personalidade sobre Hora de Aventura com 10 perguntas, agora alinhadas a cenários cotidianos de adolescentes em geral, preservando a interface existente.

## Arquivos alterados ou criados
- `public/dashboard/quiz.html`: o único arquivo modificado. Mantém a mesma estrutura HTML e estilos, mas reformula o conteúdo do script para gerar perguntas/desenvolver o cálculo de personalidade e mostrar a descrição final do personagem (incluindo a solicitação de descrição reforçada da Princesa Jujuba).
- `docs/plano-implementacao.md`: este documento (novo) resume a estratégia antes de implementar qualquer mudança.

## Componentes envolvidos
- **HTML existente do quiz**: botões (`INICIAR QUIZ`, `Submeter`, `Avançar`, `Tentar novamente`), indicações de questões e contadores (acertos/erros/pontuação final) permanecem intactos e são reutilizados sem alterações estáticas.
- **Script JavaScript inline**: altera `listaDeQuestoes`, lógica de submissão e finalização, substituindo a lógica de acertos por atribuição de pontos por personagem e exibindo descrição final contextualizada.
- **Módulo de descrições**: inserir um mapa/objeto com os textos que explicam por que cada personagem representa a personalidade do usuário, com atenção especial à Princesa Jujuba alinhada ao perfil dela.

## Fluxo de interação
1. Usuário abre o quiz e clica em `INICIAR QUIZ`.
2. O script inicia arrays com perguntas e contadores de pontuação zerados para os seis personagens.
3. Cada uma das 10 perguntas exibe 4 alternativas, associadas a personagens diferentes; adolescentes escolhem respostas baseadas em situações reais do cotidiano.
4. Ao submeter cada questão, a alternativa selecionada soma um ponto para o personagem correspondente; os botões `Submeter` e `Avançar` são habilitados/desabilitados conforme antes.
5. Ao final, calcula-se o personagem com maior pontuação, atualizando `#msgFinal` com o nome e a descrição do personagem (incluindo o texto ajustado para Princesa Jujuba) e `#spanPontuacaoFinal` com o total de escolhas alinhadas.

## Regras de negócio
- 10 perguntas obrigatórias sobre situações cotidianas (familiares, escola, lazer, relações interpessoais etc.), sem referências específicas ao universo universitário.
- Cada alternativa adiciona exatamente 1 ponto ao personagem associado.
- O quiz não utiliza mais a métrica de acertos/erros, mas os contadores (`#spanCertas`, `#spanErradas`, `#spanPontuacaoFinal`) devem ser reaproveitados para mostrar progresso/resumo (por exemplo, perguntas respondidas). Não há alteração visual; apenas o texto exibido nos spans muda.
- O resultado final apresenta o personagem com maior pontuação e uma breve justificativa narrativa que conecta aspectos da personalidade com o personagem correspondente (descrição especial para Princesa Jujuba).

## Decisões técnicas
- Substituir o array atual `listaDeQuestoes` por objetos contendo `pergunta` e um subobjeto `alternativas` com texto e personagem; isso facilita mapear cada escolha para pontos.
- Reutilizar as funções `iniciarQuiz`, `preencherHTMLcomQuestaoAtual`, `submeter`, `avancar`, e `finalizarJogo`, mas adaptar `checarResposta` (ou uma nova função `registrarResposta`) para apenas somar pontos e controlar o fluxo.
- Adicionar um objeto `descricoesPersonagens` para manter o texto final explicando o resultado (texto novo para Princesa Jujuba) e atualizar `finalizarJogo` para exibir essa narrativa.
- Atualizar os contadores de `#spanCertas`/`#spanErradas` para refletir o número de questões respondidas e pendentes, preservando os mesmos elementos no DOM.

## Etapas numeradas e validação
1. **Redesenhar as 10 perguntas com cenários do cotidiano**
   - Mapear 10 situações reais (ex.: lidar com pressão familiar, lidar com bullying digital, tomar decisões sobre hobbies, apoiar amigos). Cada alternativa deve indicar comportamento ligado a um personagem.
   - Validação: durante testes (por exemplo, imprimir `listaDeQuestoes` no console ou revisar o código), garantir que existam 10 perguntas e que nenhuma referência mencione o contexto universitário.

2. **Refazer a estrutura de dados das questões**
   - Criar `listaDeQuestoes` com objetos `pergunta` e `alternativas`, cada alternativa guardando `texto` e `personagem`, mantendo 4 opções fixas (A-D).
   - Validação: verificar que cada objeto tem os campos esperados e que as alternativas mapeiam para os 6 personagens distintos.

3. **Reimplementar o controle de pontuação**
   - Introduzir um objeto `pontuacoes` com chaves para cada personagem e atualizar a função de submissão para incrementar o personagem escolhido; transformar `checarResposta` em `registrarResposta` linear.
   - Validação: responder todas as perguntas escolhendo opções do mesmo personagem e confirmar via logs ou por `alert`/`console` que ele acumula 10 pontos.

4. **Ajustar os contadores e o fluxo dos botões**
   - Garantir que `btnSubmeter`/`btnProx` funcionem como antes e reabilitam conforme o fluxo; usar os spans para mostrar número de perguntas respondidas e restantes.
   - Validação: durante o quiz, acompanhar o estado dos botões e spans (inspecionar o DOM) e confirmar o fluxo de habilitação/desabilitação padrão.

5. **Exibir o personagem final + descrição**
   - Implementar `descricoesPersonagens` e usar `finalizarJogo` para exibir o personagem vencedor, total de escolhas e o texto descritivo (incluindo o novo texto para a Princesa Jujuba).
   - Validação: após responder 10 perguntas, o texto final deve exibir o nome do personagem mais pontuado e a descrição correspondente, sem erros de referência.

6. **Revisão geral e testes manuais básicos**
   - Rodar `npm start`, acessar `public/dashboard/quiz.html`, percorrer todo o quiz com combinações variadas, observando consoles e comportamento visual.
   - Validação: o quiz roda do início ao fim sem erros, todos os botões respondem e o resultado final aparece com a descrição narrativa.

> Observação: este plano visa guiá-lo na implementação. Aguardo sua confirmação para seguir com as mudanças no código, explicando cada passo conforme você preferir.
