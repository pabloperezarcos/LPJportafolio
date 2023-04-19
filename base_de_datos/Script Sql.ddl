-- Generado por Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   en:        2023-04-18 17:23:10 CLT
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE areas (
    idarea          INTEGER NOT NULL,
    nombrearea      VARCHAR2(20 CHAR) NOT NULL,
    descripcionarea VARCHAR2(50 CHAR)
);

ALTER TABLE areas ADD CONSTRAINT areas_pk PRIMARY KEY ( idarea );

CREATE TABLE asistencias (
    idasistencia         INTEGER NOT NULL,
    fecharegistro        DATE NOT NULL,
    horaentrada          TIMESTAMP,
    horasalida           TIMESTAMP,
    empleados_idempleado INTEGER NOT NULL
);

ALTER TABLE asistencias ADD CONSTRAINT asistencias_pk PRIMARY KEY ( idasistencia );

CREATE TABLE empleados (
    idempleado         INTEGER NOT NULL,
    nombreempleado     VARCHAR2(20 CHAR) NOT NULL,
    ap_paternoempleado VARCHAR2(30 CHAR) NOT NULL,
    ap_maternoempleado VARCHAR2(30 CHAR) NOT NULL,
    rutempleado        VARCHAR2(10 CHAR) NOT NULL,
    passwordhash       VARCHAR2(64 CHAR),
    direccionempleado  VARCHAR2(50 CHAR) NOT NULL,
    fechanacimiento    DATE NOT NULL,
    fechacontratacion  DATE NOT NULL,
    tipousuario        CHAR(1) NOT NULL,
    estadoempleado     CHAR(1) NOT NULL,
    areas_idarea       INTEGER NOT NULL
);

COMMENT ON COLUMN empleados.estadoempleado IS
    'El empleado puede estar Activo o Desvinculado.';

ALTER TABLE empleados ADD CONSTRAINT empleados_pk PRIMARY KEY ( idempleado );

CREATE TABLE recordatorios (
    idrecordatorios        INTEGER NOT NULL,
    titulorecordatorio     VARCHAR2(20 CHAR) NOT NULL,
    contenidorecordatorios VARCHAR2(200 CHAR) NOT NULL,
    fechacreacion          DATE NOT NULL,
    fechavencimiento       DATE NOT NULL,
    empleados_idempleado   INTEGER NOT NULL
);

ALTER TABLE recordatorios ADD CONSTRAINT recordatorios_pk PRIMARY KEY ( idrecordatorios );

CREATE TABLE vacaciones (
    idvacaciones         INTEGER NOT NULL,
    fechainicio          DATE NOT NULL,
    fechatermino         DATE NOT NULL,
    empleados_idempleado INTEGER NOT NULL
);

ALTER TABLE vacaciones ADD CONSTRAINT vacaciones_pk PRIMARY KEY ( idvacaciones );

ALTER TABLE asistencias
    ADD CONSTRAINT asistencias_empleados_fk FOREIGN KEY ( empleados_idempleado )
        REFERENCES empleados ( idempleado );

ALTER TABLE empleados
    ADD CONSTRAINT empleados_areas_fk FOREIGN KEY ( areas_idarea )
        REFERENCES areas ( idarea );

ALTER TABLE recordatorios
    ADD CONSTRAINT recordatorios_empleados_fk FOREIGN KEY ( empleados_idempleado )
        REFERENCES empleados ( idempleado );

ALTER TABLE vacaciones
    ADD CONSTRAINT vacaciones_empleados_fk FOREIGN KEY ( empleados_idempleado )
        REFERENCES empleados ( idempleado );



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             5
-- CREATE INDEX                             0
-- ALTER TABLE                              9
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
