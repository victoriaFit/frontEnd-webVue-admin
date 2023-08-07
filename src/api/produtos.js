import axios from 'axios';
export default class ProdutoApi {
  async buscarTodosOsProdutos() {
    const { data } = await axios.get('/produto/');
    return data;
  }
  async adicionarProduto(produto) {
    const { data } = await axios.post('/produto/', produto);
    return data;
  }
  async atualizarProduto(produto) {
    const { data } = await axios.put(`/produto/${produto.id}/`, produto);
    return data;
  }
  async excluirProduto(id) {
    const { data } = await axios.delete(`/produto/${id}/`);
    return data;
  }
}
