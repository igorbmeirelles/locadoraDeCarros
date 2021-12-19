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
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**Regra de negócio**
- Não deve ser possível cadastrar uma especificação para um carro inexistente.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser administrador.


### Cadastro de imagens do carro

**Requisitos Funcionais**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todas os carros.

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
