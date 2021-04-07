<template>
	<div class="jdsms-box">
		<!-- 顺手做个简易的可重复使用的echarts组件 -->
		<div class="jdsms-left" id="chartbox"></div>
		<div class="jdsms-right">
			<div class="jdsms-right-btnbox">
				<el-date-picker v-model="date" type="date" placeholder="选择日期" class="jdsms-right-btn-date"></el-date-picker>
				<el-button type="primary" icon="el-icon-search" class="jdsms-right-btn-search" @click="handleSearch">查询</el-button>
				<el-button type="primary" class="jdsms-right-btn-add" @click="handleAdd">
					新增
					<i class="el-icon-upload el-icon--right"></i>
				</el-button>
			</div>
			<div class="jdsms-right-table">
				<el-table :data="tableData" style="width: 100%" :max-height="tableHeight">
					<el-table-column prop="name" label="姓名" width="160"></el-table-column>
					<el-table-column prop="phone" label="联系方式"></el-table-column>
					<el-table-column fixed="right" label="操作" width="120">
						<template slot-scope="scope">
							<el-button @click.native.prevent="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
							<el-button @click.native.prevent="handleCheck(scope.row)" type="text" size="small">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400"
					class="jdsms-right-pagination"
				></el-pagination>
			</div>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" :before-close="handleClose" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="70px" class="demo-dynamic">
				<el-row>
					<el-col :span="12">
						<el-form-item prop="name" label="姓名"><el-input v-model="dynamicValidateForm.name" class="form-input"></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="phone" label="联系方式"><el-input v-model="dynamicValidateForm.phone" class="form-input"></el-input></el-form-item>
					</el-col>
				</el-row>
				<el-form-item
					v-for="(domain, index) in dynamicValidateForm.domains"
					:label="'弟妹' + index"
					:key="domain.key"
					:prop="'domains.' + index + '.bs'"
					:rules="{
						required: true,
						message: '弟妹信息不能为空',
						trigger: 'blur'
					}"
				>
					<el-input v-model="domain.bs.name" class="form-input form-input-name" placeholder="请输入弟妹姓名"></el-input>
					<el-select v-model="domain.bs.sex" class="form-input form-input-sex" placeholder="请选择弟妹性别">
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="0"></el-option>
					</el-select>
					<el-date-picker v-model="domain.bs.birth" class="form-input form-input-birth" type="date" placeholder="请选择弟妹生日"></el-date-picker>
					<el-input v-model="domain.bs.phone" class="form-input form-input-phone" placeholder="请输入弟妹联系方式"></el-input>
					<el-button @click.prevent="removeDomain(domain)">删除</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
					<el-button @click="addDomain">新增弟妹信息</el-button>
					<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import moment from 'moment';
export default {
	name: 'index',
	data() {
		return {
			// 查询日期，默认当天
			date: moment().format('YYYY-MM-DD'),
			// 表格动态最大高度
			tableHeight: document.body.clientHeight - 210,
			// 表格数据
			tableData: [
				{
					name: '安倍晋六',
					phone: '19031290302'
				}
			],
			// 当前页
			currentPage: '',
			// 是否隐藏弹窗
			dialogVisible: false,
			// 弹窗标题
			dialogTitle: '对话框',
			// 动态表单
			dynamicValidateForm: {
				domains: [
					{
						bs: {
							name: '',
							sex: '',
							birth: '',
							phone: ''
						}
					}
				],
				name: '',
				phone: ''
			}
		};
	},
	mounted() {
		this.initCharts();
		this.initTableData();
	},
	methods: {
		// 提交表单
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 删除一行
		removeDomain(item) {
			var index = this.dynamicValidateForm.domains.indexOf(item);
			if (index !== -1) {
				this.dynamicValidateForm.domains.splice(index, 1);
			}
		},
		// 新增一行
		addDomain() {
			this.dynamicValidateForm.domains.push({
				bs: {
					name: '',
					sex: '',
					birth: '',
					phone: ''
				},
				key: Date.now()
			});
		},
		// 拦截关闭弹窗事件
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		// 每页条数改变
		handleSizeChange(val) {
			this.$message.info(`功能开发中，每页 ${val} 条`);
		},
		// 当前页改变
		handleCurrentChange(val) {
			this.$message.info(`功能开发中，当前页: ${val}`);
		},
		// 查询
		handleSearch() {
			this.$message.info('功能开发中');
		},
		// 新增
		handleAdd() {
			this.dialogTitle = '新增';
			this.dialogVisible = true;
		},
		// 编辑
		handleEdit() {
			this.dialogTitle = '编辑';
			this.dialogVisible = true;
		},
		// 查看
		handleCheck() {
			this.dialogTitle = '查看';
			this.dialogVisible = true;
		},
		// 表格数据初始化
		initTableData() {
			if (this.tableData.length < 100) {
				this.tableData.push({
					name: '安倍晋六',
					phone: '19031290302'
				});
				this.initTableData();
			}
		},
		// 加载图表
		initCharts() {
			var chartDom = document.getElementById('chartbox');
			var myChart = echarts.init(chartDom);
			var option;

			setTimeout(function() {
				option = {
					legend: {
						top: 30
					},
					tooltip: {
						trigger: 'axis',
						showContent: false
					},
					dataset: {
						source: [
							['product', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
							['往月满十八岁', 256, 82, 88, 70, 523, 825, 25, 137, 41, 18, 33, 49],
							['本月满十八岁', 51, 351, 55, 53, 73, 628, 240, 462, 269, 36, 45, 32],
							['下月满十八岁', 40, 62, 469, 36, 45, 342, 251, 851, 55, 353, 73, 68],
							['无满十八岁', 25, 37, 41, 518, 363, 479, 56, 882, 88, 70, 453, 585]
						]
					},
					xAxis: { type: 'category' },
					yAxis: { gridIndex: 0 },
					grid: { top: '55%' },
					series: [
						{ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
						{ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
						{ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
						{ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
						{
							type: 'pie',
							id: 'pie',
							radius: '30%',
							center: ['50%', '30%'],
							emphasis: { focus: 'data' },
							label: {
								formatter: '{b}: {01} ({d}%)'
							},
							encode: {
								itemName: 'product',
								value: '01',
								tooltip: '01'
							}
						}
					]
				};

				myChart.on('updateAxisPointer', function(event) {
					var xAxisInfo = event.axesInfo[0];
					if (xAxisInfo) {
						var dimension = xAxisInfo.value + 1;
						myChart.setOption({
							series: {
								id: 'pie',
								label: {
									formatter: '{b}: {@[' + dimension + ']} ({d}%)'
								},
								encode: {
									value: dimension,
									tooltip: dimension
								}
							}
						});
					}
				});

				myChart.setOption(option);
			});

			option && myChart.setOption(option);
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.jdsms-box {
	width: 100%;
	height: 100%;
	min-width: 1920px;
	min-height: 937px;
	display: flex;
	justify-content: flex;
	.ban-user-select();
	.jdsms-left {
		width: 70%;
		height: 100%;
	}
	.jdsms-right {
		width: 30%;
		height: 100%;
		.jdsms-right-btnbox {
			padding: 40px 70px 30px 0;
			.jdsms-right-btn-date {
				margin-right: 20px;
			}
			.jdsms-right-btn-search {
			}
			.jdsms-right-btn-add {
				float: right;
			}
		}
		.jdsms-right-table {
			height: calc(100% - 130px);
			padding: 0 40px 0 0;
			.jdsms-right-pagination {
				margin-top: 20px;
			}
		}
	}
	.form-input {
		width: calc(~'100% - 120px');
		margin-right: 20px;
	}
	.form-input-name {
		width: 20%;
	}
	.form-input-sex {
		width: 20%;
	}
	.form-input-birth {
		width: 20%;
	}
	.form-input-phone {
		width: 20%;
	}
}
</style>