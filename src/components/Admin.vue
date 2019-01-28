<template>
<div>
	<div class="row">
		<div class="col-sm-12 col-md-8">
			<!-- new 菜单 -->
			<app-new-pizza></app-new-pizza>
		</div>
		<div class="col-sm-12 col-md-4">
			<!-- 品种展示 -->
			<h3 class="text-muted my-5"> 菜单</h3>
			<table class="table">
				<thead class="table table-default">
					<tr>
						<th>品种</th>
						<th>删除</th>
					</tr>
				</thead>
				<tbody v-for="item in getMenuItems" :key="item.name">
					<tr>
						<td>{{item.name}}</td>
						<td>
							<button @click="deletData(item)" class="btn btn-outline-dander btn-sm">&times;</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>
<script>
import NewPizza from './NewPizza.vue'
	export default{
		data(){
			return{
				// getMenuItems:[]
			}
		},
		components:{
			'app-new-pizza':NewPizza
		},
		computed:{
			getMenuItems:{
				//在vuex中获取数据 
				get(){
					//通过getters获取数据
				return this.$store.getters.getMenuItems;
				},
				set(){

				}
			}
		},
		created(){
			fetch("https://wd4291572084geexda.wilddogio.com/menu.json")
				.then( res => {
					return res.json();
				})
				.then( data => {
					// console.log(data);
					let menuArray = [];
					for(let key in data){
						// console.log(key);
						// console.log(data[key]);
						data[key].id = key;
						menuArray.push(data[key]);
					}
					// this.getMenuItems = menuArray;


					//传到vuex里去  数据同步
					this.$store.commit('setMenuItems',menuArray)

				})
		},
		methods:{
			deletData(item){
				fetch("https://wd4291572084geexda.wilddogio.com/menu/"+item.id+"/.json",{
					method:"DELETE",
					headers:{
						'Content-type':'application/json'
					}
				})
					.then( res => res.json())
					// .then( data => this.$router.push({name:"menuLink"}))

					//数据同步
					.then( data => {
						this.$store.commit('removeMenuItems',item)
					})

					.catch(err => console.log(err))
			}
		}



		// data(){
		// 	return {
		// 		name:"Henry"
		// 	}
		// },
		//组件守卫
		// beforeRouteEnter: (to,from,next)=>{
		// 	// alert("hello:" + this.name);
		// 	next( vm=>{
		// 		alert("Hello :" + vm.name);
		// 	})
		// }
		// beforeRouteLeave: (to,from, next)=>{
		// 	if(confirm("确定离开吗？") == true){
		// 		next();
		// 	}else{
		// 		next(false);
		// 	}
		// }

	}
</script>