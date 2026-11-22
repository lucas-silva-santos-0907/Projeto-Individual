# Plano de implementação do mural de comentários

Baseado em `docs/mural-especificacao.md`, vamos transformar o mural de avisos existente em um mural de comentários interativo, mantendo as estruturas HTML/CSS/JS/rótulas atuais e gradualmente integrando as novas operações (publicar, curtir, comentar) respeitando o nível de um aluno do primeiro semestre.

## Arquivos alterados ou criados
- `public/dashboard/mural.html`: reaproveitar a estrutura atual, redefinir a área de publicação e os cards do feed, incluir campos de comentário dentro de cada publicação e acomodar os botões de curtir/descurtir. Manter as chamadas às APIs já existentes e adicionar os novos elementos necessários.
- `src/routes/avisos.js`: adicionar novas rotas para curtidas e comentários (`POST /avisos/curtir/:idAviso`, `POST /avisos/comentar/:idAviso`) e ajustar o `GET /avisos/listar` (ou adicionar um filtro) se precisar incluir o total de curtidas e os comentários no retorno.
- `src/controllers/avisoController.js`: implementar novos métodos (`curtir`, `descurtir`, `comentar`) que validem o usuário autenticado e acionem o `avisoModel`, mantendo o padrão de tratamento de erros.
- `src/models/avisoModel.js`: adicionar queries para armazenar curtidas, remover curtidas duplicadas (upsert ou delete), listar contagens de curtidas e buscar comentários por publicação; inserir nova tabela/coluna caso necessário (ex.: tabela `curtida` e `comentario`).
- `public/css/dashboards.css` (ou `estilo.css` quando pertinente): estender os estilos para as novas classes (`.mural`, `.mural-card`, `.mural-likes`, `.mural-comments`) alinhadas ao visual de Hora de Aventura.
- `public/js/alerta.js` ou outro helper: assegurar que os feedbacks (sucesso/erro) sejam exibidos para ações de publicação, curtida e comentário.

## Componentes envolvidos
- **Formulário de publicação**: campo grande de texto e botão para criar novos posts; a função `publicar()` deverá validar o conteúdo (não vazio, não apenas espaços) e chamar `fetch` para gravar no backend.
- **Cards do feed**: cada publicação exibe autor, timestamp opcional, conteúdo, botão de curtir/descurtir, contador de likes, lista de comentários e campo para escrever novos comentários.
- **AJAX (`fetch`)**: reutilizar `/avisos/publicar`, `/avisos/listar` e adicionar novos endpoints para curtidas e comentários; as respostas atualizam o DOM sem recarregar a página.
- **Banco de dados**: tabela `aviso` (já existente), nova tabela `curtida` e `comentario` (caso ainda não existam), com chaves estrangeiras para manter relacionamento com usuários e publicações.

## Fluxo esperado
1. O usuário chega ao mural com `sessionStorage` válido; o `window.onload` executa `validarSessao()` seguido de `atualizarFeed()` (que consome `/avisos/listar`).
2. O formulário de publicação, estilizado conforme o exemplo, dispara `publicar()` (que só aceita texto válido); o `fetch` envia o payload ao backend, limpa o campo e recarrega o feed com `atualizarFeed()`.
3. O feed renderiza cada postagem com autor, conteúdo, contador de curtidas, botão de curtir/descurtir e seção de comentários (cada comentário mostra o autor e texto). Ao clicar em curtir ou enviar comentário, o frontend chama as novas rotas e, ao retornar com sucesso, atualiza o contador/aba de comentários sem recarregar.
4. Todas as interações (publicar, curtir, comentar) exibem mensagens (alertas ou feedbacks) usando `alerta.js` conforme o padrão já adotado.

## Regras de negócio aplicadas
- **Publicação:** somente usuários autenticados podem publicar; o campo não pode ficar em branco nem conter somente espaços; cada publicação é registrada com o `fk_usuario` correto e exibida imediatamente no feed.
- **Curtidas:** usuários autenticados podem curtir e descurtir; não podem curtir duas vezes seguidas sem alternar; o contador de curtidas reflete o número de registros e é persistido em tabela dedicada.
- **Comentários:** cada publicação exibe seus comentários; somente usuários autenticados podem comentar; cada comentário recebe validação de conteúdo (não vazio, não só espaços) e associa o `fk_usuario` e `fk_aviso` correspondentes.
- **Integridade:** todas as operações respeitam as chaves estrangeiras existentes e tratam erros (mensagens padronizadas) antes de responder ao frontend.

## Decisões técnicas
- Reaproveitar as rotas/controllers/models existentes para `avisos`, adicionando apenas as novas funções necessárias (curtir, comentar) sem criar uma estrutura paralela.
- Utilizar `fetch` com métodos HTTP (`POST` para publicar/curtir/comentar, `GET` para listar) e atualizar dinamicamente o DOM (sem recarregar) after each success, mantendo o padrão de ação assíncrona usado no restante do projeto.
- Usar o `alerta.js` para mensagens de sucesso/erro e reutilizar o layout `dashboards.css` para manter a identidade visual, adicionando apenas as classes específicas do mural.
- Para persistência das curtidas e comentários, criar tabelas auxiliares (`curtida`, `comentario`) se ainda não existirem, com chaves estrangeiras que referenciam `usuario` e `aviso`, garantindo que cada interação é associada corretamente.

## Etapas numeradas com validação
1. **Mapear as necessidades do layout**
   - Refaça `mural.html`: reorganize a área de publicação e os cards do feed conforme o exemplo. Adicione os elementos dos comentários (campo + botão) dentro de cada card.
   - Validação: abra a página e confirme visualmente que o header/form/feed seguem a hierarquia desejada mesmo antes de testar o backend.

2. **Padronizar o formulário `publicar()`**
   - Faça o `form` enviar apenas os campos válidos (ex.: `descricao`). Adicione validações de conteúdo (trim não vazio) e utilize `alerta.js` para feedbacks.
   - Validação: ao executar `publicar()` com texto válido, o `fetch` deve devolver 200 e o campo limpar automaticamente (sem recarregar a página).

3. **Renderizar o feed com cards aprimorados**
   - Atualize `atualizarFeed()` para criar cards com autor, conteúdo, curtidas e área de comentários. Faça com que cada comentário apareça abaixo da publicação correspondente.
   - Validação: após a chamada ao endpoint `GET /avisos/listar`, o DOM deve conter cards estilizados com os campos (nome, texto) e uma lista de comentários se já existirem.

4. **Extender backend para curtidas/comentários**
   - Nos arquivos `routes`, `controllers` e `models`, adicione endpoints e implementações para gravar curtidas (`POST /avisos/curtir/:idAviso`) e comentários (`POST /avisos/comentar/:idAviso`). Garanta que essas operações usam o usuário autenticado e validam entradas.
   - Validação: ao curtir/comentar via `fetch` no frontend, o backend responde 200 e a resposta JSON (ou texto) é tratada para atualizar o contador ou a lista de comentários.

5. **Persistência no banco**
   - Se ainda não existirem, crie tabelas `curtida` e `comentario` com `fk_aviso`, `fk_usuario`, `data`. Adapte os modelos para inserir e listar (join com `usuario` para exibir nome). Este passo pode exigir rodar scripts SQL (prefira criar novos arquivos `src/database/script-criar-curtidas.sql`).
   - Validação: execute o mural, clique em curtir e comente; depois, abra o banco (via Workbench ou `SELECT`) e confirme que os registros foram adicionados.

6. **Verificações finais de UI e feedbacks**
   - Garanta que todas as mensagens de sucesso/erro (publicação, curtida, comentário) usem o mesmo estilo de alerta já presente (como em `alerta.js`). Mantenha a identidade visual e não introduza scroll vertical extra.
   - Validação: a página deve mostrar feedbacks após cada ação e manter o layout coerente, com o feed ordenado cronologicamente.

7. **Documentação final e testes**
   - Registre as mudanças em um documento de testes (ou README) e valide com casos manuais: publicar, curtir, comentar, recarregar a página e verificar persistência.
   - Validação: todos os critérios listados em `docs/mural-especificacao.md` (publicações, curtidas, comentários, feedback, manutenção do layout) devem ser satisfeitos antes de considerar a tarefa concluída.

> Observação: mantenha o escopo limitado ao mural — sem tocar quiz, login ou dashboard. Se precisar alterar arquivos compartilhados (por exemplo, `alerta.js`), justifique em um comentário antes de alterar.
