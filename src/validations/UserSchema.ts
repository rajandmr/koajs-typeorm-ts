import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);

export interface UserInterface {
  id: number;
  name: string;
  email: string;
}

const UserSchema: JSONSchemaType<UserInterface> = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    email: {
      type: 'string',
      format: 'email',
    },
    name: {
      type: 'string',
      pattern: '^[a-zA-Z]{2,}',
    },
  },
  required: ['email', 'name'],
  additionalProperties: false,
};

const Validate = (body: any) => {
  const validate = ajv.compile(UserSchema);
  const valid = validate(body);
  if (!valid) {
    return validate.errors;
  }
  return true;
};

export default Validate;
