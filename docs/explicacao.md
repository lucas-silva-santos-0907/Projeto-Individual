## Visão geral das alterações do mural

- **Motivação**: o mural precisava de uma implementação própria, com rotas, controller e modelo independentes dos avisos. Também precisávamos suportar publicar, curtir, comentar e deletar usando os nomes de colunas reais listados no `Projeto Individual.sql` e seguir o passo a passo do guia de criação de rotas.
- **Arquitetura**: mantivemos `app.js` com as rotas existentes e adicionamos um novo `muralRouter` visto apenas na rota `/mural`, evitando misturar funcionalidades com `avisos`.

## Etapas detalhadas e justificativas

1. **Registro de rota (PASSO_A_PASSO_CRIAR_ROTA_NA_API.md)**
   - Importei `muralRouter` no `app.js` e usei `app.use("/mural", muralRouter);` para expor o novo endpoint. Isso seguiu exatamente o modelo do documento auxiliar: importar, ligar o `router` e criar novas portas (`/listar`, `/publicar`, `/curtir`, `/descurtir`, `/comentar`, `/deletar`).
   - A rota `/mural` garante que nenhum código do `avisos.js` seja reutilizado indevidamente; deixamos a responsabilidade do mural concentrada nesse novo módulo.

2. **Criação do controller (`src/controllers/muralController.js`)**
   - Adicionei funções `listar`, `publicar`, `curtir`, `descurtir`, `comentar` e `deletar`, combinando chamadas ao model com validações simples (campos obrigatórios, sessão, confirmação ao deletar). Cada função captura erros e responde com status apropriado (200, 400, 500).
   - O método `listar` reúne as promessas de `muralModel.listarPosts()`, `listarComentarios()` e `listarCurtidasUsuario(idUsuario)` para montar o payload com `curtidoPorMim`, `totalCurtidas` e os comentários agrupados por `idMural`.
   - Ao adicionar `deletar` à exportação final garantimos que a rota `DELETE /mural/deletar/:idMural/:idUsuario` possa ser chamada.

3. **Modelo alinhado ao banco (`src/models/muralModel.js`)**
   - As queries usam exatamente os nomes do `Projeto Individual.sql`: `mural(id, conteudo, dtPublicacao, fkUsuario)`, `comentario(conteudo, dtComentario, fkUsuario, fkMural)` e `curtida(fkUsuario, fkMural)`.
   - `listarPosts` faz `LEFT JOIN` com a tabela `curtida` para somar curtidas, mantendo `COALESCE` para zero. `listarComentarios` traz o nome do usuário (`usuario.nome`) para preencher a lista no front.
   - `publicar`, `curtir`, `descurtir` e `comentar` realizam inserts/deletes usando os campos exatamente como definidos no SQL, com logs (`console.log`) para facilitar o rastreamento das instruções.
   - `deletar` limpa dependências (comentários e curtidas) antes de apagar o post, evitando violações de chave estrangeira; a função encadeia as execuções com `reduce` para garantir que cada instrução rode sequencialmente.

4. **Nova interface do mural (`public/dashboard/mural.html`)**
   - Reescrevi a estrutura do HTML para refletir o layout descrito no plano: header com `avatar`, formulário estilizado e cards contendo conteúdo, contagem de curtidas, formulário de comentário e botões curtir/excluir.
   - O script agora faz: validação de sessão, `fetch` para `/mural/*`, manipulação do DOM criando cards com funções `criarCard`, `criarListaComentarios`, `toggleCurtida`, `comentarMural` e `deletarMural`. Essas funções mantêm o feedback do usuário (alertas e atualizações do feed) sem recarregar a página.
   - O botão “Excluir” chama `deletarMural`, que pede confirmação e usa `fetch` com método `DELETE` para a nova rota; após o sucesso o feed é recarregado.

5. **Estilos atualizados (`public/css/dashboards.css`)**
   - Acrescentei classes que dão suporte à nova interface: `.mural-card-actions`, `.mural-action-button`, `.mural-action-button--danger`, `.mural-card-comments`, `.mural-comment-form`, `.mural-comments-list`, `.mural-comment`, `.mural-comment-empty`, `.mural-feed-status` e `.mural-empty`. Assim, o visual segue a identidade Hora de Aventura pedida na instrução do plano.

## Fluxo completo (entrada à saída)

1. **Requisição**: o front envia `POST /mural/publicar/:idUsuario` ou `DELETE /mural/deletar/:idMural/:idUsuario` (ou outras ações) com o corpo `conteudo` conforme necessário.
2. **Rotas**: `src/routes/mural.js` direciona cada verbo HTTP e caminho para a função do controller correspondente, respeitando o `module.exports` ampliado para incluir `deletar`.
3. **Controller**: `muralController` faz validações básicas, chama as funções do modelo e trata promessas com `.then/.catch`, respondendo com status e mensagens adequadas.
4. **Model**: `muralModel` constrói instruções SQL usando os nomes das colunas reais e executa via `database.executar`. Os logs imprimem cada instrução, facilitando debugging.
5. **Banco**: toda interação lê/escreve nas tabelas `mural`, `comentario` e `curtida` conforme definido em `Projeto Individual.sql`. A exclusão remove primeiro os registros dependentes (`comentario` e `curtida`) e só então remove o mural.
6. **Front**: o script do mural consome `/mural/listar/:idUsuario` para montar o feed com curtidas e comentários, além de acionar `toggleCurtida`, `comentarMural` e `deletarMural` conforme a ação do usuário; o CSS garante o visual desejado.

## Observações finais

- Todas as rotas e models do mural são novas, então não houve impacto direto nas rotas existentes de `avisos`. Isso preserva a arquitetura pedida: mural e avisos seguem caminhos separados.
- Se precisar comprovar blocos de SQL executados, os `console.log` nas functions do model já mostram cada `instrucaoSql` no terminal.
- Caso queira adicionar autenticação real, verifique se `sessionStorage.ID_USUARIO` existe antes de cada ação e, no backend, verifique se o `fkUsuario` confere com o dono da publicação antes de deletar.
