import { ChangeEvent, useRef, useState } from 'react';
import {
    Button,
    Text,
    HStack,
} from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'

export function FileUploader(props) {
    const [file, setFile] = useState();
    const inputRef = useRef(null);

    const handleUploadClick = () => {
        // 👇 We redirect the click event onto the hidden input element
        inputRef.current?.click();
    };

    const handleFileChange = (e) => {
        if (!e.target.files) {
            return;
        }

        setFile(e.target.files[0]);

        // 🚩 do the file upload here normally...
        props.onUpload(e.target.files[0]);
    };

    return (
        <HStack>
            {/* 👇 Our custom button to select and upload a file */}
            <Button
                onClick={handleUploadClick}
                isLoading={props.state == "loading"}>
                选择文件
            </Button>
            <Text>{file ? `${file.name}` : props.defaultName}</Text>
            {props.state == "success" && <CheckIcon color={"green.500"} paddingTop={1} />}
            {props.state == "failed" && <SmallCloseIcon color={"red.500"} paddingTop={1} />}
            {/* 👇 Notice the `display: hidden` on the input */}
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept={props.accept}
            />
        </HStack>
    );
}