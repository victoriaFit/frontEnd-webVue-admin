<script setup>
import { ref, onMounted } from 'vue'
import EquipmentApi from '@/api/equipment'

const equipments = ref([])

onMounted(async () => {
  equipments.value = await EquipmentApi.buscarTodosOsEquipments()
})
</script>

<template>
  <div class="container">
    <div v-for="equipment in equipments" :key="equipment.id" class="card">
      <img :src="equipment.cover?.url" :alt="equipment.name" />
      <div>
        <h3>{{ equipment.name }}</h3>
        <p>{{ equipment.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.card {
  width: 200px;
  height: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
