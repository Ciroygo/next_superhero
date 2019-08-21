<template>
	<view class="black">
		<image :src="cover" mode="widthFix" class="cover" @longpress="operator"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover: ""
			}
		},
		onLoad(params) {
			this.cover = params.cover;
			
			// 通过api修改导航栏属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor:"#000000"
			})
		},
		methods: {
			operator() {
				var me = this;
				uni.showActionSheet({
					itemList: ["保存图片", "分享", "你猜猜"],
					success: function(res) {
						if (res.tapIndex == 0) {
							uni.showLoading({
								title: "图片保存中。。"
							})
							uni.downloadFile({
								url: me.cover,
								success: function(result) {
									var tempFilePath = result.tempFilePath;
									console.log(tempFilePath);
									// uni.hideLoading();
									
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: function () {
											uni.showToast({
												title: "保存成功过",
												duration: 2000
											})
											console.log('save success');
										},
										complete: function() {
											uni.hideLoading();
										}
									});
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
.black {
	background-color: #000000;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
}
.cover {
	align-self: center;
}
</style>
