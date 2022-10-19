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
    usuarios: "categories"
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
      `CREATE TABLE IF NOT EXISTS categories ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50),
        apellido VARCHAR(50),
        correo VARCHAR(50),
        password VARCHAR(50)
        )`,
      []
    );
  }

  //----------------------------------------------------------------
  // Agregar usuarios a la base de datos
  //----------------------------------------------------------------

  async addTest(nombre: string, apellido: string, correo: string, password: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO categories (nombre, apellido, correo, password) VALUES 
        ('${nombre}', '${apellido}', '${correo}', '${password}')`,
        []
      )
      .then(() => {
        return "addTest: Usuario creado con éxito";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "addTest: Usuario ya existe";
        }

        return "Error creando el usuario " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Obtener usuario de la base de datos
  //----------------------------------------------------------------

  async getTest() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM categories ORDER BY nombre ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "Error al obtener el usuario " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Borrar usuario de la base de datos
  //----------------------------------------------------------------

  async deleteTest(id: number) {
    return this.databaseObj
      .executeSql(
        `DELETE FROM categories WHERE id = ${id}`, [])
      .then(() => {
        return "usuario eliminado";
      })
      .catch((e) => {
        return "error borrando el usuario " + JSON.stringify(e);
      })
  }


  //----------------------------------------------------------------
  // Editar usuario de la base de datos
  //----------------------------------------------------------------

  async editTest(nombre: string, id: number, apellido: string, correo: string, password: string) {
    return this.databaseObj
      .executeSql(
        `UPDATE categories SET nombre = '${nombre}', apellido = '${apellido}', correo = '${correo}', password = '${password}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "editTest: usuario actualizado";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "editTest: usuario ya existe";
        }

        return "Error al actualizar el usuario " + JSON.stringify(e);
      });
  }


  //----------------------------------------------------------------
  // FIN DEL SERVICE
  //----------------------------------------------------------------
}
