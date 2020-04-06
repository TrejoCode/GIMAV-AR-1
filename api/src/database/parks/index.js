/**
 *  @name: parks.js
 *  @version: 1.0.0
 *  @author: Sergio, Lucero
 *  @description: Funciones asyncronas para las peticiones a bases de datos /parks
*/

const config = require("../config");
const mysql = require("mysql2/promise");
const dayjs = require("dayjs");


/**
 * @function: parksAll_Get
 * @param: id: int
 * @description: Obtener todos los parks
*/
async function parksAll_Get() {
	try {
		const query = "SELECT * FROM parks";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query)
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							parks: recordSet 
						};
					} else {
						return { error: { message: "No existen los parques" } }
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
 * @function: parksId_Get
 * @param: id: int
 * @description: Obtener un parque por ID
*/
async function parksId_Get(id) {
	try {
		const query = "SELECT * FROM parks WHERE id = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							parks: recordSet[0]
						};
					} else {
						return { error: { message: "No existe el parque" } }
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
 * @function: parksAdd_Post
 * @param: data: Object
 * @description: Insertar un nuevo parque
*/
async function parksAdd_Post(data) {
	try {
		const date = dayjs().format('YYYY-MM-DD');
		const query = "INSERT INTO parks(name, creation_date) VALUES (?,?)";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [data.name, date])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { created: true }
				} else {
					return {
						error: {
							message: "No fue posible crear el Parque"
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
	parksAll_Get,
	parksId_Get,
	parksAdd_Post
};