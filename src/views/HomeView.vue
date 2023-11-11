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
  is_on_promotion: false,
})

function onFileChange(e) {
  file.value = e.target.files[0]
  coverUrl.value = file.value ? URL.createObjectURL(file.valuee) : '';
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


>


<template>
  <div class="page-equipamentos">
    <h1>Produtos</h1>
    <div class="equipment-form">
      <input type="text" v-model="equipmentAtual.name" placeholder="Nome do produto">
      <textarea v-model="equipmentAtual.description" placeholder="Descrição do produto"></textarea>
      <input type="file" @change="onFileChange">
      <img v-if="coverUrl" :src="coverUrl" alt="Preview" class="equipment-image">
      <div class="promotion-section">
        <label for="promo-checkbox">Promoção</label>
        <input type="checkbox" v-model="equipmentAtual.is_on_promotion" id="promo-checkbox">
      </div>
      <button @click="salvar">Salvar Produto</button>
    </div>
    <div class="equipment-list">
      <div v-for="equipment in equipments" :key="equipment.id" :class="{'equipment-card': true, 'on-promotion': equipment.is_on_promotion}">
        <img class="equipment-image" :src="equipment.cover?.url" :alt="equipment.name" />
        <h3>{{ equipment.name }}</h3>
        <p>{{ equipment.description }}</p>
        <p v-if="equipment.is_on_promotion" class="promotion-label">Em Promoção!</p>
        <button @click="carregarEquipmentParaEditar(equipment.id)">Editar</button>
        <button @click="() => EquipmentApi.excluirEquipment(equipment.id)">Excluir</button>
      </div>
    </div>
  </div>
</template>





<style scoped>
/* Importando a Fonte Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

/* Estilo Principal da Página */
.page-equipamentos {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

/* Estilo do Formulário de Equipamentos */
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
  font-family: 'Poppins', sans-serif;
}

/* Estilo dos Inputs e Textareas */
.equipment-form input,
.equipment-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
}

/* Estilo dos Botões */
.equipment-form button,
.add-equipment-button,
.equipment-card button {
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

.equipment-form button:hover,
.add-equipment-button:hover,
.equipment-card button:hover {
  background-color: darken(#FB5F21, 10%);
}

/* Estilo da Seção de Promoção */
.equipment-form .promotion-section {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Alinha os itens à direita */
  margin-top: 10px;
}

.equipment-form .promotion-section label {
  margin-right: 10px; /* Espaço entre o label e o checkbox */
  font-family: 'Poppins', sans-serif;
  font-size: 1em;
}


/* Estilo da Lista de Equipamentos */
.equipment-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Ajuste para múltiplos cards por linha */
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
}

/* Estilo dos Cards de Equipamentos */
.equipment-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 340px;
}

.equipment-card.on-promotion {
  border-color: #FB5F21;
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
  font-family: 'Poppins', sans-serif;
}

.equipment-card p {
  font-size: 0.9em;
}

.promotion-label {
  color: green;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

/* Media Queries para Responsividade */
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



