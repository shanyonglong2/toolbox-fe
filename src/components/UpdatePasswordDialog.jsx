import { useState } from "react";
import {
    useToast,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Stack,
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';

import { updatePassword } from '../api/api';

export function UpdatePasswordDialog(props) {
    const toast = useToast();
    const [originPassword, setOriginPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [originPasswordInvalid, setOriginPasswordInvalid] = useState(false);
    const [newPasswordInvalid, setNewPasswordInvalid] = useState(false);
    const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);

    const validForm = () => {
        if (originPassword == "") {
            setOriginPasswordInvalid(true);
            return false;
        }
        if (newPassword == "") {
            setNewPasswordInvalid(true);
            return false;
        }
        if (confirmPassword == "") {
            setConfirmPasswordInvalid(true);
            return false;
        }
        return true;
    }
    const resetForm = () => {
        setOriginPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setOriginPasswordInvalid(false);
        setNewPasswordInvalid(false);
        setConfirmPasswordInvalid(false);
    }
    const doCreateColumn = () => {
        setOriginPasswordInvalid(false);
        setNewPasswordInvalid(false);
        setConfirmPasswordInvalid(false);
        if (!validForm()) {
            return;
        }
        if (newPassword != confirmPassword) {
            setConfirmPasswordInvalid(true);
            return;
        }
        updatePassword({
            name: sessionStorage.getItem("userName"),
            oldPassword: originPassword,
            newPassword: newPassword,
        }, (data) => {
            toast({
                title: '操作成功',
                description: "密码修改成功",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            props.onCreated();
        }, (err) => {
            toast({
                title: '密码修改失败',
                description: err,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
        resetForm();
        props.onClose();
    }

    const close = () => {
        resetForm();
        props.onClose();
    }

    return (
        <>
            <Modal
                isCentered
                onClose={props.onClose}
                isOpen={props.isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>修改密码</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <FormLabel>原密码</FormLabel>
                                <Input
                                    isInvalid={originPasswordInvalid}
                                    placeholder={'请输入原密码'}
                                    type='password'
                                    value={originPassword}
                                    onChange={(event) => {
                                        setOriginPassword(event.target.value);
                                    }
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>新密码</FormLabel>
                                <Input
                                    isInvalid={newPasswordInvalid}
                                    placeholder={'请输入新密码'}
                                    type='password'
                                    value={newPassword}
                                    onChange={(event) => {
                                        setNewPassword(event.target.value);
                                    }
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>确认密码</FormLabel>
                                <Input
                                    isInvalid={confirmPasswordInvalid}
                                    type='password'
                                    placeholder={'请确认新密码'}
                                    value={confirmPassword}
                                    onChange={(event) => {
                                        setConfirmPassword(event.target.value);
                                    }
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={close}>取消</Button>
                        <Button colorScheme='teal' onClick={doCreateColumn}>
                            修改
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}