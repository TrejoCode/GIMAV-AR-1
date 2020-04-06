/**
 *  @name: users.js
 *  @version: 1.0.0
 *  @author: Sergio, Lucero
 *  @description: Funciones asyncronas para las peticiones a bases de datos /users
*/

const config = require("../config");
const mysql = require("mysql2/promise");
const token = require("../../auth/token");
const dayjs = require("dayjs");

/**
 * @function: usuariosLogin_Post
 * @param: data: Object
 * @description: Función para realizar login y devolver datos cifrados.
*/
async function usuariosLogin_Post(data) {
	try {
		const query = "SELECT id AS idUser, email FROM users WHERE email = ? AND password = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.email, data.password])
			.then(async ([rows]) => {
				const recordSet = rows[0];
				if (recordSet) {
					return { 
						user: token.getToken(JSON.stringify(recordSet))
					};
				} else {
					return {
						error: { message: "Usuario o contraseña incorrectos" }
					};
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { 
			error: {  message: error.message } 
		};
	}
}

/**
 * @function: usersAll_Get
 * @param: id: int
 * @description: Obtener todos los usuarios
*/
async function usersAll_Get() {
	try {
		const query = "SELECT * FROM users";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query)
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							users: recordSet 
						};
					} else {
						return { error: { message: "No existen usuarios" } }
					}
				} else {
					return { error: { message: "Error de comunicación" } };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { 
			error: {  message: error.message } 
		};
	}
}

/**
 * @function: usersId_Get
 * @param: id: int
 * @description: Obtener un usuarios por ID
*/
async function usersId_Get(id) {
	try {
		const query = "SELECT * FROM users WHERE id = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							users: recordSet[0]
						};
					} else {
						return { error: { message: "No existe el usuario" } }
					}
				} else {
					return { error: { message: "Error de comunicación" } };
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { 
			error: {  message: error.message } 
		};
	}
}

/**
 * @function: users_Post
 * @param: data: Object
 * @description: Insertar un nuevo usuario
*/
async function usersAdd_Post(data) {
	try {
		const date = dayjs().format('YYYY-MM-DD');
		const query = "INSERT INTO users(email, password, name, creation_date) VALUES (?,?,?,?)";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.email, data.password, data.name, date])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { 
						created: true 
					};
				}
				else{
					return {
						error: {
							message: "No se creo el usuario"
						}
					};
				}
	
			});
		connection.end();
		return result;
	} catch (error) {
		return { 
			error: {  message: error.message } 
		};
	}
}


/**
 * @function: userId_Delete
 * @param: id: int
 * @description: Eliminar un usuario
*/
async function userId_Delete(id) {
	try {
		const query = "DELETE FROM users WHERE id = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if(recordSet.affectedRows > 0){
						return { delete: true } 
					}else{
						return{ error:{ message: "No se elimino el usuario"}};
					}

				} else {
					return {
						error: {
							message: "Error de comunicacion"
						}
					};
				}
			});
		connection.end();
		return result;
	} catch (error) {
		return { 
			error: { message: error.message } 
		};
	}
}



// Exportar todas las funciones
module.exports = {
	usuariosLogin_Post,
	usersAll_Get,
	usersId_Get,
	usersAdd_Post,
	userId_Delete
};