<script>
	export default{		

		data(){
			return {
               labelClassData: ['name','email','password','password-confirm'],
               namel: false,
               name: ''
			};
		},

		methods:{

			labelMove(input){

				this[input] = true;

				

				//return labelClass[input]

				/*if(this.name != ""){
					this.labelClass = "ef";	
				}else{
					this.labelClass = "";
				}*/

			},

			labelClass(){
				//return labelClassData[''];
			}		

			
		}
	}
</script>