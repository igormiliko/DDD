const HttpBadRequestResponse = (message?: string) => ({
  status: 400,
  message: message || 'Bad request',
  error: true,
});
const HttpNotFoundResponse = {
  status: 404,
  message: 'Not found',
  error: true,
};
const HttpServerErrorResponse = {
  status: 500,
  message: 'Erro no servidor',
  error: true,
};
const HttpSuccessResponse = {
  status: 200,
  message: 'Sucesso',
  error: false,
};
const HttpNoContentResponse = {
  status: 204,
  message: 'No content',
  error: false,
};
const HttpCreatedResponse = (data: any) => ({
  status: 200,
  message: 'Criado com sucesso',
  error: false,
  data,
});
const HttpUpdatedResponse = (data: any) => ({
  status: 200,
  message: 'Atualizado com sucesso',
  error: false,
  data,
});
const HttpQueryResponse = (data: any) => ({
  status: 200,
  message: 'Buscado com sucesso',
  error: false,
  data,
});
export {
  HttpBadRequestResponse,
  HttpNotFoundResponse,
  HttpServerErrorResponse,
  HttpSuccessResponse,
  HttpNoContentResponse,
  HttpCreatedResponse,
  HttpUpdatedResponse,
  HttpQueryResponse,
};
