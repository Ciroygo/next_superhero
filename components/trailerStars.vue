<template name="trailerStars">
	
	<view class="movie-score-wapper">
		<image src="../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../static/icos/star-gray.png" class="star-ico"></image>
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
			showNum: 0
		},
		
		data() {
			return {
				yellowScore: 0,
				grayScore: 5,
			};
		},
		//生命周期组件，创建完成后调用
		created() {
			if (this.innerScore != null && this.innerScore != undefined && this.innerScore == '') {
				var tempScore = this.innerScore;
			}
			var yellowScore = parseInt(tempScore/2);
			var grayScore = 5 - yellowScore;
			this.yellowScore = yellowScore;
			this.grayScore = grayScore;
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
