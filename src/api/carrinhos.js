import api from '../plugins/api'
export default class CarrinhosApi {
  async buscarTodosOsCarrinhos() {
    const { data } = await api.get('/carrinho/');
    return data;
  }
  async adicionarCarrinho(carrinho) {
    const { data } = await api.post('/carrinho/', carrinho);
    return data;
  }
  async atualizarCarrinho(carrinho) {
    const { data } = await api.put(`/carrinho/${carrinho.id}/`, carrinho);
    return data;
  }
  async excluirCarrinho(id) {
    const { data } = await api.delete(`/carrinho/${id}/`);
    return data;
  }
}
