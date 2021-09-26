import {
  Button,
  Grid,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  Link,
} from "@chakra-ui/react";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import LogoText from "../atoms/svg/LogoText";
import * as Yup from "yup";
import { useLogin } from "../../hooks/queries/useLogin";
import { useApollo } from "../../contexts/apolloContext";
import { useSignUp } from "../../hooks/mutations/useSignUp";
import FormikInput from "../molecules/FormikInput";

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
    .min(3, "Trop court!")
    .max(15, "Trop long!")
    .required("Requis"),
  password: Yup.string()
    .min(5, "Trop court!")
    .max(10, "Trop long!")
    .required("Requis"),
});

const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Trop court!")
    .max(30, "Trop long!")
    .required("Requis"),
  lastName: Yup.string()
    .min(2, "Trop court!")
    .max(30, "Trop long!")
    .required("Requis"),
  email: Yup.string().email("Email invalide").required("Requis"),
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
              touched,
              isValid,
              dirty,
              resetForm,
              setFieldTouched,
            }) => {
              return (
                <>
                  <VStack spacing="20px" mt="30px" mb="20px">
                    {loginError && isSigningUp && (
                      <Text
                        fortSize="md"
                        color="brand.secondary.800"
                        width="100%"
                        fontWeight="bold"
                      >
                        {
                          "L'utilisateur n'existe pas. Veuillez créer un compte ou "
                        }
                        <Link
                          onClick={() => {
                            resetForm();
                            setIsSigningUp(false);
                          }}
                          color="gray.700"
                        >
                          Réessayer
                        </Link>
                      </Text>
                    )}
                    {signUpSuccess && !signUpError && (
                      <Text
                        size="sm"
                        color="brand.primary.500"
                        width="100%"
                        textAlign="center"
                      >
                        Succès! Veuillez vous connecter
                      </Text>
                    )}
                    {signUpError && (
                      <Text
                        fortSize="md"
                        color="brand.secondary.800"
                        width="100%"
                        fontWeight="bold"
                      >
                        {signUpError.message}
                      </Text>
                    )}
                    <FormikInput name="username" placeholder="Username" />
                    <FormikInput
                      name="password"
                      placeholder="Mot de passe"
                      type="password"
                    />
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
                        Connexion
                      </Button>
                    </Grid>
                  ) : (
                    <>
                      <VStack spacing="20px" mt="10px" mb="30px">
                        <FormikInput name="firstName" placeholder="Prénom" />
                        <FormikInput name="lastName" placeholder="Nom" />
                        <FormikInput
                          name="email"
                          placeholder="Email"
                          type="email"
                        />
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
                          {"S'inscrire"}
                        </Button>
                      </Grid>
                    </>
                  )}
                </>
              );
            }}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
