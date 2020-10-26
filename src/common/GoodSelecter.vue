<template>
  <div class="good_select">
    <div class="f fc fj mh20">
      <div class="f fc">
        <el-select class="mr10" v-model="params.classityId" placeholder="请选择分类" v-if="otype!='ms'">
          <el-option
            v-for="item in opts"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id">
          </el-option>
        </el-select>
        <el-select class="mr10" v-model="params.state" placeholder="请选择活动状态" v-if="gfrom=='live'&&otype=='ms'">
          <el-option
            v-for="item in activityOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input class="mr10"
          placeholder="请输入商品名称"
          prefix-icon="el-icon-search"
          v-model="params.name"></el-input>
      </div>
      <el-button type="success" icon="el-icon-search" @click="searchList">搜索</el-button>
    </div>
    <el-table ref="multipleTable" :data="goodsListInfo" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" v-if="gfrom=='live'" :selectable="selectableFunc"></el-table-column>
      <el-table-column type="selection" width="55" align="center" v-if="gfrom=='sign'"></el-table-column>
      <el-table-column label="商品信息">
        <template slot-scope="scope">
          <div class="f fc">
            <el-image fit="cover" class="w60 h60 br5 mr10" :src="scope.row.ImgSrc"></el-image>
            <div class="f fv f1 ofh">
              <div class="f fc">
                <span class="shopping_sign i-f fc fc-h" v-if="scope.row.LimitDiscount">限</span>
                <span>{{scope.row.Title}}（{{scope.row.HasSpec?'多规格商品':'单规格商品'}}）</span>
              </div>
              <p class="redColor t-b" v-if="otype=='common'&&scope.row.Price">¥ {{scope.row.Price | currencyStyle("currency")}}</p>
              <p class="redColor t-b" v-if="otype=='ms'&&scope.row.SpikePrice">¥ {{scope.row.SpikePrice | currencyStyle("currency")}} <span class="t-del">{{scope.row.PrimePrice | currencyStyle("currency")}}</span></p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ClassifyName" label="分类" v-if="gfrom=='live'">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.ClassifyName&&otype=='common'">{{scope.row.ClassifyName}}</el-tag>
          <el-tag type="primary" v-else-if="scope.row.ProductClassName&&otype=='ms'">{{scope.row.ProductClassName}}</el-tag>
          <el-tag type="info" v-else>无</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="Stock" label="库存" width="120"></el-table-column>
      <el-table-column prop="Stock" label="状态" width="120" v-if="gfrom=='live'">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.status==1">进行中</el-tag>
          <el-tag type="success" v-if="scope.row.status==0">未开始</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center" v-if="gfrom!='live'&&gfrom!='sign'">
        <template slot-scope="scope">
          <el-button @click="chooseGoodsFunc(scope.row)">选择</el-button>
          <!-- <el-button type="info" disabled @click="chooseGoodsFunc(scope.row)" v-else>已选择</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="ph10 tc">
      <el-pagination
        layout="prev, pager, next"
        :total="allGoodsNum"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div class="f fc f-end pb30" v-if="gfrom=='live'">
      <el-button type="primary" @click="addLivePlayingGoods">添加（{{selectIds.length}}/100）</el-button>
    </div>
    <div class="f fc f-end pb30" v-if="gfrom=='sign'">
      <el-button type="primary" @click="addGoodsToSign">添加（{{selectGoods.length}}/100）</el-button>
    </div>
  </div>
</template>

<script>
import tools from "@/lib/tools";
import { mapState } from 'vuex'
export default {
  props: {
    gfrom: String,//live-控制台，market-秒杀设置
    otype: String,//common-普通，ms-秒杀
    opts: Array,//分类列表
    tpid: String,
    commonstr: String,//直播中的普通商品ids
    msstr: String,//直播中的秒杀商品ids
  },
  data(){
    return {
      activityOpt: [
        {
          value: "-1",
          label: "所有活动"
        },
        {
          value: "0",
          label: "未开始"
        },
        {
          value: "1",
          label: "进行中"
        }
      ],
      params: {
        state: "-1",
        name: "",
        index: 1,
        classityId: "",
        pageindex: 1,
        pagesize: 10
      },
      goodsListInfo: [],
      allGoodsNum: 0,
      selectIds: [],
      initSelectIds: [],
      selectGoods: [],//选择的商品-用于标签选择商品
    }
  },
  computed: {
    ...mapState(['liveId'])
  },
  watch: {
    otype: {
      deep: true,
      handler(val){
        this.selectIds = [];
        if(val=='common'){
          this.getGoodListInfo();
        }else if(val=='ms'){
          this.getMsList();
        }
      }
    },
  },
  created () {
    this.getGoodListInfo();
  },
  methods: {
    async getGoodListInfo() {
      let res = await this.$api.shop.getGoodListInfo({
        ClassifyId: this.params.classityId,
        SearchVal: this.params.name,
        Salestatus: 1,
        Page: this.params.pageindex || 1,
        Size: this.params.pagesize || 10,
      });
      console.log(res);
      if (res) {
        if(this.params.pageindex==1){
          this.allGoodsNum = res.Amout;
        }
        this.selectIds = this.commonstr && this.commonstr.split(',') || [];
        res.Data.length && res.Data.forEach(item=>{
          if(this.selectIds.length&&this.selectIds.some(id=>id==item.Id)){
            item.selected = true;
          }else{
            item.selected = false;
          }
        });
        this.initSelectIds=this.selectIds;
        this.goodsListInfo = res.Data;
        await tools.throttle(500);
        this.goodsListInfo.forEach(item=>{
          if(this.gfrom=='sign'&&item.selected){
            console.log(1231312)
            this.$refs.multipleTable.toggleRowSelection(item);
          }
        })
      }
    },
    async getMsList() {
      let res = await this.$api.market.getSpikeProductList({
        status: this.params.state,
        keyword: this.params.name,
        zbid: this.liveId
      });
      console.log(res);
      if (res) {
        if (this.params.pageindex == 1) {
          this.allGoodsNum = res.Amout;
        }
        res.Data.length && res.Data.forEach(item => {
          var currTime = Date.now();
          var startTime = (new Date(item.StartTime.replace(/-/g, '/'))).getTime()
          var endTime = (new Date(item.EndTime.replace(/-/g, '/'))).getTime()
          if (currTime >= endTime) {
            item.status = 2;
          }
          if (currTime < startTime) {
            item.status = 0;
          } else {
            item.status = 1;
          }
          item.ProSpecAttr = JSON.parse(item.ProSpecAttr);
          item.HasSpec = item.ProSpecAttr.ProSpecId ? true : false;
          if(this.msstr&&this.msstr.includes(item.Id)){
            item.selected = true;
          }else{
            item.selected = false;
          }
        });
        this.selectIds = this.msstr && this.msstr.split(',') || [];
        this.initSelectIds=this.selectIds;
        this.goodsListInfo = res.Data || [];
      }
    },
    // 搜索
    searchList(){
      this.params.pageindex = 1;
      if(this.otype=='common'){
        this.getGoodListInfo();
      }else if(this.otype=='ms'){
        this.getMsList();
      }
    },
    handleJumpFunc(type) {
      tools.goNewPage(this, type);
      this.$emit('close')
    },
    handleCurrentChange(index){
      this.params.pageindex=index;
      if(this.otype=='common'){
        this.getGoodListInfo();
      }else if(this.otype=='ms'){
        this.getMsList();
      }
    },
    handleGoodsList(num){
      this.$emit('change',{
        name: this.params.name,
        pageindex: num || this.params.index,
      })
    },
    chooseGoodsFunc(row){
      this.$emit('choose',row.Id)
    },
    handleSelectionChange(val) {
      if(this.gfrom=='live'){
        var ids = [];
        val.forEach(item=>{
          ids.push(item.Id)
        })
        this.selectIds = this.initSelectIds.concat(ids);
      }else{
        this.selectGoods = val;
      }
    },
    async addLivePlayingGoods(){
      var res = this.otype=='common'?await this.$api.live.addLivingProduct({
        tpId: this.tpid,
        ids: this.selectIds.join(',')
      }):await this.$api.live.addLivingSpikeProduct({
        tpId: this.tpid,
        ids: this.selectIds.join(',')
      });
      console.log(res)
      if(res){
        tools.toast(this,"添加成功","success");
        this.$emit('close')
      }
    },
    // 选择商品
    selectableFunc(row,index){
      console.log("selectableFunc",row,index)
      if(row.selected){
        return false;
      }
      return true;
    },
    // 把选择完的商品丢给父类-标签页
    addGoodsToSign(){
      this.$emit('choose',this.selectGoods)
    }
  },
}
</script>

<style lang="less" scoped>

</style>