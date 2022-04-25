<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="red darken-3">
                    <v-toolbar-title>
                        Registro
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>

                    <!-- Nombre Completo -->
                    <v-text-field 
                        v-model="nombreCompleto" 
                        color="accent" 
                        label="Nombre completo" 
                        requiredcolor="accent" 
                        required
                        :rules="[rules.required]"
                    ></v-text-field>

                    <!-- Nombre Usuario -->
                    <v-text-field 
                        v-model="nombreUsuario" 
                        color="accent" 
                        label="Nombre usuario" 
                        requiredcolor="accent" 
                        required
                        :rules="[rules.required, rules.usermin]"
                    ></v-text-field>

                    <!-- Email -->
                    <v-text-field 
                        v-model="email" 
                        color="accent" 
                        label="Email" 
                        required
                        clearable
                        :rules="[rules.required,emailConfirmationRule(), emailSyntaxRule]"
                    ></v-text-field>

                    <!-- Re-Email -->
                    <v-text-field 
                        v-model="reEmail" 
                        color="accent" 
                        label="Repetir Email" 
                        required
                        clearable
                        :rules="[rules.required,emailConfirmationRule(), emailSyntaxRule]"
                    ></v-text-field>

                    <!-- Clave -->
                    <v-text-field 
                        v-model="clave" 
                        type="password" 
                        color="accent" 
                        label="Contraseña" 
                        required
                        :rules="[rules.required,largoMinimoContrasenna(), passwordConfirmationRule()]"
                    ></v-text-field>

                    <!-- Re Clave -->
                    <v-text-field 
                        v-model="reClave" 
                        type="password" 
                        color="accent" 
                        label="Repetir Contraseña" 
                        required
                        :rules="[rules.required,largoMinimoContrasenna(), passwordConfirmationRule()]"
                    ></v-text-field>

                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="registrar()" dark color="red darken-3">Registrarse</v-btn>
                    </v-flex>
                </v-card-actions>
                <v-snackbar v-model="snackbar" timeout="3000" top>
                    <span>¡{{ snackbarText }}!</span>
                    <v-btn @click="comprobarUser()">Cerrar</v-btn>
                </v-snackbar>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'

class Usuario {
  constructor(
    nombreCompleto,
    nombreUsuario,
    email,
    clave,
  ) {
    this.nombreCompleto = nombreCompleto
    this.nombreUsuario = nombreUsuario
    this.email = email
    this.clave = clave
  }
}

export default {
    data (){
        return{
            nombreCompleto: '',
            nombreUsuario: '',
            email: '',
            reEmail: '',
            clave: '',
            reClave: '',
            errorM:null,
            snackbar: false,
            snackbarText: '',
            rules: {
                required: (value) => !!value || 'Campo obligatorio',
                usermin: () => this.nombreUsuario.length >= 8 || 'Debe tener al menos 8 caracteres',
            },
            emailrules: {
                required: (value) => !!value || 'Campo obligatorio',
                equals: (v) => v === this.email || 'Los e-mails no coinciden',
                syntax: (v) => /.+@.+\..+/.test(v) || 'E-mail no es valido',
            },
            questionRules: {
                required: (value) => !!value || 'Campo obligatorio',
                longMax: (value) => (value && value.length <= 20) || 'Debe tener máximo 20 caracteres',
                longMin: (value) => (value && value.length >= 2) || 'Min 2 caracteres',
            },
        }
    },
    computed: {
        passwordConfirmationRule() {
            return () => this.clave === this.reClave || 'Las contraseñas no coinciden'
        },
        emailConfirmationRule() {
            return () => this.email === this.reEmail || 'Los email no coinciden'
        },
        emailSyntaxRule() {
            const re = /.+@.+\..+/
            return re.test(this.email) || 'E-mail no es valido'
        },
        email2SyntaxRule() {
            const re = /.+@.+\..+/
            return re.test(this.reEmail) || 'E-mail no es valido'
        },
        largoMinimoContrasenna() {
            return () => this.clave.length >= 8 || 'Debe tener al menos 8 caracteres'
        },
        largoMinimoContrasenna2() {
            return () => this.reClave.length >= 8 || 'Debe tener al menos 8 caracteres'
        },
    },
    methods:{
        comprobarUser() {
            this.snackbar = false
            if (this.userTrue && this.snackbar === false) {
                this.$router.push('/')
            }
        },
        registrar() {
            if (this.nombreCompleto === '' || this.nombreUsuario === '' || this.email === '' || this.clave === ''){
                this.snackbar = true
                this.snackbarText = 'Existen campos incompletos'
            } else if (
                this.email === this.reEmail &&
                /.+@.+\..+/.test(this.email) &&
                this.clave === this.reClave &&
                this.nombreUsuario.length >= 8
            ) {
                this.user = new Usuario(
                this.nombreCompleto,
                this.nombreUsuario,
                this.email,
                this.clave,
                )
                axios.post('postUsuario',{
                    nombreCompleto: this.user.nombreCompleto,
                    nombreUsuario: this.user.nombreUsuario,
                    email: this.user.email,
                    clave: this.user.clave,
                })
                .then((respuesta) => {
                    return respuesta.data
                })
                .then(() => {
                    this.snackbarText = 'Usuario creado exitosamente'
                    this.snackbar = true
                    this.userTrue = true
                    if (this.snackbar === false) this.$router.push('/')
                })
                .catch(() => {
                    this.snackbar = true
                    this.snackbarText = 'Ha ingresado un usuario o un correo invalido'
                })
            } else {
                this.snackbar = true
                this.snackbarText = 'Los datos no son iguales o son incorrectos'
            }
        },
    }
}
</script>
