<template>
  <div class="admin-user-wrap">
    <Table :data="userInfoList" border style="width: 100%">
      <TableColumn fixed prop="date" label="用户名" width="150"> </TableColumn>
      <TableColumn prop="name" label="头像" width="50"> </TableColumn>
      <TableColumn prop="province" label="书评" width="100"> </TableColumn>
      <TableColumn prop="city" label="图书收藏" width="120"> </TableColumn>
      <TableColumn prop="zip" label="书评收藏" width="120"> </TableColumn>
      <TableColumn prop="address" label="历史已读" width="300"> </TableColumn>
      <TableColumn fixed="right" label="操作" width="100">
        <Button type="text" size="small">编辑</Button>
        <Button type="text" size="small">删除</Button>
      </TableColumn>
    </Table>
  </div>
</template>

<script lang="ts">
import { IUserInfo } from "@/types/user";
import { Vue, Component } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { Table, TableColumn, Button } from "element-ui";

@Component({
  components: {
    Table,
    TableColumn,
    Button
  }
})
export default class MUser extends Vue {
  @State(state => state.admin.userInfoList) userInfoList!: IUserInfo[];
  @Action("admin/getUserInfo") getUserInfo!: Function;

  private mounted() {
    this.getUserInfo();
  }
}
</script>
