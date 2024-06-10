class Validate {
  static number = (data: any) => !isNaN(Number(data));

  static data = (data: any) =>
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(data);

  static boolean = (data: any) => {
    const bool = String(data);
    return bool && (bool === 'true' || bool === 'false');
  };

  static site = (data: any) =>
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(data);

  static phone = (data: any) => /^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/.test(data);

  static cep = (data: any) => /^\d{5}-\d{3}$/.test(data);

  static email = (data: any) =>
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data);

  static CPF = (data: any) =>
    data.replace(/\D/g, '').length === 11 &&
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data);

  static CNPJ = (data: any) =>
    data.replace(/\D/g, '').length === 14 &&
    /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(data);
}

export default Validate;
