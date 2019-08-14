
<template name="helloComp"> 
	<view>
		{{msg}}
		<view class="">
			<input type="text" :value="myvalue"  class="txt"/>
			
		</view>
	</view>
</template>

<script>
	export default {
		
		name: "helloComp",
		

		
		data() {
			return {
				msg: "hello world1231231",
			};
		},
		
		props: {
			myvalue: {
				type: String
			}
		}
	}
</script>

<style>
.txt {
	color: #4CD964;
}
</style>
