<template>
    <div id="el-container-app" class="el-container">
        <div id="el-col-menu" class="el-col">
            <div class="el-nav-top ut-align-right" style="-webkit-app-region: drag">
                <span class="icon ico-unavailable-cloud"></span>
                <span class="icon ico-sorting-options"></span>
            </div>
        </div>
        <div id="el-col-list" class="el-col">
            <div class="el-nav-top" style="-webkit-app-region: drag">
                <el-input
                        placeholder="Search notes"
                        suffix-icon="el-icon-search"
                        v-model="model1">
                </el-input>
                <span class="icon ico-pencil"></span>
            </div>
        </div>
        <div id="el-col-content" class="el-col">
            <div class="el-nav-top" style="-webkit-app-region: drag">

            </div>
        </div>

<!--        <el-row>-->
<!--            <el-col :span="8">-->
<!--                <div class="grid-content bg-purple"></div>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--                <div class="grid-content bg-purple-light"></div>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--                <div class="grid-content bg-purple"></div>-->
<!--            </el-col>-->
<!--        </el-row>-->
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Split from 'split.js';

    @Component
    export default class App extends Vue {
        model1 = '';
        searchValue = '';

        mounted() {
            this.buildSplitPanes();
        }

        private buildSplitPanes()
        {
            Split(['#el-col-menu', '#el-col-list', '#el-col-content'], {
                sizes: [20, 30, 50],
                minSize: [150, 195],
                snapOffset: 0,
                gutterSize: 1
            });
        }
    }
</script>

<style lang="scss">
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
