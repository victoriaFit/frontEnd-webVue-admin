<template>
  <div class="page-equipamentos">
    <input type="text" v-model="searchQuery" placeholder="Pesquisar equipamento" @input="filterEquipments" class="search-input">
    <div class="equipment-form">
      <input type="text" v-model="equipmentAtual.name" placeholder="Nome do produto" class="form-input">
      <textarea v-model="equipmentAtual.description" placeholder="Descrição do produto" class="form-textarea"></textarea>
      <input type="file" @change="onFileChange" class="file-input" id="file-input" accept="image/*">
      <label for="file-input" class="file-input-label">Selecionar imagem</label>
      <img v-if="coverUrl" :src="coverUrl" alt="Preview" class="equipment-image">
      <div class="promotion-section">
        <input type="checkbox" v-model="equipmentAtual.is_on_promotion" id="promo-toggle" class="promo-toggle">
        <label for="promo-toggle" class="toggle-label" id="text-toggle">Promoção</label>
      </div>
      <button @click="salvar" class="save-button">Salvar Produto</button>
    </div>
    <div class="equipment-list">
      <div v-for="equipment in filteredEquipments" :key="equipment.id" class="equipment-card">
        <img class="equipment-image" :src="equipment.cover?.url" :alt="equipment.name" />
        <h3>{{ equipment.name }}</h3>
        <p>{{ equipment.description }}</p>
        <p v-if="equipment.is_on_promotion" class="promotion-flag">Promoção!</p>
        <button @click="carregarEquipmentParaEditar(equipment.id)" class="edit-button">Editar</button>
        <button @click="() => excluirEquipment(equipment.id)" class="delete-button">Excluir</button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import EquipmentApi from "@/api/equipment.js"
import ImageService from "@/api/imageService.js"

const equipments = ref([])
const coverUrl = ref('')
const file = ref(null)
const searchQuery = ref('')
const equipmentAtual = reactive({
  id: '',
  name: '',
  description: '',
  cover_attachment_key: null,
  is_on_promotion: false,
})

const filteredEquipments = computed(() => {
  return equipments.value.filter(equipment =>
    equipment.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function onFileChange(e) {
  file.value = e.target.files[0]
  coverUrl.value = file.value ? URL.createObjectURL(file.value) : '';
}

async function carregarEquipmentParaEditar(equipmentId) {
  const equipment = equipments.value.find(e => e.id === equipmentId);
  if (equipment) {
    equipmentAtual.id = equipment.id;
    equipmentAtual.name = equipment.name;
    equipmentAtual.description = equipment.description;
    equipmentAtual.cover_attachment_key = equipment.cover?.attachment_key;
    equipmentAtual.is_on_promotion = equipment.is_on_promotion;
    coverUrl.value = equipment.cover?.url || '';
  }
}

async function salvar() {
  if (file.value) {
    const imageResponse = await ImageService.uploadImage(file.value);
    equipmentAtual.cover_attachment_key = imageResponse.attachment_key;
  } else if (!equipmentAtual.id) {
    delete equipmentAtual.cover_attachment_key;
  }

  await EquipmentApi.adicionarEquipment(equipmentAtual);
  resetForm();
  equipments.value = await EquipmentApi.buscarTodosOsEquipments();
}

async function excluirEquipment(equipmentId) {
  await EquipmentApi.excluirEquipment(equipmentId);
  equipments.value = await EquipmentApi.buscarTodosOsEquipments();
}

function resetForm() {
  Object.assign(equipmentAtual, {
    id: '',
    name: '',
    description: '',
    cover_attachment_key: null,
    is_on_promotion: false
  });
  coverUrl.value = '';
  file.value = null;
}

onMounted(async () => {
  equipments.value = await EquipmentApi.buscarTodosOsEquipments()
})
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

label {
margin-left: 10px;
}

.page-equipamentos {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

.search-input,
.form-input,
.form-textarea,
.file-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.file-input {
  display: none;
}

.file-input-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #FB5F21;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-top: 10px;
}

.file-input-label:hover {
  background-color: darken(#FB5F21, 10%);
}

.equipment-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.promo-toggle {
  display: none;
}

.toggle-label {
  display: inline-block;
  width: 50px;
  height: 25px;
  background-color: #ccc;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
}

.promo-toggle:checked + .toggle-label {
  background-color: #FB5F21;
}

.toggle-label::after {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2.5px;
  left: 5px;
  transition: 0.2s;
}

.promo-toggle:checked + .toggle-label::after {
  left: 25px;
}

.text-toggle {
  margin-left: 20px;
}

.save-button,
.edit-button,
.delete-button {
  padding: 10px 20px;
  background-color: #FB5F21;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-top: 10px;
}

.save-button:hover,
.edit-button:hover,
.delete-button:hover {
  background-color: darken(#FB5F21, 10%);
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
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 340px;
}

.equipment-card img.equipment-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}

.equipment-card h3,
.equipment-card p {
  margin: 0;
  color: #333;
}

.promotion-flag {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}

@media (max-width: 900px) {
  .equipment-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .equipment-list {
    grid-template-columns: 1fr;
  }
}
</style>
