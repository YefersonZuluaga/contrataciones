import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'

// Crea estilos
const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify'
  },
  sectionTitle: {
    fontSize: 18,
    margin: 12
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    flexGrow: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5
  },
  textTable: {
    fontSize: 8
  },
  textBold: {
    fontWeight: 600
  }
})

// Datos del contrato (deberías obtener estos de tus propios datos)

// Crea el documento
const MyDocument = ({ Compañia, empleado, fecha, cargo, direccion, fechanacimiento, salario }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Contrato Individual de Trabajo a Término Indefinido</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.textTable}>NOMBRE EMPLEADOR</Text>
            <Text style={styles.textTable}>JULIANA ARIAS</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textTable}>DIRECCION</Text>
            <Text style={styles.textTable}>ARMENIA</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.textTable}>NOMBRE TRABAJADOR</Text>
            <Text style={styles.textTable}>{empleado}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textTable}>DIRECCION TRABAJADOR</Text>
            <Text style={styles.textTable}>{direccion}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.textTable}>FECHA DE NACIMIENTO</Text>
            <Text style={styles.textTable}>{fechanacimiento}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textTable}>CARGO</Text>
            <Text style={styles.textTable}>{cargo}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.textTable}>SALARIO</Text>
            <Text style={styles.textTable}>{salario}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textTable}>PERIODO DE PAGO</Text>
            <Text style={styles.textTable}>MENSUAL</Text>
          </View>
        </View>
        {/* Agrega más filas como estas según sea necesario */}
      </View>
      <Text style={styles.text}>
        Entre EL EMPLEADOR y EL TRABAJADOR, de las condiciones ya dichas, identificados como aparece
        al pie de sus firmas, se ha celebrado el presente contrato individual de trabajo, regido
        además por las siguientes cláusulas:
      </Text>
      <Text style={styles.text}>
        <Text style={styles.textBold}>PRIMERA: OBJETO</Text>,EL EMPLEADOR contrata los servicios
        personales de EL TRABAJADOR y éste se obliga: a. a poner a servicio de EL EMPLEADOR toda su
        capacidad normal de trabajo en el desempeño de las funciones propias del oficio mencionado y
        en las labores anexas y complementarias del mismo.
      </Text>
      <Text style={styles.text}>
        Este contrato se celebra entre la empresa {Compañia} y el empleado {empleado} para la
        posición de {cargo}, con fecha de inicio en {fecha}.
      </Text>
      <Text style={styles.sectionTitle}>Obligaciones del Empleado</Text>
      <Text style={styles.text}>
        OBLIGACIONES: El TRABAJADOR deberá cumplir con las siguientesobligaciones:
        a. Colocar al servicio del EMPLEADOR su capacidad normal de trabajo,de manera exclusiva en el desempeño de las funciones
        encomendadas y en laslabores conexas, según ordenes e instrucciones del empleador o sus representantes.
        b. Trabajar durante la vigencia del presente contrato única y exclusivamente al serviciodel EMPLEADOR.
        c. Cumplir con la jornada de trabajo dentro de los turnos y horarioseñalado por el EMPLEADOR.
        d. Las demás consagradas en el artículo 58 del CódigoSustantivo del Trabajo
      </Text>
      <Text style={styles.sectionTitle}>Salario y Beneficios</Text>
      <Text style={styles.text}>
        El salario, los beneficios y las condiciones de trabajo serán conforme a las políticas de la
        empresa y la legislación laboral.
      </Text>
      <Text style={styles.sectionTitle}>Terminación</Text>
      <Text style={styles.text}>
        El contrato es a término indefinido, y las condiciones de terminación se ajustarán a las
        normas legales vigentes.
      </Text>
      <Text style={styles.sectionTitle}>Firma Trabajador :</Text>
      <Text style={styles.text}></Text>
      <Text style={styles.sectionTitle}>______________________</Text>

      <Text style={styles.sectionTitle}>Firma Empleador :</Text>
      <Text style={styles.text}></Text>
      <Text style={styles.sectionTitle}>______________________</Text>

      {/* ...agrega más texto aquí según sea necesario para tu contrato... */}
    </Page>
  </Document>
)

export default MyDocument
