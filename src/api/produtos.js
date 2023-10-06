// import axios from 'axios';
import api from '../plugins/api'

class ProdutoApi {

  async buscarTodosOsProdutos() {
    const response = await api.get('/produto/')
    return response.data

    // const { data } = await axios.get('/produto/');
    // return data;
  }
  async adicionarProduto(produto) {
    let response
    if (produto.id){
      response = await api.put(`/produto/${produto.id}/`, genre)
    } else {
      response = await api.post('/produto/', produto)
    }
    // const { data } = await axios.post('/produto/', produto);
    // return data;
  }
  // async atualizarProduto(produto) {
  //   const { data } = await axios.put(`/produto/${produto.id}/`, produto);
  //   return data;
  // }
  async excluirProduto(produto) {
    const response = await api.delete(`/produto/${produto.id}/`);
    return response.data;
  }
}

export default new ProdutoApi()