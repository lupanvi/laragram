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

import EventBus from '../event-bus.js';

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

      createImage(file){

          let reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = e => {
              let src = e.target.result;
              EventBus.$emit('loaded', { src, file });
          };                    
        
          this.$router.push({ name: 'posts.create' });

      }                 

    }
  }

</script>