import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
// npm i @ionic-native/sqlite para instalar SQLite native ngx

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
  databaseObj: SQLiteObject;
  //Definimos las tablas
  tables = {
    usuarios: "asignaturas"
  };


  constructor(private sqlite: SQLite) { }

  //----------------------------------------------------------------
  // SE CREA LA BASE DE DATOS
  //----------------------------------------------------------------

  async crearBaseDatos() {
    await this.sqlite
      .create({
        name: "asignatura_registrApp.db",
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
      `CREATE TABLE IF NOT EXISTS bd_asignatura ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50)
        )`,
      []
    );
  }

  //----------------------------------------------------------------
  // Agregar asignaturas a la base de datos
  //----------------------------------------------------------------

  async addAsignatura(nombre: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO bd_asignatura (nombre) VALUES 
        ('${nombre}')`,
        []
      )
      .then(() => {
        return "Asignatura creada con éxito";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Asignatura ya existe";
        }

        return "Error creando la asignatura " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Obtener asignatura de la base de datos
  //----------------------------------------------------------------

  async getAsignatura() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM bd_asignatura ORDER BY nombre ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "Error al obtener la asignatura " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Borrar asignatura de la base de datos
  //----------------------------------------------------------------

  async borrarAsignatura(id: number) {
    return this.databaseObj
      .executeSql(
        `DELETE FROM bd_asignatura WHERE id = ${id}`, [])
      .then(() => {
        return "Asignatura borrada";
      })
      .catch((e) => {
        return "error borrando la asignatura " + JSON.stringify(e);
      })
  }


  //----------------------------------------------------------------
  // Editar asignatura de la base de datos
  //----------------------------------------------------------------

  async editarAsignatura(nombre: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE bd_asignatura SET nombre = '${nombre}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "Asignatura actualizada";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Asignatura ya existe";
        }

        return "Error al actualizar la asignatura" + JSON.stringify(e);
      });
  }


  //----------------------------------------------------------------
  // FIN DEL SERVICE
  //----------------------------------------------------------------
}
