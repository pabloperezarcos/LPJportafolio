import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
// npm i @ionic-native/sqlite para instalar SQLite native ngx

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  databaseObj: SQLiteObject;
  //Definimos las tablas
  tables = {
    usuarios: "alumnosbd"
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
      `CREATE TABLE IF NOT EXISTS alumnosbd ( 
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
        `INSERT INTO alumnosbd (nombre, apellidoPaterno, apellidoMaterno) VALUES 
        ('${nombre}', '${apellidoPaterno}', '${apellidoMaterno}')`,
        []
      )
      .then(() => {
        return "Alumno creado con éxito";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Alumno ya existe";
        }

        return "Error creando el alumno " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Obtener usuario de la base de datos
  //----------------------------------------------------------------

  async getTest() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM alumnosbd ORDER BY nombre ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "Error al obtener el alumno " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Borrar usuario de la base de datos
  //----------------------------------------------------------------

  async deleteTest(id: number) {
    return this.databaseObj
      .executeSql(
        `DELETE FROM alumnosbd WHERE id = ${id}`, [])
      .then(() => {
        return "alumno eliminado";
      })
      .catch((e) => {
        return "error borrando el alumno " + JSON.stringify(e);
      })
  }


  //----------------------------------------------------------------
  // Editar usuario de la base de datos
  //----------------------------------------------------------------

  async editTest(nombre: string, id: number, apellidoPaterno: string, apellidoMaterno: string) {
    return this.databaseObj
      .executeSql(
        `UPDATE alumnosbd SET nombre = '${nombre}', apellidoPaterno = '${apellidoPaterno}', apellidoMaterno = '${apellidoMaterno}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "Alumno actualizado";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Alumno ya existe";
        }

        return "Error al actualizar el alumno " + JSON.stringify(e);
      });
  }


  //----------------------------------------------------------------
  // FIN DEL SERVICE
  //----------------------------------------------------------------
}
