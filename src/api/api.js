import axios from 'axios'

let baseURL = "http://192.168.210.180:8088"

export function login (username, password, onReceive, onError) {
    axios.post(baseURL+"/users/token", {name: username, password: password}).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function listUsers (onReceive, onError) {
    axios.get(baseURL+"/users/entities").then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function getUser (id, onReceive, onError) {
    axios.get(baseURL+"/users/entities/"+id).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function listTools (onReceive, onError) {
    axios.get(baseURL+"/tools?groupBy=environment").then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function createTool (tool, onReceive, onError) {
    axios.post(baseURL+"/tools", tool, authConfig()).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function updateTool (tool, onReceive, onError) {
    axios.put(baseURL+"/tools/"+tool.id, tool, authConfig()).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function deleteTool (id, onReceive, onError) {
    axios.delete(baseURL+"/tools/"+id, authConfig()).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function putColumn (column, onReceive, onError) {
    axios.put(baseURL+"/columns/"+column.name, column, authConfig()).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function deleteColumn (id, onReceive, onError) {
    axios.delete(baseURL+"/columns/"+id).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function listColumns (onReceive, onError) {
    axios.get(baseURL+"/columns").then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function listEnvironments (onReceive, onError) {
    axios.get(baseURL+"/environments").then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function uploadProfile (file, onReceive, onError) {
    let formData = new FormData();
    formData.append("file", file);
    axios.post(baseURL+"/profiles", formData, authConfig()).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function downloadProfile (name, onReceive, onError) {
    axios.get(baseURL+"/profiles/" + name).then((res) => {
        onReceive(res.data);
    }).catch((err) => {
        handleError(onError, err);
    });
}

export function profileURL(name) {
    return baseURL+"/profiles/" + name;
}


function handleError(onError, err) {
    if(err.response != null) {
        onError(err.response.data.msg);
    }else{
        onError(err.message);
    }
}

function authConfig(){
    return {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };
}