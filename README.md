# Vitrine — uma interface que se comunica

Projeto acadêmico de Interação Humano-Computador (IHC), desenvolvido com HTML, CSS e JavaScript. A interface demonstra como animações podem comunicar ações, orientar a pessoa usuária durante uma espera e indicar o resultado de uma operação.

## Integrantes

- Joseph Cavalcante
- Letícya Beatriz
- Mariana Melo

## Quadro de objetivos

| Objetivo | Como o projeto atende |
| --- | --- |
| Comunicar uma ação realizada | Ao adicionar um produto, o botão responde, o contador da sacola é atualizado e uma mensagem confirma a ação. |
| Orientar durante uma operação | Ao confirmar a compra fictícia, o botão e a área de status exibem “Processando...” com um indicador de carregamento. |
| Informar o resultado | Ao terminar o processamento, a área de status anuncia a compra confirmada e informa que nenhum pagamento foi realizado. |
| Adaptar a interface ao cenário | A interface usa o tema de loja virtual, produtos fictícios, preços demonstrativos e textos próprios do fluxo de compra. |
| Comparar a duração de uma animação | O seletor permite comparar o hover dos cartões em 180 ms, 400 ms e 900 ms. |
| Reduzir movimentos | A opção “Reduzir movimentos” desativa animações e transições. A preferência do sistema operacional também é respeitada inicialmente. |
| Manter a informação acessível | Mensagens textuais, rótulos acessíveis e regiões de status acompanham os efeitos visuais. |
| Testar e melhorar | A tabela do registro inclui espaço para documentar o teste com outra equipe, o problema observado e o ajuste realizado. Preencham essa linha após o teste real. |

## Como executar

Abra `index.html` em um navegador. Não é necessário instalar dependências nem iniciar um servidor.

1. Adicione um ou mais produtos à sacola.
2. Confirme a compra e observe o estado de processamento e o resultado.
3. Compare as durações do hover dos cartões.
4. Ative “Reduzir movimentos” e repita as interações.
5. Peça a outra equipe para realizar a tarefa sem instruções e registre as observações na tabela ao final da página.

## Arquivos

- `index.html`: estrutura e conteúdo da interface.
- `styles.css`: cores, layout, responsividade e animações.
- `script.js`: interações, mensagens, simulação de compra e controles de movimento.

> Esta é uma demonstração acadêmica. Produtos, preços e compra são fictícios; nenhum pagamento é processado.

| Consultar a sacola | O botão abre um dropdown animado com itens, quantidade por item, preço unitário, subtotal de cada item e valor total. |
| Interagir com a sacola acessivelmente | O dropdown informa estado expandido/recolhido, fecha ao clicar fora ou pressionar Esc e pode ser usado por teclado. |

| Alternar tema visual | Um switch permite alternar entre tema claro e escuro; a escolha fica salva no navegador e segue a preferência do sistema na primeira visita. |
