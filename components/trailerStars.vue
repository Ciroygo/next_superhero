<template name="trailerStars">
	
	<view class="movie-score-wapper">
		<image v-for="n in 5" :key="n" :src="'../static/icos/star-' + (n < yellowScore ? 'yellow' : 'gray') +'.png'" class="star-ico"></image>
		
		<view class="movie-score" v-if="showNum == 1">
			{{innerScore}}
		</view>
	</view>

</template>

<script>
	export default {
		
		name: "trailerStars",
		
		props:{
			innerScore: 0,
			showNum: 0,
		},
		
		data() {
			return {
				yellowScore: 0,
			};
		},
		//生命周期组件，创建完成后调用
		created() {
			if (this.innerScore != null && this.innerScore != undefined && this.innerScore != '') {
				var tempScore = this.innerScore;
			}
			this.yellowScore = parseInt(tempScore/2);
		}
	}
</script>

<style>
.movie-score-wapper {
	display: flex;
	flex-direction: row;
}
.star-ico {
	width: 20rpx;
	height: 20rpx;
	margin-top: 6rpx;
}
.movie-score {
	font-size: 12px;
	color: gray;
	margin-left: 8rpx;
}
</style>
