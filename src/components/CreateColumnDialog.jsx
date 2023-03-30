import {useCallback, useEffect, useState} from "react";
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
    Select,
    Text,
    Textarea,
    HStack,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

import {putColumn, listColumns, listEnvironments, uploadProfile} from '../api/api';

let profile = "";
export function CreateColumnDialog(props) {
    const toast = useToast();
    const [name, setName] = useState('');

    const [nameInvalid, setNameInvalid] = useState(false);

    const validTool = () => {
        if(name == "") {
            setNameInvalid(true);
            return false;
        }
        return true;
    }
    const resetForm = () => {
        setName('');
        setNameInvalid(false);
    }
    const doCreateColumn = () => {
        if(!validTool()) {
            return;
        }
        putColumn({
            name: name,
        }, (data) => {
            toast({
                title: '新建栏目成功',
                description: "栏目"+name+"已经成功创建",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            props.onCreated();
        }, (err) => {
            toast({
                title: '新建栏目失败',
                description: err,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
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
                    <ModalHeader>新建栏目</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <FormLabel>栏目名称</FormLabel>
                                <Input
                                    isInvalid={nameInvalid}
                                    placeholder={'请输入栏目名称'}
                                    value={name}
                                    onChange={(event)=>{
                                        setName(event.target.value);}
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={props.onClose}>取消</Button>
                        <Button colorScheme='teal' onClick={doCreateColumn}>
                            新建
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}