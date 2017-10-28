<template>
	<div class="layout-l" >
		<Affix v-bind:class="{ active: isActive }">
			<div class="demo-affix">
			<Menu mode="horizontal" theme="dark" active-name="1" class="top">
				<!--<div class="layout-logo"></div>-->
				<div class="layout-nav">
          <router-link :to="{name:'content'}">
            <Menu-item name="1">
              <Icon type="ios-keypad" size="18"></Icon>
              <span class="layout-text ">成品预览</span>
            </Menu-item>
          </router-link>

					<!--<router-link to="/">-->
						<!--<Menu-item name="1">-->
							<!--<Icon type="ios-navigate" size="18"></Icon>-->
							<!--<span class="layout-text">單品展示</span>-->
						<!--</Menu-item>-->
					<!--</router-link>-->
					<router-link to="/search">
						<Menu-item name="2">
							<Icon type="ios-search" size="18"></Icon>
							<span class="layout-text">我的搜索</span>
						</Menu-item>
					</router-link>
          <router-link to="/puzzle">
            <Menu-item name="3">
              <Icon type="ios-analytics " size="18 "></Icon>
              <span class="layout-text ">我的拼图</span>
            </Menu-item>
          </router-link>
					<router-link to="/myCollect">
						<Menu-item name="4">
							<Icon type="heart"  size="18"></Icon>
							<span class="layout-text ">我的单品</span>
						</Menu-item>
					</router-link>
					<div style="float: right; ">
						<!--<i-button type="text" class="bottom " style="float: left; ">
							<Poptip title="提示标题 " content="提示内容 " placement="bottom">
								<Icon type="ios-help " size="28" float="right "></Icon>
								<div class="api myintro" slot="content">-->
									<!--<textarea maxlength="300" placeholder="任何疑问或建议？告诉我们吧"></textarea><br/><br/>-->
									<!--<Button type="primary" style="width: 90%;">發送</Button><br/><br/>-->
									 <!--<Button style="width: 90%;">新手教程</Button>
									<div >-->
										<!--<img width="160px" src="http://s2.cdn.imeijian.cn/img/code_wx_officialAccount.09a10e00f59d6f5c41fa8a5aa665c9ef.jpg" alt="" /><br/>-->
										<!--<span class="text">獲取更多更及時的反饋，請<br/>關注微信公眾號</span>
									</div>
								</div>
							</Poptip>
						</i-button>-->
						<i-button type="text" class="bottom " style="float: left; ">
							<!--<Poptip title="提示标题 " content="提示内容 " placement="bottom">-->
								<Button type="primary" shape="circle" icon="plus-round" @click="routerTo('/canvas')" class="bottom">
									&nbsp;&nbsp;&nbsp;&nbsp;創建&nbsp;&nbsp;&nbsp;&nbsp;
								</Button>
								<!--<div class="api creat" slot="content">
									<div class="top">
										<Icon type="android-create" size="34"></Icon><br/>
										創作拼圖
									</div>
									<div class="bottom">
										<Icon type="android-upload" size="34" ></Icon><br/>
										上傳單品
									</div>
								</div>
							</Poptip>-->
						</i-button>
						<!--<i-button type="text" class="bottom " style="float: left; ">
							<Poptip title="提示标题 " content="提示内容 " placement="bottom-end">
								<Icon type="android-mail" size="28"> </Icon>
								<div class="api" slot="content">
									<div class="top">
										<div class="top_left">通知</div>
										<div class="top_right">私信</div>
									</div>
								</div>
							</Poptip>
						</i-button>-->
						<i-button type="text" class="bottom" style="float: left;">
							<Poptip title="你好 " content="提示内容 " placement="bottom-end">
								<Icon type="person" size="28"></Icon>
								<div @click="closeLogin()" class="api" slot="content">
									退出登录
								</div>
							</Poptip>
						</i-button>
					</div>
				</div>
			</Menu>
			</div>
        </Affix>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
	name: 'Hello',
	data () {
		return{
			isActive:false,
		}
	},
	methods:{
		routerTo(url){
			this.$router.push({path: url});
		},
		closeLogin(){
			localStorage.clear();
			this.$router.push({name: "login"});
		}
	}

}
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
	textarea{
		    border: 0;
		    outline: none;
		    -webkit-tap-highlight-color: transparent;
		    -webkit-appearance: none;
		    -moz-appearance: none;
		    appearance: none;
	}
	 .layout{
        border: 1px solid #d7dde4;
        background: #293036;
        line-height: 48px;
    	height: 48px;
    	min-width: 900px;
    }
    .top.ivu-menu.ivu-menu-dark.ivu-menu-horizontal{
    	line-height: 48px;
    	height: 48px;
    	background: #293036;
    	min-width: 900px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 8px;
        left: 20px;
        margin-right: 30px;
    }
    .layout-nav{
        /*width: 420px;*/
        /*margin: 0 auto;*/
       margin-left: 30px;
    }
    .layout-text{
    	/*font-size: 12px;*/
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        margin-left: 30px;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 10px;
        color: #9ea7b4;
    }

    .myintro{
    	width: 208px;
    	box-sizing: border-box;
    	overflow: hidden;
    }
    .myintro textarea{
    	padding: 6px 12px;
	    width: 216px;
	    height: 165px;
	    color: #b2c0c8;
	    font-size: 12px;
	    line-height: 24px;
	    overflow-y: auto;
	    border-radius: 2px;
	    background-color: #f2f2f3;
	    resize: none;
	    border: none;
	    box-sizing: border-box;
    }
    .myintro span.text{
    	display: inline-block;
	    width: 150px;
	    height: 32px;
	    line-height: 16px;
	    font-size: 12px;
	    color: #b2c0c8;
	    word-wrap:break-word;
	    word-break:break-all;
    }
    .creat{
    	width: 120px;
    }
    .creat>.top{
    	width: 100%;
    	height: 120px;
    	padding-top: 36px;
    	text-align: center;
    	border-bottom: 1px solid #f4f4f4;
    }
    .creat>.bottom{
    	width: 100%;
    	height: 120px;
    	padding-top: 36px;
    	text-align: center;
    }
   	.ivu-menu-light{
    	z-index: -0;
    }
</style>
