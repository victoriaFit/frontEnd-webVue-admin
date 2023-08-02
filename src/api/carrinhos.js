import axios from 'axios';
export default class CarrinhosApi {
  async buscarTodasOsCarrinhos() {
    const { data } = await axios.get('/carrinho/');
    return data;
  }
  async adicionarCarrinho(carrinho) {
    const { data } = await axios.post('/carrinho/', carrinho);
    return data;
  }
  async atualizarCarrinho(carrinho) {
    const { data } = await axios.put(`/carrinho/${carrinho.id}/`, carrinho);
    return data;
  }
  async excluirCarrinho(id) {
    const { data } = await axios.delete(`/carrinho/${id}/`);
    return data;
  }
}
