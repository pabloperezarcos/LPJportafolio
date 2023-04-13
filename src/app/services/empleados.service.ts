import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
// npm i @ionic-native/sqlite para instalar SQLite native ngx

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  databaseObj: SQLiteObject;
  //Definimos las tablas
  tables = {
    usuarios: "empleadosbd"
  };


  constructor(private sqlite: SQLite) { }

  //----------------------------------------------------------------
  // SE CREA LA BASE DE DATOS
  //----------------------------------------------------------------

  async crearBaseDatos() {
    await this.sqlite
      .create({
        name: "usuarios_registrApp.db",
        location: "default",
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert("error on creating database " + JSON.stringify(e));
      });

    await this.crearTablaTest();

  }

  //----------------------------------------------------------------
  // SE CREAN LAS TABLAS
  //----------------------------------------------------------------

  async crearTablaTest() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS empleadosbd ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50),
        apellidoPaterno VARCHAR(50),
        apellidoMaterno VARCHAR(50)
        )`,
      []
    );
  }

  //----------------------------------------------------------------
  // Agregar usuarios a la base de datos
  //----------------------------------------------------------------

  async addTest(nombre: string, apellidoPaterno: string, apellidoMaterno: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO empleadosbd (nombre, apellidoPaterno, apellidoMaterno) VALUES 
        ('${nombre}', '${apellidoPaterno}', '${apellidoMaterno}')`,
        []
      )
      .then(() => {
        return "Empleado creado con éxito";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Empleado ya existe";
        }

        return "Error creando el empleado " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Obtener usuario de la base de datos
  //----------------------------------------------------------------

  async getEmpleados() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM empleadosbd ORDER BY nombre ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "Error al obtener el empleado " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Borrar usuario de la base de datos
  //----------------------------------------------------------------

  async borrarEmpleado(id: number) {
    return this.databaseObj
      .executeSql(
        `DELETE FROM empleadosbd WHERE id = ${id}`, [])
      .then(() => {
        return "empleado eliminado";
      })
      .catch((e) => {
        return "error borrando el empleado " + JSON.stringify(e);
      })
  }


  //----------------------------------------------------------------
  // Editar usuario de la base de datos
  //----------------------------------------------------------------

  async editarEmpleados(nombre: string, id: number, apellidoPaterno: string, apellidoMaterno: string) {
    return this.databaseObj
      .executeSql(
        `UPDATE empleadosbd SET nombre = '${nombre}', apellidoPaterno = '${apellidoPaterno}', apellidoMaterno = '${apellidoMaterno}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "Empleado actualizado";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Empleado ya existe";
        }

        return "Error al actualizar el empleado " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // FIN DEL SERVICE
  //----------------------------------------------------------------
}