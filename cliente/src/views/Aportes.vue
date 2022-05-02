<template id="aportes">
  <v-container grid-list-md>
    <v-flex>
      <div class="titulo">
        <h1 class="Blue">APORTES</h1>
        <p></p>
      </div>
      <div class="parrafo">
        <span>
          <strong
            >¿Quieres contribuir a Fundación Adogtame y no sabes como hacerlo?
            ¿No tienes tiempo para ser voluntario? ¿Tu casa o departamento no
            permiten recibir un animal? ¡DONA!</strong
          >
          Son donaciones como las tuyas las que nos permiten hacer nuestro
          trabajo voluntario, salvando vidas y educando a nuestra ciudadanía.
        </span>
        <p></p>
      </div>
      <div>
        <span>
          <strong>¿Dónde donar?</strong> Comprométete a ser nuestro socio,
          apadrina una esterilización, compra vacunas y desparasitaciones, o
          apadrina un caso de rescate, aquí, o en nuestra cuenta corriente.
        </span>
        <p></p>
      </div>

      <div>
        <span>
          <strong
            >¿Quieres convertirte en un socio con donaciones mensuales?
          </strong>
          ¡Sé parte de Fundación Adogtame con una colaboración mensual! Elige la
          opción de donación según el tipo de apoyo que quieres hacer y
          conviértete en parte de la Comunidad de Fundación Adogtame.
          <strong>¡Completa tu carrito de compras!</strong>
        </span>
        <p></p>
      </div>

      <div>
        <span>
          <strong
            >¡El mundo cambiará si todos ponemos nuestro granito de
            arena!</strong
          >
        </span>
        <p></p>
      </div>
    </v-flex>

    <v-layout>
      <div class="">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-img src="../assets/afiche-aportes.png"></v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-layout>

    <v-layout row>
      <v-flex xs6 sm3>
        <v-card>
          <v-img
            src="https://www.zooplus.es/magazine/wp-content/uploads/2019/02/vacunas-para-perros-768x512.jpg"
          >
          </v-img>
          <v-card-title> Dona un set de vacunas </v-card-title>
          <v-card-title> $10000 </v-card-title>
          <v-card-actions>
            <v-btn color="red">Donar </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card>
          <v-img
            src="https://www.eltiempo.com/files/image_640_428/uploads/2017/07/01/5957f2f0aa0e3.jpeg"
          >
          </v-img>
          <v-card-title> Dona una consulta </v-card-title>
          <v-card-title> $15000 </v-card-title>
          <v-card-actions>
            <v-btn color="red">Donar </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card>
          <v-img
            src="https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/purina-adopcion-de-gatos-aspectos-a-tomar-en-cuenta.jpg?itok=ruMRSgJV"
          >
          </v-img>
          <v-card-title> Dona una esterilizacion </v-card-title>
          <v-card-title> $20000 </v-card-title>
          <v-card-actions>
            <v-btn color="red">Donar </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card>
          <v-img
            src="https://estaticos.muyinteresante.es/uploads/images/article/5f4e647d5cafe8e117b75536/1-adoptar-perro-refugio.jpg"
          >
          </v-img>
          <v-card-title> Apoya un caso de maltrato animal </v-card-title>
          <v-card-title> $25000 </v-card-title>
          <v-card-actions>
            <v-btn color="red">Donar </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
#aportes {
  background: url("https://www.pngall.com/wp-content/uploads/10/Cute-Pet-PNG-Images.png");
  width: 100%; /* El tamaño se establece en 100% */
  height: 100%; /* El tamaño se establece en 100% */
  position: sticky;
  background-size: 100% 100%;
}
</style>

<script>
export default {
  data: () => ({
    reveal: false,
  }),
};
</script>
