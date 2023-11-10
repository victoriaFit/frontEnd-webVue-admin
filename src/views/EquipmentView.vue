<script setup>
import { ref, reactive, onMounted } from 'vue'
import EquipmentApi from "@/api/equipment.js"
import ImageService from "@/api/imageService.js"

const equipments = ref([])
const coverUrl = ref('')
const file = ref(null)
const equipmentAtual = reactive({
  id: '',
  name: '',
  description: '',
  cover_attachment_key: null,
})

function onFileChange(e) {
  file.value = e.target.files[0]
  coverUrl.value = URL.createObjectURL(file.value)
}

async function carregarEquipmentParaEditar(equipmentId) {
  const equipment = equipments.value.find(e => e.id === equipmentId);
  if (equipment) {
    equipmentAtual.id = equipment.id;
    equipmentAtual.name = equipment.name;
    equipmentAtual.description = equipment.description;
    equipmentAtual.cover_attachment_key = equipment.cover_attachment_key;
    coverUrl.value = equipment.cover?.url;
  }
}

async function salvar() {
  if (file.value) {
    const imageResponse = await ImageService.uploadImage(file.value);
    equipmentAtual.cover_attachment_key = imageResponse.attachment_key;
  }
  await EquipmentApi.adicionarEquipment(equipmentAtual);
  resetForm();
  equipments.value = await EquipmentApi.buscarTodosOsEquipments();
}

function resetForm() {
  Object.assign(equipmentAtual, {
    id: '',
    name: '',
    description: '',
    cover_attachment_key: null
  });
  coverUrl.value = '';
  file.value = null;
}

onMounted(async () => {
  equipments.value = await EquipmentApi.buscarTodosOsEquipments()
})


</script>

<template>
  <div class="page-equipamentos">
    <h1>Equipamentos</h1>
    <div class="equipment-form">
      <input type="file" @change="onFileChange">
      <img v-if="coverUrl" :src="coverUrl" alt="Preview" class="equipment-image">
      <input type="text" v-model="equipmentAtual.name" placeholder="Nome do equipamento">
      <textarea v-model="equipmentAtual.description" placeholder="Descrição do equipamento"></textarea>
      <button @click="salvar">Salvar Equipamento</button>
    </div>
    <div class="equipment-list">
      <div v-for="equipment in equipments" :key="equipment.id" class="equipment-card">
        <img class="equipment-image" :src="equipment.cover?.url" :alt="equipment.name" />
        <h3>{{ equipment.name }}</h3>
        <p>{{ equipment.description }}</p>
        <button @click="carregarEquipmentParaEditar(equipment.id)">Editar</button>
        <button @click="() => EquipmentApi.excluirEquipment(equipment.id)">Excluir</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.page-equipamentos {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

.equipment-form {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
}

.equipment-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.equipment-card img.equipment-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}

.equipment-card h3 {
  margin: 0;
  color: #333;
}

.equipment-card p {
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .equipment-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .equipment-list {
    grid-template-columns: 1fr;
  }
}
</style>
