 <template>
   <div class="add_images">
    <form method="POST" action="posts/create">
      <input 
          accept="image/*"
          type="file"
          name="file"
          id="file" 
          @change="imageSelect"          
       />
      <label for="file">
        <i class="far fa-plus-square"></i>    
      </label>
    </form>
  </div> 
</template>
<script>

  export default{
    data(){
      return {                
      };      
    },   

    methods:{     

      imageSelect(e){

          const files = e.target.files || e.dataTransfer.files;
          if (!files.length) return;          
          this.createImage(files[0]);                     
          
      },    

      createImage(imageFile){

          let reader = new FileReader();
          reader.readAsDataURL(imageFile);

          reader.onload = e => {
              let image = e.target.result;              
              this.$router.push({ name: 'posts.create', params: { image, imageFile } });
          };                                      

      }                 

    }
  }

</script>