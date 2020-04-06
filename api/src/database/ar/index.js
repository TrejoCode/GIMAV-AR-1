/**
 *  @name: ar.js
 *  @version: 1.0.0
 *  @author: Sergio, Lucero
 *  @description: Funciones asyncronas para las peticiones a bases de datos /ar
*/

const config = require("../config");
const mysql = require("mysql2/promise");
const dayjs = require("dayjs");


/**
 * @function: arsAll_Get
 * @param: id: int
 * @description: Obtener todos los ars
*/
async function arsAll_Get() {
	try {
		const query = "SELECT * FROM ar";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query)
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							ars: recordSet 
						};
					} else {
						return { error: { message: "No existen codigos AR" } }
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
 * @function: arsId_Get
 * @param: id: int
 * @description: Obtener un ar por ID
*/
async function arsId_Get(id) {
	try {
		const query = "SELECT * FROM ar WHERE id = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])

			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							ars: recordSet[0]
						};
					} else {
						return { error: { message: "No existe ar" } }
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
 * @function: arsAdd_Post
 * @param: data: Object
 * @description: Insertar un nuevo AR
*/
async function arsAdd_Post(data) {
	try {
		const date = dayjs().format('YYYY-MM-DD');
		const query = "INSERT INTO ar(url_model, creation_date, read_count, id_user, id_park) VALUES (?,?,?,?,?)";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.url_model, date, "" , data.id_user, data.id_park])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { updated: true }
				} else {
					return {
						error: {
							message: "No fue posible crear el AR"
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


/**
 * @function: arId_Delete
 * @param: id: int
 * @description: Eliminar un AR
*/
async function arId_Delete(id) {
	try {
		const query = "DELETE FROM ar WHERE id = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.affectedRows > 0){
						return { deleted: true };
					} else{
						return{ error: { message: "No fue posible eliminar el AR"} };
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


/**
 * @function: arId_Put
 * @param: int: id
 * @description: Actualizar un AR
*/


async function ar_update(data) {
	try {
		const dates = dayjs().format('YYYY-MM-DD');
		const query = "UPDATE ar SET url_model = ?, creation_date = ?, id_user = ? id_park = ? WHERE id = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.id, data.url_model, DataTransfer, data.id_user, data.id_park])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { updated: true }
				} else {
					return {
						error: {
							message: "No fue posible actualizar el AR"
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
	arsAll_Get,
	arsId_Get,
	arsAdd_Post,
	arId_Delete,
	ar_update
};