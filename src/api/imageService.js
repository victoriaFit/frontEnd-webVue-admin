// src/api/imageService.js
import api from '../plugins/api'

class ImageService {
  async uploadImage(file) {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post('/api/media/images/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export default new ImageService()
