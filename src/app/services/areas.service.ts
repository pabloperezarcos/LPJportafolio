import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
// npm i @ionic-native/sqlite para instalar SQLite native ngx

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  databaseObj: SQLiteObject;
  //Definimos las tablas
  tables = {
    usuarios: "areas"
  };


  constructor(private sqlite: SQLite) { }

  //----------------------------------------------------------------
  // SE CREA LA BASE DE DATOS
  //----------------------------------------------------------------

  async crearBaseDatos() {
    await this.sqlite
      .create({
        name: "areas_registrApp.db",
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
      `CREATE TABLE IF NOT EXISTS bd_areas ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50)
        )`,
      []
    );
  }

  //----------------------------------------------------------------
  // Agregar areas a la base de datos
  //----------------------------------------------------------------

  async addArea(nombre: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO bd_areas (nombre) VALUES 
        ('${nombre}')`,
        []
      )
      .then(() => {
        return "Área creada con éxito";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Área ya existe";
        }

        return "Error creando el área." + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Obtener área de la base de datos
  //----------------------------------------------------------------

  async getAreas() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM bd_areas ORDER BY nombre ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "Error al obtener el área." + JSON.stringify(e);
      });
  }

  //----------------------------------------------------------------
  // Borrar área de la base de datos
  //----------------------------------------------------------------

  async borrarArea(id: number) {
    return this.databaseObj
      .executeSql(
        `DELETE FROM bd_areas WHERE id = ${id}`, [])
      .then(() => {
        return "Área borrada";
      })
      .catch((e) => {
        return "error borrando el área." + JSON.stringify(e);
      })
  }


  //----------------------------------------------------------------
  // Editar áreas de la base de datos
  //----------------------------------------------------------------

  async editarArea(nombre: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE bd_areas SET nombre = '${nombre}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "Área actualizada";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Área ya existe";
        }

        return "Error al actualizar el área" + JSON.stringify(e);
      });
  }


  //----------------------------------------------------------------
  // FIN DEL SERVICE
  //----------------------------------------------------------------
}
