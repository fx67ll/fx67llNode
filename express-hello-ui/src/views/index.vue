<template>
	<div class="jdsms-box">
		<div class="jdsms-right-btnbox">
			<el-select v-model="dateType" placeholder="请选择查询方式" class="jdsms-right-btn-select" @change="dateTypeChange()">
				<el-option label="月查询" :value="0"></el-option>
				<el-option label="日查询" :value="1"></el-option>
				<el-option label="自定义" :value="2"></el-option>
			</el-select>
			<el-date-picker
				v-if="dateType === 0"
				v-model="month"
				type="month"
				value-format="yyyy-MM"
				placeholder="请选择月份"
				class="jdsms-right-btn-date"
				@change="monthChange()"
			></el-date-picker>
			<el-date-picker
				v-if="dateType === 1"
				v-model="date"
				type="date"
				value-format="yyyy-MM-dd"
				placeholder="请选择日期"
				class="jdsms-right-btn-date"
				@change="dateChange()"
			></el-date-picker>
			<el-date-picker
				v-if="dateType === 2"
				v-model="time"
				type="daterange"
				align="right"
				unlink-panels
				range-separator="-"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				:picker-options="pickerOptions"
				value-format="yyyy-MM-dd"
				class="jdsms-right-btn-date"
				@change="timeChange()"
			></el-date-picker>
			<el-button type="primary" icon="el-icon-search" class="jdsms-right-btn-search" @click="handleSearch">查询满18周岁的人</el-button>
			<el-button type="primary" class="jdsms-right-btn-add" @click="handleAdd">
				添加
				<i class="el-icon-upload el-icon--right"></i>
			</el-button>
		</div>
		<div class="jdsms-right-table">
			<el-table :data="tableData" style="width: 100%" :max-height="tableHeight" v-loading="loading">
				<el-table-column type="index" label="序号" width="180"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column label="性別">
					<template slot-scope="scope">
						<span v-show="scope.row.sex === true">男</span>
						<span v-show="scope.row.sex === false">女</span>
					</template>
				</el-table-column>
				<el-table-column prop="birth" label="出生日期"></el-table-column>
				<el-table-column prop="phone" label="联系方式"></el-table-column>
				<el-table-column prop="bro" label="家人"></el-table-column>
				<el-table-column prop="createTime" label="创建日期"></el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template slot-scope="scope">
						<el-button @click.native.prevent="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
						<!-- <el-button @click.native.prevent="handleCheck(scope.row)" type="text" size="small">表示</el-button> -->
						<el-button @click.native.prevent="handleDelete(scope.row)" type="text" size="small" style="color: red;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryParams.pageIndex"
				:page-sizes="[10, 20, 30, 40, 50]"
				:page-size="10"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				class="jdsms-right-pagination"
			></el-pagination>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="25%" :before-close="handleClose" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="姓名" prop="name"><el-input v-model="form.name" placeholder="请输入姓名" class="form-item"></el-input></el-form-item>
				<el-form-item label="性別" prop="sex">
					<el-select v-model="form.sex" :clearable="true" placeholder="请选择性别" class="form-item">
						<el-option label="男" :value="true"></el-option>
						<el-option label="女" :value="false"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出生日期" prop="birth">
					<el-date-picker v-model="form.birth" value-format="yyyy-MM-dd" type="date" placeholder="请选择出生日期" class="form-item"></el-date-picker>
				</el-form-item>
				<el-form-item label="联系方式" prop="phone"><el-input v-model="form.phone" placeholder="请输入联系方式" class="form-item"></el-input></el-form-item>
				<el-form-item label="家人" prop="bro"><el-input v-model="form.bro" placeholder="请输入家人" class="form-item"></el-input></el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleCancel()">取消</el-button>
				<el-button type="primary" @click="submitForm()">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { listStudent, getStudent, addStudent, updateStudent, delStudent } from '@api/student.js';
import moment from 'moment';
import _ from 'underscore';
export default {
	name: 'index',
	data() {
		return {
			// 表单
			form: {
				_id: null,
				name: null,
				sex: null,
				birth: null,
				phone: null,
				bro: null
			},
			// 表单校验
			rules: {
				name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
				sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
				birth: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
				phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
				bro: [{ required: true, message: '请输入家人', trigger: 'blur' }]
			},
			// 查询类型
			dateType: 0,
			// 查询月份
			// month: moment().format('YYYY-MM'),
			month: '',
			// 查询日期
			date: '',
			// 查询日期间隔
			time: [],
			// 日期控件快捷选择
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}
				]
			},
			// 表格动态最大高度
			tableHeight: document.body.clientHeight - 210,
			// 表格数据
			tableData: [],
			// 列表查询参数
			queryParams: {
				// 当前页
				pageIndex: 1,
				// 页数
				pageSize: 10,
				// 按时间查询，18年前的当前月开始和结束时间
				// startTime: moment()
				// 	.subtract(18, 'years')
				// 	.startOf('month')
				// 	.format('YYYY-MM-DD'),
				// endTime: moment()
				// 	.subtract(18, 'years')
				// 	.endOf('month')
				// 	.format('YYYY-MM-DD')
				startTime: '',
				endTime: ''
			},
			// 当前数据总量
			total: 0,
			// 是否隐藏弹窗
			dialogVisible: false,
			// 弹窗标题
			dialogTitle: '弹窗',
			// 列表刷新状态
			loading: false
		};
	},
	mounted() {
		// this.initTableData();
		this.getList();
	},
	methods: {
		// 切换查询类型
		dateTypeChange() {
			this.month = '';
			this.date = '';
			this.time = [];
			this.queryParams.startTime = '';
			this.queryParams.endTime = '';
		},
		timeChange() {
			if (this.time) {
				this.queryParams.startTime = moment(this.time[0])
					.subtract(18, 'years')
					.format('YYYY-MM-DD');
				this.queryParams.endTime = moment(this.time[1])
					.subtract(18, 'years')
					.format('YYYY-MM-DD');
			} else {
				this.queryParams.startTime = '';
				this.queryParams.endTime = '';
			}
		},
		dateChange() {
			if (this.date) {
				this.queryParams.startTime = moment(this.date)
					.subtract(18, 'years')
					.format('YYYY-MM-DD');
				this.queryParams.endTime = moment(this.date)
					.subtract(18, 'years')
					.format('YYYY-MM-DD');
			} else {
				this.queryParams.startTime = '';
				this.queryParams.endTime = '';
			}
		},
		// 月份选择的时候获取18年前的当前月开始和结束时间
		monthChange() {
			if (this.month) {
				this.queryParams.startTime = moment(this.month)
					.subtract(18, 'years')
					.startOf('month')
					.format('YYYY-MM-DD');
				this.queryParams.endTime = moment(this.month)
					.subtract(18, 'years')
					.endOf('month')
					.format('YYYY-MM-DD');
			} else {
				this.queryParams.startTime = '';
				this.queryParams.endTime = '';
			}
		},
		// 获取表格数据
		getList() {
			this.loading = true;
			listStudent(this.queryParams).then(res => {
				_.each(res.data, function(item, key) {
					item.birth = moment(item.birth).format('YYYY-MM-DD');
					item.createTime = moment(item.createTime).format('YYYY-MM-DD');
				});
				this.tableData = res.data;
				this.total = res.total;
				this.loading = false;
			});
		},
		// 拦截关闭弹窗事件
		handleClose(done) {
			done();
		},
		// 每页条数改变
		handleSizeChange(val) {
			this.queryParams.pageSize = val;
			this.queryParams.pageIndex = 1;
			this.getList();
		},
		// 当前页改变
		handleCurrentChange(val) {
			this.queryParams.pageIndex = val;
			this.getList();
		},
		// 查询
		handleSearch() {
			// this.$message.info('機能開発中');
			this.getList();
		},
		// 新增
		handleAdd() {
			this.dialogTitle = '添加';
			this.clearForm();
			this.dialogVisible = true;
		},
		// 编辑
		handleEdit(row) {
			this.dialogTitle = '编辑';
			this.form = row;
			this.dialogVisible = true;
		},
		// 查看，暂时不需要
		handleCheck() {
			this.dialogTitle = '查看';
			// this.dialogVisible = true;
		},
		// 清空表单
		clearForm() {
			this.$nextTick(() => {
				this.form = {
					_id: null,
					name: null,
					sex: null,
					birth: null,
					phone: null,
					bro: null
				};
				this.$refs.form.resetFields();
			});
		},
		// 取消按钮
		handleCancel() {
			this.clearForm();
			this.dialogVisible = false;
		},
		// 提交表单
		submitForm() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					if (this.form._id != undefined) {
						updateStudent(this.form).then(res => {
							this.clearForm();
							this.dialogVisible = false;
							this.msgOK(res.msg);
							this.getList();
						});
					} else {
						addStudent(this.form).then(res => {
							this.clearForm();
							this.dialogVisible = false;
							this.msgOK(res.msg);
							this.getList();
						});
					}
				}
			});
		},
		// 删除
		handleDelete(row) {
			this.$confirm('删除操作不可逆，确定删除吗?', '删除', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(function() {
					return delStudent(row._id);
				})
				.then(() => {
					this.getList();
					this.msgOK('删除成功!');
				});
		},
		// 表格数据初始化
		initTableData() {
			if (this.tableData.length < 100) {
				this.tableData.push({
					name: '安倍晋三',
					sex: '男',
					birth: '2021-03-23',
					phone: '18902380987',
					email: '23456@qq.com',
					bro: '安倍晋六'
				});
				this.initTableData();
			}
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.jdsms-box {
	width: 100%;
	height: 100%;
	.ban-user-select();
	.jdsms-right-btnbox {
		padding: 30px 40px 30px 40px;
		.jdsms-right-btn-select {
			margin-right: 20px;
		}
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
		padding: 0 40px 0 40px;
		.jdsms-right-pagination {
			margin-top: 40px;
		}
	}
	.form-item {
		width: 85%;
	}
}
</style>
