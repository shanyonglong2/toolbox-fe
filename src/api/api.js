import axios from 'axios'

let baseURL = "http://10.0.2.247:8089"
// let baseURL = "http://localhost:8089"

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

export function updatePassword(req, onReceive, onError) {
    axios.put(baseURL+`/users/entities/${req.name}/password`, {old_password: req.oldPassword, new_password: req.newPassword}, authConfig()).then((res) => {
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

export function putColumn (column) {
    return new Promise((resolve, reject) => {
        axios.put(baseURL+"/columns/"+column.name, column, authConfig()).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            handleError(reject, err);
        });
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