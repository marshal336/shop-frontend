"use client";
import Image from "next/image";
import React from "react";
import axios from "axios";
import styles from "../Auth.module.scss";
import { Button, Input, Link } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "~/redux/store";
import { addUserGoogle, createUser } from "~/redux/reducers/user";
import { ErrorCatch } from "~/utils/error";

export const Register = () => {
  const { push, refresh } = useRouter()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const login = useGoogleLogin({
    onSuccess: async (tokenRedponse) => {
      if (tokenRedponse) {
        try {
          'use server'
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_OAUTH_LINK}=${tokenRedponse.access_token}`)
          dispatch(addUserGoogle(data))
          push('/')
        } catch (error) {
          const mess = ErrorCatch(error)
          console.log(mess)
        }
      }
    }
  });
  const dispatch = useAppDispatch()
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      email: email,
      firstName: name,
      password: password
    }
    if (email.length + name.length + password.length === 0) return
    dispatch(createUser(data))
    refresh()
  }
  return (
    <div className={`${styles.root} main-width`}>
      <div className={styles.logo}>
        <Image src={"/signLogo.png"} alt="logo" width={805} height={781} />
      </div>
      <form onSubmit={submit}>
        <h1 className={styles.h1}>Create an account</h1>
        <p className={styles.p}>Enter your details below</p>
        <div className={styles.inputs}>
          <Input onChange={(e) => setName(e.target.value)} value={name} variant="flushed" placeholder="Name" type="text" />
          <Input onChange={(e) => setEmail(e.target.value)} value={email} variant="flushed" placeholder="Email" type="email" />
          <Input onChange={(e) => setPassword(e.target.value)} value={password} variant="flushed" placeholder="Password" type="password" />
        </div>
        <div className={styles.buttons}>
          <Button type="submit" className={styles.firstButton} size={"lg"}>
            Create Account
          </Button>
          <Button type="submit" className={''} onClick={() => login()} size={"lg"}>
            Login with Google
          </Button>
        </div>
        <div className={styles.logIn}>
          <p>Already have account?</p>
          <Link href={"/auth/sign-in"}>Log in</Link>
        </div>
      </form>
    </div>
  );
};

