import {
  Button,
  Grid,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  Link,
} from "@chakra-ui/react";
import { Field, FieldProps, Formik } from "formik";
import React, { useEffect, useState } from "react";
import LogoText from "../svg/LogoText";
import * as Yup from "yup";
import { useLogin } from "../../hooks/queries/useLogin";
import { useApollo } from "../../contexts/apolloContext";
import { useSignUp } from "../../hooks/mutations/useSignUp";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type LoginFormValues = {
  username: string;
  password: string;
};

type SignUpFormValues = LoginFormValues & {
  firstName: string;
  lastName: string;
  email: string;
};

const initialValues = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { setToken } = useApollo();

  const [
    login,
    { loading: isLoadingLogin, data: loginToken, error: loginError },
  ] = useLogin({ fetchPolicy: "no-cache" });
  const [
    signUp,
    { data: signUpSuccess, error: signUpError, loading: isLoadingSignUp },
  ] = useSignUp({ fetchPolicy: "no-cache" });

  useEffect(() => {
    if (loginError) {
      setIsSigningUp(true);
    }
  }, [loginError]);

  useEffect(() => {
    if (signUpSuccess && !signUpError) {
      setIsSigningUp(false);
    }
  }, [signUpSuccess, signUpError]);

  useEffect(() => {
    if (loginToken?.login) {
      setToken(loginToken?.login);
    }
  }, [loginToken, setToken]);

  const onSubmit = async ({
    password,
    username,
    firstName,
    lastName,
    email,
  }: SignUpFormValues) => {
    if (!isSigningUp) return login({ variables: { password, username } });
    try {
      await signUp({
        variables: {
          password,
          username,
          firstName,
          lastName,
          email,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="brand.primary.500" />
      <ModalContent>
        <ModalBody px="30px" py="30px">
          <Grid placeItems="center">
            <LogoText height="100px" />
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={
              isSigningUp
                ? loginValidationSchema.concat(signUpValidationSchema)
                : loginValidationSchema
            }
          >
            {({
              submitForm,
              errors,
              touched,
              isValid,
              dirty,
              resetForm,
              setFieldTouched,
            }) => (
              <>
                <VStack spacing="20px" mt="30px" mb="20px">
                  <Field name="username">
                    {(fieldProps: FieldProps) => (
                      <VStack spacing="3px" width="100%" maxWidth="300px">
                        {loginError && isSigningUp && (
                          <Text size="sm" color="red.200" width="100%">
                            {"User doesn't exist. Please create an account or "}
                            <Link
                              onClick={() => {
                                resetForm();
                                setIsSigningUp(false);
                              }}
                              color="gray.300"
                            >
                              Try again
                            </Link>
                          </Text>
                        )}
                        {signUpSuccess && !signUpError && (
                          <Text
                            size="sm"
                            color="blue.200"
                            width="100%"
                            textAlign="center"
                          >
                            Success! Please log in
                          </Text>
                        )}
                        <Input placeholder="Username" {...fieldProps.field} />
                        {touched?.username && !!errors.username && (
                          <Text size="xs" color="red.200" width="100%">
                            {errors?.username}
                          </Text>
                        )}
                      </VStack>
                    )}
                  </Field>
                  <Field name="password">
                    {(fieldProps: FieldProps) => (
                      <VStack spacing="3px" width="100%" maxWidth="300px">
                        <Input
                          placeholder="Password"
                          type="password"
                          {...fieldProps.field}
                        />
                        {touched?.password && !!errors.password && (
                          <Text size="xs" color="red.200" width="100%">
                            {errors?.password}
                          </Text>
                        )}
                      </VStack>
                    )}
                  </Field>
                </VStack>
                {!isSigningUp ? (
                  <Grid placeItems="center" mt="30px">
                    <Button
                      size="md"
                      onClick={() => {
                        submitForm();
                        setFieldTouched("firstName", false, true);
                        setFieldTouched("lastName", false, true);
                        setFieldTouched("email", false, true);
                      }}
                      disabled={!dirty || !isValid || isLoadingLogin}
                    >
                      Connect
                    </Button>
                  </Grid>
                ) : (
                  <>
                    <VStack spacing="20px" mt="10px" mb="30px">
                      <Field name="firstName">
                        {(fieldProps: FieldProps) => (
                          <VStack spacing="3px" width="100%" maxWidth="300px">
                            <Input
                              placeholder="First Name"
                              {...fieldProps.field}
                            />
                            {touched?.firstName && !!errors.firstName && (
                              <Text size="xs" color="red.200" width="100%">
                                {errors?.firstName}
                              </Text>
                            )}
                          </VStack>
                        )}
                      </Field>
                      <Field name="lastName">
                        {(fieldProps: FieldProps) => (
                          <VStack spacing="3px" width="100%" maxWidth="300px">
                            <Input
                              placeholder="Last Name"
                              {...fieldProps.field}
                            />
                            {touched?.lastName && !!errors.lastName && (
                              <Text size="xs" color="red.200" width="100%">
                                {errors?.lastName}
                              </Text>
                            )}
                          </VStack>
                        )}
                      </Field>
                      <Field name="email">
                        {(fieldProps: FieldProps) => (
                          <VStack spacing="3px" width="100%" maxWidth="300px">
                            <Input placeholder="Email" {...fieldProps.field} />
                            {touched?.email && !!errors.email && (
                              <Text size="xs" color="red.200" width="100%">
                                {errors?.email}
                              </Text>
                            )}
                          </VStack>
                        )}
                      </Field>
                    </VStack>
                    <Grid placeItems="center">
                      <Button
                        size="md"
                        onClick={async () => {
                          await submitForm();
                          resetForm();
                        }}
                        disabled={
                          !dirty ||
                          !isValid ||
                          isLoadingSignUp ||
                          !touched.firstName
                        }
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  </>
                )}
              </>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
