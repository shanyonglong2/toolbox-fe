import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    InputGroup,
    InputLeftElement,
    Input,
    Stack,
    HStack,
    useToast,
} from '@chakra-ui/react'

import { AtSignIcon, LockIcon } from '@chakra-ui/icons'
import {login} from "../api/api";
export function LoginModal(props){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userNameInvalid, setUserNameInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const toast = useToast();
    const onClose = () => {
        props.onClose();
        setUserName('');
        setPassword('');
        setPasswordInvalid(false);
        setUserNameInvalid(false);
    }

    const keyUp = (e)=>{
        if(e.keyCode == 13){
            onLogin();
        }
    }

    const onLogin = () => {
        setUserName('');
        setPassword('');
        login(userName, password,
            (data) => {
                toast({
                    title: '登录成功',
                    description: "欢迎回来，" + userName,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                sessionStorage.setItem("token", data.data);
                props.onLogin();
            },
            (err) => {
                if(err == "incorrect username") {
                    setUserNameInvalid(true);
                }else if (err == "incorrect password"){
                    setPasswordInvalid(true);
                }else{
                    toast({
                        title: '登录失败',
                        description: err,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                    onClose();
                }
            });

    }
    return <Modal
            isOpen={props.visible}
            onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>用户登录</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack spacing={4}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<AtSignIcon color='gray.300' />}
                        />
                        <Input
                            value={userName}
                            type='text'
                            autoFocus
                            placeholder='请输入用户名'
                            isInvalid={userNameInvalid}
                            onChange={(event)=>{
                                setUserName(event.target.value);}
                            }
                            onKeyUp={e=>keyUp(e)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            color='gray.300'
                            fontSize='1.2em'
                            children={<LockIcon color='gray.300'/>}
                        />
                        <Input
                            value={password}
                            type='password'
                            placeholder='请输入密码'
                            isInvalid = {passwordInvalid}
                            onKeyUp={e=>keyUp(e)}
                            onChange={(event)=>{
                                setPassword(event.target.value);}
                            }/>
                    </InputGroup>
                </Stack>


            </ModalBody>

            <ModalFooter>
                <HStack spacing={3}>
                    <Button variant='ghost' onClick={onClose}>退出</Button>
                    <Button colorScheme='teal' mr={3} onClick={onLogin}>
                        登录
                    </Button>
                </HStack>

            </ModalFooter>
        </ModalContent>
    </Modal>
}