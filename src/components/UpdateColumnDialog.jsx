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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

import {putColumn, listColumns, listEnvironments, uploadProfile} from '../api/api';

let profile = "";
export function UpdateColumnDialog(props) {
    const toast = useToast();

    const resetForm = () => {
        props.setPriority(0);
    }
    const doPutColumn = () => {
        putColumn({
            name: props.column.name,
            priority: Number(props.column.priority),
        }).then((data) => {
            toast({
                title: '修改栏目成功',
                description: "栏目" + props.column.name + "已经修改成功",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            props.onUpdated();
        }).catch((err) => {
            toast({
                title: '修改栏目失败',
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
                    <ModalHeader>修改栏目</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                        <FormControl >
                                <FormLabel>栏目名称： {props.column.name}</FormLabel>
                            </FormControl>
                        <FormControl isRequired>
                                <FormLabel>优先级</FormLabel>
                                <NumberInput
                                    value={props.column.priority}
                                    min={0}
                                    max={100}
                                    onChange={(val) => {
                                        props.setPriority(val);
                                    }}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={props.onClose}>取消</Button>
                        <Button colorScheme='teal' onClick={doPutColumn}>
                            修改
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}