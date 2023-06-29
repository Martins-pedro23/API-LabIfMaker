# Routes

## addAdmin

### Este método espera receber um objeto JSON com email, password, verificar se o email já existe e deve retornar um objeto JSON com email e name e um status 201

## deleteAdmin

### Este método espera receber um objeto JSON com id e password. Deve validar se o id existe, se a password está correta e deve retornar status 200

## editAdmin

### Este método espera receber um objeto JSON com id, email, name e password. Deve validar se o id existe, se o email já existe, se a password está correta e deve retornar nada com status 200

## getAdmin

### Este método espera receber um objeto JSON com id. Deve validar se o id existe e deve retornar um objeto JSON com email e name

## getAdmins

### Este método não espera receber nada e deve retornar um array de objetos JSON com email e name

## login

### Este método espera receber um objeto JSON com email e password. Deve validar se o email existe e se a password está correta e deve retornar um token jwt com status 200
