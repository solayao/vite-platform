<template>
  <div class="postman-wrapper">
    <div class="postman-top-wrapper">
      <el-input v-model="inputUrl" placeholder="请输入请求地址">
        <template #prepend>
          <el-select
            v-model="inputSelect"
            placeholder="请求类型"
            style="width: 110px"
          >
            <template v-for="it in inputSelectItems" :key="it">
              <el-option :label="it" :value="it"></el-option>
            </template>
          </el-select>
        </template>
      </el-input>

      <el-button style="margin-left: 10px">发送</el-button>

      <el-button>保存</el-button>
    </div>

    <div class="postman-middle-wrapper">
      <el-tabs v-model="tabValue" class="postman-tabs-wrapper">
        <el-tab-pane label="Headers" name="Headers">
          <custom-table
            :data="valList4Headers"
            :columnConfigs="tableColumns4Headers"
            :actionAble="true"
            :border="true"
            :dataVal="JSON.stringify(valList4Headers)"
          >
            <!-- scope: { row, column, $index } -->
            <template v-slot:columnkey="{ scope }">
              <el-autocomplete
                v-model="valList4Headers[scope.$index]['key']"
                :fetch-suggestions="queryHeadersKey"
                style="width: 100%"
              />
            </template>
            <template v-slot:columnvalue="{ scope }">
              <el-input
                v-model="valList4Headers[scope.$index]['value']"
              ></el-input>
            </template>
            <template v-slot:columndesc="{ scope }">
              <el-input
                v-model="valList4Headers[scope.$index]['desc']"
              ></el-input>
            </template>
            <template v-slot:columnaction="{ scope }">
              <el-button
                :disabled="
                  !checkItemIsNotEmpty4Headers(valList4Headers[scope.$index])
                "
                type="text"
                @click="deleteListByIndex4Headers(scope.$index)"
                >删除</el-button
              >
            </template>
          </custom-table>
        </el-tab-pane>

        <el-tab-pane label="Params" name="Params">
          <custom-table
            :data="valList4Params"
            :columnConfigs="tableColumns4Headers"
            :actionAble="true"
            :border="true"
            :dataVal="JSON.stringify(valList4Params)"
          >
            <!-- scope: { row, column, $index } -->
            <template v-slot:columnkey="{ scope }">
              <el-input
                v-model="valList4Params[scope.$index]['key']"
              ></el-input>
            </template>
            <template v-slot:columnvalue="{ scope }">
              <el-input
                v-model="valList4Params[scope.$index]['value']"
              ></el-input>
            </template>
            <template v-slot:columndesc="{ scope }">
              <el-input
                v-model="valList4Params[scope.$index]['desc']"
              ></el-input>
            </template>
            <template v-slot:columnaction="{ scope }">
              <el-button
                :disabled="
                  !checkItemIsNotEmpty4Params(valList4Params[scope.$index])
                "
                type="text"
                @click="deleteListByIndex4Params(scope.$index)"
                >删除</el-button
              >
            </template>
          </custom-table>
        </el-tab-pane>

        <el-tab-pane label="Body" name="Body">
          <div class="postman-bodytype-wrapper">
            <el-radio-group v-model="bodyType">
              <template v-for="it in bodyTypeList" :key="it">
                <el-radio :label="it">{{ it }}</el-radio>
              </template>
            </el-radio-group>
          </div>

          <keep-alive>
            <template v-if="bodyType == bodyTypeList[0]">
              <!-- form-data -->
              <custom-table
                :data="valList4Body1"
                :columnConfigs="tableColumns4Headers"
                :actionAble="true"
                :border="true"
                :dataVal="JSON.stringify(valList4Body1)"
                :actionColumnConfig="{ width: 100 }"
              >
                <template v-slot:columnkey="{ scope }">
                  <el-input
                    v-model="valList4Body1[scope.$index]['key']"
                  ></el-input>
                </template>
                <template v-slot:columnvalue="{ scope }">
                  <template
                    v-if="bodyFormdataItemType[scope.row._id] == 'file'"
                  >
                    <el-button
                      type="primary"
                      @click="handleOpenSelectFile(scope.$index)"
                      >选择文件</el-button
                    >{{
                      valList4Body1[scope.$index]["value"] &&
                      valList4Body1[scope.$index]["value"]["name"]
                    }}
                  </template>
                  <template v-else>
                    <el-input
                      v-model="valList4Body1[scope.$index]['value']"
                    ></el-input>
                  </template>
                </template>
                <template v-slot:columndesc="{ scope }">
                  <el-input
                    v-model="valList4Body1[scope.$index]['desc']"
                  ></el-input>
                </template>
                <template v-slot:columnaction="{ scope }">
                  <el-button
                    type="text"
                    @click="changeBodyFormdataItemType(scope)"
                    >{{
                      bodyFormdataItemType[scope.row._id] == "file"
                        ? "File"
                        : "Text"
                    }}</el-button
                  >
                  <el-button
                    :disabled="
                      !checkItemIsNotEmpty4Body1(valList4Body1[scope.$index])
                    "
                    type="text"
                    @click="
                      () => {
                        delete bodyFormdataItemType[scope.row._id];
                        deleteListByIndex4Body1(scope.$index);
                      }
                    "
                    >删除</el-button
                  >
                </template>
              </custom-table>
            </template>

            <template v-else-if="bodyType == bodyTypeList[1]">
              <!-- x-www-form-urlencoded -->
              <custom-table
                :data="valList4Body2"
                :columnConfigs="tableColumns4Headers"
                :actionAble="true"
                :border="true"
                :dataVal="JSON.stringify(valList4Body2)"
              >
                <template v-slot:columnkey="{ scope }">
                  <el-input
                    v-model="valList4Body2[scope.$index]['key']"
                  ></el-input>
                </template>
                <template v-slot:columnvalue="{ scope }">
                  <el-input
                    v-model="valList4Body2[scope.$index]['value']"
                  ></el-input>
                </template>
                <template v-slot:columndesc="{ scope }">
                  <el-input
                    v-model="valList4Body2[scope.$index]['desc']"
                  ></el-input>
                </template>
                <template v-slot:columnaction="{ scope }">
                  <el-button
                    :disabled="
                      !checkItemIsNotEmpty4Body2(valList4Body2[scope.$index])
                    "
                    type="text"
                    @click="deleteListByIndex4Body2(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </custom-table>
            </template>

            <template v-else-if="bodyType == bodyTypeList[2]">
              <!-- raw -->
              <monaco-editor
                :code="JSON.stringify(rawJson)"
                :layout="{ width: 600, height: 600 }"
                :onChange="handleInputRaw"
              ></monaco-editor>
            </template>

            <template v-else-if="bodyType == bodyTypeList[3]">
              <!-- binary -->
              <div>
                <el-button type="primary" @click="handleOpenSelectFile(-1)"
                  >选择文件</el-button
                >{{ binaryFile && binaryFile["name"] }}
              </div>
            </template>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>

      <!-- 给这个input 设置样式隐藏，切忌不可用display控制隐藏,可能不能跨浏览器 -->
      <input
        type="file"
        id="file"
        style="filter: alpha(opacity=0); opacity: 0; width: 0; height: 0"
        @change="hanldeSelectFile"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import qs from "qs";
import {
  default as CustomTable,
  TableColumnCtx,
} from "@/components/common-wrapper/Table.vue";
import func4postmanTable from "@/setups/postmanTable";
import MonacoEditor from "@/components/monaco-editor/MonacoEditor";

export default defineComponent({
  name: "Postman",
  components: { CustomTable, MonacoEditor },
  data() {
    return {
      inputUrl: "",
      inputSelect: "",
      inputSelectItems: ["Get", "Post", "Put"],

      tabValue: "Headers",
      tabItems: ["Headers", "Params", "Body"],

      bodyType: "form-data",
      bodyTypeList: ["form-data", "x-www-form-urlencoded", "raw", "binary"],
      bodyFormdataItemType: {} as { [key: number]: string },
      selectFileRowIndex: -1,
      rawJson: {},
      binaryFile: null as any,
    };
  },
  computed: {
    requestHeadersParamsDefault(): { [key: string]: string } {
      const obj = {
        "form-data": "multipart/form-data",
        "x-www-form-urlencoded": "application/x-www-form-urlencoded",
        raw: "application/json",
        binary: "application/octet-stream",
      } as { [key: string]: string };
      return {
        "Content-Type": obj[this.bodyType],
      };
    },
    requestHeadersParams(): { [key: string]: string } {
      return this.valList4Headers.reduce((total, current) => {
        if (current.key) {
          total[current.key] = current.value;
        }
        return total;
      }, {});
    },
    requestParamsParams(): { [key: string]: string } {
      return this.valList4Params.reduce((total, current) => {
        if (current.key) {
          total[current.key] = current.value;
        }
        return total;
      }, {});
    },
    requestBodyFormdataParams() {
      const formData = new FormData();
      this.valList4Body1.forEach((param) => {
        param.key && formData.append(param.key, param.value);
      });
      return formData;
    },
    requestBodyXwwwformParams(): { [key: string]: string } {
      const obj = this.valList4Body2.reduce((total, current) => {
        if (current.key) {
          total[current.key] = current.value;
        }
        return total;
      }, {});
      return qs.stringify(obj);
    },
    requestBody(): any {
      const obj = {
        "form-data": this.requestBodyFormdataParams,
        "x-www-form-urlencoded": this.requestBodyXwwwformParams,
        raw: this.rawJson,
        binary: this.binaryFile,
      };
      return obj[this.bodyType];
    },
    requestParams(): { [key: string]: any } {
      return {
        url: this.inputUrl,
        method: this.inputSelect.toLowerCase(),
        baseURL: "",
        headers: {
          ...this.requestHeadersParamsDefault,
          ...this.requestHeadersParams,
        },
        params: this.requestParamsParams,
        body: this.requestBody,
      };
    },
  },
  watch: {
    requestParams(newVal) {
      console.log(newVal);
    },
  },
  setup(props, context) {
    const tableColumns = [
      { prop: "key", label: "Key" },
      { prop: "value", label: "Value" },
      { prop: "desc", label: "Description" },
    ] as TableColumnCtx<any>[];

    const {
      valList: valList4Headers,
      deleteListByIndex: deleteListByIndex4Headers,
      checkItemIsNotEmpty: checkItemIsNotEmpty4Headers,
    } = func4postmanTable(tableColumns.map((it) => it.prop));
    const {
      valList: valList4Params,
      deleteListByIndex: deleteListByIndex4Params,
      checkItemIsNotEmpty: checkItemIsNotEmpty4Params,
    } = func4postmanTable(tableColumns.map((it) => it.prop));
    const {
      valList: valList4Body1,
      deleteListByIndex: deleteListByIndex4Body1,
      checkItemIsNotEmpty: checkItemIsNotEmpty4Body1,
    } = func4postmanTable(tableColumns.map((it) => it.prop));
    const {
      valList: valList4Body2,
      deleteListByIndex: deleteListByIndex4Body2,
      checkItemIsNotEmpty: checkItemIsNotEmpty4Body2,
    } = func4postmanTable(tableColumns.map((it) => it.prop));

    return {
      tableColumns4Headers: tableColumns,

      valList4Headers,
      deleteListByIndex4Headers,
      checkItemIsNotEmpty4Headers,
      valList4Params,
      deleteListByIndex4Params,
      checkItemIsNotEmpty4Params,
      valList4Body1,
      deleteListByIndex4Body1,
      checkItemIsNotEmpty4Body1,
      valList4Body2,
      deleteListByIndex4Body2,
      checkItemIsNotEmpty4Body2,
    };
  },
  methods: {
    queryHeadersKey(
      queryString: string,
      cb: (arg0: { value: string }[]) => void
    ) {
      const queryList = [
        "Accept",
        "Accept-Charset",
        "Accept-Encoding",
        "Accept-Language",
        "Accept-Control-Request-Headers",
        "Accept-Control-Request-Method",
        "Authorization",
        "Cache-Control",
        "Content-MD5",
        "Content-Length",
        "Content-Transfer-Encoding",
        "Content-Type",
        "Cookie",
        "Cookie 2",
        "Date",
        "Expect",
        "From",
        "Host",
        "If-Match",
        "If-Modified-Since",
        "If-None-Match",
        "If-Range",
        "If-Unmodified-Since",
        "Keep-Alive",
        "Max-Forwards",
        "Origin",
        "Pragma",
        "Proxy-Authorization",
        "Range",
        "Referer",
        "TE",
        "Trailer",
        "Transfer-Encoding",
        "Upgrade",
        "User-Agent",
        "Via",
        "Warning",
        "X-Request-With",
        "X-Do-Not-Track",
        "DNT",
        "x-api-key",
        "Connection",
      ].map((value) => ({ value }));
      if (queryString == "") {
        cb(queryList);
      } else {
        const filterList = queryList.filter((it) =>
          it.value.toLowerCase().includes(queryString.toLowerCase())
        );
        cb(filterList);
      }
    },
    changeBodyFormdataItemType(scope: { row: { value: any; _id: any } }) {
      scope.row.value = "";
      this.bodyFormdataItemType[scope.row._id] =
        this.bodyFormdataItemType[scope.row._id] == "file" ? "text" : "file";
    },
    handleOpenSelectFile(index: number) {
      this.selectFileRowIndex = index;
      const fileNode = document.getElementById("file");
      if (fileNode) {
        fileNode.click();
      }
    },
    hanldeSelectFile(event: any) {
      // console.log(event.target.files[0]);
      if (this.selectFileRowIndex > -1) {
        this.valList4Body1[this.selectFileRowIndex].value =
          event.target.files[0];
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          // console.log(reader.result)
          this.binaryFile = reader.result;
        };
      }
    },
    handleInputRaw(code) {
      try {
        const jsonCode = code ? JSON.parse(code) : {};
        this.rawJson = jsonCode;
      } catch (err) {}
    },
  },
});
</script>

<style lang="less" scoped>
.postman-wrapper {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .postman-top-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .postman-middle-wrapper {
    width: 100%;
  }

  .postman-bodytype-wrapper {
    width: 100%;
    text-align: left;
  }
}
</style>
