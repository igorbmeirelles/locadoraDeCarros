## Aplicação de locação de carros

### Cadastro de carro
**Requisitos Funcionais**
- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**Requisitos não funcionais**

**Regra de negócio**
- Não deve ser possível cadastrar com a placa já existente.
- Não deve ser possível alterar a placa de um carro.
- O carro deve estar disponivel no momento do cadastro.
- O usuário responsável pelo cadastro deve ser administrador.

### Listagem de carros

**Requisitos Funcionais**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros pela nome: da categoria, da marca, do carro.

**Regra de negócio**
- O usuário não precisa estar logado no sistema para ver a listagem.

### Cadastro de especificação do carro

**Requisitos Funcionais**
- Deve ser possível cadastrar uma especificação para um carro.

**Regra de negócio**
- Não deve ser possível cadastrar uma especificação para um carro inexistente.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser administrador.


### Cadastro de imagens do carro

**Requisitos Funcionais**
- Deve ser possível cadastrar a imagem do carro.

**Requisitos não Funcional**
- Utilizar o multer para o upload de arquivos.

**Regra de negócio**
- O usuário pode cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser administrador.

### Aluguel de carro
**Requisitos Funcionais**
- Deve ser possível cadastrar um aluguel.

**Regra de negócio**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo.
- O usuario deve estar logado na aplicacao
- Ao realizar um aluguel o status do carro deverá ser alterado para indisponível.

### Devolução de um carro
**Requisitos Funcionais**
- Deve ser possível realizar a devolução de um carro

**Regra de negócio**
- Se o carro for devolvido com menos de 24 horas deve ser cobrado a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa prorcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.

### Recuperar Senha
**Requisitos Funcionais**
- Deve ser possivel recuperar a senha informando o email
- O usuario deve receber um email com o passo a passo para a recuperação da senha
- O usuario deve conseguir inserir uma nova senha 

**Regra de negócio**
- O usuario precisa inserir uma nova senha
- O link enviado para recuperacao de senha dever expirar em 3 horas
