import api from '../plugins/api'

class EquipmentApi {
  async buscarTodosOsEquipments() {
    const response = await api.get('/equipments/')
    return response.data
  }

  async adicionarEquipment(equipment) {
    const formData = new FormData()
    for (const key in equipment) {
      formData.append(key, equipment[key])
    }
    let response
    if (equipment.id) {
      response = await api.put(`/equipments/${equipment.id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      })
    } else {
        response = await api.post('/equipments/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
      return response.data
  }

    async excluirEquipment(equipmentId) {
      const response = await api.delete(`/equipments/${equipmentId}/`)
        return response.data
  }
}

export default new EquipmentApi()
