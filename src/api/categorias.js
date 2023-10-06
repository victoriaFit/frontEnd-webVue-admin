import api from '../plugins/api'

class CategoriaApi {

  async buscarTodasAsCategorias() {
    const response = await api.get('/categoria/')
    return response.data
  }
  async adicionarCategoria(categoria) {
    let response
    if (categoria.id){
      response = await api.put(`/categoria/${categoria.id}/`, genre)
    } else {
      response = await api.post('/categoria/', categoria)
    }
  }
  async excluirCategoria(categoria) {
    const response = await api.delete(`/categoria/${categoria.id}/`);
    return response.data;
  }
}

export default new CategoriaApi()