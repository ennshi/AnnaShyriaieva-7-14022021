import { Input, InputProps, VStack, Text } from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React from "react";

const FormikInput: React.FC<InputProps> = ({ name, ...props }) => {
  if (!name) return null;
  return (
    <Field name={name}>
      {({ form, field }: FieldProps) => (
        <VStack spacing="3px" width="100%" maxWidth="300px">
          <Input aria-label={props.placeholder || name} {...props} {...field} />
          {form?.touched?.[name] && !!form?.errors?.[name] && (
            <Text fontSize="md" color="brand.secondary.800" width="100%">
              {form?.errors?.[name]}
            </Text>
          )}
        </VStack>
      )}
    </Field>
  );
};

export default FormikInput;
