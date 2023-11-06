<script setup>
import { ref, reactive, onMounted } from 'vue'
import EquipmentApi from "@/api/equipment.js"
import ImageService from "@/api/imageService.js"

const equipments = ref([])
const coverUrl = ref('')
const file = ref(null)
const equipmentAtual = reactive({
  name: '',
  description: '',
  cover_attachment_key: null, // Alterado de 'image' para 'cover_attachment_key'
})

function onFileChange(e) {
  file.value = e.target.files[0]
  coverUrl.value = URL.createObjectURL(file.value)
}

async function salvar() {
  if (file.value) {
    const imageResponse = await ImageService.uploadImage(file.value);
    equipmentAtual.cover_attachment_key = imageResponse.attachment_key; // Ajuste aqui
  }
  await EquipmentApi.adicionarEquipment(equipmentAtual);
  Object.assign(equipmentAtual, {
    id: '',
    name: '',
    description: '',
    cover_attachment_key: null // Alterado de 'image' para 'cover_attachment_key'
  });
  coverUrl.value = '';
  file.value = null;
  // Atualizar a lista de equipamentos
  equipments.value = await EquipmentApi.buscarTodosOsEquipments();
}

onMounted(async () => {
  equipments.value = await EquipmentApi.buscarTodosOsEquipments()
})
</script>

<template>
  <div>
    <h1>Equipamentos</h1>
    <input type="file" @change="onFileChange">
    <img v-if="coverUrl" :src="coverUrl" alt="Preview">
    <input type="text" v-model="equipmentAtual.name" placeholder="Nome do equipamento">
    <textarea v-model="equipmentAtual.description" placeholder="Descrição do equipamento"></textarea>
    <button @click="salvar">Salvar Equipamento</button>
    <div v-for="equipment in equipments" :key="equipment.id">
      <!-- Alterado de 'equipment.image?.url' para 'equipment.cover?.url' -->
      <img :src="equipment.cover?.url" :alt="equipment.name" />
      <h3>{{ equipment.name }}</h3>
      <p>{{ equipment.description }}</p>
      <button @click="() => EquipmentApi.excluirEquipment(equipment.id)">Excluir</button>
    </div>
  </div>
</template>

<style scoped>
.page-equipamentos {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.equipment-form {
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
}

.equipment-form input,
.equipment-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.equipment-form button {
  padding: 10px 20px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.equipment-form button:hover {
  background-color: #4cae4c;
}

.equipment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.equipment-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  width: calc(33.333% - 20px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.equipment-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .equipment-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .equipment-card {
    width: 100%;
  }
}
</style>
