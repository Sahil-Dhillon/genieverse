import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, TextInput, View, Button, Text } from 'react-native'
import { signin, signup } from '../store/actions/userActions'
import { ToastAndroid } from 'react-native'

export default function Login() {
    const [fname, setFname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [validateError, setValidateError] = useState()
    const [create, setCreate] = useState(false)
    const dispatch = useDispatch()

    const userSignin = useSelector((state) => state.userSignin)
    const userSignup = useSelector((state) => state.userSignup)

    useEffect(() => {
        if (password.length > 0 && password.length < 8) {
            setValidateError("* Passwords must not be less than 8 letters")
        } else if (cpassword.length > 0 && cpassword !== password) {
            setValidateError("* Confirm password doesn't match")
        } else {
            setValidateError("")
        }
    }, [password, cpassword])
    const signIn = () => {
        email, password ? dispatch(signin(email, password)) : alert('Enter all required fields.')
        var { userInfo, loading, error } = userSignin
        if (error) {
            alert(error)
        }
    }
    const signUp = () => {
        if (validateError) {
            return
        } else {
            fname, email, password, cpassword ? dispatch(signup(fname, email, password)) : alert('Enter all required fields.')
            var { userInfo, loading, error } = userSignup
            if (error) {
                alert(error)
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Welcome to Genieverse
            </Text>
            {
                create ? (
                    <>
                        <View style={styles.formContainer}>
                            <TextInput style={styles.textInput} placeholder="Full Name" onChangeText={setFname} value={fname} />
                            <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail} value={email} />
                            <TextInput style={styles.textInput} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry={true} />
                            <TextInput style={styles.textInput} placeholder="Confirm Password" onChangeText={setCpassword} value={cpassword} secureTextEntry={true} />
                            <Text>{validateError}</Text>
                            <Button title="Sign Up" onPress={() => signUp()} />
                        </View>
                        <Text style={styles.signUpText} onPress={() => setCreate(false)}>
                            Already have an account? SignIn Instead
                        </Text>
                    </>
                ) : (
                    <>
                        <View style={styles.formContainer}>
                            <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail} value={email} />
                            <TextInput style={styles.textInput} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry={true} />

                            <Button title="Sign In" onPress={() => signIn()} />
                        </View>
                        <Text style={styles.signUpText} onPress={() => setCreate(true)}>
                            New to Geenieverse? SignUp Instead
                        </Text>
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000022',
        padding: 20
    },
    heading: {
        color: '#fff',
        fontSize: 60,
        marginVertical: 30,
        // lineHeight: 50,
        fontFamily: 'Roboto'

    },
    formContainer: {
        width: '100%',
        backgroundColor: '#eee',
        padding: 20,
        justifyContent: 'center',
        borderRadius: 20,
        paddingVertical: 40
    },
    textInput: {
        // borderWidth: 2,
        // borderColor: '#aaa',
        borderRadius: 10,
        padding: 10,
        // margin: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    signUpText: {
        color: '#ddd',
        fontSize: 15,
        margin: 20
    }
})