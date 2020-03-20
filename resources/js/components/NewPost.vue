<template>
	<div class="upload-modal">
	            
	        <div class="container">           

	            <div class="row justify-content-center">
	                <div class="col-lg-6">  

	                    <div class="header d-flex justify-content-between align-items-center">

	                        <div>
	                            <a href="#" @click.prevent="close">Cancel</a>
	                        </div>
	                        <div>
	                            <h1>Laragram</h1>
	                        </div>
	                        <div>                            
	                            <a href="#" v-if="step === 1" @click.prevent="step = 2 ">Next</a>
	                            <a href="#" v-if="step === 2" @click.prevent="share">Share</a>
	                        </div>

	                    </div> 

	                    <div class="main-image"
	                         :class="selectedFilter"
	                         :style="{ backgroundImage: 'url(' + image + ')' }"></div>    

	                    <div class="filters d-flex" v-if="step === 1">

	                        <div class="filter" v-for="filter in filters">
	                            <h3>{{ filter.name }}</h3>                            
	                            <div class="image" 
	                                 :class="filter.name"                                
	                                @click="selectFilter(filter.name)"
	                                :style="{ backgroundImage: 'url(' + image + ')' }"
	                                
	                             ></div>                            
	                        </div>
	                    </div>

	                    <div class="description-container d-flex justify-content-center align-items-center" v-if="step === 2">

	                        <textarea v-model="description" class="form-control" placeholder="Escribe una descripcion">
	                            
	                        </textarea>
	                        
	                    </div>

	                    <div class="mt-2" v-if="feedback">
                        	<div class="text-danger text-center" v-text="feedback"></div>
                    	</div>

	                </div>
	            </div>
	        </div>	   

	</div>	
</template>
<script>

	import filters from "../filters";	
	import EventBus from '../event-bus.js';

	export default{				

		data(){
			return {
				step: 1,
				filters,
				selectedFilter: 'normal',				
				description:'',
				image:'',
				imageFile:'',
				feedback:''				
			}
		},

		created(){

			EventBus.$on('loaded', evt => {				
				this.image = evt.src;
				this.imageFile = evt.file;	
        	});		
			this.reset();		
		},

		methods:{			

			selectFilter(filter_name){
				this.selectedFilter = filter_name;					
			},		

			reset(){
				this.step = 1;
				this.selectedFilter = 'normal';				
				this.description = '';
				document.querySelector("#file").value = "";
			},

			close(){
				this.image = this.imageFile = '';				
				this.$router.push('/');
			},

			share(){

				let data = new FormData();

                data.append('image_path', this.imageFile);                
                data.append('filter', this.selectedFilter);                
                data.append('description', this.description);  
                
				axios.post('/posts', data).then(({data})=>{										
					EventBus.$emit('addNewPost', { newPost : data } );		
					this.reset();	
					this.close();						
				}).catch( error =>{
					this.feedback = error.response.data.message;
				});				
				
			}

		}


	}
	
</script>