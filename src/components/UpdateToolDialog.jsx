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

import {updateTool, uploadProfile} from '../api/api';

let profile = "";
export function UpdateToolDialog(props) {
    const toast = useToast();
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadState, setUploadState] = useState("pending");

    const [nameInvalid, setNameInvalid] = useState(false);
    const [urlInvalid, setURLInvalid] = useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);

    const validTool = () => {
        if(props.tool.name == "") {
            setNameInvalid(true);
            return false;
        }
        if(props.tool.url == "") {
            setURLInvalid(true);
            return false;
        }
        if(props.tool.description == "") {
            setDescriptionInvalid(true);
            return false;
        }
        return true;
    }
    const closeDialog = () => {
        // resetForm();
        props.onClose();
    }
    const resetForm = () => {
        // setName('');
        // setURL('');
        // setDescription('');
        setNameInvalid(false);
        setURLInvalid(false);
        setDescriptionInvalid(false);
        setUploadState("pending");
        setUploadLoading(false);
    }
    const doUpdateTool = () => {
        if(!validTool()) {
            return;
        }
        updateTool({
            id: props.tool.id,
            name: props.tool.name,
            url: props.tool.url,
            profile: profile,
            description: props.tool.description,
        }, (data) => {
            toast({
                title: '修改工具成功',
                description: "工具"+props.tool.name+"已经成功修改",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            props.onUpdated();
        }, (err) => {
            toast({
                title: '修改工具失败',
                description: err,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
        resetForm();
        props.onClose();
    }

    const doUploadProfile = () => {
        const file = document.getElementById('profile_form').files[0];
        setUploadLoading(true);
        uploadProfile(file, (data) => {
            setUploadLoading(false);
            profile = data.data;
            setUploadState("success");
        }, (err) => {
            setUploadLoading(false);
            setUploadState("failed");
        });
    };
    const renderUploadState = () => {
        if (uploadState=="pending"){
            return <></>
        }else if (uploadState=="success"){
            return <CheckIcon color={"green.500"} />
        }
        return <CloseIcon color={"red.500"} />
    }
    return (
        <>
            <Modal
                isCentered
                onClose={closeDialog}
                isOpen={props.isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>修改工具</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <FormLabel>工具名称</FormLabel>
                                <Input
                                    isInvalid={nameInvalid}
                                    placeholder={'请输入工具名称'}
                                    value={props.tool.name}
                                    onChange={(event)=>{
                                        props.setName(event.target.value);}
                                    }
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>工具地址</FormLabel>
                                <Input
                                    isInvalid={urlInvalid}
                                    placeholder={'请输入工具地址'}
                                    value={props.tool.url}
                                    onChange={(event)=>{
                                        props.setURL(event.target.value);}
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>工具图标</FormLabel>
                                <HStack spacing='24px'>
                                    <div>
                                        <input 
                                        id="profile_form" 
                                        type="file" 
                                        name='file'/>
                                    </div>
                                    {
                                        renderUploadState()
                                    }
                                    <Button
                                        isInvalid={true}
                                        isLoading={uploadLoading}
                                        onClick={()=>doUploadProfile()}
                                    >上传</Button>
                                </HStack>

                            </FormControl>

                            <FormControl>
                                <FormLabel>工具说明</FormLabel>
                                <Textarea
                                    placeholder='请输入工具说明'
                                    resize={"none"}
                                    isInvalid={descriptionInvalid}
                                    value={props.tool.description}
                                    onChange={(event)=>{
                                        props.setDescription(event.target.value);}
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={closeDialog}>取消</Button>
                        <Button colorScheme='teal' onClick={doUpdateTool}>
                            修改
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}