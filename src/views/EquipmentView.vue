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
    // Se for um novo equipamento sem imagem, remova a chave de anexo da capa
    delete equipmentAtual.cover_attachment_key;
  }
  // Se for uma atualização e não houver arquivo novo, mantenha a imagem existente

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
      <label>
        <input type="checkbox" v-model="equipmentAtual.is_on_promotion"> Em Promoção
      </label>
      <button @click="salvar">Salvar Produto</button>
    </div>
    <div class="equipment-list">
      <div v-for="equipment in equipments" :key="equipment.id" class="equipment-card">
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
.page-equipamentos {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
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
  background-color: #f39c12; /* Cor laranja para os botões */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.equipment-form button:hover {
  background-color: #e67e22; /* Cor laranja mais escura no hover */
}

.equipment-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 itens por linha */
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.equipment-card img.equipment-image {
  width: 100%; /* A imagem ocupa toda a largura do card */
  height: auto; /* Mantém as proporções da imagem */
  object-fit: contain; /* Garante que a imagem inteira seja mostrada */
  border-radius: 4px;
  margin-bottom: 15px;
}

.equipment-card h3,
.equipment-card p {
  margin: 0;
  color: #333;
}

.equipment-card p {
  font-size: 0.9em;
}

/* Estilos para o botão de adicionar equipamento */
.add-equipment-button {
  padding: 10px 20px;
  background-color: #f39c12; /* Cor laranja para o botão de adicionar */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-equipment-button:hover {
  background-color: #e67e22; /* Cor laranja mais escura no hover */
}

/* Media queries para responsividade */
@media (max-width: 1200px) {
  .equipment-list {
    grid-template-columns: repeat(3, 1fr); /* 3 itens por linha em telas menores */
  }
}

@media (max-width: 900px) {
  .equipment-list {
    grid-template-columns: repeat(2, 1fr); /* 2 itens por linha em telas ainda menores */
  }
}

@media (max-width: 600px) {
  .equipment-list {
    grid-template-columns: 1fr; /* 1 item por linha em telas pequenas */
  }
}

.promotion-label {
  color: green;
  font-weight: bold;
}
</style>

