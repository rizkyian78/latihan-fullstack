// eslint-disable-next-line no-unused-vars

function useValidation(schema, value, options) {
  return schema.validateSync(value, {
    abortEarly: false,
    stripUnknown: true,
    ...options,
  })
}

export default useValidation
