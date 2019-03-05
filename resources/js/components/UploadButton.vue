 <template>
   <div class="add_images">
      <input 
          type="file"
          name="file"
          id="file" 
          @change="imageSelect"          
       />
        <label for="file">
          <i class="far fa-plus-square"></i>    
        </label>
  </div> 
</template>
<script>

  export default{
    data(){
      return {        
        image: '',
        imageFile: ''        
      };      
    },   

    methods:{     

      imageSelect(e){               
          const files = e.target.files || e.dataTransfer.files;
          if (!files.length) return;
          this.imageFile = files[0];
          this.createImage();          
      },    

      createImage(){

          const reader = new FileReader();
          reader.readAsDataURL(this.imageFile);
          reader.onload = e => {       
            this.image = e.target.result;            
            this.$modal.show('upload-modal',{image:this.image, imageFile:this.imageFile});
          };                    
      }                 

    }
  }

</script>