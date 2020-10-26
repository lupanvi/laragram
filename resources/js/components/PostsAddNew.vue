<template>
	<div class="new-post">
	            
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
	                            <a class="btn" :class="inProgress ? 'disabled' : ''" href="#" v-if="step === 2" @click.prevent="share">Share</a>
	                        </div>

	                    </div> 

	                    <div class="main-image"
	                         :class="selectedFilter"
	                         :style="{ backgroundImage: 'url(' + imageSrc + ')' }"></div>    

	                    <div class="filters d-flex" v-if="step === 1">

	                        <div class="filter" v-for="filter in filters">
	                            <h3>{{ filter.name }}</h3>                            
	                            <div class="image" 
	                                 :class="filter.name"                                
	                                @click="selectFilter(filter.name)"
	                                :style="{ backgroundImage: 'url(' + imageSrc + ')' }"
	                                
	                             ></div>                            
	                        </div>
	                    </div>

	                    <div class="description-container d-flex justify-content-center align-items-center" v-if="step === 2">

	                        <textarea 
	                        	v-model="description" 
	                        	class="form-control" 
	                        	placeholder="Write a description">	
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
	import { 		
		POST_PUBLISH		
	} from "../store/actions.type";		

	export default{	

		name: 'PostsAddNew',

		props:{
			image: {
				type: String,
				required: true
			},
			imageFile: {
				type: File,
				required: true
			}
		},		

		data(){
			return {
				step: 1,
				filters,
				selectedFilter: 'normal',				
				description:'',
				imageSrc: this.image,
				imageData: this.imageFile,
				feedback:'',
				inProgress: false				
			}
		},

		created(){
			
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
				this.imageSrc = '';
				this.imageData = '';				
				this.$router.push('/');
			},

			share(){
				this.inProgress = true;

				let data = new FormData();

                data.append('image_path', this.imageData);                
                data.append('filter', this.selectedFilter);                
                data.append('description', this.description);

                this.$store
                	.dispatch(POST_PUBLISH, data)
                	.then(()=>{
                		this.inProgress = false;
                		this.reset();
                		this.close();  
                	}).catch(error=>{
                		this.inProgress = false;
                		this.feedback = error.response.data.message;
                	});               
				
			}

		}


	}
	
</script>