import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class RegistroasistenciaService {
  databaseObj: SQLiteObject;
  //Definimos las tablas
  tables = {
    usuarios: "asistenciabd"
  };

  constructor(private sqlite: SQLite) { }

  //----------------------------------------------------------------
  // SE CREA LA BASE DE DATOS
  //----------------------------------------------------------------
  async crearBaseDatos() {
    await this.sqlite
      .create({
        name: "asistencia_registrApp.db",
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
  // SE CREAN EL REGISTRO
  //----------------------------------------------------------------

  async crearTablaTest() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS asistenciabd ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        registro VARCHAR(100) UNIQUE
        )`,
      []
    );
  }

  //----------------------------------------------------------------
  // Agregar registro a la base de datos
  //----------------------------------------------------------------

  async addAsistencia(registro: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO asistenciabd (registro) VALUES 
        ('${registro}')`,
        []
      )
      .then(() => {
        return "Asistencia agregada con éxito";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Este registro ya existe";
        }

        return "Error creando el registro " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Obtener registro de la base de datos
  //----------------------------------------------------------------

  async getAsistencia() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM asistenciabd ORDER BY registro ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "Error al obtener el registro " + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Borrar registro de la base de datos
  //----------------------------------------------------------------

  async borrarAsistencia(id: number) {
    return this.databaseObj
      .executeSql(
        `DELETE FROM asistenciabd WHERE id = ${id}`, [])
      .then(() => {
        return "registro eliminado.";
      })
      .catch((e) => {
        return "error borrando el registro." + JSON.stringify(e);
      })
  }


  //----------------------------------------------------------------
  // Editar registro de la base de datos
  //----------------------------------------------------------------

  async editarAsistencia(registro: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE asistenciabd SET registro = '${registro}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "Registro actualizado";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Este registro ya existe";
        }

        return "Error al actualizar el registro." + JSON.stringify(e);
      });
  }


  //----------------------------------------------------------------
  // FIN DEL SERVICE
  //----------------------------------------------------------------
}
