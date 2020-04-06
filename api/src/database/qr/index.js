/**
 *  @name: qr.js
 *  @version: 1.0.0
 *  @author: Lucero, Sergio
 *  @description: Funciones asyncronas para las peticiones a bases de datos /qr
*/

const config = require("../config");
const mysql = require("mysql2/promise");
const dayjs = require("dayjs");
const QRCode = require("qrcode");

/**
 * @function: qrAll_Get
 * @param: id: int
 * @description: Obtener todos los qr
*/
async function qrsAll_Get() {
	try {
		const query = "SELECT qr.id, qr.url_qr, qr.url_target, qr.target_message, parks.name FROM qr JOIN parks ON qr.id_park = parks.id";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query)
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							qrs: recordSet 
						};
					} else {
						return { error: { message: "No existen codigos QR" } }
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
 * @function: qrsId_Get
 * @param: id: int
 * @description: Obtener un qr por ID
*/

async function qrsId_Get(id){
	try{
		const query = "SELECT * FROM qr WHERE id = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async ([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.length > 0) {
						return { 
							qr: recordSet[0]
						};
					} else {
						return { error: { message: "No existe el codigo QR" } }
					}
				} else {
					return { error: { message: "Error de comunicación" } };
				}
			});
		connection.end();
		return result;
	}catch (error) {
		return { 
			error: {  message: error.message } 
		};
	}
}

/**
 * @function: qrsAdd_Post
 * @param: data: Object
 * @description: Insertar un nuevo QR
*/
async function qrsAdd_Post(data) {
	try {
		let url_qr = '';
		const date = dayjs().format('YYYY-MM-DD');
		if (data.url_target !== null) {
			url_qr = await QRCode.toDataURL(data.url_target, { scale: 32 });
		} else {
			url_qr = await QRCode.toDataURL(data.target_message, { scale: 32 });				
		}
		const query = "INSERT INTO qr(url_qr, url_target, target_message, creation_date, id_user, id_park) VALUES (?,?,?,?,?,?)";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [url_qr, data.url_target, data.target_message, date, data.id_user, data.id_park])
			.then(result => {
				if (result[0].affectedRows > 0) {
					return { created: true }
				} else {
					return {
						error: {
							message: "No fue posible añadir el QR"
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
 * @function: qrId_Delete
 * @param: id: int
 * @description: Eliminar un QR
*/
async function qrId_Delete(id) {
	try {
		const query = "DELETE FROM qr WHERE id = ?";
		const connection = await new mysql.createPool(config);
		const result = await connection
			.query(query, [id])
			.then(async([rows]) => {
				const recordSet = rows;
				if (recordSet) {
					if (recordSet.affectedRows > 0){
						return { deleted: true };
					} else{
						return{ error: { message: "No fue posible eliminar el QR"} };
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
	qrsAll_Get,
	qrsId_Get,
	qrsAdd_Post,
	qrId_Delete

};