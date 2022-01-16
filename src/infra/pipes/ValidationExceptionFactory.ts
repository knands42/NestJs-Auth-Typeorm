import { BadRequestException, ValidationError } from '@nestjs/common'

export const validationErrorFactory = (errors: ValidationError[]): unknown => {
  const validationResult = getConstraints(errors)
  throw new BadRequestException({
    error: 'ClassValidation',
    message: validationResult
  })
}

function getConstraints(errors: ValidationError[]) {
  const constraintsList: Array<unknown> = new Array()
  errors.forEach(err => {
    extractConstraints(err, err.property, constraintsList)
  })
  return constraintsList
}

function extractConstraints(
  error: ValidationError,
  ancestor: string,
  constraintsList: Array<unknown>
) {
  if (!error.children.length) {
    const constraints = error.constraints as unknown
    constraintsList.push({
      property: ancestor,
      validations: Object.keys(constraints).map(key => constraints[key])
    })
  } else {
    error.children.forEach(err => {
      extractConstraints(err, `${ancestor}.${err.property}`, constraintsList)
    })
  }
}
