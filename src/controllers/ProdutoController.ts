import Produto from "../models/Produto";

export default class ProdutoController {
  static async listar() {
    return await Produto.find().sort({ nome: 1 });
  }

  static async criar(dados: any) {
    const novo = new Produto(dados);
    await novo.save();
    return novo;
  }

  static async editar(id: string, dados: any) {
    return await Produto.findByIdAndUpdate(id, dados, { new: true });
  }

  static async excluir(id: string) {
    return await Produto.findByIdAndDelete(id);
  }
}
