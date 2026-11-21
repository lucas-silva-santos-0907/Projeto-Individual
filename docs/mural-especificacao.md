# Especificação — Readaptação do Mural de Avisos para Mural de Comentários (Project Time)

## 1. Contexto

Atualmente, o Project Time possui uma página de mural de avisos (`mural.html`), cuja estrutura e funcionalidades já estão implementadas dentro do projeto.

Entretanto, a proposta do projeto é proporcionar uma experiência mais interativa entre os usuários, permitindo que eles compartilhem suas opiniões, interajam com publicações e participem de uma comunidade relacionada ao universo de Hora de Aventura.

Dessa forma, surgiu a necessidade de readaptar o mural de avisos existente, transformando-o em um mural de comentários, no qual os usuários possam publicar conteúdos, comentar publicações de outros usuários e curtir as publicações.

O desenvolvimento deverá aproveitar a estrutura já existente do mural de avisos, realizando apenas as modificações necessárias para atender às novas funcionalidades, sem reconstruir o sistema ou modificar partes não relacionadas do projeto.

## 2. Objetivo

Transformar o mural de avisos existente (`mural.html`) em um mural de interações entre usuários, permitindo que os usuários do Project Time compartilhem publicações, comentem e curtam conteúdos de outros usuários.

O objetivo é proporcionar um ambiente de interação entre os usuários, mantendo a estrutura, a organização e os padrões de desenvolvimento já utilizados no projeto.

## 3. Escopo

### Dentro do escopo:

- Readaptação da página `mural.html` para se tornar um mural de comentários e publicações.
- Reutilização da estrutura HTML, CSS e JavaScript já existente no mural de avisos.
- Reutilização das rotas, controllers, models e conexão com o banco de dados, sempre que possível.
- Adequação do banco de dados somente quando necessária para suportar as novas funcionalidades.
- Exibição das publicações realizadas pelos usuários.
- Identificação do autor de cada publicação.
- Criação de novas publicações por usuários autenticados.
- Possibilidade de curtir e descurtir publicações.
- Possibilidade de comentar nas publicações.
- Exibição dos comentários relacionados a cada publicação.
- Identificação do autor de cada comentário.
- Atualização da interface para se adequar à proposta de um mural de comentários.
- Utilização das tecnologias, bibliotecas e padrões já presentes no projeto.

### Fora do escopo:

- Criação de um novo sistema de mural do zero.
- Reestruturação da arquitetura do projeto.
- Alteração de funcionalidades de outras páginas.
- Modificação de funcionalidades relacionadas ao login, cadastro, quiz ou dashboard.
- Criação de novos frameworks, bibliotecas ou tecnologias.
- Implementação de mensagens privadas entre usuários.
- Implementação de notificações.
- Implementação de respostas a comentários (comentários aninhados).
- Implementação de sistema de seguidores.
- Implementação de upload de imagens nas publicações.
- Implementação de edição de publicações ou comentários, caso essa funcionalidade não exista atualmente e não seja necessária para o funcionamento básico.
- Modificações em arquivos que não estejam diretamente relacionados ao funcionamento do mural.

## 4. Funcionalidades

### 4.1. Exibição das publicações

O sistema deverá exibir as publicações realizadas pelos usuários, apresentando:

- Conteúdo da publicação.
- Nome do usuário que realizou a publicação.
- Data de realização, caso já exista suporte para esse dado na estrutura atual.
- Quantidade de curtidas.
- Comentários relacionados à publicação.

As publicações deverão ser apresentadas de maneira organizada e seguindo a identidade visual do Project Time.

### 4.2. Criação de publicações

O usuário autenticado poderá criar uma nova publicação no mural.

Para isso, deverá existir um campo de texto para escrever o conteúdo e um botão para enviar/publicar.

Após a publicação:

- O conteúdo deverá ser registrado no banco de dados.
- A publicação deverá estar associada ao usuário que a realizou.
- A nova publicação deverá aparecer no mural.
- O campo de texto deverá ser limpo após a publicação ser concluída com sucesso.

### 4.3. Curtidas nas publicações

O usuário poderá curtir uma publicação de outro usuário ou a sua própria publicação.

O sistema deverá:

- Permitir que o usuário curta uma publicação.
- Exibir a quantidade de curtidas de cada publicação.
- Identificar se o usuário autenticado já curtiu determinada publicação.
- Permitir que o usuário retire sua curtida, clicando novamente no botão de curtir.
- Atualizar a quantidade de curtidas após a interação.

As curtidas deverão ser armazenadas no banco de dados, de modo que não sejam perdidas ao atualizar ou recarregar a página.

### 4.4. Comentários nas publicações

O usuário autenticado poderá realizar comentários nas publicações existentes.

Para isso, cada publicação deverá possuir um campo para inserir um comentário e um botão para enviá-lo.

O sistema deverá:

- Permitir que o usuário escreva um comentário em uma publicação.
- Registrar o comentário no banco de dados.
- Associar o comentário ao usuário que o realizou.
- Associar o comentário à publicação correspondente.
- Exibir os comentários abaixo da publicação.
- Exibir o nome do usuário responsável por cada comentário.
- Atualizar os comentários da publicação após a inserção bem-sucedida.

Os comentários deverão ser independentes entre as publicações, ou seja, cada comentário deverá estar vinculado à publicação em que foi realizado.

## 5. Regras de negócio

### 5.1. Publicações

- Somente usuários autenticados poderão realizar publicações.
- O conteúdo da publicação não poderá estar vazio.
- O conteúdo da publicação deverá possuir uma validação para impedir o envio de textos compostos apenas por espaços.
- A publicação deverá estar vinculada ao usuário autenticado.
- As publicações deverão ser armazenadas no banco de dados.
- A exibição das publicações deverá seguir uma ordem cronológica, preferencialmente da mais recente para a mais antiga, respeitando o comportamento atual do mural, caso já exista.

### 5.2. Curtidas

- Somente usuários autenticados poderão curtir publicações.
- Um usuário poderá curtir uma mesma publicação apenas uma vez.
- Caso o usuário já tenha curtido a publicação, uma nova interação deverá remover sua curtida, funcionando como um sistema de curtir/descurtir.
- A quantidade de curtidas deverá corresponder ao número de registros existentes para aquela publicação.
- As curtidas deverão ser armazenadas no banco de dados.
- A curtida deverá estar associada ao usuário que a realizou e à publicação correspondente.

### 5.3. Comentários

- Somente usuários autenticados poderão comentar.
- O comentário não poderá estar vazio.
- O comentário deverá possuir validação para impedir o envio de textos compostos apenas por espaços.
- Cada comentário deverá estar associado a uma publicação existente.
- Cada comentário deverá estar associado ao usuário que o realizou.
- Os comentários deverão ser armazenados no banco de dados.
- Os comentários deverão ser exibidos na publicação correspondente.
- Um comentário realizado em determinada publicação não poderá aparecer em outra publicação.

### 5.4. Integridade e segurança dos dados

- O sistema deverá utilizar o usuário autenticado para identificar o autor das publicações, curtidas e comentários.
- Não deverá confiar exclusivamente nos dados enviados pelo navegador para identificar o usuário responsável por uma interação.
- Os dados deverão ser persistidos no banco de dados MySQL já utilizado pelo projeto.
- As operações deverão seguir os padrões de tratamento de erros já existentes no projeto.
- As inserções deverão respeitar os relacionamentos existentes e as chaves estrangeiras, quando aplicáveis.

## 6. Interface

A interface deverá ser baseada na página `mural.html` já existente, mantendo sua estrutura principal e adaptando seus elementos para a nova proposta.

### 6.1. Estrutura da página

A página deverá conter:

- Header e navegação já utilizados pelo Project Time.
- Área para criação de novas publicações.
- Campo de texto para escrever uma publicação.
- Botão para publicar.
- Lista de publicações realizadas pelos usuários.
- Área de curtidas em cada publicação.
- Área de comentários em cada publicação.
- Campo para escrever comentários.
- Botão para enviar comentários.

### 6.2. Organização das publicações

Cada publicação deverá possuir uma estrutura visual organizada, contendo:

- Nome do autor.
- Conteúdo da publicação.
- Botão de curtir/descurtir.
- Quantidade de curtidas.
- Área de comentários.
- Campo para adicionar um novo comentário.

Os comentários deverão ser exibidos de forma visualmente organizada abaixo de sua respectiva publicação, diferenciando-os do conteúdo principal.

### 6.3. Identidade visual

- A interface deverá seguir a identidade visual já utilizada no Project Time.
- Deverão ser reaproveitados os estilos, cores, fontes, componentes e elementos visuais já presentes no projeto, sempre que possível.
- O mural deverá manter uma aparência coerente com a temática de Hora de Aventura.
- Não deverá ocorrer uma reformulação visual drástica da página.
- A interface deverá ser adaptada sem comprometer a estrutura e o funcionamento atuais do mural.

### 6.4. Interações e mensagens

O sistema deverá apresentar feedback ao usuário durante as interações, utilizando os mecanismos já existentes no projeto, quando disponíveis.

Exemplos:

- Publicação realizada com sucesso.
- Comentário realizado com sucesso.
- Curtida registrada.
- Curtida removida.
- Campo obrigatório não preenchido.
- Erro ao realizar determinada operação.

As mensagens deverão seguir o padrão de alertas e feedbacks já utilizado no Project Time.

## 7. Critérios de aceitação

- [ ] O mural de avisos existente foi readaptado para se tornar um mural de publicações e comentários.
- [ ] A estrutura original do mural foi preservada, sem reconstrução desnecessária.
- [ ] O usuário autenticado consegue realizar uma publicação.
- [ ] As publicações são armazenadas no banco de dados.
- [ ] As publicações exibem o nome de seus respectivos autores.
- [ ] O usuário consegue curtir uma publicação.
- [ ] O usuário consegue retirar uma curtida previamente realizada.
- [ ] O sistema impede que um mesmo usuário registre múltiplas curtidas na mesma publicação.
- [ ] A quantidade de curtidas é exibida corretamente.
- [ ] O usuário consegue comentar em uma publicação.
- [ ] Os comentários são armazenados no banco de dados.
- [ ] Os comentários aparecem na publicação em que foram realizados.
- [ ] Os comentários exibem o nome de seus respectivos autores.
- [ ] O sistema impede publicações e comentários vazios.
- [ ] As publicações, curtidas e comentários continuam existindo após atualizar ou recarregar a página.
- [ ] A interface mantém a identidade visual do Project Time.
- [ ] Nenhuma funcionalidade de outras páginas foi alterada.
- [ ] Nenhum arquivo ou funcionalidade fora do escopo do mural foi modificado.
- [ ] O desenvolvimento utiliza as tecnologias, padrões e estruturas já presentes no projeto.

---

# 8. Restrições obrigatórias de desenvolvimento (OpenCode)

**ESTAS RESTRIÇÕES DEVEM SER SEGUIDAS DURANTE TODO O DESENVOLVIMENTO.**

O projeto está sendo desenvolvido por um aluno do primeiro semestre de Análise e Desenvolvimento de Sistemas. Portanto, a implementação deverá respeitar o nível de complexidade e as tecnologias estudadas e utilizadas até o momento.

### 8.1. Reaproveitamento obrigatório

- Utilize o mural de avisos existente (`mural.html`) como base para a implementação.
- Antes de modificar qualquer código, analise como o mural de avisos funciona atualmente.
- Reaproveite a estrutura HTML, CSS e JavaScript existente.
- Reaproveite as rotas, controllers, models e funcionalidades já implementadas, sempre que possível.
- Faça somente as adaptações necessárias para transformar o mural de avisos em um mural de comentários.
- Não crie um sistema paralelo ou uma nova estrutura para substituir o mural atual.

### 8.2. Limitação de alterações

- Não modifique absolutamente nada que não esteja diretamente relacionado ao mural de comentários.
- Não altere outras páginas HTML.
- Não altere o quiz.
- Não altere o login ou cadastro.
- Não altere a dashboard.
- Não altere funcionalidades que já estão funcionando em outras partes do projeto.
- Não faça refatorações gerais.
- Não altere a arquitetura do projeto.
- Não reorganize pastas ou arquivos.
- Não modifique códigos apenas por preferência, estética, otimização ou conveniência.
- Não faça alterações em funcionalidades que não sejam necessárias para o funcionamento do mural de comentários.

Caso seja necessário alterar um arquivo compartilhado para viabilizar uma funcionalidade do mural, primeiro analise se existe uma alternativa dentro da estrutura atual. Se a alteração compartilhada for realmente indispensável, explique qual arquivo precisa ser alterado, por que a mudança é necessária e qual será o impacto, antes de realizá-la.

### 8.3. Tecnologias e nível de complexidade

- Utilize somente as tecnologias já presentes no projeto.
- Respeite os padrões de implementação já utilizados.
- Não introduza frameworks, bibliotecas, dependências ou ferramentas novas.
- Não utilize padrões arquiteturais que ainda não fazem parte da estrutura do projeto.
- Não implemente soluções excessivamente complexas.
- Priorize códigos simples, legíveis e compatíveis com o nível de conhecimento de um aluno do primeiro semestre.
- Utilize como referência as funcionalidades já implementadas no projeto, principalmente os padrões de CRUD, rotas, controllers, models, consultas SQL e chamadas `fetch`.

### 8.4. Forma de trabalho

- Antes de implementar, analise os arquivos que compõem o mural de avisos e identifique como suas funcionalidades estão organizadas.
- Não faça alterações em vários arquivos de forma indiscriminada.
- Identifique exatamente quais arquivos precisam ser adaptados para implementar as funcionalidades solicitadas.
- Preserve o máximo possível do código original.
- Não substitua códigos existentes sem antes compreender sua finalidade.
- Implemente as funcionalidades de forma incremental, seguindo a estrutura já existente.
- Explique as alterações realizadas e a finalidade de cada uma.
- Sempre que possível, mantenha o padrão de código já utilizado pelo próprio projeto, evitando introduzir formas de implementação diferentes das que já foram estudadas.

### 8.5. Regra principal

**O objetivo não é criar um novo mural, mas readaptar o mural de avisos existente para uma nova finalidade.**

Toda alteração deverá ser estritamente necessária para implementar publicações, curtidas e comentários. Se uma mudança não for necessária para essas funcionalidades, ela não deverá ser realizada.

