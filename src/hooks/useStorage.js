import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async (key) => {
    try {
      const item = await AsyncStorage.getItem(key);
      return JSON.parse(item) || [];
    } catch (error) {
      console.error("Erro ao buscar item:", error);
      return [];
    }
  };

  const saveItem = async (key, name, password) => {
    try {
      let items = await getItem(key);
      items.push({ name, password });
      await AsyncStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  };

  const removeItem = async (key, name, password) => {
    try {
      let items = await getItem(key);
      items = items.filter(
        (item) => item.name !== name || item.password !== password
      );
      await AsyncStorage.setItem(key, JSON.stringify(items));
      return items;
    } catch (error) {
      console.error("Erro ao remover item:", error);
      return [];
    }
  };

  const updateItem = async (key, oldName, newName) => {
    try {
      // Recupera os itens armazenados
      let items = await getItem(key);

      // Log para depuração
      console.log("Itens antes da atualização:", items);

      // Atualiza os itens que correspondem ao oldName
      items = items.map((item) =>
        item.name === oldName ? { ...item, name: newName } : item
      );

      // Log para depuração
      console.log("Itens após a atualização:", items);

      // Armazena a lista atualizada de volta no AsyncStorage
      await AsyncStorage.setItem(key, JSON.stringify(items));

      // Retorna a lista atualizada
      return items;
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      return [];
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
    updateItem,
  };
};

export default useStorage;
