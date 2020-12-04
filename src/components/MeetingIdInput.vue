<template>
  <div>
    <p>
      Please enter Zoom Meeting Id:
    </p>
    <el-input
      v-validate="'required|numeric'"
      placeholder="Meeting Id"
      v-model="id"
      id="id"
      name="id"
      clearable
      data-lpignore="true"
      @input="validateField"
    ></el-input>
    <p v-if="errors.first('id')" class="error">{{ errors.first('id') }}</p>
  </div>
</template>

<script>
export default {
  props: {
    currentId: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      id: this.currentId,
    };
  },
  methods: {
    validateField() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$emit('change', this.id);
        } else {
          this.$emit('change', null);
        }
      });
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 230px;
}
p {
  margin: 40px 0;
}
.error {
  margin: 15px 0 0;
  font-size: 14px;
  color: #d81219;
}
</style>
