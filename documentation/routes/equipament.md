# Routes

## addEquipament


### Este método espera receber um objeto JSON com name, description, type, brand, software, extensions, materials, moreInformation, handbook, images e id_admin. Deve retornar um objeto JSON com name, description, type, brand, software, extensions, materials, moreInformation, handbook, images e id_admin e um status 201

## deleteEquipament

### Este método espera receber um objeto JSON com id. Deve validar se o id existe e deve retornar status 200

## editEquipament

### Este método espera receber um objeto JSON com id, name, description, type, brand, software, extensions, materials, moreInformation, handbook, images e id_admin. Deve validar se o id existe e deve retornar nada com status 200

## getEquipament

### Este método espera receber um objeto JSON com id. Deve validar se o id existe e deve retornar um objeto JSON com name, description, type, brand, software, extensions, materials, moreInformation, handbook, images e id_admin

## getEquipaments

### Este método não espera receber nada e deve retornar um array de objetos JSON com name, description, type, brand, software, extensions, materials, moreInformation, handbook, images e id_admin