<template>
  <main>
    <v-card
      id="canvas-container"
      justify="center"
      align="center"
    >
      <div
        id="canvasContainer"
        ref="canvasContainer"
      >
        <canvas
          id="canvas"
          ref="canvas"
          height="500"
        />
      </div>
      <v-form>
        <v-item-group>
          <v-autocomplete
            v-model="name"
            data-cy="user-selector"
            :items="userNames()"
            @change="onNameInput"
          />
          <v-btn
            class="btn"
            @click="savePicture"
          >
            Spara Bild
          </v-btn>
          <v-btn
            class="btn"
            data-cy="download-btn"
            @click="emptyCardGateKeeper"
          >
            Ladda ned kort
          </v-btn>
          <v-btn @click="$emit('deleteCard')">
            Ta bort
          </v-btn>
        </v-item-group>
      </v-form>
      <img
        ref="bg"
        src="../assets/background.png"
        hidden="hidden"
      >
      <img
        ref="logo"
        src="../assets/logo.png"
        hidden="hidden"
      >
    </v-card>

    <BaseModal
      :show-modal="showModal"
      :header="'Kortet du vill ladda ner saknar användare'"
      :body="'Passerkortet som du försöker ladda ner har ingen användare tilldelat till sig. Detta gör passerkortet oanvändbart. Vill du fortsätta?'"
      :actions="dialogButtons"
    />
  </main>
</template>

<!--
  There are some uncommon imports in this file such as resize and JsBarcode.
  resize is used to manipulate pixel width on images,
  Jsbarcode is a dependency used for interpreting the barcode information on the
  cards
-->

<script lang="ts">
import { ref, defineComponent, SetupContext, watch, Ref } from '@vue/composition-api';
import JsBarcode from 'jsbarcode';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import resize from 'vue-resize-directive';
import { setTimeout } from 'timers';
import UsersModule from '../store/modules/UsersModule';
import { User } from '@/types';
import roleToText from '@/helpers/roleToText';
import BaseModal from '@/components/BaseModalComponent.vue';

interface CigCanvasProps {
  image: File,
  sendCanvas: boolean,
  savePictureTrigger: boolean,
  index: number,
}

export default defineComponent({
  name: 'CigCanvas',
  directives: {
    resize,
  },

  components: {
    BaseModal
  },

  props: {
    image: {type: File, default: null},
    sendCanvas: {type: Boolean, default: false},
    savePictureTrigger: {type: Boolean, default: false},
    index: {type: Number, default: null},
  },

  setup(props: CigCanvasProps, { root, emit }: SetupContext) {
    let name = ref('');
    let barcode: string = '';
    let role: number = 0;
    let email: string = '';
    let width: number = 0;
    let height: number = 0;
    let context: CanvasRenderingContext2D | null = null;
    let snackbarText = ref('');
    let snackbar = ref(false);
    let showModal = ref(false);

    let dialogButtons = [
      {text: 'Nej', action: ():void => { showModal.value = false;}},
      {text: 'Ja', action: ():void => {showModal.value = false; downloadCanvas();}},
    ];

    const canvasContainer: Ref<HTMLDivElement | null> = ref(null);
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    const bg: Ref<HTMLImageElement | null> = ref(null);
    const logo: Ref<HTMLImageElement | null> = ref(null);

    // Method userNames is used in order to filter out the users that are not deleted to verify
    // that the user that you are trying to render on the card is an actual active user

    function userNames(): string[] {
      return Object.entries(UsersModule.all)
        .filter(([key, user]) => !(user as User).name.includes('Deleted User'))
        .map(([key, user]) => (user as User).name);
    }

    // checkUserData is used to fill the instances of the class with information from the
    // UsersModule so that the card has the right inforamtion

    function checkUserData(): void { // TODO: don't compare name to find the user. Instead compare the uid.
      for (const user in UsersModule.all) {
        if (name.value === UsersModule.all[user].name) {
          barcode = user;
          email = UsersModule.all[user].email;
          role = UsersModule.all[user].role;
          break;
        }
      }
    }

    // The generateCanvas method does exactly what its called and uses the resize dependency
    // to cut the canvas into a good format

    function generateCanvas(): void {
      getCanvasContainerSize();
      setCanvasSize();
      if (context !== null) {
        context.clearRect(0, 0, width, height);

        setTimeout(() => {
          if (bg.value && context && logo.value) {
            context.drawImage(bg.value, 0, 0, width, height);

            context.drawImage(logo.value, width / 2 - 75, 25);
            drawText();
            drawImages();
          }
        }, 200);
      }
    }

    // Sets the instance of the height and width to the client hight and width to standardise
    // the structure of the canvas

    function getCanvasContainerSize(): void {
      if(canvasContainer.value !== null){
        // 17 to 27 is the relation between a creditcards width and height
        // TODO: Translate the hardcoded relation to a mathematical formula for extra
        //       style points.
        let scale = 15;
        width = 17 * scale;
        height = 27 * scale;
      }
    }

    // the setCanvasSize method basically does the same thing but sets the dimensions to 2d

    function setCanvasSize(): void {
      if(canvas.value !== null){
        context = canvas.value.getContext('2d');
        canvas.value.width = width;
        canvas.value.height = height;
      }
    }

    // the draw image instantiates new classes of the image based on the barcode and also
    // on the extracted zip file that is the profile image

    function drawImages(): void {

      const barcodeImage = new Image();
      const profileImage = new Image();

      if (props.image != null) {
        profileImage.src = URL.createObjectURL(props.image);
      }

      if (barcode !== '') {
        JsBarcode(barcodeImage, barcode);
      }

      setTimeout(() => {
        if (context){
          context.save();
          context.beginPath();
          context.arc(
            width / 4 + width / 4,
            height / 4 + width / 4,
            width / 4,
            0,
            Math.PI * 2,
            true,
          );

          context.closePath();
          context.clip();

          context.drawImage(
            profileImage,
            width / 4,
            height / 4,
            width / 2,
            width / 1.5,
          );

          context.beginPath();
          context.arc(
            width / 4,
            height / 4,
            width / 2,
            0,
            Math.PI * 2,
            true,
          );
          context.clip();
          context.closePath();
          context.restore();

          context.drawImage(
            barcodeImage,
            width / 4,
            width * 1.15,
            width / 2,
            width / 3,
          );
        }
      }, 200);
    }

    // draw text method renders the text on the canvas in order to style it and also get
    // good fonts and such

    function drawText(): void {
      if (context){
        const firstFontSize = width / 10;

        context.font = firstFontSize + 'px Arial';
        context.textAlign = 'center';
        context.fillStyle = '#ffffff';
        context.fillText(
          name.value,
          width / 2,
          height / 2 + height / 8,
          width,
        );
        context.fillText(
          roleToText(role),
          width / 2,
          height / 1.7 + height / 8,
          width,
        );
      } 200;
    }

    // This is a watch action that monitors the send the instance sendCanvas to see if the
    // boolean is being mutated in any way and also blobs the image to send it via the
    // emit method built in Vue to the parent component

    watch(() => props.sendCanvas, (newVal: boolean, _: boolean) => {
      if(newVal){
        canvas.value!.toBlob((blob: Blob | null) => {
          emit('imageSent', {image: blob, isEmpty: name.value == ''});
        });
      }
    });

    // This is a watch action that monitors the prop savePictureTrigger to see if the
    // boolean is being mutated in any way and calls the function savePicture if true

    watch(() => props.savePictureTrigger, (newVal: boolean, _: boolean) => {
      if(newVal){
        savePicture();
      }
    });


    function emptyCardGateKeeper(): void{
      if(name.value == ''){
        showModal.value = true;
      }else{
        downloadCanvas();
      }
    }

    // the download canvas method is used to download and also save the donwloaded zip to
    // the new instance of a JSZIP to later blob it so that it can be used in Vue
    function downloadCanvas(): void {
      const zip = new JSZip();
      canvas.value!.toBlob((blob: Blob | null) => {
        if (blob){
          zip.file(name.value + '.png', blob);
          zip.generateAsync({ type: 'blob' }).then((zipBlob : Blob) => {
            FileSaver.saveAs(zipBlob, 'cards.zip');
          });
        }
      });
    }

    // savePicture method instantiates a new object of FormData to send the uid and the image
    // so that the new picture so that it later can be updated and watched by the earlier
    // mentioned watch action

    function savePicture(): void {
      const formData = new FormData();
      formData.append('uid', barcode);
      formData.append('image', props.image as Blob);
      UsersModule.update(formData).then((response: User) => {
        snackbarText.value = `${name.value} bild har uppdaterats!`;
      }).catch((error: object) => {
        // TODO: show in notification to user
        snackbarText.value = `${name.value} bild gick inte att uppdatera.`;
        console.log(error);
      });

      snackbar.value = true;
    }

    // onNameInput is a getter to receive the information stored in the instance of checkUserData
    // and the generate Canvas

    function onNameInput(): void {
      checkUserData();
      generateCanvas();
    }

    // this is also a getter to receive information simply from the generate canvas instance

    root.$nextTick(() => {
      generateCanvas();
    });

    return {
      userNames, onNameInput, name, savePicture, downloadCanvas, snackbarText, snackbar, canvasContainer, canvas, bg, logo, showModal, dialogButtons, emptyCardGateKeeper
    };
  }
});
</script>

<style lang="css" scoped>
#canvas-container{
  padding: 10px;
  margin: 5px;
}
.btn{
  margin: 5px;
}
</style>
