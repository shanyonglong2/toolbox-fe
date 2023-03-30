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

import {createTool, listColumns, listEnvironments, uploadProfile} from '../api/api';

let profile = "";
export function CreateToolDialog(props) {
    const toast = useToast();
    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    const [env, setEnv] = useState('');
    const [column, setColumn] = useState('');
    const [description, setDescription] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadState, setUploadState] = useState("pending");

    const [environments, setEnvironments] = useState([]);

    const [nameInvalid, setNameInvalid] = useState(false);
    const [urlInvalid, setURLInvalid] = useState(false);
    const [envInvalid, setEnvInvalid] = useState(false);
    const [columnInvalid, setColumnInvalid] = useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);

    const fetchColumns = useCallback(() => {
        if(props.columns.length > 0) {
            setColumn(props.columns[0].name);
        }
    }, []);

    const fetchEnvironments = useCallback(() => {
        listEnvironments((data)=>{
            setEnvironments(data.data);
            if(data.data.length > 0) {
                setEnv(data.data[0].name);
            }
        }, (err)=>{
            toast({
                title: '获取环境数据失败',
                description: err,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
    }, []);

    useEffect(function (){
        fetchColumns();
        fetchEnvironments()
    }, [fetchColumns, fetchEnvironments]);

    const validTool = () => {
        if(name == "") {
            setNameInvalid(true);
            return false;
        }
        if(url == "") {
            setURLInvalid(true);
            return false;
        }
        if(env == "") {
            setEnvInvalid(true);
            return false;
        }
        if(column == "") {
            setColumnInvalid(true);
            return false;
        }
        if(description == "") {
            setDescriptionInvalid(true);
            return false;
        }
        return true;
    }
    const resetForm = () => {
        setName('');
        setURL('');
        setDescription('');
        setNameInvalid(false);
        setURLInvalid(false);
        setEnvInvalid(false);
        setColumnInvalid(false);
        setDescriptionInvalid(false);
        setUploadState("pending");
        setUploadLoading(false);
    }
    const doCreateTool = () => {
        if(!validTool()) {
            return;
        }
        createTool({
            name: name,
            url: url,
            profile: profile,
            description: description,
            environment: env,
            columnName: column,
        }, (data) => {
            toast({
                title: '新建工具成功',
                description: "工具"+name+"已经成功创建",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            props.onCreated();
        }, (err) => {
            toast({
                title: '新建工具失败',
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
                onClose={props.onClose}
                isOpen={props.isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>新建工具</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <FormLabel>工具名称</FormLabel>
                                <Input
                                    isInvalid={nameInvalid}
                                    placeholder={'请输入工具名称'}
                                    value={name}
                                    onChange={(event)=>{
                                        setName(event.target.value);}
                                    }
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>工具地址</FormLabel>
                                <Input
                                    isInvalid={urlInvalid}
                                    placeholder={'请输入工具地址'}
                                    value={url}
                                    onChange={(event)=>{
                                        setURL(event.target.value);}
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>工具图标</FormLabel>
                                <HStack spacing='24px'>
                                    <div>
                                        <input id="profile_form" type="file" name='file'/>
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

                            <FormControl isRequired>
                                <FormLabel>所属环境</FormLabel>
                                <Select
                                    value={env}
                                    isInvalid={envInvalid}
                                    onChange={(event)=>{setEnv(event.target.value)}}
                                >
                                    {environments.map((env, index)=>{
                                        return <option key={index} value={env.name}>{env.name}</option>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>所属栏目</FormLabel>
                                <Select
                                    value={column}
                                    isInvalid={columnInvalid}
                                    onChange={(event)=>{setColumn(event.target.value)}}
                                        >
                                    {props.columns.map((column, index)=>{
                                        return <option key={index} value={column.name}>{column.name}</option>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>工具说明</FormLabel>
                                <Textarea
                                    placeholder='请输入工具说明'
                                    resize={"none"}
                                    isInvalid={descriptionInvalid}
                                    value={description}
                                    onChange={(event)=>{
                                        setDescription(event.target.value);}
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={props.onClose}>取消</Button>
                        <Button colorScheme='teal' onClick={doCreateTool}>
                            新建
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}