<template>
  <div class="brand">
    <Row :gutter="1">
      <Col :xs="{ span: 12}" :sm="{ span: 8 }" :lg="{ span: 6}">
        <div class="brand-box">
          <div class="header">
            <img src="../../assets/img/meijian.png">
          </div>
          <ul class="check">
            <li>
              <div>
                <img src="../../assets/img/yizi.png">
              </div>
            </li>
            <li>
              <div>
                <img src="../../assets/img/yizi.png">
              </div>
            </li>
            <li>
              <div>
                <img src="../../assets/img/yizi.png">
              </div>
            </li>
            <li>
              <div>
                <img src="../../assets/img/yizi.png">
              </div>
            </li>
          </ul>
        </div>
      </Col>
      <Col :xs="{ span: 12}" :sm="{ span: 8 }" :lg="{ span: 6}">
      <div class="brand-box">
        <div class="header">
          <img src="http://m1.cdn.imeijian.cn/2cff69981246991eccac7e87f482e151.png@!300w">
        </div>
        <ul class="check">
          <li>
            <div>
              <img src="http://m1.cdn.imeijian.cn/67df07c3d930f481f96281e7c88c1e68.jpg@!250wh">
            </div>
          </li>
          <li>
            <div>
              <img src="http://m1.cdn.imeijian.cn/67df07c3d930f481f96281e7c88c1e68.jpg@!250wh">
            </div>
          </li>
          <li>
            <div>
              <img src="http://m1.cdn.imeijian.cn/67df07c3d930f481f96281e7c88c1e68.jpg@!250wh">
            </div>
          </li>
          <li>
            <div>
              <img src="http://m1.cdn.imeijian.cn/67df07c3d930f481f96281e7c88c1e68.jpg@!250wh">
            </div>
          </li>
        </ul>
      </div>
      </Col>
      <Col :xs="{ span: 12}" :sm="{ span: 8 }" :lg="{ span: 6}">
      <div class="brand-box">
        <div class="header">
          <img src="http://m1.cdn.imeijian.cn/2cff69981246991eccac7e87f482e151.png@!300w">
        </div>
        <ul class="check">
          <li>
            <div>
              <img src="http://m1.cdn.imeijian.cn/67df07c3d930f481f96281e7c88c1e68.jpg@!250wh">
            </div>
          </li>
          <li>
            <div>
              <img src="http://m1.cdn.imeijian.cn/67df07c3d930f481f96281e7c88c1e68.jpg@!250wh">
            </div>
          </li>
          <li>
            <div>
              <img src="http://m1.cdn.imeijian.cn/67df07c3d930f481f96281e7c88c1e68.jpg@!250wh">
            </div>
          </li>
          <li>
            <div>
              <img src="http://m1.cdn.imeijian.cn/67df07c3d930f481f96281e7c88c1e68.jpg@!250wh">
            </div>
          </li>
        </ul>
      </div>
      </Col>
    </Row>
    <!--<Row>-->
    <!--<Col :xs="{ span: 12}" :sm="{ span: 8 }" :lg="{ span: 6}">-->
    <!--<div>col-6</div>-->
    <!--</Col>-->
    <!--<Col :xs="{ span: 12}" :sm="{ span: 8 }" :lg="{ span: 6}">-->
    <!--<div>col-6</div>-->
    <!--</Col>-->
    <!--<Col :xs="{ span: 12}" :sm="{ span: 8 }" :lg="{ span: 6}">-->
    <!--<div>col-6</div>-->
    <!--</Col>-->
    <!--<Col :xs="{ span: 12}" :sm="{ span: 8 }" :lg="{ span: 6}">-->
    <!--<div>col-6</div>-->
    <!--</Col>-->
    <!--</Row>-->
  </div>
</template>

<script>
  export default {
    name: 'brand',
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .brand {
    background-color: #353F48;
    padding-top: 10px;
    padding-left: 10px;
  }

  .brand-box {
    background-color: #fff;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .header {
    height: 48px;
    position: relative;
    padding: 8px 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header img {
    max-width: 98px;
    max-height: 32px;
  }

  .check {
    box-sizing: border-box;
  }

  .check:after {
    content: '';
    clear: both;
    display: block;
  }

  .check li {
    width: 50%;
    float: left;
    border: 1px solid #eee;
    border-radius: 2px;
  }

  .check li div {
    padding-top: 100%;
    position: relative;
  }

  .check img {
    position: absolute;
    width: 60%;
    height: 60%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
