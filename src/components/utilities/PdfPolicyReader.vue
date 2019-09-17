<template>
  <v-layout column>    
      <v-flex xs6>
        <form enctype="multipart/form-data">
          <v-layout justify-start column>
            <v-layout class="px-5 py-2 outline radius-3 elevation-1" justify-center align-center>
              <label>
                <v-layout align-center>
                  <input type="file" ref="file" @change="sendFile" class="input" />
                  <span class="text-uppercase body-2 indigo-text">Cargar PDF</span>
                  <v-btn small flat v-if="loading" :loading="loading" :disabled="loading"></v-btn>
                  <v-icon right color="indigo">picture_as_pdf</v-icon>
                </v-layout>
              </label>
            </v-layout>
            <v-layout
              v-if="message"
              class="mt-2"
              :class="`message ${error ? 'text--red' : 'green--text text--darken-4'}`"
              justify-center
              align-center
            >
              <v-flex xs-6 class="text-xs-center">
                <span class="subheading my-3">{{message}}</span>
                <v-icon right color="green darken-4" v-if="!error">check_circle</v-icon>
              </v-flex>
            </v-layout>

          </v-layout>
        </form>
      </v-flex>
  </v-layout>

</template>

<script>
import axios from "axios";

export default {
  name: "PdfPolicyReader",
  props: {
    clientId: String
  },
  data() {
    return {
      file: "",
      message: "",
      error: false,
      uploadedFiles: [],
      loading: false
    };
  },
  methods: {
    selectFile() {
      
    },
    getDynamicLengthInfo(info, inicio, fin) {
      // info: es el String que viene directamente del PDF
      // inicio: es el String desde donde se extrae el texto
      // fin: es el string hasta donde se extrae el texto
      let indexInicio = info.search(inicio)
      let indexFin = info.search(fin)
      let resultado = info.substring(indexInicio + inicio.length, indexFin)
      return resultado.replace(/(\r\n|\n|\r)/gm,"").trim();
      return resultado
    },
    getStaticLengthInfo(info, texto, searchLength){
      // info: es el String que viene directamente del PDF
      // texto: String con el texto a buscar
      // searchLength: Numero que indica la longitud del text a extraer.
      let encuentraTexto = info.search(texto);
      let resultado = info.substr(encuentraTexto + texto.length, searchLength)
      return resultado.replace(/(\r\n|\n|\r)/gm,"").trim();
      return resultado
    },
    async sendFile() {
      const allowedTypes = ["application/pdf"]; // , "application/pdf"
      const file = this.$refs.file.files[0];
      const MAX_SIZE = 2000000;
      const tooLarge = file.size > MAX_SIZE;


      //Error hadling del lado del cliente
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.error = false;
        this.message = "";
      
        this.loading = true;
        const url = `${process.env.VUE_APP_HOST}/policies/read-pdf`;
        const formData = new FormData();
        formData.append("file", this.file);

        try {
          const res = await axios.post(url, formData);
          let info  = res.data.pdfData;

          let extractedPolicyInfo = {
            numeroDePoliza: this.getStaticLengthInfo(info, 'PÓLIZA/ENDOSO', 13),
            direccion: this.getDynamicLengthInfo(info, 'DIRECCIÓN:', 'CÓDIGO POSTAL'),
            compania: 'MAPFRE',
            ramo: 'Automóviles',
            moneda: this.getDynamicLengthInfo(info, 'MONEDA:', 'GASTOS DE EXPEDICIÓN'),
            plan: `${this.getDynamicLengthInfo(info, 'DESCRIPCIÓN:', 'REMOLQUE')}`,
            clavePlan: `${this.getDynamicLengthInfo(info, 'CLAVE MAPFRE:', 'CLASE')}`,
            primaNeta: this.getDynamicLengthInfo(info, 'PRIMA NETA:', 'MONEDA')
          }
          let prePrimaTotal = this.getStaticLengthInfo(info, 'PRIMA TOTAL:', 20).split('a');
          extractedPolicyInfo.primaTotal = prePrimaTotal[0]

          let fechaEmisionStringPaso1  = this.getStaticLengthInfo(info, 'FECHA DE EMISIÓN', 10).split('/')
          let fechaEmisionStringPaso2 = fechaEmisionStringPaso1[2].substr(2, 3)
          let fechaEmision = fechaEmisionStringPaso1[0] + '/' + fechaEmisionStringPaso1[1] + '/' + fechaEmisionStringPaso2
          
          let fechaVencimientoStringPaso1  = this.getStaticLengthInfo(info, 'HASTA LAS 12:00 HRS. DEL:', 11).split('/')
          let fechaVencimientoStringPaso2 = fechaVencimientoStringPaso1[2].substr(2, 3)
          let fechaVencimiento = fechaVencimientoStringPaso1[0] + '/' + fechaVencimientoStringPaso1[1] + '/' + fechaVencimientoStringPaso2
          
          extractedPolicyInfo.fechaVencimiento = fechaVencimiento
          extractedPolicyInfo.fechaEmision = fechaEmision

          this.uploadedFiles.push(res.data.file);
          this.message = "Tu archivo se ha subido correctamente";
          this.file = "";
          this.error = false;
          this.loading = false;
          this.$emit('fileRead', extractedPolicyInfo)
        } catch (err) {
          this.message = err.response.data.err;
          this.error = true;
        }
        } else {
        this.error = true;
        this.message = tooLarge
          ? `Archivo muy grande. El tamaño máximo es de ${MAX_SIZE / 1000} Kb`
          : "Error: solo se permiten archivos PDF.";
      }
    }
  }
};
</script>


<style scoped>
.indigo {
  background-color: #5c6bc0;
}

button {
  padding: 8px 16px;
  text-transform: uppercase;
  border-radius: 16px;
  color: #5c6bc0;
  font-weight: 500;
}

.indigo-text {
  color: #5c6bc0;
}

.radius-3 {
  border-radius: 30px;
}

.outline {
  border: 1px solid #5c6bc0;
  position: relative;
}
.input {
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

