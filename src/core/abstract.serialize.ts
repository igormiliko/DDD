import { TMode, TPropertiesModel } from '../types/types';
import Validate from '../utils/Validate';

interface ISerializerRun {
  data: any;
  properties: TPropertiesModel[];
  mode: keyof TMode;
}

class AbstractSerialize<T extends TMode> {
  private validate(data: any) {
    try {
      const errors = [];
      Object.keys(data).forEach((field) => {
        if (data[field]) {
          const { message, error } = data[field];
          if (error) {
            errors.push(message);
          }
        }
      });

      if (errors.length) {
        return { error: true, status: 400, message: errors.join(', ') };
      }
      return { error: false };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  run({ data, properties, mode }: ISerializerRun) {
    return new Promise<typeof mode extends 'in' ? T['in'] : T['out']>(
      (resolve, reject) => {
        try {
          const result: T = {} as T;

          for (const propertie of properties) {
            const serializer = this[propertie.type];
            console.log(serializer);
            const keyModeOn =
              mode === 'out' ? propertie.appKey : propertie.dbKey;
            const keyModeOff =
              mode !== 'out' ? propertie.appKey : propertie.dbKey;
            const value = data[keyModeOff];

            if (!value && propertie.required) {
              result[keyModeOn] = {
                error: true,
                message: `Campo "${propertie.appKey}" é obrigatório`,
              };
              continue;
            }

            if (!serializer) {
              console.warn(
                `⚠️ Não há serializador definido para o campo: ${keyModeOn}`,
              );
            }

            result[keyModeOn] = serializer
              ? serializer(value, propertie.required)
              : null;
          }

          const validate = this.validate(result);

          if (validate.error) {
            return reject(validate);
          }

          return resolve(result);
        } catch (error) {
          console.log(error);
          return reject(error);
        }
      },
    );
  }

  number(data: any, required: boolean) {
    const isValid = Validate.number(data);
    if (required && !isValid) {
      return {
        error: true,
        message: `Campo "numero" deve ser do tipo numérico`,
      };
    }
    return !isValid ? null : Number(data);
  }

  string(data: any, required: boolean) {
    if (required && !data) {
      return {
        error: true,
        message: `Campo é obrigatório`,
      };
    }
    return String(data);
  }

  data(data: any, required: boolean) {
    const isValid = Validate.data(data);
    if (required && !isValid) {
      return {
        error: true,
        message: `Formato de data inválido: ${data}. Formato esperado: YYYY-MM-DD`,
      };
    }
    return !isValid ? null : new Date(data);
  }

  boolean(data: any, required: boolean) {
    const isValid = Validate.boolean(data);

    if (required && !isValid) {
      return { error: true, message: `Tipo booleano inválido: ${data}` };
    }

    return !isValid ? null : Boolean(data);
  }

  site(data: any, required: boolean) {
    const isValid = Validate.site(data);

    if (required && !isValid) {
      return {
        error: true,
        message: `Site inválido: ${data}. formato esperado: https://XXXXX.com.XX`,
      };
    }
    return !isValid ? null : data;
  }

  phone(data: any, required: boolean) {
    const isValid = Validate.phone(data);
    if (required && !isValid) {
      return {
        error: true,
        message: `Telefone inválido: ${data}. Formats esperados: ((XX) XXXXX-XXXX, (XX) XXXX-XXXX, XXXXX-XXXX, XXXX-XXXX)`,
      };
    }
    return data;
  }

  cep(data: any, required: boolean) {
    const isValid = Validate.cep(data);
    if (required && !isValid) {
      return {
        error: true,
        message: `CEP inválido: ${data}. Formato esperado: XXXXX-XXX`,
      };
    }
    return !isValid ? null : data.replace([/\D/g], '');
  }

  email(data: any, required: boolean) {
    const isValid = Validate.email(data);
    if (required && !isValid) {
      return {
        error: true,
        message: `Email inválido: ${data}. Formato esperado: X@X.X`,
      };
    }
    return !isValid ? null : data;
  }

  CPF(data: any, required: boolean) {
    const isValid = Validate.CPF(data);

    if (required && !isValid) {
      return {
        error: true,
        message: `Formato de CPF/CNPJ inválido: ${data}, espera-se: XXX.XXX.XXX-XX`,
      };
    }
    return data.replace([/\D/g], '');
  }

  CNPJ(data: any, required: boolean) {
    const isValid = Validate.CNPJ(data);

    if (required && !isValid) {
      return {
        error: true,
        message: `Formato de CPF/CNPJ inválido: ${data}, espera-se: XX.XXX.XXX/XXXX-XX`,
      };
    }

    return data.replace([/\D/g], '');
  }

  CPF_CNPJ(data: any, required: boolean) {
    const isValid = !Validate.CNPJ(data) && !Validate.CPF(data);

    if (required && isValid) {
      return {
        error: true,
        message: `Formato de CPF/CNPJ inválido: ${data}, espera-se: XXX.XXX.XXX-XX ou XX.XXX.XXX/XXXX-XX`,
      };
    }
    return data.replace([/\D/g], '');
  }
}

export default AbstractSerialize;
