import AbstractModel from '../../../core/abstract.model';
import { TAnyObject } from '../../../types/types';
import ClientSerialize from './client.serialize';
import { TClient } from './client.type';

class ClientModel extends AbstractModel<TClient> {
  constructor(data: TAnyObject) {
    super(data, ClientSerialize);
  }

  static insert = `INSERT INTO public.user (${new ClientModel({}).properties.map((p) => p.dbKey).join(',')}) VALUES (${new ClientModel({}).properties.map((_, ix) => `\$${ix + 1}`).join(',')}) RETURNING *`;
  static delete = `DELETE FROM public.user u WHERE u.id = $1`;
  static index = `SELECT * FROM public.user u ORDER BY u.id asc LIMIT $1 OFFSET $2 `;
  static indexOne = `SELECT * FROM public.user u WHERE u.id = $1`;
  static update = `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`;

  properties = [
    { dbKey: 'CnpjCpf', appKey: 'CPF', type: 'cpf', required: false },
    {
      dbKey: 'Inscricao_Municipal',
      appKey: 'InscricaoMunicipal',
      type: '',
      required: false,
    },
    { dbKey: 'Gate', appKey: 'gate', type: 'site', required: false },
    { dbKey: 'Sitee', appKey: 'site', type: 'site', required: false },
    {
      dbKey: 'Razao_Social',
      appKey: 'Razao_Social',
      type: 'string',
      required: false,
    },
    { dbKey: 'Numero', appKey: 'Numero', type: 'number', required: false },
    {
      dbKey: 'Cliente_Fornecedor',
      appKey: 'Cliente_Fornecedor',
      type: '',
      required: false,
    },
    { dbKey: 'Tipo_Pessoa', appKey: 'Tipo_Pessoa', type: '', required: false },
    {
      dbKey: 'Tributacao_Federal',
      appKey: 'Tributacao_Federal',
      type: '',
      required: false,
    },
    { dbKey: 'Ativo', appKey: 'ativo', type: '', required: false },
    {
      dbKey: 'Inscricao_Rg',
      appKey: 'Inscricao_Rg',
      type: '',
      required: false,
    },
    { dbKey: 'Sexo', appKey: 'Sexo', type: '', required: false },
    { dbKey: 'Responsavel', appKey: 'Responsavel', type: '', required: false },
    {
      dbKey: 'Dt_Aniversario',
      appKey: 'Dt_Aniversario',
      type: '',
      required: false,
    },
    { dbKey: 'Complemento', appKey: 'Complemento', type: '', required: false },
    { dbKey: 'Bairro', appKey: 'Bairro', type: '', required: false },
    { dbKey: 'Municipio', appKey: 'Municipio', type: '', required: false },
    { dbKey: 'Uf', appKey: 'Uf', type: '', required: false },
    { dbKey: 'Logradouro', appKey: 'Logradouro', type: '', required: false },
    { dbKey: 'Cep', appKey: 'Cep', type: '', required: false },
    { dbKey: 'Telefone', appKey: 'Telefone', type: '', required: false },
    { dbKey: 'Whatsapp', appKey: 'Whatsapp', type: '', required: false },
    {
      dbKey: 'Whatsapp_Adicional',
      appKey: 'Whatsapp_Adcional',
      type: '',
      required: false,
    },
    {
      dbKey: 'Nome_Comercial_Social',
      appKey: 'Nome_Comercial_Social',
      type: '',
      required: false,
    },
    { dbKey: 'E_mail', appKey: 'email', type: '', required: false },
    { dbKey: 'Instagram', appKey: 'instagram', type: '', required: false },
    { dbKey: 'Facebook', appKey: 'face', type: '', required: false },
    {
      dbKey: 'Data_Cadastro',
      appKey: 'Dt_cadastro',
      type: '',
      required: false,
    },
    {
      dbKey: 'Internacional',
      appKey: 'internacional',
      type: '',
      required: false,
    },
    { dbKey: 'Suframa', appKey: 'suframa', type: '', required: false },
    {
      dbKey: 'Informacoes_Adicionais',
      appKey: 'informacoes_adicionais',
      type: '',
      required: false,
    },
  ];
}

export default ClientModel;
