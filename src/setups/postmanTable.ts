import { toRefs, reactive, computed, watch, watchEffect } from "vue";

interface KeyObject {
  _id: string,
  [key: string]: any
}

export default (keyList: string[]) => {
  const data = reactive({
    valList: [] as Array<KeyObject>,
  });
  const isValListEveryItemNotEmpty = computed(() => {
    return data.valList.every((it) => {
      return checkItemIsNotEmpty(it);
    });
  });

  const checkItemIsNotEmpty = (it: KeyObject) => keyList.some((key) => it[key] != '');
  const addListByEmptyItem = () => {
    const emptyItem: KeyObject = keyList.reduce(
      (total, current) => {
        return Object.assign({}, total, { [current]: '' });
      },
      {
        _id: `${new Date().valueOf()}_${parseInt(Math.random() * 100 + '', 10)}`,
      }
    );
    data.valList.push(emptyItem);
  };
  const deleteListByIndex = (index: number) => {
    data.valList.length > index &&
      data.valList.splice(index, 1);
  };

  watchEffect(() => {
    if (!data.valList.length) {
      addListByEmptyItem();
    }
  });
  watch(
    () => isValListEveryItemNotEmpty.value,
    (newVal, oldVal) => {
      if (newVal !== oldVal && newVal) {
        addListByEmptyItem();
      }
    }
  );

  return {
    ...toRefs(data),
    checkItemIsNotEmpty,
    deleteListByIndex,
  };
};